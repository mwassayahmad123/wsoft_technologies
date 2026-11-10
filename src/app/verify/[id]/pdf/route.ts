import { renderCertificatePdf } from "@/lib/certificates/pdf";
import { getCertificate } from "@/lib/certificates/store";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: RouteContext<"/verify/[id]/pdf">) {
  const { id } = await ctx.params;
  const cert = await getCertificate(id);
  if (!cert || cert.status !== "valid") {
    return new Response("Certificate not found or no longer valid.", { status: 404 });
  }
  const bytes = await renderCertificatePdf(cert);
  const filename = `Wsoft-Internship-Certificate-${cert.name.replace(/[^A-Za-z0-9]+/g, "-")}.pdf`;
  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
