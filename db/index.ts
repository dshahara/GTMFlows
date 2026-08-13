import { createSupabaseAdminClient } from "@/lib/supabase/server";

export function getDb() {
  return createSupabaseAdminClient();
}
