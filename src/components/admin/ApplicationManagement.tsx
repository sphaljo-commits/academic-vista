import React, { useState } from "react";
import { AdmissionApplication, EmploymentApplication } from "@/types/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSchool } from "@/context/SchoolContext";
import { 
  Check, X, Eye, FileText, Globe, Plus, Trash2, Edit, Briefcase, UserPlus, 
  LayoutGrid, Settings, Image as ImageIcon, GraduationCap, Calendar, Sparkles, Save, ShieldCheck, RefreshCcw, Search, Zap
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function ApplicationManagement() {
  const { admissions, employmentApps, websiteContent, updateWebsiteContent, updateAdmission, updateEmploymentApp } = useSchool();
  const [localWebsite, setLocalWebsite] = useState(websiteContent);
  const [editingAdmission, setEditingAdmission] = useState<AdmissionApplication | null>(null);
  const [editingEmployment, setEditingEmployment] = useState<EmploymentApplication | null>(null);
  const [newPortfolio, setNewPortfolio] = useState("");

  const saveWebsite = () => {
    updateWebsiteContent(localWebsite);
    toast.success("Institutional digital architecture synchronized!", { icon: <Globe className="text-emerald-500" /> });
  };

  const handleUpdateAdmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAdmission) {
      updateAdmission(editingAdmission.id, editingAdmission);
      toast.success("Scholar intake record updated!", { icon: <RefreshCcw className="text-blue-500" /> });
      setEditingAdmission(null);
    }
  };

  const handleUpdateEmployment = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmployment) {
      updateEmploymentApp(editingEmployment.id, editingEmployment);
      toast.success("Professional recruitment portfolio updated!", { icon: <RefreshCcw className="text-indigo-500" /> });
      setEditingEmployment(null);
    }
  };

  return (
    <div className="space-y-16 pb-40 animate-in fade-in duration-1000">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 bg-white p-16 rounded-[5rem] border-2 border-indigo-100 shadow-[0_80px_160px_-40px_rgba(49,46,129,0.1)] relative overflow-hidden group">
        <div className="absolute -right-32 -bottom-32 opacity-10 group-hover:scale-110 transition-transform duration-[3000ms]">
           <Sparkles className="w-[40rem] h-[40rem] text-indigo-600 rotate-45" />
        </div>
        <div className="space-y-4 relative z-10">
          <h2 className="text-7xl font-black uppercase tracking-tighter italic text-slate-900 leading-none group-hover:text-indigo-600 transition-colors duration-500">Pipeline <span className="text-indigo-600 not-italic">Node</span></h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[12px] mt-6 italic leading-none">Overseeing institutional intake artifacts & faculty recruitment protocols</p>
        </div>
        <div className="flex gap-8 relative z-10">
          <Button onClick={saveWebsite} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-[3rem] h-24 px-20 font-black uppercase tracking-widest text-sm shadow-[0_30px_60px_-15px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-3">
            <RefreshCcw className="w-8 h-8 mr-5 text-indigo-300 animate-spin-slow" /> Synchronize Grid Core
          </Button>
        </div>
      </div>

      <Tabs defaultValue="admissions" className="space-y-16">
        <TabsList className="bg-slate-100 p-2.5 rounded-[4rem] h-24 border border-slate-200 shadow-inner flex gap-2">
          <TabsTrigger value="admissions" className="rounded-[3.5rem] px-16 h-full font-black uppercase tracking-widest text-[11px] data-[state=active]:bg-white data-[state=active]:shadow-2xl data-[state=active]:text-blue-600 flex gap-5 transition-all">
            <UserPlus className="w-7 h-7" /> Candidate Intake
          </TabsTrigger>
          <TabsTrigger value="employment" className="rounded-[3.5rem] px-16 h-full font-black uppercase tracking-widest text-[11px] data-[state=active]:bg-white data-[state=active]:shadow-2xl data-[state=active]:text-indigo-600 flex gap-5 transition-all">
            <Briefcase className="w-7 h-7" /> Faculty Recruitment
          </TabsTrigger>
          <TabsTrigger value="website" className="rounded-[3.5rem] px-16 h-full font-black uppercase tracking-widest text-[11px] data-[state=active]:bg-white data-[state=active]:shadow-2xl data-[state=active]:text-emerald-600 flex gap-5 transition-all">
            <Globe className="w-7 h-7" /> Portal Engine
          </TabsTrigger>
        </TabsList>

        <TabsContent value="admissions">
           <Card className="border-none shadow-[0_120px_240px_-60px_rgba(0,0,0,0.15)] rounded-[6rem] overflow-hidden bg-white border border-slate-50">
             <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/20">
                    <TableRow className="h-32 border-b-4 border-slate-50/50">
                      <th className="px-20 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Scholar Candidate Artifact</th>
                      <th className="font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Requested Cohort Allocation</th>
                      <th className="font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Status Protocol</th>
                      <th className="text-right px-20 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Grid Operations</th>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admissions.map(app => (
                      <TableRow key={app.id} className="h-40 hover:bg-blue-50/30 transition-all border-slate-50 group">
                        <TableCell className="px-20">
                           <div className="flex items-center gap-10">
                              <div className="w-20 h-20 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center text-blue-600 font-black text-4xl group-hover:rotate-12 transition-all border border-slate-50">{app.studentName[0]}</div>
                              <div className="space-y-2">
                                <p className="font-black uppercase tracking-tighter text-slate-900 text-3xl italic group-hover:text-blue-600 transition-colors duration-500">{app.studentName}</p>
                                <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest italic">Guardian: {app.parentName}</p>
                              </div>
                           </div>
                        </TableCell>
                        <td className="font-black text-2xl italic text-slate-800 uppercase tracking-tighter">{app.classRequested} Hub</td>
                        <td>
                          <Badge className={cn("px-10 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-2xl border-none transition-all", app.status === 'pending' ? 'bg-amber-500 text-white animate-pulse' : 'bg-emerald-500 text-white shadow-emerald-200')}>
                             {app.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="px-20 text-right">
                           <div className="flex justify-end gap-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-10 group-hover:translate-x-0">
                              <Button size="icon" variant="ghost" className="h-20 w-20 rounded-[2.5rem] bg-white shadow-2xl hover:text-blue-600 border border-slate-100 hover:scale-110 transition-all" onClick={() => setEditingAdmission(app)}><Edit className="w-8 h-8" /></Button>
                              <Button size="icon" variant="ghost" className="h-20 w-20 rounded-[2.5rem] bg-emerald-600 text-white shadow-2xl hover:scale-110 transition-transform"><Check className="w-8 h-8" /></Button>
                           </div>
                        </td>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="employment">
           <Card className="border-none shadow-[0_120px_240px_-60px_rgba(0,0,0,0.15)] rounded-[6rem] overflow-hidden bg-white border border-slate-50">
             <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/20">
                    <TableRow className="h-32 border-b-4 border-slate-50/50">
                      <th className="px-20 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Personnel Identity Artifact</th>
                      <th className="font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Specialization Domain</th>
                      <th className="font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Status Status</th>
                      <th className="text-right px-20 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Grid Operations</th>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employmentApps.map(app => (
                      <TableRow key={app.id} className="h-40 hover:bg-indigo-50/30 transition-all border-slate-50 group">
                        <TableCell className="px-20">
                           <div className="flex items-center gap-10">
                              <div className="w-20 h-20 rounded-[2.5rem] bg-white shadow-2xl flex items-center justify-center text-indigo-600 font-black text-4xl group-hover:rotate-12 transition-all border border-slate-50">{app.fullName[0]}</div>
                              <div className="space-y-2">
                                <p className="font-black uppercase tracking-tighter text-slate-900 text-3xl italic group-hover:text-indigo-600 transition-colors duration-500">{app.fullName}</p>
                                <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest italic">{app.email}</p>
                              </div>
                           </div>
                        </TableCell>
                        <td className="font-black text-2xl italic text-slate-800 uppercase tracking-tighter">{app.portfolio.replace(/-/g, ' ')}</td>
                        <td>
                          <Badge className={cn("px-10 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-2xl border-none transition-all", app.status === 'pending' ? 'bg-slate-400 text-white animate-pulse' : 'bg-indigo-600 text-white shadow-indigo-200')}>
                             {app.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="px-20 text-right">
                           <div className="flex justify-end gap-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-10 group-hover:translate-x-0">
                              <Button size="icon" variant="ghost" className="h-20 w-20 rounded-[2.5rem] bg-white shadow-2xl hover:text-indigo-600 border border-slate-100 hover:scale-110 transition-all" onClick={() => setEditingEmployment(app)}><Edit className="w-8 h-8" /></Button>
                              <Button size="icon" variant="ghost" className="h-20 w-20 rounded-[2.5rem] bg-indigo-600 text-white shadow-2xl hover:scale-110 transition-transform"><Check className="w-8 h-8" /></Button>
                           </div>
                        </td>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="website" className="space-y-16">
           <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1 space-y-16">
                <Card className="border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-[4.5rem] bg-white p-16 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/50 rounded-full translate-x-24 -translate-y-24 blur-[4rem]" />
                   <h3 className="text-3xl font-black uppercase italic mb-12 tracking-tighter relative z-10">Artifact <span className="text-indigo-600">Vault</span></h3>
                   <div className="space-y-8 relative z-10">
                      <div className="flex gap-6">
                        <Input placeholder="Inject role..." className="h-20 rounded-[1.8rem] bg-slate-50 border-none px-10 font-black italic shadow-inner flex-1 text-lg" value={newPortfolio} onChange={e => setNewPortfolio(e.target.value)} />
                        <Button onClick={() => { if(newPortfolio) { setLocalWebsite({...localWebsite, portfolios: [...localWebsite.portfolios, newPortfolio]}); setNewPortfolio(""); } }} className="h-20 w-20 rounded-[1.8rem] bg-slate-900 text-white hover:bg-black transition-all shadow-2xl shrink-0 group"><Plus className="w-10 h-10 group-hover:rotate-90 transition-transform" /></Button>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {localWebsite.portfolios.map((p, i) => (
                          <Badge key={i} className="px-8 py-4 rounded-3xl bg-indigo-50 text-indigo-600 font-black uppercase text-[11px] border-none flex gap-4 group/b shadow-sm hover:shadow-xl transition-all">
                            {p} <X className="w-5 h-5 cursor-pointer opacity-30 group-b-hover:opacity-100 transition-all" onClick={() => setLocalWebsite({...localWebsite, portfolios: localWebsite.portfolios.filter((_, idx) => idx !== i)})} />
                          </Badge>
                        ))}
                      </div>
                   </div>
                </Card>
              </div>
              <div className="lg:col-span-2 space-y-16">
                 <Card className="border-none shadow-[0_100px_200px_-50px_rgba(0,0,0,0.1)] rounded-[6rem] bg-white p-20 relative overflow-hidden border border-slate-50">
                    <div className="absolute -right-20 -bottom-20 w-[40rem] h-[40rem] bg-emerald-50/40 rounded-full blur-[10rem] pointer-events-none" />
                    <h3 className="text-5xl font-black uppercase italic mb-16 tracking-tighter relative z-10">Public <span className="text-emerald-600">Grid Protocols</span></h3>
                    <div className="space-y-12 relative z-10">
                       {localWebsite.programs.map((p, i) => (
                         <div key={p.id} className="p-12 bg-slate-50/50 rounded-[4rem] border-2 border-transparent hover:border-emerald-100 hover:bg-white transition-all duration-700 shadow-sm hover:shadow-2xl group">
                            <div className="grid gap-10">
                               <Input value={p.title} className="h-20 rounded-[1.8rem] bg-white border-none font-black uppercase text-4xl italic px-10 shadow-inner text-slate-900 group-hover:text-emerald-600 transition-colors duration-500" onChange={e => {
                                 const np = [...localWebsite.programs]; np[i].title = e.target.value; setLocalWebsite({...localWebsite, programs: np});
                               }} />
                               <Textarea value={p.description} className="bg-white border-none rounded-[2.5rem] p-10 font-bold text-slate-500 italic min-h-[160px] shadow-inner text-xl leading-relaxed focus:ring-2 focus:ring-emerald-600/20" onChange={e => {
                                 const np = [...localWebsite.programs]; np[i].description = e.target.value; setLocalWebsite({...localWebsite, programs: np});
                               }} />
                            </div>
                         </div>
                       ))}
                    </div>
                 </Card>
              </div>
           </div>
        </TabsContent>
      </Tabs>

      {/* Admission Synthesis Modal */}
      <AnimatePresence>
        {editingAdmission && (
          <Dialog open={!!editingAdmission} onOpenChange={() => setEditingAdmission(null)}>
            <DialogContent className="rounded-[6rem] p-24 max-w-4xl bg-white border-none shadow-[0_150px_300px_-80px_rgba(0,0,0,0.5)]">
               <DialogHeader>
                  <DialogTitle className="text-7xl font-black uppercase tracking-tighter italic leading-none">Intake <span className="text-blue-600">Synthesis</span></DialogTitle>
                  <p className="font-black text-slate-400 uppercase tracking-widest text-[13px] mt-10 italic leading-none">Reconciling institutional scholar enrollment artifacts</p>
               </DialogHeader>
               <form onSubmit={handleUpdateAdmission} className="space-y-16 mt-20">
                  <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-5 col-span-2">
                       <Label className="text-[11px] font-black uppercase text-slate-400 ml-6 italic">Candidate Designation Identity</Label>
                       <Input value={editingAdmission.studentName} onChange={e => setEditingAdmission({...editingAdmission, studentName: e.target.value})} className="h-24 rounded-[2.5rem] bg-slate-50 border-none font-black italic text-5xl px-12 shadow-inner text-blue-600" />
                    </div>
                    <div className="space-y-5">
                       <Label className="text-[11px] font-black uppercase text-slate-400 ml-6 italic">Guardian Protocol Hub</Label>
                       <Input value={editingAdmission.parentName} onChange={e => setEditingAdmission({...editingAdmission, parentName: e.target.value})} className="h-20 rounded-[2rem] bg-slate-50 border-none font-bold italic px-10 shadow-inner text-2xl" />
                    </div>
                    <div className="space-y-5">
                       <Label className="text-[11px] font-black uppercase text-slate-400 ml-6 italic">Requested Grid Allocation</Label>
                       <Input value={editingAdmission.classRequested} onChange={e => setEditingAdmission({...editingAdmission, classRequested: e.target.value})} className="h-20 rounded-[2rem] bg-slate-50 border-none font-black uppercase tracking-widest px-10 shadow-inner text-2xl text-slate-900" />
                    </div>
                    <div className="space-y-5 col-span-2">
                       <Label className="text-[11px] font-black uppercase text-slate-400 ml-6 italic">Registry Authorization Status</Label>
                       <Select value={editingAdmission.status} onValueChange={v => setEditingAdmission({...editingAdmission, status: v as any})}>
                          <SelectTrigger className="h-24 rounded-[2.5rem] bg-slate-50 border-none font-black uppercase tracking-[0.2em] px-12 shadow-inner text-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-[3rem] p-4 shadow-2xl">
                             <SelectItem value="pending" className="font-black text-amber-600 py-4 px-6 rounded-2xl">PENDING GRID VERIFICATION</SelectItem>
                             <SelectItem value="approved" className="font-black text-emerald-600 py-4 px-6 rounded-2xl">APPROVED PROTOCOL ACTIVE</SelectItem>
                             <SelectItem value="rejected" className="font-black text-rose-600 py-4 px-6 rounded-2xl">REJECTED ARTIFACT DECOMMISSION</SelectItem>
                          </SelectContent>
                       </Select>
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-32 bg-blue-600 hover:bg-blue-700 text-white rounded-[3.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl transition-all hover:-translate-y-4 mt-12">
                     <RefreshCcw className="w-10 h-10 mr-6 text-blue-200 animate-spin-slow" /> Synchronize Intake Record Registry
                  </Button>
               </form>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Employment Synthesis Modal */}
      <AnimatePresence>
        {editingEmployment && (
          <Dialog open={!!editingEmployment} onOpenChange={() => setEditingEmployment(null)}>
            <DialogContent className="rounded-[6rem] p-24 max-w-4xl bg-white border-none shadow-[0_150px_300px_-80px_rgba(0,0,0,0.5)]">
               <DialogHeader>
                  <DialogTitle className="text-7xl font-black uppercase tracking-tighter italic leading-none">Faculty <span className="text-indigo-600">Synthesis</span></DialogTitle>
                  <p className="font-black text-slate-400 uppercase tracking-widest text-[13px] mt-10 italic leading-none">Authorized personnel credential modification protocol</p>
               </DialogHeader>
               <form onSubmit={handleUpdateEmployment} className="space-y-16 mt-20">
                  <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-5 col-span-2">
                       <Label className="text-[11px] font-black uppercase text-slate-400 ml-6 italic">Personnel Identity Artifact</Label>
                       <Input value={editingEmployment.fullName} onChange={e => setEditingEmployment({...editingEmployment, fullName: e.target.value})} className="h-24 rounded-[2.5rem] bg-slate-50 border-none font-black italic text-5xl px-12 shadow-inner text-indigo-600" />
                    </div>
                    <div className="space-y-5">
                       <Label className="text-[11px] font-black uppercase text-slate-400 ml-6 italic">Specialization Domain</Label>
                       <Input value={editingEmployment.portfolio} onChange={e => setEditingEmployment({...editingEmployment, portfolio: e.target.value})} className="h-20 rounded-[2rem] bg-slate-50 border-none font-black italic uppercase px-10 shadow-inner text-2xl" />
                    </div>
                    <div className="space-y-5">
                       <Label className="text-[11px] font-black uppercase text-slate-400 ml-6 italic">Communication Channel Hub</Label>
                       <Input value={editingEmployment.email} onChange={e => setEditingEmployment({...editingEmployment, email: e.target.value})} className="h-20 rounded-[2rem] bg-slate-50 border-none font-bold italic px-10 shadow-inner text-xl" />
                    </div>
                    <div className="space-y-5 col-span-2">
                       <Label className="text-[11px] font-black uppercase text-slate-400 ml-6 italic">Deployment Status Protocol</Label>
                       <Select value={editingEmployment.status} onValueChange={v => setEditingEmployment({...editingEmployment, status: v as any})}>
                          <SelectTrigger className="h-24 rounded-[2.5rem] bg-slate-50 border-none font-black uppercase tracking-[0.2em] px-12 shadow-inner text-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-[3rem] p-4 shadow-2xl">
                             <SelectItem value="pending" className="font-black text-slate-400 py-4 px-6 rounded-2xl">PENDING CREDENTIAL AUDIT</SelectItem>
                             <SelectItem value="hired" className="font-black text-indigo-600 py-4 px-6 rounded-2xl">HIRED & DEPLOYED TO GRID</SelectItem>
                             <SelectItem value="rejected" className="font-black text-rose-600 py-4 px-6 rounded-2xl">REJECTED ARTIFACT DECOMMISSION</SelectItem>
                          </SelectContent>
                       </Select>
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-32 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[3.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl transition-all hover:-translate-y-4 mt-12">
                     <RefreshCcw className="w-10 h-10 mr-6 text-indigo-200 animate-spin-slow" /> Synchronize Recruitment Registry
                  </Button>
               </form>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}