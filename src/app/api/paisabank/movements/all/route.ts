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

  const {searchParams} = new URL(request.url);
  const filter = searchParams.get("filter");

  let query = supabase.from("transactions").select("*").eq("user_id", user.id);

  if (filter && filter !== "ALL" && ["SUS", "CASH_IN", "CASH_OUT"].includes(filter)) {
    query = query.eq("transactionType", filter);
  }

  const {data: filteredTransactions, error} = await query.order("date", {ascending: false});

  if (error) {
    return NextResponse.json(
      {success: false, message: "Error getting transactions"},
      {status: 500},
    );
  }

  return NextResponse.json({
    success: true,
    data: filteredTransactions,
  });
}
