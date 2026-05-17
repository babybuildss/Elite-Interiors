import { readFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

const DIST_DIR = join(process.cwd(), "elite-interiors", "dist");

// Cache the HTML content in memory for performance
let cachedHtml: string | null = null;

async function getIndexHtml(): Promise<string> {
  if (cachedHtml) return cachedHtml;
  const html = await readFile(join(DIST_DIR, "index.html"), "utf-8");
  cachedHtml = html;
  return html;
}

export async function GET() {
  try {
    const html = await getIndexHtml();
    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }
}
