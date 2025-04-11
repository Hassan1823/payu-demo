"use client";

import { useState } from "react";
import axios from "axios";

interface PaymentFormProps {
  amount: number;
  productName: string;
}

export default function PaymentForm({ amount, productName }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);

  const generateTransactionId = () => {
    // Generate a random string for transaction ID
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `TXN${timestamp}${random}`;
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // PayU test credentials
      const merchantKey = "gtKFFx";
      const salt = "4R38IvwiV57FwVpsgOvTXBdLE4tHUXFW";
      const txnId = generateTransactionId();

      // Create hash string in the exact format required by PayU
      const hashString = `${merchantKey}|${txnId}|${amount}|${productName}|Test User|test@test.com|||||||||||${salt}`;
      console.log("Hash String:", hashString);

      // Calculate hash on the server side
      const hashResponse = await axios.post("/api/payu-hash", { hashString });
      const hash = hashResponse.data.v1;
      console.log("Generated Hash:", hash);

      // Create form and submit
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://test.payu.in/_payment";

      // Add all required parameters
      const params = {
        key: merchantKey,
        txnid: txnId,
        amount: amount.toString(),
        productinfo: productName,
        firstname: "Test User",
        email: "test@test.com",
        phone: "9876543210",
        surl: "https://payu-demo-five.vercel.app/payment/success",
        furl: "https://payu-demo-five.vercel.app/payment/failure",
        hash: hash,
        service_provider: "payu_paisa",
        curl: "https://payu-demo-five.vercel.app/payment/cancel",
        udf1: "",
        udf2: "",
        udf3: "",
        udf4: "",
        udf5: "",
      };

      console.log("Payment Parameters:", params);

      // Add parameters to form
      Object.entries(params).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      // Add form to document and submit
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Payment initiation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}
