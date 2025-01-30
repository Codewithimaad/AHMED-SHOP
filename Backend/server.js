import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js"
import cors from 'cors'
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();


// App Config
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();


// CORS Middleware Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL, // Allow only this frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow cookies if needed
};



// Middlewares
app.use(express.json());
app.use(cors(corsOptions));



// Api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);




app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
