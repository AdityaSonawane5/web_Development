const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @route POST /api/products
// @desc Create a new Product
// @access Private/Admin

router.post("/", protect, admin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        } = req.body;

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user: req.user._id //Reference to the admin user who created it
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route  PUT /api/products/:id
// @decs Update a Product 
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        } = req.body;

        // Find the Product by ID
        const product = await Product.findById(req.params.id);

        if (product) {
            // Update the Product fields
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;


            //save the updated Product
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
});


// @route DELETE /api/products/:id
// @desc Delete a Product
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        // Find the Product by ID
        const product = await Product.findById(req.params.id);

        if (product) {
            // Remove the Product from DB
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")

    }
});



// @route GET /api/products
// @desc Get all Products with optional query filters
// @access Public
router.get("/", async (req, res) => {
    try {
        const {
            collections,
            sizes,
            colors,
            gender,
            miniPrice,
            maxPrice,
            sortBy,
            search,
            category,
            material,
            brand,
            limit,
        } = req.query;

        let query = {};

        // Filter Logic
        if (collections && collections.toLocaleLowerCase() !== "all") {
            query.collections = collections;

        }
        if (category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
        }

        if (material) {
            query.material = { $in: material.split(',') };
        }

        if (brand) {
            query.brand = { $in: brand.split(',') };
        }

        if (sizes) {
            query.sizes = { $in: sizes.split(',') };
        }

        if (colors) {
            query.colors = { $in: [colors] }
        }

        if (gender) {
            query.gender = gender;
        }

        if (miniPrice || maxPrice) {
            query.price = {};

            if (miniPrice) query.price.$gte = Number(miniPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },

            ];
        }

        // Sort Logic
        let sort={};

        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 };
                    break;
                case "priceDesc":
                    sort = { price: -1 };
                    break;
                case "popularity":
                    sort = { rating: -1 };
                    break;
                default:
                    break;
            }
        }

        // Feach Product and apply filters
        let products = await Product.find(query)
        .sort(sort)
        .limit(Number(limit) || 0);

        res.json(products);


    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


// @route GET /api/products/best-sellers
// @desc Retrieve the Products with the highest ratings
// @access Public
router.get("/best-seller", async (req, res) => {
    try {
        const bestSellers = await Product.findOne().sort({ rating: -1 });
        if (bestSellers) {
            res.json(bestSellers);
        } else {
            res.status(404).json({ message: "No best sellers found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
        
    }
});


// @route GET /api/products/new-arrivals
// @desc Retrieve the latest Products-creation date
// @access Public
router.get("/new-arrivals", async (req, res) => {
    try {
        // Feach last 8 Products
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
        res.json(newArrivals);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})


// @route GET /api/products/:id
// @desc Get a single Product by ID
// @access Public

router.get("/:id", async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (product){
            res.json(product);
        }else{
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error); 
        res.status(500).send("Server Error");  
    }
});


// @route GET /api/products/similar/:id
// @desc Get similar Products based on the current product's gender and category
// @access Public
router.get("/similar/:id", async (req,res)=>{
    const {id} = req.params;
    try {
        const product = await Product.findById(id);

        if (!product){
            return res.status(404).json({message:"Product not found"});
        }

        const similarProducts = await Product.find({
            _id: {$ne: id}, // Exclude the current product ID
            gender:product.gender,
            category: product.category,
        }).limit(4);

        res.json(similarProducts);

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});




module.exports = router;
// 9:04:40 timestamp


