const axios = require("axios");
const { getDangerLevelsModel } = require("../models/postModel");

const getDangerLevels = async (req, res) => {
  try {
    const points = req.body;

    const response = await axios.get("http://3.71.22.196:8080/predict", {
      params: {
        test_input: points,
      },
    });
    const responseData = response.data;

    res.status(200).json(responseData);
  } catch (err) {
    res.status(400).send("too bad something wnt wrong!");
  }
};

module.exports = { getDangerLevels };
// json_string = open("orig_data.json").read();

// response = requests.get(
//   "http://3.71.22.196:8080/predict",
//   (params = { test_input: json_string })
// );
