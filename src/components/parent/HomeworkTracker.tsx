import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, CheckCircle2, Circle, ArrowUpRight, FileText, Sparkles, Filter, Search } from "lucide-react";
import { toast } from "sonner";
import { Assignment } from "@/types/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MOCK_CHILD_ASSIGNMENTS: Record<string, Assignment[]> = {
  "s1": [
    { id: "1", title: "Quadratic Equations & Roots", description: "Complete advanced problems 1-10 on page 45 of the Pure Math curriculum.", classId: "c1", subject: "Mathematics", teacherId: "3", dueDate: "2024-03-25", status: "active" },
    { id: "2", title: "Photosynthesis Analytical Essay", description: "Write a 500-word critical analysis on carbon cycles and plant biology.", classId: "c1", subject: "Integrated Science", teacherId: "3", dueDate: "2024-03-22", status: "active" },
    { id: "4", title: "Global Economies Report", description: "Research the impact of digital currencies on modern global trade.", classId: "c1", subject: "Social Studies", teacherId: "3", dueDate: "2024-03-30", status: "active" },
  ],
  "s2": [
    { id: "3", title: "Ancient Civilizations Review", description: "Compare and contrast the political structures of Rome and Greece.", classId: "c1", subject: "History", teacherId: "3", dueDate: "2024-03-24", status: "active" },
    { id: "5", title: "Creative Narrative Writing", description: "Draft a 1000-word short story focusing on character development.", classId: "c1", subject: "English Language", teacherId: "3", dueDate: "2024-03-28", status: "active" },
  ]
};

export function HomeworkTracker({ childId, childName }: { childId: string, childName: string }) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const assignments = MOCK_CHILD_ASSIGNMENTS[childId] || [];

  const toggleComplete = (id: string, title: string) => {
    const newState = !completed[id];
    setCompleted(prev => ({ ...prev, [id]: newState }));
    if (newState) {
      toast.success(`Academic task "${title}" marked as verified!`, {
        description: `Great commitment to excellence, ${childName}!`,
      });
    }
  };

  const filteredAssignments = assignments.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shadow-sm border border-blue-100">
               <BookOpen className="w-6 h-6" />
             </div>
             <h2 className="text-4xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Homework <span className="text-blue-600 not-italic">Tracker</span></h2>
          </div>
          <p className="text-slate-500 font-medium tracking-tight">Monitor and verify the academic coursework for {childName}.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search assignments..." 
                className="pl-10 h-12 rounded-xl bg-white border-slate-200 w-64 shadow-sm font-bold" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <Badge variant="outline" className="h-12 px-6 rounded-xl bg-white font-black uppercase tracking-widest text-[10px] border-slate-200 shadow-sm flex items-center gap-3">
             <span className="text-blue-600">{assignments.filter(a => completed[a.id]).length} / {assignments.length}</span> Handed In
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredAssignments.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50/50">
                <FileText className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                <h3 className="text-2xl font-black uppercase tracking-tighter italic text-slate-400">No Assignments Found</h3>
                <p className="text-slate-400 font-medium mt-2">Check back later for new academic directives.</p>
              </motion.div>
            ) : (
              filteredAssignments.map((assignment, idx) => (
                <motion.div 
                  key={assignment.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card 
                    className={`academic-card border-none shadow-xl overflow-hidden group transition-all duration-500 rounded-[2rem] ${completed[assignment.id] ? "bg-slate-50 border-slate-100 opacity-60" : "bg-white"}`}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-stretch min-h-[160px]">
                        <div className={`w-3 transition-colors duration-500 ${completed[assignment.id] ? "bg-emerald-500" : "bg-blue-600"}`} />
                        <div className="flex-1 p-8">
                          <div className="flex items-start justify-between gap-6">
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <Badge variant="secondary" className="bg-blue-50 text-blue-600 font-black uppercase tracking-widest text-[9px] h-7 px-4 rounded-lg border-none">
                                  {assignment.subject}
                                </Badge>
                                <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                  <Calendar className="w-3.5 h-3.5 mr-2 text-blue-500" /> Deadline: {new Date(assignment.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </div>
                              </div>
                              <h3 className={`text-2xl font-black uppercase tracking-tight italic transition-all ${completed[assignment.id] ? "text-slate-400 line-through" : "text-slate-900 group-hover:text-blue-600"}`}>
                                {assignment.title}
                              </h3>
                              <p className="text-slate-500 font-medium leading-relaxed max-w-xl line-clamp-2 italic">"{assignment.description}"</p>
                            </div>
                            <button 
                              onClick={() => toggleComplete(assignment.id, assignment.title)}
                              className={`h-16 w-16 rounded-[1.25rem] flex items-center justify-center transition-all shadow-lg active:scale-95 ${completed[assignment.id] ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-slate-100 text-slate-400 hover:bg-blue-600 hover:text-white hover:shadow-blue-200"}`}
                            >
                              {completed[assignment.id] ? <CheckCircle2 className="w-8 h-8" /> : <Circle className="w-8 h-8" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-8">
           <Card className="academic-card border-none shadow-2xl bg-slate-900 text-white rounded-[2rem] overflow-hidden relative">
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <Sparkles className="w-32 h-32 rotate-12" />
             </div>
             <CardHeader className="p-8 relative z-10">
               <CardTitle className="text-xl font-black uppercase tracking-tight italic">Performance Index</CardTitle>
             </CardHeader>
             <CardContent className="p-8 pt-0 space-y-6 relative z-10">
                <div className="text-center">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Completion Velocity</p>
                   <p className="text-6xl font-black italic tracking-tighter leading-none">92%</p>
                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-4">+12.4% Higher than Peer Avg</p>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mt-8">
                   <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }} />
                </div>
                <p className="text-xs text-white/60 font-medium leading-relaxed italic mt-4 text-center">
                  Consistent coursework completion is highly correlated with the current academic success score.
                </p>
             </CardContent>
           </Card>

           <Card className="academic-card border-none shadow-xl bg-white rounded-[2rem]">
             <CardHeader className="p-8 pb-4">
               <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Teacher's Note</CardTitle>
             </CardHeader>
             <CardContent className="p-8 pt-0">
                <p className="text-sm font-medium italic text-slate-600 leading-relaxed">
                  "Please ensure all Mathematics submissions include step-by-step working for partial credit evaluation."
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-slate-50 pt-6">
                   <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs">SM</div>
                   <div>
                      <p className="text-xs font-black uppercase text-slate-900">Dr. Sarah Mitchell</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Head of Academics</p>
                   </div>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}