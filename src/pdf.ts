import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { convertDocument } from "@matbee/libreoffice-converter/server";

const require = createRequire(import.meta.url);
const converterDir = path.dirname(require.resolve("@matbee/libreoffice-converter/package.json"));
const wasmPath = path.join(converterDir, "wasm");

/**
 * Convert a .docx file to .pdf using LibreOffice WASM.
 * No system dependencies required — works cross-platform via WebAssembly.
 */
export async function convertDocxToPdf(docxPath: string, pdfPath: string): Promise<void> {
  const docxBuffer = fs.readFileSync(docxPath);

  const result = await convertDocument(
    docxBuffer,
    { outputFormat: "pdf" },
    { wasmPath },
  );

  fs.writeFileSync(pdfPath, Buffer.from(result.data));
}
