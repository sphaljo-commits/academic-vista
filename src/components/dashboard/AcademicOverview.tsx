import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BarChart3, TrendingUp, Edit3, Save, Sparkles, Target, Zap, RefreshCcw } from "lucide-react";
import { AIInsightCard } from "@/components/shared/AIInsights";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const INITIAL_TERM_DATA = {
  term1: [
    { subject: "Mathematics", score: 88, grade: "A", remarks: "Solid conceptual foundation" },
    { subject: "English Language", score: 82, grade: "B+", remarks: "Dynamic linguistic participation" },
    { subject: "Physics", score: 84, grade: "B+", remarks: "Consistent temporal effort" },
    { subject: "Chemistry", score: 75, grade: "B", remarks: "Improved laboratory protocol" },
    { subject: "Biology", score: 90, grade: "A", remarks: "Exceptional structural understanding" },
  ],
  term2: [
    { subject: "Mathematics", score: 92, grade: "A", remarks: "Advanced algorithmic problem solving" },
    { subject: "English Language", score: 85, grade: "B+", remarks: "Lexical growth optimized" },
    { subject: "Physics", score: 88, grade: "A-", remarks: "High-tier temporal performance" },
    { subject: "Chemistry", score: 78, grade: "B", remarks: "Laboratory focus synchronized" },
    { subject: "Biology", score: 95, grade: "A+", remarks: "Phenomenal cycle results" },
  ]
};

export const AcademicOverview = () => {
  const [selectedTerm, setSelectedTerm] = useState<string>("term2");
  const [termData, setTermData] = useState<any>(INITIAL_TERM_DATA);
  const [isEditing, setIsEditing] = useState(false);
  
  const performance = termData[selectedTerm as keyof typeof termData] || termData.term2;
  const average = Math.round(performance.reduce((acc: number, s: any) => acc + s.score, 0) / performance.length);

  const handleUpdateScore = (idx: number, newScore: number) => {
    const newData = { ...termData };
    const termKey = selectedTerm as keyof typeof termData;
    newData[termKey][idx].score = newScore;
    
    if (newScore >= 90) newData[termKey][idx].grade = "A+";
    else if (newScore >= 80) newData[termKey][idx].grade = "A";
    else if (newScore >= 70) newData[termKey][idx].grade = "B";
    else newData[termKey][idx].grade = "C";
    
    setTermData(newData);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Scholar academic matrix synchronized!");
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-white p-14 rounded-[4.5rem] shadow-2xl shadow-indigo-100/50 border border-slate-50 relative overflow-hidden group">
        <div className="absolute -right-20 -bottom-20 opacity-5 group-hover:scale-110 transition-transform duration-1000">
           <Target className="w-96 h-96 text-indigo-600 rotate-12" />
        </div>
        <div className="flex items-center gap-10 relative z-10">
           <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200 group-hover:rotate-12 transition-transform">
             <BarChart3 className="w-12 h-12" />
           </div>
           <div className="space-y-2">
             <h2 className="text-6xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Academic <span className="text-indigo-600 not-italic">Analytics</span></h2>
             <p className="text-[12px] font-black uppercase tracking-widest text-slate-400 italic">Temporal Performance trajectory monitor protocol</p>
           </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
          <Tabs value={selectedTerm} onValueChange={setSelectedTerm} className="w-auto">
            <TabsList className="bg-slate-100 p-2.5 rounded-[3rem] h-24 border border-slate-200 shadow-inner">
              <TabsTrigger value="term1" className="rounded-[2.2rem] px-14 h-full font-black uppercase text-[12px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-2xl transition-all">Temporal Cycle I</TabsTrigger>
              <TabsTrigger value="term2" className="rounded-[2.2rem] px-14 h-full font-black uppercase text-[12px] tracking-widest data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-2xl transition-all">Temporal Cycle II</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant={isEditing ? "default" : "outline"} className={cn("rounded-[2.5rem] h-24 px-14 font-black uppercase tracking-widest text-sm transition-all", isEditing ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xl shadow-indigo-100 hover:-translate-y-2" : "border-slate-200 bg-white hover:bg-slate-50 shadow-2xl hover:-translate-y-1")} onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
            {isEditing ? <><Save className="w-7 h-7 mr-5 text-indigo-300" /> Synchronize Matrix</> : <><Edit3 className="w-7 h-7 mr-5 text-indigo-600" /> Modify Performance</>}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
         <Card className="border-none bg-slate-900 text-white col-span-1 rounded-[5rem] shadow-2xl shadow-slate-900/40 p-16 relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 opacity-10 group-hover:scale-150 transition-transform duration-1000">
               <TrendingUp className="w-80 h-80" />
            </div>
            <CardHeader className="p-0 pb-12 relative z-10">
               <CardTitle className="text-[12px] font-black uppercase tracking-[0.5em] text-indigo-300 italic">Weighted Average Index</CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative z-10 space-y-10">
               <div className="flex items-baseline gap-8">
                  <span className="text-9xl font-black italic tracking-tighter text-white leading-none">{average}%</span>
                  <div className="w-20 h-20 rounded-[2rem] bg-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-2xl shadow-emerald-500/10 group-hover:rotate-12 transition-transform">
                    <TrendingUp className="w-12 h-12" />
                  </div>
               </div>
               <div className="flex flex-col gap-6">
                  <p className="text-[11px] font-black text-indigo-200 uppercase tracking-widest italic bg-white/5 w-fit px-8 py-4 rounded-3xl border border-white/10">+4.2% Variance vs Previous Cycle</p>
                  <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
                     <motion.div initial={{ width: 0 }} animate={{ width: `${average}%` }} className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
                  </div>
               </div>
            </CardContent>
         </Card>
         <div className="md:col-span-2 space-y-12">
            <AIInsightCard 
              title="Predictive Scholar Trend Artifact"
              content={`Consolidated performance in ${selectedTerm === 'term2' ? 'Temporal Hub II' : 'Temporal Hub I'} exhibits a strong upward trajectory in STEM disciplines. Cognitive engagement has expanded by 12%.`}
              type="academic"
              priority="high"
            />
            <div className="grid grid-cols-2 gap-10">
               <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-100 border border-slate-50 flex items-center gap-8 group hover:bg-indigo-50/20 transition-all">
                  <div className="w-20 h-20 rounded-[2rem] bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-xl">
                     <Sparkles className="w-10 h-10" />
                  </div>
                  <div>
                     <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic mb-2">Synaptic Growth</p>
                     <p className="text-3xl font-black italic text-slate-900 leading-none">94% Optimized</p>
                  </div>
               </div>
               <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-slate-100 border border-slate-50 flex items-center gap-8 group hover:bg-emerald-50/20 transition-all">
                  <div className="w-20 h-20 rounded-[2rem] bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-xl">
                     <Zap className="w-10 h-10" />
                  </div>
                  <div>
                     <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic mb-2">Cycle Velocity</p>
                     <p className="text-3xl font-black italic text-slate-900 leading-none">High Magnitude</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <Card className="border-none shadow-[0_100px_200px_-50px_rgba(0,0,0,0.2)] rounded-[5rem] overflow-hidden bg-white group">
        <CardHeader className="p-20 border-b border-slate-50 bg-slate-50/30 group-hover:bg-indigo-50/20 transition-all duration-700">
          <div className="flex items-center gap-12">
             <div className="w-28 h-28 rounded-[2.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-200 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-6">
               <GraduationCap className="w-16 h-16" />
             </div>
             <div>
                <CardTitle className="text-5xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Subject Proficiency Matrix</CardTitle>
                <CardDescription className="text-slate-400 font-black uppercase tracking-widest text-[12px] mt-6 italic">Encrypted breakdown of temporal score distributions & evaluator remarks protocol</CardDescription>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-white">
                <TableRow className="h-28 border-slate-100">
                  <TableHead className="px-20 font-black uppercase tracking-widest text-[12px] text-slate-400">Specialization Area</TableHead>
                  <TableHead className="text-center font-black uppercase tracking-widest text-[12px] text-slate-400">Composite Index</TableHead>
                  <TableHead className="text-center font-black uppercase tracking-widest text-[12px] text-slate-400">Institutional Grade</TableHead>
                  <th className="px-20 font-black uppercase tracking-widest text-[12px] text-slate-400">Evaluator Sentiment Artifact</th>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performance.map((row: any, idx: number) => (
                  <TableRow key={row.subject} className="h-36 hover:bg-indigo-50/40 transition-all border-slate-50 group/row">
                    <TableCell className="px-20 font-black uppercase tracking-tight text-slate-900 italic text-3xl leading-none group-hover/row:text-indigo-600 transition-colors">{row.subject}</TableCell>
                    <TableCell className="text-center">
                      {isEditing ? (
                        <Input 
                          type="number" 
                          value={row.score} 
                          onChange={e => handleUpdateScore(idx, Number(e.target.value))}
                          className="w-32 h-20 rounded-[2rem] bg-slate-50 border-none font-black italic text-center text-4xl text-indigo-600 shadow-inner mx-auto focus-visible:ring-indigo-600/20"
                        />
                      ) : (
                        <span className={cn(
                          "inline-flex items-center justify-center w-24 h-24 rounded-[2.2rem] font-black italic text-4xl shadow-2xl transition-all tracking-tighter",
                          row.score >= 90 ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-white text-slate-900 shadow-slate-100 border border-slate-50"
                        )}>
                          {row.score}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="px-10 py-5 rounded-[1.8rem] font-black text-sm border-slate-200 shadow-2xl bg-white text-slate-900 group-hover/row:scale-110 transition-transform uppercase tracking-widest">{row.grade}</Badge>
                    </TableCell>
                    <TableCell className="px-20">
                       {isEditing ? (
                         <Textarea 
                           value={row.remarks} 
                           onChange={e => {
                             const newData = { ...termData };
                             newData[selectedTerm as keyof typeof termData][idx].remarks = e.target.value;
                             setTermData(newData);
                           }}
                           className="h-24 rounded-[1.8rem] bg-slate-50 border-none font-bold italic shadow-inner px-8 py-6 text-base focus-visible:ring-indigo-600/20 leading-relaxed"
                         />
                       ) : (
                         <p className="text-xl font-bold text-slate-400 leading-relaxed italic group-hover/row:text-slate-800 transition-all">
                           "{row.remarks}"
                         </p>
                       )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <div className="bg-slate-50/50 p-16 text-center border-t border-slate-100">
           <Button variant="link" className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 hover:text-indigo-600 hover:no-underline transition-all hover:scale-105">
             <RefreshCcw className="w-5 h-5 mr-4 animate-spin-slow" /> Synchronize Academic Roster Portfolio
           </Button>
        </div>
      </Card>
    </div>
  );
};