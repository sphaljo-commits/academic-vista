import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Edit2, Save, X, Sparkles, RefreshCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TeacherRemarksProps {
  teacherName: string;
  subject: string;
  remark: string;
  avatarUrl?: string;
}

export const TeacherRemarks: React.FC<TeacherRemarksProps> = ({
  teacherName: initialTeacher,
  subject: initialSubject,
  remark: initialRemark,
  avatarUrl,
}) => {
  const [data, setData] = useState({
    teacherName: initialTeacher,
    subject: initialSubject,
    remark: initialRemark
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState(data);

  const handleSave = () => {
    setData(editValues);
    setIsEditing(false);
    toast.success("Evaluator narrative synchronized!");
  };

  return (
    <Card className="relative overflow-hidden border-none bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] rounded-[3.5rem] group hover:shadow-indigo-100 transition-all duration-700">
      <div className="absolute top-10 right-10 text-indigo-100 group-hover:text-indigo-200 transition-colors opacity-30 pointer-events-none">
        <Quote className="h-24 w-24 rotate-180" />
      </div>
      
      <CardHeader className="p-12 pb-6 flex flex-row items-center justify-between bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center gap-6">
          <div className="p-5 bg-indigo-600 text-white rounded-[1.5rem] shadow-2xl group-hover:rotate-12 transition-transform">
             <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-black uppercase tracking-tighter italic text-slate-900">Evaluator <span className="text-indigo-600">Remarks</span></CardTitle>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Academic sentiment analysis protocol</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)} className="h-14 w-14 rounded-[1.2rem] bg-white shadow-sm hover:text-indigo-600 hover:scale-110 transition-all">
          {isEditing ? <X className="w-6 h-6 text-rose-500" /> : <Edit2 className="w-6 h-6" />}
        </Button>
      </CardHeader>

      <CardContent className="p-12 pt-10 relative z-10">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
               <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-[11px] font-black uppercase text-slate-400 ml-4">Evaluator Designation</Label>
                      <Input value={editValues.teacherName} onChange={e => setEditValues({...editValues, teacherName: e.target.value})} className="h-18 rounded-[1.5rem] bg-slate-50 border-none font-black italic text-2xl px-8 shadow-inner focus-visible:ring-indigo-600/20" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[11px] font-black uppercase text-slate-400 ml-4">Department Hub</Label>
                      <Input value={editValues.subject} onChange={e => setEditValues({...editValues, subject: e.target.value})} className="h-18 rounded-[1.5rem] bg-slate-50 border-none font-black italic uppercase px-8 shadow-inner focus-visible:ring-indigo-600/20" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[11px] font-black uppercase text-slate-400 ml-4">Narrative Sentiment</Label>
                    <Textarea value={editValues.remark} onChange={e => setEditValues({...editValues, remark: e.target.value})} className="h-40 rounded-[2rem] bg-slate-50 border-none font-bold italic shadow-inner text-xl leading-relaxed p-10 focus-visible:ring-indigo-600/20" />
                  </div>
               </div>
               <Button onClick={handleSave} className="w-full h-20 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2.5rem] font-black uppercase tracking-widest text-xs shadow-2xl transition-all hover:-translate-y-2 mt-4">
                 <RefreshCcw className="w-6 h-6 mr-4 text-indigo-300 animate-spin-slow" /> Commit Narrative Logic
               </Button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <p className="text-3xl font-black italic leading-relaxed text-slate-800 tracking-tighter group-hover:text-indigo-600 transition-colors duration-500">
                "{data.remark}"
              </p>
              <div className="flex items-center gap-8 pt-10 border-t border-slate-100">
                <Avatar className="h-24 w-24 border-8 border-slate-50 shadow-2xl rounded-[2.2rem] group-hover:rotate-6 transition-transform">
                  <AvatarImage src={avatarUrl} alt={data.teacherName} />
                  <AvatarFallback className="bg-indigo-600 text-white font-black text-3xl">{data.teacherName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-3xl font-black uppercase italic text-slate-900 leading-none">{data.teacherName}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <Badge className="bg-indigo-50 text-indigo-600 rounded-xl px-5 py-2 font-black uppercase text-[10px] tracking-widest border-none shadow-sm">HEAD OF REGISTRY</Badge>
                    <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest italic">Division: {data.subject}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};