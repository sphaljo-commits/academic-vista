import React, { useState } from "react";
import { StaffMember } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, User, Mail, Phone, Calendar, ShieldCheck, Sparkles, RefreshCcw, LayoutGrid, Building, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";

interface NewStaffFormProps {
  onSave: (staff: StaffMember) => void;
  onCancel: () => void;
  initialData?: StaffMember;
}

export function NewStaffForm({ onSave, onCancel, initialData }: NewStaffFormProps) {
  const [formData, setFormData] = useState<Partial<StaffMember>>(
    initialData || {
      name: "",
      role: "",
      email: "",
      phone: "",
      department: "Academic",
      joinDate: new Date().toISOString().split('T')[0],
      status: "active",
      performanceScore: 90
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) return;

    onSave({
      ...formData,
      id: formData.id || `st-${Math.random().toString(36).substr(2, 9)}`,
    } as StaffMember);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 pb-32">
      <div className="flex items-center justify-between no-print">
        <Button variant="ghost" onClick={onCancel} className="rounded-2xl h-14 px-8 font-black uppercase text-[10px] tracking-widest hover:bg-slate-100">
          Abort Synthesis
        </Button>
      </div>

      <Card className="w-full max-w-5xl mx-auto border-none shadow-[0_100px_200px_-50px_rgba(0,0,0,0.2)] rounded-[5rem] overflow-hidden group">
        <CardHeader className="border-b border-slate-100 bg-slate-50/30 p-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="flex items-center gap-8">
              <div className="p-6 bg-blue-600 text-white rounded-[2rem] shadow-2xl shadow-blue-100 group-hover:rotate-6 transition-transform">
                <UserCheck className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-5xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Personnel <span className="text-blue-600">Synthesis</span></CardTitle>
                <CardDescription className="font-black text-slate-400 uppercase tracking-widest text-[11px] italic mt-4">Authorized Institutional Faculty Onboarding Protocol</CardDescription>
              </div>
            </div>
            <div className="text-right hidden sm:block bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-2">HR Deployment</p>
              <p className="text-2xl font-black italic text-blue-600 leading-none">Division {formData.department || "Registry"}</p>
            </div>
          </div>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-16 p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Full Designation Identity</Label>
                <div className="relative">
                   <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Robert Smith"
                    className="h-20 rounded-[1.8rem] bg-slate-50 border-none font-black italic text-2xl px-10 shadow-inner focus-visible:ring-blue-600/20" 
                    required
                  />
                  <User className="absolute right-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-200" />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Communication Channel (Email)</Label>
                <div className="relative">
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@school.com"
                    className="h-20 rounded-[1.8rem] bg-slate-50 border-none font-bold italic text-xl px-10 shadow-inner focus-visible:ring-blue-600/20"
                    required
                  />
                  <Mail className="absolute right-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-200" />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Professional Portfolio Role</Label>
                <Input
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Senior Academic Lead"
                  className="h-20 rounded-[1.8rem] bg-slate-50 border-none font-black italic text-2xl px-10 shadow-inner focus-visible:ring-blue-600/20"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Contact Protocol (Phone)</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+233 24 000 0000"
                  className="h-20 rounded-[1.8rem] bg-slate-50 border-none font-black italic text-2xl px-10 shadow-inner focus-visible:ring-blue-600/20"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Division Allocation Hub</Label>
                <Select 
                  value={formData.department} 
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                >
                  <SelectTrigger className="h-20 bg-slate-50 border-none rounded-[1.8rem] px-8 font-black uppercase text-[14px] shadow-inner focus:ring-2 focus:ring-blue-600/20">
                    <SelectValue placeholder="Select Division" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl font-black uppercase">
                    <SelectItem value="Academic">Academic Division</SelectItem>
                    <SelectItem value="Administration">Institutional Command</SelectItem>
                    <SelectItem value="Operations">Logistical Operations</SelectItem>
                    <SelectItem value="Financial">Fiscal Governance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Temporal Deployment Mark</Label>
                <Input
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  className="h-20 rounded-[1.8rem] bg-slate-50 border-none font-black text-xl px-10 shadow-inner focus-visible:ring-blue-600/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
               <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Efficiency Projection Logic (%)</Label>
               <Input 
                  type="number"
                  value={formData.performanceScore}
                  onChange={e => setFormData({...formData, performanceScore: Number(e.target.value)})}
                  className="h-24 rounded-[2.5rem] bg-slate-50 border-none font-black italic text-5xl text-blue-600 text-center shadow-inner"
               />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-6 border-t border-slate-100 p-16 bg-slate-50/20 no-print">
            <Button type="button" variant="ghost" onClick={onCancel} className="h-20 px-10 rounded-[1.8rem] font-black uppercase tracking-widest text-xs">Discard Record</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-black rounded-[1.8rem] h-20 px-16 shadow-2xl transition-all hover:-translate-y-2 group/save">
               <RefreshCcw className="w-6 h-6 mr-5 text-blue-300 animate-spin-slow group-hover/save:rotate-180" /> Synchronize Personnel Roster
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}