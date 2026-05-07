import React, { useState } from "react";
import { Assignment } from "@/types/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Calendar, FileText, Trash2, Edit2, MoreVertical, Check, X, Sparkles, GraduationCap, Clock, RefreshCcw, ShieldCheck, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSchool } from "@/context/SchoolContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AssignmentManagerProps {
  teacherId: string;
  assignedClasses: string[];
}

export function AssignmentManager({ teacherId, assignedClasses }: AssignmentManagerProps) {
  const { assignments, addAssignment, updateAssignment, deleteAssignment } = useSchool();
  const [showNewForm, setShowNewForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Assignment>>({ title: "", description: "", classId: "", subject: "", dueDate: "", status: "active" });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSave = () => {
    if (!form.title || !form.classId) return toast.error("Protocol violation: Missing mandatory metadata fields");
    if (editingId) {
      updateAssignment(editingId, form);
      toast.success("Academic artifact synchronized!", { icon: <RefreshCcw className="text-emerald-500" /> });
    } else {
      addAssignment({ ...form, id: Math.random().toString(36).substr(2, 9), teacherId, status: "active" } as Assignment);
      toast.success("New coursework protocol published!", { icon: <Zap className="text-teal-400" /> });
    }
    setShowNewForm(false);
    setEditingId(null);
    setForm({ title: "", description: "", classId: "", subject: "", dueDate: "", status: "active" });
  };

  const handleEdit = (a: Assignment) => {
    setEditingId(a.id);
    setForm(a);
    setShowNewForm(true);
  };

  const filteredAssignments = assignments.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.classId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-16 animate-in fade-in duration-1000 pb-40">
      {/* Hyper-Vibrant Vault Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 bg-white p-16 rounded-[6rem] border-2 border-emerald-100 shadow-[0_80px_160px_-40px_rgba(5,150,105,0.1)] relative overflow-hidden group">
        <div className="absolute -right-32 -bottom-32 opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-[3000ms]">
           <GraduationCap className="w-[45rem] h-[45rem] text-emerald-600 rotate-12" />
        </div>
        <div className="space-y-4 relative z-10">
          <h2 className="text-8xl font-black uppercase tracking-tighter italic text-slate-900 leading-none group-hover:text-emerald-600 transition-colors duration-500">Coursework <span className="text-emerald-600 not-italic">Vault</span></h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[13px] mt-8 italic leading-none">Orchestrating institutional learning artifacts & temporal challenges grid</p>
        </div>
        <div className="flex gap-8 relative z-10">
          <Button onClick={() => setShowNewForm(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-[3rem] h-28 px-20 font-black uppercase tracking-[0.2em] text-sm shadow-[0_30px_60px_-15px_rgba(5,150,105,0.4)] transition-all hover:-translate-y-4 group/add">
            <Plus className="w-10 h-10 mr-6 text-emerald-200 group-hover:rotate-90 transition-transform" /> Initialize Challenge Protocol
          </Button>
        </div>
      </div>

      {/* Search & Intelligence Node */}
      <div className="flex flex-col xl:flex-row items-center gap-12">
        <div className="relative flex-1 group w-full">
           <div className="absolute inset-0 bg-emerald-500/10 rounded-[4rem] blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
           <Search className="absolute left-10 top-1/2 -translate-y-1/2 w-10 h-10 text-slate-300 group-focus-within:text-emerald-600 transition-all duration-700" />
           <Input 
            placeholder="Query academic artifact database protocols..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            className="pl-28 h-28 rounded-[4rem] bg-white border-none shadow-[0_60px_120px_-30px_rgba(0,0,0,0.1)] font-black uppercase text-lg tracking-widest italic focus-visible:ring-emerald-600/10 shadow-inner px-16"
           />
        </div>
        <div className="bg-slate-900 text-white px-20 h-28 rounded-[4rem] flex items-center gap-10 shadow-2xl transition-all hover:bg-black group/ai overflow-hidden relative border-t-4 border-emerald-500/30">
           <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover/ai:opacity-100 transition-opacity" />
           <Sparkles className="w-12 h-12 text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.8)] animate-pulse relative z-10" />
           <div className="flex flex-col relative z-10">
              <span className="text-[13px] font-black uppercase tracking-[0.3em] leading-none">Protocol Node Active</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-3 italic">Temporal Grid Synchronized</span>
           </div>
        </div>
      </div>

      {/* Synthesis Form */}
      <AnimatePresence>
        {showNewForm && (
          <motion.div initial={{ height: 0, opacity: 0, scale: 0.95 }} animate={{ height: "auto", opacity: 1, scale: 1 }} exit={{ height: 0, opacity: 0, scale: 0.95 }} className="overflow-hidden">
            <Card className="border-none shadow-[0_120px_240px_-60px_rgba(5,150,105,0.2)] rounded-[6rem] bg-white p-24 border-b-8 border-emerald-100">
              <CardHeader className="p-0 pb-16">
                <div className="flex items-center gap-12">
                   <div className="w-28 h-28 bg-emerald-50 rounded-[3rem] flex items-center justify-center text-emerald-600 shadow-2xl shadow-emerald-50 border border-emerald-100">
                      <FileText className="w-14 h-14" />
                   </div>
                   <div className="space-y-3">
                      <CardTitle className="text-6xl font-black italic uppercase tracking-tighter leading-none group-hover:text-emerald-600 transition-colors duration-500">Artifact <span className="text-emerald-600">Synthesis</span></CardTitle>
                      <CardDescription className="font-black text-slate-400 uppercase tracking-[0.3em] text-[13px] mt-6 italic">Define the temporal parameters of the academic challenge protocol</CardDescription>
                   </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 space-y-16">
                <div className="grid xl:grid-cols-2 gap-16">
                  <div className="space-y-6">
                    <Label className="text-[12px] font-black uppercase tracking-widest text-slate-400 ml-8 italic">Challenge Designation Identity (Title)</Label>
                    <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="h-28 bg-slate-50 border-none rounded-[3.5rem] px-16 font-black italic text-4xl shadow-inner text-emerald-600 focus:ring-4 focus:ring-emerald-600/10" placeholder="e.g. Algorithmic Synthesis 101" />
                  </div>
                  <div className="space-y-6">
                    <Label className="text-[12px] font-black uppercase tracking-widest text-slate-400 ml-8 italic">Temporal Target Hub allocation (Cohort)</Label>
                    <select value={form.classId} onChange={e => setForm({ ...form, classId: e.target.value })} className="w-full h-28 bg-slate-50 border-none rounded-[3.5rem] px-16 font-black uppercase text-xl tracking-[0.2em] italic shadow-inner focus:ring-4 focus:ring-emerald-600/10">
                      <option value="">Select Registry Allocation</option>
                      {assignedClasses.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid xl:grid-cols-2 gap-16">
                  <div className="space-y-6">
                    <Label className="text-[12px] font-black uppercase tracking-widest text-slate-400 ml-8 italic">Subject Discipline Registry Branch</Label>
                    <Input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="h-24 bg-slate-50 border-none rounded-[2.5rem] px-12 font-black italic text-2xl shadow-inner focus:ring-4 focus:ring-emerald-600/10" placeholder="e.g. Theoretical Quantum Mechanics" />
                  </div>
                  <div className="space-y-6">
                    <Label className="text-[12px] font-black uppercase tracking-widest text-slate-400 ml-8 italic">Temporal Deadline Position (Registry Mark)</Label>
                    <Input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} className="h-24 bg-slate-50 border-none rounded-[2.5rem] px-12 font-black italic text-2xl shadow-inner focus:ring-4 focus:ring-emerald-600/10" />
                  </div>
                </div>
                <div className="space-y-6">
                  <Label className="text-[12px] font-black uppercase tracking-widest text-slate-400 ml-8 italic">Artifact Narrative Payload (Operational Logic)</Label>
                  <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-slate-50 border-none rounded-[4rem] p-16 shadow-inner font-bold italic text-slate-600 text-2xl leading-relaxed min-h-[300px] focus:ring-4 focus:ring-emerald-600/10" placeholder="Define the challenge logic parameters & expected outcomes..." />
                </div>
                <div className="flex justify-end gap-10 pt-16">
                   <Button variant="ghost" onClick={() => setShowNewForm(false)} className="h-28 px-16 rounded-[3rem] font-black uppercase text-sm tracking-[0.2em] hover:bg-slate-100 transition-all text-slate-400">Abort Protocol</Button>
                   <Button onClick={handleSave} className="h-28 px-24 rounded-[3rem] bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-sm tracking-[0.2em] shadow-[0_40px_80px_-20px_rgba(5,150,105,0.4)] transition-all hover:-translate-y-4 group/save">
                     <RefreshCcw className="w-10 h-10 mr-6 text-emerald-200 animate-spin-slow group-hover/save:scale-125 transition-transform" /> Commit to Temporal Grid
                   </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Artifact Grid */}
      <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredAssignments.map((a) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={a.id}
            >
              <Card className="border-none shadow-[0_80px_160px_-40px_rgba(0,0,0,0.12)] rounded-[5.5rem] bg-white hover:shadow-emerald-100 hover:-translate-y-5 transition-all duration-1000 group relative overflow-hidden border border-slate-50">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 opacity-0 group-hover:opacity-100 rounded-full translate-x-24 -translate-y-24 group-hover:scale-[2.5] transition-all duration-[2000ms] blur-[5rem]" />
                <CardHeader className="p-16 pb-8 relative z-10">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-emerald-50 text-emerald-600 px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest border-none shadow-xl group-hover:bg-white transition-all">{a.classId} HUB</Badge>
                    <div className="flex gap-5 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-12 group-hover:translate-x-0">
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(a)} className="h-16 w-16 rounded-[1.5rem] bg-white shadow-2xl hover:text-emerald-600 hover:scale-110 transition-all border border-slate-100"><Edit2 className="w-7 h-7" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => { deleteAssignment(a.id); toast.info("Artifact archived from grid"); }} className="h-16 w-16 rounded-[1.5rem] bg-white shadow-2xl hover:text-rose-600 hover:scale-110 transition-all border border-slate-100"><Trash2 className="w-7 h-7" /></Button>
                    </div>
                  </div>
                  <CardTitle className="text-5xl font-black uppercase tracking-tighter italic mt-12 text-slate-900 leading-[1.1] group-hover:text-emerald-600 transition-colors duration-700">{a.title}</CardTitle>
                  <div className="flex items-center gap-4 mt-6">
                     <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                     <p className="text-[12px] font-black text-emerald-600 uppercase tracking-widest italic">Registry: {a.subject}</p>
                  </div>
                </CardHeader>
                <CardContent className="p-16 pt-0 mt-10 space-y-12 relative z-10">
                  <p className="text-2xl font-bold text-slate-400 italic leading-relaxed line-clamp-3 group-hover:text-slate-700 transition-colors duration-700 leading-normal">"{a.description}"</p>
                  <div className="flex items-center justify-between pt-12 border-t-2 border-slate-50">
                    <div className="flex items-center gap-6">
                       <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-all shadow-2xl duration-700">
                          <Clock className="w-10 h-10" />
                       </div>
                       <div className="flex flex-col space-y-2">
                          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300">Temporal Mark</span>
                          <span className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">{a.dueDate}</span>
                       </div>
                    </div>
                    <Badge variant="outline" className="rounded-[1.5rem] px-8 py-3.5 font-black uppercase text-[11px] tracking-[0.2em] border-slate-100 text-slate-300 group-hover:border-emerald-200 group-hover:text-emerald-600 group-hover:bg-emerald-50/50 transition-all duration-700 shadow-sm">
                       ACTIVE GRID
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}