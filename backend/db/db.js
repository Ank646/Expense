const mongoose = require('mongoose');
const connectDB = async()=>{
   
mongoose
.connect("mongodb://0.0.0.0:27017/expen", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));
}
module.exports = connectDB