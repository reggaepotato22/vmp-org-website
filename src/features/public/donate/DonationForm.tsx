import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CreditCard, Smartphone, Check } from "lucide-react";
import FlutterwaveDonate from "@/components/donate/FlutterwaveDonate";

const PRESET_AMOUNTS = [25, 50, 100, 250, 500];

const DonationForm = () => {
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("card");
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Currency handling
  const currency = paymentMethod === "mpesa" ? "KES" : "USD";
  const displayAmount = customAmount ? parseFloat(customAmount) : amount;
  
  // Convert USD to KES roughly for display (in real app use live rates)
  // For simplicity in this demo, we'll just treat the number as the value in the selected currency
  // but usually you'd want to scale KES amounts (e.g. $10 = 1500 KES)
  
  useEffect(() => {
    // Reset custom amount when switching presets
    if (amount) setCustomAmount("");
  }, [amount]);

  const isValid = name.length > 2 && email.includes("@") && (paymentMethod !== "mpesa" || phone.length > 9) && displayAmount > 0;

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-heading text-slate-800">
          Make a Donation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Frequency Toggle */}
        <Tabs defaultValue="one-time" value={frequency} onValueChange={(v) => setFrequency(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="one-time">One-Time</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Amount Selection */}
        <div className="space-y-3">
          <Label>Select Amount ({currency})</Label>
          <div className="grid grid-cols-3 gap-2">
            {PRESET_AMOUNTS.map((val) => (
              <Button
                key={val}
                type="button"
                variant={amount === val && !customAmount ? "default" : "outline"}
                className={amount === val && !customAmount ? "bg-blue-100 text-blue-900 border-blue-200 font-bold hover:bg-blue-200 hover:text-blue-900" : "border-slate-200 text-slate-700"}
                onClick={() => {
                  setAmount(val);
                  setCustomAmount("");
                }}
              >
                {currency === "USD" ? "$" : "KSh "}{val}
              </Button>
            ))}
            <div className="relative col-span-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">
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
                    className="pl-10"
                />
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-3">
            <Label>Payment Method</Label>
            <div className="grid grid-cols-2 gap-4">
                <div 
                    onClick={() => setPaymentMethod("card")}
                    className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === "card" ? "border-primary bg-blue-50 text-primary ring-1 ring-primary" : "border-slate-200 hover:border-slate-300"}`}
                >
                    <CreditCard className="h-6 w-6" />
                    <span className="font-semibold text-sm">Credit Card</span>
                    {paymentMethod === "card" && <Check className="h-4 w-4 text-primary absolute top-2 right-2" />}
                </div>
                
                <div 
                    onClick={() => setPaymentMethod("mpesa")}
                    className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === "mpesa" ? "border-green-600 bg-green-50 text-green-700 ring-1 ring-green-600" : "border-slate-200 hover:border-slate-300"}`}
                >
                    <Smartphone className="h-6 w-6" />
                    <span className="font-semibold text-sm">M-Pesa</span>
                    {paymentMethod === "mpesa" && <Check className="h-4 w-4 text-green-600 absolute top-2 right-2" />}
                </div>
            </div>
        </div>

        {/* Donor Details */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number {paymentMethod === "mpesa" && <span className="text-red-500">*</span>}</Label>
                <Input 
                    id="phone" 
                    type="tel" 
                    placeholder={paymentMethod === "mpesa" ? "254 7XX XXX XXX" : "+1 555 000 0000"} 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className={paymentMethod === "mpesa" && !phone ? "border-red-300 focus-visible:ring-red-500" : ""}
                />
                {paymentMethod === "mpesa" && (
                    <p className="text-xs text-slate-500">Required for M-Pesa prompt.</p>
                )}
            </div>
        </div>

        {/* Submit Button (Flutterwave) */}
        <div className="pt-4">
            <FlutterwaveDonate 
                amount={displayAmount}
                paymentMethod={paymentMethod}
                donationType={frequency}
                email={email}
                name={name}
                phone={phone}
                disabled={!isValid}
            />
        </div>
        
        <div className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-2">
            <div className="flex -space-x-1">
                 {/* Secure Icons Mockup */}
                 <div className="w-6 h-4 bg-slate-200 rounded"></div>
                 <div className="w-6 h-4 bg-slate-300 rounded"></div>
            </div>
            <span>Secure SSL Encryption</span>
        </div>

      </CardContent>
    </Card>
  );
};

export default DonationForm;
