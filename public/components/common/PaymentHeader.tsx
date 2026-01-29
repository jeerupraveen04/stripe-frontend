type PaymentHeaderProps = {
  name: string;
};

const PaymentHeader = ({ name }: PaymentHeaderProps) => {
  return (
    <header className="w-full bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-200 shadow-lg">
            <span className="text-white font-black text-xs">S</span>
          </div>
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            {name}
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">
            Secure Payment
          </span>
        </div>
      </div>
    </header>
  );
};

export default PaymentHeader;
