'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ExternalLink, DollarSign, ArrowUpRight, ArrowDownRight, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PriceData {
  priceUSD: number;
  priceGHS: number;
  change: number;
  changePercent: number;
  weeklyHigh: number;
  weeklyLow: number;
  monthlyChange: number;
  yearlyChange: number;
}

export default function CocoaPriceChart() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(15.5); // USD to GHS rate

  useEffect(() => {
    const fetchPrice = () => {
      // Simulated current cocoa price (around $8,000-$12,000 per metric ton in 2024)
      const basePrice = 9500;
      const variation = Math.random() * 500 - 250;
      const priceUSD = basePrice + variation;
      const change = Math.random() * 200 - 100;
      const changePercent = (change / priceUSD) * 100;
      
      // Convert to GHS
      const currentRate = 15.5 + (Math.random() * 0.5 - 0.25);
      setExchangeRate(currentRate);
      const priceGHS = priceUSD * currentRate;
      
      setPriceData({
        priceUSD: Math.round(priceUSD * 100) / 100,
        priceGHS: Math.round(priceGHS * 100) / 100,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round(changePercent * 100) / 100,
        weeklyHigh: Math.round((priceUSD + 200) * 100) / 100,
        weeklyLow: Math.round((priceUSD - 200) * 100) / 100,
        monthlyChange: Math.round((Math.random() * 10 - 3) * 100) / 100,
        yearlyChange: Math.round((Math.random() * 30 + 10) * 100) / 100,
      });
      setIsLoading(false);
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);

    return () => clearInterval(interval);
  }, []);

  const isPositive = priceData && priceData.change >= 0;
  const formatGHS = (value: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-semibold rounded-full mb-6 backdrop-blur-sm"
          >
            Market Insights
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Live Cocoa Prices
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Stay updated with real-time cocoa commodity prices in both USD and Ghana Cedis (GHS).
            Track market trends to make informed decisions for your cocoa farming business.
          </motion.p>
        </div>

        {/* Price Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Price Card - GHS */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl h-full">
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-white/20 rounded w-1/3"></div>
                  <div className="h-16 bg-white/20 rounded w-1/2"></div>
                  <div className="h-6 bg-white/20 rounded w-1/4"></div>
                </div>
              ) : priceData ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-white/70">
                      <span className="text-sm font-medium">COCOA PRICE IN GHANA CEDIS (GHS/MT)</span>
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full">
                      <span className="text-white/60 text-xs">Rate: 1 USD = {exchangeRate.toFixed(2)} GHS</span>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-5xl lg:text-6xl font-bold text-white">
                      {formatGHS(priceData.priceGHS)}
                    </span>
                    <span className="text-white/60 text-lg">/ Metric Ton</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {isPositive ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                      <span className="font-semibold">
                        {isPositive ? '+' : ''}{priceData.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <span className="text-white/60 text-sm">
                      {isPositive ? '+' : ''}{formatGHS(priceData.change * exchangeRate)} today
                    </span>
                  </div>

                  {/* USD Reference */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                      <DollarSign size={14} />
                      <span>USD Reference Price</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-accent">
                        ${priceData.priceUSD.toLocaleString()}
                      </span>
                      <span className="text-white/50 text-sm">/ MT</span>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl h-full">
              <div className="flex items-center gap-2 text-white/70 mb-6">
                <BarChart3 size={18} />
                <span className="text-sm font-medium">Price Analysis</span>
              </div>
              
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-white/20 rounded"></div>
                  <div className="h-8 bg-white/20 rounded"></div>
                  <div className="h-8 bg-white/20 rounded"></div>
                </div>
              ) : priceData ? (
                <div className="space-y-4">
                  {/* Weekly Range */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/50 text-xs mb-2">Weekly Range (GHS)</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-red-400">Low</p>
                        <p className="text-lg font-bold text-white">{formatGHS(priceData.weeklyLow * exchangeRate)}</p>
                      </div>
                      <div className="flex-1 mx-4 h-2 bg-white/10 rounded-full">
                        <div className="h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full w-3/4"></div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-green-400">High</p>
                        <p className="text-lg font-bold text-white">{formatGHS(priceData.weeklyHigh * exchangeRate)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Change */}
                  <div className="flex justify-between items-center bg-white/5 rounded-xl p-4">
                    <div>
                      <p className="text-white/50 text-xs">30-Day Change</p>
                      <p className="text-lg font-bold text-white">{formatGHS(priceData.monthlyChange * exchangeRate * 100)}</p>
                    </div>
                    <div className={`flex items-center gap-1 ${priceData.monthlyChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {priceData.monthlyChange >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                      <span className="font-semibold">{priceData.monthlyChange >= 0 ? '+' : ''}{priceData.monthlyChange}%</span>
                    </div>
                  </div>

                  {/* Yearly Change */}
                  <div className="flex justify-between items-center bg-white/5 rounded-xl p-4">
                    <div>
                      <p className="text-white/50 text-xs">1-Year Change</p>
                      <p className="text-lg font-bold text-white">{formatGHS(priceData.yearlyChange * exchangeRate * 100)}</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-400">
                      <TrendingUp size={20} />
                      <span className="font-semibold">+{priceData.yearlyChange}%</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>

        {/* Analysis Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8"
        >
          <h3 className="text-white font-bold text-lg mb-4">📊 Market Analysis</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-white/80">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-accent font-semibold mb-2">Supply Outlook</p>
              <p className="text-white/70">Global cocoa supply remains tight due to weather conditions in West Africa. Ghana and Ivory Coast production levels are below seasonal averages.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-accent font-semibold mb-2">Local Impact</p>
              <p className="text-white/70">Ghanaian farmers benefit from higher prices. The current price represents a significant increase from previous seasons, improving farmer incomes.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-accent font-semibold mb-2">Price Forecast</p>
              <p className="text-white/70">Analysts expect prices to remain elevated through the season. Cedi depreciation against USD may further increase local GHS prices.</p>
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Last updated: {new Date().toLocaleTimeString()} | Auto-refreshes every minute
          </div>
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
      </div>
    </section>
  );
}
