export default function handler(req: any, res: any) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const configured = Boolean(host && user && pass && user !== 'your-email@gmail.com');

  res.status(200).json({
    configured,
    recipient: 'kelvinadado6@gmail.com',
    primaryPhone: '+233 24 237 4880',
    secondaryPhone: '+233 53 087 6133',
    message: configured
      ? 'Live email dispatch active via SMTP server.'
      : 'Email dispatch is awaiting SMTP credentials in environment variables.',
  });
}
