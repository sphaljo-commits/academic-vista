import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, X, Clock, Calendar as CalendarIcon, Filter, Activity, Sparkles, RefreshCcw, ShieldCheck, Search } from "lucide-react";
import { toast } from "sonner";
import { Student, AttendanceRecord } from "@/types/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AttendanceTrackerProps {
  students: Student[];
  role: "admin" | "teacher";
  classId?: string;
}

export function AttendanceTracker({ students, role, classId }: AttendanceTrackerProps) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedClass, setSelectedClass] = useState(classId || "all");
  const [attendance, setAttendance] = useState<Record<string, "present" | "absent" | "late">>({});
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(s => 
    (selectedClass === "all" || s.classId === selectedClass) &&
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMark = (studentId: string, status: "present" | "absent" | "late") => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const saveAttendance = () => {
    toast.success(`Attendance artifact for ${date} has been synchronized successfully!`, {
       icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
       description: "Registry committed to institutional temporal hub."
    });
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-32">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 bg-white p-14 rounded-[4.5rem] border border-slate-50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden group">
        <div className="absolute -right-20 -bottom-20 opacity-5 group-hover:scale-110 transition-transform duration-1000">
           <Activity className="w-96 h-96 text-emerald-600 rotate-12" />
        </div>
        <div className="space-y-2 relative z-10">
          <h2 className="text-6xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Pulse <span className="text-emerald-600 not-italic">Verification</span></h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mt-4 italic">Daily institutional scholar register & temporal participation protocol</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-[1.8rem] border border-slate-100 shadow-inner group/date">
            <CalendarIcon className="w-6 h-6 text-emerald-600 group-hover/date:rotate-12 transition-transform" />
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent outline-none font-black uppercase text-[12px] tracking-widest cursor-pointer"
            />
          </div>
          {role === "admin" && (
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="h-18 w-72 rounded-[1.5rem] bg-slate-50 border-none font-black uppercase text-[11px] tracking-widest shadow-inner focus:ring-2 focus:ring-emerald-600/20 transition-all">
                <SelectValue placeholder="Select Registry" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all" className="font-black">GLOBAL REGISTRY</SelectItem>
                <SelectItem value="c1" className="font-black">PRIMARY 1A HUB</SelectItem>
                <SelectItem value="c2" className="font-black">PRIMARY 2B HUB</SelectItem>
                <SelectItem value="c3" className="font-black">SECONDARY 1 ALPHA</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
         <div className="relative group flex-1 w-full">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
            <Input 
              placeholder="Query scholar designation or registry ID protocol..." 
              className="pl-20 h-24 rounded-[3.5rem] bg-white border-none shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] font-black uppercase text-[14px] tracking-widest italic focus-visible:ring-emerald-600/20 px-12"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="bg-slate-900 text-white px-14 h-24 rounded-[3.5rem] flex items-center gap-8 shadow-2xl relative overflow-hidden group/pulse">
            <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover/pulse:opacity-100 transition-opacity" />
            <Activity className="w-10 h-10 text-emerald-400 animate-pulse relative z-10" />
            <div className="flex flex-col relative z-10">
               <span className="text-[12px] font-black uppercase tracking-widest leading-none">Pulse Target</span>
               <span className="text-4xl font-black italic tracking-tighter leading-none mt-2">{filteredStudents.length} <span className="text-[10px] uppercase text-slate-500 not-italic tracking-widest">ARTIFACTS</span></span>
            </div>
         </div>
      </div>

      <Card className="border-none shadow-[0_100px_200px_-50px_rgba(0,0,0,0.2)] rounded-[5rem] overflow-hidden bg-white group">
        <CardHeader className="p-20 bg-slate-50/30 flex flex-col md:flex-row items-center justify-between border-b border-slate-50 group-hover:bg-emerald-50/10 transition-all duration-700">
          <div className="flex items-center gap-10">
            <div className="w-24 h-24 rounded-[2.5rem] bg-emerald-600 flex items-center justify-center text-white shadow-2xl group-hover:rotate-12 transition-transform">
              <CalendarIcon className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-5xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Daily Register</CardTitle>
              <CardDescription className="font-black text-emerald-600 uppercase tracking-widest text-[12px] mt-4 italic">Temporal Cycle Mark: {date}</CardDescription>
            </div>
          </div>
          <div className="flex gap-6 items-center bg-white px-12 py-6 rounded-[2.5rem] shadow-2xl border border-slate-100">
             <div className="text-center">
                <p className="text-4xl font-black italic tracking-tighter text-slate-900">{Object.values(attendance).filter(v => v === 'present').length}</p>
                <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Verified</p>
             </div>
             <div className="w-px h-10 bg-slate-100" />
             <div className="text-center">
                <p className="text-4xl font-black italic tracking-tighter text-slate-900">{Object.values(attendance).filter(v => v === 'absent').length}</p>
                <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Absence</p>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white h-28">
              <TableRow className="border-slate-100">
                <th className="px-20 font-black uppercase tracking-widest text-[11px] text-slate-400">Scholar Protocol ID</th>
                <th className="px-10 font-black uppercase tracking-widest text-[11px] text-slate-400">Designation</th>
                <th className="px-10 font-black uppercase tracking-widest text-[11px] text-slate-400">Registry Hub</th>
                <th className="px-10 text-center font-black uppercase tracking-widest text-[11px] text-slate-400">Pulse Status</th>
                <th className="px-20 text-right font-black uppercase tracking-widest text-[11px] text-slate-400">Decision Grid</th>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-80 text-center">
                    <div className="flex flex-col items-center gap-8 text-slate-200">
                       <Filter className="w-32 h-32 opacity-10" />
                       <p className="font-black uppercase tracking-[0.5em] text-sm">Zero scholars synchronized in this sector</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id} className="h-36 hover:bg-emerald-50/20 transition-all border-slate-50 group/row border-b last:border-none">
                    <TableCell className="px-20">
                       <span className="font-black text-slate-400 text-xl tracking-tighter italic bg-slate-50 px-6 py-3 rounded-2xl shadow-inner">{student.rollNumber}</span>
                    </TableCell>
                    <TableCell className="px-10">
                      <div className="flex items-center gap-8">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-2xl group-hover/row:bg-emerald-600 group-hover/row:text-white transition-all shadow-sm">{student.name[0]}</div>
                        <span className="font-black uppercase tracking-tight text-slate-900 text-2xl italic group-hover/row:text-emerald-600 transition-colors leading-none">{student.name}</span>
                      </div>
                    </TableCell>
                    <td className="px-10 font-black text-lg italic text-slate-400 uppercase">{student.classId.toUpperCase()} Protocol</td>
                    <td className="px-10 text-center">
                      {attendance[student.id] ? (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                          <Badge className={cn(
                            "px-10 py-4 rounded-[1.8rem] uppercase text-[11px] font-black tracking-[0.3em] shadow-2xl border-none",
                            attendance[student.id] === "present" ? "bg-emerald-500 text-white shadow-emerald-200" :
                            attendance[student.id] === "absent" ? "bg-rose-500 text-white shadow-rose-200" : "bg-amber-500 text-white shadow-amber-200"
                          )}>
                            {attendance[student.id].toUpperCase()}
                          </Badge>
                        </motion.div>
                      ) : (
                        <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest italic">PENDING VERIFICATION</span>
                      )}
                    </td>
                    <td className="px-20 text-right">
                      <div className="flex justify-end gap-3">
                        <Button 
                          size="icon" 
                          variant={attendance[student.id] === "present" ? "default" : "outline"}
                          className={cn(
                            "h-16 w-16 rounded-[1.5rem] shadow-2xl transition-all hover:scale-110 group/btn",
                            attendance[student.id] === "present" ? "bg-emerald-600 text-white" : "bg-white border-slate-100 text-emerald-600 hover:bg-emerald-50"
                          )}
                          onClick={() => handleMark(student.id, "present")}
                        >
                          <Check className="w-7 h-7 group-hover/btn:rotate-12 transition-transform" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant={attendance[student.id] === "late" ? "default" : "outline"}
                          className={cn(
                            "h-16 w-16 rounded-[1.5rem] shadow-2xl transition-all hover:scale-110 group/btn",
                            attendance[student.id] === "late" ? "bg-amber-600 text-white" : "bg-white border-slate-100 text-amber-600 hover:bg-amber-50"
                          )}
                          onClick={() => handleMark(student.id, "late")}
                        >
                          <Clock className="w-7 h-7 group-hover/btn:rotate-12 transition-transform" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant={attendance[student.id] === "absent" ? "default" : "outline"}
                          className={cn(
                            "h-16 w-16 rounded-[1.5rem] shadow-2xl transition-all hover:scale-110 group/btn",
                            attendance[student.id] === "absent" ? "bg-rose-600 text-white" : "bg-white border-slate-100 text-rose-600 hover:bg-rose-50"
                          )}
                          onClick={() => handleMark(student.id, "absent")}
                        >
                          <X className="w-7 h-7 group-hover/btn:rotate-12 transition-transform" />
                        </Button>
                      </div>
                    </td>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="bg-slate-900 rounded-[4rem] p-16 flex flex-col md:flex-row items-center justify-between gap-12 group shadow-2xl">
         <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Sparkles className="w-8 h-8 text-emerald-400 animate-pulse" />
              <h3 className="text-4xl font-black uppercase tracking-tighter italic text-white">Commit Synthesis</h3>
            </div>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Synchronizing all marked pulse artifacts to institutional cloud storage</p>
         </div>
         <div className="flex gap-6">
            <Button variant="outline" className="rounded-[1.8rem] h-24 px-12 border-white/10 bg-white/5 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
               Reset All Modalities
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-[1.8rem] h-24 px-16 font-black uppercase tracking-widest text-sm shadow-2xl transition-all hover:-translate-y-3 group/sync" onClick={saveAttendance}>
               <RefreshCcw className="w-7 h-7 mr-5 text-emerald-300 animate-spin-slow group-hover/sync:rotate-180 transition-all" /> Synchronize Pulse Registry
            </Button>
         </div>
      </div>
    </div>
  );
}