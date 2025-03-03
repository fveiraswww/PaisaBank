import {createServerClient} from "@supabase/ssr";
import {createClient} from "@supabase/supabase-js";
import {cookies, type UnsafeUnwrappedCookies} from "next/headers";

export async function supabaseServer(isAdmin?: boolean) {
  if (isAdmin) {
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROL!);
  }

  const cookieStore = (await cookies()) as unknown as UnsafeUnwrappedCookies;

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({name, value, options}) => cookieStore.set(name, value, options));
          } catch {
            // middleware catch this error
          }
        },
      },
    },
  );
}
