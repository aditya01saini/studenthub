import AuthLayout from "../../layouts/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";
import PasswordInput from "../../components/auth/PasswordInput";
import AuthFooter from "../../components/auth/AuthFooter";

import Button from "../../components/ui/Button";

const ResetPassword = () => {
  return (
    <AuthLayout>
      <AuthHeader
        title="Reset Password 🔒"
        subtitle="Create a new password for your StudentHub account."
      />

      <form className="space-y-6">

        <PasswordInput
          label="New Password"
          name="password"
          placeholder="Enter your new password"
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm your new password"
        />

        <Button className="w-full">
          Reset Password
        </Button>

      </form>

      <AuthFooter
        text="Remember your password?"
        linkText="Login"
        to="/login"
      />
    </AuthLayout>
  );
};

export default ResetPassword;