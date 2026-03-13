'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, Filter, ChevronDown, X, Tag } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
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

// Event card component
function EventCard({
  event,
  index,
  isPast = false,
  onClick
}: {
  event: EventType;
  index: number;
  isPast?: boolean;
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
      className={`group bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer ${isPast ? 'opacity-75' : ''}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
        {hasImage ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-500 ${isPast ? 'grayscale' : ''}`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar className="w-16 h-16 text-primary/30" />
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`${getCategoryColor(event.category)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
            {event.category}
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 text-center shadow-sm">
          <p className="text-xs text-muted-foreground">
            {new Date(event.date).toLocaleDateString('en-GB', { month: 'short' })}
          </p>
          <p className="text-xl font-bold text-primary">
            {new Date(event.date).getDate()}
          </p>
        </div>

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
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
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
        <div className="mt-5 pt-4 border-t border-border">
          <div className={`w-full flex items-center justify-center gap-2 py-2.5 font-medium rounded-lg transition-colors ${isPast
            ? 'bg-muted text-muted-foreground'
            : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
            }`}>
            <span>View Details</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Featured event component
function FeaturedEvent({
  event,
  onClick
}: {
  event: EventType;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const hasImage = event.image && event.image.trim() !== '' && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-r from-primary to-primary/90 rounded-3xl overflow-hidden shadow-xl cursor-pointer"
      onClick={onClick}
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative h-64 lg:h-auto lg:min-h-[400px]">
          {hasImage ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white/10">
              <Calendar className="w-24 h-24 text-white/30" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className={`${getCategoryColor(event.category)} text-white text-sm font-semibold px-4 py-1.5 rounded-full`}>
              {event.category}
            </span>
            <span className="bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full">
              Featured Event
            </span>
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            {event.title}
          </h2>
          <p className="text-white/80 mb-6">
            {event.description}
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Calendar size={18} />
              </div>
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Clock size={18} />
              </div>
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <span>{event.venue}</span>
            </div>
          </div>

          <button className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors w-fit">
            <span>View Details</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventsPageContent() {
  const { events } = eventsData;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event: EventType) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  // Get unique categories
  const categories = ['All', ...new Set(events.map(e => e.category))];

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Filter upcoming and past events
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = sortedEvents.filter(event =>
    new Date(event.date) >= today
  );

  const pastEvents = sortedEvents.filter(event =>
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
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 via-primary/5 to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Events & Activities
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              CHED Events Calendar
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover upcoming workshops, training sessions, festivals, and celebrations
              organized by CHED across Ghana.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${selectedCategory === category
                ? 'bg-primary text-white shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Upcoming Events</h2>
          <span className="text-sm text-muted-foreground">
            {filteredUpcoming.length} event{filteredUpcoming.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filteredUpcoming.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredUpcoming.map((event, index) => (
              <EventCard key={event.title} event={event} index={index} onClick={() => openModal(event)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-2xl border border-border">
            <Calendar className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No Upcoming Events</h3>
            <p className="text-muted-foreground">
              {selectedCategory !== 'All'
                ? `No upcoming ${selectedCategory.toLowerCase()} events. Try a different category.`
                : 'Check back soon for new events and activities.'}
            </p>
          </div>
        )}
      </section>

      {/* Past Events Toggle */}
      {pastEvents.length > 0 && (
        <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <button
            onClick={() => setShowPastEvents(!showPastEvents)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <span className="font-medium">
              {showPastEvents ? 'Hide' : 'Show'} Past Events ({pastEvents.length})
            </span>
            <ChevronDown
              size={20}
              className={`transition-transform ${showPastEvents ? 'rotate-180' : ''}`}
            />
          </button>

          {showPastEvents && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredPast.map((event, index) => (
                  <EventCard key={event.title} event={event} index={index} isPast onClick={() => openModal(event)} />
                ))}
              </div>
            </motion.div>
          )}
        </section>
      )}

      {/* Newsletter / Stay Updated */}
      <section className="py-12 sm:py-16 bg-muted/30 mt-8 sm:mt-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Never Miss an Event
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter to receive updates about upcoming events,
              workshops, and training sessions.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
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
