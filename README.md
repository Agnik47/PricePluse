<div align="center">
  <br />
  <h1>PriceChecker – Amazon Price Tracker</h1>
  <p>An e‑commerce price tracking app built while learning web scraping, Next.js, and backend fundamentals.</p>
</div>

## 📋 Table of Contents

1. 🤖 [Overview](#overview)  
2. ⚙️ [Tech Stack](#tech-stack)  
3. 🔋 [Features](#features)  
4. 🤸 [Getting Started](#getting-started)  
5. 🕸️ [Implementation Details](#implementation-details)  

## 🤖 Overview

This project is a web scraper–based **Amazon price tracker** application built with Next.js, Bright Data, and MongoDB.[web:53]  
It allows users to submit Amazon product URLs, scrape live product data, store price history, and send notification emails when prices change or products come back in stock.[web:53][web:57]

## ⚙️ Tech Stack

- **Next.js** (App Router, server actions) for full‑stack React and API routes.[web:53]  
- **Bright Data Web Unlocker** as a scraping proxy to bypass anti‑bot protection on Amazon pages.[web:57]  
- **Cheerio** for parsing HTML and extracting product details (title, prices, description, images).[web:53]  
- **MongoDB + Mongoose** for persisting products, users, and price history.[web:53][web:57]  
- **Nodemailer** for sending email alerts based on price and stock changes.[web:53]  
- **Tailwind CSS + Headless UI** for UI components, modals, and responsive styling.[web:53]

## 🔋 Features

- **Product scraping from Amazon**  
  - Input an Amazon product link and scrape title, current price, original price, images, description, currency, and availability.[web:53][web:57]  

- **Product listing and details**  
  - Homepage shows scraped products with basic info, and each product has a detailed page with pricing, description, and metadata.[web:53]  

- **Price history tracking**  
  - Every cron run appends the latest price to `priceHistory` and updates lowest, highest, and average price.[web:53][web:57]  

- **Email tracking and notifications**  
  - Users can subscribe to a product via email and receive notifications for:
    - Product back in stock  
    - New lowest price  
    - Discount above a configurable threshold (e.g., 40%) via `getEmailNotifType`.[web:53]  

- **Automated cron job**  
  - A scheduled route periodically re‑scrapes all products, updates the database, and sends emails when conditions are met.[web:53]  

- **Clean UI/UX**  
  - Header with hero section and carousel, search bar for URLs, product cards, price info cards, and a tracking modal.[web:53]

## 🤸 Getting Started

### Prerequisites

Make sure you have the following installed and configured:

- Git  
- Node.js and npm  
- Accounts/credentials for:
  - Bright Data (Web Unlocker / proxy)  
  - MongoDB  
  - Email provider for Nodemailer (e.g., Outlook)[web:53]  

### Clone and install

git clone https://github.com/your-username/pricechecker.git
cd pricechecker
npm install


### Environment variables

Create a `.env` file in the project root:

SCRAPER
BRIGHT_DATA_USERNAME=
BRIGHT_DATA_PASSWORD=

DB
MONGODB_URI=

OUTLOOK / EMAIL
EMAIL_USER=

Fill these with your own Bright Data, MongoDB connection string, and email credentials.[web:53]

### Run the app

npm run dev