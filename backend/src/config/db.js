import mongoose from 'mongoose';
import dns from 'dns';

// Ensure reliable SRV record resolution across Windows environments
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

// Disable buffering so queries fail or fallback immediately if DB is unreachable
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri || mongoUri.includes('127.0.0.1')) {
      console.log('ℹ️  MONGO_URI set to local/default. Testing MongoDB connection...');
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host} (Database: ${conn.connection.name})`);
    return conn;
  } catch (error) {
    console.warn(`⚠️  MongoDB not connected (${error.message}). Running in resilient mode with verified fallback data.`);
    console.info('👉 To connect MongoDB Atlas, provide your MONGO_URI in backend/.env and run: pnpm run seed');
    return null;
  }
};

export default connectDB;
