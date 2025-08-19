"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import { useRouter } from "next/navigation"

export default function SuccessPage() {
  const router = useRouter();
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
          setMessage(data.message);
        } else {
          setMessage(data.error || data.message);
        }
      } catch {
        setMessage("Something went wrong verifying your payment.");
      }
    };

    verifyPayment();
  }, [searchParams]);

return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">

      <p className="text-lg mb-8">
        {message === 'Verifying payment...' ? (
          <span className="animate-pulse">{message}</span>
        ) : (
          message
        )}
      </p>

      {message.startsWith('✅') || message.toLowerCase().includes('successful') ? (
        <div className="flex flex-col md:flex-row gap-4">
          <Button onClick={() => router.push('/')}>
            Go to Home
          </Button>
          <Button onClick={() => router.push('/booking')}>
            📅 Book a Class
          </Button>
        </div>
      ) : null}
    </div>
  );
}
