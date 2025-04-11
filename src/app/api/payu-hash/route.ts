import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { hashString } = await request.json();
    console.log("Received hash string:", hashString);

    // Calculate SHA512 hash
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    console.log("Calculated hash:", hash);

    // Return the hash in the format PayU expects
    return NextResponse.json({
      v1: hash,
      v2: hash, // In test environment, both v1 and v2 are the same
    });
  } catch (error) {
    console.error("Hash calculation error:", error);
    return NextResponse.json(
      { error: "Failed to generate hash" },
      { status: 500 }
    );
  }
}
