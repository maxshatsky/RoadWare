import requests
import json


def main():
    with open('data_test.json') as json_file:
        json_data = json.load(json_file)

    # Send a POST request with the JSON data
    response = requests.post(
        'http://localhost:5000/predict',
        # 'http://3.71.22.196:8080/predict',
        json=json_data,  # Pass the JSON data in the request body
        headers={'Content-Type': 'application/json'}  # Set the content type header
    )

    stop=2


if __name__ == '__main__':
    main()
