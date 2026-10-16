import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// In-memory rate limiting: 5 requests per 15 minutes per IP
const rateLimitMap = new Map<string, { count: number; firstRequestTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    return false;
  }
  if (now - entry.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }
  entry.count += 1;
  return false;
}

// Clean up stale rate limit entries every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now - entry.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, 30 * 60 * 1000);

const VALID_SERVICES = [
  'Factory electrical works',
  'House wiring',
  'Sawmill installation',
  'Corn mill installation',
  'Security electric fencing',
  'Pole extension works',
  'Electrical maintenance',
  'Other enquiry',
];

// Helper to sanitize HTML output
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Check SMTP configuration status
function isSmtpConfigured(): boolean {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  return Boolean(host && user && pass && user !== 'your-email@gmail.com');
}

// Endpoint to inspect contact system status
app.get('/api/contact/status', (_req: Request, res: Response) => {
  const configured = isSmtpConfigured();
  res.json({
    configured,
    recipient: 'kelvinadado6@gmail.com',
    primaryPhone: '+233 24 237 4880',
    secondaryPhone: '+233 53 087 6133',
    message: configured
      ? 'Live email dispatch active via SMTP server.'
      : 'Email dispatch is awaiting SMTP credentials in environment variables.',
  });
});

// Endpoint to process enquiries
app.post('/api/contact', async (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Too many enquiries submitted from this network. Please wait a few minutes or call +233 24 237 4880 directly.',
    });
  }

  const { fullName, phone, email, service, location, message, bot_field } = req.body;

  // Anti-spam honeypot detection
  if (bot_field && String(bot_field).trim().length > 0) {
    // Silently succeed to fool bots without dispatching
    return res.json({ success: true, message: 'Enquiry received.' });
  }

  // 1. Validate fullName
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 100) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid full name between 2 and 100 characters.',
    });
  }

  // 2. Validate phone (Supports Ghanaian formats e.g. 024..., +233..., and international)
  const phoneClean = typeof phone === 'string' ? phone.trim() : '';
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;
  if (!phoneClean || !phoneRegex.test(phoneClean)) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid phone number (e.g., +233 24 237 4880 or 024 237 4880).',
    });
  }

  // 3. Validate email (optional, but if provided must be valid)
  const emailClean = typeof email === 'string' ? email.trim() : '';
  if (emailClean) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailClean) || emailClean.length > 150) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address or leave it blank.',
      });
    }
  }

  // 4. Validate service
  if (!service || !VALID_SERVICES.includes(service)) {
    return res.status(400).json({
      success: false,
      error: 'Please select a valid electrical service from the list.',
    });
  }

  // 5. Validate location (optional, max 150 chars)
  const locationClean = typeof location === 'string' ? location.trim().slice(0, 150) : '';

  // 6. Validate message (required, 10 to 2000 chars)
  if (!message || typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 2000) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a detailed message between 10 and 2000 characters describing your electrical project.',
    });
  }

  // Check if SMTP credentials exist
  if (!isSmtpConfigured()) {
    return res.status(503).json({
      success: false,
      configured: false,
      error:
        'The online email dispatch service is currently awaiting SMTP configuration. Please reach Kelvin Adado directly by calling +233 24 237 4880 or emailing kelvinadado6@gmail.com.',
      directContact: {
        phones: ['+233 24 237 4880', '+233 53 087 6133'],
        email: 'kelvinadado6@gmail.com',
      },
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const recipient = process.env.CONTACT_RECIPIENT || 'kelvinadado6@gmail.com';
    const sender = process.env.CONTACT_EMAIL_FROM || process.env.SMTP_USER || 'no-reply@adado-electricals.com';

    const safeName = escapeHtml(fullName.trim());
    const safePhone = escapeHtml(phoneClean);
    const safeEmail = emailClean ? escapeHtml(emailClean) : 'Not provided';
    const safeService = escapeHtml(service);
    const safeLocation = locationClean ? escapeHtml(locationClean) : 'Not specified';
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br/>');

    const mailOptions = {
      from: sender,
      to: recipient,
      replyTo: emailClean || undefined,
      subject: `[New Enquiry] ${service} - ${fullName.trim()}`,
      text: `NEW ELECTRICAL SERVICE ENQUIRY\n-------------------------------\nClient: ${fullName.trim()}\nPhone: ${phoneClean}\nEmail: ${emailClean || 'None'}\nService: ${service}\nLocation: ${locationClean || 'Not specified'}\n\nProject Details:\n${message.trim()}\n\nDate: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #18266B; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #18266B; color: #FFFFFF; padding: 20px; text-align: center;">
            <h2 style="margin: 0; color: #F4C64F;">ONE ADADO ELECTRICALS VENTURES</h2>
            <p style="margin: 6px 0 0; font-size: 14px; color: #79CDEE;">Domestic & Industrial Electrical Works</p>
          </div>
          <div style="padding: 24px; background-color: #FFFFFF; color: #1e293b;">
            <h3 style="margin-top: 0; color: #18266B; border-bottom: 2px solid #F5F8FC; padding-bottom: 8px;">New Customer Enquiry</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #64748b;">Full Name:</td>
                <td style="padding: 8px 0; font-size: 15px;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Phone:</td>
                <td style="padding: 8px 0; font-size: 15px;"><a href="tel:${safePhone}" style="color: #18266B; text-decoration: underline;">${safePhone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email:</td>
                <td style="padding: 8px 0; font-size: 15px;">${safeEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Service Required:</td>
                <td style="padding: 8px 0; font-size: 15px; font-weight: 600; color: #18266B;">${safeService}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Project Location:</td>
                <td style="padding: 8px 0; font-size: 15px;">${safeLocation}</td>
              </tr>
            </table>
            <div style="background-color: #F5F8FC; border-left: 4px solid #18266B; padding: 16px; border-radius: 4px;">
              <h4 style="margin: 0 0 8px; color: #18266B; font-size: 14px; text-transform: uppercase;">Message / Scope:</h4>
              <p style="margin: 0; line-height: 1.6; font-size: 14px;">${safeMessage}</p>
            </div>
            <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center;">
              Sent via One Adado Electricals Ventures website • Dome Pillar 2, near Perfect Primary School, Ghana
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.json({
      success: true,
      message: 'Your enquiry has been successfully delivered to kelvinadado6@gmail.com. We will contact you promptly!',
    });
  } catch (err: any) {
    console.error('Mail delivery failure:', err);
    return res.status(500).json({
      success: false,
      error: 'We were unable to deliver your message via our email provider at this moment. Please call us directly at +233 24 237 4880 or email kelvinadado6@gmail.com.',
      directContact: {
        phones: ['+233 24 237 4880', '+233 53 087 6133'],
        email: 'kelvinadado6@gmail.com',
      },
    });
  }
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
