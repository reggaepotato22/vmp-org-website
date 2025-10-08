import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface FlutterwaveDonateProps {
  amount: number;
  paymentMethod: "mpesa" | "card";
  donationType: "one-time" | "monthly" | "sponsorship";
}

const FlutterwaveDonate = ({ amount, paymentMethod, donationType }: FlutterwaveDonateProps) => {
  
  const config = {
    public_key: "FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxx-X", // Replace with your actual Flutterwave public key
    tx_ref: `VMP-${donationType}-${Date.now()}`,
    amount: amount,
    currency: paymentMethod === "mpesa" ? "KES" : "USD",
    payment_options: paymentMethod === "mpesa" ? "mpesa" : "card",
    customer: {
      email: "donor@example.com", // You can make this dynamic with a form field
      phone_number: paymentMethod === "mpesa" ? "254XXXXXXXXX" : "", // Required for M-Pesa
      name: "Anonymous Donor",
    },
    customizations: {
      title: "VMP Donation",
      description: `${donationType.charAt(0).toUpperCase() + donationType.slice(1)} donation to Veterinary Mission Partners`,
      logo: "https://kenyavetsmission.org/logo.png", // Replace with your actual logo URL
    },
  };

  const fwConfig = {
    ...config,
    text: paymentMethod === "mpesa" ? "Pay with M-Pesa" : "Pay with Card",
    callback: (response: any) => {
      console.log("Payment response:", response);
      
      if (response.status === "successful") {
        alert("Thank you for your donation! A receipt will be sent to your email.");
        // Here you can send the transaction details to your backend
        // to record the donation and send a receipt
      } else {
        alert("Payment was not completed. Please try again.");
      }
      
      closePaymentModal();
    },
    onClose: () => {
      console.log("Payment modal closed");
    },
  };

  return (
    <div>
      <FlutterWaveButton 
        {...fwConfig} 
        className="w-full h-12 bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 rounded-lg font-medium transition-colors"
      >
        <Heart className="h-4 w-4" />
        {paymentMethod === "mpesa" ? "Pay with M-Pesa" : "Pay with Card"}
      </FlutterWaveButton>

      {paymentMethod === "mpesa" && (
        <p className="text-xs text-muted-foreground text-center mt-2">
          You'll receive an M-Pesa prompt on your phone
        </p>
      )}
    </div>
  );
};

export default FlutterwaveDonate;