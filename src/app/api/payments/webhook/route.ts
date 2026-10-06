import { NextResponse } from "next/server";

export async function POST() {
  // Webhook de paiement désactivé temporairement
  // La table PaymentOrder n'existe pas encore dans le schéma
  return NextResponse.json({ ok: true });
}
