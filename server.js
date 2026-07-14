/**
 * Villa Tech Solutions - Main Server File
 * Express.js backend with MongoDB integration
 * Author: David Ayaaba Anyagbilla
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
        },
    },
}));

app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/wishlist', require('./routes/wishlist'));

// Serve HTML pages for all routes (SPA fallback)
const pages = [
    '/', '/shop', '/products', '/about', '/services', 
    '/contact', '/faq', '/privacy', '/terms', '/cart',
    '/login', '/register', '/wishlist', '/checkout',
    '/admin', '/admin/dashboard', '/admin/products',
    '/admin/orders', '/admin/customers'
];

pages.forEach(page => {
    app.get(page, (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n╔══════════════════════════════════════════════════════════════╗`);
    console.log(`║           VILLA TECH SOLUTIONS SERVER RUNNING              ║`);
    console.log(`╠══════════════════════════════════════════════════════════════╣`);
    console.log(`║  Server URL: http://localhost:${PORT}                          ║`);
    console.log(`║  Environment: ${process.env.NODE_ENV || 'development'}                              ║`);
    console.log(`║  Owner: David Ayaaba Anyagbilla                            ║`);
    console.log(`║  Location: Accra, Ghana                                    ║`);
    console.log(`╚══════════════════════════════════════════════════════════════╝\n`);
});

module.exports = app;
