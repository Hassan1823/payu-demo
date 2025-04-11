"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaymentSuccess() {
  const [status, setStatus] = useState("Processing...");

  useEffect(() => {
    // Get the URL parameters
    const params = new URLSearchParams(window.location.search);
    const txnid = params.get("txnid");
    const status = params.get("status");
    const hash = params.get("hash");

    if (status === "success") {
      setStatus("Payment Successful!");
    } else {
      setStatus("Payment Failed");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold mb-4">{status}</h1>
        <p className="text-gray-600 mb-6">
          {status === "Payment Successful!"
            ? "Thank you for your purchase. Your payment has been processed successfully."
            : "We&apos;re sorry, but your payment could not be processed. Please try again."}
        </p>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
