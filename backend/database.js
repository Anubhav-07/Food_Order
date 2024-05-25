const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://User_1:7WNG8MrcnZUeRpXL@mongotube.fkafwkz.mongodb.net/customers';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        // Fetch orders data
        global.food_items = await fetchCollectionData('orders');

        // Fetch category data
        global.foodCategory = await fetchCollectionData('category');

        console.log(global.food_items);  // Check if data is being logged
        console.log(global.foodCategory);  // Check if data is being logged

    } catch (err) {
        console.error("Database connection error:", err);
        await mongoose.disconnect();  // Ensure MongoDB connection is closed on error
    }
};

// Helper function to fetch data from a collection
const fetchCollectionData = async (collectionName) => {
    try {
        const collection = mongoose.connection.db.collection(collectionName);
        const data = await collection.find({}).toArray();
        if (data.length === 0) {
            console.warn(`No data found in collection: ${collectionName}`);
        }
        return data;
    } catch (err) {
        console.error(`Error fetching data from collection ${collectionName}:`, err);
        return [];
    }
};

module.exports = connectToMongoDB;
