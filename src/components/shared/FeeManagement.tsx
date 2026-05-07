import React, { useState } from "react";
import { Users, BellRing, CheckCircle2, AlertCircle, Search, Edit3, Plus, ShieldCheck, GraduationCap, DollarSign, X, Save, RefreshCcw, Zap, ArrowRightLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StudentFeeRecord {
  id: string;
  name: string;
  className: string;
  totalFee: number;
  paidAmount: number;
  status: "Paid" | "Owing";
}

export const INITIAL_FEES: StudentFeeRecord[] = [
  { id: "s1", name: "Alice Johnson", className: "Grade 10A", totalFee: 1500, paidAmount: 1500, status: "Paid" },
  { id: "s2", name: "Bob Smith", className: "Grade 10A", totalFee: 1500, paidAmount: 800, status: "Owing" },
  { id: "s3", name: "Charlie Davis", className: "Grade 11B", totalFee: 1800, paidAmount: 1800, status: "Paid" },
  { id: "s4", name: "Diana Prince", className: "Grade 11B", totalFee: 1800, paidAmount: 0, status: "Owing" },
];

export function FeeManagement() {
  const [fees, setFees] = useState<StudentFeeRecord[]>(INITIAL_FEES);
  const [editingFee, setEditingFee] = useState<StudentFeeRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSendReminder = (studentName: string) => {
    toast.success(`Fiscal reminder broadcast to ${studentName}'s guardians!`, {
      icon: <BellRing className="w-8 h-8 text-amber-500" />,
      description: "Notification dispatched via institutional temporal channels protocol.",
    });
  };

  const handleUpdateFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFee) {
      const status: "Paid" | "Owing" = editingFee.paidAmount >= editingFee.totalFee ? "Paid" : "Owing";
      const updatedFee: StudentFeeRecord = { ...editingFee, status };
      
      if (fees.find(f => f.id === editingFee.id)) {
        setFees(fees.map(f => f.id === editingFee.id ? updatedFee : f));
        toast.success("Scholar fiscal profile synchronized!", { icon: <ShieldCheck className="text-emerald-400" /> });
      } else {
        setFees([...fees, { ...updatedFee, id: `s${Math.random().toString(36).substr(2, 5)}` }]);
        toast.success("New fiscal artifact initialized!", { icon: <Plus className="text-blue-400" /> });
      }
      setEditingFee(null);
    }
  };

  const groupedFees = fees.reduce((acc, student) => {
    if (!acc[student.className]) acc[student.className] = [];
    acc[student.className].push(student);
    return acc;
  }, {} as Record<string, StudentFeeRecord[]>);

  const totalPaid = fees.reduce((acc, f) => acc + f.paidAmount, 0);
  const totalOutstanding = fees.reduce((acc, f) => acc + (f.totalFee - f.paidAmount), 0);

  const filteredFees = (students: StudentFeeRecord[]) => 
    students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-20 animate-in fade-in duration-1000 pb-40">
      {/* Hyper-Vibrant Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 bg-white p-20 rounded-[6rem] shadow-[0_100px_200px_-50px_rgba(49,46,129,0.15)] border-2 border-indigo-50 relative overflow-hidden group">
        <div className="absolute -right-32 -bottom-32 opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-[3000ms]">
           <DollarSign className="w-[45rem] h-[45rem] text-indigo-600 -rotate-12" />
        </div>
        <div className="space-y-4 relative z-10">
          <h2 className="text-8xl font-black uppercase tracking-tighter italic text-slate-900 leading-none group-hover:text-indigo-600 transition-colors duration-500">Scholar <span className="text-indigo-600 not-italic">Registry</span></h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[13px] mt-8 italic leading-none">Consolidated fiscal standing & candidate analytics grid</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-12 relative z-10 bg-slate-50/70 backdrop-blur-3xl p-14 rounded-[4rem] border-2 border-white shadow-inner">
          <div className="text-right space-y-4">
             <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 italic leading-none">Aggregate Capital Sync</p>
             <div className="flex items-baseline justify-end gap-4">
                <p className="text-7xl font-black italic tracking-tighter text-emerald-600 leading-none group-hover:scale-110 transition-transform duration-500">GHS {totalPaid.toLocaleString()}</p>
             </div>
          </div>
          <div className="w-0.5 h-24 bg-slate-200 hidden sm:block" />
          <div className="text-right space-y-4">
             <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 italic leading-none">Institutional Debt Magnitude</p>
             <div className="flex items-baseline justify-end gap-4">
                <p className="text-7xl font-black italic tracking-tighter text-rose-600 leading-none group-hover:scale-110 transition-transform duration-500">GHS {totalOutstanding.toLocaleString()}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Controls - Claymorphism */}
      <div className="flex flex-col xl:flex-row items-center gap-12">
         <div className="relative group flex-1 w-full">
            <div className="absolute inset-0 bg-indigo-500/10 rounded-[4rem] blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <Search className="absolute left-10 top-1/2 -translate-y-1/2 w-10 h-10 text-slate-300 group-focus-within:text-indigo-600 transition-all duration-700" />
            <Input 
              placeholder="Query scholar designation or registry protocol ID..." 
              className="pl-28 h-28 rounded-[4rem] bg-white border-none shadow-[0_60px_120px_-30px_rgba(0,0,0,0.1)] font-black uppercase text-lg tracking-widest italic focus-visible:ring-indigo-600/10 px-16"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
         </div>
         <Button className="bg-slate-900 hover:bg-black text-white rounded-[3rem] h-28 px-20 font-black uppercase tracking-[0.2em] text-sm shadow-2xl transition-all hover:-translate-y-4 group/add w-full xl:w-auto">
           <Plus className="w-10 h-10 mr-6 text-indigo-400 group-hover:rotate-90 transition-transform" /> Initialize Artifact
         </Button>
      </div>

      {/* Class Groups - Dynamic & Colorful */}
      <div className="grid gap-32">
        {Object.entries(groupedFees).map(([className, classStudents]) => (
          <Card key={className} className="border-none shadow-[0_150px_300px_-80px_rgba(49,46,129,0.2)] rounded-[7rem] overflow-hidden bg-white group border border-slate-50">
            <CardHeader className="p-24 bg-slate-50/30 flex flex-col xl:flex-row items-center justify-between border-b-4 border-slate-100 group-hover:bg-indigo-50/10 transition-all duration-1000 gap-16">
              <div className="flex items-center gap-12">
                <div className="w-32 h-32 rounded-[3rem] bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-200 group-hover:rotate-12 group-hover:scale-110 transition-all duration-700">
                  <Users className="w-16 h-16" />
                </div>
                <div className="space-y-4">
                  <CardTitle className="text-7xl font-black uppercase tracking-tighter italic text-slate-900 leading-none group-hover:text-indigo-600 transition-colors duration-500">{className}</CardTitle>
                  <CardDescription className="font-black text-indigo-600 uppercase tracking-[0.4em] text-[13px] mt-6 italic">Institutional Academic Cohort Registry Node</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-6">
                 <Badge className="bg-white text-slate-900 px-16 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-[13px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-2 border-white group-hover:-rotate-2 transition-transform">
                   {classStudents.length} Candidates Synced
                 </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white h-36">
                    <tr className="border-b-4 border-slate-50/50">
                      <th className="px-24 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Scholar Protocol Identity</th>
                      <th className="px-10 font-black uppercase tracking-widest text-[12px] text-slate-400 text-center italic">Institutional Obligation</th>
                      <th className="px-10 font-black uppercase tracking-widest text-[12px] text-slate-400 text-center italic">Capital Synchronized</th>
                      <th className="px-10 font-black uppercase tracking-widest text-[12px] text-slate-400 text-center italic">Status Credential</th>
                      <th className="px-24 text-right font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Grid Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredFees(classStudents).map((student) => (
                      <tr key={student.id} className="h-44 hover:bg-slate-50 transition-all group/row border-slate-50">
                        <td className="px-24">
                           <div className="flex items-center gap-10">
                              <div className="w-20 h-20 rounded-[2rem] bg-white border-2 border-indigo-50 text-indigo-600 flex items-center justify-center font-black text-4xl shadow-xl group-hover/row:rotate-12 transition-all">{student.name[0]}</div>
                              <div className="space-y-3">
                                <span className="font-black uppercase tracking-tighter text-slate-900 text-4xl italic group-hover/row:text-indigo-600 transition-colors leading-none block">{student.name}</span>
                                <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest italic">PROTOCOL ID: {student.id.toUpperCase()}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-10 text-center">
                           <span className="text-3xl font-black italic tracking-tighter text-slate-400 leading-none group-hover/row:text-slate-600 transition-colors">GHS {student.totalFee.toLocaleString()}</span>
                        </td>
                        <td className="px-10 text-center">
                           <div className="flex items-center justify-center gap-4">
                              <span className="text-6xl font-black italic tracking-tighter text-emerald-600 leading-none group-hover/row:scale-110 transition-transform">GHS {student.paidAmount.toLocaleString()}</span>
                              <ArrowRightLeft className="w-6 h-6 text-slate-100 group-hover/row:text-emerald-200 transition-colors" />
                           </div>
                        </td>
                        <td className="px-10 text-center">
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "px-14 py-6 rounded-[2.5rem] uppercase text-[12px] font-black tracking-[0.2em] transition-all shadow-2xl border-none",
                              student.status === "Paid" ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-rose-500 text-white shadow-rose-200 animate-pulse"
                            )}
                          >
                            {student.status === "Paid" ? <CheckCircle2 className="w-6 h-6 mr-4" /> : <AlertCircle className="w-6 h-6 mr-4" />}
                            {student.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="px-24 text-right">
                          <div className="flex items-center justify-end gap-6 opacity-0 group-hover/row:opacity-100 transition-all transform translate-x-12 group-hover/row:translate-x-0">
                             <Button size="icon" variant="ghost" className="h-20 w-20 rounded-[2.2rem] bg-white shadow-2xl hover:bg-indigo-50 hover:text-indigo-600 border border-slate-100 transition-transform hover:scale-110" onClick={() => setEditingFee(student)}>
                               <Edit3 className="w-10 h-10" />
                             </Button>
                             {student.status === "Owing" && (
                              <Button size="icon" variant="ghost" className="h-20 w-20 rounded-[2.2rem] bg-white shadow-2xl hover:bg-amber-50 hover:text-amber-600 border border-slate-100 transition-transform hover:scale-110" onClick={() => handleSendReminder(student.name)}>
                                <BellRing className="w-10 h-10" />
                              </Button>
                             )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scholar Synthesis Modal */}
      <AnimatePresence>
        {editingFee && (
          <Dialog open={!!editingFee} onOpenChange={() => setEditingFee(null)}>
            <DialogContent className="rounded-[7rem] p-24 max-w-5xl bg-white border-none shadow-[0_200px_400px_-100px_rgba(0,0,0,0.6)]">
              <DialogHeader>
                <DialogTitle className="text-8xl font-black uppercase tracking-tighter italic leading-none">Scholar <span className="text-indigo-600">Synthesis</span></DialogTitle>
                <DialogDescription className="font-bold text-slate-400 uppercase tracking-[0.4em] text-[13px] mt-12 italic leading-none">Authorized institutional fiscal record reconciliation protocol</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdateFee} className="space-y-16 mt-24">
                <div className="grid grid-cols-2 gap-16">
                  <div className="space-y-6 col-span-2">
                    <Label className="text-[12px] font-black uppercase tracking-widest text-slate-400 ml-8 italic">Scholar Designation Identity Artifact (Full Identity)</Label>
                    <Input value={editingFee.name} onChange={e => setEditingFee({ ...editingFee, name: e.target.value })} className="h-28 rounded-[3.5rem] bg-slate-50 border-none font-black italic text-5xl focus:ring-4 focus:ring-indigo-600/10 shadow-inner px-16 text-blue-600" required />
                  </div>
                  <div className="space-y-6">
                    <Label className="text-[12px] font-black uppercase tracking-widest text-slate-400 ml-8 italic">Cohort Grid Allocation</Label>
                    <Input value={editingFee.className} onChange={e => setEditingFee({ ...editingFee, className: e.target.value })} className="h-24 rounded-[2.5rem] bg-slate-50 border-none font-black uppercase tracking-[0.2em] text-2xl px-12 shadow-inner" required />
                  </div>
                  <div className="space-y-6">
                    <Label className="text-[12px] font-black uppercase tracking-widest text-slate-400 ml-8 italic">Institutional Obligation Magnitude (GHS)</Label>
                    <Input type="number" value={editingFee.totalFee} onChange={e => setEditingFee({ ...editingFee, totalFee: Number(e.target.value) })} className="h-24 rounded-[2.5rem] bg-slate-50 border-none font-black italic text-5xl px-12 shadow-inner" required />
                  </div>
                  <div className="space-y-6">
                    <Label className="text-[12px] font-black uppercase tracking-widest text-slate-400 ml-8 italic">Capital Synchronized Magnitude (GHS)</Label>
                    <Input type="number" value={editingFee.paidAmount} onChange={e => setEditingFee({ ...editingFee, paidAmount: Number(e.target.value) })} className="h-24 rounded-[2.5rem] bg-emerald-50 border-none font-black italic text-5xl px-12 shadow-inner text-emerald-600" required />
                  </div>
                </div>
                <Button type="submit" className="w-full h-36 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[4rem] font-black uppercase tracking-[0.3em] text-sm shadow-[0_50px_100px_-30px_rgba(49,46,129,0.5)] transition-all hover:-translate-y-4 mt-12">
                   <RefreshCcw className="w-12 h-12 mr-8 text-indigo-200 animate-spin-slow" /> Synchronize Scholar Profile Grid
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}