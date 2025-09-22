// Real Email Service Implementation
// Using Resend API for production email delivery

interface EmailParams {
  to: string;
  subject: string;
  htmlContent: string;
  pdfAttachment: string;
  pdfFilename: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  emailId?: string;
}

/**
 * Sends real email using Resend API
 */
export async function sendRealEmail(params: EmailParams): Promise<EmailResponse> {
  const { to, subject, htmlContent, pdfAttachment, pdfFilename } = params;
  
  // Get Resend API key from environment
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  
  if (!resendApiKey) {
    console.error('RESEND_API_KEY not found in environment variables');
    return {
      success: false,
      message: 'Email service not configured - missing API key'
    };
  }
  
  try {
    console.log('Sending email via Resend to:', to);
    
    const emailData = {
      from: 'Adam Silva Consulting <noreply@adamsilvaconsulting.com>',
      to: [to],
      subject: subject,
      html: htmlContent,
      attachments: [
        {
          filename: pdfFilename,
          content: pdfAttachment,
          content_type: 'application/pdf'
        }
      ]
    };
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Resend API error:', response.status, errorData);
      throw new Error(`Email API error: ${response.status} - ${errorData}`);
    }
    
    const result = await response.json();
    console.log('Email sent successfully via Resend, ID:', result.id);
    
    return {
      success: true,
      message: 'Email sent successfully',
      emailId: result.id
    };
    
  } catch (error: any) {
    console.error('Email sending failed:', error.message);
    
    // Fallback to alternative email service or method
    return await fallbackEmailSend(params);
  }
}

/**
 * Fallback email sending using alternative method
 */
async function fallbackEmailSend(params: EmailParams): Promise<EmailResponse> {
  console.log('Attempting fallback email sending...');
  
  // Try SendGrid as fallback
  const sendGridApiKey = Deno.env.get('SENDGRID_API_KEY');
  
  if (sendGridApiKey) {
    return await sendViaSendGrid(params, sendGridApiKey);
  }
  
  // If no email service available, log details for manual follow-up
  console.error('No email service available. Email details:', {
    to: params.to,
    subject: params.subject,
    pdfSize: params.pdfAttachment.length
  });
  
  return {
    success: false,
    message: 'Email service temporarily unavailable. Team has been notified for manual follow-up.'
  };
}

/**
 * SendGrid email implementation as fallback
 */
async function sendViaSendGrid(params: EmailParams, apiKey: string): Promise<EmailResponse> {
  try {
    console.log('Sending email via SendGrid fallback');
    
    const emailData = {
      personalizations: [
        {
          to: [{ email: params.to }],
          subject: params.subject
        }
      ],
      from: {
        email: 'noreply@adamsilvaconsulting.com',
        name: 'Adam Silva Consulting'
      },
      content: [
        {
          type: 'text/html',
          value: params.htmlContent
        }
      ],
      attachments: [
        {
          content: params.pdfAttachment,
          filename: params.pdfFilename,
          type: 'application/pdf',
          disposition: 'attachment'
        }
      ]
    };
    
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`SendGrid API error: ${response.status} - ${errorData}`);
    }
    
    console.log('Email sent successfully via SendGrid');
    
    return {
      success: true,
      message: 'Email sent successfully via SendGrid'
    };
    
  } catch (error: any) {
    console.error('SendGrid fallback failed:', error.message);
    
    return {
      success: false,
      message: `SendGrid fallback failed: ${error.message}`
    };
  }
}