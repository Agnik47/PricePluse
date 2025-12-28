import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const discountPercentage = product.originalPrice && product.currentPrice
    ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.currentPrice)) / parseFloat(product.originalPrice)) * 100)
    : Math.floor(Math.random() * 30) + 10; // Fallback random discount for demo

  const price = parseFloat(product.currentPrice);
  const originalPrice = product.originalPrice ? parseFloat(product.originalPrice) : price * 1.15;

  return (
    <Link 
      href={`/products/${product._id}`} 
      className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
    >
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-primary to-primary-purple text-white text-xs font-semibold px-3 py-1 rounded-full">
          -{discountPercentage}%
        </div>
      )}
      
      {/* Quick Actions */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </button>
      </div>

      {/* Product Image */}
      <div className="aspect-square bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-8">
        <Image 
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain w-full h-full max-h-[180px] group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        {/* Category Badge */}
        <div className="inline-flex items-center px-3 py-1 bg-white/5 rounded-full">
          <span className="text-xs text-white/70 font-medium uppercase tracking-wide">
            {product.category || 'Electronics'}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-white font-medium text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors h-10">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-3 h-3 ${star <= 4 ? 'text-yellow-400' : 'text-white/20'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-white/50">4.{Math.floor(Math.random() * 9)}</span>
        </div>

        {/* Price Section */}
        <div className="space-y-1">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-light text-white">
              {product.currency || '$'}{price.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </span>
            
            {originalPrice > price && (
              <span className="text-sm text-white/40 line-through">
                {product.currency || '$'}{originalPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            )}
          </div>

          {/* Price Trend */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-green-400 font-medium flex items-center space-x-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              <span>Price dropping</span>
            </div>
            
            <div className="text-xs text-white/40">
              Updated 2h ago
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <div className="pt-3 border-t border-white/10">
          <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center space-x-2">
            <span>Track Price</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard