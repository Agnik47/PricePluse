"use client"

import { scrapeAndStoreProduct } from '@/lib/actions';
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Product } from '@/types';

const isValidAmazonProductURL = (url: string)=> {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname
    if (hostname.includes('amazon.com') || 
    hostname.includes('amazon.') ||
    hostname.endsWith('amazon')) {
      return true;
    }
  }
  catch (error) {
    return false;
  }
  return false;
}

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if(!isValidLink) {
      alert('Please provide a valid Amazon product link');
      return;
    }
    
    try {
      setIsLoading(true);

      // Scrape the product page
      const product: Product = await scrapeAndStoreProduct(searchPrompt);

      if(product && product._id) {
        router.push(`/products/${product._id}`);
      }
    } catch (error) {
      console.log(error);
      alert('Failed to fetch product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form 
      className="w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input 
            type="text"
            value={searchPrompt}
            onChange={(e) => setSearchPrompt(e.target.value)}
            placeholder="Paste Amazon product URL..."
            className="w-full p-4 pl-12 bg-dark-card border border-dark-border rounded-20 text-dark-text placeholder-dark-muted focus:outline-none focus:border-primary"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-dark-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="px-8 py-4 bg-primary hover:bg-primary-indigo text-secondary font-semibold rounded-20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={searchPrompt === '' || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
              Tracking...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Start Tracking
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          )}
        </button>
      </div>
      
      <div className="flex items-center gap-3 mt-4 text-sm text-dark-muted">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-accent-green rounded-full"></div>
          Supports Amazon
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-accent-yellow rounded-full"></div>
          Other retailers coming soon
        </div>
      </div>
    </form>
  )
}

export default Searchbar