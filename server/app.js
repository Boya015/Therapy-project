const express = require("express");
const dotenv = require("dotenv");
const contactRoutes = require("./routes/contactRoutes");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors")
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
