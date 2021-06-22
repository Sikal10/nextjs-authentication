import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log(`mongoDB connected ${connection.connection.host}`.blue.bold.underline)
    } catch (err) {
        console.log(`Error: ${err.message}`);
        // process.exit(1);
    }
}

export default connectDB;