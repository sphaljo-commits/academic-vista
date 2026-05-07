import React from "react";
import { useSchool } from "@/context/SchoolContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin,
  ChevronRight,
  Star,
  Award,
  ArrowRight,
  School as SchoolIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function SchoolWebsite() {
  const { websiteContent, school } = useSchool();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-3 bg-primary rounded-[1rem] text-white shadow-lg shadow-primary/20"
            >
              <SchoolIcon className="w-8 h-8" />
            </motion.div>
            <div className="leading-tight">
              <span className="text-2xl font-black tracking-tighter text-slate-900 block uppercase italic">
                {school?.name || "Academix"} <span className="text-primary not-italic">Pro</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Excellence in Learning</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-600"
          >
            {['programs', 'gallery', 'events'].map((item) => (
              <motion.a 
                key={item}
                href={`#${item}`} 
                whileHover={{ scale: 1.05, y: -2 }}
                className="hover:text-primary transition-colors relative group"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </motion.a>
            ))}
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" onClick={() => navigate("/login")} className="font-black text-xs hover:bg-slate-50">Portal Login</Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 font-black text-xs shadow-lg shadow-primary/20" onClick={() => navigate("/admission-apply")}>Apply Now</Button>
            </motion.div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d161c0c-e646-41d5-ac20-ccfa608a2d39/modern-campus-hero-25c13473-1778107460291.webp" 
            alt="Campus" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl space-y-8">
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-white"
            >
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-black uppercase tracking-widest">Global Top 10 Educational Institution</span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase italic"
            >
              Nurturing <br /> <span className="text-primary not-italic">Future Leaders.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-300 max-w-xl font-medium leading-relaxed"
            >
              We provide a holistic educational environment that balances academic rigor with personal growth and character development.
            </motion.p>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 h-16 text-xs font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary/40" onClick={() => navigate("/admission-apply")}>
                Start Admission <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 px-10 h-16 text-xs font-black uppercase tracking-widest rounded-2xl" onClick={() => navigate("/employment-apply")}>
                Join Our Staff
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="absolute bottom-12 right-12 hidden lg:flex gap-12 text-white">
          <div className="text-right">
            <p className="text-4xl font-black">2.5k+</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Students</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black">150+</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Expert Faculty</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black">98%</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Success Rate</p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Curriculum</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Our Academic <span className="text-primary not-italic">Programs</span></h2>
            </div>
            <p className="max-w-md text-slate-500 font-medium leading-relaxed">
              We offer a diverse range of programs designed to challenge students and prepare them for the demands of the modern world.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {websiteContent.programs.map((program) => (
              <motion.div key={program.id} variants={itemVariants}>
                <Card className="academic-card border-none p-4 group">
                  <div className="relative h-64 overflow-hidden rounded-[1.5rem] mb-8">
                    <img 
                      src={program.id === 'p1' ? 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d161c0c-e646-41d5-ac20-ccfa608a2d39/school-library-9edc46e5-1778107459816.webp' : 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d161c0c-e646-41d5-ac20-ccfa608a2d39/science-lab-26c1bb96-1778107461301.webp'} 
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors" />
                    <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center text-white">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                  </div>
                  <CardHeader className="pt-0">
                    <CardTitle className="text-2xl font-black uppercase tracking-tight italic group-hover:text-primary transition-colors">{program.title}</CardTitle>
                    <CardDescription className="text-base text-slate-600 font-medium leading-relaxed pt-2">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <div className="px-6 pb-6 pt-4">
                    <Button variant="link" className="p-0 h-auto text-primary font-black uppercase tracking-widest text-[10px] hover:no-underline flex items-center gap-2">
                      Explore Curriculum <ChevronRight className="w-3 h-3" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Vibrant Campus Life</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Inside our <span className="text-primary not-italic">Community</span></h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {websiteContent.gallery.map((img, i) => (
              <motion.div 
                key={img.id}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-[2rem] group cursor-pointer shadow-xl ${i % 3 === 0 ? 'col-span-2 row-span-2 h-[600px]' : 'h-[280px]'}`}
              >
                <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <span className="text-white font-black uppercase italic tracking-tighter text-2xl mb-2">{img.title}</span>
                  <div className="h-1 w-12 bg-primary rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-32 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute -bottom-24 -left-24 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="space-y-4">
              <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">What's Happening</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">Upcoming <span className="text-primary not-italic">Events</span></h2>
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl font-black text-xs uppercase tracking-widest px-8 h-12">View Full Calendar</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {websiteContent.events.map((event, i) => (
              <motion.div 
                key={event.id} 
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col lg:flex-row gap-8 items-start group"
              >
                <div className="relative shrink-0 w-full lg:w-48 h-64 lg:h-48 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white text-slate-950 p-3 rounded-2xl text-center min-w-[70px] shadow-xl">
                    <div className="text-2xl font-black leading-none">{new Date(event.date).getDate()}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest mt-1">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-2">
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> 8:00 AM - 4:00 PM</span>
                    <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Main Assembly Hall</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 pt-32 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <div className="flex items-center gap-4 text-white">
                <div className="p-2 bg-primary rounded-xl">
                  <SchoolIcon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black tracking-tighter uppercase italic">
                  {school?.name || "Academix"} <span className="text-primary not-italic">Pro</span>
                </span>
              </div>
              <p className="max-w-md text-lg font-medium leading-relaxed">
                Empowering students to think critically, act ethically, and contribute generously to our global society.
              </p>
              <div className="flex gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-white transition-all cursor-pointer">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-white font-black uppercase tracking-widest text-xs">Navigation</h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
                <li><button onClick={() => navigate("/login")} className="hover:text-primary transition-colors">Portal Access</button></li>
                <li><button onClick={() => navigate("/admission-apply")} className="hover:text-primary transition-colors">Admission Hub</button></li>
                <li><button onClick={() => navigate("/employment-apply")} className="hover:text-primary transition-colors">Career Opportunities</button></li>
                <li><button className="hover:text-primary transition-colors">Academic Calendar</button></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-white font-black uppercase tracking-widest text-xs">Reach Out</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex items-center gap-4 text-slate-300"><Phone className="w-4 h-4 text-primary" /> {school?.phone || "+123 456 789"}</li>
                <li className="flex items-center gap-4 text-slate-300"><Mail className="w-4 h-4 text-primary" /> {school?.email || "hello@academix.edu"}</li>
                <li className="flex items-center gap-4 text-slate-300"><MapPin className="w-4 h-4 text-primary" /> {school?.address || "Educational District 12, Lagos"}</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">
              &copy; {new Date().getFullYear()} {school?.name || "Academix Pro"}. Developed for Educational Excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}