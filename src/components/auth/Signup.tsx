import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole, SignupRequest } from "@/types/auth";
import { School as SchoolIcon, ArrowLeft, CheckCircle2, BookOpen, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface SignupProps {
  onSignup: (request: SignupRequest) => void;
}

const AVAILABLE_CLASSES = ["Grade 9A", "Grade 9B", "Grade 9C", "Grade 10A", "Grade 10B", "Grade 11A", "Grade 11B", "Grade 12A", "Grade 12B"];

export function Signup({ onSignup }: SignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requestedRole, setRequestedRole] = useState<UserRole>("parent");
  const [assignedClasses, setAssignedClasses] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const toggleClass = (cls: string) => {
    setAssignedClasses(prev => 
      prev.includes(cls) ? prev.filter(c => c !== cls) : [...prev, cls]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const request: SignupRequest = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: requestedRole,
      approved: false,
      requestedRole,
      requestDate: new Date().toISOString(),
      assignedClasses: requestedRole === "teacher" ? assignedClasses : undefined,
    };
    onSignup(request);
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-slate-900 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px]" />

      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-white">
        <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
          <SchoolIcon className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Academix <span className="text-blue-400">Portal</span></h1>
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="signup-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md z-10"
          >
            <Card className="border-none bg-white/10 backdrop-blur-2xl text-white">
              <CardHeader>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-fit text-slate-400 hover:text-white hover:bg-white/5 -ml-2 mb-4"
                  onClick={() => navigate("/login")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                </Button>
                <CardTitle className="text-2xl">Create Account</CardTitle>
                <CardDescription className="text-slate-400">
                  Fill in your details to request access to a portal
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Request Portal Access</Label>
                    <Select value={requestedRole} onValueChange={(v) => setRequestedRole(v as UserRole)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select portal role" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10 text-white">
                        <SelectItem value="parent">Parent Portal</SelectItem>
                        <SelectItem value="teacher">Teacher Portal</SelectItem>
                        <SelectItem value="accountant">Accountant Portal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {requestedRole === "teacher" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3 pt-2"
                    >
                      <Label className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        Select Assigned Classes (Multiple)
                      </Label>
                      <div className="grid grid-cols-3 gap-2">
                        {AVAILABLE_CLASSES.map(cls => (
                          <button
                            key={cls}
                            type="button"
                            onClick={() => toggleClass(cls)}
                            className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                              assignedClasses.includes(cls) 
                                ? "bg-blue-600 border-blue-500 text-white" 
                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                            }`}
                          >
                            {cls}
                          </button>
                        ))}
                      </div>
                      {assignedClasses.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {assignedClasses.map(cls => (
                            <Badge key={cls} variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-[10px]">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-4 pt-6">
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
                    Submit Request
                  </Button>
                  <p className="text-xs text-center text-slate-500 italic">
                    Note: Your account will require manual approval from the school administration.
                  </p>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md text-center z-10"
          >
            <div className="bg-white/10 backdrop-blur-2xl border border-white/10 p-12 rounded-3xl shadow-2xl">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Request Sent!</h2>
              <p className="text-slate-400 mb-8">
                Your application for the <span className="text-blue-400 font-semibold uppercase">{requestedRole}</span> portal has been submitted. 
                Our administrators will review it shortly. You will receive an email once approved.
              </p>
              <Button 
                onClick={() => navigate("/login")} 
                className="bg-white text-slate-900 hover:bg-slate-200"
              >
                Return to Login
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}