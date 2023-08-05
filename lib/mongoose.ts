import mongoose from 'mongoose';

let isConnected = false; // to check if mongoose is connected

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) return console.log('MongoDB_URL not found');
    if (isConnected) return console.log('Already connected to MongoDB');

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;

        console.log('Connection to MongoDB Established');

    } catch (error) {
        console.log(error)
    }
}