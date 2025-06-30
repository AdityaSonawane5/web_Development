const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");
const { route } = require("./checkoutRoutes");

const router = express.Router();

// @router GET/api/orders/my-orders
// @desc Get logged-in user's orders
// @access Private
router.get("/my-orders", protect, async (req, res) => {
    try {

        // Find orders for the athentication user
        const orders = await Order.find({ user: req.user._id }).sort({
            createdAt: -1,
        });//sort by most recent orders
        res.json(orders);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


// @router GET/api/order/:id
// @desc vGET order details by Id
// @acesses Private

router.get("/:id",protect , async (req,res)=>{
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if(!order){
            return res.status(404).json({message:"Order not Found "});

        }
        // Return the full order details
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message:"Server Error" });
    }
});

module.exports = router;


// 11:05::00 timestamp
