const  express = require('express');
const mongoose  = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt')
const Mongo_URL = "mongodb://localhost:27017/login-bata";
const PORT = 5001;
const app = express();
app.use(express.json());
app.use(cors())
mongoose.connect(Mongo_URL)
const db = mongoose.connection;
db.on("error", (err)=>{
    console.error("mobodb connection error")
})
db.once("open", ()=>{
    console.log("connected to MongoDB");
})
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const UserModel= mongoose.model("User",userSchema)
app.post('/register', async (req, res) => {
    try {
        const hashPassword = await bcrypt.hashSync(req.body.password,10)
        const newUser = new UserModel({ // Changed from User to UserModel
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        });
        const savedUser = await newUser.save(); // Wait for save operation to complete
        res.status(200).json(savedUser);
    } catch (error) {
        console.error('Error during registration', error);
        res.status(501).json({ error: "internal server error" });
    }
});
app.listen(PORT);