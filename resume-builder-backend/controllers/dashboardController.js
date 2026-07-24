import Resume from "../models/Resume.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalResumes = await Resume.countDocuments({
      user: userId,
    });

    const recentResumes = await Resume.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      totalResumes,
      recentResumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};