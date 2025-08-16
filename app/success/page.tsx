"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const [message, setMessage] = useState("Verifying payment...");
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) {
        setMessage("No session ID found.");
        return;
      }

      

      try {
        const res = await fetch("/api/checkout/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();
        if (data.success) {
          setMessage(data.message || "Payment successful!");
        } else {
          setMessage(data.error || data.message || " Payment verification failed.");
        }
      } catch {
        setMessage("⚠️ Something went wrong verifying your payment.");
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Payment Status</h1>

      {message === "Verifying payment..." ? (
        <p className="animate-pulse text-lg">{message}</p>
      ) : (
        <p className="text-lg">{message}</p>
      )}
    </div>
  );
}
