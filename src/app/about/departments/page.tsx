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
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent text-sm font-medium rounded-full mb-6">
                About CHED
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Our Departments
              </h1>
              <p className="text-lg text-white/80">
                Explore the organizational structure and the various departments working together 
                to support cocoa farmers across Ghana.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Departments Overview */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => {
                const IconComponent = iconMap[dept.icon] || Settings;
                
                return (
                  <motion.div
                    key={dept.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 * index }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${dept.color}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-2">{dept.name}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{dept.description}</p>
                        </div>
                      </div>

                      {/* Learn More Button */}
                      {(dept.hasSubDepts || dept.units || dept.vision) && (
                        <button
                          onClick={() => setSelectedDept(dept)}
                          className="mt-4 w-full py-2.5 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary/20 transition-colors"
                        >
                          Learn More
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Organizational Chart Hint */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 lg:p-12 shadow-md text-center"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Working Together for Cocoa Excellence</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Our departments work collaboratively to deliver effective extension services, 
                control cocoa diseases, and support the livelihoods of cocoa farmers across Ghana.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {['Extension', 'CSSVD Control', 'Seed Production', 'Farmer Education'].map((area) => (
                  <span
                    key={area}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {area}
                  </span>
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDept(null)}
          >
            <div className="absolute inset-0 bg-black/50" />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedDept.color}`}>
                    {(() => {
                      const IconComponent = iconMap[selectedDept.icon] || Settings;
                      return <IconComponent className="w-5 h-5" />;
                    })()}
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{selectedDept.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedDept(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
                <p className="text-muted-foreground mb-6">{selectedDept.description}</p>

                {/* Technical Sub-departments */}
                {selectedDept.hasSubDepts && (
                  <div className="space-y-6">
                    <h3 className="font-semibold text-foreground">Sub-Departments</h3>
                    {technicalSubDepts.map((sub) => {
                      const SubIconComponent = iconMap[sub.icon] || Settings;
                      
                      return (
                        <div key={sub.name} className="bg-muted/50 rounded-xl p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                              <SubIconComponent className="w-4 h-4 text-primary" />
                            </div>
                            <h4 className="font-semibold text-foreground">{sub.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{sub.description}</p>
                          {sub.functions && (
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-2">Functions:</p>
                              <ul className="space-y-2">
                                {sub.functions.map((func, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                    {func}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {sub.objectives && (
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-2">Objectives:</p>
                              <ul className="space-y-2">
                                {sub.objectives.map((obj, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="w-5 h-5 bg-accent/20 text-accent rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                      {i + 1}
                                    </span>
                                    {obj}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Accounts Units */}
                {selectedDept.units && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Units</h3>
                    {selectedDept.units.map((unit) => (
                      <div key={unit.name} className="bg-muted/50 rounded-xl p-4">
                        <h4 className="font-semibold text-foreground mb-1">{unit.name}</h4>
                        <p className="text-sm text-muted-foreground">{unit.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Vision */}
                {selectedDept.vision && (
                  <div className="bg-accent/10 rounded-xl p-5 mt-4">
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
