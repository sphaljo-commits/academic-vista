import React, { useState, useEffect } from "react";
import { User, SignupRequest, Student, Class, StaffMember, ParentPerformance, Transaction } from "@/types/auth";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ShieldCheck, 
  UserPlus, 
  Users, 
  Settings, 
  Bell, 
  Check, 
  X, 
  Clock, 
  GraduationCap, 
  UserRound, 
  BookOpen, 
  Activity,
  UserCheck,
  TrendingUp,
  LayoutDashboard,
  Calculator,
  MessageSquare,
  DollarSign,
  Receipt,
  CreditCard
} from "lucide-react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { NewAdmissionForm } from "./NewAdmissionForm";
import { ClassManagement } from "./ClassManagement";
import { StaffList } from "./StaffList";
import { RankingList } from "./RankingList";
import { NotificationCenter } from "@/components/dashboard/NotificationCenter";
import { toast } from "sonner";

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  signupRequests: SignupRequest[];
  onApprove: (requestId: string) => void;
}

// Initial Mock Data
const INITIAL_CLASSES: Class[] = [
  { id: "c1", name: "Primary 1A", capacity: 30 },
  { id: "c2", name: "Primary 2B", capacity: 25 },
  { id: "c3", name: "Secondary 1", capacity: 40 },
];

const INITIAL_STUDENTS: Student[] = [
  { 
    id: "s1", name: "Alice Johnson", email: "alice@example.com", classId: "c1", 
    rollNumber: "STU-001", dateOfBirth: "2015-05-12", gender: "female", 
    address: "123 Maple St", guardianName: "Robert Johnson", guardianPhone: "555-0101", 
    admissionDate: "2023-09-01", status: "active", performanceScore: 92,
    passportPhoto: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d161c0c-e646-41d5-ac20-ccfa608a2d39/student-passport-placeholder-a40aeec2-1778103516835.webp"
  },
  { 
    id: "s2", name: "Bob Smith", email: "bob@example.com", classId: "c1", 
    rollNumber: "STU-002", dateOfBirth: "2015-08-22", gender: "male", 
    address: "456 Oak Ave", guardianName: "Jane Smith", guardianPhone: "555-0102", 
    admissionDate: "2023-09-01", status: "active", performanceScore: 78 
  },
  { 
    id: "s3", name: "Charlie Brown", email: "charlie@example.com", classId: "c2", 
    rollNumber: "STU-003", dateOfBirth: "2014-03-15", gender: "male", 
    address: "789 Pine Rd", guardianName: "Lucy Brown", guardianPhone: "555-0103", 
    admissionDate: "2023-09-01", status: "active", performanceScore: 65 
  },
];

const INITIAL_STAFF: StaffMember[] = [
  { 
    id: "st1", name: "John Miller", role: "Senior Teacher", email: "miller@school.com", 
    phone: "555-2020", department: "Science", joinDate: "2020-01-15", status: "active", performanceScore: 95 
  },
  { 
    id: "st2", name: "Sarah Jenkins", role: "Junior Teacher", email: "jenkins@school.com", 
    phone: "555-2021", department: "Mathematics", joinDate: "2022-03-10", status: "active", performanceScore: 88 
  },
  { 
    id: "st3", name: "Mark Wilson", role: "Accountant", email: "wilson@school.com", 
    phone: "555-2022", department: "Finance", joinDate: "2019-11-20", status: "active" 
  },
];

const PARENT_RANKINGS: ParentPerformance[] = [
  { id: "p1", name: "Robert Johnson", studentNames: ["Alice Johnson"], engagementScore: 98 },
  { id: "p2", name: "Jane Smith", studentNames: ["Bob Smith"], engagementScore: 85 },
  { id: "p3", name: "Lucy Brown", studentNames: ["Charlie Brown"], engagementScore: 72 },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "t1", name: "Alex Sterling", category: "Tuition Fee", amount: "$1,200", date: "Today", status: "Paid" },
  { id: "t2", name: "Cleaners Co.", category: "Service", amount: "$450", date: "Yesterday", status: "Pending" },
  { id: "t3", name: "Sarah Jenkins", category: "Salary", amount: "$2,800", date: "2 days ago", status: "Paid" },
  { id: "t4", name: "Book Store", category: "Supplies", amount: "$120", date: "3 days ago", status: "Paid" },
  { id: "t5", name: "James Wilson", category: "Tuition Fee", amount: "$1,100", date: "1 week ago", status: "Paid" },
  { id: "t6", name: "Electric Power", category: "Utilities", amount: "$850", date: "1 week ago", status: "Pending" },
];

export function AdminDashboard({ user, onLogout, signupRequests, onApprove }: AdminDashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [classes, setClasses] = useState<Class[]>(() => {
    const saved = localStorage.getItem("school_classes");
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem("school_students");
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [staff, setStaff] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem("school_staff");
    return saved ? JSON.parse(saved) : INITIAL_STAFF;
  });

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    localStorage.setItem("school_classes", JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem("school_students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("school_staff", JSON.stringify(staff));
  }, [staff]);

  const stats = [
    { label: "Total Students", value: students.length.toString(), icon: GraduationCap, color: "text-blue-600", gradient: "from-blue-50 to-indigo-50" },
    { label: "Pending Requests", value: signupRequests.length.toString(), icon: UserPlus, color: "text-amber-600", gradient: "from-amber-50 to-orange-50" },
    { label: "Active Staff", value: staff.filter(s => s.status === 'active').length.toString(), icon: UserCheck, color: "text-emerald-600", gradient: "from-emerald-50 to-teal-50" },
    { label: "Average Performance", value: "82%", icon: TrendingUp, color: "text-rose-600", gradient: "from-rose-50 to-pink-50" },
  ];

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { label: "Classes & Students", icon: BookOpen, path: "/admin/classes" },
    { label: "Accounting", icon: Calculator, path: "/admin/accounting" },
    { label: "Communications", icon: MessageSquare, path: "/admin/communications" },
    { label: "Parents Activity", icon: Activity, path: "/admin/parents" },
    { label: "Teachers Activity", icon: UserRound, path: "/admin/teachers" },
    { label: "Staff Members", icon: Users, path: "/admin/staff" },
    { label: "Approvals", icon: UserPlus, path: "/admin/approvals", badge: signupRequests.length },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const handleAddClass = (name: string) => {
    const newClass: Class = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      capacity: 30
    };
    setClasses([...classes, newClass]);
    toast.success(`Class ${name} added!`);
  };

  const handleUpdateClass = (id: string, name: string) => {
    setClasses(classes.map(c => c.id === id ? { ...c, name } : c));
    toast.success(`Class name updated to ${name}`);
  };

  const handleSaveStudent = (student: Student) => {
    if (students.find(s => s.id === student.id)) {
      setStudents(students.map(s => s.id === student.id ? student : s));
    } else {
      setStudents([...students, student]);
    }
    setEditingStudent(null);
    navigate("/admin/classes");
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    navigate("/admin/admission");
  };

  const Overview = () => (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">System Overview</h2>
          <p className="text-slate-500 font-medium">Manage your institution's digital ecosystem from one place.</p>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline"
            onClick={() => navigate("/admin/communications")}
            className="h-12 px-6 rounded-2xl border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-700 transition-all"
          >
            <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
            Notify Parents
          </Button>
          <Button 
            onClick={() => {
              setEditingStudent(null);
              navigate("/admin/admission");
            }} 
            className="h-12 px-8 rounded-2xl portal-gradient-admin text-white font-bold shadow-xl shadow-blue-500/20 hover:scale-105 transition-all"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            New Admission
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className={`portal-card bg-gradient-to-br ${stat.gradient}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold text-slate-600 uppercase tracking-wider">{stat.label}</CardTitle>
              <div className={`p-2 rounded-xl bg-white shadow-sm ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 portal-card">
          <CardHeader className="border-b border-slate-50 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Portal Activity</CardTitle>
                <CardDescription className="text-slate-400">Real-time stream of system-wide events.</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-lg">Live</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {[
                { user: "Sarah Jenkins", role: "Teacher", action: "Uploaded mid-term results", time: "2 mins ago" },
                { user: "Mark Wilson", role: "Accountant", action: "Processed fee payments", time: "15 mins ago" },
                { user: "Robert Sterling", role: "Parent", action: "Downloaded report card", time: "45 mins ago" },
                { user: "Admin", role: "Admin", action: "Updated system settings", time: "1 hour ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-5 group transition-all">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-slate-50 group-hover:border-blue-100 transition-colors">
                      <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">{activity.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold text-slate-900">
                      {activity.user} <span className="text-xs text-blue-600 font-bold ml-1">({activity.role})</span>
                    </p>
                    <p className="text-sm text-slate-500 font-medium">{activity.action}</p>
                  </div>
                  <div className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 portal-card">
          <CardHeader className="border-b border-slate-50 pb-6">
            <CardTitle className="text-xl font-bold">Network Health</CardTitle>
            <CardDescription>Section-wise availability status.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                { name: "Teacher Portal", status: "Online", color: "bg-emerald-500", users: "12 active", sub: "Academic systems operational" },
                { name: "Parent Portal", status: "Online", color: "bg-emerald-500", users: "85 active", sub: "Messaging & results active" },
                { name: "Accountant Portal", status: "Online", color: "bg-emerald-500", users: "2 active", sub: "Billing systems synchronized" },
              ].map((portal, i) => (
                <div key={i} className="p-5 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-blue-100 transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3.5 h-3.5 rounded-full ${portal.color} shadow-lg shadow-${portal.color.replace('bg-', '')}/30 animate-pulse`} />
                      <span className="font-bold text-slate-900">{portal.name}</span>
                    </div>
                    <Badge variant="outline" className="bg-white text-[10px] font-black uppercase tracking-widest">{portal.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400 font-medium">{portal.sub}</p>
                    <p className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{portal.users}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const AccountingView = () => (
    <div className="space-y-10">
      <div className="space-y-1">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Institutional Ledger</h2>
        <p className="text-slate-500 font-medium">Full visibility into financial flows and records.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Revenue", value: "$45,280", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending", value: "$12,400", icon: Receipt, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Expenses", value: "$8,920", icon: CreditCard, color: "text-rose-600", bg: "bg-rose-50" },
          { label: "Net", value: "$36,360", icon: Calculator, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((stat, i) => (
          <Card key={i} className="portal-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-black uppercase text-slate-400 tracking-widest">{stat.label}</CardTitle>
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-slate-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="portal-card">
        <CardHeader className="border-b border-slate-50 pb-6">
          <CardTitle className="text-xl font-bold">Master Transaction Ledger</CardTitle>
          <CardDescription>Comprehensive audit trail for all portal transactions.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-slate-50/50">
                <tr>
                  <th className="px-8 py-5">Entity Name</th>
                  <th className="px-6 py-5">Classification</th>
                  <th className="px-6 py-5">Volume</th>
                  <th className="px-6 py-5">Timestamp</th>
                  <th className="px-8 py-5 text-right">Verification</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_TRANSACTIONS.map((row) => (
                  <tr key={row.id} className="border-b border-slate-50 bg-white hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 font-bold text-slate-900">{row.name}</td>
                    <td className="px-6 py-5 font-medium text-slate-500">{row.category}</td>
                    <td className="px-6 py-5 font-black text-slate-900">{row.amount}</td>
                    <td className="px-6 py-5 text-slate-400 font-medium">{row.date}</td>
                    <td className="px-8 py-5 text-right">
                      <Badge className={row.status === "Paid" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-3 py-1 rounded-lg" : "bg-amber-500/10 text-amber-600 border-amber-500/20 px-3 py-1 rounded-lg"}>
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const Approvals = () => (
    <Card className="portal-card">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-6">
        <div>
          <CardTitle className="text-xl font-bold">Authorization Requests</CardTitle>
          <CardDescription>Audit and grant access to institutional portals.</CardDescription>
        </div>
        <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black">
          {signupRequests.length}
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        {signupRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="bg-slate-50 p-8 rounded-[40px] transform rotate-3">
              <Check className="w-16 h-16 text-emerald-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Zero Pending Tasks</h3>
              <p className="text-slate-500 font-medium">All portal access requests have been processed successfully.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {signupRequests.map((request) => (
              <div key={request.id} className="flex flex-col space-y-5 p-6 rounded-[24px] border border-slate-100 bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14 border-4 border-slate-50 shadow-sm">
                    <AvatarFallback className="bg-blue-600 text-white font-black text-xl">{request.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-slate-900">{request.name}</p>
                      <Badge className="capitalize bg-slate-900 text-white font-bold rounded-lg">{request.requestedRole}</Badge>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">{request.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                  <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <Clock className="w-3.5 h-3.5 mr-2" /> Received {new Date(request.requestDate).toLocaleDateString()}
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="h-10 px-5 rounded-xl text-rose-600 border-rose-100 hover:bg-rose-50 font-bold"
                    >
                      Reject
                    </Button>
                    <Button 
                      className="h-10 px-6 rounded-xl portal-gradient-admin text-white font-bold"
                      onClick={() => onApprove(request.id)}
                    >
                      Authorize
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout 
      user={user} 
      onLogout={onLogout} 
      menuItems={menuItems}
      portalName="Institutional Command"
      portalColor="bg-blue-600"
    >
      <Routes>
        <Route index element={<Overview />} />
        <Route path="classes" element={
          <ClassManagement 
            classes={classes} 
            students={students} 
            onUpdateClass={handleUpdateClass}
            onAddClass={handleAddClass}
            onEditStudent={handleEditStudent}
          />
        } />
        <Route path="accounting" element={<AccountingView />} />
        <Route path="communications" element={<NotificationCenter />} />
        <Route path="admission" element={
          <NewAdmissionForm 
            classes={classes} 
            onSave={handleSaveStudent} 
            onCancel={() => navigate("/admin/classes")}
            initialData={editingStudent || undefined}
          />
        } />
        <Route path="parents" element={
          <RankingList 
            title="Guardian Engagement Metrics" 
            description="Quantifiable performance metrics based on student success and school interaction."
            items={PARENT_RANKINGS.map((p, i) => ({
              id: p.id,
              name: p.name,
              subtext: `Guardian of ${p.studentNames.join(', ')}`,
              score: p.engagementScore,
              rank: i + 1,
              trend: i === 0 ? 'up' : i === 1 ? 'stable' : 'down'
            }))}
            type="Parent"
          />
        } />
        <Route path="teachers" element={
          <RankingList 
            title="Academic Faculty Performance" 
            description="Performance indicators derived from student progression and classroom efficacy."
            items={staff
              .filter(s => s.role.includes('Teacher'))
              .map((s, i) => ({
                id: s.id,
                name: s.name,
                subtext: `${s.role} - ${s.department} Department`,
                score: s.performanceScore || 0,
                rank: i + 1,
                trend: i === 0 ? 'up' : 'stable'
              }))}
            type="Teacher"
          />
        } />
        <Route path="staff" element={<StaffList staff={staff} />} />
        <Route path="approvals" element={<Approvals />} />
        <Route path="settings" element={
          <Card className="portal-card">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Institutional Settings</CardTitle>
              <CardDescription>Global configuration for portal authorization and governance.</CardDescription>
            </CardHeader>
            <CardContent className="py-12 flex flex-col items-center justify-center text-center">
              <div className="p-6 bg-slate-50 rounded-[32px] mb-4">
                <Settings className="w-12 h-12 text-slate-300" />
              </div>
              <p className="text-lg font-bold text-slate-900">System Configuration Terminal</p>
              <p className="text-sm text-slate-500">This module is restricted to high-level administrative tasks.</p>
            </CardContent>
          </Card>
        } />
      </Routes>
    </DashboardLayout>
  );
}