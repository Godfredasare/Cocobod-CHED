'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, Filter, ChevronDown, X } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
import { supabase } from '@/lib/supabase';
import type { Event } from '@/types/database';
import { useState, useEffect } from 'react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 12,
      delay: i * 0.06
    }
  }),
  hover: {
    y: -8,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20
    }
  }
};

// Format date to readable string
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// Format date short
function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// Get category color
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Festival': 'bg-purple-500',
    'Workshop': 'bg-blue-500',
    'Meeting': 'bg-green-500',
    'Celebration': 'bg-amber-500',
    'Conference': 'bg-rose-500',
    'Training': 'bg-teal-500'
  };
  return colors[category] || 'bg-primary';
}

// Get category text color
function getCategoryTextColor(category: string): string {
  const colors: Record<string, string> = {
    'Festival': 'text-purple-500',
    'Workshop': 'text-blue-500',
    'Meeting': 'text-green-500',
    'Celebration': 'text-amber-500',
    'Conference': 'text-rose-500',
    'Training': 'text-teal-500'
  };
  return colors[category] || 'text-primary';
}

// Event Modal Component
function EventModal({
  event,
  isOpen,
  onClose
}: {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  if (!event) return null;

  const hasImage = event.image && event.image.trim() !== '' && !imgError;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="relative h-56 sm:h-72 bg-gradient-to-br from-primary/30 to-primary/10 overflow-hidden">
              {hasImage ? (
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Calendar className="w-24 h-24 text-primary/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-foreground hover:bg-white transition-colors shadow-lg"
              >
                <X size={20} />
              </motion.button>

              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-4 left-4"
              >
                <span className={`${getCategoryColor(event.category)} text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg`}>
                  {event.category}
                </span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[50vh]">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl font-bold text-foreground mb-4"
              >
                {event.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-muted-foreground text-lg mb-6 leading-relaxed"
              >
                {event.description}
              </motion.p>

              {/* Event Details */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4 bg-muted/30 rounded-2xl p-5"
              >
                {[
                  { icon: Calendar, label: 'Date', value: formatDate(event.date) },
                  { icon: Clock, label: 'Time', value: event.time },
                  { icon: MapPin, label: 'Venue', value: event.venue }
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                    className="flex items-center gap-4"
                  >
                    <div className={`w-12 h-12 rounded-xl ${getCategoryColor(event.category)}/10 flex items-center justify-center`}>
                      <item.icon className={`w-5 h-5 ${getCategoryTextColor(event.category)}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Event card component
function EventCard({
  event,
  index,
  isPast = false,
  onClick
}: {
  event: Event;
  index: number;
  isPast?: boolean;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const hasImage = event.image && event.image.trim() !== '' && !imgError;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-20px" }}
      className={`group bg-white rounded-2xl border border-border overflow-hidden shadow-sm cursor-pointer ${isPast ? 'opacity-75' : ''}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-52 sm:h-56 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
        {hasImage ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full"
          >
            <Image
              src={event.image}
              alt={event.title}
              fill
              className={`object-cover ${isPast ? 'grayscale' : ''}`}
              onError={() => setImgError(true)}
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar className="w-20 h-20 text-primary/20" />
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`${getCategoryColor(event.category)} text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md`}>
            {event.category}
          </span>
        </div>

        {/* Date Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 text-center shadow-md"
        >
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {new Date(event.date).toLocaleDateString('en-GB', { month: 'short' })}
          </p>
          <p className="text-xl font-bold text-primary">
            {new Date(event.date).getDate()}
          </p>
        </motion.div>

        {/* Past Event Overlay */}
        {isPast && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white/90 text-muted-foreground font-medium px-4 py-2 rounded-full text-sm">
              Event Ended
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={14} className={`${getCategoryTextColor(event.category)} flex-shrink-0`} />
            <span>{formatDateShort(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={14} className={`${getCategoryTextColor(event.category)} flex-shrink-0`} />
            <span>{event.time}</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin size={14} className={`${getCategoryTextColor(event.category)} flex-shrink-0 mt-0.5`} />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`mt-5 pt-4 border-t border-border flex items-center justify-center gap-2 py-3 font-semibold rounded-xl transition-colors ${
            isPast
              ? 'bg-muted text-muted-foreground'
              : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
          }`}
        >
          <span>View Details</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Featured event component
function FeaturedEvent({
  event,
  onClick
}: {
  event: Event;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const hasImage = event.image && event.image.trim() !== '' && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 60, damping: 15 }}
      whileHover={{ y: -5 }}
      className="relative bg-gradient-to-r from-primary via-primary to-primary/95 rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
      onClick={onClick}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 relative">
        {/* Image */}
        <div className="relative h-64 lg:h-auto lg:min-h-[400px] overflow-hidden">
          {hasImage ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full"
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                onError={() => setImgError(true)}
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white/10">
              <Calendar className="w-24 h-24 text-white/30" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-5">
            <span className={`${getCategoryColor(event.category)} text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md`}>
              {event.category}
            </span>
            <span className="bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm">
              Featured Event
            </span>
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
            {event.title}
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            {event.description}
          </p>

          <div className="space-y-4 mb-8">
            {[
              { icon: Calendar, value: formatDate(event.date) },
              { icon: Clock, value: event.time },
              { icon: MapPin, value: event.venue }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 text-white/90"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <item.icon size={18} />
                </div>
                <span className="font-medium">{item.value}</span>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary font-semibold rounded-xl hover:bg-accent/90 transition-colors w-fit shadow-lg shadow-accent/20"
          >
            <span>View Details</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventsPageContent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });

        if (error) throw error;
        setEvents(data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  // Get unique categories
  const categories = ['All', ...new Set(events.map(e => e.category))];

  // Filter upcoming and past events
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter(event =>
    new Date(event.date) >= today
  );

  const pastEvents = events.filter(event =>
    new Date(event.date) < today
  );

  // Apply category filter
  const filteredUpcoming = selectedCategory === 'All'
    ? upcomingEvents
    : upcomingEvents.filter(e => e.category === selectedCategory);

  const filteredPast = selectedCategory === 'All'
    ? pastEvents
    : pastEvents.filter(e => e.category === selectedCategory);

  // Get featured event (next upcoming event)
  const featuredEvent = upcomingEvents[0];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-primary via-primary to-primary/95 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block px-5 py-2 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-6 backdrop-blur-sm border border-accent/10"
            >
              Events & Activities
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              CHED Events Calendar
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-white/90 leading-relaxed"
            >
              Discover upcoming workshops, training sessions, festivals, and celebrations
              organized by CHED across Ghana.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Loading State */}
      {loading ? (
        <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-[400px] bg-muted rounded-3xl mb-8" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-[350px] bg-muted rounded-2xl" />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Event */}
          {featuredEvent && (
            <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <FeaturedEvent event={featuredEvent} onClick={() => openModal(featuredEvent)} />
            </section>
          )}

          {/* Category Filter */}
          <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 text-muted-foreground mr-2">
                <Filter size={18} />
                <span className="font-medium hidden sm:inline">Filter:</span>
              </div>
              {categories.map((category, i) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </section>

          {/* Upcoming Events */}
          <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center justify-between mb-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Upcoming Events</h2>
              <span className="text-sm text-muted-foreground font-medium">
                {filteredUpcoming.length} event{filteredUpcoming.length !== 1 ? 's' : ''}
              </span>
            </motion.div>

            {filteredUpcoming.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {filteredUpcoming.slice(featuredEvent ? 1 : 0).map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} onClick={() => openModal(event)} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 bg-gradient-to-br from-muted/40 to-muted/20 rounded-3xl border border-border"
              >
                <Calendar className="w-20 h-20 text-muted-foreground/20 mx-auto mb-6" />
                <h3 className="font-semibold text-xl text-foreground mb-2">No Upcoming Events</h3>
                <p className="text-muted-foreground text-lg">
                  {selectedCategory !== 'All'
                    ? `No upcoming ${selectedCategory.toLowerCase()} events. Try a different category.`
                    : 'Check back soon for new events and activities.'}
                </p>
              </motion.div>
            )}
          </section>

          {/* Past Events Toggle */}
          {pastEvents.length > 0 && (
            <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <motion.button
                whileHover={{ x: 5 }}
                onClick={() => setShowPastEvents(!showPastEvents)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <span className="font-medium text-lg">
                  {showPastEvents ? 'Hide' : 'Show'} Past Events ({pastEvents.length})
                </span>
                <ChevronDown
                  size={20}
                  className={`transition-transform ${showPastEvents ? 'rotate-180' : ''}`}
                />
              </motion.button>

              <AnimatePresence>
                {showPastEvents && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 pt-4">
                      {filteredPast.map((event, index) => (
                        <EventCard key={event.id} event={event} index={index} isPast onClick={() => openModal(event)} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          )}
        </>
      )}

      {/* Newsletter / Stay Updated */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-muted/50 mt-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-x-1/2" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-5">
              Never Miss an Event
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Subscribe to our newsletter to receive updates about upcoming events,
              workshops, and training sessions.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap shadow-lg shadow-primary/20"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <Footer />
    </main>
  );
}
