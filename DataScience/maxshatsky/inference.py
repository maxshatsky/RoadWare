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


# model = dumb_model()

with open('knn_model.pickle', 'rb') as file:
    model = pickle.load(file)


def modify_array(arr):
    n = len(arr)

    for i in range(1, n - 1):
        if arr[i] != arr[i - 1] and arr[i] != arr[i + 1]:
            arr[i] = (arr[i + 1])

    if arr[0] != arr[1]:
        arr[0] = arr[1]

    if arr[n - 1] != arr[n - 2]:
        arr[n - 1] = arr[n - 2]

    return arr


@app.route('/predict', methods=['POST'])
def predict_churn():
    json_data = request.get_json()

    input_points_df = pd.DataFrame(json_data)

    input_points_df = input_points_df.rename(columns={'lng': 'LONGITUDE', 'lat': 'LATITUDE'})
    column_order = ['LATITUDE', 'LONGITUDE']
    input_points_df = input_points_df[column_order]

    raw_predictions = model.predict(input_points_df)

    danger_level_predictions = np.zeros_like(raw_predictions).astype(int)

    # just a list to check presence of cluster in the table
    clusters = sorted_ratios['Cluster'].tolist()

    for i, prediction in enumerate(raw_predictions):
        if prediction in clusters:
            danger_level_predictions[i] = \
            sorted_ratios[sorted_ratios['Cluster'] == prediction]['danger_level'].tolist()[0]
        else:
            danger_level_predictions[i] = 0

    # Not letting a single point be in a danger, just sequences.
    danger_level_predictions = modify_array(danger_level_predictions)

    danger_level_predictions = danger_level_predictions.astype(str)

    output_json = []

    current_subsequence = {"points": []}
    prev_prediction = None

    for point, prediction in zip(json_data, danger_level_predictions):
        if prediction != prev_prediction:
            if current_subsequence["points"]:
                output_json.append(current_subsequence)
            current_subsequence = {"points": [{"lng": point['lng'], "lat": point['lat']}],
                                   "dangerLevel": prediction}
        else:
            current_subsequence["points"].append({"lng": point['lng'], "lat": point['lat']})

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
