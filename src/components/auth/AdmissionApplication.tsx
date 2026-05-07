import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSchool } from "@/context/SchoolContext";
import { GraduationCap, ArrowLeft, Send, Sparkles, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AdmissionApplication } from "@/types/auth";
import { motion } from "framer-motion";

export function AdmissionApplicationForm() {
  const { addAdmission, school } = useSchool();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<AdmissionApplication>>({
    status: "pending",
    applicationDate: new Date().toISOString().split("T")[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const app: AdmissionApplication = {
      ...formData as AdmissionApplication,
      id: Math.random().toString(36).substr(2, 9)
    };
    addAdmission(app);
    setIsSubmitted(true);
    toast.success("Application successfully filed!");
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-2xl text-center space-y-6"
        >
          <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">Application <span className="text-primary not-italic">Received!</span></h2>
          <p className="text-slate-500 font-medium">Thank you for your interest in {school?.name || "Academix Pro"}. Our admissions team will review the student's profile and contact you within 3-5 business days.</p>
          <Button onClick={() => navigate("/website")} className="w-full h-14 bg-primary hover:bg-primary/90 rounded-2xl font-black uppercase tracking-widest text-xs">
            Return to Website
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6 selection:bg-primary selection:text-white">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate("/website")}
          className="group flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-12 font-black uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to School Site
        </button>

        <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="text-center bg-slate-900 text-white p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-primary/20">
                <GraduationCap className="w-8 h-8" />
              </div>
              <CardTitle className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Enrollment <span className="text-primary not-italic">Application</span></CardTitle>
              <CardDescription className="text-slate-400 text-lg font-medium">Join the legacy of excellence at {school?.name || "Academix Pro"}.</CardDescription>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="p-12 space-y-12">
              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-xs">01</div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Student Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Legal Full Name</Label>
                    <Input required placeholder="Student Name" className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary" onChange={(e) => setFormData({ ...formData, studentName: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Date of Birth</Label>
                    <Input required type="date" className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary" onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Grade Applying For</Label>
                    <Select required onValueChange={(val) => setFormData({ ...formData, classRequested: val })}>
                      <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white">
                        <SelectValue placeholder="Select Grade Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="preschool">Preschool</SelectItem>
                        <SelectItem value="primary-1">Primary 1</SelectItem>
                        <SelectItem value="primary-2">Primary 2</SelectItem>
                        <SelectItem value="primary-3">Primary 3</SelectItem>
                        <SelectItem value="secondary-1">Secondary 1</SelectItem>
                        <SelectItem value="secondary-2">Secondary 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Previous School</Label>
                    <Input placeholder="Last Academy Attended" className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary" onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })} />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-xs">02</div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Parent / Guardian Hub</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Primary Guardian Name</Label>
                    <Input required placeholder="Full Legal Name" className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary" onChange={(e) => setFormData({ ...formData, parentName: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Communication Email</Label>
                    <Input required type="email" placeholder="example@domain.com" className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary" onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Direct Contact Phone</Label>
                    <Input required type="tel" placeholder="+234 800 000 000" className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary" onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })} />
                  </div>
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest leading-none">Standard Review: 72 Hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 p-12 flex flex-col gap-6">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-16 text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20">
                Submit Formal Application <Send className="ml-2 h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2 justify-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Sparkles className="w-3 h-3" /> Encrypted Submission Secure Channel
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}