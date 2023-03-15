/* const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('<mongo-db-url>', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error(error);
  });

// Employee Schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  familyName: { type: String, required: true },
  address: { type: String, required: true },
  emailAddress: { type: String, required: true },
  age: { type: Number, required: true },
  hired: { type: Boolean, default: false }
});

// Employee Model
const Employee = mongoose.model('Employee', employeeSchema);

// CRUD endpoints for Employee object
app.post('/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.validate();
    const result = await employee.save();
    res.status(201).json({ message: 'Employee created successfully', location: `/employees/${result._id}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
    } else {
      res.json(employee);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
    } else {
      Object.assign(employee, req.body);
      await employee.validate();
      await employee.save();
      res.json({ message: 'Employee updated successfully' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
    } else {
      res.json({ message: 'Employee deleted successfully' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
 */



/* const express = require("express");
const mongodb = require("mongodb");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { validationResult } = require("fluent-validation");
require("dotenv").config();//dotenv config
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const { MongoClient, ServerApiVersion,ObjectID } = require('mongodb');
const uri = `mongodb+srv://new-trial-project:rafi1234@cluster0.1uzcg7w.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    
    app.post("/api/employees", async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

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

    app.get("/api/employees/:id", async (req, res) => {
      try {
        // Find an Employee object with the given ID in the 'employees' collection
        const db = client.db();
        const employee = await db.collection("employees")
          .findOne({ _id: ObjectID(req.params.id) });

        if (!employee) {
          return res.status(404).send("Not found");
        }
        res.json(employee);
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
      }
    });

    app.put("/api/employees/:id", async (req, res) => {
      // Validate input using FluentValidation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        // Find an Employee object with the given ID in the 'employees' collection
        const db = client.db();
        const employee = await db.collection("employees").findOne({ _id: ObjectID(req.params.id) });

        if (!employee) {
          return res.status(404).send("Not found");
        }

        // Update the Employee object with data from request body
        const updatedEmployee = { ...employee, ...req.body };

        // Save the updated Employee object to the 'employees' collection
        await db.collection("employees").updateOne(
          { _id: ObjectID(req.params.id) },
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
        const result = await db.collection("employees").deleteOne({ _id: ObjectID(req.params.id) });

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


  }
  finally {
    //   await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Server is ok')
});

app.listen(port, () => {
  console.log('Port is Ok');
}) */



const express = require("express");
const mongodb = require("mongodb");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); //dotenv config
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const { MongoClient, ServerApiVersion, ObjectID } = require('mongodb');
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

    app.get("/api/employees/:id", async (req, res) => {
      try {
        // Find an Employee object with the given ID in the 'employees' collection
        const db = client.db();
        const employee = await db.collection("employees")
          .findOne({ _id: ObjectID(req.params.id) });

        if (!employee) {
          return res.status(404).send("Not found");
        }
        res.json(employee);
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
      }
    });

    app.put("/api/employees/:id", async (req, res) => {
      try {
        // Find an Employee object with the given ID in the 'employees' collection
        const db = client.db();
        const employee = await db.collection("employees").findOne({ _id: ObjectID(req.params.id) });

        if (!employee) {
          return res.status(404).send("Not found");
        }

        // Update the Employee object with data from request body
        const updatedEmployee = { ...employee, ...req.body };

        // Save the updated Employee object to the 'employees' collection
        await db.collection("employees").updateOne(
          { _id: ObjectID(req.params.id) },
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
        const result = await db.collection("employees").deleteOne({ _id: ObjectID(req.params.id) });

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
