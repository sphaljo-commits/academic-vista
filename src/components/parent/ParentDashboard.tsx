import React, { useState } from "react";
import { User, Student, TerminalReport } from "@/types/auth";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StudentProfile } from "@/components/dashboard/StudentProfile";
import { AttendanceSummary } from "@/components/dashboard/AttendanceSummary";
import { TeacherRemarks } from "@/components/dashboard/TeacherRemarks";
import { AcademicOverview } from "@/components/dashboard/AcademicOverview";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  Award,
  TrendingUp,
  Clock,
  Download,
  FileText,
  ChevronRight,
  Sparkles,
  Zap,
  Target,
  CheckCircle2,
  Shield,
  Activity,
  UserCheck,
  GraduationCap,
  History
} from "lucide-react";
import { HomeworkTracker } from "./HomeworkTracker";
import { SchoolCalendar } from "@/components/shared/SchoolCalendar";
import { TerminalReportCard } from "@/components/dashboard/TerminalReport";
import { motion, AnimatePresence } from "framer-motion";
import { useSchool } from "@/context/SchoolContext";
import { Routes, Route, useNavigate } from "react-router-dom";

interface ParentDashboardProps {
  user: User;
  onLogout: () => void;
}

const MOCK_CHILDREN: Student[] = [
  { 
    id: "s1", name: "Alex Sterling", email: "alex@example.com", classId: "c1", 
    rollNumber: "ST-2024-0891", dateOfBirth: "2010-05-12", gender: "male", 
    address: "123 Maple St", guardianName: "Robert Sterling", guardianPhone: "555-0101", 
    admissionDate: "2023-09-01", status: "active", performanceScore: 92,
    passportPhoto: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d161c0c-e646-41d5-ac20-ccfa608a2d39/student-photo-e831ca81-1778094555108.webp"
  },
  { 
    id: "s2", name: "Jamie Sterling", email: "jamie@example.com", classId: "c2", 
    rollNumber: "ST-2024-0892", dateOfBirth: "2012-08-22", gender: "female", 
    address: "123 Maple St", guardianName: "Robert Sterling", guardianPhone: "555-0101", 
    admissionDate: "2023-09-01", status: "active", performanceScore: 85,
    passportPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
  },
];

const MOCK_REPORT: TerminalReport = {
  studentId: "s1",
  term: "Second Term",
  session: "2023/2024",
  grades: [
    { studentId: "s1", subject: "Mathematics", classScore: 18, homeworkScore: 19, examScore: 55, totalMark: 92, grade: "A", remarks: "Excellent" },
    { studentId: "s1", subject: "English Language", classScore: 15, homeworkScore: 17, examScore: 48, totalMark: 80, grade: "A-", remarks: "Very Good" },
    { studentId: "s1", subject: "Integrated Science", classScore: 19, homeworkScore: 18, examScore: 54, totalMark: 91, grade: "A", remarks: "Brilliant" },
    { studentId: "s1", subject: "Social Studies", classScore: 16, homeworkScore: 15, examScore: 45, totalMark: 76, grade: "B+", remarks: "Great improvement" },
    { studentId: "s1", subject: "Computer Science", classScore: 20, homeworkScore: 20, examScore: 58, totalMark: 98, grade: "A+", remarks: "Exceptional" }
  ],
  behavior: {
    studentId: "s1",
    punctuality: "A",
    neatness: "A",
    politeness: "A",
    cooperation: "B",
    leadership: "B",
    emotionalStability: "A"
  },
  teacherRemark: "Alex is an exceptionally diligent scholar who consistently demonstrates pedagogical leadership and critical analytical skills.",
  principalRemark: "Promoted to advanced academic tier with distinction. Maintain the current trajectory of excellence.",
  promotionStatus: "promoted",
  nextTermStart: "2024-09-12"
};

export function ParentDashboard({ user, onLogout }: ParentDashboardProps) {
  const { school } = useSchool();
  const navigate = useNavigate();
  const [selectedChildId, setSelectedChildId] = useState(MOCK_CHILDREN[0].id);
  const selectedChild = MOCK_CHILDREN.find(c => c.id === selectedChildId) || MOCK_CHILDREN[0];

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/parent" },
    { label: "Scholar Registry", icon: Users, path: "/parent/children" },
    { label: "Academic Records", icon: Award, path: "/parent/records" },
    { label: "Homework Hub", icon: BookOpen, path: "/parent/homework" },
    { label: "Institutional Calendar", icon: Calendar, path: "/parent/calendar" },
  ];

  const ChildSelector = () => (
    <div className="flex items-center gap-3 p-2 bg-slate-200/50 backdrop-blur rounded-[1.5rem] border border-slate-200">
      {MOCK_CHILDREN.map(child => (
        <button
          key={child.id}
          onClick={() => setSelectedChildId(child.id)}
          className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl transition-all ${
            selectedChildId === child.id 
              ? "bg-white text-primary shadow-xl shadow-slate-200/50 scale-[1.02] border border-slate-100" 
              : "text-slate-500 hover:text-slate-700 hover:bg-white/30"
          }`}
        >
          <Avatar className="h-7 w-7 border-2 border-white shadow-sm">
            <AvatarImage src={child.passportPhoto} className="object-cover" />
            <AvatarFallback className="bg-slate-100 text-primary font-black text-[10px]">{child.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs font-black uppercase tracking-widest">{child.name.split(' ')[0]}</span>
        </button>
      ))}
    </div>
  );

  const Overview = () => (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-10 rounded-[2.5rem] border border-slate-200/50 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-4xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Parent <span className="text-slate-400 not-italic">Dashboard</span></h2>
          <p className="text-slate-500 font-medium tracking-tight">Welcome back, {user.name.split(' ')[0]}. Monitoring academic trajectory for your scholars.</p>
        </div>
        <ChildSelector />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedChildId}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-10"
        >
          <StudentProfile 
            name={selectedChild.name} 
            studentId={selectedChild.rollNumber} 
            className={selectedChild.classId === "c1" ? "Primary 1A" : "Primary 2B"}
            photoUrl={selectedChild.passportPhoto || ""}
            academicYear="2023 / 2024"
          />

          <Tabs defaultValue="academic" className="w-full space-y-10">
            <TabsList className="bg-slate-200/50 p-2 rounded-[2rem] border border-slate-200 w-full md:w-auto h-auto flex flex-wrap gap-2">
              <TabsTrigger value="academic" className="rounded-[1.25rem] px-8 h-12 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-primary transition-all">
                Pedagogical Status
              </TabsTrigger>
              <TabsTrigger value="behavior" className="rounded-[1.25rem] px-8 h-12 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-primary transition-all">
                Growth & Behavior
              </TabsTrigger>
              <TabsTrigger value="attendance" className="rounded-[1.25rem] px-8 h-12 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-primary transition-all">
                Presence Audit
              </TabsTrigger>
            </TabsList>

            <TabsContent value="academic" className="m-0 outline-none">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                  <AcademicOverview />
                </div>
                <div className="space-y-10">
                   <Card className="academic-card border-none bg-slate-900 text-white rounded-[2.5rem] shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                       <Award className="w-32 h-32 rotate-12" />
                    </div>
                    <CardHeader className="p-10 relative z-10">
                      <CardTitle className="text-2xl font-black uppercase tracking-tight italic flex items-center gap-3">
                        <TrendingUp className="h-6 w-6 text-emerald-400" /> Excellence Index
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 pt-0 relative z-10">
                      <div className="flex items-baseline gap-3">
                         <span className="text-7xl font-black italic tracking-tighter">{selectedChild.performanceScore}%</span>
                         <span className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Global Avg</span>
                      </div>
                      <p className="text-slate-400 text-sm font-medium leading-relaxed mt-6 italic">
                        {selectedChild.name.split(' ')[0]} is currently outperforming the divisional baseline of 78.4%. Strategic focus on STEM disciplines is yielding high-tier results.
                      </p>
                      <div className="mt-8 pt-8 border-t border-white/5">
                         <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-14 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-900/20">
                            Download Term Prediction
                         </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <TeacherRemarks 
                    teacherName="Dr. Sarah Mitchell"
                    subject="Head of Academic Division"
                    remark={`${selectedChild.name.split(' ')[0]} continues to exhibit a sophisticated understanding of complex modules. Their contribution to collaborative seminars is exemplary and provides a positive benchmark for peers.`}
                    avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="behavior" className="m-0 outline-none">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <Card className="lg:col-span-2 academic-card border-none shadow-2xl overflow-hidden bg-white rounded-[2.5rem]">
                  <CardHeader className="p-10 bg-slate-50/50 border-b border-slate-100">
                    <CardTitle className="text-3xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Ethical & Social <br /> <span className="text-slate-400 not-italic">Assessment</span></CardTitle>
                    <CardDescription className="font-medium text-slate-500 italic mt-3">Formal evaluation of conduct and emotional intelligence metrics.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[ 
                        { label: "Punctuality", val: "A", icon: Clock, color: "text-emerald-500", bg: "bg-emerald-50" }, 
                        { label: "Personal Hygiene", val: "A", icon: Sparkles, color: "text-blue-500", bg: "bg-blue-50" }, 
                        { label: "Politeness", val: "B+", icon: Users, color: "text-indigo-500", bg: "bg-indigo-50" }, 
                        { label: "Synergy", val: "A-", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
                        { label: "Leadership", val: "B", icon: Award, color: "text-rose-500", bg: "bg-rose-50" },
                        { label: "Integrity", val: "A", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
                        { label: "Initiative", val: "B+", icon: Target, color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "Discipline", val: "A-", icon: Shield, color: "text-slate-700", bg: "bg-slate-100" }
                      ].map((item, i) => (
                        <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-transparent flex flex-col items-center gap-3 group hover:bg-white hover:shadow-2xl hover:border-slate-100 transition-all cursor-default">
                          <div className={`p-3 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform shadow-sm`}>
                            <item.icon className="w-5 h-5" />
                          </div>
                          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">{item.label}</span>
                          <span className="text-4xl font-black italic text-slate-900 tracking-tighter">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-10">
                  <Card className="academic-card border-none bg-emerald-600 text-white rounded-[2.5rem] shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <UserCheck className="w-32 h-32 rotate-12" />
                    </div>
                    <CardHeader className="p-10 relative z-10">
                      <CardTitle className="text-2xl font-black uppercase tracking-tight italic">Societal Conduct</CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 pt-0 relative z-10">
                      <p className="text-lg font-medium leading-relaxed opacity-90 italic">
                        "{selectedChild.name.split(' ')[0]} is a quintessential role model for the divisional cohort. They demonstrate profound empathy and are consistently proactive in mentorship."
                      </p>
                      <div className="mt-10 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center border border-white/20 backdrop-blur-md">
                          <Users className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest">Institutional Counselor</p>
                          <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">Updated 48h ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="academic-card border-none shadow-xl bg-white rounded-[2.5rem]">
                    <CardHeader className="p-10 pb-4">
                      <CardTitle className="text-xl font-black uppercase tracking-tight italic flex items-center gap-3">
                         <Target className="w-6 h-6 text-primary" /> Strategic Goals
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 pt-0 space-y-4">
                      <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all group">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-700 group-hover:text-primary transition-colors">Refine Public Rhetoric Skills</span>
                      </div>
                      <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all group">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-lg shadow-blue-200" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-700 group-hover:text-primary transition-colors">Master Robotics Tier III Logic</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attendance" className="m-0 outline-none">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <AttendanceSummary present={42} absent={3} late={2} total={47} />
                <Card className="academic-card border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
                   <CardHeader className="p-10 pb-6 text-center border-b border-slate-50 bg-slate-50/30">
                      <CardTitle className="text-2xl font-black uppercase tracking-tighter italic text-slate-900">Monthly Engagement Stream</CardTitle>
                      <CardDescription className="font-medium text-slate-500 italic mt-2">Punctuality trends for the current academic session.</CardDescription>
                   </CardHeader>
                   <CardContent className="p-10 pt-10">
                      <div className="space-y-10">
                        {[
                          { month: "October Cycle", rate: 94, detail: "42 Verified, 3 Absences", color: "bg-slate-900" },
                          { month: "September Cycle", rate: 98, detail: "46 Verified, 1 Absence", color: "bg-emerald-600" },
                          { month: "August Cycle", rate: 96, detail: "44 Verified, 2 Absences", color: "bg-blue-600" },
                        ].map((log, i) => (
                          <div key={i} className="space-y-4">
                            <div className="flex justify-between items-end">
                               <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{log.month}</p>
                                  <p className="text-sm font-black uppercase italic text-slate-800">{log.detail}</p>
                               </div>
                               <span className="text-3xl font-black italic tracking-tighter text-slate-900 leading-none">{log.rate}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 whileInView={{ width: `${log.rate}%` }}
                                 transition={{ duration: 1.5, delay: i * 0.2 }}
                                 className={`h-full ${log.color} rounded-full`} 
                               />
                            </div>
                          </div>
                        ))}
                      </div>
                   </CardContent>
                   <div className="bg-slate-50/50 p-6 text-center border-t border-slate-100">
                      <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2 mx-auto">
                        <Download className="w-3 h-3" /> Export Detailed Presence Log
                      </button>
                   </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  const ChildrenView = () => (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200/50 shadow-sm">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Scholar <span className="text-slate-400 not-italic">Registry</span></h2>
        <p className="text-slate-500 font-medium mt-2">Registered academic candidates under your guardianship at {school?.name || 'the academy'}.</p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {MOCK_CHILDREN.map((child, idx) => (
          <motion.div key={child.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
            <Card className="academic-card border-none overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all group bg-white rounded-[2.5rem]">
                <div className="h-40 bg-slate-900 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-60" />
                <img src="https://images.unsplash.com/photo-1523050853064-7546401666e8?auto=format&fit=crop&q=80&w=1200&h=400" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" alt="bg" />
                <div className="absolute bottom-6 left-8 z-20 flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                      <GraduationCap className="w-6 h-6" />
                   </div>
                   <Badge className="bg-emerald-500 text-white border-none rounded-lg font-black uppercase text-[8px] tracking-widest">Verified Scholar</Badge>
                </div>
                </div>
                <CardContent className="p-10 -mt-16 relative z-20">
                <Avatar className="h-28 w-28 border-4 border-white shadow-2xl mb-8 rounded-[1.75rem] group-hover:scale-105 transition-transform">
                    <AvatarImage src={child.passportPhoto} className="object-cover" />
                    <AvatarFallback className="bg-slate-100 text-slate-900 font-black text-3xl">{child.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900 italic leading-none group-hover:text-primary transition-colors">{child.name}</h3>
                    <p className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-400">Registry: {child.rollNumber}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-10">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-transparent group-hover:border-slate-100 transition-colors">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Division</p>
                    <p className="font-black text-slate-800 uppercase italic tracking-tight">{child.classId === "c1" ? "Primary 1A" : "Primary 2B"}</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-transparent group-hover:border-slate-100 transition-colors">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Supervisory Lead</p>
                    <p className="font-black text-slate-800 uppercase italic tracking-tight">Dr. Sarah M.</p>
                    </div>
                </div>
                <Button onClick={() => { setSelectedChildId(child.id); navigate("/parent"); }} className="w-full mt-8 bg-slate-900 hover:bg-black text-white rounded-2xl h-14 font-black uppercase tracking-widest text-[10px] shadow-xl group-hover:shadow-indigo-200 transition-all">
                    Access Scholar Analytics <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
                </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const RecordsView = () => (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
       <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200/50 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Pedagogical <span className="text-slate-400 not-italic">Records</span></h2>
          <p className="text-slate-500 font-medium tracking-tight">Terminal performance reports and official institutional certificates.</p>
        </div>
        <ChildSelector />
      </div>

      <Card className="academic-card border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
        <CardContent className="p-10">
           <div className="flex flex-col md:flex-row items-center justify-between mb-10 pb-10 border-b border-slate-100 gap-6">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-[1.25rem] bg-slate-900 flex items-center justify-center text-white shadow-xl">
                   <Award className="w-8 h-8" />
                </div>
                <div>
                   <h3 className="text-3xl font-black uppercase tracking-tighter italic text-slate-900 leading-none">Primary Performance Ledger</h3>
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Academic Session 2023/2024 — Term Cycle II</p>
                </div>
             </div>
             <div className="flex gap-3">
                <Button variant="outline" className="rounded-2xl h-14 font-black uppercase tracking-widest text-[10px] px-8 border-slate-200 shadow-sm hover:bg-primary/5 hover:text-primary transition-all">
                  <Download className="w-4 h-4 mr-2" /> PDF Ledger
                </Button>
                <Button className="bg-slate-900 hover:bg-black text-white rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-[10px] shadow-xl">
                   Request Official Transcript
                </Button>
             </div>
           </div>
           <TerminalReportCard student={selectedChild} report={MOCK_REPORT} school={school} />
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <div className="flex items-center gap-3 px-4">
           <History className="w-5 h-5 text-slate-400" />
           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Historical Academic Archive</h4>
        </div>
        {[
          { term: "Term Cycle I", session: "2023/2024", date: "Dec 15, 2023", grade: "A", color: "text-emerald-600", bg: "bg-emerald-50" },
          { term: "Term Cycle III", session: "2022/2023", date: "July 22, 2023", grade: "A-", color: "text-blue-600", bg: "bg-blue-50" },
          { term: "Term Cycle II", session: "2022/2023", date: "April 05, 2023", grade: "B+", color: "text-indigo-600", bg: "bg-indigo-50" },
        ].map((i, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
            <div className="p-8 bg-white rounded-[2rem] border border-slate-200/50 flex items-center justify-between hover:border-primary/20 hover:shadow-2xl transition-all cursor-pointer group">
                <div className="flex items-center gap-8">
                <div className={`w-16 h-16 rounded-[1.25rem] ${i.bg} flex items-center justify-center ${i.color} group-hover:scale-110 transition-all border border-transparent group-hover:border-current/20 shadow-sm`}>
                    <FileText className="w-8 h-8" />
                </div>
                <div>
                    <p className="text-2xl font-black uppercase tracking-tight text-slate-800 italic group-hover:text-primary transition-colors leading-none">{i.term} Ledger Review</p>
                    <div className="flex items-center gap-4 mt-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Session {i.session}</p>
                    <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Released: {i.date}</p>
                    </div>
                </div>
                </div>
                <div className="flex items-center gap-10">
                <div className="text-right hidden sm:block">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Final Index</p>
                    <p className={`text-3xl font-black italic tracking-tighter ${i.color}`}>{i.grade}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-300 group-hover:text-primary group-hover:bg-primary/5 rounded-2xl h-14 w-14 transition-all border border-transparent group-hover:border-primary/10 shadow-sm">
                    <Download className="w-6 h-6" />
                </Button>
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <DashboardLayout user={user} onLogout={onLogout} menuItems={menuItems} portalName="Parent Portal" portalColor="bg-slate-700">
      <Routes>
        <Route index element={<Overview />} />
        <Route path="children" element={<ChildrenView />} />
        <Route path="records" element={<RecordsView />} />
        <Route path="homework" element={<HomeworkTracker childId={selectedChild.id} childName={selectedChild.name.split(' ')[0]} />} />
        <Route path="calendar" element={<SchoolCalendar />} />
      </Routes>
    </DashboardLayout>
  );
}