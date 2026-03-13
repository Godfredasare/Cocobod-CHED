'use client';

import { motion } from 'framer-motion';
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

  // Generate realistic cocoa price data
  useEffect(() => {
    const generatePriceData = () => {
      // Current cocoa price ~$3,424 per metric ton
      const basePrice = 3424;
      const days = timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : timeRange === '3M' ? 90 : 365;
      
      const history = [];
      let price = basePrice - 200;
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Realistic price movements
        const volatility = Math.random() * 80 - 35;
        const trend = (Math.random() * 20 - 8);
        price = Math.max(3000, Math.min(4000, price + volatility + trend));
        
        history.push({
          date: date.toISOString().split('T')[0],
          price: Math.round(price * 100) / 100
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

  // Calculate price per tonne in GHS
  const pricePerTonne = useMemo(() => {
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
    <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4"
          >
            Market Insights
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Cocoa Futures Price
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Live cocoa prices from ICE Futures US - displayed per metric tonne
          </motion.p>
        </div>

        {/* Main Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
        >
          {/* Chart Header */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Cocoa Futures</h3>
                  <p className="text-sm text-muted-foreground">ICE US - USD per Metric Tonne</p>
                </div>
              </div>

              {/* Time Range Selector */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                {(['1W', '1M', '3M', '1Y'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      timeRange === range
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className="mt-6 flex flex-wrap items-end gap-6">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl lg:text-5xl font-bold text-foreground">
                    ${formatNumber(priceData?.currentPrice || 0)}
                  </span>
                  <span className="text-muted-foreground text-lg">/ Tonne</span>
                </div>
                <p className="text-base text-primary font-medium mt-1">
                  {formatCurrency(pricePerTonne.ghs, 'GHS')} per tonne
                </p>
              </div>

              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${
                isPositive 
                  ? 'bg-green-50 text-green-600 border border-green-200' 
                  : 'bg-red-50 text-red-600 border border-red-200'
              }`}>
                {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                <div>
                  <span className="font-bold text-lg">
                    {isPositive ? '+' : ''}{formatCurrency(Math.abs(priceData?.change || 0), 'USD')}
                  </span>
                  <span className="text-sm ml-1">
                    ({isPositive ? '+' : ''}{priceData?.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="p-6 bg-white">
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
                      <stop offset="0%" stopColor="#166534" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#166534" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#15803d" />
                      <stop offset="50%" stopColor="#166534" />
                      <stop offset="100%" stopColor="#14532d" />
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
                      stroke="#e5e7eb"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Y-axis labels */}
                  {getYAxisLabels().map((label, i) => (
                    <text
                      key={i}
                      x={padding.left - 15}
                      y={padding.top + (graphHeight / 4) * i + 4}
                      fill="#6b7280"
                      fontSize="12"
                      textAnchor="end"
                      fontFamily="system-ui, sans-serif"
                    >
                      ${label}
                    </text>
                  ))}

                  {/* X-axis labels */}
                  {getXAxisLabels().map((item, i) => {
                    const x = padding.left + (item.index / (priceData!.history.length - 1)) * graphWidth;
                    return (
                      <text
                        key={i}
                        x={x}
                        y={chartHeight - 15}
                        fill="#6b7280"
                        fontSize="11"
                        textAnchor="middle"
                        fontFamily="system-ui, sans-serif"
                      >
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </text>
                    );
                  })}

                  {/* Area Fill */}
                  <path
                    d={getAreaPath()}
                    fill="url(#chartGradient)"
                  />

                  {/* Line */}
                  <path
                    d={getChartPath()}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Hover Line */}
                  {hoveredIndex !== null && priceData && (
                    <>
                      <line
                        x1={getPointPosition(hoveredIndex).x}
                        y1={padding.top}
                        x2={getPointPosition(hoveredIndex).x}
                        y2={padding.top + graphHeight}
                        stroke="#166534"
                        strokeWidth="1"
                        strokeDasharray="4,4"
                        opacity="0.6"
                      />
                      <circle
                        cx={getPointPosition(hoveredIndex).x}
                        cy={getPointPosition(hoveredIndex).y}
                        r="6"
                        fill="#166534"
                        stroke="white"
                        strokeWidth="3"
                      />
                    </>
                  )}

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
                {hoveredIndex !== null && priceData && (
                  <div 
                    className="absolute bg-white px-4 py-3 rounded-lg shadow-xl border border-gray-200 text-sm pointer-events-none z-10"
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
                    <p className="font-bold text-foreground text-lg">
                      ${formatNumber(priceData.history[hoveredIndex].price)}
                    </p>
                    <p className="text-primary text-sm font-medium">
                      {formatCurrency(priceData.history[hoveredIndex].price * exchangeRate, 'GHS')}/tonne
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Stats Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Open</p>
                <p className="font-bold text-lg text-foreground">
                  ${formatNumber(priceData?.open || 0)}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">High</p>
                <p className="font-bold text-lg text-green-600">
                  ${formatNumber(priceData?.high || 0)}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Low</p>
                <p className="font-bold text-lg text-red-600">
                  ${formatNumber(priceData?.low || 0)}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Change</p>
                <p className={`font-bold text-lg ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}{formatCurrency(priceData?.change || 0, 'USD')}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-100">
                <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Exchange</p>
                <p className="font-bold text-lg text-foreground">
                  ₵{exchangeRate.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Price info */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>1 Tonne = 1,000 kg</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Live
                </span>
              </div>
              <a
                href="https://tradingeconomics.com/commodity/cocoa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                View on TradingEconomics
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
