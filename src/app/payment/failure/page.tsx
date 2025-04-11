import Link from "next/link";

export default function PaymentFailure() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-red-500 text-6xl mb-4">✕</div>
        <h1 className="text-2xl font-bold mb-4">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          We&apos;re sorry, but your payment could not be processed. Please try
          again.
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
