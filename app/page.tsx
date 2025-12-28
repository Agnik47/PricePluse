import Searchbar from "@/components/Searchbar"
import Image from "next/image"
import { getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"

const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="px-6 md:px-20 pt-16 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Modern header with minimalist design */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-card rounded-20 border border-dark-border mb-6">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm font-medium text-dark-text">Price Intelligence Platform</span>
            </div>
            
            <h1 className="head-text max-w-4xl mx-auto mb-6">
              Track. Compare. 
              <span className="bg-gradient-to-r from-primary to-primary-purple bg-clip-text text-transparent"> Save.</span>
            </h1>
            
            <p className="paragraph-text max-w-2xl mx-auto mb-10">
              Real-time price monitoring across all major retailers. Get instant alerts and never overpay again.
            </p>
          </div>

          {/* Modern search section */}
          <div className="relative max-w-3xl mx-auto mb-20">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-20 blur-xl"></div>
            <div className="relative bg-dark-surface border border-dark-border rounded-20 p-1">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-dark-card rounded-10">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-secondary">Track Any Product</h3>
                    <p className="text-sm text-dark-muted">Paste Amazon, Walmart, or Best Buy links</p>
                  </div>
                </div>
                <Searchbar />
              </div>
            </div>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            <div className="bg-dark-surface border border-dark-border rounded-20 p-6">
              <div className="text-3xl font-bold text-secondary mb-2">2.5M+</div>
              <div className="text-sm text-dark-muted">Products Tracked</div>
            </div>
            <div className="bg-dark-surface border border-dark-border rounded-20 p-6">
              <div className="text-3xl font-bold text-secondary mb-2">98%</div>
              <div className="text-sm text-dark-muted">Accuracy Rate</div>
            </div>
            <div className="bg-dark-surface border border-dark-border rounded-20 p-6">
              <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
              <div className="text-sm text-dark-muted">Real-time Monitoring</div>
            </div>
            <div className="bg-dark-surface border border-dark-border rounded-20 p-6">
              <div className="text-3xl font-bold text-secondary mb-2">50+</div>
              <div className="text-sm text-dark-muted">Retailers Supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending section with clean design */}
      <section className="px-6 md:px-20 py-16 rounded-2xl bg-dark-surface/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-1 bg-primary rounded-full"></div>
                <h2 className="text-3xl font-bold text-secondary">Latest Price Drops</h2>
              </div>
              <p className="text-dark-muted">Products with recent price reductions</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-3 bg-dark-card border border-dark-border rounded-20 text-dark-text hover:border-primary transition-colors">
              View All Deals
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Product grid with minimalist cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allProducts?.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="px-6 md:px-20 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">How It Works</h2>
            <p className="text-xl text-dark-muted max-w-2xl mx-auto">Simple three-step process to never miss a deal</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8 bg-dark-surface border border-dark-border rounded-20">
              <div className="w-14 h-14 bg-dark-card rounded-20 flex items-center justify-center mb-6">
                <div className="text-2xl font-bold text-primary">1</div>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">Paste Product Link</h3>
              <p className="text-dark-muted">Copy any product URL from supported retailers</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 bg-dark-surface border border-dark-border rounded-20">
              <div className="w-14 h-14 bg-dark-card rounded-20 flex items-center justify-center mb-6">
                <div className="text-2xl font-bold text-primary">2</div>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">Set Price Alert</h3>
              <p className="text-dark-muted">Choose your target price to receive notifications</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 bg-dark-surface border border-dark-border rounded-20">
              <div className="w-14 h-14 bg-dark-card rounded-20 flex items-center justify-center mb-6">
                <div className="text-2xl font-bold text-primary">3</div>
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">Get Notified</h3>
              <p className="text-dark-muted">Receive instant alerts when prices drop</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home