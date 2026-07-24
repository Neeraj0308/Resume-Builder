import Resume from "../models/Resume.js";

// Create Resume
export const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      user: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Resume Created Successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Resumes (Pagination)
export const getResumes = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const resumes = await Resume.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalResumes = await Resume.countDocuments({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalResumes / limit),
      totalResumes,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Resume
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume Not Found",
      });
    }

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Resume
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
      },
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume Updated Successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const saveResume = async (req, res) => {
  try {
    const userId = req.user.id;

    const resume = await Resume.create({
      user: userId,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Resume Saved Successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search Resume
export const searchResume = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const resumes = await Resume.find({
      user: req.user.id,
      $or: [
        {
          "personalInfo.firstName": {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          "personalInfo.lastName": {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
