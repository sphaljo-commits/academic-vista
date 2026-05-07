import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TimetableEntry } from "@/types/auth";
import { Calendar, Clock, MapPin, User, Sparkles, Plus, Edit2, Trash2, Save, X, RefreshCcw, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

const INITIAL_TIMETABLE: TimetableEntry[] = [
  { id: "1", classId: "c1", subject: "Mathematics", teacherId: "t1", day: "Monday", startTime: "08:00 AM", endTime: "09:30 AM", room: "Room 101" },
  { id: "2", classId: "c1", subject: "English Registry", teacherId: "t2", day: "Monday", startTime: "10:00 AM", endTime: "11:30 AM", room: "Room 101" },
  { id: "3", classId: "c1", subject: "Applied Science", teacherId: "t1", day: "Tuesday", startTime: "08:00 AM", endTime: "09:30 AM", room: "Lab Alpha" },
];

interface TimetableProps {
  role: "admin" | "teacher" | "parent";
  targetId?: string;
}

export function Timetable({ role, targetId }: TimetableProps) {
  const [timetable, setTimetable] = useState<TimetableEntry[]>(INITIAL_TIMETABLE);
  const [filter, setFilter] = useState(targetId || "c1");
  const [editingEntry, setEditingEntry] = useState<any | null>(null);

  const filteredEntries = timetable.filter(entry => {
    if (role === "teacher") return entry.teacherId === targetId;
    return entry.classId === filter;
  });

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEntry) {
      if (timetable.find(x => x.id === editingEntry.id)) {
        setTimetable(timetable.map(x => x.id === editingEntry.id ? editingEntry : x));
        toast.success("Temporal artifact synchronized!");
      } else {
        setTimetable([{ ...editingEntry, id: Math.random().toString() }, ...timetable]);
        toast.success("New temporal slot committed!");
      }
      setEditingEntry(null);
    }
  };

  const removeEntry = (id: string) => {
    setTimetable(timetable.filter(x => x.id !== id));
    toast.info("Temporal slot purged");
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 bg-white p-14 rounded-[4.5rem] border border-slate-50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden group">
        <div className="absolute -right-20 -bottom-20 opacity-5 group-hover:scale-110 transition-transform duration-1000">
           <Clock className="w-96 h-96 text-indigo-600 rotate-12" />
        </div>
        <div className="space-y-2 relative z-10">
          <h2 className="text-6xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Temporal <span className="text-indigo-600 not-italic">Grid</span></h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mt-4 italic">Institutional academic schedule and room allocation logic</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          {role === "admin" && (
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="h-18 w-72 rounded-[1.5rem] bg-slate-50 border-none font-black uppercase text-[11px] tracking-widest shadow-inner">
                <SelectValue placeholder="Select Registry" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="c1" className="font-black">PRIMARY 1A HUB</SelectItem>
                <SelectItem value="c2" className="font-black">PRIMARY 2B HUB</SelectItem>
                <SelectItem value="c3" className="font-black">SECONDARY 1 ALPHA</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Button onClick={() => setEditingEntry({ id: "new", classId: filter, subject: "", day: "Monday", startTime: "08:00 AM", endTime: "09:00 AM", room: "" })} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.8rem] h-20 px-12 font-black uppercase tracking-widest text-xs shadow-2xl transition-all hover:-translate-y-2">
            <Plus className="w-6 h-6 mr-4 text-indigo-300" /> Initialize Slot
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {DAYS.map(day => (
          <Card key={day} className="border-none shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] bg-white rounded-[3.5rem] overflow-hidden group hover:shadow-indigo-100 transition-all duration-500">
            <CardHeader className="py-10 bg-slate-50/50 border-b border-slate-100 text-center">
              <CardTitle className="text-lg font-black uppercase tracking-[0.3em] text-slate-400 italic">{day}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {filteredEntries.filter(e => e.day === day).length > 0 ? (
                filteredEntries
                  .filter(e => e.day === day)
                  .map((entry) => (
                    <motion.div 
                      layout
                      key={entry.id} 
                      className="p-8 rounded-[2.5rem] border border-transparent bg-white shadow-sm hover:border-indigo-100 hover:shadow-2xl transition-all group/item relative"
                    >
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-item-hover:opacity-100 transition-all">
                         <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl bg-slate-50" onClick={() => setEditingEntry(entry)}><Edit2 className="w-4 h-4 text-indigo-600" /></Button>
                         <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl bg-slate-50" onClick={() => removeEntry(entry.id)}><Trash2 className="w-4 h-4 text-rose-500" /></Button>
                      </div>
                      <p className="text-xl font-black text-indigo-700 uppercase tracking-tighter italic leading-none mb-6 group-item-hover:scale-105 transition-transform origin-left">{entry.subject}</p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-400"><Clock className="w-4 h-4" /></div>
                           <span className="text-[10px] font-black uppercase text-slate-400 italic">{entry.startTime} - {entry.endTime}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-400"><MapPin className="w-4 h-4" /></div>
                           <span className="text-[10px] font-black uppercase text-slate-400 italic">Spatial: {entry.room}</span>
                        </div>
                        {role !== "teacher" && (
                          <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                            <Avatar className="h-10 w-10 rounded-xl border border-slate-100 shadow-sm">
                               <AvatarFallback className="bg-slate-50 text-[10px] font-black uppercase">ST</AvatarFallback>
                            </Avatar>
                            <span className="text-[10px] font-black text-slate-900 uppercase italic">Instructor Alpha</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
              ) : (
                <div className="py-24 text-center border-4 border-dashed rounded-[3rem] border-slate-100 bg-slate-50/20">
                  <Clock className="w-12 h-12 mx-auto mb-6 text-slate-100" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 italic px-6">Zero temporal allocations</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {editingEntry && (
          <Dialog open={!!editingEntry} onOpenChange={() => setEditingEntry(null)}>
            <DialogContent className="rounded-[5rem] p-20 max-w-4xl bg-white border-none shadow-2xl">
               <DialogHeader>
                  <DialogTitle className="text-6xl font-black uppercase italic tracking-tighter leading-none">Temporal <span className="text-indigo-600">Synthesis</span></DialogTitle>
                  <p className="font-black text-slate-400 uppercase tracking-widest text-[12px] mt-8 italic">Authorized academic schedule modification protocol</p>
               </DialogHeader>
               <form onSubmit={handleSaveEntry} className="space-y-12 mt-16">
                  <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-4 col-span-2">
                       <Label className="text-[11px] font-black uppercase text-slate-400 ml-4">Subject Discipline Designation</Label>
                       <Input value={editingEntry.subject} onChange={e => setEditingEntry({...editingEntry, subject: e.target.value})} className="h-24 rounded-[2.5rem] bg-slate-50 border-none font-black italic text-3xl px-12 shadow-inner focus-visible:ring-indigo-600/20" required />
                    </div>
                    <div className="space-y-4">
                       <Label className="text-[11px] font-black uppercase text-slate-400 ml-4">Temporal Day Cycle</Label>
                       <select value={editingEntry.day} onChange={e => setEditingEntry({...editingEntry, day: e.target.value})} className="w-full h-20 rounded-[1.8rem] bg-slate-50 border-none px-8 font-black uppercase text-[14px] tracking-widest italic shadow-inner">
                          {DAYS.map(d => <option key={d} value={d}>{d.toUpperCase()} PROTOCOL</option>)}
                       </select>
                    </div>
                    <div className="space-y-4">
                       <Label className="text-[11px] font-black uppercase text-slate-400 ml-4">Spatial Hub Marker (Room)</Label>
                       <Input value={editingEntry.room} onChange={e => setEditingEntry({...editingEntry, room: e.target.value})} className="h-20 rounded-[1.8rem] bg-slate-50 border-none font-black text-2xl px-10 shadow-inner" placeholder="e.g. LAB-ALPHA" required />
                    </div>
                    <div className="space-y-4">
                       <Label className="text-[11px] font-black uppercase text-slate-400 ml-4">StartTime Protocol</Label>
                       <Input value={editingEntry.startTime} onChange={e => setEditingEntry({...editingEntry, startTime: e.target.value})} className="h-20 rounded-[1.8rem] bg-slate-50 border-none font-black text-2xl px-10 shadow-inner" placeholder="08:00 AM" required />
                    </div>
                    <div className="space-y-4">
                       <Label className="text-[11px] font-black uppercase text-slate-400 ml-4">EndTime Protocol</Label>
                       <Input value={editingEntry.endTime} onChange={e => setEditingEntry({...editingEntry, endTime: e.target.value})} className="h-20 rounded-[1.8rem] bg-slate-50 border-none font-black text-2xl px-10 shadow-inner" placeholder="09:30 AM" required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-28 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[3rem] font-black uppercase tracking-widest text-sm shadow-2xl transition-all hover:-translate-y-2 mt-8">
                    <RefreshCcw className="w-6 h-6 mr-5 text-indigo-300 animate-spin-slow" /> Synchronize Temporal Slot
                  </Button>
               </form>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}