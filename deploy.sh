#!/bin/bash
# Villa Tech Solutions - Deployment Script
# Usage: ./deploy.sh [platform]
# Platforms: render, railway, heroku, docker, vps

set -e

PLATFORM=${1:-docker}
echo "🚀 Deploying Villa Tech Solutions to $PLATFORM..."

case $PLATFORM in
  render)
    echo "📋 Render Deployment Instructions:"
    echo "1. Push code to GitHub: git push origin main"
    echo "2. Go to https://dashboard.render.com"
    echo "3. Click 'New +' → 'Web Service'"
    echo "4. Connect your GitHub repository"
    echo "5. Set build command: npm install"
    echo "6. Set start command: node server.js"
    echo "7. Add environment variables from .env file"
    echo "8. Click 'Create Web Service'"
    ;;

  railway)
    echo "📋 Railway Deployment Instructions:"
    echo "1. Install Railway CLI: npm i -g @railway/cli"
    echo "2. Login: railway login"
    echo "3. Init: railway init"
    echo "4. Deploy: railway up"
    echo "5. Set variables: railway variables set JWT_SECRET=your-secret"
    ;;

  heroku)
    echo "📋 Heroku Deployment Instructions:"
    echo "1. Install Heroku CLI"
    echo "2. heroku create villa-tech-solutions"
    echo "3. git push heroku main"
    echo "4. heroku config:set NODE_ENV=production"
    ;;

  docker)
    echo "🐳 Building Docker containers..."
    docker-compose down 2>/dev/null || true
    docker-compose build --no-cache
    docker-compose up -d
    echo "✅ Application running at http://localhost"
    echo "📊 View logs: docker-compose logs -f app"
    ;;

  vps)
    echo "📋 VPS Deployment Instructions:"
    echo "1. SSH into your server"
    echo "2. Install Docker and Docker Compose"
    echo "3. Clone repo: git clone <your-repo>"
    echo "4. Run: ./deploy.sh docker"
    echo "5. Set up SSL with Certbot"
    ;;

  *)
    echo "❌ Unknown platform: $PLATFORM"
    echo "Usage: ./deploy.sh [render|railway|heroku|docker|vps]"
    exit 1
    ;;
esac

echo "✅ Deployment instructions complete!"
