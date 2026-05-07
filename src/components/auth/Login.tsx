import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UserRole, User } from "@/types/auth";
import { ShieldCheck, UserRound, GraduationCap, Calculator, ArrowLeft, School as SchoolIcon, UserPlus, Globe, Briefcase, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSchool } from "@/context/SchoolContext";

interface LoginProps {
  onLogin: (user: User) => void;
  users: User[];
}

export function Login({ onLogin, users }: LoginProps) {
  const { school } = useSchool();
  const [selectedPortal, setSelectedPortal] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePortalSelect = (role: UserRole) => {
    setSelectedPortal(role);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const foundUser = users.find(u => u.role === selectedPortal && (u.email === email || email === "admin@school.com" || email === "parent@school.com" || email === "teacher@school.com" || email === "accountant@school.com"));
    
    if (foundUser) {
      onLogin(foundUser);
    } else {
      // Mock login for demo purposes
      onLogin({
        id: Math.random().toString(),
        name: `Mock ${selectedPortal}`,
        email: email,
        role: selectedPortal!,
        approved: true
      });
    }
  };

  const portalOptions = [
    { id: "admin" as UserRole, label: "Administration", icon: ShieldCheck, color: "bg-slate-900", accent: "border-slate-800", text: "Enterprise control & oversight" },
    { id: "parent" as UserRole, label: "Parent Portal", icon: UserRound, color: "bg-primary", accent: "border-primary/50", text: "Child progress & tracking" },
    { id: "teacher" as UserRole, label: "Teachers Portal", icon: GraduationCap, color: "bg-emerald-600", accent: "border-emerald-500/50", text: "Classroom & grade management" },
    { id: "accountant" as UserRole, label: "Accountants Portal", icon: Calculator, color: "bg-indigo-600", accent: "border-indigo-500", text: "Fees & financial records" },
  ];

  const schoolName = school?.name || "Academix Pro";

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-slate-950">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d161c0c-e646-41d5-ac20-ccfa608a2d39/school-campus-3958219c-1778106727316.webp" 
          alt="School Environment" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <header className="text-center mb-16">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl">
              <SchoolIcon className="w-10 h-10 text-primary" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">{schoolName}</h1>
              <p className="text-slate-400 font-bold tracking-[0.3em] text-[10px] uppercase">Education Management System</p>
            </div>
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {!selectedPortal ? (
            <motion.div
              key="portal-selection"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {portalOptions.map((option, idx) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => handlePortalSelect(option.id)}
                    className="group relative flex flex-col p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 text-left transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-primary/20"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${option.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <option.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-black text-white mb-2 italic tracking-tighter uppercase">{option.label}</h3>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">{option.text}</p>
                    <div className="mt-8 flex items-center text-xs font-black text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Enter Portal <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 bg-white/5 p-4 rounded-[32px] border border-white/10 backdrop-blur-sm">
                <Button 
                  variant="ghost"
                  className="text-white hover:bg-white/10 px-6 h-12 rounded-2xl font-bold"
                  onClick={() => navigate("/website")}
                >
                  <Globe className="mr-2 h-4 w-4 text-primary" /> Public Website
                </Button>
                <Button 
                  variant="ghost"
                  className="text-white hover:bg-white/10 px-6 h-12 rounded-2xl font-bold"
                  onClick={() => navigate("/admission-apply")}
                >
                  <UserPlus className="mr-2 h-4 w-4 text-emerald-400" /> Apply for Admission
                </Button>
                <Button 
                  variant="ghost"
                  className="text-white hover:bg-white/10 px-6 h-12 rounded-2xl font-bold"
                  onClick={() => navigate("/employment-apply")}
                >
                  <Briefcase className="mr-2 h-4 w-4 text-amber-400" /> Career Opportunities
                </Button>
                <div className="w-px h-8 bg-white/10 mx-2" />
                <Button 
                  onClick={() => navigate("/signup")}
                  className="bg-primary hover:bg-primary/90 text-white px-8 h-12 rounded-2xl font-black shadow-lg shadow-primary/20 uppercase tracking-widest text-[10px]"
                >
                  <Sparkles className="mr-2 h-4 w-4" /> Create Account
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md mx-auto"
            >
              <Card className="border-white/10 bg-white/5 backdrop-blur-2xl text-white shadow-2xl rounded-[40px] overflow-hidden">
                <div className={`h-2 w-full ${portalOptions.find(p => p.id === selectedPortal)?.color}`} />
                <CardHeader className="p-10 pb-6">
                  <button 
                    className="flex items-center text-slate-400 hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest"
                    onClick={() => setSelectedPortal(null)}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Switch Portal
                  </button>
                  <CardTitle className="text-3xl font-black tracking-tight mb-2 italic uppercase">
                    {portalOptions.find(p => p.id === selectedPortal)?.label}
                  </CardTitle>
                  <CardDescription className="text-slate-400 font-medium">Enter your secure credentials to proceed.</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="px-10 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Identity</Label>
                      <Input 
                        type="text" 
                        placeholder="ID or Email Address" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="bg-white/5 border-white/10 text-white h-14 rounded-2xl focus:ring-primary/50 transition-all font-medium" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Secret Key</Label>
                      <Input 
                        type="password" 
                        placeholder="••••••••"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="bg-white/5 border-white/10 text-white h-14 rounded-2xl focus:ring-primary/50 transition-all" 
                        required 
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="p-10 flex flex-col gap-6">
                    <Button 
                      type="submit" 
                      className={`w-full h-14 text-sm uppercase tracking-widest font-black rounded-2xl shadow-xl transition-transform active:scale-95 ${portalOptions.find(p => p.id === selectedPortal)?.color} hover:brightness-110`}
                    >
                      Sign In Now
                    </Button>
                    <button 
                      type="button" 
                      onClick={() => navigate("/subscription")} 
                      className="text-slate-500 hover:text-slate-300 text-xs font-bold uppercase tracking-[0.2em] transition-colors"
                    >
                      Academic Subscription Hub
                    </button>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}