const { getDangerLevelsModel } = require("../models/dangerModel");
const fs = require('fs')

const getDangerLevels = (req, res) => {
  try {
    const data = req.body
    // console.log(req.body)
    fs.writeFileSync('data.json', JSON.stringify(data))
    res.status(200).send("successful request!");
  } catch (err) {
    console.log(err)
    res.status(400).send("too bad something wnt wrong!");
  }
};

module.exports = { getDangerLevels };
