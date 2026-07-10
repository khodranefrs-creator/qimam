import nodemailer from 'nodemailer'

function createTransporter() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT) || 587
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    console.warn('[email] SMTP not configured – emails will not be sent')
    return null
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

const transporter = createTransporter()
const from = process.env.EMAIL_FROM || 'noreply@qimamlaw.com'
const adminEmail = process.env.ADMIN_EMAIL || ''

function formatDate(d: Date | string | null | undefined): string {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('ar-SA', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

interface NotificationData {
  name: string
  phone: string
  email: string | null
  practiceAreaTitle: string | null
  preferredDate: Date | string | null
  preferredTime: string | null
  details: string | null
  contactMethod: string | null
}

export async function sendAdminNotification(data: NotificationData) {
  if (!transporter || !adminEmail) {
    console.warn('[email] Cannot send admin notification: transporter or ADMIN_EMAIL missing')
    return
  }

  const area = data.practiceAreaTitle || 'عام'
  const datetime = `${formatDate(data.preferredDate)}${data.preferredTime ? ' الساعة ' + data.preferredTime : ''}`

  const html = `
<!DOCTYPE html>
<html dir="rtl">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Tajawal,'IBM Plex Sans Arabic',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
<tr><td style="background:#071A2B;padding:32px 40px;text-align:center;">
<img src="https://qimam-lilac.vercel.app/logo.png" alt="قمم اليقين" style="height:48px;margin-bottom:12px;" />
<h1 style="color:#C6A15B;margin:0;font-size:20px;font-weight:700;">طلب استشارة قانونية جديدة</h1>
</td></tr>
<tr><td style="padding:32px 40px;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong style="color:#071A2B;display:block;font-size:12px;">الاسم</strong><span style="color:#333;font-size:15px;">${data.name}</span></td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong style="color:#071A2B;display:block;font-size:12px;">رقم الجوال</strong><span style="color:#333;font-size:15px;">${data.phone}</span></td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong style="color:#071A2B;display:block;font-size:12px;">البريد الإلكتروني</strong><span style="color:#333;font-size:15px;">${data.email || '—'}</span></td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong style="color:#071A2B;display:block;font-size:12px;">مجال الاستشارة</strong><span style="color:#333;font-size:15px;">${area}</span></td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong style="color:#071A2B;display:block;font-size:12px;">الموعد المفضل</strong><span style="color:#333;font-size:15px;">${datetime}</span></td></tr>
<tr><td style="padding:8px 0;border-bottom:1px solid #eee;"><strong style="color:#071A2B;display:block;font-size:12px;">طريقة التواصل</strong><span style="color:#333;font-size:15px;">${data.contactMethod || '—'}</span></td></tr>
<tr><td style="padding:8px 0;"><strong style="color:#071A2B;display:block;font-size:12px;">تفاصيل القضية</strong><p style="color:#333;font-size:15px;margin:4px 0 0;line-height:1.7;">${data.details || '—'}</p></td></tr>
</table>
</td></tr>
<tr><td style="background:#f8f7f3;padding:20px 40px;text-align:center;border-top:1px solid #e8e3d8;">
<p style="color:#6B7280;font-size:13px;margin:0;">يمكنك متابعة وإدارة الطلبات من لوحة التحكم</p>
<a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://qimam-lilac.vercel.app'}/admin/consultations" style="display:inline-block;margin-top:8px;padding:10px 24px;background:#C6A15B;color:#071A2B;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">لوحة التحكم</a>
</td></tr>
</table>
<p style="color:#9CA3AF;font-size:12px;text-align:center;margin-top:16px;">شركة قمم اليقين للمحاماة والاستشارات القانونية</p>
</td></tr></table>
</body>
</html>`

  try {
    await transporter.sendMail({
      from,
      to: adminEmail,
      subject: `طلب استشارة جديد من ${data.name}`,
      html,
    })
  } catch (err) {
    console.warn('[email] Failed to send admin notification:', err)
  }
}

export async function sendClientConfirmation(data: NotificationData) {
  if (!transporter || !data.email) {
    return
  }

  const html = `
<!DOCTYPE html>
<html dir="rtl">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Tajawal,'IBM Plex Sans Arabic',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
<tr><td style="background:#071A2B;padding:32px 40px;text-align:center;">
<div style="width:56px;height:56px;border-radius:50%;background:rgba(198,161,91,0.15);display:inline-flex;align-items:center;justify-content:center;margin-bottom:12px;">
<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C6A15B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
</div>
<h1 style="color:#C6A15B;margin:0;font-size:20px;font-weight:700;">تم استلام طلبك بنجاح</h1>
</td></tr>
<tr><td style="padding:32px 40px;">
<p style="color:#333;font-size:16px;line-height:1.8;margin:0 0 16px;">
شكراً لك ${data.name}،
</p>
<p style="color:#333;font-size:16px;line-height:1.8;margin:0 0 16px;">
تم استلام طلب الاستشارة القانونية الخاص بك. سيقوم فريقنا القانوني بمراجعة طلبك والتواصل معك في أقرب وقت ممكن عبر ${data.contactMethod === 'whatsapp' ? 'واتساب' : data.contactMethod === 'phone' ? 'الهاتف' : 'البريد الإلكتروني'}.
</p>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f3;border-radius:8px;padding:16px 20px;margin-bottom:16px;">
<tr><td style="padding:4px 0;"><strong style="color:#071A2B;font-size:13px;">مجال الاستشارة</strong></td><td style="text-align:left;color:#333;font-size:14px;">${data.practiceAreaTitle || 'عام'}</td></tr>
<tr><td style="padding:4px 0;"><strong style="color:#071A2B;font-size:13px;">الموعد المفضل</strong></td><td style="text-align:left;color:#333;font-size:14px;">${formatDate(data.preferredDate)}${data.preferredTime ? ' — ' + data.preferredTime : ''}</td></tr>
</table>
<p style="color:#6B7280;font-size:14px;line-height:1.7;margin:0;">
إذا كان لديك أي استفسار عاجل، يمكنك التواصل معنا مباشرة عبر واتساب:
<a href="https://wa.me/966565555437" style="color:#C6A15B;text-decoration:none;font-weight:600;">+966565555437</a>
</p>
</td></tr>
<tr><td style="background:#f8f7f3;padding:20px 40px;text-align:center;border-top:1px solid #e8e3d8;">
<p style="color:#6B7280;font-size:13px;margin:0;">شركة قمم اليقين للمحاماة والاستشارات القانونية</p>
<p style="color:#9CA3AF;font-size:12px;margin:4px 0 0;">مكة المكرمة — المملكة العربية السعودية</p>
</td></tr>
</table>
<p style="color:#9CA3AF;font-size:12px;text-align:center;margin-top:16px;">هذا بريد إلكتروني تلقائي، يرجى عدم الرد عليه.</p>
</td></tr></table>
</body>
</html>`

  try {
    await transporter.sendMail({
      from,
      to: data.email,
      subject: 'تم استلام طلب الاستشارة — شركة قمم اليقين للمحاماة',
      html,
    })
  } catch (err) {
    console.warn('[email] Failed to send client confirmation:', err)
  }
}
