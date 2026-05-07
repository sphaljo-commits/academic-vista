import React, { useState } from "react";
import { StaffHistory, StaffMember } from "@/types/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, History, TrendingUp, AlertCircle, Award, UserMinus, Edit2, Trash2, Plus, Save, X, RefreshCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaffHistoryViewProps {
  member: StaffMember;
  history: StaffHistory[];
}

export function StaffHistoryView({ member, history: initialHistory }: StaffHistoryViewProps) {
  const [history, setHistory] = useState<StaffHistory[]>(initialHistory);
  const [editingEntry, setEditingEntry] = useState<StaffHistory | null>(null);

  const sortedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEntry) {
      if (history.find(h => h.id === editingEntry.id)) {
        setHistory(history.map(h => h.id === editingEntry.id ? editingEntry : h));
        toast.success("Temporal artifact synchronized!");
      } else {
        setHistory([{ ...editingEntry, id: Math.random().toString() }, ...history]);
        toast.success("New history event committed to protocol!");
      }
      setEditingEntry(null);
    }
  };

  const getIcon = (type: StaffHistory["type"]) => {
    switch (type) {
      case "promotion": return <Award className="w-7 h-7" />;
      case "disciplinary": return <AlertCircle className="w-7 h-7" />;
      case "leave": return <Calendar className="w-7 h-7" />;
      case "hiring": return <TrendingUp className="w-7 h-7" />;
      case "termination": return <UserMinus className="w-7 h-7" />;
      default: return <History className="w-7 h-7" />;
    }
  };

  const getBadgeVariant = (type: StaffHistory["type"]) => {
    switch (type) {
      case "promotion": return "bg-emerald-50 text-emerald-700 border-emerald-100 shadow-emerald-50";
      case "disciplinary": return "bg-rose-50 text-rose-700 border-rose-100 shadow-rose-50";
      case "leave": return "bg-amber-50 text-amber-700 border-amber-100 shadow-amber-50";
      case "hiring": return "bg-indigo-50 text-indigo-700 border-indigo-100 shadow-indigo-50";
      case "termination": return "bg-slate-50 text-slate-700 border-slate-100";
      default: return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-14 rounded-[4rem] border border-slate-50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] gap-10 group">
        <div className="flex items-center gap-10">
           <div className="w-24 h-24 rounded-[2.5rem] bg-slate-900 flex items-center justify-center text-white shadow-2xl group-hover:rotate-6 transition-transform">
              <History className="w-12 h-12" />
           </div>
           <div className="space-y-2">
             <h3 className="text-5xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">
               {member.name}
             </h3>
             <div className="flex items-center gap-3">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] italic">{member.role} \\u2022 {member.department} Division Protocol</p>
                <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
             </div>
           </div>
        </div>
        <div className="flex items-center gap-8">
          <Badge 
            className={cn(
              "px-10 py-4 rounded-[1.8rem] uppercase text-[11px] font-black tracking-widest transition-all shadow-2xl border-none",
              member.status === 'active' 
                ? 'bg-emerald-500 text-white shadow-emerald-200' 
                : member.status === 'on-leave'
                ? 'bg-amber-500 text-white shadow-amber-200'
                : 'bg-rose-500 text-white shadow-rose-200'
            )}
          >
            {member.status.replace('-', ' ').toUpperCase()}
          </Badge>
          <Button onClick={() => setEditingEntry({ id: "new", staffId: member.id, date: new Date().toISOString(), event: "", details: "", type: "promotion" })} className="h-20 w-20 rounded-[2rem] bg-slate-900 hover:bg-black text-white shadow-2xl transition-transform hover:-translate-y-2 group/add">
            <Plus className="w-10 h-10 group-hover/add:rotate-90 transition-transform" />
          </Button>
        </div>
      </div>

      <div className="relative space-y-12 pt-8">
        <div className="absolute left-[47px] top-16 bottom-10 w-2 bg-slate-100 rounded-full shadow-inner" />
        
        {sortedHistory.length === 0 ? (
          <div className="text-center py-40 text-slate-200 bg-slate-50/30 rounded-[5rem] border border-dashed border-slate-200">
            <History className="w-32 h-32 mx-auto mb-10 opacity-5" />
            <p className="font-black uppercase tracking-[0.5em] text-sm italic">Temporal history grid is currently void protocol</p>
          </div>
        ) : (
          sortedHistory.map((entry, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={entry.id} 
              className="relative pl-32 pb-4 group/row"
            >
              <div className={cn(
                "absolute left-0 top-0 w-24 h-24 rounded-[2.5rem] border-8 border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] flex items-center justify-center z-10 transition-all duration-700 group-hover/row:rotate-12 group-hover/row:scale-110",
                getBadgeVariant(entry.type)
              )}>
                {getIcon(entry.type)}
              </div>
              <Card className="border-none shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] bg-white group-hover/row:shadow-2xl group-hover/row:-translate-y-2 transition-all duration-700 rounded-[3.5rem] overflow-hidden">
                <CardContent className="p-12">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                    <div className="space-y-2">
                       <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 italic">Temporal Milestone Marker</p>
                       <p className="text-2xl font-black text-slate-800 italic leading-none">{new Date(entry.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <Badge className={cn("px-8 py-3 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl border-none", getBadgeVariant(entry.type))}>
                        {entry.event.toUpperCase()}
                      </Badge>
                      <div className="flex opacity-0 group-hover/row:opacity-100 transition-all transform translate-x-10 group-hover/row:translate-x-0 gap-3">
                         <Button size="icon" variant="ghost" className="h-14 w-14 rounded-2xl bg-slate-50 hover:text-indigo-600 shadow-xl hover:bg-white transition-all" onClick={() => setEditingEntry(entry)}><Edit2 className="w-6 h-6" /></Button>
                         <Button size="icon" variant="ghost" className="h-14 w-14 rounded-2xl bg-slate-50 hover:text-rose-600 shadow-xl hover:bg-white transition-all" onClick={() => setHistory(history.filter(h => h.id !== entry.id))}><Trash2 className="w-6 h-6" /></Button>
                      </div>
                    </div>
                  </div>
                  <p className="text-3xl font-black italic text-slate-500 leading-tight tracking-tighter group-hover/row:text-slate-900 transition-colors duration-500">
                    "{entry.details}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {editingEntry && (
          <Dialog open={!!editingEntry} onOpenChange={() => setEditingEntry(null)}>
            <DialogContent className="rounded-[5rem] p-20 max-w-4xl bg-white border-none shadow-[0_100px_200px_-50px_rgba(0,0,0,0.4)]">
               <DialogHeader>
                  <DialogTitle className="text-6xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">Event <span className="text-indigo-600">Registry</span></DialogTitle>
                  <p className="font-black text-slate-400 uppercase tracking-widest text-[12px] mt-8 italic">Authorized temporal history artifact modification</p>
               </DialogHeader>
               <form onSubmit={handleSaveEntry} className="space-y-12 mt-16">
                  <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-4 col-span-2">
                       <Label className="text-[11px] font-black uppercase text-slate-400 italic ml-4">Temporal Marker (Event Date)</Label>
                       <Input type="date" value={editingEntry.date.split('T')[0]} onChange={e => setEditingEntry({...editingEntry, date: e.target.value})} className="h-20 rounded-[1.8rem] bg-slate-50 border-none font-black italic text-2xl px-10 shadow-inner focus-visible:ring-indigo-600/20" required />
                    </div>
                    <div className="space-y-4">
                       <Label className="text-[11px] font-black uppercase text-slate-400 italic ml-4">Event Designation Protocol</Label>
                       <Input value={editingEntry.event} onChange={e => setEditingEntry({...editingEntry, event: e.target.value})} className="h-20 rounded-[1.8rem] bg-slate-50 border-none font-black italic text-2xl px-10 shadow-inner focus-visible:ring-indigo-600/20" placeholder="e.g. Merit Promotion Artifact" required />
                    </div>
                    <div className="space-y-4">
                       <Label className="text-[11px] font-black uppercase text-slate-400 italic ml-4">Classification Area</Label>
                       <select value={editingEntry.type} onChange={e => setEditingEntry({...editingEntry, type: e.target.value as any})} className="w-full h-20 rounded-[1.8rem] bg-slate-50 border-none px-8 font-black uppercase text-[14px] tracking-widest italic shadow-inner focus-visible:ring-indigo-600/20">
                          <option value="promotion">Promotion Matrix</option>
                          <option value="disciplinary">Disciplinary Pulse</option>
                          <option value="leave">Temporal Leave Cycle</option>
                          <option value="hiring">Onboarding Protocol</option>
                          <option value="termination">Termination Signal</option>
                       </select>
                    </div>
                    <div className="space-y-4 col-span-2">
                       <Label className="text-[11px] font-black uppercase text-slate-400 italic ml-4">Narrative Logical Details</Label>
                       <Textarea value={editingEntry.details} onChange={e => setEditingEntry({...editingEntry, details: e.target.value})} className="h-40 rounded-[2.5rem] bg-slate-50 border-none font-bold italic text-xl p-10 shadow-inner focus-visible:ring-indigo-600/20 leading-relaxed" required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-28 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[3rem] font-black uppercase tracking-widest text-sm shadow-2xl shadow-indigo-100 transition-all hover:-translate-y-2 mt-8">
                    <RefreshCcw className="w-6 h-6 mr-5 text-indigo-300 animate-spin-slow" /> Synchronize Artifact Registry
                  </Button>
               </form>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}