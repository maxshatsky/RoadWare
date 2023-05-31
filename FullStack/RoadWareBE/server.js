require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

const dangerRoutes = require("../RoadWareBE/routes/postRoute");

app.use("/danger", dangerRoutes);

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
