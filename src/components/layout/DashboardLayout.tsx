import React, { useState } from "react";
import { User } from "@/types/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search, 
  School,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useSchool } from "@/context/SchoolContext";

interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
  menuItems: { label: string; icon: React.ElementType; path: string; badge?: number }[];
  portalName: string;
  portalColor: string;
}

export function DashboardLayout({ user, onLogout, children, menuItems, portalName, portalColor }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { school } = useSchool();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  const schoolName = school?.name || "Academix";
  const schoolLogo = school?.logo || null;

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-900/60 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform portal-sidebar transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-20 px-8 border-b border-white/5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform">
                {schoolLogo ? (
                  <img src={schoolLogo} alt="Logo" className="w-8 h-8 object-cover" />
                ) : (
                  <School className="w-6 h-6 text-white" />
                )}
              </div>
              <span className="text-xl font-bold tracking-tight text-white">{schoolName}</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="px-6 py-8">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <Avatar className="h-11 w-11 border-2 border-white/10">
                <AvatarFallback className="bg-white/10 text-white font-bold">{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate capitalize font-medium">{user.role} Portal</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3.5 portal-sidebar-item group ${
                    isActive
                      ? "active text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`} />
                    <span className="font-semibold text-[15px]">{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="flex items-center justify-center min-w-5 h-5 px-1.5 text-[10px] font-bold rounded-full bg-rose-500 text-white shadow-lg shadow-rose-500/20">
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className={`w-4 h-4 transition-all ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`} />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 mt-auto">
            <Button
              variant="ghost"
              className="w-full justify-start text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-xl px-4 py-6 border border-transparent hover:border-rose-500/20 transition-all"
              onClick={handleLogoutClick}
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span className="font-bold uppercase tracking-wider text-xs">Logout Session</span>
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="portal-header flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            <div className="hidden md:flex items-center gap-4">
              <div className={`h-8 w-1 rounded-full ${portalColor.replace('bg-', 'portal-gradient-')}`} />
              <h2 className="font-extrabold text-slate-800 tracking-tight text-xl">{portalName}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="relative hidden lg:block w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search resources..." 
                className="pl-12 bg-slate-100/80 border-transparent focus:bg-white focus:border-slate-200 transition-all rounded-2xl h-11"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative text-slate-500 rounded-xl hover:bg-slate-100 h-11 w-11">
                <Bell className="w-5 h-5" />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
              </Button>
              <div className="h-8 w-[1px] bg-slate-200 mx-2" />
              <Avatar className="h-11 w-11 cursor-pointer border-2 border-slate-50 hover:border-slate-200 transition-all shadow-sm">
                <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">{user.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}