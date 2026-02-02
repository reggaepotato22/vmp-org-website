import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { Heart, Smartphone, CreditCard } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is installed, if not we'll use window.alert

interface FlutterwaveDonateProps {
  amount: number;
  paymentMethod: "mpesa" | "card";
  donationType: "one-time" | "monthly";
  email: string;
  name: string;
  phone: string;
  disabled?: boolean;
}

const FlutterwaveDonate = ({ 
  amount, 
  paymentMethod, 
  donationType, 
  email, 
  name, 
  phone,
  disabled 
}: FlutterwaveDonateProps) => {
  
  // validation
  if (!email || !name || (paymentMethod === "mpesa" && !phone)) {
     // We return a disabled-looking button if data is missing, but the parent form should handle validation visuals
  }

  const config = {
    public_key: "FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxx-X", // TODO: Replace with env variable
    tx_ref: `VMP-${donationType}-${Date.now()}`,
    amount: amount,
    currency: paymentMethod === "mpesa" ? "KES" : "USD",
    payment_options: paymentMethod === "mpesa" ? "mpesa" : "card",
    customer: {
      email: email,
      phone_number: phone,
      name: name,
    },
    customizations: {
      title: "Kenya Vets Mission",
      description: `${donationType === 'monthly' ? 'Monthly ' : ''}Donation`,
      logo: "https://kenyavetsmission.org/logo.png",
    },
    meta: {
        donation_type: donationType,
        source: "website"
    }
  };

  const fwConfig = {
    ...config,
    text: paymentMethod === "mpesa" ? "Donate with M-Pesa" : "Donate with Card",
    callback: (response: any) => {
      console.log("Payment response:", response);
      
      if (response.status === "successful") {
        toast.success("Thank you for your donation! A receipt has been sent to your email.");
      } else {
        toast.error("Payment could not be completed. Please try again.");
      }
      
      closePaymentModal();
    },
    onClose: () => {
      // console.log("Payment modal closed");
    },
  };

  return (
    <div className="w-full">
      <FlutterWaveButton 
        {...fwConfig} 
        disabled={disabled}
        className={`w-full h-12 flex items-center justify-center gap-2 rounded-lg font-bold transition-all
            ${disabled 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                : paymentMethod === "mpesa"
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
            }
        `}
      >
        {paymentMethod === "mpesa" ? <Smartphone className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
        {paymentMethod === "mpesa" ? `Donate KES ${amount}` : `Donate $${amount}`}
      </FlutterWaveButton>

      {paymentMethod === "mpesa" && !disabled && (
        <p className="text-xs text-green-700 text-center mt-2 flex items-center justify-center font-medium bg-green-50 py-1 rounded">
            <Smartphone className="h-3 w-3 mr-1" />
            Check your phone for the M-Pesa prompt
        </p>
      )}
    </div>
  );
};

export default FlutterwaveDonate;
