import PaymentHeader from "@/public/components/common/PaymentHeader";
import PaymentStatusPage from "@/public/components/status/PaymentStatusPage";
import { Suspense } from "react";

export default function StatusPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PaymentHeader name="Payment Status" />

      <Suspense fallback={<Loading />}>
        <div className="flex-1 flex items-center justify-center p-6">
          <PaymentStatusPage />
        </div>
      </Suspense>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
        <p className="text-lg font-semibold">Checking payment status...</p>
      </div>
    </div>
  );
}
