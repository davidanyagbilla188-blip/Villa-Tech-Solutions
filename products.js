/**
 * Villa Tech Solutions - Products Routes
 * Handles product listing, search, filtering, and details
 */

const express = require('express');
const router = express.Router();

// Sample products data (in production, fetch from MongoDB)
const products = [
    {
        id: '1', name: 'HP Pavilion 15', brand: 'HP', category: 'laptops',
        description: '15.6" FHD Laptop, Intel Core i5-1235U, 8GB RAM, 512GB SSD, Windows 11.',
        price: 8500, stock: 15, image: '5_Laptop_White_Background_Images_Browse.png',
        featured: true, rating: 4.7, reviews: 128
    },
    {
        id: '2', name: 'Dell Inspiron 14', brand: 'Dell', category: 'laptops',
        description: '14" Full HD Laptop, Intel Core i3-1215U, 8GB RAM, 256GB SSD.',
        price: 6200, stock: 20, image: '5_Laptop_White_Background_Images_Browse.png',
        featured: false, rating: 4.5, reviews: 89
    },
    {
        id: '3', name: 'Lenovo IdeaPad 3', brand: 'Lenovo', category: 'laptops',
        description: '15.6" HD Laptop, AMD Ryzen 5 5500U, 8GB RAM, 512GB SSD.',
        price: 7200, stock: 12, image: '5_Laptop_White_Background_Images_Browse.png',
        featured: true, rating: 4.6, reviews: 156
    },
    {
        id: '4', name: 'MacBook Air M2', brand: 'Apple', category: 'laptops',
        description: '13.6" Liquid Retina, Apple M2 Chip, 8GB RAM, 256GB SSD.',
        price: 18500, stock: 8, image: '5_Laptop_White_Background_Images_Browse.png',
        featured: true, rating: 4.9, reviews: 342
    },
    {
        id: '5', name: 'ASUS VivoBook 15', brand: 'ASUS', category: 'laptops',
        description: '15.6" FHD, Intel Core i5-1135G7, 8GB RAM, 512GB SSD.',
        price: 7800, stock: 18, image: '5_Laptop_White_Background_Images_Browse.png',
        featured: false, rating: 4.4, reviews: 67
    },
    {
        id: '6', name: 'Samsung Galaxy S24', brand: 'Samsung', category: 'smartphones',
        description: '6.2" Dynamic AMOLED 2X, Snapdragon 8 Gen 3, 8GB RAM, 128GB, 50MP Camera.',
        price: 12000, stock: 25, image: '6_smartphone_white_background_product.png',
        featured: true, rating: 4.8, reviews: 215
    },
    {
        id: '7', name: 'iPhone 15 Pro', brand: 'Apple', category: 'smartphones',
        description: '6.1" Super Retina XDR, A17 Pro Chip, 128GB, Titanium Design.',
        price: 16500, stock: 10, image: '6_smartphone_white_background_product.png',
        featured: true, rating: 4.9, reviews: 478
    },
    {
        id: '8', name: 'Xiaomi Redmi Note 13', brand: 'Xiaomi', category: 'smartphones',
        description: '6.67" AMOLED, Snapdragon 685, 6GB RAM, 128GB, 108MP Camera.',
        price: 3200, stock: 30, image: '6_smartphone_white_background_product.png',
        featured: false, rating: 4.3, reviews: 189
    },
    {
        id: '9', name: 'Google Pixel 8', brand: 'Google', category: 'smartphones',
        description: '6.2" OLED, Google Tensor G3, 8GB RAM, 128GB, 50MP Camera.',
        price: 9800, stock: 14, image: '6_smartphone_white_background_product.png',
        featured: true, rating: 4.7, reviews: 134
    },
    {
        id: '10', name: 'Infinix Note 40', brand: 'Infinix', category: 'smartphones',
        description: '6.78" AMOLED, Helio G99, 8GB RAM, 256GB, 108MP Camera.',
        price: 2800, stock: 40, image: '6_smartphone_white_background_product.png',
        featured: false, rating: 4.2, reviews: 267
    },
    {
        id: '11', name: 'iPad Air 5', brand: 'Apple', category: 'tablets',
        description: '10.9" Liquid Retina, M1 Chip, 64GB, Wi-Fi.',
        price: 9500, stock: 15, image: '1_24_100_Tablet_White_Background_Stock.png',
        featured: true, rating: 4.8, reviews: 198
    },
    {
        id: '12', name: 'Samsung Galaxy Tab S9', brand: 'Samsung', category: 'tablets',
        description: '11" Dynamic AMOLED 2X, Snapdragon 8 Gen 2, 128GB, S Pen.',
        price: 11000, stock: 12, image: '1_24_100_Tablet_White_Background_Stock.png',
        featured: false, rating: 4.6, reviews: 87
    },
    {
        id: '13', name: 'HP Pavilion Desktop', brand: 'HP', category: 'desktops',
        description: 'Intel Core i5-13400, 16GB RAM, 512GB SSD + 1TB HDD.',
        price: 9500, stock: 8, image: '4_Desktop_Computer_Tower_Isolated_White.png',
        featured: false, rating: 4.5, reviews: 45
    },
    {
        id: '14', name: 'Dell OptiPlex 7010', brand: 'Dell', category: 'desktops',
        description: 'Intel Core i7-12700, 16GB RAM, 512GB SSD.',
        price: 11500, stock: 6, image: '4_Desktop_Computer_Tower_Isolated_White.png',
        featured: true, rating: 4.7, reviews: 34
    },
    {
        id: '15', name: 'LG 27" UltraGear QHD', brand: 'LG', category: 'monitors',
        description: '27" QHD 2560x1440, 165Hz, 1ms, IPS, HDR10.',
        price: 4800, stock: 20, image: '4_Computer_screen_white_background.png',
        featured: true, rating: 4.6, reviews: 156
    },
    {
        id: '16', name: 'Samsung 24" FHD Monitor', brand: 'Samsung', category: 'monitors',
        description: '24" Full HD 1920x1080, 75Hz, IPS Panel.',
        price: 2200, stock: 25, image: '4_Computer_screen_white_background.png',
        featured: false, rating: 4.4, reviews: 89
    },
    {
        id: '17', name: 'HP LaserJet Pro M404', brand: 'HP', category: 'printers',
        description: 'Monochrome Laser Printer, 40ppm, Wireless, Duplex.',
        price: 3500, stock: 10, image: '2_Photo_Inkjet_Printer_On_White_Background.png',
        featured: false, rating: 4.5, reviews: 67
    },
    {
        id: '18', name: 'Canon PIXMA G6020', brand: 'Canon', category: 'printers',
        description: 'All-in-One Ink Tank, Wireless, Scanner, Copier.',
        price: 2800, stock: 15, image: '2_Photo_Inkjet_Printer_On_White_Background.png',
        featured: true, rating: 4.3, reviews: 112
    },
    {
        id: '19', name: 'Logitech MK270 Wireless', brand: 'Logitech', category: 'keyboards',
        description: 'Wireless Keyboard and Mouse, 2.4GHz, Long Battery.',
        price: 450, stock: 50, image: '2_Black_Keyboard_Mouse_White_Background.png',
        featured: false, rating: 4.4, reviews: 234
    },
    {
        id: '20', name: 'Razer BlackWidow V4', brand: 'Razer', category: 'keyboards',
        description: 'Mechanical Gaming Keyboard, Green Switches, RGB Chroma.',
        price: 1800, stock: 20, image: '2_Black_Keyboard_Mouse_White_Background.png',
        featured: true, rating: 4.7, reviews: 189
    },
    {
        id: '21', name: 'Logitech MX Master 3S', brand: 'Logitech', category: 'mice',
        description: 'Wireless Mouse, 8000 DPI, MagSpeed Scrolling, USB-C.',
        price: 1200, stock: 30, image: '2_Black_Keyboard_Mouse_White_Background.png',
        featured: true, rating: 4.8, reviews: 345
    },
    {
        id: '22', name: 'Anker PowerPort III 65W', brand: 'Anker', category: 'chargers',
        description: '65W USB-C GaN Charger, Compact, Multi-device.',
        price: 350, stock: 40, image: '5_White_usb_type_c_charger_cable_for.png',
        featured: false, rating: 4.6, reviews: 567
    },
    {
        id: '23', name: 'Apple 20W USB-C Charger', brand: 'Apple', category: 'chargers',
        description: '20W Fast Charger for iPhone and iPad.',
        price: 280, stock: 60, image: '5_White_usb_type_c_charger_cable_for.png',
        featured: false, rating: 4.7, reviews: 890
    },
    {
        id: '24', name: 'Anker PowerCore 20000mAh', brand: 'Anker', category: 'power-banks',
        description: '20000mAh Portable Charger, PowerIQ, Dual USB.',
        price: 550, stock: 35, image: '7_power_bank_isolated_on_white_background.png',
        featured: true, rating: 4.5, reviews: 423
    },
    {
        id: '25', name: 'Xiaomi Mi Power Bank 3', brand: 'Xiaomi', category: 'power-banks',
        description: '20000mAh, 18W Fast Charging, USB-C, LED Indicators.',
        price: 400, stock: 45, image: '7_power_bank_isolated_on_white_background.png',
        featured: false, rating: 4.4, reviews: 312
    },
    {
        id: '26', name: 'Sony WH-1000XM5', brand: 'Sony', category: 'headphones',
        description: 'Wireless Noise Cancelling, 30hr Battery, LDAC.',
        price: 5200, stock: 15, image: '1_Headphones_Isolated_On_Background.png',
        featured: true, rating: 4.8, reviews: 234
    },
    {
        id: '27', name: 'JBL Tune 760NC', brand: 'JBL', category: 'headphones',
        description: 'Wireless Over-Ear, ANC, 35hr Battery, Pure Bass.',
        price: 1200, stock: 25, image: '1_Headphones_Isolated_On_Background.png',
        featured: false, rating: 4.3, reviews: 178
    },
    {
        id: '28', name: 'Apple Watch Series 9', brand: 'Apple', category: 'smart-watches',
        description: '45mm GPS, Aluminum, Retina Display, Health Tracking.',
        price: 8500, stock: 12, image: '3_90_047_Smart_Watch_White_Royalty.png',
        featured: true, rating: 4.9, reviews: 456
    },
    {
        id: '29', name: 'Samsung Galaxy Watch 6', brand: 'Samsung', category: 'smart-watches',
        description: '44mm Bluetooth, Super AMOLED, Body Composition.',
        price: 4500, stock: 18, image: '3_90_047_Smart_Watch_White_Royalty.png',
        featured: false, rating: 4.6, reviews: 234
    },
    {
        id: '30', name: 'Samsung 980 Pro 1TB', brand: 'Samsung', category: 'ssds',
        description: 'NVMe M.2, PCIe 4.0, Up to 7000MB/s Read.',
        price: 1800, stock: 20, image: '3_Ssd_Drive_Isolated_On_White_Background.png',
        featured: true, rating: 4.8, reviews: 312
    },
    {
        id: '31', name: 'Crucial MX500 500GB', brand: 'Crucial', category: 'ssds',
        description: '2.5" SATA, Up to 560MB/s Read, 5-Year Warranty.',
        price: 650, stock: 30, image: '3_Ssd_Drive_Isolated_On_White_Background.png',
        featured: false, rating: 4.5, reviews: 567
    },
    {
        id: '32', name: 'Corsair Vengeance 16GB', brand: 'Corsair', category: 'ram',
        description: '16GB DDR4 3200MHz, RGB, XMP 2.0.',
        price: 900, stock: 25, image: '3_Ssd_Drive_Isolated_On_White_Background.png',
        featured: false, rating: 4.6, reviews: 234
    },
    {
        id: '33', name: 'Kingston Fury 32GB', brand: 'Kingston', category: 'ram',
        description: '32GB DDR4 3600MHz, Beast Series, Plug N Play.',
        price: 1600, stock: 15, image: '3_Ssd_Drive_Isolated_On_White_Background.png',
        featured: true, rating: 4.7, reviews: 145
    },
    {
        id: '34', name: 'USB-C Hub 7-in-1', brand: 'Anker', category: 'accessories',
        description: '7-in-1 Hub, HDMI 4K, USB 3.0, SD Reader, 100W PD.',
        price: 450, stock: 40, image: '5_White_usb_type_c_charger_cable_for.png',
        featured: false, rating: 4.4, reviews: 189
    },
    {
        id: '35', name: 'Laptop Cooling Pad', brand: 'Cooler Master', category: 'accessories',
        description: 'Dual 120mm Fans, Adjustable Height, LED, USB.',
        price: 350, stock: 30, image: '2_Black_Keyboard_Mouse_White_Background.png',
        featured: false, rating: 4.2, reviews: 134
    }
];

// @route   GET /api/products
// @desc    Get all products with filtering
// @access  Public
router.get('/', (req, res) => {
    try {
        let result = [...products];
        const { category, brand, minPrice, maxPrice, search, sort, featured } = req.query;

        // Filter by category
        if (category && category !== 'all') {
            result = result.filter(p => p.category === category);
        }

        // Filter by brand
        if (brand) {
            const brands = brand.split(',');
            result = result.filter(p => brands.includes(p.brand));
        }

        // Filter by price range
        if (minPrice) {
            result = result.filter(p => p.price >= parseInt(minPrice));
        }
        if (maxPrice) {
            result = result.filter(p => p.price <= parseInt(maxPrice));
        }

        // Search
        if (search) {
            const searchLower = search.toLowerCase();
            result = result.filter(p => 
                p.name.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower) ||
                p.brand.toLowerCase().includes(searchLower)
            );
        }

        // Featured products
        if (featured === 'true') {
            result = result.filter(p => p.featured);
        }

        // Sorting
        if (sort) {
            switch (sort) {
                case 'price-asc':
                    result.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    result.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    result.sort((a, b) => b.rating - a.rating);
                    break;
                case 'name':
                    result.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                default:
                    break;
            }
        }

        // Get unique categories and brands for filters
        const categories = [...new Set(products.map(p => p.category))];
        const brands = [...new Set(products.map(p => p.brand))];

        res.json({
            success: true,
            count: result.length,
            categories,
            brands,
            products: result
        });
    } catch (error) {
        console.error('Products error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', (req, res) => {
    try {
        const product = products.find(p => p.id === req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/products/featured/list
// @desc    Get featured products
// @access  Public
router.get('/featured/list', (req, res) => {
    try {
        const featured = products.filter(p => p.featured).slice(0, 8);
        res.json({ success: true, products: featured });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
