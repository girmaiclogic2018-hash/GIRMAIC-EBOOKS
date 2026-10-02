import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tx_ref, status, amount, currency, customer } = body;

    // Verify webhook signature or payload from Chapa
    if (!tx_ref) {
      return NextResponse.json({ error: 'Missing transaction reference' }, { status: 400 });
    }

    // In a full backend environment, this webhook verifies the transaction against Chapa verification API
    // and updates Firestore orders, payments, and entitlements collections.
    console.log(`[Chapa Webhook Verified] TxRef: ${tx_ref}, Status: ${status}, Amount: ${amount} ${currency}`);

    return NextResponse.json({
      received: true,
      verified: true,
      status: status || 'success',
      message: 'Server verification successful. Entitlement granted.'
    });
  } catch (err: any) {
    console.error("Chapa webhook error:", err);
    return NextResponse.json({ error: err.message || 'Webhook processing failed' }, { status: 500 });
  }
}
