import mongoose from 'mongoose'

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error (" please define mongo environment variable")
}

async function connectToDatabase() {
    if (mongoose.connection.readyState === 1) {
        return mongoose;
    }
    const opts = {
        bufferCommands: false,
    }
    await mongoose.connect(DATABASE_URL!, opts);
    return mongoose;
}

export default connectToDatabase;