import { transporter } from '../utils.mailer';

export async function sendFileToEmailJob(
  sendEmail: string,
  clientEmail: string,
  ownerFirstName: string,
  ownerEmail: string,
  data: Buffer,
  file: Buffer,
) {
  const mailer = await transporter(ownerEmail);
  if (file) {
    await mailer.sendMail({
      from: `"${ownerFirstName}" <${ownerEmail}>`,
      to: `${sendEmail || clientEmail}`,
      subject: 'An invoice for payment',
      text: " Hello!! That's your invoice.",
      attachments: [
        { filename: 'Invoice.pdf', content: Buffer.from(data) },
        {
          filename: 'Image.jpg',
          content: Buffer.from(file.buffer),
        },
      ],
    });

    console.log('Email send Invoice.pdf and Image.jpg');
    return;
  }
  await mailer.sendMail({
    from: `"${ownerFirstName}" <${ownerEmail}>`,
    to: `${sendEmail || clientEmail}`,
    subject: 'An invoice for payment',
    text: " Hello!! That's your invoice.",
    attachments: [{ filename: 'Invoice.pdf', content: Buffer.from(data) }],
  });

  console.log('Email send Invoice.pdf');
}
