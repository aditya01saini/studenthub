import AuthLayout from "../../layouts/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthFooter from "../../components/auth/AuthFooter";

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <AuthHeader
        title="Forgot Password?"
        subtitle="Enter your registered email address. We'll send you a password reset link."
      />

      <form className="space-y-6">

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your registered email"
        />

        <Button className="w-full">
          Send Reset Link
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

export default ForgotPassword;