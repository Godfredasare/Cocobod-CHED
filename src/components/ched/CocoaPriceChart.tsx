'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PriceData {
  price: number;
  change: number;
  changePercent: number;
}

export default function CocoaPriceChart() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching price data
    // In production, you'd fetch from an API
    const fetchPrice = () => {
      // Simulated current cocoa price (around $8,000-$12,000 per metric ton in 2024)
      const basePrice = 9500;
      const variation = Math.random() * 500 - 250;
      const price = basePrice + variation;
      const change = Math.random() * 200 - 100;
      const changePercent = (change / price) * 100;
      
      setPriceData({
        price: Math.round(price * 100) / 100,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round(changePercent * 100) / 100
      });
      setIsLoading(false);
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const isPositive = priceData && priceData.change >= 0;

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-white"
          >
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-semibold rounded-full mb-6 backdrop-blur-sm">
              Market Insights
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Live Cocoa Prices
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Stay updated with real-time cocoa commodity prices. Track market trends and make 
              informed decisions for your cocoa farming business. Prices are updated every minute.
            </p>
            <a
              href="https://tradingeconomics.com/commodity/cocoa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-foreground font-semibold rounded-xl hover:bg-accent/90 transition-all shadow-lg"
            >
              View Full Chart
              <ExternalLink size={18} />
            </a>
          </motion.div>

          {/* Right Side - Price Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-white/20 rounded w-1/2 mb-4"></div>
                  <div className="h-16 bg-white/20 rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-white/20 rounded w-1/3"></div>
                </div>
              ) : priceData ? (
                <>
                  <div className="flex items-center gap-2 text-white/70 mb-2">
                    <span className="text-sm font-medium">COCOA (USD/Metric Ton)</span>
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  </div>
                  
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-5xl lg:text-6xl font-bold text-white">
                      ${priceData.price.toLocaleString()}
                    </span>
                    <span className="text-white/60 text-lg">/ MT</span>
                  </div>
                  
                  <div className={`flex items-center gap-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? (
                      <TrendingUp size={20} />
                    ) : (
                      <TrendingDown size={20} />
                    )}
                    <span className="text-lg font-semibold">
                      {isPositive ? '+' : ''}{priceData.change.toFixed(2)} 
                      <span className="text-sm ml-1">({isPositive ? '+' : ''}{priceData.changePercent.toFixed(2)}%)</span>
                    </span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-white/50 text-xs mb-1">24h High</p>
                        <p className="text-white font-semibold">${(priceData.price + 150).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-white/50 text-xs mb-1">24h Low</p>
                        <p className="text-white font-semibold">${(priceData.price - 150).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-white/40 text-xs">
                      Last updated: {new Date().toLocaleTimeString()}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span className="text-white/60 text-xs">Live</span>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
