import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const response = Object.fromEntries(formData.entries());

    console.log("PayU POST Response:", JSON.stringify(response, null, 2));

    // Verify the hash
    const salt = "4R38IvwiV57FwVpsgOvTXBdLE4tHUXFW";
    const hashString = `${response.key}|${response.txnid}|${response.amount}|${response.productinfo}|${response.firstname}|${response.email}|||||||||||${salt}`;

    console.log("Hash String:", hashString);

    const hash = crypto.createHash("sha512").update(hashString).digest("hex");
    console.log("Calculated Hash:", hash);
    console.log("Received Hash:", response.hash);

    if (hash !== response.hash) {
      console.error("Hash verification failed");
      return NextResponse.redirect(
        "https://payu-demo-five.vercel.app/payment/failure?error=hash_verification_failed"
      );
    }

    // Redirect based on status
    if (response.status === "success") {
      return NextResponse.redirect(
        `https://payu-demo-five.vercel.app/payment/success?txnid=${response.txnid}&status=${response.status}&hash=${response.hash}`
      );
    } else {
      return NextResponse.redirect(
        `https://payu-demo-five.vercel.app/payment/failure?txnid=${response.txnid}&status=${response.status}&hash=${response.hash}`
      );
    }
  } catch (error) {
    console.error("Error processing PayU response:", error);
    return NextResponse.redirect(
      "https://payu-demo-five.vercel.app/payment/failure?error=processing_error"
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const response = Object.fromEntries(searchParams.entries());

    console.log("PayU GET Response:", JSON.stringify(response, null, 2));

    // Verify the hash
    const salt = "4R38IvwiV57FwVpsgOvTXBdLE4tHUXFW";
    const hashString = `${response.key}|${response.txnid}|${response.amount}|${response.productinfo}|${response.firstname}|${response.email}|||||||||||${salt}`;

    console.log("Hash String:", hashString);

    const hash = crypto.createHash("sha512").update(hashString).digest("hex");
    console.log("Calculated Hash:", hash);
    console.log("Received Hash:", response.hash);

    if (hash !== response.hash) {
      console.error("Hash verification failed");
      return NextResponse.redirect(
        "https://payu-demo-five.vercel.app/payment/failure?error=hash_verification_failed"
      );
    }

    // Redirect based on status
    if (response.status === "success") {
      return NextResponse.redirect(
        `https://payu-demo-five.vercel.app/payment/success?txnid=${response.txnid}&status=${response.status}&hash=${response.hash}`
      );
    } else {
      return NextResponse.redirect(
        `https://payu-demo-five.vercel.app/payment/failure?txnid=${response.txnid}&status=${response.status}&hash=${response.hash}`
      );
    }
  } catch (error) {
    console.error("Error processing PayU response:", error);
    return NextResponse.redirect(
      "https://payu-demo-five.vercel.app/payment/failure?error=processing_error"
    );
  }
}
