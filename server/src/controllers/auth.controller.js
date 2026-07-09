export const register = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Register API Working",
  });
};

export const login = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Login API Working",
  });
};

export const forgotPassword = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Forgot Password API Working",
  });
};

export const resetPassword = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Reset Password API Working",
  });
};