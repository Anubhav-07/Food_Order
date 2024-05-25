const express = require('express');
const router = express.Router();
const MyOrder = require('../models/MyOrder');

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        data.splice(0, 0, { Order_date: req.body.order_date });

        // Log the incoming data for debugging purposes
        console.log("Order data received:", data);

        let eId = await MyOrder.findOne({ 'email': req.body.email });

        if (!eId) {
            try {
                await MyOrder.create({
                    email: req.body.email,
                    order_data: [data]
                });
                return res.json({ success: true });
            } catch (error) {
                console.error("Error creating new order:", error.message);
                return res.status(500).send("Server Error: " + error.message);
            }
        } else {
            try {
                await MyOrder.findOneAndUpdate(
                    { email: req.body.email },
                    { $push: { order_data: data } }
                );
                return res.json({ success: true });
            } catch (error) {
                console.error("Error updating existing order:", error.message);
                return res.status(500).send("Server Error: " + error.message);
            }
        }
    } catch (error) {
        console.error("Error finding order by email:", error.message);
        return res.status(500).send("Server Error: " + error.message);
    }
});
router.post('/orderHistory',async(req,res)=>{
    try{
        let myData=await MyOrder.findOne({'email':req.body.email})
        res.json({orderData:myData})
    }catch(error){
        res.send("Server Error",error.message)
    }
})

module.exports = router;
