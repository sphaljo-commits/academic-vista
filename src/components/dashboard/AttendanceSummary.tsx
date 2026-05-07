import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Clock, Edit2, Save, X, RotateCcw, Activity, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface AttendanceSummaryProps {
  present: number;
  absent: number;
  late: number;
  total: number;
}

export const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({
  present: initialPresent,
  absent: initialAbsent,
  late: initialLate,
  total: initialTotal,
}) => {
  const [stats, setStats] = useState({
    present: initialPresent,
    absent: initialAbsent,
    late: initialLate,
    total: initialTotal
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState(stats);

  const percentage = Math.round((stats.present / stats.total) * 100);

  const handleSave = () => {
    setStats(editValues);
    setIsEditing(false);
    toast.success("Attendance matrix synchronized!");
  };

  return (
    <Card className="h-full border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] rounded-[3.5rem] bg-white overflow-hidden group hover:shadow-indigo-100 transition-all duration-700">
      <CardHeader className="p-10 flex flex-row items-center justify-between bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-indigo-600 text-white rounded-[1.2rem] shadow-xl group-hover:rotate-12 transition-transform">
             <Activity className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-black uppercase tracking-tighter italic text-slate-900">Pulse <span className="text-indigo-600">Metrics</span></CardTitle>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Temporal consistency monitoring</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)} className="h-12 w-12 rounded-[1.2rem] bg-white shadow-sm hover:text-indigo-600">
          {isEditing ? <X className="w-5 h-5 text-rose-500" /> : <Edit2 className="w-5 h-5" />}
        </Button>
      </CardHeader>
      <CardContent className="p-10">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic ml-2">Verified</Label>
                    <Input type="number" value={editValues.present} onChange={e => setEditValues({...editValues, present: Number(e.target.value)})} className="h-16 rounded-2xl bg-slate-50 border-none font-black italic text-2xl text-center shadow-inner focus-visible:ring-indigo-600/20" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic ml-2">Absence</Label>
                    <Input type="number" value={editValues.absent} onChange={e => setEditValues({...editValues, absent: Number(e.target.value)})} className="h-16 rounded-2xl bg-slate-50 border-none font-black italic text-2xl text-center shadow-inner focus-visible:ring-indigo-600/20" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic ml-2">Temporal</Label>
                    <Input type="number" value={editValues.late} onChange={e => setEditValues({...editValues, late: Number(e.target.value)})} className="h-16 rounded-2xl bg-slate-50 border-none font-black italic text-2xl text-center shadow-inner focus-visible:ring-indigo-600/20" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic ml-2">Aggregate</Label>
                    <Input type="number" value={editValues.total} onChange={e => setEditValues({...editValues, total: Number(e.target.value)})} className="h-16 rounded-2xl bg-slate-50 border-none font-black italic text-2xl text-center shadow-inner focus-visible:ring-indigo-600/20" />
                  </div>
               </div>
               <Button onClick={handleSave} className="w-full h-18 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.8rem] font-black uppercase tracking-widest text-xs shadow-2xl transition-all hover:-translate-y-2 mt-4">
                 <Save className="w-5 h-5 mr-4 text-indigo-300" /> Synchronize Matrix
               </Button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-10"
            >
              <div className="flex items-center justify-between">
                <div className="text-7xl font-black italic tracking-tighter text-indigo-600 leading-none group-hover:scale-105 transition-transform origin-left">{percentage}%</div>
                <div className="text-right space-y-2">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic">
                    Engagement Index
                  </p>
                  <Badge className="font-black uppercase text-[10px] bg-emerald-50 text-emerald-600 border-none rounded-xl px-5 shadow-sm">
                    OPTIMIZED CYCLE
                  </Badge>
                </div>
              </div>
              <div className="space-y-3">
                 <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-indigo-600" /> Reliability Projection</span>
                    <span>{percentage}% Synchronized</span>
                 </div>
                 <div className="h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 shadow-xl" />
                 </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="rounded-[2rem] bg-emerald-50/50 p-6 text-center border border-emerald-50 transition-all hover:bg-emerald-50 group/stat hover:shadow-xl hover:shadow-emerald-100/50">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-white shadow-2xl text-emerald-600 group-hover/stat:rotate-12 transition-transform">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-black italic text-emerald-700 tracking-tighter leading-none">{stats.present}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600/70 mt-3 italic">Verified</p>
                </div>
                <div className="rounded-[2rem] bg-rose-50/50 p-6 text-center border border-rose-50 transition-all hover:bg-rose-50 group/stat hover:shadow-xl hover:shadow-rose-100/50">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-white shadow-2xl text-rose-600 group-hover/stat:rotate-12 transition-transform">
                    <XCircle className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-black italic text-rose-700 tracking-tighter leading-none">{stats.absent}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-rose-600/70 mt-3 italic">Absence</p>
                </div>
                <div className="rounded-[2rem] bg-amber-50/50 p-6 text-center border border-amber-50 transition-all hover:bg-amber-50 group/stat hover:shadow-xl hover:shadow-amber-100/50">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-white shadow-2xl text-amber-600 group-hover/stat:rotate-12 transition-transform">
                    <Clock className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-black italic text-amber-700 tracking-tighter leading-none">{stats.late}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-amber-600/70 mt-3 italic">Temporal</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};