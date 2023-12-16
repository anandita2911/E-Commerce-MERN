import express from "express";
import colors from "colors";
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';


dotenv.config();

//database config
connectDB();

const app=express()

//middlewware
app.use(cors());
app.use(express.json())
app.use(morgan('dev')) 

//routes
app.use('/api/v1/auth', authRoutes); 
app.use('/api/v1/category',categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=604800');
    next();
  });
  
  // Other middleware, routes, and configurations
  


app.get('/', (req,res)=>{
    res.send('<h1>Welcome to Ecommerce website</h1>'
    );

})

const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>{
    console.log(`server running on ${process.env.DEV_MODE} ${PORT}`.bgCyan.white);

})


































