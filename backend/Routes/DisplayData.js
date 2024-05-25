const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        // Check if data is available
        if (global.food_items && global.food_items.length > 0 && global.foodCategory && global.foodCategory.length > 0) {
            // Send the data as an array with food items and categories
            res.json([global.food_items, global.foodCategory]);
        } else {
            // If no data is available, send an appropriate response
            res.status(404).json({ message: 'No food data available' });
        }
    } catch (error) {
        // Log any errors and send an error response
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
