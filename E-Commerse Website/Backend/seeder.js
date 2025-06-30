const Product = require('./models/Product');
const User = require('./models/User');
const products = require('./data/products');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Cart = require('./models/Cart');

dotenv.config();

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URL);

// Function to seed data

const seedData = async ()=>{
    try {
        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

    // Create a default admin User 
    const createdUser=await User.create({
        name:"Admin User",
        email:"admin@example.com",
        password:"123456",
        role:"admin",
    });

    // Assign the default user to each product 
    const userId = createdUser._id;

    const sampleProducts = products.map((product) => {
        return { ...product, user: userId }; // Add user reference to each product
    });

    // Insert the product into the database
    await Product.insertMany(sampleProducts);

    console.log("Product data seeded successfully!");
    process.exit();
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1); 
    }
};

seedData();

// 8:48:05 timestamp