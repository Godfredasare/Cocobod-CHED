'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import type { Event } from '@/types/database';
import { useState, useEffect } from 'react';

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

// Animation variants
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
      stiffness: 80,
      damping: 12,
      delay: i * 0.1
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

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
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
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
                className="text-muted-foreground mb-6 leading-relaxed text-lg"
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

// Event Card Component
function EventCard({
  event,
  index,
  onClick
}: {
  event: Event;
  index: number;
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
      viewport={{ once: true, margin: "-30px" }}
      className="group bg-white rounded-2xl border border-border overflow-hidden shadow-sm cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-44 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden flex-shrink-0">
        {hasImage ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar className="w-16 h-16 text-primary/20" />
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`${getCategoryColor(event.category)} text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md`}>
            {event.category}
          </span>
        </div>

        {/* Date Badge */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 text-center shadow-md"
        >
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {new Date(event.date).toLocaleDateString('en-GB', { month: 'short' })}
          </p>
          <p className="text-lg font-bold text-primary">
            {new Date(event.date).getDate()}
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 min-h-[2.75rem]">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 min-h-[2.5rem] flex-grow">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar size={12} className={`${getCategoryTextColor(event.category)} flex-shrink-0`} />
            <span className="line-clamp-1">{formatDate(event.date).slice(0, -5)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin size={12} className={`${getCategoryTextColor(event.category)} flex-shrink-0`} />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center justify-center gap-2 text-sm font-semibold text-primary group-hover:text-white py-2.5 bg-primary/10 group-hover:bg-primary rounded-xl transition-colors"
        >
          <span>View Details</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
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

  // Filter to show only upcoming events
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = events.filter(event =>
    new Date(event.date) >= today
  ).slice(0, 4);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  // Don't render anything if loading is complete and no upcoming events
  if (!loading && upcomingEvents.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-muted/50 to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-3">
              What&apos;s Happening
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground text-lg mt-3 max-w-xl">
              Stay connected with CHED&apos;s upcoming events, workshops, and celebrations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              <span>View All Events</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-2xl border border-border overflow-hidden">
                  <div className="h-56 bg-muted" />
                  <div className="p-5">
                    <div className="h-5 bg-muted rounded w-3/4 mb-3" />
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2 mb-4" />
                    <div className="h-10 bg-muted rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} onClick={() => openModal(event)} />
            ))}
          </motion.div>
        )}
      </div>

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
