import pickle

from flask import Flask, request
import numpy as np
import json
import pandas as pd

sorted_ratios = pd.read_csv('sorted_ratios.csv')

app = Flask(__name__)


class dumb_model:
    def __init__(self):
        pass

    def predict(self, points):
        if points.shape[0] > 1:
            output = np.zeros(points.shape[0])

            for i in range(len(output) // 5, len(output) // 3):
                output[i] = 57

            for i in range(len(output) // 3, len(output) // 2):
                output[i] = 171

            for i in range(len(output) // 2, 2 * len(output) // 3):
                output[i] = 57

            return output
        else:
            return np.zeros(points.shape[0])


model = dumb_model()

with open('knn_model.pickle', 'rb') as file:
    model = pickle.load(file)


def dumb_model_predict(points):
    output = np.zeros(points.shape[0])

    for i in range(len(output) // 5, len(output) // 3):
        output[i] = -1

    for i in range(len(output) // 3, len(output) // 2):
        output[i] = 57

    for i in range(len(output) // 2, 2 * len(output) // 3):
        output[i] = 171

    return output


@app.route('/predict', methods=['POST'])
def predict_churn():
    json_string = request.get_json()

    input_points = np.array([[point['lng'], point['lat']] for point in json_string])

    raw_predictions = model.predict(input_points).astype(int)#.astype(str)

    predictions = np.zeros_like(raw_predictions).astype(int)
    clusters = sorted_ratios['Cluster'].tolist()
    for i, prediction in enumerate(raw_predictions):
        if prediction in clusters:
            predictions[i] = sorted_ratios[sorted_ratios['Cluster']==prediction]['danger_level'].tolist()[0]
        else:
            predictions[i] = 0

    predictions = predictions.astype(str)

    checkpoint = 1

            # output_json_string = '['
    #
    # for point, prediction in zip(input_points, predictions):
    #     output_json_string += "{\"points\":[{\"lng\":"
    #     output_json_string += str(point[0])
    #     output_json_string += ",\"lat\":"
    #     output_json_string += str(point[1])
    #     output_json_string += "}],\"dangerLevel\":"
    #     output_json_string += str(prediction)
    #     output_json_string += "},"
    #
    # output_json_string = output_json_string[:-1]
    # output_json_string += ']'

    output_json = []

    current_subsequence = {"points": []}
    prev_prediction = None

    for point, prediction in zip(input_points, predictions):
        if prediction != prev_prediction:
            if current_subsequence["points"]:
                output_json.append(current_subsequence)
            current_subsequence = {"points": [{"lng": point[0], "lat": point[1]}],
                                   "dangerLevel": prediction}
        else:
            current_subsequence["points"].append({"lng": point[0], "lat": point[1]})

        prev_prediction = prediction

    if current_subsequence["points"]:
        output_json.append(current_subsequence)

    output_json_string = json.dumps(output_json)

    return output_json_string


if __name__ == "__main__":
    # AWS
    app.run(
        host='0.0.0.0',
        port=8080,
        debug=True
    )

    # local
    # app.run(
    #     host='localhost',
    #     port=5000,
    #     debug=True
    # )
