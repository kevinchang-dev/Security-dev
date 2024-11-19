import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://root:password2021@cluster0.dcqaler.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

export default connectDB;
