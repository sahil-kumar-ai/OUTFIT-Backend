export const getOtpHtml = ({ email, otp }) => {
  const html = `<!DOCTYPE html> <html lang="en"> 
  <head> <meta charset="UTF-8" /> 
  <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
  <meta name="x-apple-disable-message-reformatting" /> 
  <title>OUTFIT Verification Code</title> 
  </head> <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;"> 
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f7fb;padding:40px 20px;"> 
  <tr> <td align="center"> 
  <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style=" max-width:600px; width:100%; background:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #e5e7eb; " > 
  <tr> <td align="center" style=" background:#111827; padding:28px; " > 
  <span style=" color:#ffffff; font-size:24px; font-weight:700; letter-spacing:0.5px; " > OUTFIT </span> 
  </td> </tr> <tr> <td style="padding:40px 32px;"> <h1 style=" margin:0 0 10px; font-size:28px; color:#111827; text-align:center; " >
   Verify Your Email 
   </h1> 
   <p style=" margin:0 0 24px; text-align:center; color:#6b7280; font-size:14px; " > ${email} </p>
    <p style=" margin:0 0 24px; font-size:15px; line-height:1.7; color:#4b5563; text-align:center; " >
     Use the verification code below to complete your sign-in. </p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:30px 0;" > 
      <tr> <td align="center"> <table role="presentation" cellspacing="0" cellpadding="0" border="0" > 
      <tr> <td style=" background:#f3f4f6; border:1px solid #d1d5db; border-radius:12px; 
      padding:18px 28px; font-size:34px; font-weight:700; letter-spacing:10px; color:#111827; text-align:center; " > 
      ${otp} 
      </td> </tr> </table> </td> </tr> </table> 
      <p style=" margin:0 0 20px; text-align:center; color:#4b5563; font-size:14px; " >
       This code will expire in <strong>5 minutes</strong>.
        </p> 
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style=" margin-top:24px; background:#f9fafb; border-left:4px solid #111827; border-radius:8px; " > 
        <tr> <td style=" padding:16px; color:#4b5563; font-size:14px; line-height:1.6; " > Never share this OTP with anyone. OUTFIT will never ask for your verification code. </td> </tr> </table> <p style=" margin:24px 0 0; text-align:center; color:#6b7280; font-size:14px; " > 
        If you didn't request this code, you can safely ignore this email. 
        </p> </td> </tr> <tr> <td style=" padding:24px; text-align:center; border-top:1px solid #e5e7eb; color:#9ca3af; font-size:12px; " >
         © 2025 OUTFIT. All rights reserved. 
         </td> </tr> </table> </td> </tr> </table> </body> </html>`;
  return html;
};

export const getVerifyEmailHtml = ({ email, token }) => {
  const appName = process.env.APP_NAME || "OUTFIT";
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";

  const verifyUrl = `${baseUrl.replace(/\/+$/, "")}/token/${encodeURIComponent(
    token,
  )}`;

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify Account</title>
</head>

<body style="margin:0;padding:0;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6f7fb;padding:20px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" border="0"
style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">

<tr>
<td align="center"
style="background:#111827;padding:20px;color:#ffffff;font-size:18px;font-weight:bold;">
${appName}
</td>
</tr>

<tr>
<td style="padding:32px;">

<h1 style="margin:0 0 20px 0;font-size:24px;color:#111827;">
Verify your account
</h1>

<p style="margin:0 0 15px 0;color:#4b5563;font-size:15px;line-height:1.6;">
Hello <strong>${email}</strong>,
</p>

<p style="margin:0 0 25px 0;color:#4b5563;font-size:15px;line-height:1.6;">
Thank you for registering with ${appName}. Click the button below to verify your email address.
</p>

<table cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center"
style="background:#111827;border-radius:8px;">
<a href="${verifyUrl}"
target="_blank"
style="
display:inline-block;
padding:14px 24px;
color:#ffffff;
text-decoration:none;
font-size:15px;
font-weight:600;
">
Verify Account
</a>
</td>
</tr>
</table>

<p style="margin:25px 0 10px 0;color:#4b5563;font-size:14px;">
If the button doesn't work, copy and paste this link into your browser:
</p>

<p style="word-break:break-all;">
<a href="${verifyUrl}"
style="color:#2563eb;text-decoration:underline;">
${verifyUrl}
</a>
</p>

<p style="margin-top:25px;color:#6b7280;font-size:14px;">
If you didn't create an account, you can safely ignore this email.
</p>

</td>
</tr>

<tr>
<td align="center"
style="
padding:20px;
font-size:12px;
color:#9ca3af;
border-top:1px solid #e5e7eb;
">
© ${new Date().getFullYear()} ${appName}. All rights reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};
