import { PDFParse } from "pdf-parse";

export const extractTextFromPDF = async (resumeUrl) => {
  try {
    const response = await fetch(resumeUrl);

    if (!response.ok) {
      const error = new Error(
        `Failed to download resume from Cloudinary. Status: ${response.status}`,
      );

      error.statusCode = 400;
      throw error;
    }

    const arrayBuffer = await response.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    const parser = new PDFParse({
      data: pdfBuffer,
    });

    const result = await parser.getText();

    await parser.destroy();

    const text = result.text?.trim();

    if (!text) {
      const error = new Error("Could not extract text from the resume PDF.");

      error.statusCode = 400;
      throw error;
    }

    return text;
  } catch (error) {
    console.error("Resume PDF extraction error:", error);
    throw error;
  }
};
