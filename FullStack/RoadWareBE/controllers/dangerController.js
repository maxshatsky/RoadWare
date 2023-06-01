const { getDangerLevelsModel } = require("../models/dangerModel");
const fs = require('fs');
const { default: axios } = require("axios");

const getDangerLevels = async (req, res) => {
  console.log(req.body)

  try {
    const points = req.body
    // console.log(req.body)
    const response = await axios.post("http://3.71.22.196:8080/predict", points);
    const responseData = response.data;

    res.status(200).json(responseData);
    fs.writeFileSync('data.json', JSON.stringify(points))
    // res.status(200).send("successful request!");
  } catch (err) {
    console.log(err)
    res.status(400).send("too bad something wnt wrong!");
  }
};

module.exports = { getDangerLevels };
