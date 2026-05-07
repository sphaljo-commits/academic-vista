import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Student, Class } from "@/types/auth";
import { toast } from "sonner";
import { UserPlus, Save, X, Upload, Camera, Printer, MessageSquare, ShieldCheck, RefreshCcw, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface NewAdmissionFormProps {
  onSave: (student: Student) => void;
  onCancel: () => void;
  classes: Class[];
  initialData?: Student;
}

export function NewAdmissionForm({ onSave, onCancel, classes, initialData }: NewAdmissionFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<Student>>(
    initialData || {
      name: "",
      email: "",
      classId: "",
      rollNumber: "",
      dateOfBirth: "",
      gender: "male",
      address: "",
      guardianName: "",
      guardianPhone: "",
      status: "active",
      performanceScore: 80,
      passportPhoto: "",
    }
  );

  const [previewUrl, setPreviewUrl] = useState<string>(initialData?.passportPhoto || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        setFormData((prev) => ({ ...prev, passportPhoto: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.classId || !formData.guardianName) {
      toast.error("Protocol violation: Missing mandatory intake metadata");
      return;
    }

    const newStudent: Student = {
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      name: formData.name || "",
      email: formData.email || "",
      classId: formData.classId || "",
      rollNumber: formData.rollNumber || `STU-${Math.floor(Math.random() * 10000)}`,
      dateOfBirth: formData.dateOfBirth || "",
      gender: formData.gender || "male",
      address: formData.address || "",
      guardianName: formData.guardianName || "",
      guardianPhone: formData.guardianPhone || "",
      admissionDate: initialData?.admissionDate || new Date().toISOString().split("T")[0],
      status: (formData.status as "active" | "inactive") || "active",
      performanceScore: formData.performanceScore || 0,
      passportPhoto: previewUrl,
    };

    onSave(newStudent);
    toast.success(initialData ? "Scholar artifact synchronized!" : "New scholar admitted to terminal protocol!");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 pb-32">
      <div className="flex items-center justify-between no-print">
        <Button variant="ghost" onClick={onCancel} className="rounded-2xl h-14 px-8 font-black uppercase text-[10px] tracking-widest hover:bg-slate-100"><X className="w-5 h-5 mr-3" /> Abort Intake</Button>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.print()} className="rounded-2xl h-14 px-8 border-slate-200 font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 shadow-2xl">
            <Printer className="w-5 h-5 mr-3 text-blue-600" /> Print Artifact
          </Button>
        </div>
      </div>

      <Card id="printable-form" className="w-full max-w-5xl mx-auto border-none shadow-[0_100px_200px_-50px_rgba(0,0,0,0.2)] rounded-[5rem] overflow-hidden group">
        <CardHeader className="border-b border-slate-100 bg-slate-50/30 p-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="flex items-center gap-8">
              <div className="p-6 bg-blue-600 text-white rounded-[2rem] shadow-2xl shadow-blue-100 group-hover:rotate-6 transition-transform">
                <UserPlus className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-5xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Intake <span className="text-blue-600">Synthesis</span></CardTitle>
                <CardDescription className="font-black text-slate-400 uppercase tracking-widest text-[11px] italic mt-4">Official Institutional Scholar Admission Registry Protocol</CardDescription>
              </div>
            </div>
            <div className="text-right hidden sm:block bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-2">Admission Cycle</p>
              <p className="text-2xl font-black italic text-blue-600 leading-none">2024 / 2025 HUB</p>
            </div>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-16 p-16">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="relative">
                <Avatar className="h-48 w-48 border-8 border-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] rounded-[4rem] group-hover:rotate-3 transition-transform duration-700 overflow-hidden">
                  <AvatarImage src={previewUrl} className="object-cover" />
                  <AvatarFallback className="bg-slate-100 text-slate-300">
                    <Camera className="w-16 h-16 opacity-10" />
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  size="icon"
                  className="absolute -bottom-4 -right-4 rounded-3xl bg-blue-600 hover:bg-blue-700 shadow-2xl h-16 w-16 no-print border-4 border-white transition-all hover:scale-110 active:scale-95"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-7 h-7 text-white" />
                </Button>
              </div>
              <div className="text-center space-y-2 no-print">
                <Label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Visual Identification Artifact</Label>
                <p className="text-[10px] font-bold text-slate-300">JPG, PNG or WEBP (MAX 5MB PROTOCOL)</p>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Full Designation Protocol (Name)</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-20 bg-slate-50 border-none rounded-[1.8rem] px-10 font-black italic text-2xl shadow-inner focus-visible:ring-blue-600/20" required />
              </div>
              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Cohort Registry Hub (Class)</Label>
                <Select value={formData.classId} onValueChange={(value) => setFormData({ ...formData, classId: value })}>
                  <SelectTrigger className="h-20 bg-slate-50 border-none rounded-[1.8rem] px-8 font-black uppercase text-[14px] shadow-inner focus:ring-2 focus:ring-blue-600/20"><SelectValue placeholder="Select Registry Hub" /></SelectTrigger>
                  <SelectContent className="rounded-2xl">{classes.map((c) => (<SelectItem key={c.id} value={c.id} className="font-black uppercase text-[12px]">{c.name}</SelectItem>))}</SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Temporal Birth Marker</Label>
                <Input type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} className="h-20 bg-slate-50 border-none rounded-[1.8rem] px-10 font-black italic text-2xl shadow-inner focus-visible:ring-blue-600/20" />
              </div>
              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Gender Protocol</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger className="h-20 bg-slate-50 border-none rounded-[1.8rem] px-8 font-black uppercase text-[14px] shadow-inner focus:ring-2 focus:ring-blue-600/20"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="male" className="font-black uppercase text-[12px]">MALE HUB</SelectItem>
                    <SelectItem value="female" className="font-black uppercase text-[12px]">FEMALE HUB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Primary Guardian Identity</Label>
                <Input value={formData.guardianName} onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })} className="h-20 bg-slate-50 border-none rounded-[1.8rem] px-10 font-black italic text-2xl shadow-inner focus-visible:ring-blue-600/20" required />
              </div>
              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Guardian Communication Protocol</Label>
                <Input value={formData.guardianPhone} onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })} className="h-20 bg-slate-50 border-none rounded-[1.8rem] px-10 font-black italic text-2xl shadow-inner focus-visible:ring-blue-600/20" required />
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4 italic">Physical Residence Protocol (Address)</Label>
              <Textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="bg-slate-50 border-none rounded-[2.5rem] p-10 font-bold italic text-slate-600 text-xl leading-relaxed min-h-[140px] shadow-inner focus-visible:ring-blue-600/20" />
            </div>

            <div className="mt-16 pt-16 border-t-8 border-dashed border-slate-100 hidden print:block">
              <div className="grid grid-cols-2 gap-20">
                <div className="border-t-4 border-slate-900 pt-6 text-center">
                  <p className="text-[12px] font-black uppercase tracking-[0.4em] italic">Guardian Verification Signature</p>
                </div>
                <div className="border-t-4 border-slate-900 pt-6 text-center">
                  <p className="text-[12px] font-black uppercase tracking-[0.5em] italic text-blue-600">Administrative Protocol Seal</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-6 border-t border-slate-100 p-16 bg-slate-50/20 no-print">
            <Button type="button" variant="ghost" onClick={onCancel} className="h-20 px-10 rounded-[1.8rem] font-black uppercase tracking-widest text-xs">Abort Synthesis</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-black rounded-[1.8rem] h-20 px-16 shadow-2xl transition-all hover:-translate-y-2 group/save">
               <RefreshCcw className="w-6 h-6 mr-5 text-blue-300 animate-spin-slow group-hover/save:rotate-180" /> Synchronize Scholar Roster
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}