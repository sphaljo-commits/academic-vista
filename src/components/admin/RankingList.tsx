import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, TrendingUp, TrendingDown, Star, Medal, Sparkles, Edit3, Save, X, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface RankingItem {
  id: string;
  name: string;
  subtext: string;
  score: number;
  rank: number;
  trend: "up" | "down" | "stable";
  image?: string;
}

interface RankingListProps {
  title: string;
  description: string;
  items: RankingItem[];
  type: "Teacher" | "Parent";
}

export function RankingList({ title, description, items, type }: RankingListProps) {
  const [localItems, setLocalItems] = useState(items);
  const [isEditing, setIsEditing] = useState(false);
  
  const sortedItems = [...localItems].sort((a, b) => b.score - a.score);

  const handleUpdateScore = (id: string, score: number) => {
    setLocalItems(prev => prev.map(item => item.id === id ? { ...item, score } : item));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Ranking matrix synchronized!");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 bg-white p-10 rounded-[3.5rem] border border-slate-50 shadow-2xl group relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-1000">
           <Trophy className="w-48 h-48 text-amber-500" />
        </div>
        <div className="flex items-center gap-6 relative z-10">
           <div className="p-5 bg-amber-500 text-white rounded-[1.5rem] shadow-2xl group-hover:rotate-12 transition-transform">
             <Trophy className="w-8 h-8" />
           </div>
           <div className="space-y-1">
             <h3 className="text-3xl font-black uppercase tracking-tighter italic text-slate-900">{title} <span className="text-amber-600">Protocol</span></h3>
             <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 italic">{description}</p>
           </div>
        </div>
        <div className="flex items-center gap-4 relative z-10">
           <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-2 px-6 py-2.5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-sm">
             <Sparkles className="w-4 h-4 animate-pulse" />
             Registry Updated
           </Badge>
           <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)} className="h-14 w-14 rounded-2xl bg-slate-50 hover:text-amber-600 shadow-sm">
             {isEditing ? <X className="w-6 h-6 text-rose-500" /> : <Edit3 className="w-6 h-6" />}
           </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {sortedItems.map((item, index) => {
          const rank = index + 1;
          const isTop3 = rank <= 3;

          return (
            <motion.div 
              layout
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={cn(
                "border-none shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 group relative overflow-hidden rounded-[2.5rem]",
                isTop3 ? 'bg-gradient-to-r from-white to-amber-50/20' : 'bg-white',
                isEditing && 'ring-2 ring-amber-500/20'
              )}>
                {isTop3 && (
                  <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-2 shadow-2xl",
                    rank === 1 ? "bg-amber-500" : rank === 2 ? "bg-slate-400" : "bg-orange-400"
                  )} />
                )}
                <CardContent className="flex items-center gap-8 p-8">
                  <div className={cn(
                    "flex items-center justify-center w-16 h-16 rounded-[1.5rem] font-black text-2xl italic tracking-tighter shadow-2xl transition-all group-hover:scale-110",
                    rank === 1 ? 'bg-amber-100 text-amber-700' : 
                    rank === 2 ? 'bg-slate-100 text-slate-600' : 
                    rank === 3 ? 'bg-orange-100 text-orange-700' : 
                    'bg-slate-50 text-slate-400 shadow-inner'
                  )}>
                    {rank === 1 ? <Medal className="w-10 h-10" /> : rank}
                  </div>

                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-white shadow-2xl rounded-[1.8rem] group-hover:rotate-6 transition-transform">
                      <AvatarImage src={item.image} className="object-cover" />
                      <AvatarFallback className={cn("font-black text-2xl", isTop3 ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-400')}>
                        {item.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    {rank === 1 && <Star className="absolute -top-3 -right-3 w-8 h-8 fill-amber-400 text-amber-400 drop-shadow-xl animate-pulse" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4">
                      <p className="text-3xl font-black uppercase tracking-tighter text-slate-900 italic leading-none group-hover:text-amber-600 transition-colors">{item.name}</p>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3 italic leading-none">{item.subtext}</p>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="text-right space-y-2">
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic leading-none">Efficiency Score</p>
                      {isEditing ? (
                        <Input 
                          type="number" 
                          value={item.score} 
                          onChange={e => handleUpdateScore(item.id, Number(e.target.value))}
                          className="h-14 w-32 rounded-2xl bg-slate-50 border-none font-black italic text-3xl text-amber-600 text-center shadow-inner focus-visible:ring-amber-500/20"
                        />
                      ) : (
                        <p className={cn("text-5xl font-black italic tracking-tighter leading-none", isTop3 ? 'text-amber-600' : 'text-slate-800')}>P-{item.score}</p>
                      )}
                    </div>
                    
                    <div className="hidden sm:block">
                      {item.trend === 'up' ? (
                        <div className="p-4 bg-emerald-50 rounded-2xl shadow-sm text-emerald-500 group-hover:scale-110 transition-transform"><TrendingUp className="w-6 h-6" /></div>
                      ) : item.trend === 'down' ? (
                        <div className="p-4 bg-rose-50 rounded-2xl shadow-sm text-rose-500 group-hover:scale-110 transition-transform"><TrendingDown className="w-6 h-6" /></div>
                      ) : (
                        <div className="w-10 h-1.5 bg-slate-100 rounded-full shadow-inner" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="pt-8">
            <Button onClick={handleSave} className="w-full h-24 bg-amber-500 hover:bg-amber-600 text-white rounded-[3rem] font-black uppercase tracking-widest text-sm shadow-2xl shadow-amber-200 transition-all hover:-translate-y-2">
              <RefreshCcw className="w-6 h-6 mr-5 text-amber-200 animate-spin-slow" /> Synchronize Matrix Protocol
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}