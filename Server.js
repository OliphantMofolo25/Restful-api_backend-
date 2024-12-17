const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory storage
let users = [];
let products = [];
let orders = [];

// User Management CRUD operations
app.post('/users', (req, res) => {
    const newUser  = { id: Date.now(), name: req.body.name };
    users.push(newUser );
    res.status(201).json(newUser );
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User  not found');
    }
});

app.put('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        users[index] = req.body;
        res.json(users[index]);
    } else {
        res.status(404).send('User  not found');
    }
});

app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        users.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('User  not found');
    }
});

// Product Management CRUD operations
app.post('/products', (req, res) => {
    const newProduct = { id: Date.now(), name: req.body.name };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.put('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        products[index] = req.body;
        res.json(products[index]);
    } else {
        res.status(404).send('Product not found');
    }
});

app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        products.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Product not found');
    }
});

// Order Management CRUD operations
app.post('/orders', (req, res) => {
    const newOrder = { id: Date.now(), productId: req.body.productId, userId: req.body.userId };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

app.get('/orders', (req, res) => {
    res.json(orders);
});

app.get('/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (order) {
        res.json(order);
    } else {
        res.status(404).send('Order not found');
    }
});

app.put('/orders/:id', (req, res) => {
    const index = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (index !== -1) {
        orders[index] = req.body;
        res.json(orders[index]);
    } else {
        res.status(404).send('Order not found');
    }
});

app.delete('/orders/:id', (req, res) => {
    const index = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (index !== -1) {
        orders.splice(index, 1);
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