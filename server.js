import express from "express";
import axios from "axios";

const app = express();
const PORT = 6060;

const BASE_URL = "https://t4e-testserver.onrender.com/api";

let dataset = []
let orders=[]
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
        orders = dataset.data.orders;

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
    res.json(dataset.data.orders);
})

app.get("/orders/valid", (req, res) => {
  const validOrders = orders.filter(order =>
    order.items &&
    order.items.length > 0 &&
    order.items.every(i => i.quantity > 0) &&
    order.totalAmount > 0
  );

  res.json(validOrders);
});

app.get("/orders/stats", (req, res) => {
  const validOrders = orders.filter(o =>
    o.items &&
    o.items.length > 0 &&
    o.items.every(i => i.quantity > 0) &&
    o.totalAmount > 0
  );

  const stats = {
    totalOrders: validOrders.length,
    deliveredOrders: validOrders.filter(o => o.status === "Delivered").length,
    cancelledOrders: validOrders.filter(o => o.status === "Cancelled").length
  };

  res.json(stats);
});

app.get("/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const order = orders.find(o => o.orderId === id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});


app.patch("/orders/:id/deliver", (req, res) => {
  const id = parseInt(req.params.id);

  const order = orders.find(o => o.orderId === id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.status !== "Delivered") {
    order.status = "Delivered";
  }

  res.json(order);
});
