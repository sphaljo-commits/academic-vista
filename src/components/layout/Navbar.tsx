import React from "react";
import { Bell, Menu, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSchool } from "@/context/SchoolContext";

export const Navbar = () => {
  const { school } = useSchool();
  
  const schoolName = school?.name || "St. Andrews Academy";
  const schoolLogo = school?.logo || "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d161c0c-e646-41d5-ac20-ccfa608a2d39/school-logo-e52ad723-1778094555108.webp";

  return (
    <nav className="sticky top-0 z-50 w-full portal-header">
      <div className="container flex h-full items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 rounded-xl">
              <img
                src={schoolLogo}
                alt="School Logo"
                className="h-7 w-7 object-cover"
              />
            </div>
            <span className="hidden text-xl font-extrabold tracking-tight text-slate-900 md:inline-block">
              {schoolName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl text-slate-500 hover:bg-slate-100">
            <Bell className="h-5 w-5" />
            <span className="absolute top-3 right-3 flex h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-white"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-11 w-11 rounded-full hover:ring-2 hover:ring-slate-100 transition-all">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarFallback className="bg-slate-100">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2 rounded-2xl shadow-2xl border-slate-100" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-bold leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john.doe@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem className="rounded-xl py-3">
                <User className="mr-2 h-4 w-4 text-slate-400" />
                <span className="font-medium">Profile Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl py-3">
                <Settings className="mr-2 h-4 w-4 text-slate-400" />
                <span className="font-medium">Portal Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 rounded-xl py-3">
                <LogOut className="mr-2 h-4 w-4" />
                <span className="font-bold">Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};