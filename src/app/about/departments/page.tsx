'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  DollarSign, 
  Users, 
  Monitor, 
  ClipboardCheck, 
  Building,
  Map,
  Leaf,
  BarChart3,
  X,
  CheckCircle
} from 'lucide-react';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';
import departmentsData from '@/data/departments.json';
import { useState } from 'react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Settings,
  DollarSign,
  Users,
  Monitor,
  ClipboardCheck,
  Building,
  Map,
  Leaf,
  BarChart3,
};

interface SubDepartment {
  name: string;
  icon: string;
  description: string;
  functions?: string[];
  objectives?: string[];
}

interface Unit {
  name: string;
  desc: string;
}

interface Department {
  name: string;
  icon: string;
  color: string;
  description: string;
  hasSubDepts?: boolean;
  units?: Unit[];
  vision?: string;
}

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
      delay: i * 0.08
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

export default function DepartmentsPage() {
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  
  const { technicalSubDepts, departments } = departmentsData as {
    technicalSubDepts: SubDepartment[];
    departments: Department[];
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-primary" />
          <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/90" />
          
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
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                About CHED
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                Our Departments
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-white/90 leading-relaxed"
              >
                Explore the organizational structure and the various departments working together 
                to support cocoa farmers across Ghana.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Departments Overview */}
        <section className="py-20 lg:py-24 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-x-1/2" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {departments.map((dept, index) => {
                const IconComponent = iconMap[dept.icon] || Settings;
                
                return (
                  <motion.div
                    key={dept.name}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true, margin: "-30px" }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden border border-border"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${dept.color}`}
                        >
                          <IconComponent className="w-7 h-7" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-2">{dept.name}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{dept.description}</p>
                        </div>
                      </div>

                      {/* Learn More Button */}
                      {(dept.hasSubDepts || dept.units || dept.vision) && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedDept(dept)}
                          className="mt-5 w-full py-3 bg-primary/10 text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors"
                        >
                          Learn More
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Organizational Chart Hint */}
        <section className="py-20 bg-gradient-to-b from-muted/50 to-muted/30 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl text-center border border-border"
            >
              <h2 className="text-3xl font-bold text-foreground mb-5">Working Together for Cocoa Excellence</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                Our departments work collaboratively to deliver effective extension services, 
                control cocoa diseases, and support the livelihoods of cocoa farmers across Ghana.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Extension', 'CSSVD Control', 'Seed Production', 'Farmer Education'].map((area, i) => (
                  <motion.span
                    key={area}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-5 py-2.5 bg-primary/10 text-primary rounded-full font-medium"
                  >
                    {area}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Modal */}
      <AnimatePresence>
        {selectedDept && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDept(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedDept.color}`}>
                    {(() => {
                      const IconComponent = iconMap[selectedDept.icon] || Settings;
                      return <IconComponent className="w-6 h-6" />;
                    })()}
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{selectedDept.name}</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDept(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X size={20} className="text-muted-foreground" />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{selectedDept.description}</p>

                {/* Technical Sub-departments */}
                {selectedDept.hasSubDepts && (
                  <div className="space-y-6">
                    <h3 className="font-semibold text-foreground text-lg">Sub-Departments</h3>
                    {technicalSubDepts.map((sub, index) => {
                      const SubIconComponent = iconMap[sub.icon] || Settings;
                      
                      return (
                        <motion.div
                          key={sub.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-muted/30 rounded-2xl p-5 border border-border"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                              <SubIconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <h4 className="font-semibold text-foreground">{sub.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{sub.description}</p>
                          {sub.functions && (
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-3">Functions:</p>
                              <ul className="space-y-2">
                                {sub.functions.map((func, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                    {func}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {sub.objectives && (
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-3">Objectives:</p>
                              <ul className="space-y-2">
                                {sub.objectives.map((obj, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                    <span className="w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                      {i + 1}
                                    </span>
                                    {obj}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}

                {/* Accounts Units */}
                {selectedDept.units && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground text-lg">Units</h3>
                    {selectedDept.units.map((unit, index) => (
                      <motion.div
                        key={unit.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-muted/30 rounded-xl p-4 border border-border"
                      >
                        <h4 className="font-semibold text-foreground mb-1">{unit.name}</h4>
                        <p className="text-sm text-muted-foreground">{unit.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Vision */}
                {selectedDept.vision && (
                  <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-5 mt-4 border border-accent/20">
                    <p className="text-sm font-semibold text-foreground mb-2">Vision:</p>
                    <p className="text-sm text-muted-foreground italic">{selectedDept.vision}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
