import * as PDFDocument from 'pdfkit';
import { ObjectForPDF, Owner } from './types';

export async function generatePDF(
  objectForPDF: ObjectForPDF,
  ownerInfo: Owner,
  doc: PDFDocument,
) {
  generateHeader(doc, ownerInfo);
  generateInfoClient(doc, objectForPDF);
  generateCompletedWorks(doc, objectForPDF);
  generateRunningTitle(doc, objectForPDF);
  console.log('Ok');
}
function generateHeader(doc: PDFDocument, ownerInfo: Owner) {
  doc
    .fillColor('blue')
    .fontSize(40)
    .text('Invoices', 110, 57)
    .fillColor('black')
    .fontSize(10)
    .text('Sender information:', 200, 65, { align: 'right' })
    .text(`Firstname: ${ownerInfo.firstName}`, 200, 75, { align: 'right' })
    .text(`Lastname: ${ownerInfo.lastName}`, 200, 85, { align: 'right' })
    .text(`Company: ${ownerInfo.company}`, 200, 95, { align: 'right' })
    .text(`Email: ${ownerInfo.email}`, 200, 105, { align: 'right' })
    .text(`Address: ${ownerInfo.address}`, 200, 115, { align: 'right' })
    .text(`Phone: ${ownerInfo.phone}`, 200, 125, { align: 'right' })
    .moveDown();
}
function generateInfoClient(doc: PDFDocument, objectForPDF: ObjectForPDF) {
  const { firstName, lastName, name, scope, clientEmail, address } =
    objectForPDF;
  doc
    .fillColor('black')
    .fontSize(18)
    .text('Information about the client:', 60, 190)
    .fontSize(12)
    .text(`Firstname: ${firstName}`, 70, 220, { align: 'left' })
    .text(`Lastname: ${lastName}`, 70, 235, { align: 'left' })
    .text(`Company: ${name}`, 70, 250, { align: 'left' })
    .text(`Kind of activity: ${scope}`, 70, 265, { align: 'left' })
    .text(`Address: ${address}`, 70, 280, { align: 'left' })
    .text(`Email: ${clientEmail}`, 70, 295, { align: 'left' })
    .moveDown();
}
function generateCompletedWorks(doc: PDFDocument, objectForPDF: ObjectForPDF) {
  const { completedTasks, summCost } = objectForPDF;
  doc
    .fillColor('black')
    .fontSize(18)
    .text('Information about the work performed:', 60, 320)
    .fontSize(12)
    .text('Task name:', 70, 350, { align: 'left' })
    .text('Price:', 500, 350, { align: 'left' });
  let height: number = 370;
  let counter: number = 1;
  for (const task of completedTasks) {
    doc
      .text(`${counter}.`, 50, height, { align: 'left' })
      .text(`${task.taskName}`, 70, height, { align: 'left' })
      .text(`${task.cost} $`, 500, height, { align: 'left' });
    counter++;
    height = height + 20;
  }
  doc
    .text(`${summCost} $`, 500, height + 10, { align: 'left' })
    .text('The amount of work performed:', 70, height + 10);

  doc.moveDown();
}
function generateRunningTitle(doc: PDFDocument, objectForPDF: ObjectForPDF) {
  const { dateFormatDDMMYYYY, invoiceId } = objectForPDF;
  doc
    .fillColor('black')
    .fontSize(10)
    .text(`Date: ${dateFormatDDMMYYYY}. Invoice number: ${invoiceId}`, 70, 750)
    .moveDown();
}
