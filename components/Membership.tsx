'use client';
import { PLANS } from "@/constants/pages";
import Button from "./Button";
import { supabase } from "../lib/supabase/client";

export default function Membership() {
 
  const handleCheckout = async (priceId: string | undefined, plan: string |undefined) => {
 
  if (!priceId) {
    console.log("Free plan or missing priceId — no Stripe checkout");
    return;
  }

   const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "/signup";
    return;
  }

  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, plan }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div>
        <section className="py-20 px-8 bg-white">
          <div className="max-w-6xl mx-auto text-center space-y-12">
            <h2 className="text-4xl font-bold text-gray-900">
             Memberships
            </h2>
            <div className="flex flex-col h-20xl md:flex-row justify-start gap-6 text-left ">
             {PLANS.map((plan, index) => (
              <div key={index}  className={`relative flex flex-col justify-between bg-gray-100 p-8 rounded-lg shadow-md space-y-4 flex-1 min-h-[400px]
    ${plan.name === "Pro Plan" ? "border-2 border-orange-500 bg-orange-50 scale-105 shadow-lg" : ""}`}>

                  {/* Badge for Pro Plan */}
          {plan.name === "Pro Plan" && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
              Best Value
            </div>
          )}
                <div>
                <h2 className="text-lg font-semibold uppercase tracking-wide"> {plan.name}</h2>
                <div className="text-xs mt-2"> Starting at </div>
                <div className="text-5xl font-bold"> {plan.price}/mo*</div>
                 <div className="text-xs"> plus tax and fees </div>
                 <ul className="list-disc list-inside space-y-2 mt-4 text-md">
                  {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                  <span className="text-green-500 text-lg mr-3">◉</span>
      <span>{feature}</span>
                  </li>

                  ))}

                 </ul>
              </div>
              <Button  onClick={() => handleCheckout(plan.priceId, plan.name)} className="mt-auto bg-white text-orange-600 font-semibold py-2 px-4 rounded-full shadow hover:bg-gray-100 transition self-end">
              Join Now
            </Button>
              </div>
             ))}

            </div>
           
          </div>
        </section>
     </div>
        
  );
}