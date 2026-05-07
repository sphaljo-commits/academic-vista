import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, Send, Bell, Users, Clock } from "lucide-react";
import { toast } from "sonner";

export function NotificationPanel() {
  const [type, setType] = useState<"email" | "sms">("email");
  const [category, setCategory] = useState("fee-reminder");
  const [loading, setLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success(`${type === 'email' ? 'Emails' : 'SMS'} sent successfully to all relevant parents!`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Parent Reminders</h2>
        <p className="text-muted-foreground">Send automated or manual notifications to parents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle>Compose Reminder</CardTitle>
            <CardDescription>Select the type and content of the reminder you wish to send.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSend} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Delivery Method</Label>
                  <div className="flex gap-4">
                    <Button 
                      type="button"
                      variant={type === 'email' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setType('email')}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button 
                      type="button"
                      variant={type === 'sms' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setType('sms')}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      SMS
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notification Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fee-reminder">Fee Reminder</SelectItem>
                      <SelectItem value="program">School Program</SelectItem>
                      <SelectItem value="announcement">Important Announcement</SelectItem>
                      <SelectItem value="attendance">Attendance Alert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Recipient Group</Label>
                <Select defaultValue="all-parents">
                  <SelectTrigger>
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-parents">All Parents</SelectItem>
                    <SelectItem value="primary">Primary Section Parents</SelectItem>
                    <SelectItem value="secondary">Secondary Section Parents</SelectItem>
                    <SelectItem value="debtors">Parents with Outstanding Fees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Message Subject</Label>
                <Input placeholder={category === 'fee-reminder' ? 'Outstanding Fees Reminder' : 'Upcoming School Program'} />
              </div>

              <div className="space-y-2">
                <Label>Message Content</Label>
                <Textarea 
                  placeholder="Type your message here..." 
                  className="min-h-[150px]"
                  defaultValue={
                    category === 'fee-reminder' 
                    ? "Dear Parent, this is a friendly reminder regarding the outstanding school fees for this term. Please ensure payment is made by the end of the week. Thank you."
                    : category === 'program'
                    ? "Dear Parent, we are excited to announce our upcoming Inter-House Sports competition scheduled for next Friday. We look forward to seeing you there!"
                    : ""
                  }
                />
              </div>

              <div className="flex justify-end">
                <Button disabled={loading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                  {loading ? "Sending..." : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Reminder
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Scheduled Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Monthly Fee Reminder", time: "Every 25th", type: "SMS" },
                  { title: "PTA Meeting Invite", time: "Oct 15, 08:00 AM", type: "Email" },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                      <Badge variant="secondary" className="text-[10px]">{item.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                Delivery Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Parents</span>
                <span className="font-bold">142</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Emails Sent (this month)</span>
                <span className="font-bold">428</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">SMS Sent (this month)</span>
                <span className="font-bold">86</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-emerald-600 font-medium">
                  <span>Delivery Rate</span>
                  <span>99.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}