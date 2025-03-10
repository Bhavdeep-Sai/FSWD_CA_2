const express = require('express');
const app = express();

const inventory =[
    {name:"laptop", quantity: 10},
    {name: "smartphone", quantity: 20},
    {name:"headphones", quantity:15}
]

app.get('/items', (req,res)=>{
    try {
        let {name} = req.query;

        if(!name){
            return res.status(400).json({msg:"Name connot be empty"});
        }
        name = name.trim().toLowerCase();
        const itemFound = inventory.find(item => item.name == name );
        if(!itemFound){
            return res.status(400).json({msg:"Item not found"});
        }
        return res.json({msg:"User found", data: itemFound});
    } catch (error) {
        console.log(error);
        return res.json("Internal server error");
    }
})

app.delete('/item/delete', (req,res)=>{
    try{
        let {name} = req.query;

        const item = inventory.delete(item => item.name == name);
        
        return res.json({msg:"Item deleted"});
    }catch(err){
        console.log("Error Found", err);
        return res.status(500).json({msg:"Internal server error"});
    }
})

app.put("/item/update", (req,res)=>{
    try {
        const {name, quantity} = req.query;

    } catch (error) {
        console.log(err);
        return res.status(500).json({msg:"Internal server error"});
    }
})



const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`server is running at port http://localhost:${PORT}`);
})