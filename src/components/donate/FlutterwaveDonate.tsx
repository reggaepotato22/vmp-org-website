import { useState } from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { Button } from "@/components/ui/button";
import { DollarSign, Heart } from "lucide-react";

const FlutterwaveDonate = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<number | null>(null);

  const donationAmounts = [25, 50, 100, 250, 500, 1000];

  // Final donation amount (custom overrides preset if entered)
  const finalAmount = customAmount || selectedAmount || 0;

  const config = {
    public_key: "FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxx-X", // replace with your Flutterwave test key
    tx_ref: Date.now().toString(),
    amount: finalAmount,
    currency: "KES", // KES for M-Pesa (or "USD" if default Visa payments)
    payment_options: "card,mpesa",
    customer: {
      email: "donor@example.com",
      phonenumber: "2547XXXXXXX",
      name: "Anonymous Donor",
    },
    customizations: {
      title: "Charity Donation",
      description: "Support our cause with your donation",
      logo: "https://your-logo-url.com/logo.png",
    },
  };

  const fwConfig = {
    ...config,
    text: "Donate Now",
    callback: (response: any) => {
      console.log("Payment response:", response);
      closePaymentModal(); // close modal after payment
    },
    onClose: () => {},
  };

  return (
    <div>
      {/* Donation Amount Selection */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
        {donationAmounts.map((amount, index) => (
          <Button
            key={index}
            variant={selectedAmount === amount ? "default" : "outline"}
            className="h-12"
            onClick={() => {
              setSelectedAmount(amount);
              setCustomAmount(null); // reset custom if preset chosen
            }}
          >
            ${amount}
          </Button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          Custom Amount
        </label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md"
            value={customAmount || ""}
            onChange={(e) => {
              setCustomAmount(Number(e.target.value) || null);
              setSelectedAmount(null); // reset preset if typing custom
            }}
          />
        </div>
      </div>

      {/* Donate Button */}
      <div>
        {finalAmount > 0 ? (
          <FlutterWaveButton {...fwConfig} className="w-full h-12 bg-primary text-white flex items-center justify-center gap-2 rounded-lg">
            <Heart className="h-4 w-4" />
            Donate Now
          </FlutterWaveButton>
        ) : (
          <Button disabled className="w-full h-12">
            Select or Enter Amount
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-2">
        Secure payment processing • Tax-deductible receipt provided
      </p>
    </div>
  );
};

export default FlutterwaveDonate;
