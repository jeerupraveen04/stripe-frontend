import PaymentStatusPage from "@/public/components/status/PaymentStatusPage";
import { Suspense } from "react";

export default function StatusPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentStatusPage />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-semibold">Loading payment status...</p>
    </div>
  );
}
