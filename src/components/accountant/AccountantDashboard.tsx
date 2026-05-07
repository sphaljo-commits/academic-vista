import React, { useState } from "react";
import { User, Transaction, Class } from "@/types/auth";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Calculator, CreditCard, DollarSign, FileText, Receipt, MessageSquare, Users, BellRing, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Routes, Route, useNavigate } from "react-router-dom";
import { NotificationCenter } from "@/components/dashboard/NotificationCenter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface AccountantDashboardProps {
  user: User;
  onLogout: () => void;
}

interface StudentFeeRecord {
  id: string;
  name: string;
  className: string;
  totalFee: number;
  paidAmount: number;
  status: "Paid" | "Owing";
}

const MOCK_FEES: StudentFeeRecord[] = [
  { id: "s1", name: "John Doe", className: "Grade 10A", totalFee: 1500, paidAmount: 1500, status: "Paid" },
  { id: "s2", name: "Jane Smith", className: "Grade 10A", totalFee: 1500, paidAmount: 800, status: "Owing" },
  { id: "s3", name: "Mike Johnson", className: "Grade 11B", totalFee: 1800, paidAmount: 1800, status: "Paid" },
  { id: "s4", name: "Sarah Williams", className: "Grade 11B", totalFee: 1800, paidAmount: 0, status: "Owing" },
  { id: "s5", name: "David Brown", className: "Grade 9C", totalFee: 1200, paidAmount: 1200, status: "Paid" },
  { id: "s6", name: "Emily Davis", className: "Grade 9C", totalFee: 1200, paidAmount: 500, status: "Owing" },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "t1", name: "Alex Sterling", category: "Tuition Fee", amount: "$1,200", date: "Today", status: "Paid" },
  { id: "t2", name: "Cleaners Co.", category: "Service", amount: "$450", date: "Yesterday", status: "Pending" },
  { id: "t3", name: "Sarah Jenkins", category: "Salary", amount: "$2,800", date: "2 days ago", status: "Paid" },
  { id: "t4", name: "Book Store", category: "Supplies", amount: "$120", date: "3 days ago", status: "Paid" },
];

export function AccountantDashboard({ user, onLogout }: AccountantDashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const menuItems = [
    { label: "Dashboard", icon: Calculator, path: "/accountant" },
    { label: "Fee Management", icon: DollarSign, path: "/accountant/fees" },
    { label: "Payments", icon: CreditCard, path: "/accountant/payments" },
    { label: "Communications", icon: MessageSquare, path: "/accountant/communications" },
    { label: "Reports", icon: FileText, path: "/accountant/reports" },
  ];

  const handleSendReminder = (studentName: string) => {
    toast.success(`Reminder sent to ${studentName}'s guardian!`, {
      icon: <BellRing className="w-4 h-4 text-amber-500" />,
      description: "A quick payment reminder has been sent via email and SMS.",
    });
  };

  const FeeManagement = () => {
    const groupedFees = MOCK_FEES.reduce((acc, student) => {
      if (!acc[student.className]) acc[student.className] = [];
      acc[student.className].push(student);
      return acc;
    }, {} as Record<string, StudentFeeRecord[]>);

    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Fee Management</h2>
            <p className="text-slate-500 font-medium">Track student financial obligations and collections.</p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20 px-4 py-2 rounded-xl font-bold">Total Collected: $12,400</Badge>
            <Badge className="bg-rose-500/10 text-rose-700 border-rose-500/20 px-4 py-2 rounded-xl font-bold">Outstanding: $4,200</Badge>
          </div>
        </div>

        <div className="grid gap-8">
          {Object.entries(groupedFees).map(([className, students]) => (
            <Card key={className} className="portal-card">
              <CardHeader className="py-6 bg-slate-50/50 flex flex-row items-center justify-between px-8 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-xl shadow-sm text-indigo-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-xl font-extrabold">{className}</CardTitle>
                </div>
                <Badge className="bg-indigo-600 text-white font-bold">{students.length} Students</Badge>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-400 uppercase border-b bg-white">
                      <tr>
                        <th className="px-8 py-5">Student Name</th>
                        <th className="px-6 py-5">Contracted Fee</th>
                        <th className="px-6 py-5">Settled</th>
                        <th className="px-6 py-5">Financial Status</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id} className="border-b border-slate-50 bg-white hover:bg-slate-50/30 transition-colors">
                          <td className="px-8 py-5 font-bold text-slate-900">{student.name}</td>
                          <td className="px-6 py-5 font-medium text-slate-500">${student.totalFee}</td>
                          <td className="px-6 py-5 font-black text-emerald-600">${student.paidAmount}</td>
                          <td className="px-6 py-5">
                            <Badge 
                              className={student.status === "Paid" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 rounded-lg px-3 py-1" : "bg-rose-500/10 text-rose-600 border-rose-500/20 rounded-lg px-3 py-1"}
                            >
                              {student.status === "Paid" ? <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> : <AlertCircle className="w-3.5 h-3.5 mr-2" />}
                              {student.status}
                            </Badge>
                          </td>
                          <td className="px-8 py-5 text-right">
                            {student.status === "Owing" && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="rounded-xl border-amber-200 text-amber-600 hover:bg-amber-50 font-bold px-4"
                                onClick={() => handleSendReminder(student.name)}
                              >
                                <BellRing className="w-4 h-4 mr-2" />
                                Send Notice
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const Overview = () => (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Fiscal Management</h2>
          <p className="text-slate-500 font-medium">Manage institutional accounts and synchronized fee records.</p>
        </div>
        <Badge className="bg-indigo-600 text-white font-black px-4 py-2 rounded-xl text-xs uppercase tracking-widest">
          FY 2024 Terminal
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Total Revenue", value: "$45,280", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Fees", value: "$12,400", icon: Receipt, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Expenses", value: "$8,920", icon: CreditCard, color: "text-rose-600", bg: "bg-rose-50" },
          { label: "Net Balance", value: "$36,360", icon: Calculator, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((stat, i) => (
          <Card key={i} className="portal-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-black uppercase text-slate-400 tracking-widest">{stat.label}</CardTitle>
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="portal-card">
        <CardHeader className="border-b border-slate-50 pb-6">
          <CardTitle className="text-xl font-bold">Real-time Transaction Stream</CardTitle>
          <CardDescription>Most recent verified financial interactions.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-slate-50/50">
                <tr>
                  <th className="px-8 py-5">Entity / Vendor</th>
                  <th className="px-6 py-5">Classification</th>
                  <th className="px-6 py-5">Volume</th>
                  <th className="px-6 py-5">Timestamp</th>
                  <th className="px-8 py-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_TRANSACTIONS.map((row) => (
                  <tr key={row.id} className="border-b border-slate-50 bg-white hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 font-bold text-slate-900">{row.name}</td>
                    <td className="px-6 py-5 font-medium text-slate-500">{row.category}</td>
                    <td className="px-6 py-5 font-black text-slate-900">{row.amount}</td>
                    <td className="px-6 py-5 text-slate-400">{row.date}</td>
                    <td className="px-8 py-5 text-right">
                      <Badge className={row.status === "Paid" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-3 py-1" : "bg-amber-500/10 text-amber-600 border-amber-500/20 px-3 py-1"}>
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

  return (
    <DashboardLayout 
      user={user} 
      onLogout={onLogout} 
      menuItems={menuItems}
      portalName="Financial Control"
      portalColor="bg-indigo-600"
    >
      <Routes>
        <Route index element={<Overview />} />
        <Route path="fees" element={<FeeManagement />} />
        <Route path="communications" element={<NotificationCenter />} />
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
             <div className="p-8 bg-slate-50 rounded-[40px]">
               <Calculator className="w-16 h-16 text-slate-200" />
             </div>
             <div className="space-y-2">
               <h3 className="text-2xl font-bold text-slate-900">Module Optimization</h3>
               <p className="text-slate-500 font-medium">This administrative section is currently undergoing structural updates.</p>
             </div>
             <Button 
               className="h-12 px-8 rounded-2xl portal-gradient-accountant text-white font-bold"
               onClick={() => navigate("/accountant")}
             >
               Back to Terminal
             </Button>
          </div>
        } />
      </Routes>
    </DashboardLayout>
  );
}