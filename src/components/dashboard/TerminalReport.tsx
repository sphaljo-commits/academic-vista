import React, { useState } from "react";
import { Student, TerminalReport, StudentGrade, SchoolInfo } from "@/types/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, GraduationCap, User, Calendar, CheckCircle, School as SchoolIcon, Edit3, Save, X, RotateCcw, ShieldCheck, RefreshCcw, LayoutGrid, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalReportProps {
  student: Student;
  report: TerminalReport;
  school: SchoolInfo | null;
}

export function TerminalReportCard({ student, report: initialReport, school }: TerminalReportProps) {
  const [report, setReport] = useState(initialReport);
  const [isEditing, setIsEditing] = useState(false);

  const downloadReport = () => {
    window.print();
  };

  const calculateAverage = (grades: StudentGrade[]) => {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, g) => acc + g.totalMark, 0);
    return (sum / grades.length).toFixed(1);
  };

  const updateGrade = (idx: number, field: keyof StudentGrade, value: any) => {
    const newGrades = [...report.grades];
    newGrades[idx] = { ...newGrades[idx], [field]: value };
    
    if (field === 'classScore' || field === 'homeworkScore' || field === 'examScore') {
       const g = newGrades[idx];
       newGrades[idx].totalMark = (Number(g.classScore) || 0) + (Number(g.homeworkScore) || 0) + (Number(g.examScore) || 0);
       
       const total = newGrades[idx].totalMark;
       if (total >= 90) newGrades[idx].grade = "A+";
       else if (total >= 80) newGrades[idx].grade = "A";
       else if (total >= 70) newGrades[idx].grade = "B";
       else newGrades[idx].grade = "C";
    }

    setReport({ ...report, grades: newGrades });
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Terminal portfolio synchronized!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 bg-white p-16 rounded-[5rem] shadow-[0_100px_200px_-50px_rgba(0,0,0,0.2)] border border-slate-100 print:shadow-none print:border-none print:p-0 animate-in fade-in duration-1000">
      <div className="flex justify-between items-center print:hidden border-b border-slate-100 pb-12">
        <div className="flex items-center gap-6">
           <div className="p-5 bg-slate-900 rounded-[1.5rem] text-white shadow-2xl group-hover:rotate-12 transition-transform">
              <LayoutGrid className="w-8 h-8" />
           </div>
           <div className="space-y-1">
              <h2 className="text-4xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Terminal <span className="text-primary">Registry</span></h2>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Official institutional academic portfolio protocol</p>
           </div>
        </div>
        <div className="flex gap-6">
          <Button variant={isEditing ? "default" : "outline"} onClick={() => isEditing ? handleSave() : setIsEditing(true)} className={cn("rounded-[1.8rem] h-20 px-10 font-black uppercase text-xs tracking-widest transition-all shadow-2xl", isEditing ? "bg-primary hover:bg-primary/90 text-white" : "bg-white border-slate-100 hover:bg-slate-50")}>
            {isEditing ? <><RefreshCcw className="mr-4 h-6 w-6 animate-spin-slow text-indigo-300" /> Sync Logic</> : <><Edit3 className="mr-4 h-6 w-6" /> Modify Matrix</>}
          </Button>
          <Button onClick={downloadReport} className="bg-slate-900 hover:bg-black text-white rounded-[1.8rem] h-20 px-10 font-black uppercase tracking-widest text-xs shadow-2xl group/exp">
            <Download className="mr-4 h-6 w-6 text-emerald-400 group-hover/exp:translate-y-1 transition-transform" /> Export Artifact
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-6 border-b-8 border-primary/20 pb-16">
        <div className="flex justify-center mb-10">
          {school?.logo ? (
            <img src={school.logo} alt="School Logo" className="h-40 w-40 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]" />
          ) : (
            <div className="h-40 w-40 bg-primary flex items-center justify-center rounded-[3rem] text-white shadow-2xl shadow-primary/30 rotate-6 group hover:rotate-0 transition-transform">
              <SchoolIcon className="h-20 w-20" />
            </div>
          )}
        </div>
        <h1 className="text-7xl font-black uppercase text-slate-900 tracking-tighter italic leading-none">{school?.name || "Academic Portal"}
           <Sparkles className="inline-block ml-6 h-12 w-12 text-primary animate-pulse" />
        </h1>
        <p className="text-xl font-black text-slate-400 uppercase tracking-[0.4em] italic">{school?.address || "123 Academic Way, Education City Protocol"}</p>
        <div className="flex justify-center gap-10 mt-12">
          <Badge className="px-10 py-5 text-indigo-600 border-none bg-indigo-50 rounded-[1.8rem] font-black uppercase tracking-widest text-xs shadow-sm">CYCLE: {report.term}</Badge>
          <Badge className="px-10 py-5 text-emerald-600 border-none bg-emerald-50 rounded-[1.8rem] font-black uppercase tracking-widest text-xs shadow-sm">SESSION: {report.session}</Badge>
        </div>
      </div>

      {/* Student Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-50/50 p-12 rounded-[4rem] border border-slate-100 shadow-inner group">
        <div className="flex items-center gap-10">
          <div className="h-32 w-32 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center text-primary border-4 border-white group-hover:rotate-6 transition-transform">
            <User className="h-16 w-16" />
          </div>
          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Scholar Designation</p>
            <h3 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">{student.name}</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-12">
          <div className="space-y-2">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Registry Protocol</p>
            <p className="text-4xl font-black text-slate-800 italic leading-none">{student.rollNumber}</p>
          </div>
          <div className="space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Cycle Status</p>
            {isEditing ? (
              <select 
                value={report.promotionStatus} 
                onChange={e => setReport({...report, promotionStatus: e.target.value as any})} 
                className="w-full h-14 rounded-2xl bg-white border-none px-6 font-black text-sm uppercase shadow-inner focus:ring-2 focus:ring-primary/20"
              >
                <option value="promoted">PROMOTED</option>
                <option value="pending">PENDING</option>
                <option value="retained">RETAINED</option>
              </select>
            ) : (
              <Badge className={cn("px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl border-none", report.promotionStatus === 'promoted' ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-amber-500 text-white shadow-amber-200')}>
                {report.promotionStatus.toUpperCase()}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Academic Table */}
      <div className="space-y-10">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-6 text-primary">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-xl">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h4 className="font-black text-4xl uppercase tracking-tighter italic">Proficiency Matrix Protocol</h4>
           </div>
           <Badge className="bg-slate-100 text-slate-500 rounded-xl px-6 py-2.5 font-black uppercase text-[10px] border-none">Weights: 20/20/60</Badge>
        </div>
        <div className="border-none shadow-[0_60px_100px_-20px_rgba(0,0,0,0.1)] rounded-[4rem] overflow-hidden bg-white">
          <Table>
            <TableHeader className="bg-slate-50/50 h-24">
              <TableRow>
                <TableHead className="px-12 font-black uppercase tracking-widest text-[11px] text-slate-400">Specialization Hub</TableHead>
                <TableHead className="text-center font-black uppercase tracking-widest text-[11px] text-slate-400">REG (20%)</TableHead>
                <TableHead className="text-center font-black uppercase tracking-widest text-[11px] text-slate-400">PRO (20%)</TableHead>
                <TableHead className="text-center font-black uppercase tracking-widest text-[11px] text-slate-400">FIN (60%)</TableHead>
                <TableHead className="text-center font-black uppercase tracking-widest text-[11px] text-slate-400">Composite</TableHead>
                <TableHead className="text-center font-black uppercase tracking-widest text-[11px] text-slate-400">CRED</TableHead>
                <TableHead className="px-12 font-black uppercase tracking-widest text-[11px] text-slate-400">Narrative Observation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.grades.map((grade, idx) => (
                <TableRow key={idx} className="h-32 hover:bg-primary/5 transition-all border-slate-50 group/row">
                  <TableCell className="px-12 font-black uppercase tracking-tight text-slate-900 italic text-2xl leading-none group-hover/row:text-primary transition-colors">{grade.subject}</TableCell>
                  <TableCell className="text-center">
                    {isEditing ? <Input type="number" value={grade.classScore} onChange={e => updateGrade(idx, 'classScore', Number(e.target.value))} className="w-24 h-16 rounded-2xl bg-slate-100 border-none font-black text-center text-xl shadow-inner mx-auto focus:ring-2 focus:ring-primary/20" /> : <span className="text-2xl font-black text-slate-400">{grade.classScore}</span>}
                  </TableCell>
                  <TableCell className="text-center">
                    {isEditing ? <Input type="number" value={grade.homeworkScore} onChange={e => updateGrade(idx, 'homeworkScore', Number(e.target.value))} className="w-24 h-16 rounded-2xl bg-slate-100 border-none font-black text-center text-xl shadow-inner mx-auto focus:ring-2 focus:ring-primary/20" /> : <span className="text-2xl font-black text-slate-400">{grade.homeworkScore}</span>}
                  </TableCell>
                  <TableCell className="text-center">
                    {isEditing ? <Input type="number" value={grade.examScore} onChange={e => updateGrade(idx, 'examScore', Number(e.target.value))} className="w-24 h-16 rounded-2xl bg-slate-100 border-none font-black text-center text-xl shadow-inner mx-auto focus:ring-2 focus:ring-primary/20" /> : <span className="text-2xl font-black text-slate-400">{grade.examScore}</span>}
                  </TableCell>
                  <TableCell className="text-center font-black text-primary text-4xl italic tracking-tighter leading-none">{grade.totalMark}%</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="font-black uppercase text-[12px] border-slate-200 rounded-xl px-6 py-2.5 bg-white shadow-xl">{grade.grade}</Badge>
                  </TableCell>
                  <TableCell className="px-12">
                    {isEditing ? <Input value={grade.remarks} onChange={e => updateGrade(idx, 'remarks', e.target.value)} className="h-16 rounded-2xl bg-slate-100 border-none font-bold italic text-sm w-[20rem] px-6 shadow-inner" /> : <p className="text-lg font-bold italic text-slate-400 group-hover/row:text-slate-800 transition-colors">"{grade.remarks}"</p>}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-primary/5 h-28 border-none">
                <TableCell colSpan={4} className="text-right font-black uppercase tracking-[0.3em] text-[12px] text-primary">Weighted Average Aggregate Index:</TableCell>
                <TableCell className="text-center">
                   <span className="inline-flex items-center justify-center w-28 h-28 rounded-[2.5rem] bg-primary text-white font-black text-5xl italic tracking-tighter shadow-2xl shadow-primary/40 rotate-2">{calculateAverage(report.grades)}%</span>
                </TableCell>
                <TableCell colSpan={2}></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Behavioral & Narratives Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Card className="border-none bg-slate-50/80 rounded-[4rem] p-14 shadow-inner">
          <CardHeader className="p-0 pb-10">
            <CardTitle className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 italic">Behavioral Metadata Analytics</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            {[
              { label: 'Temporal Punctuality', key: 'punctuality' },
              { label: 'Visual Neatness Protocol', key: 'neatness' },
              { label: 'Social Engagement Politeness', key: 'politeness' },
              { label: 'Collective Cooperation Logic', key: 'cooperation' },
              { label: 'Operational Leadership Grid', key: 'leadership' }
            ].map(item => (
              <div key={item.key} className="flex justify-between items-center border-b border-slate-200/50 pb-5 last:border-none">
                <span className="text-slate-700 font-black uppercase tracking-tight text-[12px] italic">{item.label}</span>
                {isEditing ? (
                  <select 
                    value={(report.behavior as any)[item.key]} 
                    onChange={e => setReport({...report, behavior: { ...report.behavior, [item.key]: e.target.value }})} 
                    className="h-12 rounded-xl bg-white border-none px-4 font-black text-xs uppercase shadow-md focus:ring-2 focus:ring-primary/20"
                  >
                    {['Excellent', 'Good', 'Satisfactory', 'Needs Improvement'].map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                ) : (
                  <Badge className="font-black text-primary uppercase italic text-[11px] bg-white px-6 py-2 rounded-xl shadow-sm border-none">{(report.behavior as any)[item.key].toUpperCase()}</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none bg-slate-50/80 rounded-[4rem] p-14 shadow-inner">
          <CardHeader className="p-0 pb-10">
            <CardTitle className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 italic">Evaluator Narratives Synthesis</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-12">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Instructor Sentiment</p>
               </div>
               {isEditing ? <Textarea value={report.teacherRemark} onChange={e => setReport({...report, teacherRemark: e.target.value})} className="bg-white border-none rounded-[2rem] h-32 font-bold italic text-lg shadow-inner p-8 focus:ring-2 focus:ring-indigo-600/20 leading-relaxed" /> : <p className="italic text-slate-800 font-black text-2xl leading-relaxed tracking-tighter">"{report.teacherRemark}"</p>}
            </div>
            <div className="pt-12 border-t border-slate-200/50 space-y-4">
              <div className="flex items-center gap-3">
                 <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                 <p className="text-[10px] font-black text-primary uppercase tracking-widest">Administrative Verdict (Command)</p>
              </div>
              {isEditing ? <Textarea value={report.principalRemark} onChange={e => setReport({...report, principalRemark: e.target.value})} className="bg-white border-none rounded-[2rem] h-32 font-bold italic text-lg shadow-inner p-8 focus:ring-2 focus:ring-primary/20 leading-relaxed" /> : <p className="font-black text-primary uppercase italic text-2xl leading-relaxed tracking-tighter">{report.principalRemark}</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="pt-16 border-t-4 border-slate-100 flex flex-col md:flex-row justify-between items-end gap-10 pb-8">
        <div className="space-y-6">
          <div className="flex items-center gap-6 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary">
               <Calendar className="h-8 w-8" />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Cycle Resumption</p>
               <span className="font-black text-slate-900 text-2xl italic tracking-tight">{report.nextTermStart} Protocol</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <ShieldCheck className="w-5 h-5 text-emerald-500" />
             <p className="text-[9px] text-slate-300 font-black uppercase tracking-[0.4em]">Temporal Artifact Serial: TRX-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
        </div>
        <div className="text-center space-y-5">
          <div className="w-80 h-1.5 bg-slate-900 mx-auto rounded-full shadow-2xl" />
          <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-500 italic">Authorized Administrative Signature Protocol</p>
        </div>
      </div>
    </div>
  );
}