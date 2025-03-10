const express = require('express');
const app = express();

const inventory = [
    { name: "laptop", quantity: 10 },
    { name: "smartphone", quantity: 20 },
    { name: "headphones", quantity: 15 }
];

app.get('/items', (req, res) => {
    try {
        let { name } = req.query;

        if (!name) {
            return res.status(400).json({ msg: "Name cannot be empty" });
        }
        name = name.trim().toLowerCase();
        const itemFound = inventory.find(item => item.name === name);
        if (!itemFound) {
            return res.status(400).json({ msg: "Item not found" });
        }
        return res.json({ msg: "Item found", data: itemFound });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

app.delete('/item/delete', (req, res) => {
    try {
        let { name } = req.query;

        if (!name) {
            return res.status(400).json({ msg: "Name cannot be empty" });
        }
        name = name.trim().toLowerCase();
        const index = inventory.findIndex(item => item.name === name);
        if (index === -1) {
            return res.status(400).json({ msg: "Item not found" });
        }

        inventory.splice(index, 1);

        return res.json({ msg: "Item deleted" });
    } catch (err) {
        console.log("Error Found", err);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

app.put('/item/update', (req, res) => {
    try {
        const { name, quantity } = req.query;

        if (!name || !quantity) {
            return res.status(400).json({ msg: "Name and quantity cannot be empty" });
        }
        name = name.trim().toLowerCase();
        const item = inventory.find(item => item.name === name);
        if (!item) {
            return res.status(400).json({ msg: "Item not found" });
        }

        item.quantity = parseInt(quantity, 10);

        return res.json({ msg: "Item updated", data: item });
    } catch (err) {
        console.log("Error Found", err);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
