import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PDFDocument } from "pdf-lib";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

async function convertGifToPng(gifBase64: string): Promise<Uint8Array> {
  // Create an image element
  const img = new Image();
  img.src = gifBase64;

  return new Promise((resolve, reject) => {
    img.onload = () => {
      // Create a canvas to draw the image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Set canvas size based on the image dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);

        // Convert the canvas content to a PNG
        canvas.toBlob((blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.onloadend = () =>
              resolve(new Uint8Array(reader.result as ArrayBuffer));
            reader.readAsArrayBuffer(blob);
          } else {
            reject("Failed to convert GIF to PNG.");
          }
        }, "image/png");
      }
    };

    img.onerror = (err) => reject(err);
  });
}

async function createPdfFromLabel(labelBase64: string): Promise<Blob> {
  // Convert the GIF to PNG first
  const pngBytes = await convertGifToPng(labelBase64);

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a page to the document
  const page = pdfDoc.addPage([600, 800]);

  // Embed the PNG image in the PDF document
  const image = await pdfDoc.embedPng(pngBytes);

  // Get the dimensions of the image
  const { width, height } = image.scale(0.5); // Adjust scale as needed

  // Draw the image on the page
  page.drawImage(image, {
    x: 50,
    y: page.getHeight() - height - 50, // Adjust positioning as needed
    width,
    height,
  });

  // Serialize the PDF document to bytes
  const pdfBytes = await pdfDoc.save();

  // Convert to a Blob for download
  return new Blob([pdfBytes], { type: "application/pdf" });
}

export default createPdfFromLabel;
