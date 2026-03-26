import fs from "fs/promises";
import path from "path";
import { GUID_FILE } from "@/config";

const filePath = path.resolve(process.cwd(), GUID_FILE);

export async function loadLastProcessedGuid(): Promise<string | null> {
  try {
    const data = await fs.readFile(filePath, "utf8");

    if (!data.trim()) return null;

    const parsed = JSON.parse(data);
    return parsed.lastGuid ?? null;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      (error as { code?: string }).code === "ENOENT"
    ) {
      return null;
    }
    return null;
  }
}

export async function saveLastProcessedGuid(guid: string): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });

  const tempFile = `${filePath}.tmp`;

  await fs.writeFile(
    tempFile,
    JSON.stringify({ lastGuid: guid }),
    "utf8"
  );

  await fs.rename(tempFile, filePath);
}