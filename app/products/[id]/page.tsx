import ModalWrapper from "@/components/ModalWrapper";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions"
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>
}
  
const ProductDetails = async ({ params }: Props) => {
  const { id } = await params;

  const product: Product = await getProductById(id);

  if(!product) redirect('/')

  const similarProducts = await getSimilarProducts(id);

  const discountPercentage = product.originalPrice 
    ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.currentPrice)) / parseFloat(product.originalPrice)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-bg to-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link href="/" className="text-dark-muted hover:text-secondary transition-colors">
            Home
          </Link>
          <span className="text-dark-border">/</span>
          <Link href="/" className="text-dark-muted hover:text-secondary transition-colors">
            Products
          </Link>
          <span className="text-dark-border">/</span>
          <span className="text-secondary font-medium">{product.category}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-12">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {discountPercentage > 0 && (
                <div className="absolute top-6 left-6 bg-gradient-to-r from-primary to-primary-purple text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                  -{discountPercentage}% OFF
                </div>
              )}
              
              <div className="absolute top-6 right-6">
                <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-sm transition-all">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-xl hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center p-4">
                  <Image
                    src={product.image}
                    alt={`View ${i}`}
                    width={80}
                    height={80}
                    className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title and Rating */}
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-light text-white leading-tight">
                {product.title}
              </h1>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${star <= Math.floor(product.stars || 4) ? 'text-yellow-400' : 'text-white/20'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white/60 text-sm">
                    {product.stars || '4.2'} ({product.reviewsCount || '124'} reviews)
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <span className="text-white/60 text-sm">In Stock</span>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="space-y-4">
              <div className="flex items-baseline space-x-4">
                <span className="text-4xl lg:text-5xl font-light text-white">
                  {product.currency}{formatNumber(product.currentPrice)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-white/40 line-through">
                    {product.currency}{formatNumber(product.originalPrice)}
                  </span>
                )}
              </div>
              
              <div className="text-sm text-white/60">
                Free shipping • 30-day return policy
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-4">
              <a
                href={product.url}
                target="_blank"
                className="flex-1 bg-gradient-to-r from-primary to-primary-purple hover:opacity-90 text-white font-medium py-4 px-6 rounded-xl text-center transition-all"
              >
                Buy on Amazon
              </a>
              
              <ModalWrapper productId={id} />
              
              <button className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl backdrop-blur-sm transition-all">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>

            {/* Price Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-white/60 text-sm mb-2">30-Day Low</div>
                <div className="text-2xl font-light text-white">
                  {product.currency}{formatNumber(product.lowestPrice)}
                </div>
                <div className="mt-2 text-xs text-green-400">
                  {Math.round((parseFloat(product.currentPrice) / parseFloat(product.lowestPrice) - 1) * 100)}% above low
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-white/60 text-sm mb-2">30-Day High</div>
                <div className="text-2xl font-light text-white">
                  {product.currency}{formatNumber(product.highestPrice)}
                </div>
                <div className="mt-2 text-xs text-red-400">
                  {Math.round((1 - parseFloat(product.currentPrice) / parseFloat(product.highestPrice)) * 100)}% below high
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-white/60 text-sm mb-2">Average Price</div>
                <div className="text-2xl font-light text-white">
                  {product.currency}{formatNumber(product.averagePrice)}
                </div>
                <div className="mt-2 text-xs text-white/60">
                  Last 90 days
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-white/60 text-sm mb-2">Price Trend</div>
                <div className="text-2xl font-light text-green-400">
                  {parseFloat(product.currentPrice) < parseFloat(product.averagePrice) ? '↓ Falling' : '↑ Rising'}
                </div>
                <div className="mt-2 text-xs text-white/60">
                  {Math.abs(Math.round((parseFloat(product.currentPrice) / parseFloat(product.averagePrice) - 1) * 100))}% change
                </div>
              </div>
            </div>

            {/* Detailed Price Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Price Analysis</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PriceInfoCard 
                  title="Current Price"
                  iconSrc="/assets/icons/price-tag.svg"
                  value={`${product.currency} ${formatNumber(product.currentPrice)}`}
                  trend="down"
                />
                <PriceInfoCard 
                  title="Average Price"
                  iconSrc="/assets/icons/chart.svg"
                  value={`${product.currency} ${formatNumber(product.averagePrice)}`}
                  trend="neutral"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-16 space-y-8">
          <div className="border-b border-white/10 pb-6">
            <h2 className="text-2xl font-light text-white mb-6">Product Description</h2>
            <div className="prose prose-invert max-w-none">
              <div className="space-y-4 text-white/80 leading-relaxed">
                {product?.description?.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Key Features</h3>
              <ul className="space-y-3">
                {['Real-time price monitoring', 'Historical price tracking', 'Price drop alerts', 'Multi-store comparison'].map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Tracking Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/60">Tracking Started</span>
                  <span className="text-white">2 weeks ago</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/60">Price Updates</span>
                  <span className="text-white">Every 2 hours</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-white/60">Alert Accuracy</span>
                  <span className="text-green-400">98.7%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          {similarProducts && similarProducts.length > 0 && (
            <div className="mt-16">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-light text-white mb-2">Similar Products</h2>
                  <p className="text-white/60">Products you might also like</p>
                </div>
                <Link
                  href="/"
                  className="text-primary hover:text-primary/80 transition-colors flex items-center space-x-2"
                >
                  <span>View all</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* Footer Stats */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">24/7</div>
                <div className="text-sm text-white/60">Price Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">99.8%</div>
                <div className="text-sm text-white/60">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">50+</div>
                <div className="text-sm text-white/60">Retailers Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">2.5M+</div>
                <div className="text-sm text-white/60">Products Monitored</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails