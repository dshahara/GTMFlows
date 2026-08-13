import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { ADMIN_EMAILS } from "@/lib/catalogue";
import { isAdminEmail } from "@/lib/catalogue-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthenticatedUser = {
  id: string;
  email: string;
  displayName: string;
  raw: User;
};

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user?.email) return null;

  return {
    id: data.user.id,
    email: data.user.email.toLowerCase(),
    displayName: data.user.user_metadata?.full_name || data.user.email,
    raw: data.user,
  };
}

export async function requireAuthenticatedUser(returnTo = "/admin") {
  const user = await getAuthenticatedUser();
  if (user) return user;

  redirect(loginPath(returnTo));
}

export async function requireAdminUser(returnTo = "/admin") {
  const user = await requireAuthenticatedUser(returnTo);
  return user;
}

export function loginPath(returnTo = "/admin") {
  return `/login?returnTo=${encodeURIComponent(safeRelativeReturnPath(returnTo))}`;
}

export function signOutPath(returnTo = "/") {
  return `/auth/signout?returnTo=${encodeURIComponent(safeRelativeReturnPath(returnTo))}`;
}

export function accessDeniedMessage(email: string) {
  return `Signed in as ${email}. Approved admins are ${ADMIN_EMAILS.join(" and ")}.`;
}

function safeRelativeReturnPath(value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) return "/";

  try {
    const url = new URL(value, "https://app.local");
    if (url.origin !== "https://app.local") return "/";
    if (url.pathname === "/login" || url.pathname.startsWith("/auth/")) return "/";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}

export { isAdminEmail };
