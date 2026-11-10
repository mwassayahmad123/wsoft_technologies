import "server-only";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import QRCode from "qrcode";
import { team } from "@/data/content";
import { LOGO_PNG_BASE64 } from "./logo";
import type { Certificate } from "./store";

export const SITE_URL = (process.env.SITE_URL ?? "https://wsoftechnologies.com").replace(/\/$/, "");

export function verifyUrl(id: string) {
  return `${SITE_URL}/verify/${id}`;
}

export function formatCertDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const NAVY = rgb(15 / 255, 23 / 255, 42 / 255);
const SKY = rgb(14 / 255, 165 / 255, 233 / 255);
const SLATE = rgb(71 / 255, 85 / 255, 105 / 255);
const LIGHT = rgb(148 / 255, 163 / 255, 184 / 255);

function centered(page: PDFPage, text: string, y: number, size: number, font: PDFFont, color = NAVY) {
  const w = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: (page.getWidth() - w) / 2, y, size, font, color });
}

// pdf-lib has no letter-spacing option, so spaced headings are drawn one character at a time.
function spaced(
  page: PDFPage,
  text: string,
  centerX: number,
  y: number,
  size: number,
  font: PDFFont,
  spacing: number,
  color = NAVY,
) {
  const chars = [...text];
  const total =
    chars.reduce((sum, c) => sum + font.widthOfTextAtSize(c, size), 0) + spacing * (chars.length - 1);
  let x = centerX - total / 2;
  for (const c of chars) {
    page.drawText(c, { x, y, size, font, color });
    x += font.widthOfTextAtSize(c, size) + spacing;
  }
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function renderCertificatePdf(cert: Certificate): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`Internship Certificate - ${cert.name}`);
  pdf.setAuthor("Wsoft Technologies");
  pdf.setSubject(`Certificate ID ${cert.id}`);

  const page = pdf.addPage([842, 595]); // A4 landscape
  const W = page.getWidth();
  const H = page.getHeight();

  const serif = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const script = await pdf.embedFont(StandardFonts.TimesRomanBoldItalic);
  const sans = await pdf.embedFont(StandardFonts.Helvetica);
  const sansBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  // Frame and corner accents
  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: rgb(1, 1, 1) });
  page.drawRectangle({ x: 16, y: 16, width: W - 32, height: H - 32, borderColor: NAVY, borderWidth: 3 });
  page.drawRectangle({ x: 26, y: 26, width: W - 52, height: H - 52, borderColor: SKY, borderWidth: 0.8 });
  page.drawSvgPath("M 0 0 L 130 0 L 0 130 Z", { x: 16, y: H - 16, color: NAVY });
  page.drawSvgPath("M 0 0 L 95 0 L 0 95 Z", { x: 16, y: H - 16, color: SKY });
  page.drawSvgPath("M 0 0 L -130 0 L 0 -130 Z", { x: W - 16, y: 16, color: NAVY });
  page.drawSvgPath("M 0 0 L -95 0 L 0 -95 Z", { x: W - 16, y: 16, color: SKY });

  // Logo + company name
  const logo = await pdf.embedPng(Buffer.from(LOGO_PNG_BASE64, "base64"));
  const logoW = 78;
  const logoH = (logo.height / logo.width) * logoW;
  page.drawImage(logo, { x: (W - logoW) / 2, y: H - 62 - logoH, width: logoW, height: logoH });
  spaced(page, "WSOFT TECHNOLOGIES", W / 2, H - 82 - logoH, 9, sansBold, 3.2, SLATE);

  // Title
  const titleY = H - 150 - logoH;
  spaced(page, "CERTIFICATE", W / 2, titleY, 38, serif, 6);
  spaced(page, "OF INTERNSHIP", W / 2, titleY - 26, 13, sansBold, 6, SKY);

  centered(page, "This is to certify that", titleY - 62, 12, sans, SLATE);

  // Name (shrinks to fit long names)
  let nameSize = 34;
  while (script.widthOfTextAtSize(cert.name, nameSize) > W - 220 && nameSize > 18) nameSize -= 1;
  const nameY = titleY - 106;
  centered(page, cert.name, nameY, nameSize, script);
  page.drawLine({
    start: { x: W / 2 - 190, y: nameY - 12 },
    end: { x: W / 2 + 190, y: nameY - 12 },
    thickness: 0.8,
    color: LIGHT,
  });

  const body =
    `has successfully completed an internship as ${cert.role} at Wsoft Technologies ` +
    `from ${formatCertDate(cert.startDate)} to ${formatCertDate(cert.endDate)}. ` +
    `During this period, they showed dedication, professionalism and a strong willingness to learn. ` +
    `We wish them every success in their future career.`;
  let y = nameY - 40;
  for (const line of wrap(body, sans, 11.5, W - 240)) {
    centered(page, line, y, 11.5, sans, SLATE);
    y -= 17;
  }

  // Footer: signature (left), details (middle), QR (right)
  const footY = 70;
  const ceo = team.find((m) => /ceo/i.test(m.role));
  page.drawLine({ start: { x: 90, y: footY + 34 }, end: { x: 270, y: footY + 34 }, thickness: 0.8, color: NAVY });
  if (ceo) {
    page.drawText(ceo.name, { x: 90, y: footY + 18, size: 11, font: sansBold, color: NAVY });
    page.drawText(`${ceo.role}, Wsoft Technologies`, { x: 90, y: footY + 4, size: 9, font: sans, color: SLATE });
  } else {
    page.drawText("Authorized Signatory", { x: 90, y: footY + 18, size: 11, font: sansBold, color: NAVY });
  }

  centered(page, `Issued on ${formatCertDate(cert.issuedAt.slice(0, 10))}`, footY + 30, 9.5, sans, SLATE);
  centered(page, `Certificate ID: ${cert.id}`, footY + 16, 9.5, sansBold, NAVY);
  centered(page, cert.batch, footY + 2, 9, sans, LIGHT);

  const qrPng = await QRCode.toBuffer(verifyUrl(cert.id), {
    type: "png",
    margin: 1,
    width: 360,
    errorCorrectionLevel: "M",
    color: { dark: "#0f172aff", light: "#ffffffff" },
  });
  const qr = await pdf.embedPng(qrPng);
  const qrSize = 78;
  const qrX = W - 128 - qrSize;
  page.drawImage(qr, { x: qrX, y: footY + 6, width: qrSize, height: qrSize });
  const scan = "Scan to verify";
  page.drawText(scan, {
    x: qrX + (qrSize - sans.widthOfTextAtSize(scan, 8)) / 2,
    y: footY - 6,
    size: 8,
    font: sans,
    color: SLATE,
  });

  return pdf.save();
}
