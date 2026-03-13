'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import eventsData from '@/data/events.json';
import { useState } from 'react';

// Event type
interface EventType {
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  image: string;
}

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

// Event Modal Component
function EventModal({
  event,
  isOpen,
  onClose
}: {
  event: EventType | null;
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="relative h-56 sm:h-64 bg-gradient-to-br from-primary/30 to-primary/10">
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
                  <Calendar className="w-20 h-20 text-primary/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-foreground hover:bg-white transition-colors shadow-md"
              >
                <X size={20} />
              </button>

              {/* Category Badge */}
              <div className="absolute bottom-4 left-4">
                <span className={`${getCategoryColor(event.category)} text-white text-sm font-semibold px-4 py-1.5 rounded-full`}>
                  {event.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[50vh]">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {event.title}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="space-y-4 bg-muted/30 rounded-xl p-5">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${getCategoryColor(event.category)}/10 flex items-center justify-center`}>
                    <Calendar className={`w-5 h-5 ${getCategoryTextColor(event.category)}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold text-foreground">{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${getCategoryColor(event.category)}/10 flex items-center justify-center`}>
                    <Clock className={`w-5 h-5 ${getCategoryTextColor(event.category)}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-semibold text-foreground">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${getCategoryColor(event.category)}/10 flex items-center justify-center`}>
                    <MapPin className={`w-5 h-5 ${getCategoryTextColor(event.category)}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Venue</p>
                    <p className="font-semibold text-foreground">{event.venue}</p>
                  </div>
                </div>
              </div>
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
  event: EventType;
  index: number;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const hasImage = event.image && event.image.trim() !== '' && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
        {hasImage ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar className="w-16 h-16 text-primary/30" />
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`${getCategoryColor(event.category)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
            {event.category}
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-center shadow-sm">
          <p className="text-[10px] text-muted-foreground">
            {new Date(event.date).toLocaleDateString('en-GB', { month: 'short' })}
          </p>
          <p className="text-lg font-bold text-primary">
            {new Date(event.date).getDate()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar size={12} className={`${getCategoryTextColor(event.category)} flex-shrink-0`} />
            <span>{formatDate(event.date).slice(0, -5)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin size={12} className={`${getCategoryTextColor(event.category)} flex-shrink-0`} />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary group-hover:text-white py-2 bg-primary/10 group-hover:bg-primary rounded-lg transition-colors">
            <span>View Details</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventsSection() {
  const { events } = eventsData;
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort events by date (upcoming first)
  const sortedEvents = [...events].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Filter to show only upcoming events
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = sortedEvents.filter(event =>
    new Date(event.date) >= today
  ).slice(0, 4);

  const openModal = (event: EventType) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  return (
    <section className="py-16 lg:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
              What&apos;s Happening
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Stay connected with CHED&apos;s upcoming events, workshops, and celebrations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              <span>View All Events</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* Events Grid */}
        {upcomingEvents.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.title} event={event} index={index} onClick={() => openModal(event)} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-12 bg-white rounded-2xl border border-border"
          >
            <Calendar className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No Upcoming Events</h3>
            <p className="text-muted-foreground">Check back soon for new events and activities.</p>
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
