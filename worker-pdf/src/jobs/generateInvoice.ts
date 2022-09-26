import * as PDFDocument from 'pdfkit';
import { ObjectForPDF, Owner } from '../type';
import { generatePDF } from '../utils/generatePDF';

export async function generateInvoiceJob(
  objectForPDF: ObjectForPDF,
  ownerInfo: Owner,
) {
  return new Promise(async (resolve, reject) => {
    const doc: PDFDocument = new PDFDocument({ margin: 20, bufferPages: true });
    const buffers: any[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('error', (error) => {
      reject(error);
    });
    doc.on('end', async () => {
      resolve(Buffer.concat(buffers));
    });

    await generatePDF(objectForPDF, ownerInfo, doc);

    doc.end();
  });
}
