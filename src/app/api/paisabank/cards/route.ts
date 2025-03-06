import {type NextRequest, NextResponse} from "next/server";

import {supabaseServer} from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await supabaseServer();
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401});
  }

  const {
    data: {user},
  } = await supabase.auth.getUser(authHeader);

  if (!user) {
    return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401});
  }

  const {data: userCards, error} = await supabase.from("cards").select("*").eq("user_id", user.id);

  if (error) {
    return NextResponse.json({success: false, message: "Error getting cards"}, {status: 500});
  }

  return NextResponse.json({
    success: true,
    data: userCards,
  });
}
