import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CreditCard, Smartphone, Check, Heart } from "lucide-react";
import FlutterwaveDonate from "@/components/donate/FlutterwaveDonate";
import { motion } from "framer-motion";

const PRESET_AMOUNTS_USD = [25, 50, 100, 250, 500];
const PRESET_AMOUNTS_KES = [1000, 2500, 5000, 10000, 50000];

const DonationForm = () => {
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("card");
  
  // Currency determined by payment method
  const currency = paymentMethod === "mpesa" ? "KES" : "USD";
  const presets = currency === "KES" ? PRESET_AMOUNTS_KES : PRESET_AMOUNTS_USD;

  const [amount, setAmount] = useState<number>(presets[1]); // Default to 2nd option
  const [customAmount, setCustomAmount] = useState<string>("");
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const displayAmount = customAmount ? parseFloat(customAmount) : amount;
  
  // Reset amount when currency changes to avoid weird values
  useEffect(() => {
    setAmount(presets[1]);
    setCustomAmount("");
  }, [paymentMethod]);

  // Reset custom amount when switching presets
  useEffect(() => {
    if (amount) setCustomAmount("");
  }, [amount]);

  const isValid = name.length > 2 && email.includes("@") && (paymentMethod !== "mpesa" || phone.length > 9) && displayAmount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="w-full max-w-lg mx-auto shadow-2xl border-0 rounded-3xl overflow-hidden relative z-30">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary to-primary"></div>
        <CardHeader className="pb-2 pt-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary fill-current" />
            </div>
          </div>
          <CardTitle className="text-3xl text-center font-heading font-bold text-slate-900">
            Make a Donation
          </CardTitle>
          <p className="text-center text-slate-500">
            Join us in making a difference today
          </p>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          
          {/* Frequency Toggle */}
          <Tabs defaultValue="one-time" value={frequency} onValueChange={(v) => setFrequency(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-xl h-auto">
              <TabsTrigger 
                value="one-time" 
                className="rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm font-semibold transition-all"
              >
                One-Time
              </TabsTrigger>
              <TabsTrigger 
                value="monthly"
                className="rounded-lg py-2.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm font-semibold transition-all"
              >
                Monthly
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Payment Method Selection */}
          <div className="space-y-3">
              <Label className="text-slate-700 font-semibold">Payment Method</Label>
              <div className="grid grid-cols-2 gap-4">
                  <div 
                      onClick={() => setPaymentMethod("card")}
                      className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${paymentMethod === "card" ? "border-primary bg-primary/5 text-slate-900 shadow-md transform scale-[1.02]" : "border-slate-100 bg-slate-50 hover:border-slate-300 text-slate-500"}`}
                  >
                      <CreditCard className={`h-6 w-6 ${paymentMethod === "card" ? "text-primary" : "text-slate-400"}`} />
                      <span className="font-bold text-sm">Card (USD)</span>
                  </div>
                  <div 
                      onClick={() => setPaymentMethod("mpesa")}
                      className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${paymentMethod === "mpesa" ? "border-green-600 bg-green-50 text-green-900 shadow-md transform scale-[1.02]" : "border-slate-100 bg-slate-50 hover:border-slate-300 text-slate-500"}`}
                  >
                      <Smartphone className={`h-6 w-6 ${paymentMethod === "mpesa" ? "text-green-600" : "text-slate-400"}`} />
                      <span className="font-bold text-sm">M-Pesa (KES)</span>
                  </div>
              </div>
          </div>

          {/* Amount Selection */}
          <div className="space-y-3">
            <Label className="text-slate-700 font-semibold">Select Amount ({currency})</Label>
            <div className="grid grid-cols-3 gap-3">
              {presets.map((val) => (
                <Button
                  key={val}
                  type="button"
                  variant="outline"
                  className={`h-12 border-2 text-base rounded-xl transition-all duration-200 ${
                    amount === val && !customAmount 
                      ? "bg-primary text-white border-primary hover:bg-primary/90 hover:text-white shadow-md transform scale-[1.02]" 
                      : "border-slate-200 text-slate-600 hover:border-primary/30 hover:text-primary hover:bg-primary/5"
                  }`}
                  onClick={() => {
                    setAmount(val);
                    setCustomAmount("");
                  }}
                >
                  {currency === "USD" ? "$" : "KSh "}{val.toLocaleString()}
                </Button>
              ))}
              <div className="relative col-span-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold z-10">
                      {currency === "USD" ? "$" : "KSh"}
                  </span>
                  <Input
                      type="number"
                      placeholder="Other"
                      value={customAmount}
                      onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setAmount(0);
                      }}
                      className={`pl-10 h-12 border-2 rounded-xl text-base ${customAmount ? "border-primary ring-2 ring-primary/20" : "border-slate-200"}`}
                  />
              </div>
            </div>
          </div>

          {/* Donor Details */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="grid gap-2">
                  <Label htmlFor="name" className="text-slate-700 font-semibold">Full Name</Label>
                  <Input 
                      id="name" 
                      placeholder="John Doe" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 rounded-xl border-slate-200 focus:border-primary focus:ring-primary/20"
                  />
              </div>
              
              <div className="grid gap-2">
                  <Label htmlFor="email" className="text-slate-700 font-semibold">Email Address</Label>
                  <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 rounded-xl border-slate-200 focus:border-primary focus:ring-primary/20"
                  />
              </div>

              {paymentMethod === "mpesa" && (
                  <div className="grid gap-2 animate-in fade-in slide-in-from-top-2">
                      <Label htmlFor="phone" className="text-slate-700 font-semibold">M-Pesa Phone Number</Label>
                      <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="0712 345 678" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)}
                          className="h-11 rounded-xl border-slate-200 focus:border-primary focus:ring-primary/20"
                      />
                      <p className="text-xs text-slate-500">Enter the number that will receive the M-Pesa prompt.</p>
                  </div>
              )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
              <FlutterwaveDonate 
                  amount={displayAmount}
                  paymentMethod={paymentMethod}
                  donationType={frequency}
                  email={email}
                  name={name}
                  phone={phone}
                  disabled={!isValid}
              />
              <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1">
                  <Check className="w-3 h-3" /> Secure payment processed by Flutterwave.
              </p>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DonationForm;
