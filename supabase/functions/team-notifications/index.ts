// Real Team Notification Implementation
// Supports email notifications and Slack webhooks

interface NotificationParams {
  leadData: any;
  websiteAnalysis: any;
  selectedGuides: string[];
}

interface NotificationResponse {
  success: boolean;
  methods: string[];
  errors: string[];
}

/**
 * Sends real team notifications via multiple channels
 */
export async function sendTeamNotifications(params: NotificationParams): Promise<NotificationResponse> {
  const { leadData, websiteAnalysis, selectedGuides } = params;
  
  const results = {
    success: false,
    methods: [] as string[],
    errors: [] as string[]
  };
  
  // Try email notification
  try {
    const emailResult = await sendTeamEmail(leadData, websiteAnalysis, selectedGuides);
    if (emailResult.success) {
      results.methods.push('email');
      results.success = true;
    } else {
      results.errors.push(`Email: ${emailResult.message}`);
    }
  } catch (error: any) {
    results.errors.push(`Email: ${error.message}`);
  }
  
  // Try Slack notification
  try {
    const slackResult = await sendSlackNotification(leadData, websiteAnalysis, selectedGuides);
    if (slackResult.success) {
      results.methods.push('slack');
      results.success = true;
    } else {
      results.errors.push(`Slack: ${slackResult.message}`);
    }
  } catch (error: any) {
    results.errors.push(`Slack: ${error.message}`);
  }
  
  // Try Discord notification as fallback
  try {
    const discordResult = await sendDiscordNotification(leadData, websiteAnalysis, selectedGuides);
    if (discordResult.success) {
      results.methods.push('discord');
      results.success = true;
    } else {
      results.errors.push(`Discord: ${discordResult.message}`);
    }
  } catch (error: any) {
    results.errors.push(`Discord: ${error.message}`);
  }
  
  console.log('Team notification results:', results);
  
  return results;
}

/**
 * Sends email notification to team
 */
async function sendTeamEmail(leadData: any, websiteAnalysis: any, selectedGuides: string[]): Promise<{success: boolean, message: string}> {
  const teamEmail = Deno.env.get('TEAM_NOTIFICATION_EMAIL') || 'team@adamsilvaconsulting.com';
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  
  if (!resendApiKey) {
    return { success: false, message: 'Resend API key not configured' };
  }
  
  const emailContent = generateTeamEmailContent(leadData, websiteAnalysis, selectedGuides);
  
  const emailData = {
    from: 'ASC Lead System <system@adamsilvaconsulting.com>',
    to: [teamEmail],
    subject: `🚨 New Lead Captured: ${leadData.full_name} - ${websiteAnalysis.industry}`,
    html: emailContent
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
    return { success: false, message: `Email API error: ${response.status} - ${errorData}` };
  }
  
  const result = await response.json();
  return { success: true, message: `Team email sent, ID: ${result.id}` };
}

/**
 * Sends Slack notification
 */
async function sendSlackNotification(leadData: any, websiteAnalysis: any, selectedGuides: string[]): Promise<{success: boolean, message: string}> {
  const slackWebhookUrl = Deno.env.get('SLACK_WEBHOOK_URL');
  
  if (!slackWebhookUrl) {
    return { success: false, message: 'Slack webhook URL not configured' };
  }
  
  const slackMessage = {
    text: `New Lead Captured: ${leadData.full_name}`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🎯 New Lead Captured - Authority Hub'
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Name:*\n${leadData.full_name}`
          },
          {
            type: 'mrkdwn',
            text: `*Email:*\n${leadData.business_email}`
          },
          {
            type: 'mrkdwn',
            text: `*Website:*\n${leadData.company_website}`
          },
          {
            type: 'mrkdwn',
            text: `*Industry:*\n${websiteAnalysis.industry}`
          }
        ]
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Selected Guides:*\n${selectedGuides.map(guide => `• ${guide}`).join('\n')}`
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Budget:* ${leadData.advertising_budget || 'Not specified'}\n*Captured:* ${new Date(leadData.created_at).toLocaleString()}`
        }
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'View in CRM'
            },
            style: 'primary',
            url: 'https://adamsilvaconsulting.com/admin/leads'
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Send Follow-up'
            },
            url: `mailto:${leadData.business_email}?subject=Following up on your AI Authority Strategy Guide`
          }
        ]
      }
    ]
  };
  
  const response = await fetch(slackWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(slackMessage)
  });
  
  if (!response.ok) {
    return { success: false, message: `Slack webhook error: ${response.status}` };
  }
  
  return { success: true, message: 'Slack notification sent successfully' };
}

/**
 * Sends Discord notification as fallback
 */
async function sendDiscordNotification(leadData: any, websiteAnalysis: any, selectedGuides: string[]): Promise<{success: boolean, message: string}> {
  const discordWebhookUrl = Deno.env.get('DISCORD_WEBHOOK_URL');
  
  if (!discordWebhookUrl) {
    return { success: false, message: 'Discord webhook URL not configured' };
  }
  
  const discordMessage = {
    content: `🎯 **New Lead Captured - Authority Hub**`,
    embeds: [
      {
        title: `${leadData.full_name} - ${websiteAnalysis.industry}`,
        color: 0x3b82f6, // Blue color
        fields: [
          {
            name: 'Contact Information',
            value: `**Email:** ${leadData.business_email}\n**Website:** ${leadData.company_website}`,
            inline: false
          },
          {
            name: 'Selected Guides',
            value: selectedGuides.map(guide => `• ${guide}`).join('\n'),
            inline: false
          },
          {
            name: 'Additional Details',
            value: `**Budget:** ${leadData.advertising_budget || 'Not specified'}\n**Captured:** ${new Date(leadData.created_at).toLocaleString()}`,
            inline: false
          }
        ],
        timestamp: new Date().toISOString()
      }
    ]
  };
  
  const response = await fetch(discordWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(discordMessage)
  });
  
  if (!response.ok) {
    return { success: false, message: `Discord webhook error: ${response.status}` };
  }
  
  return { success: true, message: 'Discord notification sent successfully' };
}

/**
 * Generates HTML content for team email notification
 */
function generateTeamEmailContent(leadData: any, websiteAnalysis: any, selectedGuides: string[]): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Lead Captured - ${leadData.full_name}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 30px; }
        .lead-info { background-color: #f1f5f9; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .guides-list { background-color: #ecfdf5; border: 1px solid #d1fae5; padding: 15px; border-radius: 6px; margin: 15px 0; }
        .action-buttons { text-align: center; margin: 30px 0; }
        .btn { display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px; }
        .btn:hover { background-color: #2563eb; }
        .analysis { background-color: #fef3c7; border: 1px solid #fcd34d; padding: 15px; border-radius: 6px; margin: 15px 0; }
        h1 { margin: 0; font-size: 24px; }
        h2 { color: #1f2937; margin-top: 25px; }
        .timestamp { color: #6b7280; font-size: 14px; text-align: center; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚨 New Lead Captured</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Authority Hub Lead Generation System</p>
        </div>
        
        <div class="content">
            <div class="lead-info">
                <h2 style="margin-top: 0; color: #3b82f6;">Lead Information</h2>
                <p><strong>Name:</strong> ${leadData.full_name}</p>
                <p><strong>Email:</strong> <a href="mailto:${leadData.business_email}">${leadData.business_email}</a></p>
                <p><strong>Website:</strong> <a href="${leadData.company_website}" target="_blank">${leadData.company_website}</a></p>
                <p><strong>Budget:</strong> ${leadData.advertising_budget || 'Not specified'}</p>
                <p><strong>Industry:</strong> ${websiteAnalysis.industry}</p>
            </div>
            
            <div class="guides-list">
                <h3 style="margin-top: 0; color: #059669;">Selected Implementation Guides</h3>
                <ul>
                    ${selectedGuides.map(guide => `<li>${guide}</li>`).join('')}
                </ul>
            </div>
            
            ${websiteAnalysis.recommendations.length > 0 ? `
            <div class="analysis">
                <h3 style="margin-top: 0; color: #d97706;">Website Analysis Insights</h3>
                <ul>
                    ${websiteAnalysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
                ${websiteAnalysis.techStack.length > 0 ? `<p><strong>Technology Stack:</strong> ${websiteAnalysis.techStack.join(', ')}</p>` : ''}
            </div>
            ` : ''}
            
            <div class="action-buttons">
                <a href="mailto:${leadData.business_email}?subject=Following up on your AI Authority Strategy Guide&body=Hi ${leadData.full_name},%0D%0A%0D%0AThank you for your interest in our AI Authority Strategy Guide. I wanted to personally follow up..." class="btn">Send Follow-up Email</a>
                <a href="https://adamsilvaconsulting.com/admin/leads" class="btn" target="_blank">View in CRM</a>
            </div>
            
            <h2>Recommended Next Steps</h2>
            <ol>
                <li>Review the personalized guide sent to the lead</li>
                <li>Follow up within 24-48 hours with personalized outreach</li>
                <li>Schedule a strategic consultation if the lead shows interest</li>
                <li>Add lead to appropriate nurture sequence based on budget and needs</li>
            </ol>
            
            <div class="timestamp">
                Lead captured: ${new Date(leadData.created_at).toLocaleString()}<br>
                Generated by: ASC Authority Hub Lead Capture System
            </div>
        </div>
    </div>
</body>
</html>
    `;
}
