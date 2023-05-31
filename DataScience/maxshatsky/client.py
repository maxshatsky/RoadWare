import pandas as pd
import numpy as np
import requests
import json


def main():
    # f = open('data.json').read()

    # with open('data_orig.json', 'r') as json_file:
    #     data = json.load(json_file)
    #
    # json_string = open('data_test.json').read()
    #
    # response = requests.post(
    #     'http://localhost:5000/predict',
    #     # 'http://3.71.22.196:8080/predict',
    #     params=data
    # )

    with open('data_test.json') as json_file:
        json_data = json.load(json_file)

    # Send a POST request with the JSON data
    response = requests.post(
        'http://localhost:5000/predict',
        json=json_data,  # Pass the JSON data in the request body
        headers={'Content-Type': 'application/json'}  # Set the content type header
    )

    stoppoint=2

    # response = requests.get(
    #     # 'http://localhost:5000/predict',
    #     'http://3.71.22.196:8080/predict',
    #     params={"test_input": open('orig_data.json').read()}
    # )


if __name__ == '__main__':
    main()
