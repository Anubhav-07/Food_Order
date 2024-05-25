const express = require('express');
const app = express();
const port = 5000;
const connectToMongoDB = require('./database');

// Middleware to enable CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Connect to MongoDB and start the server
connectToMongoDB()
    .then(() => {
        console.log('Connected to MongoDB');
        startServer();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if unable to connect to MongoDB
    });

function startServer() {
    // Middleware to parse JSON in requests
    app.use(express.json());

    // Routes
    app.use('/api', require("./Routes/CreateUser"));
    app.use('/api', require("./Routes/DisplayData"));
    app.use('/api', require("./Routes/OrderData"));

    // Example route for fetching orders data
    app.get('/api/orders', async (req, res) => {
        try {
            const ordersCollection = mongoose.connection.db.collection("orders");
            const fetched_data = await ordersCollection.find({}).toArray();
            console.log('Data from "orders" collection in "customers" database:', fetched_data);
            res.json(fetched_data);
        } catch (err) {
            console.log('Error fetching data from "orders" collection:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Default route
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
}
