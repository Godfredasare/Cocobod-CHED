'use client';

import { motion } from 'framer-motion';
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
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/90" />

          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-5 py-2 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-6 backdrop-blur-sm border border-accent/10">
                About CHED
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Our Departments
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Explore the organizational structure and the various departments working together
                to support cocoa farmers across Ghana.
              </p>
            </div>
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
                  <div
                    key={dept.name}
                    className="bg-white rounded-2xl shadow-md overflow-hidden border border-border hover:scale-[1.02] transition-transform"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${dept.color}`}
                        >
                          <IconComponent className="w-7 h-7" />
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
                          className="mt-5 w-full py-3 bg-primary/10 text-primary font-semibold rounded-xl hover:bg-primary hover:text-white active:scale-95 transition"
                        >
                          Learn More
                        </button>
                      )}
                    </div>
                  </div>
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl text-center border border-border"
            >
              <h2 className="text-3xl font-bold text-foreground mb-5">Working Together for Cocoa Excellence</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                Our departments work collaboratively to deliver effective extension services,
                control cocoa diseases, and support the livelihoods of cocoa farmers across Ghana.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Extension', 'CSSVD Control', 'Seed Production', 'Farmer Education'].map((area) => (
                  <span
                    key={area}
                    className="px-5 py-2.5 bg-primary/10 text-primary rounded-full font-medium hover:scale-[1.02] transition-transform"
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
      {selectedDept && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDept(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
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
              <button
                onClick={() => setSelectedDept(null)}
                className="p-2 hover:bg-muted rounded-lg hover:scale-[1.02] active:scale-95 transition"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{selectedDept.description}</p>

              {/* Technical Sub-departments */}
              {selectedDept.hasSubDepts && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-foreground text-lg">Sub-Departments</h3>
                  {technicalSubDepts.map((sub) => {
                    const SubIconComponent = iconMap[sub.icon] || Settings;

                    return (
                      <div
                        key={sub.name}
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
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Accounts Units */}
              {selectedDept.units && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground text-lg">Units</h3>
                  {selectedDept.units.map((unit) => (
                    <div
                      key={unit.name}
                      className="bg-muted/30 rounded-xl p-4 border border-border"
                    >
                      <h4 className="font-semibold text-foreground mb-1">{unit.name}</h4>
                      <p className="text-sm text-muted-foreground">{unit.desc}</p>
                    </div>
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
    </>
  );
}
