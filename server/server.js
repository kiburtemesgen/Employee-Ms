import path from "path"
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import employeeRoutes from './routes/employeeRoutes.js'


dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use("/employees", employeeRoutes)



const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API service is running...");
  });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));