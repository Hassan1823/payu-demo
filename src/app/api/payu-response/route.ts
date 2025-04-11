import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const response = Object.fromEntries(formData.entries());

    console.log("PayU Response:", response);

    // Verify the hash
    const salt = "4R38IvwiV57FwVpsgOvTXBdLE4tHUXFW";
    const hashString = `${salt}|${response.status}|||||||||${response.udf5}|${response.udf4}|${response.udf3}|${response.udf2}|${response.udf1}|${response.email}|${response.firstname}|${response.productinfo}|${response.amount}|${response.txnid}|${response.key}`;

    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    if (hash !== response.hash) {
      console.error("Hash verification failed");
      return NextResponse.redirect(
        "https://payu-demo-five.vercel.app/payment/failure"
      );
    }

    // Handle success/failure based on status
    if (response.status === "success") {
      return NextResponse.redirect(
        "https://payu-demo-five.vercel.app/payment/success"
      );
    } else {
      return NextResponse.redirect(
        "https://payu-demo-five.vercel.app/payment/failure"
      );
    }
  } catch (error) {
    console.error("Error processing PayU response:", error);
    return NextResponse.redirect(
      "https://payu-demo-five.vercel.app/payment/failure"
    );
  }
}
