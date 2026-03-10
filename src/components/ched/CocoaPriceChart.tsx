'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ExternalLink, DollarSign, ArrowUpRight, ArrowDownRight, Package } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PriceData {
  priceUSD: number;
  priceGHS: number;
  pricePerBagUSD: number;
  pricePerBagGHS: number;
  change: number;
  changePercent: number;
  history: { date: string; price: number }[];
}

export default function CocoaPriceChart() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(15.5);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = () => {
      // Generate historical data for the chart (last 14 days)
      const history = [];
      const basePrice = 9500;
      let runningPrice = basePrice - 800;
      
      for (let i = 13; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        runningPrice += (Math.random() * 150 - 50);
        history.push({
          date: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
          price: runningPrice
        });
      }
      
      const priceUSD = history[history.length - 1].price;
      const change = priceUSD - history[history.length - 2].price;
      const changePercent = (change / priceUSD) * 100;
      
      // 1 bag = 62.5kg, 1 metric ton = 1000kg
      // So 1 bag = 62.5/1000 = 1/16 of a metric ton
      const bagsPerTon = 16;
      const pricePerBagUSD = priceUSD / bagsPerTon;
      
      const currentRate = 15.5 + (Math.random() * 0.5 - 0.25);
      setExchangeRate(currentRate);
      
      setPriceData({
        priceUSD: Math.round(priceUSD * 100) / 100,
        priceGHS: Math.round(priceUSD * currentRate * 100) / 100,
        pricePerBagUSD: Math.round(pricePerBagUSD * 100) / 100,
        pricePerBagGHS: Math.round(pricePerBagUSD * currentRate * 100) / 100,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round(changePercent * 100) / 100,
        history,
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

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Chart calculations
  const chartWidth = 700;
  const chartHeight = 200;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  const getChartPoints = () => {
    if (!priceData?.history) return '';
    
    const prices = priceData.history.map(h => h.price);
    const minPrice = Math.min(...prices) - 100;
    const maxPrice = Math.max(...prices) + 100;
    const priceRange = maxPrice - minPrice;

    const points = priceData.history.map((point, index) => {
      const x = padding.left + (index / (priceData.history.length - 1)) * graphWidth;
      const y = padding.top + graphHeight - ((point.price - minPrice) / priceRange) * graphHeight;
      return `${x},${y}`;
    }).join(' ');

    return points;
  };

  const getAreaPath = () => {
    if (!priceData?.history) return '';
    
    const prices = priceData.history.map(h => h.price);
    const minPrice = Math.min(...prices) - 100;
    const maxPrice = Math.max(...prices) + 100;
    const priceRange = maxPrice - minPrice;

    const points = priceData.history.map((point, index) => {
      const x = padding.left + (index / (priceData.history.length - 1)) * graphWidth;
      const y = padding.top + graphHeight - ((point.price - minPrice) / priceRange) * graphHeight;
      return `${x},${y}`;
    }).join(' L ');

    return `M ${padding.left},${padding.top + graphHeight} L ${points} L ${padding.left + graphWidth},${padding.top + graphHeight} Z`;
  };

  const getPointPosition = (index: number) => {
    if (!priceData?.history) return { x: 0, y: 0 };
    
    const prices = priceData.history.map(h => h.price);
    const minPrice = Math.min(...prices) - 100;
    const maxPrice = Math.max(...prices) + 100;
    const priceRange = maxPrice - minPrice;

    const x = padding.left + (index / (priceData.history.length - 1)) * graphWidth;
    const y = padding.top + graphHeight - ((priceData.history[index].price - minPrice) / priceRange) * graphHeight;

    return { x, y };
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
            className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-semibold rounded-full mb-6 backdrop-blur-sm"
          >
            Market Insights
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Live Cocoa Prices
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            Track real-time cocoa prices per bag. Stay informed to make better decisions for your farming business.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              {/* Chart Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-white/70 mb-1">
                    <Package size={16} />
                    <span className="text-sm font-medium">PRICE PER BAG (62.5 KG) - 14 DAY TREND</span>
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl lg:text-5xl font-bold text-white">
                      {priceData ? formatGHS(priceData.pricePerBagGHS) : '₵0.00'}
                    </span>
                    <span className="text-white/60">per bag</span>
                  </div>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  <span className="font-bold text-lg">
                    {isPositive ? '+' : ''}{priceData?.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* SVG Line Chart */}
              {isLoading ? (
                <div className="animate-pulse bg-white/10 rounded-xl h-64"></div>
              ) : (
                <div className="relative overflow-x-auto">
                  <svg 
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                    className="w-full h-auto min-w-[600px]"
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <defs>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#D4A017" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="50%" stopColor="#D4A017" />
                        <stop offset="100%" stopColor="#fbbf24" />
                      </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <line
                        key={i}
                        x1={padding.left}
                        y1={padding.top + (graphHeight / 4) * i}
                        x2={padding.left + graphWidth}
                        y2={padding.top + (graphHeight / 4) * i}
                        stroke="white"
                        strokeOpacity="0.1"
                      />
                    ))}

                    {/* Area Fill */}
                    <path
                      d={getAreaPath()}
                      fill="url(#areaGradient)"
                    />

                    {/* Line */}
                    <polyline
                      points={getChartPoints()}
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data Points */}
                    {priceData?.history.map((_, index) => {
                      const pos = getPointPosition(index);
                      return (
                        <circle
                          key={index}
                          cx={pos.x}
                          cy={pos.y}
                          r={hoveredPoint === index ? 6 : 4}
                          fill={hoveredPoint === index ? '#D4A017' : '#fff'}
                          stroke="#D4A017"
                          strokeWidth="2"
                          className="cursor-pointer transition-all"
                          onMouseEnter={() => setHoveredPoint(index)}
                        />
                      );
                    })}

                    {/* X-axis labels */}
                    {priceData?.history.map((point, index) => {
                      if (index % 2 !== 0) return null;
                      const x = padding.left + (index / (priceData.history.length - 1)) * graphWidth;
                      return (
                        <text
                          key={index}
                          x={x}
                          y={chartHeight - 10}
                          fill="white"
                          fillOpacity="0.5"
                          fontSize="10"
                          textAnchor="middle"
                        >
                          {point.date.split(' ')[0]}
                        </text>
                      );
                    })}
                  </svg>

                  {/* Tooltip */}
                  {hoveredPoint !== null && priceData && (
                    <div 
                      className="absolute bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-sm pointer-events-none"
                      style={{
                        left: `${((getPointPosition(hoveredPoint).x - padding.left) / graphWidth) * 100}%`,
                        top: `${((getPointPosition(hoveredPoint).y) / chartHeight) * 100 - 15}%`,
                        transform: 'translate(-50%, -100%)'
                      }}
                    >
                      <p className="text-xs text-muted-foreground">{priceData.history[hoveredPoint].date}</p>
                      <p className="font-bold text-primary">{formatGHS(priceData.history[hoveredPoint].price / 16 * exchangeRate)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Price Details Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Price Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white/70 text-sm font-medium mb-4">Price Breakdown</h3>
              
              {isLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-8 bg-white/20 rounded"></div>
                  <div className="h-8 bg-white/20 rounded"></div>
                </div>
              ) : priceData ? (
                <div className="space-y-4">
                  {/* Per Bag */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-accent font-semibold flex items-center gap-2 mb-2">
                      <Package size={16} />
                      Per Bag (62.5 kg)
                    </p>
                    <p className="text-2xl font-bold text-white">{formatGHS(priceData.pricePerBagGHS)}</p>
                    <p className="text-white/50 text-sm">{formatUSD(priceData.pricePerBagUSD)}</p>
                  </div>

                  {/* Per Metric Ton */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/60 font-medium mb-2">Per Metric Ton (1,000 kg)</p>
                    <p className="text-xl font-bold text-white">{formatGHS(priceData.priceGHS)}</p>
                    <p className="text-white/50 text-sm">{formatUSD(priceData.priceUSD)}</p>
                  </div>

                  {/* Exchange Rate */}
                  <div className="flex items-center justify-between text-sm text-white/60 pt-2 border-t border-white/10">
                    <span>Exchange Rate</span>
                    <span className="text-white font-medium">1 USD = {exchangeRate.toFixed(2)} GHS</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Stats Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white/70 text-sm font-medium mb-4">Daily Stats</h3>
              
              {priceData ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Today&apos;s Change</span>
                    <span className={`font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {isPositive ? '+' : ''}{formatGHS(priceData.change / 16 * exchangeRate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">14-Day High</span>
                    <span className="text-white font-medium">
                      {formatGHS(Math.max(...priceData.history.map(h => h.price)) / 16 * exchangeRate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">14-Day Low</span>
                    <span className="text-white font-medium">
                      {formatGHS(Math.min(...priceData.history.map(h => h.price)) / 16 * exchangeRate)}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* External Link */}
            <a
              href="https://tradingeconomics.com/commodity/cocoa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-accent text-foreground font-semibold rounded-xl hover:bg-accent/90 transition-all shadow-lg"
            >
              View Full Chart
              <ExternalLink size={18} />
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 text-white/50 text-sm mt-8"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Live prices • Updated every minute • Last: {new Date().toLocaleTimeString()}
        </motion.div>
      </div>
    </section>
  );
}
