import mongoose from 'mongoose';
import config from './config';

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log('Base de datos conectada exitosamente.');
    } catch (error) {
        console.error(error);
        process.exit(1); 
    }
};

export default connectDB;