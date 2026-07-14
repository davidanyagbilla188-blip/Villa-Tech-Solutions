# Villa Tech Solutions - Premium E-Commerce Website

## Overview
A modern, responsive, professional e-commerce website for Villa Tech Solutions, a technology business based in Accra, Ghana. Built with HTML, CSS, JavaScript, and Node.js/Express backend.

## Business Information
- **Business Name:** Villa Tech Solutions
- **Owner:** David Ayaaba Anyagbilla
- **Email:** davidanyagbilla188@gmail.com
- **Phone:** +233 25 679 5545
- **Location:** Accra, Ghana

## Features
- Modern, responsive design with blue, white, and black color scheme
- Single Page Application (SPA) with client-side routing
- Product catalog with 35+ sample products across 16 categories
- Shopping cart with localStorage persistence
- Wishlist functionality
- User registration and login system
- Admin dashboard with product/order management
- Contact form with email validation
- Dark mode toggle
- Loading screen animation
- Mobile-friendly navigation
- SEO optimized structure
- Payment methods: MTN Mobile Money, Telecel Cash, AirtelTigo Money, Visa, Mastercard

## Pages
- Home (Hero, Featured Products, Testimonials, Why Choose Us, Newsletter)
- Shop (with filters, sorting, categories)
- Product Detail
- About Us
- Services
- Contact
- FAQ
- Privacy Policy
- Terms & Conditions
- Cart
- Checkout
- Login / Register
- Wishlist
- Admin Dashboard

## Technology Stack
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose) - optional, runs in demo mode without DB
- **Security:** Helmet, CORS, Rate Limiting, Input Validation
- **Icons:** Font Awesome 6
- **Fonts:** Inter, Poppins (Google Fonts)

## Project Structure
```
villa-tech-solutions/
├── server.js                 # Main Express server
├── package.json              # Dependencies
├── .env                      # Environment variables
├── config/
│   ├── db.js                 # MongoDB connection
│   └── seed.js               # Database seeder with sample data
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── products.js           # Product routes
│   ├── cart.js               # Cart routes
│   ├── orders.js             # Order routes
│   ├── contact.js            # Contact form routes
│   ├── wishlist.js           # Wishlist routes
│   └── admin.js              # Admin routes
├── public/
│   ├── index.html            # Main HTML file
│   ├── css/
│   │   ├── main.css          # Main stylesheet
│   │   ├── dark-mode.css     # Dark mode styles
│   │   └── animations.css    # Animation keyframes
│   ├── js/
│   │   ├── app.js            # Main application logic
│   │   ├── router.js         # Router placeholder
│   │   ├── cart.js           # Cart placeholder
│   │   ├── auth.js           # Auth placeholder
│   │   ├── wishlist.js       # Wishlist placeholder
│   │   ├── search.js         # Search placeholder
│   │   └── animations.js     # Animations placeholder
│   └── images/
│       └── products/         # Product images
├── models/                   # Mongoose models (for future use)
├── middleware/               # Express middleware
└── uploads/                  # File upload directory
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (optional - runs in demo mode without it)

### Steps
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Edit `.env` file with your configuration:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/villa_tech_solutions
   JWT_SECRET=your-secret-key
   ```

3. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Access the website:**
   Open your browser and go to `http://localhost:3000`

## Demo Credentials
- **Admin:** admin@villatech.com / admin123
- **User:** Any email with any password (demo mode)

## Payment Methods Supported
- MTN Mobile Money
- Telecel Cash
- AirtelTigo Money
- Visa Card
- Mastercard

## Customization

### Adding/Replacing Product Images
1. Place new images in `public/images/products/`
2. Update the image filename in the product data (in `routes/products.js` or `config/seed.js`)
3. Restart the server

### Changing Colors
Edit CSS variables in `public/css/main.css`:
```css
:root {
    --primary: #0066CC;        /* Main brand color */
    --primary-dark: #0052A3;   /* Darker shade */
    --primary-light: #3385D6;  /* Lighter shade */
    --secondary: #00C853;      /* Success/green */
    --accent: #FF6D00;         /* Orange accent */
}
```

### Adding New Products
Edit the products array in `routes/products.js` following this structure:
```javascript
{
    id: '36',
    name: 'Product Name',
    brand: 'Brand',
    category: 'category-name',
    description: 'Product description...',
    price: 1000,
    stock: 10,
    image: 'image-filename.png',
    featured: false,
    rating: 4.5,
    reviews: 0
}
```

## Deployment

### Using PM2 (Production)
```bash
npm install -g pm2
pm2 start server.js --name "villa-tech"
pm2 save
pm2 startup
```

### Using Docker
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

### Environment Variables for Production
```
NODE_ENV=production
PORT=3000
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secure-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=davidanyagbilla188@gmail.com
EMAIL_PASS=your-app-password
```

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

## Performance
- Compressed responses with Gzip
- Lazy loading images
- CSS animations with GPU acceleration
- Minimal JavaScript bundle
- LocalStorage for cart/wishlist (no server round-trips)

## SEO Features
- Semantic HTML5 structure
- Meta descriptions and keywords
- Open Graph tags ready
- Structured data ready
- Clean URL structure
- Fast loading times

## Security Features
- Helmet.js for security headers
- CORS configuration
- Rate limiting on API routes
- Input validation with express-validator
- XSS protection
- Secure JWT implementation

## License
MIT License - Villa Tech Solutions

## Author
**David Ayaaba Anyagbilla**
- Email: davidanyagbilla188@gmail.com
- Phone: +233 25 679 5545
- Location: Accra, Ghana

---
Built with pride in Ghana for the world.
