const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected SucessFully");
    } catch (error) {
        console.log("Error in MongoDB Connection: ",error.message);
    }
};

connectDB();