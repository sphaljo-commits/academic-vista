import React, { useState } from "react";
import { StaffMember } from "@/types/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Calendar, TrendingUp, Search, ShieldCheck, UserCheck, Edit3, Trash2, Plus, PhoneCall, RefreshCcw, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { useSchool } from "@/context/SchoolContext";
import { cn } from "@/lib/utils";

export function StaffList() {
  const { staff, updateStaff, addStaff, deleteStaff } = useSchool();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  const handleUpdateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStaff) {
      if (staff.find(s => s.id === editingStaff.id)) {
        updateStaff(editingStaff.id, editingStaff);
        toast.success("Personnel artifact synchronized!", { icon: <ShieldCheck className="text-emerald-500" /> });
      } else {
        addStaff({ ...editingStaff, id: `st${Math.random().toString(36).substr(2, 5)}` });
        toast.success("New personnel onboarded to grid protocol!", { icon: <Plus className="text-blue-500" /> });
      }
      setEditingStaff(null);
    }
  };

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-20 pb-40 animate-in fade-in duration-1000">
      <div className="bg-white p-16 rounded-[6rem] shadow-[0_80px_160px_-40px_rgba(49,46,129,0.1)] border-2 border-slate-50 flex flex-col xl:flex-row xl:items-end justify-between gap-12 relative overflow-hidden group">
        <div className="absolute -right-32 -bottom-32 opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-[3000ms]">
           <UserCheck className="w-[45rem] h-[45rem] text-blue-600 rotate-12" />
        </div>
        <div className="space-y-4 relative z-10">
          <h2 className="text-8xl font-black uppercase tracking-tighter italic text-slate-900 leading-none group-hover:text-blue-600 transition-colors duration-500">Faculty <span className="text-blue-600 not-italic">Registry</span></h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[13px] mt-8 italic leading-none">Official roster of institutional academic & operational personnel artifacts</p>
        </div>
        
        <div className="flex flex-col xl:flex-row items-center gap-10 relative z-10 w-full xl:w-auto">
           <div className="relative group flex-1 xl:flex-none">
              <div className="absolute inset-0 bg-blue-500/10 rounded-[3rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 text-slate-300 group-focus-within:text-blue-600 transition-all duration-700" />
              <Input placeholder="Query personnel database protocol..." className="pl-20 h-24 rounded-[3rem] bg-slate-50 border-none w-full xl:w-[35rem] shadow-inner font-black uppercase text-sm tracking-widest italic focus-visible:ring-blue-600/10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
           </div>
           <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-[3rem] h-24 px-16 font-black uppercase tracking-[0.2em] text-xs shadow-2xl transition-all hover:-translate-y-3 group/add w-full xl:w-auto">
              <Plus className="w-8 h-8 mr-5 text-blue-200 group-hover:rotate-90 transition-transform" /> Onboard Personnel Node
           </Button>
        </div>
      </div>

      <Card className="border-none shadow-[0_150px_300px_-80px_rgba(0,0,0,0.25)] rounded-[6rem] overflow-hidden bg-white border border-slate-50">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/30 h-32">
              <TableRow className="border-b-4 border-slate-50/50">
                <th className="px-20 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Personnel Identity Artifact</th>
                <th className="px-10 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Professional Designation</th>
                <th className="px-10 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Efficiency Matrix</th>
                <th className="text-right px-20 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Grid Operations</th>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((member) => (
                <TableRow key={member.id} className="h-48 hover:bg-blue-50/30 transition-all border-slate-50 group border-b last:border-none">
                  <TableCell className="px-20">
                    <div className="flex items-center gap-12">
                      <div className="relative">
                         <Avatar className="h-32 w-32 border-[10px] border-white shadow-2xl rounded-[3rem] group-hover:rotate-12 transition-all duration-700">
                            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-5xl">{member.name[0]}</AvatarFallback>
                         </Avatar>
                         <motion.div 
                            animate={{ scale: [1, 1.2, 1] }}
                            className="absolute -bottom-2 -right-2 h-10 w-10 rounded-2xl bg-emerald-500 border-4 border-white shadow-2xl animate-pulse shadow-emerald-200" 
                         />
                      </div>
                      <div className="space-y-4">
                         <span className="font-black uppercase tracking-tighter text-slate-900 text-4xl italic group-hover:text-blue-600 transition-colors duration-700 leading-none">{member.name}</span>
                         <div className="flex items-center gap-5 text-[11px] font-black text-slate-300 uppercase tracking-widest italic">
                            <Mail className="w-5 h-5 text-blue-400" /> {member.email}
                         </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-4">
                       <span className="text-2xl font-black text-slate-800 italic uppercase leading-none tracking-tighter">{member.role}</span>
                       <Badge className="w-fit bg-blue-50 text-blue-600 rounded-2xl text-[10px] px-6 py-2.5 font-black uppercase border-none shadow-sm">{member.department} DIVISION GRID</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex flex-col gap-5">
                        <div className="flex items-baseline gap-4">
                           <span className="text-6xl font-black italic tracking-tighter text-blue-600 leading-none group-hover:scale-110 transition-transform inline-block">{member.performanceScore}%</span>
                           <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
                        </div>
                        <div className="h-3 w-48 bg-slate-50 rounded-full overflow-hidden shadow-inner border border-slate-100 p-0.5">
                           <motion.div initial={{ width: 0 }} animate={{ width: `${member.performanceScore}%` }} className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full shadow-lg" />
                        </div>
                     </div>
                  </TableCell>
                  <TableCell className="text-right px-20">
                    <div className="flex items-center justify-end gap-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-12 group-hover:translate-x-0">
                      <Button size="icon" variant="ghost" className="h-20 w-20 rounded-[2.5rem] bg-white shadow-2xl hover:text-blue-600 border border-slate-100 hover:scale-110 transition-all" onClick={() => setEditingStaff(member)}><Edit3 className="w-8 h-8" /></Button>
                      <Button size="icon" variant="ghost" className="h-20 w-20 rounded-[2.5rem] bg-white shadow-2xl hover:text-rose-600 border border-slate-100 hover:scale-110 transition-all" onClick={() => { deleteStaff(member.id); toast.info("Personnel record purged from grid"); }}><Trash2 className="w-8 h-8" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AnimatePresence>
        {editingStaff && (
          <Dialog open={!!editingStaff} onOpenChange={() => setEditingStaff(null)}>
            <DialogContent className="rounded-[6rem] p-24 max-w-4xl bg-white border-none shadow-[0_150px_300px_-80px_rgba(0,0,0,0.5)]">
              <DialogHeader>
                <DialogTitle className="text-7xl font-black uppercase tracking-tighter italic leading-none">Personnel <span className="text-blue-600">Synthesis</span></DialogTitle>
                <DialogDescription className="font-black text-slate-400 uppercase tracking-widest text-[12px] mt-10 italic">Authorized institutional credential modification protocol</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdateStaff} className="space-y-16 mt-20">
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-5 col-span-2">
                    <Label className="text-[11px] font-black uppercase text-slate-400 ml-6 italic">Full Designation Identity Artifact</Label>
                    <Input value={editingStaff.name} onChange={e => setEditingStaff({ ...editingStaff, name: e.target.value })} className="h-24 rounded-[2.5rem] bg-slate-50 border-none font-black italic text-5xl px-12 shadow-inner text-blue-600" required />
                  </div>
                  <div className="space-y-5">
                    <Label className="text-[11px] font-black uppercase text-slate-400 ml-6 italic">Official Portfolio Role</Label>
                    <Input value={editingStaff.role} onChange={e => setEditingStaff({ ...editingStaff, role: e.target.value })} className="h-20 rounded-[2rem] bg-slate-50 border-none font-black italic text-3xl px-10 shadow-inner" required />
                  </div>
                  <div className="space-y-5">
                    <Label className="text-[11px] font-black uppercase text-slate-400 ml-6 italic">Division Allocation Hub</Label>
                    <Input value={editingStaff.department} onChange={e => setEditingStaff({ ...editingStaff, department: e.target.value })} className="h-20 rounded-[2rem] bg-slate-50 border-none font-black italic text-3xl px-10 shadow-inner text-indigo-600" required />
                  </div>
                  <div className="space-y-5">
                    <Label className="text-[11px] font-black uppercase text-slate-400 ml-6 italic">Communication Channel (Email)</Label>
                    <Input value={editingStaff.email} onChange={e => setEditingStaff({ ...editingStaff, email: e.target.value })} className="h-20 rounded-[2rem] bg-slate-50 border-none font-bold italic text-2xl px-10 shadow-inner text-slate-600" required />
                  </div>
                  <div className="space-y-5">
                    <Label className="text-[11px] font-black uppercase text-slate-400 ml-6 italic">Contact Protocol (Phone)</Label>
                    <Input value={editingStaff.phone} onChange={e => setEditingStaff({ ...editingStaff, phone: e.target.value })} className="h-20 rounded-[2rem] bg-slate-50 border-none font-bold italic text-2xl px-10 shadow-inner text-slate-600" required />
                  </div>
                </div>
                <Button type="submit" className="w-full h-32 bg-blue-600 hover:bg-blue-700 text-white rounded-[3.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl transition-all hover:-translate-y-4 mt-12">
                  <RefreshCcw className="w-10 h-10 mr-6 text-blue-200 animate-spin-slow" /> Synchronize Personnel Record Artifact
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}