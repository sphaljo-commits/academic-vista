import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, MapPin, Tag, Flag, GraduationCap, Users, Coffee, Sparkles, ChevronRight, Download } from "lucide-react";
import { CalendarEvent } from "@/types/auth";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const MOCK_EVENTS: CalendarEvent[] = [
  { id: "1", title: "Mid-Term Examinations Start", date: "2024-03-25", type: "exam", description: "Standardized assessments for all academic departments begin across campus." },
  { id: "2", title: "General PTA Assembly", date: "2024-04-05", type: "pta", description: "Mandatory consultation regarding Term III curriculum and facility expansion plans." },
  { id: "3", title: "Easter Academic Break", date: "2024-03-29", type: "holiday", description: "Institution closed for the observance of the Easter holidays." },
  { id: "4", title: "Inter-House Sports Festival", date: "2024-04-12", type: "event", description: "Annual display of athletic excellence and teamwork at the National Sports Complex." },
  { id: "5", title: "Innovation & Science Expo", date: "2024-03-20", type: "event", description: "Showcase of student engineering projects and biological research modules." },
];

export function SchoolCalendar() {
  const sortedEvents = [...MOCK_EVENTS].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getIcon = (type: string) => {
    switch (type) {
      case "exam": return <GraduationCap className="w-4 h-4" />;
      case "pta": return <Users className="w-4 h-4" />;
      case "holiday": return <Coffee className="w-4 h-4" />;
      default: return <Flag className="w-4 h-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "exam": return "bg-rose-50 text-rose-600 border-rose-100";
      case "pta": return "bg-blue-50 text-blue-600 border-blue-100";
      case "holiday": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-primary/10 rounded-2xl text-primary shadow-sm border border-primary/10">
               <CalendarIcon className="w-6 h-6" />
             </div>
             <h2 className="text-4xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Academic <span className="text-primary not-italic">Calendar</span></h2>
          </div>
          <p className="text-slate-500 font-medium tracking-tight">Institutional dates, holiday cycles, and official school activities.</p>
        </div>
        
        <div className="flex gap-3">
           <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-black uppercase tracking-widest text-[10px] px-6">
             <Download className="w-4 h-4 mr-2" /> Export Schedule
           </Button>
           <Button className="bg-primary hover:bg-primary/90 h-12 rounded-xl font-black uppercase tracking-widest text-[10px] px-8 shadow-xl shadow-primary/20">
             Sync to My Device
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-2xl bg-white rounded-[2rem] overflow-hidden">
          <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
            <CardTitle className="text-2xl font-black uppercase tracking-tight italic">Upcoming Milestone Events</CardTitle>
            <CardDescription className="font-medium text-slate-500">Official timeline for the current academic session.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {sortedEvents.map((event, idx) => (
                <motion.div 
                  key={event.id} 
                  initial={{ opacity: 0, x: -20 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center gap-8 group"
                >
                  <div className="flex-shrink-0 w-28 text-center py-4 px-3 rounded-[1.5rem] bg-slate-900 border border-slate-800 flex flex-col group-hover:scale-105 transition-transform shadow-lg shadow-slate-200">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-1">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-4xl font-black text-white leading-none italic tracking-tighter">
                      {new Date(event.date).getDate()}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">
                      {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`h-7 px-4 rounded-lg capitalize font-black text-[9px] tracking-widest flex items-center gap-2 border shadow-sm ${getColor(event.type)}`}>
                        {getIcon(event.type)}
                        {event.type}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight italic text-slate-900 group-hover:text-primary transition-colors leading-none">{event.title}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xl">{event.description}</p>
                  </div>

                  <div className="flex-shrink-0 flex flex-col items-end gap-3">
                    <Badge variant="secondary" className="bg-white border border-slate-100 rounded-xl px-4 py-2 font-black text-[10px] uppercase tracking-widest shadow-sm">
                      <Clock className="w-3.5 h-3.5 mr-2 text-primary" />
                      08:00 AM
                    </Badge>
                    <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors flex items-center gap-1">
                      Details <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="academic-card border-none shadow-2xl bg-slate-900 text-white overflow-hidden relative text-left">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles className="w-32 h-32 rotate-12" />
            </div>
            <CardHeader className="p-8 relative z-10">
              <CardTitle className="text-xl font-black uppercase tracking-tight italic">Institutional Status</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6 relative z-10">
              {[
                { label: "Next Assessment Cycle", value: "12 Days", sub: "Exam Readiness: High" },
                { label: "Public Observances", value: "4 Holidays", sub: "Term Cycle II" },
                { label: "Mandatory Assemblies", value: "2 Meetings", sub: "This Month" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 text-left block">{item.label}</span>
                    <p className="text-2xl font-black italic tracking-tighter text-white mt-1 leading-none">{item.value}</p>
                    <p className="text-[10px] font-bold text-indigo-400 mt-2 uppercase tracking-widest">{item.sub}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="academic-card border-none shadow-xl bg-white rounded-[2rem] text-left">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 italic">Classification Legend</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
              {[
                { label: "Examinations & Tests", type: "exam" },
                { label: "PTA & Consultations", type: "pta" },
                { label: "Institutional Holidays", type: "holiday" },
                { label: "Social & Sports Events", type: "event" },
              ].map(item => (
                <div key={item.type} className="flex items-center gap-4 group cursor-default">
                  <div className={`w-4 h-4 rounded-lg shadow-sm border ${getColor(item.type).split(' ')[0]} group-hover:scale-110 transition-transform`} />
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">{item.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}