import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, Eye, FileText, Plus, Trash2, Edit3, Save, X, Calculator, ShieldCheck, Sparkles, RefreshCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Subject {
  id: string;
  name: string;
  classMark: number;
  homework: number;
  exam: number;
}

interface ReportCardProps {
  title: string;
  term: string;
  date: string;
  type: "Terminal" | "CA Record";
  grade?: string;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  title: initialTitle,
  term: initialTerm,
  date: initialDate,
  type: initialType,
}) => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", name: "Mathematics", classMark: 18, homework: 19, exam: 54 },
    { id: "2", name: "English Language", classMark: 15, homework: 16, exam: 50 },
    { id: "3", name: "Applied Science", classMark: 14, homework: 18, exam: 45 },
  ]);

  const [meta, setMeta] = useState({
     title: initialTitle,
     term: initialTerm,
     date: initialDate,
     type: initialType
  });

  const calculateTotal = (s: Subject) => s.classMark + s.homework + s.exam;

  const calculateGrade = (score: number) => {
    if (score >= 80) return "A+";
    if (score >= 70) return "A";
    if (score >= 60) return "B";
    if (score >= 50) return "C";
    return "F";
  };

  const calculatedAverageScore = subjects.reduce((acc, s) => acc + calculateTotal(s), 0) / (subjects.length || 1);
  const averageGrade = calculateGrade(calculatedAverageScore);

  const addSubject = () => {
    const newSubject: Subject = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Registry Hub",
      classMark: 0,
      homework: 0,
      exam: 0
    };
    setSubjects([...subjects, newSubject]);
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const updateSubject = (id: string, field: keyof Subject, value: string | number) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleDownload = () => {
    toast.success(`Temporal Artifact Export: ${meta.title}`, {
      description: "Encrypted PDF generation sequence active protocol.",
    });
  };

  return (
    <Card className="group relative overflow-hidden border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] rounded-[3.5rem] bg-white transition-all duration-700 hover:shadow-indigo-100 hover:ring-4 hover:ring-indigo-50">
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/50 rounded-full translate-x-20 -translate-y-20 group-hover:scale-150 transition-transform duration-1000" />
      <CardContent className="flex items-center justify-between p-10 md:p-14 relative z-10">
        <div className="flex items-center gap-10">
          <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-indigo-50 text-indigo-600 transition-all duration-700 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-12 shadow-2xl shadow-indigo-100/50 group-hover:shadow-indigo-300">
            <FileText className="h-10 w-10" />
          </div>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <h3 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none group-hover:text-indigo-600 transition-colors">{meta.title}</h3>
              <Badge variant={meta.type === "Terminal" ? "default" : "secondary"} className="px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-none shadow-2xl bg-indigo-600 text-white">
                {meta.type} PROTOCOL
              </Badge>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                 <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic">Cycle: {meta.term}</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                 <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic">Registry: {meta.date}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="hidden flex-col items-center sm:flex space-y-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-300 italic">Aggregate Index</span>
            <span className="text-6xl font-black text-indigo-600 italic tracking-tighter leading-none">{averageGrade}</span>
          </div>
          <div className="flex gap-5">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="h-20 w-20 rounded-[2.2rem] text-indigo-600 bg-white border-slate-100 shadow-2xl hover:bg-indigo-50 hover:scale-110 transition-all group/edit">
                  <Edit3 className="h-8 w-8 group-hover/edit:rotate-12 transition-transform" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-[5rem] p-20 bg-white border-none shadow-[0_100px_200px_-50px_rgba(0,0,0,0.3)]">
                <DialogHeader className="pb-12">
                  <div className="flex items-center gap-10">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-indigo-50 flex items-center justify-center shadow-2xl shadow-indigo-50">
                      <Calculator className="w-12 h-12 text-indigo-600" />
                    </div>
                    <div className="space-y-2">
                      <DialogTitle className="text-5xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Artifact <span className="text-indigo-600">Registry</span></DialogTitle>
                      <CardDescription className="font-black text-slate-400 uppercase tracking-widest text-[12px] italic">Sync subject metrics (20% REG | 20% PRO | 60% FIN protocol)</CardDescription>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-16 py-4">
                  <div className="grid grid-cols-2 gap-12 bg-slate-50/50 p-12 rounded-[3.5rem] border border-slate-100 shadow-inner">
                    <div className="space-y-4">
                       <Label className="text-[11px] font-black uppercase text-slate-400 italic ml-4">Artifact Designation</Label>
                       <Input value={meta.title} onChange={e => setMeta({...meta, title: e.target.value})} className="h-18 bg-white border-none rounded-[1.5rem] font-black italic text-2xl px-8 shadow-inner focus-visible:ring-indigo-600/20" />
                    </div>
                    <div className="space-y-4">
                       <Label className="text-[11px] font-black uppercase text-slate-400 italic ml-4">Cycle Identification</Label>
                       <Input value={meta.term} onChange={e => setMeta({...meta, term: e.target.value})} className="h-18 bg-white border-none rounded-[1.5rem] font-black italic text-2xl px-8 shadow-inner focus-visible:ring-indigo-600/20" />
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="grid grid-cols-12 gap-8 text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] px-10 italic">
                      <div className="col-span-4">Specialization Hub</div>
                      <div className="col-span-2 text-center">REG (20%)</div>
                      <div className="col-span-2 text-center">PRO (20%)</div>
                      <div className="col-span-2 text-center">FIN (60%)</div>
                      <div className="col-span-1 text-center">INDEX</div>
                      <div className="col-span-1"></div>
                    </div>

                    <div className="space-y-6">
                      {subjects.map((sub) => (
                        <motion.div layout key={sub.id} className="grid grid-cols-12 gap-8 items-center bg-slate-50/50 p-8 rounded-[2.5rem] group/row border border-transparent hover:border-indigo-100 hover:bg-white transition-all shadow-sm">
                          <div className="col-span-4">
                            <Input 
                              value={sub.name} 
                              onChange={(e) => updateSubject(sub.id, 'name', e.target.value)}
                              className="h-16 bg-white border-none rounded-2xl font-black italic text-2xl text-slate-800 shadow-inner px-8 focus-visible:ring-indigo-600/20"
                            />
                          </div>
                          <div className="col-span-2">
                            <Input 
                              type="number" 
                              max={20}
                              value={sub.classMark} 
                              onChange={(e) => updateSubject(sub.id, 'classMark', parseInt(e.target.value) || 0)}
                              className="h-16 bg-white border-none rounded-2xl font-black italic text-center text-2xl shadow-inner focus-visible:ring-indigo-600/20"
                            />
                          </div>
                          <div className="col-span-2">
                            <Input 
                              type="number" 
                              max={20}
                              value={sub.homework} 
                              onChange={(e) => updateSubject(sub.id, 'homework', parseInt(e.target.value) || 0)}
                              className="h-16 bg-white border-none rounded-2xl font-black italic text-center text-2xl shadow-inner focus-visible:ring-indigo-600/20"
                            />
                          </div>
                          <div className="col-span-2">
                            <Input 
                              type="number" 
                              max={60}
                              value={sub.exam} 
                              onChange={(e) => updateSubject(sub.id, 'exam', parseInt(e.target.value) || 0)}
                              className="h-16 bg-white border-none rounded-2xl font-black italic text-center text-2xl shadow-inner focus-visible:ring-indigo-600/20"
                            />
                          </div>
                          <div className="col-span-1 text-center font-black text-4xl italic tracking-tighter text-indigo-600 group-hover/row:scale-110 transition-transform">
                            {calculateTotal(sub)}
                          </div>
                          <div className="col-span-1 flex justify-end">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-14 w-14 text-rose-500 opacity-0 group-hover/row:opacity-100 transition-all hover:bg-rose-50 rounded-2xl"
                              onClick={() => removeSubject(sub.id)}
                            >
                              <Trash2 className="w-7 h-7" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full h-24 border-dashed border-4 border-slate-100 rounded-[3rem] font-black uppercase tracking-[0.3em] text-[12px] hover:border-indigo-600 hover:text-indigo-600 transition-all hover:bg-indigo-50/30 shadow-inner group" onClick={addSubject}>
                      <Plus className="w-7 h-7 mr-5 group-hover:scale-125 transition-transform" /> Initialize New Subject Protocol
                    </Button>
                  </div>
                </div>

                <DialogFooter className="bg-slate-50/50 -mx-20 -mb-20 p-16 mt-16 border-t border-slate-100">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-8">
                       <div className="w-24 h-24 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center text-indigo-600 font-black italic text-4xl shadow-indigo-100 border border-slate-50 group-hover:rotate-6 transition-transform">
                          {averageGrade}
                       </div>
                       <div>
                          <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic mb-2">Consolidated Index</p>
                          <p className="text-3xl font-black italic text-indigo-600 tracking-tighter">{calculatedAverageScore.toFixed(1)}% Optimization</p>
                       </div>
                    </div>
                    <Button onClick={() => {
                      toast.success("Institutional Portfolio Synchronized!", {
                        icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
                        description: "Registry changes committed to temporal hub."
                      });
                    }} className="h-24 px-16 rounded-[2.5rem] bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest text-sm shadow-2xl transition-all hover:-translate-y-2">
                      <RefreshCcw className="w-6 h-6 mr-5 text-indigo-400 animate-spin-slow" /> Synchronize Portfolio
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button size="icon" onClick={handleDownload} className="h-20 w-20 rounded-[2.2rem] bg-slate-900 hover:bg-black shadow-2xl hover:scale-110 transition-all group/down">
              <FileDown className="h-8 w-8 text-emerald-400 group-hover/down:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};