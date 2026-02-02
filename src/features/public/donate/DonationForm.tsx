import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CreditCard, Smartphone, Check } from "lucide-react";
import FlutterwaveDonate from "@/components/donate/FlutterwaveDonate";

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

        {/* Payment Method Selection */}
        <div className="space-y-3">
            <Label>Payment Method</Label>
            <div className="grid grid-cols-2 gap-4">
                <div 
                    onClick={() => setPaymentMethod("card")}
                    className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === "card" ? "border-primary bg-blue-50 text-primary ring-1 ring-primary" : "border-slate-200 hover:border-slate-300"}`}
                >
                    <CreditCard className="h-6 w-6" />
                    <span className="font-semibold text-sm">Credit Card (USD)</span>
                </div>
                <div 
                    onClick={() => setPaymentMethod("mpesa")}
                    className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === "mpesa" ? "border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500" : "border-slate-200 hover:border-slate-300"}`}
                >
                    <Smartphone className="h-6 w-6" />
                    <span className="font-semibold text-sm">M-Pesa (KES)</span>
                </div>
            </div>
        </div>

        {/* Amount Selection */}
        <div className="space-y-3">
          <Label>Select Amount ({currency})</Label>
          <div className="grid grid-cols-3 gap-2">
            {presets.map((val) => (
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
                {currency === "USD" ? "$" : "KSh "}{val.toLocaleString()}
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

        {/* Donor Details */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>
            
            <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>

            {paymentMethod === "mpesa" && (
                <div className="grid gap-2 animate-in fade-in slide-in-from-top-2">
                    <Label htmlFor="phone">M-Pesa Phone Number</Label>
                    <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="0712 345 678" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                    />
                    <p className="text-xs text-slate-500">Enter the number that will receive the M-Pesa prompt.</p>
                </div>
            )}
        </div>

        {/* Submit Button */}
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
            <p className="text-xs text-center text-slate-400 mt-4">
                Secure payment processed by Flutterwave.
            </p>
        </div>

      </CardContent>
    </Card>
  );
};

export default DonationForm;
