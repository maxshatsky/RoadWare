from flask import Flask, request
import numpy as np
import json

app = Flask(__name__)


class dumb_model:
    def __init__(self):
        pass

    def predict(self, points):
        if points.shape[0] > 1:
            output = np.zeros(points.shape[0])

            for i in range(len(output) // 5, len(output) // 3):
                output[i] = 1

            for i in range(len(output) // 3, len(output) // 2):
                output[i] = 2

            for i in range(len(output) // 2, 2 * len(output) // 3):
                output[i] = 1

            return output
        else:
            return np.zeros(points.shape[0])


model = dumb_model()


def dumb_model_predict(points):
    output = np.zeros(points.shape[0])

    for i in range(len(output) // 5, len(output) // 3):
        output[i] = 1

    for i in range(len(output) // 3, len(output) // 2):
        output[i] = 2

    for i in range(len(output) // 2, 2 * len(output) // 3):
        output[i] = 1

    return output


@app.route('/predict')
def predict_churn():
    json_string = list(request.args.keys())[0]

    data = json.loads(json_string)

    input_points = np.array([[point['lng'], point['lat']] for point in data])

    predictions = model.predict(input_points).astype(int)

    output_json_string = '[{'

    for point, prediction in zip(input_points, predictions):
        output_json_string += "{\"points\":[{\"lng\":"
        output_json_string += str(point[0])
        output_json_string += ",\"lat\":"
        output_json_string += str(point[1])
        output_json_string += "}],\"dangerLevel\":"
        output_json_string += str(prediction)
        output_json_string += "},"

    output_json_string = output_json_string[:-1]
    output_json_string += ']}'

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
