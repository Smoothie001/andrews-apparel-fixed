#!/bin/bash

# Andrew's Apparel - Setup Script
# This script helps you set up the application quickly

set -e

echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║          Andrew's Apparel - Setup Script             ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

# Check if PostgreSQL is accessible
echo ""
echo "Checking for PostgreSQL..."
if command -v psql &> /dev/null; then
    echo -e "${GREEN}✓ PostgreSQL found${NC}"
else
    echo -e "${YELLOW}! PostgreSQL not found locally. You'll need a PostgreSQL database.${NC}"
    echo "  Recommended options:"
    echo "  - Install PostgreSQL locally"
    echo "  - Use Neon (https://neon.tech) - Free tier available"
    echo "  - Use Supabase (https://supabase.com) - Free tier available"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "Step 1: Installing dependencies..."
echo "═══════════════════════════════════════════════════════"
npm install

echo ""
echo "═══════════════════════════════════════════════════════"
echo "Step 2: Environment Variables Setup"
echo "═══════════════════════════════════════════════════════"

if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ Created .env file from .env.example${NC}"
    echo ""
    echo -e "${YELLOW}IMPORTANT: You need to edit the .env file with your credentials:${NC}"
    echo ""
    echo "Required variables:"
    echo "  DATABASE_URL - Your PostgreSQL connection string"
    echo "  JWT_SECRET - Generate with: openssl rand -base64 32"
    echo "  STRIPE_SECRET_KEY - From your Stripe dashboard"
    echo "  EMAIL_* - Your email provider credentials"
    echo ""
    echo "Press Enter to continue after you've configured .env..."
    read
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "Step 3: Database Setup"
echo "═══════════════════════════════════════════════════════"

read -p "Do you want to set up the database now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Pushing database schema..."
    npm run db:push
    
    echo ""
    read -p "Do you want to seed the database with sample data? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Seeding database..."
        npm run db:seed
        echo ""
        echo -e "${GREEN}✓ Database seeded successfully!${NC}"
        echo ""
        echo "Default credentials created:"
        echo "  Admin: admin@andrewsapparel.com / admin123"
        echo "  Customer: customer@test.com / customer123"
    fi
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "Setup Complete!"
echo "═══════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}✓ Installation successful!${NC}"
echo ""
echo "Next steps:"
echo ""
echo "  1. Start the development server:"
echo "     ${GREEN}npm run dev${NC}"
echo ""
echo "  2. Open your browser to:"
echo "     ${GREEN}http://localhost:3000${NC}"
echo ""
echo "  3. Login with admin credentials:"
echo "     Email: admin@andrewsapparel.com"
echo "     Password: admin123"
echo ""
echo "For production deployment, see README.md"
echo ""
echo "Need help? Check the documentation in README.md"
echo ""
