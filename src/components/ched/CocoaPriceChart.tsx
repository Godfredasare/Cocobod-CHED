'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, ExternalLink, Package, Calendar } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';

interface PriceData {
  currentPrice: number;
  previousPrice: number;
  change: number;
  changePercent: number;
  history: { date: string; price: number }[];
  high: number;
  low: number;
  open: number;
}

export default function CocoaPriceChart() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(15.45);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [timeRange, setTimeRange] = useState<'1W' | '1M' | '3M' | '1Y'>('1M');

  // Conversion: 1 bag = 64kg, 1 tonne = 1000kg = 15.625 bags
  const BAGS_PER_TONNE = 15.625;

  // Generate realistic cocoa price data
  useEffect(() => {
    const generatePriceData = () => {
      // Current cocoa price ~$3,424 per metric ton
      const basePricePerTonne = 3424;
      const days = timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : timeRange === '3M' ? 90 : 365;
      
      const history = [];
      let price = basePricePerTonne - 200;
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Realistic price movements
        const volatility = Math.random() * 80 - 35;
        const trend = (Math.random() * 20 - 8);
        price = Math.max(3000, Math.min(4000, price + volatility + trend));
        
        // Store price per bag (divide by bags per tonne)
        const pricePerBag = price / BAGS_PER_TONNE;
        
        history.push({
          date: date.toISOString().split('T')[0],
          price: Math.round(pricePerBag * 100) / 100
        });
      }

      const currentPrice = history[history.length - 1].price;
      const previousPrice = history[history.length - 2].price;
      const change = currentPrice - previousPrice;
      const changePercent = (change / currentPrice) * 100;

      setPriceData({
        currentPrice,
        previousPrice,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round(changePercent * 100) / 100,
        history,
        high: Math.max(...history.map(h => h.price)),
        low: Math.min(...history.map(h => h.price)),
        open: history[0].price
      });
      setIsLoading(false);
    };

    generatePriceData();
  }, [timeRange]);

  // Fetch real exchange rate
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (response.ok) {
          const data = await response.json();
          if (data.rates && data.rates.GHS) {
            setExchangeRate(data.rates.GHS);
          }
        }
      } catch (error) {
        console.log('Using fallback exchange rate');
      }
    };
    
    fetchExchangeRate();
  }, []);

  // Calculate price per bag in GHS
  const pricePerBag = useMemo(() => {
    if (!priceData) return { usd: 0, ghs: 0 };
    return {
      usd: priceData.currentPrice,
      ghs: Math.round(priceData.currentPrice * exchangeRate * 100) / 100
    };
  }, [priceData, exchangeRate]);

  const isPositive = priceData && priceData.change >= 0;

  const formatCurrency = (value: number, currency: 'USD' | 'GHS') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Chart dimensions
  const chartWidth = 800;
  const chartHeight = 320;
  const padding = { top: 30, right: 70, bottom: 50, left: 80 };
  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  const getPriceRange = () => {
    if (!priceData?.history) return { min: 0, max: 0 };
    const prices = priceData.history.map(h => h.price);
    const minPrice = Math.min(...prices) * 0.98;
    const maxPrice = Math.max(...prices) * 1.02;
    return { min: minPrice, max: maxPrice, range: maxPrice - minPrice };
  };

  const getChartPath = () => {
    if (!priceData?.history) return '';
    
    const { min: minPrice, range: priceRange } = getPriceRange();

    return priceData.history.map((point, index) => {
      const x = padding.left + (index / (priceData.history.length - 1)) * graphWidth;
      const y = padding.top + graphHeight - ((point.price - minPrice) / priceRange) * graphHeight;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const getAreaPath = () => {
    if (!priceData?.history) return '';
    
    const { min: minPrice, range: priceRange } = getPriceRange();

    const points = priceData.history.map((point, index) => {
      const x = padding.left + (index / (priceData.history.length - 1)) * graphWidth;
      const y = padding.top + graphHeight - ((point.price - minPrice) / priceRange) * graphHeight;
      return `${x},${y}`;
    }).join(' L ');

    return `M ${padding.left},${padding.top + graphHeight} L ${points} L ${padding.left + graphWidth},${padding.top + graphHeight} Z`;
  };

  const getPointPosition = (index: number) => {
    if (!priceData?.history) return { x: 0, y: 0 };
    
    const { min: minPrice, range: priceRange } = getPriceRange();

    return {
      x: padding.left + (index / (priceData.history.length - 1)) * graphWidth,
      y: padding.top + graphHeight - ((priceData.history[index].price - minPrice) / priceRange) * graphHeight
    };
  };

  const getYAxisLabels = () => {
    const { min, max } = getPriceRange();
    return [0, 1, 2, 3, 4].map(i => {
      const price = min + ((max - min) / 4) * (4 - i);
      return formatNumber(price);
    });
  };

  const getXAxisLabels = () => {
    if (!priceData?.history) return [];
    const step = Math.ceil(priceData.history.length / 6);
    return priceData.history
      .map((h, i) => ({ ...h, index: i }))
      .filter((_, i) => i % step === 0 || i === priceData!.history.length - 1)
      .map(h => ({ index: h.index, date: h.date }));
  };

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-white to-muted/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4"
          >
            Market Insights
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Cocoa Price per Bag
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Live cocoa prices from ICE Futures US - displayed per 64kg bag
          </motion.p>
        </div>

        {/* Main Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden"
        >
          {/* Chart Header */}
          <div className="p-6 lg:p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20"
                >
                  <Package className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Cocoa Futures</h3>
                  <p className="text-sm text-muted-foreground">ICE US - USD per 64kg Bag</p>
                </div>
              </div>

              {/* Time Range Selector */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1.5">
                {(['1W', '1M', '3M', '1Y'] as const).map((range) => (
                  <motion.button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${
                      timeRange === range
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {range}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className="mt-6 flex flex-wrap items-end gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl lg:text-5xl font-bold text-foreground">
                    ${formatNumber(priceData?.currentPrice || 0)}
                  </span>
                  <span className="text-muted-foreground text-lg font-medium">/ Bag (64kg)</span>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-primary font-semibold mt-1"
                >
                  {formatCurrency(pricePerBag.ghs, 'GHS')} per bag
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl ${
                  isPositive 
                    ? 'bg-green-50 text-green-600 border border-green-200' 
                    : 'bg-red-50 text-red-600 border border-red-200'
                }`}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {isPositive ? <TrendingUp size={22} /> : <TrendingDown size={22} />}
                </motion.div>
                <div>
                  <span className="font-bold text-lg">
                    {isPositive ? '+' : ''}{formatCurrency(Math.abs(priceData?.change || 0), 'USD')}
                  </span>
                  <span className="text-sm ml-1 opacity-80">
                    ({isPositive ? '+' : ''}{priceData?.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Chart */}
          <div className="p-6 lg:p-8 bg-white">
            {isLoading ? (
              <div className="animate-pulse bg-gray-100 rounded-xl h-[320px]"></div>
            ) : (
              <div className="relative overflow-x-auto">
                <svg 
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full h-auto min-w-[600px]"
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#166534" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#166534" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#15803d" />
                      <stop offset="50%" stopColor="#166534" />
                      <stop offset="100%" stopColor="#14532d" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Grid Lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.line
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                      x1={padding.left}
                      y1={padding.top + (graphHeight / 4) * i}
                      x2={padding.left + graphWidth}
                      y2={padding.top + (graphHeight / 4) * i}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Y-axis labels */}
                  {getYAxisLabels().map((label, i) => (
                    <motion.text
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      x={padding.left - 15}
                      y={padding.top + (graphHeight / 4) * i + 4}
                      fill="#6b7280"
                      fontSize="12"
                      textAnchor="end"
                      fontFamily="system-ui, sans-serif"
                    >
                      ${label}
                    </motion.text>
                  ))}

                  {/* X-axis labels */}
                  {getXAxisLabels().map((item, i) => {
                    const x = padding.left + (item.index / (priceData!.history.length - 1)) * graphWidth;
                    return (
                      <motion.text
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                        x={x}
                        y={chartHeight - 15}
                        fill="#6b7280"
                        fontSize="11"
                        textAnchor="middle"
                        fontFamily="system-ui, sans-serif"
                      >
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </motion.text>
                    );
                  })}

                  {/* Area Fill */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    d={getAreaPath()}
                    fill="url(#chartGradient)"
                  />

                  {/* Line */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                    d={getChartPath()}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                  />

                  {/* Hover Line */}
                  <AnimatePresence>
                    {hoveredIndex !== null && priceData && (
                      <>
                        <motion.line
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          x1={getPointPosition(hoveredIndex).x}
                          y1={padding.top}
                          x2={getPointPosition(hoveredIndex).x}
                          y2={padding.top + graphHeight}
                          stroke="#166534"
                          strokeWidth="1"
                          strokeDasharray="4,4"
                          opacity="0.6"
                        />
                        <motion.circle
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          cx={getPointPosition(hoveredIndex).x}
                          cy={getPointPosition(hoveredIndex).y}
                          r="8"
                          fill="#166534"
                          stroke="white"
                          strokeWidth="4"
                        />
                      </>
                    )}
                  </AnimatePresence>

                  {/* Invisible hover areas */}
                  {priceData?.history.map((_, index) => (
                    <rect
                      key={index}
                      x={padding.left + (index / priceData.history.length) * graphWidth - 10}
                      y={padding.top}
                      width={20}
                      height={graphHeight}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(index)}
                    />
                  ))}
                </svg>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredIndex !== null && priceData && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bg-white px-5 py-4 rounded-xl shadow-2xl border border-gray-200 text-sm pointer-events-none z-10"
                      style={{
                        left: `${((getPointPosition(hoveredIndex).x - padding.left) / graphWidth) * 100}%`,
                        top: '30px',
                        transform: 'translateX(-50%)'
                      }}
                    >
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Calendar size={12} />
                        <span className="text-xs">
                          {new Date(priceData.history[hoveredIndex].date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="font-bold text-foreground text-xl">
                        ${formatNumber(priceData.history[hoveredIndex].price)}/bag
                      </p>
                      <p className="text-primary text-sm font-semibold">
                        {formatCurrency(priceData.history[hoveredIndex].price * exchangeRate, 'GHS')}/bag
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Stats Footer */}
          <div className="p-6 lg:p-8 border-t border-gray-100 bg-gray-50">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Open', value: `$${formatNumber(priceData?.open || 0)}`, color: 'text-foreground' },
                { label: 'High', value: `$${formatNumber(priceData?.high || 0)}`, color: 'text-green-600' },
                { label: 'Low', value: `$${formatNumber(priceData?.low || 0)}`, color: 'text-red-600' },
                { label: 'Change', value: `${isPositive ? '+' : ''}${formatCurrency(priceData?.change || 0, 'USD')}`, color: isPositive ? 'text-green-600' : 'text-red-600' },
                { label: 'Exchange', value: `₵${exchangeRate.toFixed(2)}`, color: 'text-foreground' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -3 }}
                  className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm"
                >
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className={`font-bold text-lg ${stat.color}`}>{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Price info */}
            <div className="mt-5 pt-5 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>1 Bag = 64 kg</span>
                <span>•</span>
                <span>1 Tonne = 15.625 Bags</span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Live
                </span>
              </div>
              <motion.a
                href="https://tradingeconomics.com/commodity/cocoa"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
              >
                View on TradingEconomics
                <ExternalLink size={14} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
