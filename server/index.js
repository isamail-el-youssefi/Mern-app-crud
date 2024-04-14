require("dotenv").config();
const express = require("express");

app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
