const express = require("express");
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Server started listening on port: ", PORT));

app.use(express.static("build"));
app.use(cors());
const items = [
  {
    name: "Laptop",
    price: 500,
  },
  {
    name: "Desktop",
    price: 700,
  },
];

app.get("/api/items", (req, res) => {
  console.log(items);
  res.send(items);
});

