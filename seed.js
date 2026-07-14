/**
 * Villa Tech Solutions - Database Seeder
 * Populates database with sample products and admin user
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 10 },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Sample Products Data
const products = [
    // Laptops
    {
        name: "HP Pavilion 15",
        brand: "HP",
        category: "laptops",
        description: "15.6" FHD Laptop, Intel Core i5-1235U, 8GB RAM, 512GB SSD, Windows 11. Perfect for work and entertainment with stunning visuals.",
        price: 8500,
        stock: 15,
        image: "5_Laptop_White_Background_Images_Browse.png",
        featured: true,
        rating: 4.7,
        reviews: 128
    },
    {
        name: "Dell Inspiron 14",
        brand: "Dell",
        category: "laptops",
        description: "14" Full HD Laptop, Intel Core i3-1215U, 8GB RAM, 256GB SSD. Slim, lightweight design ideal for students and professionals.",
        price: 6200,
        stock: 20,
        image: "5_Laptop_White_Background_Images_Browse.png",
        featured: false,
        rating: 4.5,
        reviews: 89
    },
    {
        name: "Lenovo IdeaPad 3",
        brand: "Lenovo",
        category: "laptops",
        description: "15.6" HD Laptop, AMD Ryzen 5 5500U, 8GB RAM, 512GB SSD. Reliable performance for everyday computing needs.",
        price: 7200,
        stock: 12,
        image: "5_Laptop_White_Background_Images_Browse.png",
        featured: true,
        rating: 4.6,
        reviews: 156
    },
    {
        name: "MacBook Air M2",
        brand: "Apple",
        category: "laptops",
        description: "13.6" Liquid Retina Display, Apple M2 Chip, 8GB RAM, 256GB SSD. Ultra-thin, powerful, and incredibly efficient.",
        price: 18500,
        stock: 8,
        image: "5_Laptop_White_Background_Images_Browse.png",
        featured: true,
        rating: 4.9,
        reviews: 342
    },
    {
        name: "ASUS VivoBook 15",
        brand: "ASUS",
        category: "laptops",
        description: "15.6" FHD Laptop, Intel Core i5-1135G7, 8GB RAM, 512GB SSD. Stylish design with NanoEdge display.",
        price: 7800,
        stock: 18,
        image: "5_Laptop_White_Background_Images_Browse.png",
        featured: false,
        rating: 4.4,
        reviews: 67
    },
    // Smartphones
    {
        name: "Samsung Galaxy S24",
        brand: "Samsung",
        category: "smartphones",
        description: "6.2" Dynamic AMOLED 2X, Snapdragon 8 Gen 3, 8GB RAM, 128GB Storage, 50MP Camera. Flagship performance with AI features.",
        price: 12000,
        stock: 25,
        image: "6_smartphone_white_background_product.png",
        featured: true,
        rating: 4.8,
        reviews: 215
    },
    {
        name: "iPhone 15 Pro",
        brand: "Apple",
        category: "smartphones",
        description: "6.1" Super Retina XDR, A17 Pro Chip, 128GB, Titanium Design, 48MP Camera. The most powerful iPhone ever.",
        price: 16500,
        stock: 10,
        image: "6_smartphone_white_background_product.png",
        featured: true,
        rating: 4.9,
        reviews: 478
    },
    {
        name: "Xiaomi Redmi Note 13",
        brand: "Xiaomi",
        category: "smartphones",
        description: "6.67" AMOLED, Snapdragon 685, 6GB RAM, 128GB Storage, 108MP Camera. Incredible value with premium features.",
        price: 3200,
        stock: 30,
        image: "6_smartphone_white_background_product.png",
        featured: false,
        rating: 4.3,
        reviews: 189
    },
    {
        name: "Google Pixel 8",
        brand: "Google",
        category: "smartphones",
        description: "6.2" OLED, Google Tensor G3, 8GB RAM, 128GB, 50MP Camera. Best-in-class photography with AI magic.",
        price: 9800,
        stock: 14,
        image: "6_smartphone_white_background_product.png",
        featured: true,
        rating: 4.7,
        reviews: 134
    },
    {
        name: "Infinix Note 40",
        brand: "Infinix",
        category: "smartphones",
        description: "6.78" AMOLED, Helio G99, 8GB RAM, 256GB Storage, 108MP Camera. Affordable flagship with fast charging.",
        price: 2800,
        stock: 40,
        image: "6_smartphone_white_background_product.png",
        featured: false,
        rating: 4.2,
        reviews: 267
    },
    // Tablets
    {
        name: "iPad Air 5",
        brand: "Apple",
        category: "tablets",
        description: "10.9" Liquid Retina, M1 Chip, 64GB, Wi-Fi. Powerful and versatile for creativity and productivity.",
        price: 9500,
        stock: 15,
        image: "1_24_100_Tablet_White_Background_Stock.png",
        featured: true,
        rating: 4.8,
        reviews: 198
    },
    {
        name: "Samsung Galaxy Tab S9",
        brand: "Samsung",
        category: "tablets",
        description: "11" Dynamic AMOLED 2X, Snapdragon 8 Gen 2, 128GB, S Pen included. Premium Android tablet experience.",
        price: 11000,
        stock: 12,
        image: "1_24_100_Tablet_White_Background_Stock.png",
        featured: false,
        rating: 4.6,
        reviews: 87
    },
    // Desktop Computers
    {
        name: "HP Pavilion Desktop",
        brand: "HP",
        category: "desktops",
        description: "Intel Core i5-13400, 16GB RAM, 512GB SSD + 1TB HDD, Windows 11. Powerful desktop for home and office.",
        price: 9500,
        stock: 8,
        image: "4_Desktop_Computer_Tower_Isolated_White.png",
        featured: false,
        rating: 4.5,
        reviews: 45
    },
    {
        name: "Dell OptiPlex 7010",
        brand: "Dell",
        category: "desktops",
        description: "Intel Core i7-12700, 16GB RAM, 512GB SSD. Compact business desktop with enterprise reliability.",
        price: 11500,
        stock: 6,
        image: "4_Desktop_Computer_Tower_Isolated_White.png",
        featured: true,
        rating: 4.7,
        reviews: 34
    },
    // Monitors
    {
        name: "LG 27" UltraGear QHD",
        brand: "LG",
        category: "monitors",
        description: "27" QHD 2560x1440, 165Hz, 1ms, IPS, HDR10. Gaming monitor with stunning color accuracy.",
        price: 4800,
        stock: 20,
        image: "4_Computer_screen_white_background.png",
        featured: true,
        rating: 4.6,
        reviews: 156
    },
    {
        name: "Samsung 24" FHD Monitor",
        brand: "Samsung",
        category: "monitors",
        description: "24" Full HD 1920x1080, 75Hz, IPS Panel, Eye Saver Mode. Crisp display for work and entertainment.",
        price: 2200,
        stock: 25,
        image: "4_Computer_screen_white_background.png",
        featured: false,
        rating: 4.4,
        reviews: 89
    },
    // Printers
    {
        name: "HP LaserJet Pro M404",
        brand: "HP",
        category: "printers",
        description: "Monochrome Laser Printer, 40ppm, Wireless, Duplex Printing. Reliable office printing solution.",
        price: 3500,
        stock: 10,
        image: "2_Photo_Inkjet_Printer_On_White_Background.png",
        featured: false,
        rating: 4.5,
        reviews: 67
    },
    {
        name: "Canon PIXMA G6020",
        brand: "Canon",
        category: "printers",
        description: "All-in-One Ink Tank Printer, Wireless, Scanner, Copier. High-yield printing for home and small office.",
        price: 2800,
        stock: 15,
        image: "2_Photo_Inkjet_Printer_On_White_Background.png",
        featured: true,
        rating: 4.3,
        reviews: 112
    },
    // Keyboards & Mice
    {
        name: "Logitech MK270 Wireless Combo",
        brand: "Logitech",
        category: "keyboards",
        description: "Wireless Keyboard and Mouse, 2.4GHz, Long Battery Life, Full-Size Layout. Reliable wireless productivity.",
        price: 450,
        stock: 50,
        image: "2_Black_Keyboard_Mouse_White_Background.png",
        featured: false,
        rating: 4.4,
        reviews: 234
    },
    {
        name: "Razer BlackWidow V4",
        brand: "Razer",
        category: "keyboards",
        description: "Mechanical Gaming Keyboard, Green Switches, RGB Chroma, Programmable Keys. Ultimate gaming performance.",
        price: 1800,
        stock: 20,
        image: "2_Black_Keyboard_Mouse_White_Background.png",
        featured: true,
        rating: 4.7,
        reviews: 189
    },
    {
        name: "Logitech MX Master 3S",
        brand: "Logitech",
        category: "mice",
        description: "Wireless Mouse, 8000 DPI, MagSpeed Electromagnetic Scrolling, USB-C Charging. Precision for professionals.",
        price: 1200,
        stock: 30,
        image: "2_Black_Keyboard_Mouse_White_Background.png",
        featured: true,
        rating: 4.8,
        reviews: 345
    },
    // Chargers
    {
        name: "Anker PowerPort III 65W",
        brand: "Anker",
        category: "chargers",
        description: "65W USB-C GaN Charger, Compact Design, Compatible with Laptops, Phones, Tablets. Fast charging anywhere.",
        price: 350,
        stock: 40,
        image: "5_White_usb_type_c_charger_cable_for.png",
        featured: false,
        rating: 4.6,
        reviews: 567
    },
    {
        name: "Apple 20W USB-C Charger",
        brand: "Apple",
        category: "chargers",
        description: "20W Fast Charger for iPhone and iPad. Official Apple adapter with USB-C connection.",
        price: 280,
        stock: 60,
        image: "5_White_usb_type_c_charger_cable_for.png",
        featured: false,
        rating: 4.7,
        reviews: 890
    },
    // Power Banks
    {
        name: "Anker PowerCore 20000mAh",
        brand: "Anker",
        category: "power-banks",
        description: "20000mAh Portable Charger, PowerIQ Technology, Dual USB Ports. Charge your devices multiple times.",
        price: 550,
        stock: 35,
        image: "7_power_bank_isolated_on_white_background.png",
        featured: true,
        rating: 4.5,
        reviews: 423
    },
    {
        name: "Xiaomi Mi Power Bank 3",
        brand: "Xiaomi",
        category: "power-banks",
        description: "20000mAh, 18W Fast Charging, USB-C Input/Output, LED Indicators. Sleek and powerful.",
        price: 400,
        stock: 45,
        image: "7_power_bank_isolated_on_white_background.png",
        featured: false,
        rating: 4.4,
        reviews: 312
    },
    // Headphones
    {
        name: "Sony WH-1000XM5",
        brand: "Sony",
        category: "headphones",
        description: "Wireless Noise Cancelling Headphones, 30hr Battery, LDAC, Multipoint Connection. Industry-leading noise cancellation.",
        price: 5200,
        stock: 15,
        image: "1_Headphones_Isolated_On_Background.png",
        featured: true,
        rating: 4.8,
        reviews: 234
    },
    {
        name: "JBL Tune 760NC",
        brand: "JBL",
        category: "headphones",
        description: "Wireless Over-Ear Headphones, Active Noise Cancelling, 35hr Battery, Pure Bass Sound. Affordable premium audio.",
        price: 1200,
        stock: 25,
        image: "1_Headphones_Isolated_On_Background.png",
        featured: false,
        rating: 4.3,
        reviews: 178
    },
    // Smart Watches
    {
        name: "Apple Watch Series 9",
        brand: "Apple",
        category: "smart-watches",
        description: "45mm GPS, Aluminum Case, Retina Display, Health & Fitness Tracking. The ultimate health companion.",
        price: 8500,
        stock: 12,
        image: "3_90_047_Smart_Watch_White_Royalty.png",
        featured: true,
        rating: 4.9,
        reviews: 456
    },
    {
        name: "Samsung Galaxy Watch 6",
        brand: "Samsung",
        category: "smart-watches",
        description: "44mm Bluetooth, Super AMOLED, Body Composition Analysis, Sleep Coaching. Advanced health monitoring.",
        price: 4500,
        stock: 18,
        image: "3_90_047_Smart_Watch_White_Royalty.png",
        featured: false,
        rating: 4.6,
        reviews: 234
    },
    // SSDs
    {
        name: "Samsung 980 Pro 1TB",
        brand: "Samsung",
        category: "ssds",
        description: "NVMe M.2 SSD, PCIe 4.0, Up to 7000MB/s Read Speed. Lightning-fast storage for gaming and professional work.",
        price: 1800,
        stock: 20,
        image: "3_Ssd_Drive_Isolated_On_White_Background.png",
        featured: true,
        rating: 4.8,
        reviews: 312
    },
    {
        name: "Crucial MX500 500GB",
        brand: "Crucial",
        category: "ssds",
        description: "2.5" SATA SSD, Up to 560MB/s Read, 5-Year Warranty. Reliable upgrade for any system.",
        price: 650,
        stock: 30,
        image: "3_Ssd_Drive_Isolated_On_White_Background.png",
        featured: false,
        rating: 4.5,
        reviews: 567
    },
    // RAM
    {
        name: "Corsair Vengeance 16GB DDR4",
        brand: "Corsair",
        category: "ram",
        description: "16GB (2x8GB) DDR4 3200MHz, RGB Lighting, XMP 2.0. High-performance memory for gaming and content creation.",
        price: 900,
        stock: 25,
        image: "3_Ssd_Drive_Isolated_On_White_Background.png",
        featured: false,
        rating: 4.6,
        reviews: 234
    },
    {
        name: "Kingston Fury 32GB DDR4",
        brand: "Kingston",
        category: "ram",
        description: "32GB (2x16GB) DDR4 3600MHz, Beast Series, Plug N Play. Massive memory for heavy workloads.",
        price: 1600,
        stock: 15,
        image: "3_Ssd_Drive_Isolated_On_White_Background.png",
        featured: true,
        rating: 4.7,
        reviews: 145
    },
    // Accessories
    {
        name: "USB-C Hub 7-in-1",
        brand: "Anker",
        category: "accessories",
        description: "7-in-1 USB-C Hub, HDMI 4K, USB 3.0, SD Card Reader, 100W PD Charging. Expand your laptop connectivity.",
        price: 450,
        stock: 40,
        image: "5_White_usb_type_c_charger_cable_for.png",
        featured: false,
        rating: 4.4,
        reviews: 189
    },
    {
        name: "Laptop Cooling Pad",
        brand: "Cooler Master",
        category: "accessories",
        description: "Dual 120mm Fans, Adjustable Height, LED Lighting, USB Powered. Keep your laptop cool during intensive tasks.",
        price: 350,
        stock: 30,
        image: "2_Black_Keyboard_Mouse_White_Background.png",
        featured: false,
        rating: 4.2,
        reviews: 134
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/villa_tech_solutions');
        console.log('Connected to MongoDB...');

        // Clear existing data
        await Product.deleteMany({});
        await User.deleteMany({});
        console.log('Cleared existing data...');

        // Insert products
        await Product.insertMany(products);
        console.log(`✅ Seeded ${products.length} products`);

        // Create admin user
        const adminPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            name: 'David Ayaaba Anyagbilla',
            email: 'admin@villatech.com',
            password: adminPassword,
            phone: '+233 25 679 5545',
            role: 'admin'
        });
        console.log('✅ Admin user created');

        // Create sample customer
        const userPassword = await bcrypt.hash('password123', 10);
        await User.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: userPassword,
            phone: '+233 50 123 4567',
            role: 'user'
        });
        console.log('✅ Sample customer created');

        console.log('\n🎉 Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

// Run if called directly
if (require.main === module) {
    seedDatabase();
}

module.exports = { Product, User, seedDatabase };
