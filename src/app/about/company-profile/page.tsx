'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Heart, CheckCircle } from 'lucide-react';
import Header from '@/components/ched/Header';
import Footer from '@/components/ched/Footer';

const coreValues = [
  {
    title: 'Hardwork with Integrity',
    description: 'We believe in dedicated effort combined with unwavering honesty and strong moral principles in all our operations.',
  },
  {
    title: 'Passion with Commitment to Duty',
    description: 'Our team approaches every task with enthusiasm and an unwavering dedication to serving Ghana\'s cocoa farmers.',
  },
  {
    title: 'Accountability',
    description: 'We take responsibility for our actions and decisions, ensuring transparency in all our operations and programs.',
  },
  {
    title: 'Versatility',
    description: 'We adapt to changing circumstances and evolving needs of the cocoa industry and farming communities.',
  },
  {
    title: 'Results-driven',
    description: 'We focus on achieving tangible outcomes that positively impact cocoa production and farmer livelihoods.',
  },
  {
    title: 'Trustworthiness',
    description: 'We build and maintain trust with farmers, partners, and stakeholders through consistent, reliable actions.',
  },
  {
    title: 'Excellence',
    description: 'CHED seeks to pursue excellence through hardwork with passion and commitment to duty in every endeavor.',
  },
  {
    title: 'Ethical Behaviour',
    description: 'We uphold acts of honesty and responsible behaviour, holding staff accountable for their actions to promote integrity.',
  },
];

const functions = [
  'To control the spread of Cocoa Swollen Shoot Virus Disease (CSSVD)',
  'To produce and supply hybrid seed pods to farmers (cocoa agronomy)',
  'To educate farmers on approved agronomic and cultural practices in cocoa cultivation (cocoa extension)',
];

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
    y: 40,
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
    y: -5,
    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.1)",
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20
    }
  }
};

export default function CompanyProfilePage() {
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
                Company Profile
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-white/90 leading-relaxed"
              >
                Understanding our journey, purpose, and the values that drive our commitment to Ghana's cocoa industry.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-20 lg:py-24 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-10 text-center">
                Our History
              </h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="leading-relaxed mb-6 text-lg"
                >
                  The Cocoa Health and Extension Division (CHED) of Ghana Cocoa Board, formerly CSSVD 
                  and Cocoa Services Division, has had a chequered history since its establishment in 1945. 
                  The Cocoa Swollen Shoot Virus Disease (CSSVD) was first reported in the 1930's in the 
                  Eastern Region and has since spread throughout the cocoa growing regions in the country. 
                  The government set up the Cocoa Division as a Unit under the then Department of Agriculture 
                  to control the CSSVD and cocoa pests.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="leading-relaxed mb-6"
                >
                  The government also created cocoa stations where seeds were multiplied, seedlings raised 
                  and farmers educated on the correct method of cocoa cultivation. In 1962 when the disease 
                  was fairly under control and location of CSSVD outbreaks had been identified, the Cocoa 
                  Division was disbanded and the control of the disease was passed on to cocoa farmers under 
                  the United Ghana Farmers Co-operatives (UGFC) with the withdrawal of grant payments been 
                  made under the various control schemes but this did not work. Cocoa Division was, therefore, 
                  reconstituted in 1964/65 when it became evident that the farmers could not handle the disease 
                  control programme.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="leading-relaxed mb-6"
                >
                  In 1972, Cocoa Division was brought under the Ministry of Cocoa Affairs and was renamed 
                  Cocoa Production Division. Cocoa Extension which was under the Ministry of Agriculture 
                  until 1972 was also transferred to the newly created Ministry of Cocoa. In July 1979, 
                  when the Ministry of Cocoa Affairs was dissolved, Cocoa Production Division was placed 
                  under the management of the Ghana Cocoa Board (COCOBOD).
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="leading-relaxed mb-6"
                >
                  Following a major restructuring exercise of Ghana Cocoa Board, its Subsidiaries and 
                  Divisions in 1985, the Cocoa Production Division was renamed Cocoa Services Division (CSD), 
                  with three clear functions:
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-8 mb-8 border border-border"
              >
                <ul className="space-y-4">
                  {functions.map((func, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <span className="text-foreground text-lg">{func}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <div className="prose prose-lg max-w-none text-muted-foreground">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="leading-relaxed mb-6"
                >
                  In response to the recommendations made by consultants and other working groups, the 
                  government decided to unify cocoa extension with Ministry of Food and Agriculture (MOFA) 
                  Extension services in 1998. Consequently, cocoa extension was ceded to MOFA in the year 2000. 
                  Cocoa Services Division was dissolved thereafter and two units, namely, the Cocoa Swollen 
                  Shoot Virus Disease Control Unit (CSSVD) and Seed Production Unit (SPU) were created in 
                  January 2001 to control and replant diseased cocoa farms and produce hybrid cocoa seed 
                  for farmers respectively.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="leading-relaxed text-lg"
                >
                  Following serious concerns from farmers and other stakeholders for effective and efficient 
                  extension system for cocoa farmers, the Public Private Partnership in Cocoa Extension, 
                  which is coordinated by CSSVDCU came into being in early 2010. In April 2014, the CSSVD-CU 
                  was upgraded to a Division and renamed the Cocoa Health and Extension Division with new mandates.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-gradient-to-b from-muted/50 to-muted/30 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-border"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center"
                  >
                    <Eye className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground">Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To achieve excellence in cocoa extension services delivery and increasing adoption of Good 
                  Agricultural Practices and Productivity Enhancement Programmes by farmers to attain 
                  <span className="text-primary font-bold"> 1,500 Kg/ha by 2025</span>.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-border"
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center"
                  >
                    <Target className="w-8 h-8 text-accent" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground">Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Support cocoa farmers to adapt Good Agricultural Practices through effective and efficient 
                  extension services delivery, rehabilitate diseased and overaged cocoa farms and implement 
                  other Productivity Enhancement Programmes for increased yields.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 lg:py-24 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="flex items-center justify-center gap-4 mb-5">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center"
                >
                  <Heart className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Core Values</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The principles that guide our work and define who we are as an organization.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-20px" }}
                  className="bg-white rounded-2xl p-6 shadow-md border border-border"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mb-5">
                    <CheckCircle className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">{value.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
