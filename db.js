/**
 * Villa Tech Solutions - Database Configuration
 * MongoDB connection setup with Mongoose
 */

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/villa_tech_solutions', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        // Continue without DB for demo purposes - use in-memory data
        console.log('⚠️  Running in demo mode without database connection');
    }
};

module.exports = connectDB;
