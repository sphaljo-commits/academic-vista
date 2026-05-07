import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { Login } from "@/components/auth/Login";
import { Signup } from "@/components/auth/Signup";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { ParentDashboard } from "@/components/parent/ParentDashboard";
import { TeacherDashboard } from "@/components/teacher/TeacherDashboard";
import { AccountantDashboard } from "@/components/accountant/AccountantDashboard";
import { SubscriptionPage } from "@/components/landing/SubscriptionPage";
import { SchoolWebsite } from "@/components/landing/SchoolWebsite";
import { AdmissionApplicationForm } from "@/components/auth/AdmissionApplication";
import { EmploymentApplicationForm } from "@/components/auth/EmploymentApplication";
import { SchoolProvider, useSchool } from "@/context/SchoolContext";
import { User, SignupRequest } from "@/types/auth";

const INITIAL_USERS: User[] = [
  { id: "1", name: "System Admin", email: "admin@school.com", role: "admin", approved: true },
  { id: "2", name: "Alex Sterling", email: "parent@school.com", role: "parent", approved: true, childrenIds: ["s1"] },
  { 
    id: "3", 
    name: "Dr. Robert Smith", 
    email: "teacher@school.com", 
    role: "teacher", 
    approved: true,
    assignedClasses: ["Primary 1A"] 
  },
  { id: "4", name: "Sarah Accountant", email: "accountant@school.com", role: "accountant", approved: true },
];

function AppContent() {
  const { school } = useSchool();
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("school_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [signupRequests, setSignupRequests] = useState<SignupRequest[]>(() => {
    const saved = localStorage.getItem("school_signup_requests");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("school_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("school_user");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("school_signup_requests", JSON.stringify(signupRequests));
  }, [signupRequests]);

  const handleLogin = (user: User) => {
    if (!user.approved) {
      toast.error("Your account is pending approval.");
      return;
    }
    setCurrentUser(user);
    toast.success(`Welcome back, ${user.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    toast.info("Logged out.");
  };

  const handleSignup = (request: SignupRequest) => {
    setSignupRequests((prev) => [...prev, request]);
    toast.success("Signup request submitted!");
  };

  const handleApprove = (requestId: string) => {
    setSignupRequests((prev) => prev.filter((r) => r.id !== requestId));
    toast.success(`Approved!`);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Routes>
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/website" element={<SchoolWebsite />} />
        <Route path="/admission-apply" element={<AdmissionApplicationForm />} />
        <Route path="/employment-apply" element={<EmploymentApplicationForm />} />
        
        {/* Home redirects to Login as requested */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={currentUser ? <Navigate to={`/${currentUser.role}`} /> : <Login onLogin={handleLogin} users={INITIAL_USERS} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        
        <Route path="/admin/*" element={currentUser?.role === "admin" ? <AdminDashboard user={currentUser} onLogout={handleLogout} signupRequests={signupRequests} onApprove={handleApprove} /> : <Navigate to="/login" />} />
        <Route path="/parent/*" element={currentUser?.role === "parent" ? <ParentDashboard user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/teacher/*" element={currentUser?.role === "teacher" ? <TeacherDashboard user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/accountant/*" element={currentUser?.role === "accountant" ? <AccountantDashboard user={currentUser} onLogout={handleLogout} /> : <Navigate to="/login" />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </div>
  );
}

function App() {
  return (
    <SchoolProvider>
      <Router>
        <AppContent />
      </Router>
    </SchoolProvider>
  );
}

export default App;