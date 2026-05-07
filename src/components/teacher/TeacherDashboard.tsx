import React from "react";
import { User } from "@/types/auth";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GraduationCap, BookOpen, Calendar, MessageSquare, ClipboardList, AlertCircle, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TeacherDashboardProps {
  user: User;
  onLogout: () => void;
}

export function TeacherDashboard({ user, onLogout }: TeacherDashboardProps) {
  const navigate = useNavigate();
  const menuItems = [
    { label: "Dashboard", icon: GraduationCap, path: "/teacher" },
    { label: "My Classes", icon: BookOpen, path: "/teacher/classes" },
    { label: "Attendance", icon: Calendar, path: "/teacher/attendance" },
    { label: "Gradebook", icon: ClipboardList, path: "/teacher/grades" },
    { label: "Messages", icon: MessageSquare, path: "/teacher/messages" },
  ];

  const assignedClasses = user.assignedClasses || [];
  const hasAssignedClasses = assignedClasses.length > 0;

  const MOCK_SCHEDULE = [
    { time: "09:00 AM", subject: "Physics", class: "Grade 10A", room: "Lab 2" },
    { time: "11:30 AM", subject: "Maths", class: "Grade 11B", room: "Room 104" },
    { time: "02:00 PM", subject: "Science", class: "Grade 9C", room: "Lab 1" },
    { time: "03:30 PM", subject: "Advanced IT", class: "Grade 12D", room: "Tech Lab" },
  ].filter(item => assignedClasses.includes(item.class));

  return (
    <DashboardLayout 
      user={user} 
      onLogout={onLogout} 
      menuItems={menuItems}
      portalName="Academic Portal"
      portalColor="bg-emerald-600"
    >
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Teacher Workspace</h2>
            <p className="text-slate-500 font-medium">Welcome back, {user.name}. Here is your academic schedule.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Cohorts:</span>
            <div className="flex gap-2 flex-wrap justify-end">
              {hasAssignedClasses ? (
                assignedClasses.map(cls => (
                  <Badge key={cls} variant="secondary" className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20 px-3 py-1.5 rounded-xl font-bold">
                    {cls}
                  </Badge>
                ))
              ) : (
                <Badge className="bg-rose-500 text-white font-bold rounded-xl px-3 py-1.5">None Assigned</Badge>
              )}
            </div>
          </div>
        </div>

        {!hasAssignedClasses ? (
          <Card className="portal-card border-2 border-dashed border-slate-200 bg-slate-50/30">
            <CardContent className="flex flex-col items-center justify-center py-24 text-center space-y-6">
              <div className="p-8 bg-white rounded-[40px] shadow-sm">
                <AlertCircle className="w-16 h-16 text-slate-200" />
              </div>
              <div className="space-y-2 max-w-sm">
                <h3 className="text-2xl font-bold text-slate-900">No Class Assignment</h3>
                <p className="text-slate-500 font-medium">
                  You haven't been assigned to any classes yet. Please reach out to the administrative office for setup.
                </p>
              </div>
              <Button 
                className="h-12 px-8 rounded-2xl portal-gradient-teacher text-white font-bold shadow-xl shadow-emerald-500/20"
                onClick={() => navigate("/teacher/messages")}
              >
                Contact Administration
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="portal-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-slate-50">
                <CardTitle className="text-xl font-bold text-slate-900">Today's Schedule</CardTitle>
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                  <Calendar className="w-5 h-5" />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-5">
                  {MOCK_SCHEDULE.length > 0 ? (
                    MOCK_SCHEDULE.map((item, i) => (
                      <div key={i} className="flex items-center gap-5 p-4 rounded-2xl bg-emerald-50/30 border border-emerald-500/10 group hover:bg-white hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5 transition-all">
                        <div className="text-center min-w-[70px]">
                          <p className="text-xs font-black text-emerald-600 uppercase tracking-tighter">{item.time.split(' ')[1]}</p>
                          <p className="text-lg font-black text-slate-900">{item.time.split(' ')[0]}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors">{item.subject}</p>
                          <p className="text-xs font-bold text-slate-500">{item.class} • {item.room}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                       <p className="text-sm font-medium text-slate-400 italic text-balance">No teaching sessions found for today's assignment.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 portal-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-slate-50">
                <CardTitle className="text-xl font-bold text-slate-900">Cohort Insights</CardTitle>
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                  <Users className="w-5 h-5" />
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  {assignedClasses.map((cls, i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-[24px] border border-slate-100 bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xl font-black group-hover:scale-110 transition-transform">
                          {cls.split(' ')[1][0]}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-lg font-bold text-slate-900">{cls}</p>
                          <p className="text-sm font-medium text-slate-500">32 Registered Students</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Avg Progression</p>
                        <p className="text-2xl font-black text-emerald-600">78%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}