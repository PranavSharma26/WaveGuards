import axios from "axios";

export const sendVerificationEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const payload = {
      sender: {
        name: process.env.SENDER_NAME || "WaveGuards",
        email: process.env.SENDER_EMAIL,
      },
      to: [{ email }],
      subject: "WaveGuards | Your OTP for Email Verification",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hello from WaveGuards 👋</h2>
          <p>Thank you for signing up with <strong>WaveGuards</strong>. To verify your email address, please use the One-Time Password (OTP) provided below:</p>
          <p style="font-size: 20px; font-weight: bold;">${otp}</p>
          <p>This OTP is valid for the next <strong>10 minutes</strong>.</p>
          <p style="color: red;"><strong>Never share this OTP</strong> with anyone, even if they claim to be from WaveGuards.</p>
          <br />
          <p>If you did not request this email, you can safely ignore it.</p>
          <br />
          <p>Warm regards,<br /><strong>The WaveGuards Team</strong></p>
        </div>
      `,
    };

    const headers = {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    };

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      payload,
      { headers }
    );

    res.status(200).json({
      message: "OTP email sent successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
