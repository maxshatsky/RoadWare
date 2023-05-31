import pandas as pd
import numpy as np
import requests
import json


def main():
    # f = open('data.json').read()

    f = open('orig_data.json').read()

    data = json.loads(f)  # Parse the JSON string into a Python object

    # Convert the Python object into a NumPy array
    test_input = [[point['lng'], point['lat']] for point in data]


    response = requests.get(
        'http://localhost:5000/predict',
        params={"test_input": open('orig_data.json').read()}
    )

    stoppoint=2


if __name__ == '__main__':
    main()
