import { getChatGPTUser } from "@/app/chatgpt-auth";
import type { AutomationContent } from "@/lib/catalogue";
import {
  createAutomation,
  duplicateAutomation,
  getCatalogueRecords,
  isAdminEmail,
  publishAutomation,
  reorderAutomations,
  setAutomationArchived,
  unpublishAutomation,
  updateAutomationDraft,
} from "@/lib/catalogue-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Sign in required." }, { status: 401 });
  if (!isAdminEmail(user.email)) return Response.json({ error: "Access denied." }, { status: 403 });

  try {
    const records = await getCatalogueRecords();
    return Response.json({ records });
  } catch (error) {
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Sign in required." }, { status: 401 });
  if (!isAdminEmail(user.email)) return Response.json({ error: "Access denied." }, { status: 403 });

  try {
    const payload = (await request.json()) as AdminAction;
    const records = await runAction(payload, user.email.toLowerCase());
    return Response.json({ records });
  } catch (error) {
    return Response.json({ error: errorMessage(error) }, { status: 400 });
  }
}

type AdminAction =
  | { action: "create"; partial?: Partial<AutomationContent> }
  | { action: "update"; id: number; draft: AutomationContent }
  | { action: "duplicate"; id: number }
  | { action: "publish"; id: number }
  | { action: "unpublish"; id: number }
  | { action: "archive"; id: number }
  | { action: "restore"; id: number }
  | { action: "reorder"; ids: number[] };

async function runAction(payload: AdminAction, email: string) {
  switch (payload.action) {
    case "create":
      return createAutomation(email, payload.partial);
    case "update":
      return updateAutomationDraft(Number(payload.id), payload.draft, email);
    case "duplicate":
      return duplicateAutomation(Number(payload.id), email);
    case "publish":
      return publishAutomation(Number(payload.id), email);
    case "unpublish":
      return unpublishAutomation(Number(payload.id), email);
    case "archive":
      return setAutomationArchived(Number(payload.id), true, email);
    case "restore":
      return setAutomationArchived(Number(payload.id), false, email);
    case "reorder":
      return reorderAutomations(payload.ids.map(Number), email);
    default:
      throw new Error("Unknown admin action.");
  }
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unexpected error.";
}
