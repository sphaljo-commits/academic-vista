import React, { useState } from "react";
import { Class, Student } from "@/types/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Users, Edit2, Trash2, Check, X, Search, GraduationCap, ShieldCheck, Sparkles, UserPlus, RefreshCcw, LayoutGrid, Zap } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ClassManagementProps {
  classes: Class[];
  students: Student[];
  onUpdateClass: (id: string, name: string) => void;
  onAddClass: (name: string) => void;
  onEditStudent: (student: Student) => void;
}

export function ClassManagement({ classes, students, onUpdateClass, onAddClass, onEditStudent }: ClassManagementProps) {
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [editClassName, setEditClassName] = useState("");
  const [editCapacity, setEditCapacity] = useState(30);
  const [showAddClass, setShowAddClass] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleStartEdit = (cls: Class) => {
    setEditingClassId(cls.id);
    setEditClassName(cls.name);
    setEditCapacity(cls.capacity);
  };

  const handleSaveEdit = () => {
    if (editingClassId && editClassName) {
      onUpdateClass(editingClassId, editClassName);
      setEditingClassId(null);
      toast.success("Cohort parameters synchronized!", { icon: <ShieldCheck className="text-emerald-500" /> });
    }
  };

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-20 animate-in fade-in duration-1000 pb-40">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 bg-white p-20 rounded-[6rem] shadow-[0_80px_160px_-40px_rgba(30,58,138,0.1)] border-2 border-blue-100 relative overflow-hidden group">
        <div className="absolute -right-32 -bottom-32 opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-[3000ms]">
           <GraduationCap className="w-[45rem] h-[45rem] text-blue-600 rotate-12" />
        </div>
        <div className="space-y-4 relative z-10">
          <h2 className="text-8xl font-black uppercase tracking-tighter italic text-slate-900 leading-none group-hover:text-blue-600 transition-colors duration-500">Cohort <span className="text-blue-600 not-italic">Node</span></h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[13px] mt-8 italic leading-none">Orchestrating academic groupings & institutional enrollment grids</p>
        </div>
        <div className="flex gap-8 relative z-10">
          <Button onClick={() => setShowAddClass(true)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-[3rem] h-24 px-20 font-black uppercase tracking-widest text-sm shadow-2xl shadow-blue-100 transition-all hover:-translate-y-3">
            <Plus className="w-8 h-8 mr-5 text-blue-300 shadow-xl group-hover:rotate-90 transition-transform" /> Initialize New Cohort
          </Button>
        </div>
      </div>

      <Tabs defaultValue="classes" className="space-y-16">
        <TabsList className="bg-slate-100 p-2.5 rounded-[4rem] h-24 border border-slate-200 shadow-inner flex gap-2">
          <TabsTrigger value="classes" className="rounded-[3.5rem] px-20 h-full font-black uppercase tracking-widest text-[12px] data-[state=active]:bg-white data-[state=active]:shadow-2xl data-[state=active]:text-blue-600 flex gap-6 transition-all">
            <Users className="w-8 h-8" /> Institutional Registry
          </TabsTrigger>
          <TabsTrigger value="students" className="rounded-[3.5rem] px-20 h-full font-black uppercase tracking-widest text-[12px] data-[state=active]:bg-white data-[state=active]:shadow-2xl data-[state=active]:text-blue-600 flex gap-6 transition-all">
            <Sparkles className="w-8 h-8" /> Scholar Roster
          </TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-16">
          <AnimatePresence>
            {showAddClass && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <Card className="border-none shadow-[0_80px_160px_-40px_rgba(59,130,246,0.2)] rounded-[5rem] bg-blue-50/60 p-20 border-b-8 border-blue-200/50">
                  <div className="flex flex-col xl:flex-row gap-12 items-end">
                    <div className="flex-1 space-y-5 w-full">
                      <Label className="text-[12px] font-black uppercase tracking-widest text-blue-400 italic ml-6">Cohort Designation Protocol</Label>
                      <Input value={newClassName} onChange={e => setNewClassName(e.target.value)} placeholder="e.g. Grade 11-Alpha Advanced Hub" className="h-24 bg-white border-none rounded-[2.5rem] px-12 font-black italic text-4xl shadow-inner text-blue-600" />
                    </div>
                    <div className="flex gap-8 w-full xl:w-auto">
                       <Button onClick={() => { if(newClassName) onAddClass(newClassName); setShowAddClass(false); setNewClassName(""); }} className="flex-1 xl:flex-none bg-blue-600 text-white rounded-[2.5rem] h-24 px-20 font-black uppercase text-sm tracking-widest shadow-2xl transition-all hover:-translate-y-3">Create Artifact</Button>
                       <Button variant="ghost" onClick={() => setShowAddClass(false)} className="h-24 px-12 rounded-[2.5rem] font-black uppercase text-[12px] tracking-widest hover:bg-white text-slate-400">Abort</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((cls) => (
              <Card key={cls.id} className="border-none shadow-[0_60px_120px_-20px_rgba(0,0,0,0.1)] rounded-[5.5rem] bg-white hover:shadow-blue-100 hover:-translate-y-4 transition-all duration-700 group relative overflow-hidden border border-slate-50">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 opacity-0 group-hover:opacity-100 rounded-full translate-x-24 -translate-y-24 group-hover:scale-150 transition-all duration-1000 blur-[4rem]" />
                <CardHeader className="p-16 pb-10 relative z-10">
                  <div className="flex justify-between items-center">
                    <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-blue-50 group-hover:rotate-12 transition-transform duration-700">
                       <Users className="w-12 h-12" />
                    </div>
                    <div className="flex gap-6">
                      <Button variant="ghost" size="icon" onClick={() => handleStartEdit(cls)} className="h-16 w-16 rounded-[1.8rem] bg-slate-50 hover:text-blue-600 transition-all shadow-xl hover:bg-white border border-slate-100"><Edit2 className="w-7 h-7" /></Button>
                    </div>
                  </div>
                  {editingClassId === cls.id ? (
                    <div className="mt-12 space-y-8">
                       <div className="space-y-4">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6">Designation</Label>
                          <Input value={editClassName} onChange={e => setEditClassName(e.target.value)} className="h-18 rounded-[1.8rem] bg-slate-50 border-none font-black italic text-2xl px-8 shadow-inner text-blue-600" />
                       </div>
                       <div className="space-y-4">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6">Temporal Capacity</Label>
                          <Input type="number" value={editCapacity} onChange={e => setEditCapacity(Number(e.target.value))} className="h-18 rounded-[1.8rem] bg-slate-50 border-none font-black italic text-2xl px-8 shadow-inner" />
                       </div>
                       <div className="flex gap-5 pt-6">
                          <Button onClick={handleSaveEdit} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl h-18 font-black uppercase text-[11px] tracking-[0.2em] shadow-2xl">Commit Sync</Button>
                          <Button variant="ghost" onClick={() => setEditingClassId(null)} className="bg-slate-50 h-18 px-8 rounded-2xl font-black uppercase text-[11px] text-slate-400">Abort</Button>
                       </div>
                    </div>
                  ) : (
                    <CardTitle className="text-5xl font-black uppercase tracking-tighter italic mt-12 text-slate-900 leading-[1.1] group-hover:text-blue-600 transition-colors duration-500">{cls.name}</CardTitle>
                  )}
                  <div className="flex items-center gap-4 mt-6">
                     <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                     <CardDescription className="font-black text-blue-600 uppercase tracking-widest text-[11px] italic">Institutional Cohort active</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-16 pt-0 mt-10 relative z-10">
                  <div className="flex flex-col space-y-10">
                     <div className="flex justify-between items-center text-[12px] font-black uppercase tracking-widest text-slate-400 italic">
                        <span className="flex items-center gap-4"><ShieldCheck className="w-6 h-6 text-emerald-500" /> Protocol Pulse</span>
                        <span>CAP: {cls.capacity} ARTIFACTS</span>
                     </div>
                     <div className="space-y-5">
                        <div className="flex justify-between text-[13px] font-black uppercase tracking-tighter items-end">
                           <span className="text-slate-800">Enrolled Scholars</span>
                           <div className="flex items-baseline gap-3">
                              <span className="text-5xl font-black italic text-blue-600 tracking-tighter leading-none">{students.filter(s => s.classId === cls.id).length}</span>
                              <span className="text-slate-300 font-bold text-xl italic">/ {cls.capacity}</span>
                           </div>
                        </div>
                        <div className="h-5 bg-slate-50 rounded-full overflow-hidden shadow-inner border border-slate-100 p-1">
                           <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(students.filter(s => s.classId === cls.id).length / cls.capacity) * 100}%` }}
                            className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-400 rounded-full shadow-2xl shadow-blue-200"
                           />
                        </div>
                     </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-16">
          <div className="relative max-w-4xl group">
            <div className="absolute inset-0 bg-blue-500/10 rounded-[4.5rem] blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <Search className="absolute left-10 top-1/2 -translate-y-1/2 w-10 h-10 text-slate-300 group-focus-within:text-blue-600 transition-all duration-700" />
            <Input 
              placeholder="Query scholars by designation or identity serial protocol..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="pl-28 h-28 rounded-[4.5rem] bg-white border-none shadow-[0_80px_160px_-40px_rgba(0,0,0,0.15)] font-black uppercase text-lg tracking-widest italic focus-visible:ring-blue-600/10 shadow-inner px-16"
            />
          </div>
          <Card className="border-none shadow-[0_150px_300px_-80px_rgba(0,0,0,0.25)] rounded-[6rem] overflow-hidden bg-white group border border-slate-50">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/30 h-32">
                    <tr className="border-b-4 border-slate-50/50">
                      <th className="px-20 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Scholar Identity Artifact</th>
                      <th className="px-10 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Registry Allocation Hub</th>
                      <th className="px-10 font-black uppercase tracking-widest text-[12px] text-slate-400 text-center italic">Serial ID Protocol</th>
                      <th className="px-20 text-right font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Grid Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredStudents.map((s) => (
                      <tr key={s.id} className="h-44 hover:bg-blue-50/30 transition-all border-slate-50 group/row">
                        <td className="px-20">
                          <div className="flex items-center gap-12">
                            <div className="w-24 h-24 rounded-[2.5rem] bg-white border-2 border-blue-50 text-blue-600 flex items-center justify-center font-black text-5xl shadow-2xl shadow-blue-50 group-hover/row:rotate-12 transition-all group-hover/row:scale-110">{s.name[0]}</div>
                            <div className="space-y-3">
                               <span className="font-black uppercase tracking-tighter text-slate-900 text-4xl italic group-hover/row:text-blue-600 transition-colors duration-700 leading-none block">{s.name}</span>
                               <Badge variant="outline" className="bg-white border-slate-100 text-[10px] font-black uppercase text-slate-300">OFFICIAL SCHOLAR ASSET</Badge>
                            </div>
                          </div>
                        </td>
                        <td className="px-10">
                          <Badge variant="outline" className="px-12 py-5 rounded-[2.2rem] font-black uppercase text-[12px] tracking-widest bg-white border-slate-200 shadow-2xl group-hover/row:bg-blue-600 group-hover/row:text-white transition-all group-hover/row:border-none group-hover/row:-rotate-2">
                             {classes.find(c => c.id === s.classId)?.name || "Temporal Grid Hub"}
                          </Badge>
                        </td>
                        <td className="px-10 text-center">
                           <span className="font-black text-slate-400 text-3xl tracking-tighter italic bg-slate-50 px-8 py-5 rounded-3xl shadow-inner border border-slate-100/50">{s.rollNumber}</span>
                        </td>
                        <td className="px-20 text-right">
                          <Button 
                            onClick={() => onEditStudent(s)} 
                            className="bg-slate-900 hover:bg-black text-white rounded-[2.2rem] h-24 px-16 font-black uppercase tracking-[0.2em] text-xs shadow-2xl transition-all hover:-translate-y-3 group/btn"
                          >
                            <Edit2 className="w-7 h-7 mr-5 text-blue-400 group-hover/btn:rotate-12 transition-transform" /> Edit ID File
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}