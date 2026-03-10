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
                Company Profile
              </h1>
              <p className="text-lg text-white/80">
                Understanding our journey, purpose, and the values that drive our commitment to Ghana's cocoa industry.
              </p>
            </motion.div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
                Our History
              </h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="leading-relaxed mb-6">
                  The Cocoa Health and Extension Division (CHED) of Ghana Cocoa Board, formerly CSSVD 
                  and Cocoa Services Division, has had a chequered history since its establishment in 1945. 
                  The Cocoa Swollen Shoot Virus Disease (CSSVD) was first reported in the 1930's in the 
                  Eastern Region and has since spread throughout the cocoa growing regions in the country. 
                  The government set up the Cocoa Division as a Unit under the then Department of Agriculture 
                  to control the CSSVD and cocoa pests.
                </p>
                
                <p className="leading-relaxed mb-6">
                  The government also created cocoa stations where seeds were multiplied, seedlings raised 
                  and farmers educated on the correct method of cocoa cultivation. In 1962 when the disease 
                  was fairly under control and location of CSSVD outbreaks had been identified, the Cocoa 
                  Division was disbanded and the control of the disease was passed on to cocoa farmers under 
                  the United Ghana Farmers Co-operatives (UGFC) with the withdrawal of grant payments been 
                  made under the various control schemes but this did not work. Cocoa Division was, therefore, 
                  reconstituted in 1964/65 when it became evident that the farmers could not handle the disease 
                  control programme.
                </p>
                
                <p className="leading-relaxed mb-6">
                  In 1972, Cocoa Division was brought under the Ministry of Cocoa Affairs and was renamed 
                  Cocoa Production Division. Cocoa Extension which was under the Ministry of Agriculture 
                  until 1972 was also transferred to the newly created Ministry of Cocoa. In July 1979, 
                  when the Ministry of Cocoa Affairs was dissolved, Cocoa Production Division was placed 
                  under the management of the Ghana Cocoa Board (COCOBOD).
                </p>
                
                <p className="leading-relaxed mb-6">
                  Following a major restructuring exercise of Ghana Cocoa Board, its Subsidiaries and 
                  Divisions in 1985, the Cocoa Production Division was renamed Cocoa Services Division (CSD), 
                  with three clear functions:
                </p>
              </div>

              <div className="bg-muted/50 rounded-xl p-6 mb-8">
                <ul className="space-y-3">
                  {functions.map((func, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{func}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="leading-relaxed mb-6">
                  In response to the recommendations made by consultants and other working groups, the 
                  government decided to unify cocoa extension with Ministry of Food and Agriculture (MOFA) 
                  Extension services in 1998. Consequently, cocoa extension was ceded to MOFA in the year 2000. 
                  Cocoa Services Division was dissolved thereafter and two units, namely, the Cocoa Swollen 
                  Shoot Virus Disease Control Unit (CSSVD) and Seed Production Unit (SPU) were created in 
                  January 2001 to control and replant diseased cocoa farms and produce hybrid cocoa seed 
                  for farmers respectively.
                </p>
                
                <p className="leading-relaxed">
                  Following serious concerns from farmers and other stakeholders for effective and efficient 
                  extension system for cocoa farmers, the Public Private Partnership in Cocoa Extension, 
                  which is coordinated by CSSVDCU came into being in early 2010. In April 2014, the CSSVD-CU 
                  was upgraded to a Division and renamed the Cocoa Health and Extension Division with new mandates.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-md"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Eye className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  To achieve excellence in cocoa extension services delivery and increasing adoption of Good 
                  Agricultural Practices and Productivity Enhancement Programmes by farmers to attain 
                  <span className="text-primary font-semibold"> 1,500 Kg/ha by 2025</span>.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Target className="w-7 h-7 text-accent" />
                  </div>
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
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Core Values</h2>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our work and define who we are as an organization.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 * index }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">{value.title}</h4>
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
