import express from "express";
import axios from "axios";

const app = express();
const PORT = 6060;

const BASE_URL = "https://t4e-testserver.onrender.com/api";

let dataset = []
const loadData = async () => {
    try{
        const tokenResponse = await axios.post(`${BASE_URL}/public/token`,{
            "studentId" : "E0223013",
            "set":"setA",
            "password":"495490"
        });

        const {token,dataUrl} = tokenResponse.data;


        const dataResponse = await axios.get(`${BASE_URL}${dataUrl}`,{
            
            headers : {Authorization : `Bearer ${token}`},
        });

        dataset = dataResponse.data;

        app.listen(PORT,() =>{
            console.log(`Server is Running at ${PORT}`);
        });
    }
catch(err){
    console.log(err);
}}

loadData();



app.get("/",(req,res)=>{
    res.json(dataset);
})

app.get("/orders",(req,res)=>{
    res.json(dataset);
})

app.get("/orders/:id",async (req,res) => {
    try{
    const id = req.params.id;
    const order = dataset.data.order.find((m) => m.id === id);
    if(!order)
        return res.status(404).json({message: "Order found"});
    res.send(order);
}
    catch(err){
        res.json({message: "Order not found"});
    }
 });