import React, { useState } from "react";
import { Student, StudentGrade } from "@/types/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, Save, Edit2, X, ClipboardList, Sparkles, CheckCircle2, RefreshCcw, LayoutGrid, ShieldCheck, Zap } from "lucide-react";
import { useSchool } from "@/context/SchoolContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradebookProps {
  students: Student[];
}

export function Gradebook({ students }: GradebookProps) {
  const { grades, updateGrade } = useSchool();
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<StudentGrade>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isBulkMode, setIsBulkMode] = useState(false);

  const handleEdit = (studentId: string) => {
    const existing = grades.find(g => g.studentId === studentId && g.subject === selectedSubject) || {
      studentId, subject: selectedSubject, classScore: 0, homeworkScore: 0, examScore: 0, totalMark: 0, grade: "-", remarks: ""
    };
    setEditingId(studentId);
    setEditValues(existing);
  };

  const handleSave = () => {
    if (editingId && editValues) {
      const total = (Number(editValues.classScore) || 0) + (Number(editValues.homeworkScore) || 0) + (Number(editValues.examScore) || 0);
      let grade = "F";
      if (total >= 90) grade = "A+";
      else if (total >= 80) grade = "A";
      else if (total >= 70) grade = "B";
      else if (total >= 60) grade = "C";
      
      updateGrade(editingId, selectedSubject, { ...editValues, totalMark: total, grade });
      setEditingId(null);
      toast.success("Scholar academic registry synchronized!", { icon: <ShieldCheck className="text-emerald-500" /> });
    }
  };

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-16 animate-in fade-in duration-1000 pb-40">
      {/* Hyper-Vibrant Registry Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-12 bg-white p-16 rounded-[5rem] border-2 border-emerald-100 shadow-[0_80px_160px_-40px_rgba(5,150,105,0.1)] relative overflow-hidden group">
        <div className="absolute -right-32 -bottom-32 opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-[3000ms]">
           <ClipboardList className="w-[40rem] h-[40rem] text-emerald-600" />
        </div>
        <div className="flex items-center gap-12 relative z-10">
          <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-2xl shadow-emerald-200 group-hover:rotate-12 transition-all duration-700">
            <ClipboardList className="w-14 h-14" />
          </div>
          <div className="space-y-3">
            <h2 className="text-6xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Registry <span className="text-emerald-600 not-italic">Node</span></h2>
            <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em] italic leading-none">Institutional academic performance vault protocol</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-8 relative z-10">
          <div className="bg-slate-50 p-2 rounded-[2.5rem] flex items-center shadow-inner border border-slate-100">
            <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className="bg-transparent border-none rounded-[1.8rem] h-16 px-10 font-black uppercase text-[12px] tracking-widest focus:ring-0 transition-all cursor-pointer text-emerald-600">
              <option>Mathematics</option>
              <option>Applied Science</option>
              <option>English Literature</option>
              <option>Theoretical Physics</option>
            </select>
          </div>
          <Button variant="outline" className="rounded-[2.5rem] h-20 font-black uppercase tracking-widest text-xs px-12 border-slate-100 bg-white hover:bg-emerald-50 shadow-2xl transition-all hover:-translate-y-2 group/exp">
            <Download className="w-6 h-6 mr-4 text-emerald-500 group-hover:translate-y-1 transition-transform" /> Export Registry
          </Button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-center gap-10">
        <div className="relative flex-1 group w-full">
           <Search className="absolute left-10 top-1/2 -translate-y-1/2 w-7 h-7 text-slate-300 group-focus-within:text-emerald-600 transition-all duration-500" />
           <Input 
            placeholder="Query institutional scholar database protocol..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            className="pl-24 h-24 rounded-[4rem] bg-white border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] font-black uppercase text-sm tracking-widest italic focus-visible:ring-emerald-600/10 shadow-inner"
           />
        </div>
        <div className="flex gap-6 w-full xl:w-auto">
           <Button onClick={() => setIsBulkMode(!isBulkMode)} className={cn("flex-1 xl:flex-none px-12 h-24 rounded-[3rem] font-black uppercase text-xs tracking-widest shadow-2xl transition-all hover:-translate-y-2 group/bulk", isBulkMode ? "bg-emerald-600 text-white" : "bg-slate-900 text-white")}>
              <Zap className={cn("w-6 h-6 mr-4 transition-transform group-hover/bulk:scale-125", isBulkMode ? "text-emerald-300 animate-pulse" : "text-emerald-400")} /> 
              {isBulkMode ? "Active Bulk Synthesis" : "Initialize Bulk Protocol"}
           </Button>
        </div>
      </div>

      <Card className="border-none shadow-[0_120px_240px_-60px_rgba(0,0,0,0.2)] rounded-[6rem] overflow-hidden bg-white group border border-slate-50">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/20">
                <TableRow className="h-32 border-b-4 border-slate-50/50">
                  <TableHead className="px-20 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Scholar Identity Artifact</TableHead>
                  <TableHead className="text-center font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Registry (30%)</TableHead>
                  <TableHead className="text-center font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Project (20%)</TableHead>
                  <TableHead className="text-center font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Final (50%)</TableHead>
                  <TableHead className="text-center font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Cumulative</TableHead>
                  <TableHead className="text-center font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Credential</TableHead>
                  <th className="px-20 text-right font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Decision Grid</th>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filteredStudents.map((student) => {
                    const g = grades.find(x => x.studentId === student.id && x.subject === selectedSubject) || { totalMark: 0, grade: "-", classScore: 0, homeworkScore: 0, examScore: 0, remarks: "" };
                    const isEditing = editingId === student.id || isBulkMode;

                    return (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={student.id} 
                        className="h-40 hover:bg-emerald-50/30 transition-all group border-slate-50"
                      >
                        <TableCell className="px-20">
                          <div className="flex items-center gap-10">
                             <div className="w-20 h-20 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center text-emerald-600 font-black text-4xl group-hover:rotate-12 group-hover:scale-110 transition-all border border-slate-50 shadow-emerald-50">{student.name[0]}</div>
                             <div className="flex flex-col">
                                <span className="font-black uppercase tracking-tighter text-slate-900 italic text-3xl leading-none group-hover:text-emerald-600 transition-colors duration-500">{student.name}</span>
                                <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] mt-4 italic">PROTOCOL: {student.rollNumber}</span>
                             </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {isEditing ? <Input type="number" value={editingId === student.id ? editValues.classScore : g.classScore} onChange={e => editingId === student.id ? setEditValues({ ...editValues, classScore: parseInt(e.target.value) || 0 }) : null} className="w-28 h-20 rounded-[2rem] bg-slate-50 border-none font-black italic text-center text-3xl mx-auto shadow-inner focus-visible:ring-emerald-600/20" /> : <span className="text-3xl font-black italic text-slate-400 group-hover:text-slate-600 transition-colors">{g.classScore || 0}</span>}
                        </TableCell>
                        <TableCell className="text-center">
                          {isEditing ? <Input type="number" value={editingId === student.id ? editValues.homeworkScore : g.homeworkScore} onChange={e => editingId === student.id ? setEditValues({ ...editValues, homeworkScore: parseInt(e.target.value) || 0 }) : null} className="w-28 h-20 rounded-[2rem] bg-slate-50 border-none font-black italic text-center text-3xl mx-auto shadow-inner focus-visible:ring-emerald-600/20" /> : <span className="text-3xl font-black italic text-slate-400 group-hover:text-slate-600 transition-colors">{g.homeworkScore || 0}</span>}
                        </TableCell>
                        <TableCell className="text-center">
                          {isEditing ? <Input type="number" value={editingId === student.id ? editValues.examScore : g.examScore} onChange={e => editingId === student.id ? setEditValues({ ...editValues, examScore: parseInt(e.target.value) || 0 }) : null} className="w-28 h-20 rounded-[2rem] bg-slate-50 border-none font-black italic text-center text-3xl mx-auto shadow-inner focus-visible:ring-emerald-600/20" /> : <span className="text-3xl font-black italic text-slate-400 group-hover:text-slate-600 transition-colors">{g.examScore || 0}</span>}
                        </TableCell>
                        <TableCell className="text-center">
                           <span className="text-6xl font-black text-emerald-600 italic tracking-tighter leading-none group-hover:scale-110 transition-transform inline-block">{editingId === student.id ? ((editValues.classScore||0)+(editValues.homeworkScore||0)+(editValues.examScore||0)) : g.totalMark}%</span>
                        </TableCell>
                        <TableCell className="text-center">
                           <Badge className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[12px] shadow-2xl group-hover:rotate-6 transition-all border-none">{g.grade}</Badge>
                        </TableCell>
                        <TableCell className="px-20 text-right">
                          {editingId === student.id ? (
                            <div className="flex justify-end gap-6">
                              <Button size="icon" variant="ghost" className="h-18 w-18 rounded-[1.5rem] bg-emerald-600 text-white shadow-2xl shadow-emerald-200 hover:scale-110 transition-transform" onClick={handleSave}><Save className="w-8 h-8" /></Button>
                              <Button size="icon" variant="ghost" className="h-18 w-18 rounded-[1.5rem] bg-white text-slate-400 shadow-2xl hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100" onClick={() => setEditingId(null)}><X className="w-8 h-8" /></Button>
                            </div>
                          ) : (
                            <Button size="icon" variant="ghost" className="h-20 w-20 rounded-[2.5rem] bg-white shadow-2xl border border-slate-100 hover:text-emerald-600 hover:scale-110 transition-all group-hover:shadow-emerald-100 opacity-0 group-hover:opacity-100 transform translate-x-10 group-hover:translate-x-0" onClick={() => handleEdit(student.id)}><Edit2 className="w-8 h-8" /></Button>
                          )}
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Hyper-Vibrant Sync Footer */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-600 to-teal-500 rounded-[5rem] p-24 border-b-8 border-white/20 flex flex-col xl:flex-row items-center justify-between gap-16 group/footer shadow-[0_100px_200px_-50px_rgba(5,150,105,0.4)] relative overflow-hidden">
         <div className="absolute -left-32 -top-32 w-80 h-80 bg-white/10 rounded-full group-hover/footer:scale-150 transition-all duration-1000" />
         <div className="space-y-6 relative z-10">
            <h3 className="text-6xl font-black uppercase tracking-tighter italic text-white leading-none">Synchronize Academic Grid</h3>
            <p className="text-[13px] font-black text-emerald-100/60 uppercase tracking-[0.4em] italic mt-8 leading-none">Institutional academic integrity compliance protocol activated</p>
         </div>
         <Button className="bg-white text-emerald-900 hover:bg-emerald-50 rounded-[3rem] h-32 px-24 font-black uppercase tracking-[0.2em] text-sm shadow-[0_40px_80px_-20px_rgba(255,255,255,0.4)] transition-all hover:-translate-y-4 group-hover/footer:rotate-2">
            <RefreshCcw className="w-10 h-10 mr-6 text-emerald-600 animate-spin-slow" /> Commit All Registry Artifacts
         </Button>
      </div>
    </div>
  );
}