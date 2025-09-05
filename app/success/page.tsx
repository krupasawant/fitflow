import { Suspense } from "react";
import SuccessContent from "./SucessContent";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <Suspense fallback={<p className="animate-pulse">Verifying payment...</p>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
