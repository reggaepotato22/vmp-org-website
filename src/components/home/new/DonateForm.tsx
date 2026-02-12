import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Heart, CreditCard, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DonateFormData {
  amount: string;
  customAmount?: string;
  firstName: string;
  lastName: string;
  email: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const DONATION_AMOUNTS = [
  { value: "1000", label: "KES 1,000", desc: "Provides basic medication for 5 animals" },
  { value: "5000", label: "KES 5,000", desc: "Sponsors a community outreach clinic" },
  { value: "10000", label: "KES 10,000", desc: "Equips a volunteer team with tools" },
  { value: "custom", label: "Custom", desc: "Choose your amount" },
];

export const DonateForm = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<DonateFormData>({
    defaultValues: { amount: "1000" }
  });
  const [success, setSuccess] = useState(false);
  const selectedAmount = watch("amount");

  const onSubmit = async (data: DonateFormData) => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Donation processed:", data);
    setSuccess(true);
  };

  if (success) {
    return (
      <Card className="w-full max-w-lg mx-auto text-center p-8 border-vmp-maroon border-t-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
            <Heart className="h-10 w-10 text-green-600 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-vmp-black">Thank You!</h3>
          <p className="text-gray-600">Your donation has been received and will make a real difference.</p>
          <Button onClick={() => setSuccess(false)} variant="outline">Make another donation</Button>
        </motion.div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl border-t-4 border-vmp-maroon">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-vmp-maroon">Make a Donation</CardTitle>
        <CardDescription className="text-center">Secure, tax-deductible donation</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Amount Selection */}
          <div className="space-y-3">
            <Label>Select Amount</Label>
            <RadioGroup 
              defaultValue="1000" 
              className="grid grid-cols-2 gap-4"
              onValueChange={(val) => setValue("amount", val)}
            >
              {DONATION_AMOUNTS.map((amt) => (
                <div key={amt.value}>
                  <RadioGroupItem value={amt.value} id={`amt-${amt.value}`} className="peer sr-only" />
                  <Label
                    htmlFor={`amt-${amt.value}`}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-vmp-maroon peer-data-[state=checked]:text-vmp-maroon cursor-pointer transition-all"
                  >
                    <span className="text-xl font-bold">{amt.label}</span>
                    <span className="text-xs text-muted-foreground text-center mt-1">{amt.desc}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {selectedAmount === "custom" && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="pt-2"
              >
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                  <Input 
                    {...register("customAmount", { required: selectedAmount === "custom" })}
                    type="number" 
                    placeholder="Enter amount" 
                    className="pl-10" 
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input {...register("firstName", { required: true })} id="firstName" placeholder="Jane" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input {...register("lastName", { required: true })} id="lastName" placeholder="Doe" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })} 
              id="email" 
              placeholder="jane@example.com" 
            />
          </div>

          {/* Payment Info (Mock) */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-5 w-5 text-vmp-maroon" />
              <span className="font-semibold text-sm">Payment Details</span>
            </div>
            
            <div className="space-y-2">
              <Input 
                {...register("cardNumber", { required: true })} 
                placeholder="Card Number" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input 
                {...register("expiry", { required: true })} 
                placeholder="MM/YY" 
              />
              <Input 
                {...register("cvc", { required: true })} 
                placeholder="CVC" 
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-vmp-maroon hover:bg-vmp-maroon/90 text-white h-12 text-lg font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : `Donate ${selectedAmount === "custom" ? "" : "$" + selectedAmount}`}
          </Button>
          
          <p className="text-xs text-center text-gray-500 mt-4">
            Your donation is secure and encrypted.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default DonateForm;
