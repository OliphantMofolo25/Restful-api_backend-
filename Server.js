const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Molefe_Mofolo:db1234@cluster0.gz6dx.mongodb.net/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose models
const User = mongoose.model('User ', new mongoose.Schema({
    name: { type: String, required: true }
}));

const Product = mongoose.model('Product', new mongoose.Schema({
    name: { type: String, required: true }
}));

const Order = mongoose.model('Order', new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true }
}));

// User Management CRUD operations
app.post('/users', async (req, res) => {
    const newUser  = new User({ name: req.body.name });
    await newUser .save();
    res.status(201).json(newUser );
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User  not found');
    }
});

app.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User  not found');
    }
});

app.delete('/users/:id', async (req, res) => {
    const result = await User.findByIdAndDelete(req.params.id);
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send('User  not found');
    }
});

// Product Management CRUD operations
app.post('/products', async (req, res) => {
    const newProduct = new Product({ name: req.body.name });
    await newProduct.save();
    res.status(201).json(newProduct);
});

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.put('/products/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.delete('/products/:id', async (req, res) => {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send('Product not found');
    }
});

// Order Management CRUD operations
app.post('/orders', async (req, res) => {
    const newOrder = new Order({ productId: req.body.productId, userId: req.body.userId });
    await newOrder.save();
    res.status(201).json(newOrder);
});

app.get('/orders', async (req, res) => {
    const orders = await Order.find().populate('productId userId');
    res.json(orders);
});

app.get('/orders/:id', async (req, res) => {
    const order = await Order.findById(req.params.id).populate('productId userId');
    if (order) {
        res.json(order);
    } else {
        res.status(404).send('Order not found');
    }
});

app.put('/orders/:id', async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (order) {
        res.json(order);
    } else {
        res.status(404).send('Order not found');
    }
});

app.delete('/orders/:id', async (req, res) => {
    const result = await Order.findByIdAndDelete(req.params.id);
    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send('Order not found');
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});