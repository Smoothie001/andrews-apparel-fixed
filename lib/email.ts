import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}

export function generateOrderConfirmationEmail(order: any) {
  return {
    subject: `Order Confirmation - ${order.orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .order-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .gold { color: #d4af37; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Andrew's Apparel</h1>
              <p>Thank you for your order!</p>
            </div>
            <div class="content">
              <h2>Order Confirmed</h2>
              <p>Your order <strong class="gold">#${order.orderNumber}</strong> has been received and is being processed.</p>
              
              <div class="order-details">
                <h3>Order Summary</h3>
                <p><strong>Total:</strong> ₦${order.total.toLocaleString()}</p>
                <p><strong>Status:</strong> ${order.status}</p>
              </div>
              
              <p>We'll send you another email when your order ships.</p>
              <p>If you have any questions, please contact us via WhatsApp or email.</p>
            </div>
            <div class="footer">
              <p>Andrew's Apparel - Lokongoma Phase Two, Lokoja, Kogi State</p>
              <p>Phone: ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+234 803 456 7890'}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function generateCustomSewRequestEmail(request: any) {
  return {
    subject: `Custom Sewing Request - ${request.requestNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .request-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .gold { color: #d4af37; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Andrew's Apparel</h1>
              <p>Custom Sewing Request Received</p>
            </div>
            <div class="content">
              <h2>Request Submitted Successfully</h2>
              <p>Thank you for choosing our custom sewing service!</p>
              
              <div class="request-details">
                <h3>Request Details</h3>
                <p><strong>Reference:</strong> <span class="gold">${request.requestNumber}</span></p>
                <p><strong>Outfit Type:</strong> ${request.outfitType}</p>
                <p><strong>Status:</strong> ${request.status}</p>
              </div>
              
              <p>Our team will review your request and provide a quote within 24-48 hours.</p>
              <p>You can track your request status in your account dashboard.</p>
            </div>
            <div class="footer">
              <p>Andrew's Apparel - Lokongoma Phase Two, Lokoja, Kogi State</p>
              <p>Phone: ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+234 803 456 7890'}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}

export function generateStudentRegistrationEmail(enrollment: any, course: any) {
  return {
    subject: `Registration Confirmation - ${course.name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .course-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .gold { color: #d4af37; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Andrew's Apparel Fashion School</h1>
              <p>Welcome to Our Fashion Family!</p>
            </div>
            <div class="content">
              <h2>Registration Successful</h2>
              <p>Congratulations! You've successfully registered for our fashion course.</p>
              
              <div class="course-details">
                <h3>Course Information</h3>
                <p><strong>Course:</strong> ${course.name}</p>
                <p><strong>Level:</strong> ${course.level}</p>
                <p><strong>Duration:</strong> ${course.duration}</p>
                <p><strong>Schedule:</strong> ${course.schedule || 'TBA'}</p>
                <p><strong>Status:</strong> <span class="gold">${enrollment.status}</span></p>
              </div>
              
              <p>You'll receive further information about class commencement via email and SMS.</p>
              <p>Welcome aboard, and we look forward to seeing you in class!</p>
            </div>
            <div class="footer">
              <p>Andrew's Apparel Fashion School</p>
              <p>Lokongoma Phase Two, Lokoja, Kogi State</p>
              <p>Phone: ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+234 803 456 7890'}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}
