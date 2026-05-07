import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Send, Mail, MessageSquare, Info, History } from "lucide-react";
import { toast } from "sonner";

export function NotificationCenter() {
  const [type, setType] = useState<"email" | "sms">("email");
  const [category, setCategory] = useState<"fees" | "programs" | "announcements">("announcements");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState<"all" | "primary" | "secondary" | "debtors">("all");

  const handleSend = () => {
    if (!message || (type === "email" && !subject)) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Sending ${type.toUpperCase()} notifications...`,
        success: `${category.charAt(0).toUpperCase() + category.slice(1)} notification sent to ${target} parents via ${type.toUpperCase()}!`,
        error: "Failed to send notifications. Please try again.",
      }
    );

    // Reset form
    setSubject("");
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Send Parent Notifications</CardTitle>
                  <CardDescription>Broadcast messages, fee reminders, and program updates to parents.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Channel</Label>
                  <div className="flex gap-4">
                    <Button 
                      variant={type === "email" ? "default" : "outline"} 
                      className="flex-1"
                      onClick={() => setType("email")}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button 
                      variant={type === "sms" ? "default" : "outline"} 
                      className="flex-1"
                      onClick={() => setType("sms")}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      SMS
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={(v: any) => setCategory(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fees">Fee Reminders</SelectItem>
                      <SelectItem value="programs">School Programs</SelectItem>
                      <SelectItem value="announcements">General Announcements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Select value={target} onValueChange={(v: any) => setTarget(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Parents</SelectItem>
                      <SelectItem value="primary">Primary Section</SelectItem>
                      <SelectItem value="secondary">Secondary Section</SelectItem>
                      <SelectItem value="debtors">Parents with Pending Fees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {type === "email" && (
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="e.g., Important: Mid-Term Fee Payment Reminder" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="message">Message Content</Label>
                <Textarea 
                  id="message" 
                  placeholder="Enter your message here..." 
                  className="min-h-[150px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {type === "sms" ? `${message.length} / 160 characters` : ""}
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t pt-6">
              <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Broadcast Now
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="w-4 h-4 text-slate-400" />
                Recent Broadcasts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Term 2 Fee Notice", type: "Email", date: "2 days ago", status: "Sent" },
                  { title: "Sports Day Program", type: "SMS", date: "5 days ago", status: "Sent" },
                  { title: "Holiday Announcement", type: "Email", date: "1 week ago", status: "Sent" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between p-3 rounded-lg border bg-slate-50/50">
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px] px-1 h-4">{item.type}</Badge>
                        <span className="text-[10px] text-muted-foreground">{item.date}</span>
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 text-[10px] hover:bg-emerald-100">
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-blue-50 text-blue-900 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 mt-0.5 text-blue-600" />
                <div className="space-y-1">
                  <p className="text-sm font-bold">Pro Tip</p>
                  <p className="text-xs leading-relaxed opacity-80">
                    Use placeholders like [Parent Name] or [Student Name] to personalize your messages automatically.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}