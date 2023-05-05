import express from "express";
import cors from "cors";
import axios from "axios";
import fs from "fs";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Define the authorization middleware function
const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== "123") {
    return res.status(401).send("Unauthorized");
  }
  next();
};

// Read JSON

app.get("/getResults", function (req, res) {
  fs.readFile("json.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      return res.send(data);
    }
  });
});

// DELETE CALLER

app.delete("/deleteCaller", authorize, (req, res) => {
  let deleteID = req.body.id;
  fs.readFile("json.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let dataJson = JSON.parse(data);
      let getIndex = dataJson.findIndex((e) => e.id == deleteID);
      dataJson.splice(getIndex, 1);
      if (getIndex !== -1) {
        fs.writeFile("json.json", JSON.stringify(dataJson), "utf8", (err) => {
          if (!err) {
            return res.json(dataJson);
          } else {
            console.error(err);
          }
        });
      }
    }
  });
});

// ADD CALLER

app.post("/addCaller", (req, res) => {
  fs.readFile("json.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let dataJson = JSON.parse(data);
      var newCaller = { id: dataJson[dataJson.length - 1].id + 1, ...req.body };

      dataJson.push(newCaller);
      fs.writeFile("json.json", JSON.stringify(dataJson), "utf8", (err) => {
        if (!err) {
          return res.json(dataJson);
        } else {
          console.error(err);
        }
      });
    }
  });
});

// UPDATE CALLER

app.post("/updateCaller", (req, res) => {
  let changeArray = req.body;

  fs.readFile("json.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let dataJson = JSON.parse(data);
      let updateIndex = dataJson.findIndex((e) => e.id == changeArray.id);
      dataJson[updateIndex] = changeArray;
      fs.writeFile("json.json", JSON.stringify(dataJson), "utf8", (err) => {
        if (!err) {
          return res.json(dataJson);
        } else {
          console.error(err);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log("Listening to port: " + port);
});
