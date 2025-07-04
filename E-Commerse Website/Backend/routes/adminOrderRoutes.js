const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");


const router = express.Router();

// @router GET/api/admin/orders
//@desc Get all order (Admin only)
// @access Private Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "name email");
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }
});


// @router PUT/api/admin/orders/:id
// #desc Update order Status
// @access Private/admin

router.put("/:id", protect, admin, async (req, res) => {
    try { 
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

            const updateOrder = await order.save();
            res.json(updateOrder);
        } else {
            res.status(404).json({ message: "Order is not Found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


// @router DELETE /api/admin/orders/:id
// @desc Delete an orders
// @acesses Private/Admin

router.delete("/:id", protect, admin , async (req,res)=>{
    try {
        const order = await Order.findById(req.params.id);
        
        if(order){
            await order.deleteOne();
            res.json({message:"Order removed"});
        }else{
            res.status(404).json({message:"Order not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    };
});

module.exports = router;
