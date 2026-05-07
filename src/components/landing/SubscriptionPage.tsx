import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSchool } from "@/context/SchoolContext";
import { SubscriptionPlan, SchoolInfo } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, School as SchoolIcon, Rocket, Shield, Users, Upload, ArrowRight, CreditCard, Smartphone, Landmark, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const PLANS = [
  {
    id: "monthly" as SubscriptionPlan,
    name: "Monthly",
    price: "$49",
    description: "Perfect for small private schools",
    features: ["Up to 100 students", "Basic reporting", "Email support", "Mobile App access"],
  },
  {
    id: "termly" as SubscriptionPlan,
    name: "Termly",
    price: "$129",
    description: "Best value for medium schools",
    features: ["Up to 500 students", "Advanced analytics", "Priority support", "Finance management", "Save 15%"],
    popular: true,
  },
  {
    id: "yearly" as SubscriptionPlan,
    name: "Yearly",
    price: "$349",
    description: "Full suite for large institutions",
    features: ["Unlimited students", "Custom reports", "24/7 dedicated support", "API Access", "Save 40%"],
  },
];

const PAYMENT_METHODS = [
  { id: "momo", name: "Mobile Money", icon: Smartphone, description: "MTN, Orange, Vodafone" },
  { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard" },
  { id: "bank", name: "Bank Transfer", icon: Landmark, description: "Direct school account" },
];

export function SubscriptionPage() {
  const { updateSchool } = useSchool();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>("termly");
  const [paymentMethod, setPaymentMethod] = useState("momo");
  
  const [formData, setFormData] = useState({
    name: "",
    principalName: "",
    address: "",
    phone: "",
    email: "",
    logo: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required school information");
      return;
    }
    setStep(3);
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const schoolInfo: SchoolInfo = {
        ...formData,
        logo: formData.logo || "https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d161c0c-e646-41d5-ac20-ccfa608a2d39/school-logo-e52ad723-1778094555108.webp",
        plan: selectedPlan,
        isSubscribed: true,
      };

      updateSchool(schoolInfo);
      setIsProcessing(false);
      toast.success(`Payment Confirmed! Welcome ${formData.name}`);
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center"
          >
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
              <h3 className="text-2xl font-bold text-slate-900">Confirming Payment...</h3>
              <p className="text-slate-500">Please wait while we verify your transaction with the provider.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d161c0c-e646-41d5-ac20-ccfa608a2d39/hero-image-4538fdb2-1778095452991.webp" 
          alt="School" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white" />
        
        <div className="relative z-10 container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-sm mb-6"
          >
            <SchoolIcon className="w-4 h-4" />
            Empowering Modern Education
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4"
          >
            School Registration <span className="text-blue-600">& Setup</span>
          </motion.h1>
          <div className="flex items-center justify-center gap-4 max-w-sm mx-auto">
            <div className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-blue-600" : "bg-slate-200"}`} />
            <div className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-blue-600" : "bg-slate-200"}`} />
            <div className={`h-2 flex-1 rounded-full ${step >= 3 ? "bg-blue-600" : "bg-slate-200"}`} />
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50 min-h-[600px]">
        <div className="container px-4">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              >
                {PLANS.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`relative flex flex-col border-2 transition-all duration-300 cursor-pointer ${
                      selectedPlan === plan.id ? "border-blue-600 shadow-xl scale-105 z-10 bg-white" : "border-transparent hover:border-slate-200 bg-white/50"
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                        Most Popular
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="mb-6">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-slate-500 ml-1">/{plan.id === 'yearly' ? 'year' : plan.id === 'termly' ? 'term' : 'mo'}</span>
                      </div>
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                            <Check className="w-4 h-4 text-emerald-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className={`w-full h-12 ${selectedPlan === plan.id ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-900 hover:bg-slate-800"}`}
                        onClick={() => setStep(2)}
                      >
                        Choose {plan.name}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="max-w-2xl mx-auto"
              >
                <Card className="border-none shadow-2xl bg-white">
                  <CardHeader className="text-center pb-2">
                    <div className="flex items-center justify-between mb-4">
                      <Button variant="ghost" onClick={() => setStep(1)} className="text-slate-500">
                        ← Back to Plans
                      </Button>
                      <div className="text-sm font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                        {PLANS.find(p => p.id === selectedPlan)?.name} Plan Selected
                      </div>
                    </div>
                    <CardTitle className="text-2xl">School Information</CardTitle>
                    <CardDescription>Enter your school details to complete the registration</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleNextStep}>
                    <CardContent className="space-y-6 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">School Name *</Label>
                          <Input id="name" name="name" placeholder="St. Andrews Academy" required value={formData.name} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="principalName">Principal/Head Name</Label>
                          <Input id="principalName" name="principalName" placeholder="Dr. Sarah Johnson" value={formData.principalName} onChange={handleInputChange} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">Official Email *</Label>
                          <Input id="email" name="email" type="email" placeholder="admin@school.com" required value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input id="phone" name="phone" placeholder="+1 (555) 000-0000" required value={formData.phone} onChange={handleInputChange} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">School Address</Label>
                        <Input id="address" name="address" placeholder="123 Education Lane" value={formData.address} onChange={handleInputChange} />
                      </div>

                      <div className="space-y-3">
                        <Label>School Logo</Label>
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                            {formData.logo ? <img src={formData.logo} alt="Logo Preview" className="w-full h-full object-cover" /> : <SchoolIcon className="w-6 h-6 text-slate-400" />}
                          </div>
                          <div className="flex-1">
                            <Label htmlFor="logo-upload" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 cursor-pointer hover:bg-slate-50 text-sm font-medium">
                              <Upload className="w-4 h-4" /> Upload Logo
                              <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                            </Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-6">
                      <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg">
                        Proceed to Payment <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="max-w-xl mx-auto"
              >
                <Card className="border-none shadow-2xl bg-white">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Button variant="ghost" onClick={() => setStep(2)} className="text-slate-500">
                        ← Back to Info
                      </Button>
                      <Badge className="bg-emerald-100 text-emerald-700">Secure Checkout</Badge>
                    </div>
                    <CardTitle className="text-2xl">Payment Method</CardTitle>
                    <CardDescription>Select your preferred payment option to activate your school account.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-4">
                      {PAYMENT_METHODS.map((method) => (
                        <Label
                          key={method.id}
                          htmlFor={method.id}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
                            paymentMethod === method.id ? "border-blue-600 bg-blue-50/50" : "border-slate-100 hover:border-slate-200"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${paymentMethod === method.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                              <method.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold">{method.name}</p>
                              <p className="text-xs text-slate-500">{method.description}</p>
                            </div>
                          </div>
                          <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                          {paymentMethod === method.id && <Check className="w-5 h-5 text-blue-600" />}
                        </Label>
                      ))}
                    </RadioGroup>

                    {paymentMethod === "momo" && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 p-4 bg-slate-50 rounded-xl border">
                        <div className="space-y-2">
                          <Label>Mobile Money Number</Label>
                          <Input placeholder="e.g. 054 XXX XXXX" />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {["MTN", "Orange", "Telecel"].map(net => (
                            <Button key={net} variant="outline" className="h-10 text-xs">{net}</Button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <div className="w-full flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-500">Total Due Now:</span>
                      <span className="font-bold text-lg">{PLANS.find(p => p.id === selectedPlan)?.price}</span>
                    </div>
                    <Button onClick={handleCompletePayment} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg">
                      Confirm & Pay Now
                    </Button>
                    <p className="text-[10px] text-center text-slate-400">
                      By clicking confirm, you authorize the payment provider to charge your account. Access will be granted immediately upon confirmation.
                    </p>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-12 border-t bg-slate-50">
        <div className="container px-4 text-center text-slate-500 text-sm">
          <p>© 2024 Academix Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}