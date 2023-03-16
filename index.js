const express = require("express");
const mongodb = require("mongodb");
const ObjectId = require('mongodb').ObjectId;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); //dotenv config
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://new-trial-project:rafi1234@cluster0.1uzcg7w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();

    app.post("/api/employees", async (req, res) => {
      try {
        // Add a new Employee object to the 'employees' collection
        const employee = req.body;
        const db = client.db();
        const result = await db.collection("employees").insertOne(employee);

        // Return success status and URL of created object
        res.status(201).location(`/api/employees/${result.insertedId}`).send();
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
      }
    });

    app.get('/api/employees', async (req, res) => {
      const db = client.db();
      const cursor = db.collection("employees").find({});
      const services = await cursor.toArray();
      console.log(services);
      res.send(services);
    })

    app.get("/api/employees/:id", async (req, res) => {
      try {

        const db = client.db();
        const id = req.params.id;
        const query = { _id: mongodb.ObjectId(id) };
        const employee = await db.collection("employees").findOne(query);
        console.log(req.params);
        //res.send(employee);

        if (!employee) {
          return res.status(404).send("Not found");
        }
        res.send(employee);
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
      }
    });

    app.put("/api/employees/:id", async (req, res) => {
      try {
        // Find an Employee object with the given ID in the 'employees' collection
        const db = client.db();
        const employee = await db.collection("employees").findOne({ _id: ObjectId(req.params.id) });

        if (!employee) {
          return res.status(404).send("Not found");
        }

        // Update the Employee object with data from request body
        const updatedEmployee = { ...employee, ...req.body };

        // Save the updated Employee object to the 'employees' collection
        await db.collection("employees").updateOne(
          { _id: ObjectId(req.params.id) },
          { $set: updatedEmployee }
        );

        // Return success status and URL of updated object
        res.location(`/api/employees/${req.params.id}`).send();
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
      }
    });



    app.delete("/api/employees/:id", async (req, res) => {
      try {
        // Find and delete an Employee object with the given ID from the 'employees' collection
        const db = client.db();
        const result = await db.collection("employees").deleteOne({ _id: ObjectId(req.params.id) });

        // If no Employee object was deleted, return 404 status code
        if (result.deletedCount === 0) {
          return res.status(404).send("Not found");
        }

        // Return success status
        res.send();
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
      }
    });


  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Server is ok')
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})
