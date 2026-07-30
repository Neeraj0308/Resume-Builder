import transporter from "../config/mail.js";
import generateOTP from "../utils/generateOTP.js";
import OTP from "../models/OTP.js";

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email Is required",
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Delete previous OTPs
    await OTP.deleteMany({ email });

    //save new otp
    await OTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    console.log("Generated OTP:", otp);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Resume Builder - OTP Verification",
      html: `
        <h2>Your OTP is:</h2>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
 console.log("KUnallll")
    const otpData = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!otpData) {
      return res.status(404).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (new Date() > otpData.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    console.log("Current Time:", new Date());
    console.log("OTP Data:", otpData);
    console.log("Expiry Time:", otpData.expiresAt);

    if (otpData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP is correct, remove it
    // await OTP.deleteOne({ _id: otpData._id });

    res.json({
      success: true,
      message: "OTP Verified Successful",
    });
  
   
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
