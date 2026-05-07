import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, Receipt, Calculator, ArrowDownRight, 
  FileText, Download, Sparkles, Plus, Edit3, Trash2, Search, Landmark, ArrowUpRight, Save, X, RefreshCcw, ShieldCheck, ArrowRightLeft, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIInsightCard } from "./AIInsights";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AccountingRecords() {
  const [transactions, setTransactions] = useState([
    { id: "TX-9012", entity: "Alice Johnson", parent: "Robert Johnson", category: "Tuition Fee", amount: 1200, date: "Oct 12, 2024", method: "Bank Transfer", status: "Completed", type: "revenue" },
    { id: "TX-9013", entity: "Bob Smith", parent: "Jane Smith", category: "Tuition Fee", amount: 1200, date: "Oct 12, 2024", method: "Cash", status: "Completed", type: "revenue" },
    { id: "TX-9014", entity: "Stationery World", category: "Supplies", amount: 450, date: "Oct 11, 2024", method: "Corporate Card", status: "Completed", type: "expense" },
    { id: "TX-9015", entity: "Charlie Davis", parent: "Mark Davis", category: "Lab Fee", amount: 250, date: "Oct 10, 2024", method: "Online Payment", status: "Pending", type: "revenue" },
  ]);

  const [editingTx, setEditingTx] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const totalRevenue = transactions.filter(t => t.type === 'revenue').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  const stats = [
    { label: "Gross Revenue", value: `GHS ${totalRevenue.toLocaleString()}`, trend: "+12.5%", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50", progress: 85 },
    { label: "Operational Burn", value: `GHS ${totalExpenses.toLocaleString()}`, trend: "-4.2%", icon: ArrowDownRight, color: "text-rose-600", bg: "bg-rose-50", progress: 42 },
    { label: "Receivables", value: "GHS 18,450", trend: "+2.0%", icon: Receipt, color: "text-amber-600", bg: "bg-amber-50", progress: 68 },
    { label: "Consolidated Net", value: `GHS ${(totalRevenue - totalExpenses).toLocaleString()}`, trend: "+8.3%", icon: Calculator, color: "text-indigo-600", bg: "bg-indigo-50", progress: 92 },
  ];

  const handleUpdateTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTx) {
      if (transactions.find(t => t.id === editingTx.id)) {
        setTransactions(transactions.map(t => t.id === editingTx.id ? editingTx : t));
        toast.success("Fiscal artifact synchronized!", { icon: <ShieldCheck className="text-emerald-500" /> });
      } else {
        setTransactions([{ ...editingTx, id: `TX-${Math.floor(Math.random() * 9000) + 1000}` }, ...transactions]);
        toast.success("New financial record committed!", { icon: <Zap className="text-blue-500" /> });
      }
      setEditingTx(null);
    }
  };

  const handleDeleteTx = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
    toast.info("Record purged from institutional ledger.");
  };

  const filteredTxs = transactions.filter(t => 
    t.entity.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-20 animate-in fade-in duration-1000">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 bg-white p-20 rounded-[6rem] shadow-[0_80px_160px_-40px_rgba(49,46,129,0.1)] border-2 border-slate-50 relative overflow-hidden group">
        <div className="absolute -right-32 -bottom-32 opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-[3000ms]">
           <Landmark className="w-[45rem] h-[45rem] text-indigo-600 rotate-12" />
        </div>
        <div className="space-y-4 relative z-10">
          <h2 className="text-8xl font-black uppercase tracking-tighter italic text-slate-900 leading-none group-hover:text-indigo-600 transition-colors duration-500">Fiscal <span className="text-indigo-600 not-italic">Ledger</span></h2>
          <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[13px] mt-8 italic leading-none">Institutional Enterprise Resource Registry Node</p>
        </div>
        <div className="flex flex-wrap gap-8 relative z-10">
          <Button variant="outline" className="rounded-[3rem] h-24 font-black uppercase tracking-[0.2em] text-xs px-16 border-slate-100 shadow-2xl bg-white hover:bg-slate-50 transition-all hover:-translate-y-3 group/audit">
            <FileText className="w-8 h-8 mr-5 text-indigo-400 group-hover:rotate-12 transition-transform" /> Registry Audit
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-[3rem] h-24 px-20 font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-indigo-100 transition-all hover:-translate-y-4" onClick={() => setEditingTx({ id: "new", entity: "", category: "Tuition Fee", amount: 0, date: "Oct 12, 2024", method: "Bank Transfer", status: "Completed", type: "revenue" })}>
            <Plus className="w-8 h-8 mr-5 text-indigo-300" /> Initialize Record
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
        <div className="xl:col-span-8 grid gap-12 sm:grid-cols-2">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none p-16 rounded-[5.5rem] bg-white shadow-[0_60px_120px_-20px_rgba(0,0,0,0.12)] group hover:-translate-y-4 transition-all duration-700 relative overflow-hidden border border-slate-50">
              <div className={cn("absolute top-0 right-0 w-64 h-64 opacity-5 rounded-full translate-x-24 -translate-y-24 group-hover:scale-[2] transition-all duration-1000", stat.bg)} />
              <CardHeader className="flex flex-row items-center justify-between pb-16 p-0 relative z-10">
                <div className="space-y-2">
                   <CardTitle className="text-[13px] font-black uppercase tracking-[0.5em] text-slate-400 italic mb-2 leading-none">{stat.label}</CardTitle>
                   <div className="h-1 w-12 bg-indigo-500 rounded-full group-hover:w-full transition-all duration-700" />
                </div>
                <div className={cn("p-8 rounded-[2.5rem] shadow-2xl transition-all duration-700 group-hover:rotate-12 group-hover:scale-110 shadow-indigo-50", stat.bg, stat.color)}>
                  <stat.icon className="h-12 w-12" />
                </div>
              </CardHeader>
              <CardContent className="p-0 space-y-12 relative z-10">
                <div className="text-7xl font-black italic tracking-tighter text-slate-900 leading-none group-hover:text-indigo-600 transition-colors duration-500">{stat.value}</div>
                <div className="flex items-center gap-8">
                  <Badge className={cn(
                    "rounded-2xl px-8 py-3.5 font-black text-[12px] uppercase tracking-widest border-none shadow-2xl transition-all group-hover:scale-110",
                    stat.trend.startsWith('+') ? 'bg-emerald-500 text-white shadow-emerald-100' : 'bg-rose-500 text-white shadow-rose-100'
                  )}>
                    {stat.trend}
                  </Badge>
                  <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.4em] italic">Cycle Variance Flux</span>
                </div>
                <div className="h-5 bg-slate-50 rounded-full overflow-hidden shadow-inner border border-slate-100 p-1">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.progress}%` }}
                    className={cn("h-full rounded-full shadow-lg", stat.color.replace('text', 'bg'))}
                   />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="xl:col-span-4 space-y-16">
          <div className="flex items-center gap-10 mb-8 px-8">
             <div className="w-24 h-24 rounded-[2.5rem] bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-2xl shadow-indigo-50 border-2 border-white group-hover:rotate-12 transition-transform">
               <Sparkles className="w-12 h-12" />
             </div>
             <div className="space-y-2">
                <h3 className="text-5xl font-black uppercase tracking-tighter text-slate-900 italic leading-none">Fiscal <span className="text-indigo-600">AI</span></h3>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Predictive analytics synchronized</p>
             </div>
          </div>
          <AIInsightCard 
            title="Consolidated Capital Pulse"
            content="Aggregated institutional revenue has synchronized at 12.5% growth MoM. Liquidity buffer remains at 94% optimization protocol."
            type="financial"
            priority="high"
          />
          <Card className="border-none shadow-[0_100px_200px_-50px_rgba(15,23,42,0.5)] rounded-[5rem] bg-slate-900 p-16 text-white relative overflow-hidden group border-t-8 border-indigo-500/50">
             <Calculator className="absolute -right-16 -bottom-16 w-80 h-80 opacity-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-[3000ms]" />
             <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-indigo-300 italic mb-10">Temporal Status Grid</h4>
             <div className="flex items-center gap-8 relative z-10 bg-white/5 p-10 rounded-[3rem] border border-white/10 backdrop-blur-xl">
                <div className="h-8 w-8 rounded-full bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.8)] animate-pulse" />
                <span className="text-4xl font-black italic uppercase tracking-tighter">Fiscal Cycle Optimized</span>
             </div>
          </Card>
        </div>
      </div>

      {/* Ledger Table Artifacts */}
      <Card className="border-none shadow-[0_150px_300px_-80px_rgba(0,0,0,0.2)] rounded-[7rem] overflow-hidden bg-white group border-b-8 border-indigo-100">
        <CardHeader className="p-24 border-b border-slate-50 bg-slate-50/20 flex flex-col xl:flex-row items-center justify-between gap-16 group-hover:bg-indigo-50/10 transition-all duration-1000">
          <div className="space-y-4">
            <CardTitle className="text-7xl font-black uppercase tracking-tighter italic text-slate-900 leading-none group-hover:text-indigo-600 transition-colors duration-500">Institutional Registry</CardTitle>
            <CardDescription className="text-slate-400 font-black uppercase tracking-[0.3em] text-[13px] mt-8 italic">Official encrypted financial artifact sequence protocol</CardDescription>
          </div>
          <div className="flex flex-wrap gap-10 w-full xl:w-auto">
            <div className="relative group flex-1 xl:flex-none">
              <div className="absolute inset-0 bg-indigo-500/10 rounded-[3rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <Search className="absolute left-10 top-1/2 -translate-y-1/2 w-8 h-8 text-slate-300 group-focus-within:text-indigo-600 transition-all duration-700" />
              <Input 
                placeholder="Query registry protocol sequence..." 
                className="pl-24 h-24 rounded-[3rem] bg-white border-slate-100 w-full xl:w-[45rem] shadow-2xl shadow-slate-100 font-black uppercase text-sm tracking-widest italic"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="ghost" className="h-24 w-24 rounded-[2.5rem] bg-white shadow-2xl hover:bg-slate-50 text-indigo-600 border border-slate-100 transition-all hover:-translate-y-3">
              <Download className="w-12 h-12" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/10 h-36">
                <tr className="border-b-4 border-slate-50/50">
                  <th className="px-24 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Identity Serial ID</th>
                  <th className="px-10 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Entity Protocol Hub</th>
                  <th className="px-10 font-black uppercase tracking-widest text-[12px] text-slate-400 text-center italic">Classification</th>
                  <th className="px-10 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Capital Magnitude</th>
                  <th className="px-10 font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Temporal Position</th>
                  <th className="px-24 text-right font-black uppercase tracking-widest text-[12px] text-slate-400 italic">Grid Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredTxs.map((tx, i) => (
                  <tr key={i} className="h-48 hover:bg-indigo-50/30 transition-all border-slate-50 group/row">
                    <td className="px-24 font-black text-2xl uppercase tracking-tighter text-slate-300 italic group-hover/row:text-indigo-400 transition-colors">{tx.id}</td>
                    <td className="px-10">
                      <div className="flex flex-col space-y-4">
                        <span className="font-black uppercase tracking-tighter text-slate-900 text-4xl italic group-hover/row:text-indigo-600 transition-colors duration-500 leading-none">{tx.entity}</span>
                        {tx.parent && <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none italic bg-slate-50 w-fit px-4 py-1.5 rounded-lg border border-slate-100">GUARDIAN: {tx.parent.toUpperCase()}</span>}
                      </div>
                    </td>
                    <td className="px-10 text-center">
                      <Badge variant="outline" className="px-10 py-5 bg-indigo-50 text-indigo-600 rounded-[2rem] text-[12px] font-black uppercase tracking-widest border-none italic shadow-xl group-hover/row:bg-white transition-all">
                        {tx.category}
                      </Badge>
                    </td>
                    <td className="px-10">
                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "text-6xl font-black italic tracking-tighter leading-none",
                          tx.type === 'expense' ? 'text-rose-600' : 'text-emerald-600'
                        )}>
                          {tx.type === 'expense' ? '-' : '+'}{tx.amount.toLocaleString()}
                        </span>
                        <ArrowRightLeft className="w-6 h-6 text-slate-100 group-hover/row:text-indigo-200 transition-all" />
                      </div>
                    </td>
                    <td className="px-10">
                       <div className="flex flex-col">
                          <span className="text-slate-900 text-xl font-black uppercase tracking-tighter italic">{tx.date}</span>
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mt-3 italic">PROTOCOL: {tx.method.toUpperCase()}</span>
                       </div>
                    </td>
                    <td className="px-24 text-right">
                      <div className="flex items-center justify-end gap-8">
                        <Badge 
                          className={cn(
                            "rounded-[2rem] uppercase text-[12px] font-black tracking-[0.2em] px-12 py-5 transition-all shadow-2xl border-none",
                            tx.status === "Completed" ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-amber-500 text-white shadow-amber-200 animate-pulse"
                          )}
                        >
                          {tx.status.toUpperCase()}
                        </Badge>
                        <div className="flex opacity-0 group-hover/row:opacity-100 transition-all gap-6 transform translate-x-12 group-hover/row:translate-x-0">
                          <Button size="icon" variant="ghost" className="h-20 w-20 rounded-[2.5rem] bg-white shadow-2xl hover:bg-indigo-50 hover:text-indigo-600 border border-slate-100 transition-transform hover:scale-110" onClick={() => setEditingTx(tx)}><Edit3 className="w-8 h-8" /></Button>
                          <Button size="icon" variant="ghost" className="h-20 w-20 rounded-[2.5rem] bg-white shadow-2xl hover:bg-rose-50 hover:text-rose-600 border border-slate-100 transition-transform hover:scale-110" onClick={() => handleDeleteTx(tx.id)}><Trash2 className="w-8 h-8" /></Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Ledger Synthesis Modal */}
      <AnimatePresence>
        {editingTx && (
          <Dialog open={!!editingTx} onOpenChange={() => setEditingTx(null)}>
            <DialogContent className="rounded-[7rem] p-24 max-w-5xl bg-white border-none shadow-[0_200px_400px_-100px_rgba(0,0,0,0.6)]">
              <DialogHeader>
                <DialogTitle className="text-8xl font-black uppercase tracking-tighter italic leading-none">Artifact <span className="text-indigo-600">Synthesis</span></DialogTitle>
                <CardDescription className="font-bold text-slate-400 uppercase tracking-[0.4em] text-[13px] mt-12 italic leading-none">Authorized institutional fiscal record modification protocol</CardDescription>
              </DialogHeader>
              <form onSubmit={handleUpdateTx} className="space-y-16 mt-24">
                <div className="grid grid-cols-2 gap-16">
                  <div className="space-y-6 col-span-2">
                    <Label className="text-[12px] font-black uppercase tracking-widest text-slate-400 ml-8 italic">Entity Designation Identity Protocol (Full Legal Name)</Label>
                    <Input value={editingTx.entity} onChange={e => setEditingTx({ ...editingTx, entity: e.target.value })} className="h-28 rounded-[3.5rem] bg-slate-50 border-none font-black italic text-5xl focus:ring-4 focus:ring-indigo-600/10 shadow-inner px-16 text-indigo-600" required />
                  </div>
                  <div className="space-y-6">
                    <Label className="text-[12px] font-black uppercase tracking-widest text-slate-400 ml-8 italic">Artifact Magnitude Direction</Label>
                    <select value={editingTx.type} onChange={e => setEditingTx({ ...editingTx, type: e.target.value })} className="w-full h-24 rounded-[2.5rem] bg-slate-50 border-none px-12 font-black uppercase text-xl tracking-[0.2em] italic shadow-inner focus:ring-4 focus:ring-indigo-600/10">
                        <option value="revenue">INSTITUTIONAL REVENUE (+)</option>
                        <option value="expense">OPERATIONAL BURN (-)</option>
                    </select>
                  </div>
                  <div className="space-y-6">
                    <Label className="text-[12px] font-black uppercase tracking-widest text-slate-400 ml-8 italic">Operational Classification Hub</Label>
                    <select value={editingTx.category} onChange={e => setEditingTx({ ...editingTx, category: e.target.value })} className="w-full h-24 rounded-[2.5rem] bg-slate-50 border-none px-12 font-black uppercase text-xl tracking-[0.2em] italic shadow-inner focus:ring-4 focus:ring-indigo-600/10">
                        {["Tuition Fee", "Salary", "Utility", "Supplies", "Maintenance", "Exam Fee", "Service"].map(c => (
                          <option key={c} value={c}>{c.toUpperCase()}</option>
                        ))}
                    </select>
                  </div>
                  <div className="space-y-6">
                    <Label className="text-[12px] font-black uppercase tracking-widest text-slate-400 ml-8 italic">Capital Value Magnitude (GHS)</Label>
                    <Input type="number" value={editingTx.amount} onChange={e => setEditingTx({ ...editingTx, amount: Number(e.target.value) })} className="h-24 rounded-[2.5rem] bg-indigo-50 border-none font-black italic text-5xl px-12 shadow-inner text-indigo-600" required />
                  </div>
                  <div className="space-y-6">
                    <Label className="text-[12px] font-black uppercase tracking-widest text-slate-400 ml-8 italic">Temporal Hub Position Marker</Label>
                    <Input value={editingTx.date} onChange={e => setEditingTx({ ...editingTx, date: e.target.value })} className="h-24 rounded-[2.5rem] bg-slate-50 border-none font-black uppercase text-xl tracking-[0.2em] px-12 shadow-inner italic" />
                  </div>
                </div>
                <Button type="submit" className="w-full h-36 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[4rem] font-black uppercase tracking-[0.3em] text-sm shadow-[0_50px_100px_-30px_rgba(49,46,129,0.5)] transition-all hover:-translate-y-4 mt-12 group/btn">
                   <RefreshCcw className="w-12 h-12 mr-8 text-indigo-200 animate-spin-slow group-hover/btn:scale-125 transition-transform" /> Commit Artifact to Grid Registry
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}