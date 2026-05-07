import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Hash, ShieldCheck, Sparkles, Edit2, Save, X, Camera, RefreshCcw, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface StudentProfileProps {
  name: string;
  studentId: string;
  className: string;
  photoUrl: string;
  academicYear: string;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({
  name: initialName,
  studentId: initialId,
  className: initialClass,
  photoUrl: initialPhoto,
  academicYear: initialYear,
}) => {
  const [data, setData] = useState({
    name: initialName,
    id: initialId,
    class: initialClass,
    photo: initialPhoto,
    year: initialYear,
    unit: "Executive Academic Wing",
    email: "scholar@academix.edu",
    phone: "+233 24 000 0000"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(data);

  const handleSave = () => {
    setData(editForm);
    setIsEditing(false);
    toast.success("Scholar profile synchronized!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Card className="overflow-hidden border-none bg-white rounded-[5rem] shadow-[0_80px_150px_-30px_rgba(0,0,0,0.15)] group relative">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsEditing(true)} 
          className="absolute top-12 right-12 z-20 h-20 w-20 rounded-[2.2rem] bg-white/80 backdrop-blur-md shadow-2xl border-none opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-white"
        >
          <Edit2 className="w-8 h-8 text-indigo-600" />
        </Button>

        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            <div className="relative h-[40rem] w-full lg:w-[35rem] overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 2 }}
                src={data.photo}
                alt={data.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-16 left-16 space-y-6">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                   <h2 className="text-7xl font-black text-white uppercase tracking-tighter italic leading-none">{data.name}</h2>
                   <div className="flex items-center gap-6 mt-8">
                     <Badge className="bg-emerald-500 text-white border-none px-10 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-emerald-500/40">
                       {data.class} HUB
                     </Badge>
                     <div className="flex items-center gap-2 text-white/60">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Status: Synchronized</span>
                     </div>
                   </div>
                </motion.div>
              </div>
              <div className="absolute top-16 left-16">
                 <div className="w-20 h-20 rounded-[2rem] bg-white/20 backdrop-blur-2xl flex items-center justify-center text-white border border-white/40 shadow-2xl group-hover:rotate-12 transition-transform">
                   <ShieldCheck className="w-12 h-12" />
                 </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center p-20 lg:p-32 relative">
              <div className="absolute top-20 right-20 opacity-5 group-hover:rotate-90 transition-transform duration-[2000ms]">
                 <Sparkles className="w-96 h-96 text-indigo-600" />
              </div>

              <div className="space-y-8 relative z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-8xl font-black tracking-tighter text-slate-900 uppercase italic leading-none group-hover:text-indigo-600 transition-colors">
                    Identity <span className="not-italic text-slate-100">Artifact</span>
                  </h2>
                </div>
                <p className="text-4xl font-black text-slate-200 uppercase tracking-[0.4em] italic">Academic Registry Division</p>
              </div>

              <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 mt-24 relative z-10">
                {[
                  { label: "Identity Serial", val: data.id, icon: Hash },
                  { label: "Temporal Grid", val: data.year, icon: Calendar },
                  { label: "Spatial Allocation", val: data.unit, icon: MapPin }
                ].map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * i }}
                    key={i} 
                    className="flex flex-col gap-6 p-10 bg-slate-50/50 rounded-[3.5rem] transition-all hover:bg-indigo-50/40 border border-transparent hover:border-indigo-100 shadow-sm hover:shadow-2xl group/item"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-[1.8rem] bg-white shadow-2xl text-indigo-600 border border-slate-100 group-hover/item:rotate-12 transition-transform shadow-indigo-100">
                      <item.icon className="h-10 w-10" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 italic mb-3">{item.label}</p>
                      <p className="font-black text-2xl text-slate-900 tracking-tight leading-none italic">{item.val}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-24 flex flex-wrap gap-8 relative z-10">
                 <Button className="rounded-[2.5rem] h-24 bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest text-sm px-16 shadow-2xl transition-all hover:-translate-y-2 group/auth">
                    <ShieldCheck className="w-6 h-6 mr-5 text-emerald-400 group-hover/auth:rotate-12 transition-transform" /> Authenticated Profile File
                 </Button>
                 <Button variant="outline" className="rounded-[2.5rem] h-24 border-slate-200 bg-white font-black uppercase tracking-widest text-sm px-16 shadow-2xl hover:bg-slate-50 transition-all hover:-translate-y-1">
                    <RefreshCcw className="w-6 h-6 mr-5 text-indigo-600" /> Sync System Logic
                 </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isEditing && (
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogContent className="rounded-[5rem] p-20 max-w-4xl bg-white border-none shadow-[0_100px_200px_-50px_rgba(0,0,0,0.4)]">
              <DialogHeader>
                <DialogTitle className="text-6xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Scholar <span className="text-indigo-600">Synthesis</span></DialogTitle>
                <DialogDescription className="font-black text-slate-400 uppercase tracking-widest text-[12px] mt-8 italic">Authorized Identity Modification Module Protocol</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-12 mt-16">
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-4 col-span-2">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Full Designation (Legal Name)</Label>
                    <Input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="h-24 rounded-[2.5rem] bg-slate-50 border-none font-black italic text-3xl px-12 shadow-inner focus-visible:ring-indigo-600/20" />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Identity Serial ID</Label>
                    <Input value={editForm.id} onChange={e => setEditForm({...editForm, id: e.target.value})} className="h-20 rounded-[1.8rem] bg-slate-50 border-none font-black italic shadow-inner uppercase px-10 focus-visible:ring-indigo-600/20" />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Temporal Cycle</Label>
                    <Input value={editForm.year} onChange={e => setEditForm({...editForm, year: e.target.value})} className="h-20 rounded-[1.8rem] bg-slate-50 border-none font-black italic shadow-inner px-10 focus-visible:ring-indigo-600/20" />
                  </div>
                  <div className="space-y-4 col-span-2">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Hub Allocation (Unit)</Label>
                    <Input value={editForm.unit} onChange={e => setEditForm({...editForm, unit: e.target.value})} className="h-20 rounded-[1.8rem] bg-slate-50 border-none font-black italic shadow-inner px-10 focus-visible:ring-indigo-600/20" />
                  </div>
                  <div className="space-y-4 col-span-2">
                    <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Identity Visual URL</Label>
                    <div className="flex gap-6">
                       <Input value={editForm.photo} onChange={e => setEditForm({...editForm, photo: e.target.value})} className="h-20 rounded-[1.8rem] bg-slate-50 border-none font-black text-[11px] shadow-inner flex-1 px-10 focus-visible:ring-indigo-600/20" />
                       <div className="h-20 w-20 bg-slate-100 rounded-[1.5rem] flex items-center justify-center text-slate-400 shadow-inner shrink-0 transition-all hover:bg-slate-200">
                          <Camera className="w-10 h-10" />
                       </div>
                    </div>
                  </div>
                </div>
                <Button onClick={handleSave} className="w-full h-28 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[3rem] font-black uppercase tracking-widest text-sm shadow-2xl shadow-indigo-100 transition-all hover:-translate-y-2 mt-8">
                  <RefreshCcw className="w-6 h-6 mr-5 text-indigo-300 animate-spin-slow" /> Synchronize Identity Record
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
};