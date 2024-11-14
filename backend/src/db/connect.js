import mongoose from "mongoose";

const connect = async () => {
    try {
        console.log("Attempting to connect to database.");
        await mongoose.connect(process.env.MONGODB_URI, {});
        console.log("Connected to database.")

    } catch (error) {
        console.log(`Failed to connect to MongoDB: ${error}`);
    }
}


export default connect;