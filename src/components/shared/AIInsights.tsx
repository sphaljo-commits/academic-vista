import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, AlertCircle, Lightbulb, Edit3, Save, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AIInsightProps {
  title: string;
  content: string;
  type?: "academic" | "financial" | "behavioral" | "strategic";
  priority?: "high" | "medium" | "low";
}

export function AIInsightCard({ title: initialTitle, content: initialContent, type = "academic", priority = "medium" }: AIInsightProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const getIcon = () => {
    switch (type) {
      case "financial": return <TrendingUp className="w-6 h-6 text-emerald-500" />;
      case "strategic": return <Lightbulb className="w-6 h-6 text-amber-500" />;
      default: return <Sparkles className="w-6 h-6 text-indigo-500" />;
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case "high": return "bg-rose-100 text-rose-700 border-rose-200";
      case "medium": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-indigo-100 text-indigo-700 border-indigo-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
           <Dialog>
              <DialogTrigger asChild>
                 <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-slate-50/80 backdrop-blur-md">
                    <Edit3 className="w-4 h-4 text-indigo-600" />
                 </Button>
              </DialogTrigger>
              <DialogContent className="rounded-[3rem]">
                 <DialogHeader><DialogTitle className="font-black uppercase italic tracking-tighter">Calibrate AI Insight Protocol</DialogTitle></DialogHeader>
                 <div className="space-y-6 py-10">
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Insight Vector Title</Label>
                       <Input value={title} onChange={(e) => setTitle(e.target.value)} className="h-14 rounded-xl font-bold" />
                    </div>
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cognitive Payload Content</Label>
                       <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="h-40 rounded-2xl py-6" />
                    </div>
                 </div>
                 <DialogFooter>
                    <Button className="w-full rounded-[1.5rem] h-20 bg-indigo-600 text-white font-black uppercase text-sm tracking-[0.2em] shadow-2xl" onClick={() => toast.success("Insight Protocol Re-calibrated")}>Authorize Sync</Button>
                 </DialogFooter>
              </DialogContent>
           </Dialog>
        </div>
        <div className="absolute top-4 left-4">
          <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest bg-indigo-50/50 backdrop-blur-sm flex items-center gap-2 border-indigo-100 px-3 py-1 text-indigo-600">
            <Zap className="w-3 h-3 text-indigo-500 fill-indigo-500" /> AI MATRIX
          </Badge>
        </div>
        <CardHeader className="pt-16 pb-4 px-10">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-slate-50 rounded-2xl shadow-inner group-hover:scale-110 transition-transform">{getIcon()}</div>
            <CardTitle className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-10 pb-10">
          <p className="text-base text-slate-500 leading-relaxed mb-8 italic">
            {content}
          </p>
          <Badge className={cn("text-[10px] font-black uppercase tracking-[0.2em] border-none shadow-lg px-4 py-2", getPriorityColor())}>
            {priority.toUpperCase()} PRIORITY VECTOR
          </Badge>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function AIInsightsSection({ insights }: { insights: AIInsightProps[] }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between px-4">
         <div className="flex items-center gap-5">
           <div className="p-3 bg-indigo-600 rounded-2xl shadow-2xl animate-pulse"><Sparkles className="w-8 h-8 text-white" /></div>
           <div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">AI Cognition Engine</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1">Predictive Institutional Intelligence Stream</p>
           </div>
         </div>
         <Button variant="link" className="font-black uppercase text-[11px] tracking-widest text-indigo-600 hover:no-underline">Full Predictive Audit</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {insights.map((insight, idx) => (
          <AIInsightCard key={idx} {...insight} />
        ))}
      </div>
    </div>
  );
}