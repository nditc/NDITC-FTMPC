import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const id = process.env.ADMIN_ID;
  const pass = process.env.ADMIN_PASS;
  const data = await req.json();
  console.log(id, pass);
  if (data?.id === id && data?.pass === pass) {
    return NextResponse.json({ auth: true });
  } else {
    return NextResponse.json({ auth: false });
  }
}
