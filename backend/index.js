const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://addFriend:qwertyuiop@addfriend.znuckt2.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Failed to connect to Database");
  });

const connection = mongoose.connection;

const AddFriend = new mongoose.Schema({
  friendname: {
    type: String,
    require: true,
  },
});
const ADDFRIEND = connection.model("friendname", AddFriend);

//routes

app.post("/addfriend", (req, res) => {
  console.log(req.body.friendname);

  if (!req.body.friendname) {
    res.status(403).json({ message: "Please fill the name to add" });
  } else {
    const value = new ADDFRIEND(req.body);
    value.save((err) => {
      if (err) {
        console.log("Data not Saved");
      }
    });
  }
});

app.get("/getfriend", async (req, res) => {
  try {
    const allData = await ADDFRIEND.find({}, (err, result) => {
      if (err) {
        console.log("No data Found");
      } else {
        console.log("data found");
        res.send(result);
      }
    });
  } catch (error) {}
});

app.listen(3004, () => {
  console.log("App is running on port " + 3004);
});
