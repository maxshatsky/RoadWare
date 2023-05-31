const { getDangerLevelsModel } = require("../models/postModel");

const getDangerLevels = (req, res) => {
  try {
    res.status(200).send("successful request!");
  } catch (err) {
    res.status(400).send("too bad something wnt wrong!");
  }
};

module.exports = { getDangerLevels };
