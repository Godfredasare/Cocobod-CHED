import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, access } from "fs/promises";
import path from "path";
import { requireAuth } from "@/lib/auth";
import pool from "@/lib/db";
import { clearDocumentCache } from "@/services/documents";
import mammoth from "mammoth";
import PDFParser from "pdf2json";
import { PDFParse } from "pdf-parse";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const DOC_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];
const ALL_TYPES = [...IMAGE_TYPES, ...DOC_TYPES];
const IMAGE_MAX = 5 * 1024 * 1024;
const DOC_MAX = 20 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    try {
      await requireAuth();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "images";
    const uploadType = (formData.get("type") as string) || "image";
    const title = (formData.get("title") as string) || file?.name || "Untitled";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALL_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const maxSize = DOC_TYPES.includes(file.type) ? DOC_MAX : IMAGE_MAX;
    if (file.size > maxSize) {
      const maxMB = maxSize / (1024 * 1024);
      return NextResponse.json(
        { error: `File must be under ${maxMB}MB` },
        { status: 400 },
      );
    }

    // Save file
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    try {
      await access(uploadDir);
    } catch {
      await mkdir(uploadDir, { recursive: true });
    }

    const ts = Date.now();
    const rnd = Math.random().toString(36).substring(2, 8);
    const ext =
      file.name.split(".").pop() ||
      (file.type === "text/plain" ? "txt" : "bin");
    const fname = `${ts}-${rnd}.${ext}`;
    const fpath = path.join(uploadDir, fname);

    const bytes = await file.arrayBuffer();
    await writeFile(fpath, Buffer.from(bytes));

    const publicUrl = `/uploads/${folder}/${fname}`;

    // Handle documents: extract text and store in DB
    if (uploadType === "document" && DOC_TYPES.includes(file.type)) {
      let content = "";
      let extractError: string | null = null;
      const buffer = Buffer.from(bytes);

      try {
        if (file.type === "text/plain") {
          console.log("[upload] Extracting text from TXT file");
          content = buffer.toString("utf-8").trim();
        } else if (file.type === "application/pdf") {
          console.log("[upload] Extracting text from PDF file (pdf-parse)");
          // Primary: pdf-parse (uses pdfjs-dist, handles most PDFs)
          const pdf = new PDFParse({ data: buffer, verbosity: 0 });
          const result = await pdf.getText();
          content = (result.text || "").trim();
          await pdf.destroy();
          console.log(`[upload] pdf-parse extracted ${content.length} chars`);

          if (!content) {
            // Fallback: pdf2json for PDFs pdf-parse couldn't extract
            console.log("[upload] pdf-parse returned empty, trying pdf2json fallback");
            const pdfParser = new PDFParser();
            content = await new Promise<string>((resolve, reject) => {
              pdfParser.on("pdfParser_dataReady", () => {
                resolve((pdfParser.getRawTextContent() || "").trim());
              });
              pdfParser.on("pdfParser_dataError", (err: any) => {
                reject(new Error(err?.parserError || "PDF parsing failed"));
              });
              pdfParser.parseBuffer(buffer);
            });
            console.log(`[upload] pdf2json fallback extracted ${content.length} chars`);
          }
        } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
          console.log("[upload] Extracting text from DOCX file");
          const result = await mammoth.extractRawText({ buffer });
          content = (result.value || "").trim();
        }
        console.log(`[upload] Extraction complete: ${content.length} chars`);
      } catch (err) {
        console.error("[upload] Text extraction failed:", err);
        extractError = err instanceof Error ? err.message : String(err);
        content = "";
      }

      const status = content ? "ready" : "failed";
      const errorMsg = content ? null : (extractError || "Could not extract text from document");

      console.log(`[upload] Document status: ${status}${errorMsg ? ` - ${errorMsg}` : ""}`);

      const [result] = await pool.query(
        "INSERT INTO documents (title, file_type, file_path, file_size, content, status, error_message) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title, file.type, publicUrl, file.size, content || null, status, errorMsg],
      );
      const insertResult = result as any;

      clearDocumentCache();

      return NextResponse.json({
        success: true,
        url: publicUrl,
        id: insertResult.insertId,
        status,
      });
    }

    return NextResponse.json({ success: true, url: publicUrl, path: fpath });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Failed to upload file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
