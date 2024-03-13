const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://amanmohammadmk:aman2335@cluster0.zy3vmk3.mongodb.net/product?retryWrites=true&w=majority&appName=Cluster0");

app.listen(3005, () => console.log("Server running at port 3005"));

// Create a Mongoose Schema for your data
const DataSchema = new mongoose.Schema({
    text: String
});

const DataModel = mongoose.model('msgs', DataSchema);

// Route to handle POST requests
app.post('/home', async (req, res) => {
    try {
        const { text } = req.body;

        // Create a new document with the received content
        const newData = new DataModel({ text });

        // Save the new document to the database
        await newData.save();

        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/fetch-text', async (req, res) => {
    try {
        const data = await DataModel.find();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
