# Villa Tech Solutions - Deployment Guide

## Quick Start Options

### Option 1: Render (Easiest - Free Forever)

**Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/villa-tech-solutions.git
git push -u origin main
```

**Step 2: Deploy on Render**
1. Go to https://render.com and sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** villa-tech-solutions
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Click "Advanced" and add environment variables:
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-change-this
   ```
6. Click "Create Web Service"
7. Your site will be live at `https://villa-tech-solutions.onrender.com`

---

### Option 2: Railway (Fastest - Free Trial + Pay-as-you-go)

**Step 1: Install Railway CLI**
```bash
npm install -g @railway/cli
railway login
```

**Step 2: Deploy**
```bash
cd villa-tech-solutions
railway init
railway up
```

**Step 3: Set environment variables**
```bash
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=your-super-secret-jwt-key
```

Your site will be live at `https://villa-tech-solutions.up.railway.app`

---

### Option 3: Docker (Self-hosted / VPS)

**Prerequisites:** Docker and Docker Compose installed

**Step 1: Build and run**
```bash
cd villa-tech-solutions
./deploy.sh docker
```

Or manually:
```bash
docker-compose up -d
```

**Step 2: Access your site**
- Application: http://localhost:3000
- Through Nginx: http://localhost (port 80)

**Step 3: View logs**
```bash
docker-compose logs -f app
```

**Step 4: Stop**
```bash
docker-compose down
```

---

### Option 4: VPS (DigitalOcean, Linode, AWS Lightsail)

**Step 1: SSH into your server**
```bash
ssh root@your-server-ip
```

**Step 2: Install Docker**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER
```

**Step 3: Install Docker Compose**
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

**Step 4: Clone and deploy**
```bash
git clone https://github.com/YOUR_USERNAME/villa-tech-solutions.git
cd villa-tech-solutions
./deploy.sh docker
```

**Step 5: Set up SSL with Certbot**
```bash
sudo apt install certbot
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Environment Variables

Create a `.env` file or set these in your hosting dashboard:

```env
# Required
NODE_ENV=production
PORT=3000
JWT_SECRET=your-super-secret-random-string-min-32-chars

# Optional - MongoDB (if not using, app runs in demo mode)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/villa_tech_solutions

# Optional - Email notifications
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=davidanyagbilla188@gmail.com
EMAIL_PASS=your-app-password

# Optional - Payment integration
PAYSTACK_SECRET_KEY=your_paystack_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

---

## Domain Setup

### Free Subdomain (Provided by platform)
- Render: `https://villa-tech-solutions.onrender.com`
- Railway: `https://villa-tech-solutions.up.railway.app`
- Heroku: `https://villa-tech-solutions.herokuapp.com`

### Custom Domain
1. Buy a domain from Namecheap, GoDaddy, or Google Domains
2. Add DNS records pointing to your hosting platform
3. Configure SSL certificate (usually automatic on Render/Railway)

**Recommended domains for Villa Tech:**
- villatech.com.ng
- villatechgh.com
- villatechsolutions.com

---

## Post-Deployment Checklist

- [ ] Website loads correctly at the deployed URL
- [ ] All pages accessible (Home, Shop, About, Contact, etc.)
- [ ] Products display with images
- [ ] Cart functionality works
- [ ] Login/Register works
- [ ] Contact form submits
- [ ] Dark mode toggle works
- [ ] Mobile responsive design works
- [ ] Admin dashboard accessible with admin credentials
- [ ] SSL certificate active (HTTPS)

---

## Troubleshooting

### "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port already in use
Change the PORT in your environment variables or:
```bash
lsof -i :3000
kill -9 <PID>
```

### MongoDB connection fails
The app works without MongoDB in demo mode. For production:
1. Create a free MongoDB Atlas cluster
2. Whitelist your server IP
3. Update MONGODB_URI in environment variables

### Images not loading
Ensure product images are in `public/images/products/` and referenced correctly in the product data.

---

## Monitoring & Maintenance

### View logs
```bash
# Docker
docker-compose logs -f app

# Render/Railway
# Use platform dashboard
```

### Update deployment
```bash
git pull origin main
./deploy.sh docker  # or platform-specific update
```

### Backup database
```bash
# MongoDB
docker exec villa-tech-mongo mongodump --out /data/backup
```

---

## Support

For deployment issues, contact:
- **Email:** davidanyagbilla188@gmail.com
- **Phone:** +233 25 679 5545
- **Business:** Villa Tech Solutions, Accra, Ghana
