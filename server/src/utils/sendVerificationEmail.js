import axios from "axios";

export const sendVerificationEmail = async (email ,otp) => {
  try {
    if (!email || !otp) {
      throw new Error("Email and OTP are required.");
    }
    const payload = {
      sender: {
        name: process.env.SENDER_NAME || "WaveGuards",
        email: process.env.SENDER_EMAIL,
      },
      to: [{ email }],
      subject: "WaveGuards | Verify Your Email with OTP",
      htmlContent: `
  <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
    <h2 style="color: #2c3e50; text-align: center;">Hello from <span style="color: #0077ff;">WaveGuards</span> 👋</h2>
    <p style="font-size: 16px; color: #333333; text-align: center;">
      Thank you for signing up with <strong>WaveGuards</strong>. To verify your email address, please use the One-Time Password (OTP) below:
    </p>
    <div style="margin: 30px 0; text-align: center;">
      <p style="font-size: 28px; font-weight: bold; color: #0077ff; background-color: #ffffff; display: inline-block; padding: 12px 24px; border-radius: 8px; letter-spacing: 3px; border: 2px dashed #0077ff;">
        ${otp}
      </p>
    </div>
    <p style="font-size: 14px; color: #555555; text-align: center;">
      This OTP is valid for the next <strong>10 minutes</strong>.
    </p>
    <p style="color: red; font-weight: bold; text-align: center;">
      Never share this OTP with anyone — even if they claim to be from WaveGuards.
    </p>
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
    <p style="font-size: 14px; color: #777777; text-align: center;">
      If you did not request this email, you can safely ignore it.
    </p>
    <p style="font-size: 14px; color: #333333; text-align: center;">
      Warm regards,<br />
      <strong>The WaveGuards Team</strong>
    </p>
    <div style="text-align: center; margin-top: 20px;">
      <a href="https://waveguards.com" style="font-size: 12px; color: #999999; text-decoration: none;">waveguards.com</a>
    </div>
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
      { headers },
    );
    return response.data
  } catch (error) {
    console.error("Error sending verification email:", error.response?.data || error);
    throw new Error("Failed to send verification email");
  }
};
