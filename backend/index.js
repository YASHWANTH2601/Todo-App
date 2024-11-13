import express from "express";
import cors from "cors";
import connectDb from "./config/Db.js"
const app = express();

app.use(cors());
app.use(express.json());

// Routes
import  userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.get('/', (req, res) => {
    res.send('Hello world')
  })
const PORT = process.env.PORT || 5000;

const startServer=async()=>{
    try {
        await connectDb()
        app.listen(PORT, () =>{ console.log(`Server running on port ${PORT}`)});
    } catch (error) {
        console.error("error is",error.message);
        
    }
}


startServer()