import axios from "axios";
import * as cheerio from 'cheerio'
import { extractCurrency, extractDescription, extractPrice } from "../utils";
export async function scrapeAmazonProduct(url:string) {
  if(!url) return;

  //BrightData Scapping Confrigation---
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (100000 * Math.random() || 0);
  
  // Check if credentials exist
  if(!username || username === 'undefined' || !password || password === 'undefined') {
    throw new Error('Bright Data credentials not configured in .env file');
  }

  const option = {
    auth : {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  }

  try {
    const response  = await axios.get(url, option);
    const $ = cheerio.load(response.data);

    // Debug: Log the HTML to see what we're getting
    console.log('Scraping URL:', url);
    console.log('Response status:', response.status);

    //Exract the Produt details with help of cheerio

    const title = $(`#productTitle`).text().trim();
    console.log('Title found:', title);

     const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
      $('.a-price.a-text-price'),
      $('.a-price .a-offscreen'),
      $('#corePrice_feature_div .a-price-whole'),
      $('#price_inside_buybox'),
      $('.a-price-whole')
    );
    console.log('Current price selectors tried and found:', {
      '.priceToPay span.a-price-whole': $('.priceToPay span.a-price-whole').text().trim(),
      '.a.size.base.a-color-price': $('.a.size.base.a-color-price').text().trim(),
      '.a-button-selected .a-color-base': $('.a-button-selected .a-color-base').text().trim(),
      '.a-price.a-text-price': $('.a-price.a-text-price').text().trim()
    });
    console.log('Current price extracted:', currentPrice);

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price'),
      $('#corePrice_feature_div .a-price.a-text-price .a-offscreen'),
      $('.a-text-price .a-offscreen')
    );
    console.log('Original price selectors tried and found:', {
      '#priceblock_ourprice': $('#priceblock_ourprice').text().trim(),
      '.a-price.a-text-price span.a-offscreen': $('.a-price.a-text-price span.a-offscreen').text().trim(),
      '#listPrice': $('#listPrice').text().trim(),
      '#priceblock_dealprice': $('#priceblock_dealprice').text().trim(),
      '.a-size-base.a-color-price': $('.a-size-base.a-color-price').text().trim()
    });
    console.log('Original price extracted:', originalPrice);

     const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

    const images = 
      $('#imgBlkFront').attr('data-a-dynamic-image') || 
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}'

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($('.a-price-symbol'))
    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");

    const description = extractDescription($)

  // console.log({title,currentPrice,originalPrice,outOfStock,currency,description});


    // Construct data object with scraped information
    const data = {
      url,
      currency: currency || '$',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'category',
      reviewsCount:100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    }

    // console.log(data);

    return data;
  } catch(error: any) {
    console.error('Scraper error details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: url,
    });
    throw new Error(`Failed to scrape Product: ${error.response?.status ? `HTTP ${error.response.status}` : error.message}`)
  }

}