import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSchool } from "@/context/SchoolContext";
import { Briefcase, ArrowLeft, Send, Plus, Trash2, FileUp, UserCircle, Sparkles, CheckCircle, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { EmploymentApplication } from "@/types/auth";
import { motion } from "framer-motion";

export function EmploymentApplicationForm() {
  const { addEmploymentApp, school, websiteContent } = useSchool();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [certs, setCerts] = useState<string[]>([""]);
  const [formData, setFormData] = useState<Partial<EmploymentApplication>>({
    status: "pending",
    applicationDate: new Date().toISOString().split("T")[0],
    professionalQuestions: { motivation: "", philosophy: "" }
  });

  const addCert = () => setCerts([...certs, ""]);
  const removeCert = (index: number) => setCerts(certs.filter((_, i) => i !== index));
  const updateCert = (index: number, val: string) => {
    const newCerts = [...certs];
    newCerts[index] = val;
    setCerts(newCerts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const app: EmploymentApplication = {
      ...formData as EmploymentApplication,
      id: Math.random().toString(36).substr(2, 9),
      certificates: certs.filter(c => c.trim() !== "")
    };
    addEmploymentApp(app);
    setIsSubmitted(true);
    toast.success("Career application submitted!");
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white/5 backdrop-blur-3xl p-12 rounded-[2.5rem] border border-white/10 text-center space-y-6"
        >
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-white mx-auto shadow-2xl shadow-primary/40">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic text-white">Application <span className="text-primary not-italic">Sent!</span></h2>
          <p className="text-slate-400 font-medium leading-relaxed">Your professional profile is now with our recruitment team. We will review your qualifications and contact you if there's a match.</p>
          <Button onClick={() => navigate("/website")} className="w-full h-14 bg-primary hover:bg-primary/90 rounded-2xl font-black uppercase tracking-widest text-xs">
            Return to Careers
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
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Career Portal
        </button>

        <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="text-center bg-slate-950 text-white p-16 relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-10 right-10 w-48 h-48 bg-primary rounded-full blur-[60px]" />
              <div className="absolute bottom-10 left-10 w-48 h-48 bg-emerald-500 rounded-full blur-[60px]" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mx-auto mb-6 border border-white/10">
                <Briefcase className="w-8 h-8" />
              </div>
              <CardTitle className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Join Our <span className="text-primary not-italic">Legacy</span></CardTitle>
              <CardDescription className="text-slate-400 text-lg font-medium">Shape the future of education with {school?.name || "Academix Pro"}.</CardDescription>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="p-12 space-y-16">
              {/* Step 1: Basic Info */}
              <div className="space-y-10">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-xs">01</div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Professional Identity</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Legal Name</Label>
                    <Input required placeholder="Dr./Mr./Ms. Name" className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary" onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Professional Email</Label>
                    <Input required type="email" placeholder="name@domain.com" className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Primary Contact</Label>
                    <Input required type="tel" placeholder="+234..." className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Desired Portfolio</Label>
                    <Select required onValueChange={(val) => setFormData({ ...formData, portfolio: val })}>
                      <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white">
                        <SelectValue placeholder="Select Position" />
                      </SelectTrigger>
                      <SelectContent>
                        {websiteContent.portfolios.map(p => (
                          <SelectItem key={p} value={p.toLowerCase().replace(/ /g, '-')}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Step 2: Professional Profile */}
              <div className="space-y-10">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-xs">02</div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Candidate Insight</h3>
                </div>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Why are you the right fit for this school?</Label>
                    <Textarea required placeholder="Describe your motivation..." className="min-h-[120px] rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary p-6" onChange={(e) => setFormData({ 
                      ...formData, 
                      professionalQuestions: { ...formData.professionalQuestions!, motivation: e.target.value } 
                    })} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Professional Philosophy</Label>
                    <Textarea required placeholder="What is your approach to education/work?" className="min-h-[120px] rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary p-6" onChange={(e) => setFormData({ 
                      ...formData, 
                      professionalQuestions: { ...formData.professionalQuestions!, philosophy: e.target.value } 
                    })} />
                  </div>
                </div>
              </div>

              {/* Step 3: Documents */}
              <div className="space-y-10">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xs">03</div>
                  <h3 className="text-xl font-black uppercase tracking-tight">Credentials Hub</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary/40 transition-colors cursor-pointer group">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                        <UserCircle className="w-6 h-6" />
                      </div>
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Passport Photo (URL)</Label>
                      <Input placeholder="Direct Link to Image" className="h-10 bg-white" onChange={(e) => setFormData({ ...formData, passportUrl: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary/40 transition-colors cursor-pointer group">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                        <FileUp className="w-6 h-6" />
                      </div>
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Curriculum Vitae (URL)</Label>
                      <Input placeholder="Direct Link to PDF" className="h-10 bg-white" onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Academic & Professional Certificates (Unlimited)</Label>
                  <div className="space-y-4">
                    {certs.map((cert, index) => (
                      <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={index} className="flex gap-4">
                        <Input value={cert} placeholder="Certificate Name or Link" className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-primary px-6" onChange={(e) => updateCert(index, e.target.value)} />
                        {certs.length > 1 && (
                          <Button type="button" variant="destructive" size="icon" className="h-14 w-14 rounded-2xl shrink-0" onClick={() => removeCert(index)}>
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <Button type="button" variant="outline" className="w-full h-14 border-dashed border-2 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:border-primary hover:text-primary transition-all" onClick={addCert}>
                    <Plus className="w-4 h-4 mr-2" /> Append Qualification
                  </Button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="bg-slate-50 p-12 flex flex-col gap-6">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-16 text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20">
                Submit Formal Application <Send className="ml-2 h-4 w-4" />
              </Button>
              <div className="flex items-center gap-4 justify-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-1"><Award className="w-3 h-3 text-amber-500" /> Professional Grade</div>
                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                <div className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-primary" /> Future-Ready</div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}