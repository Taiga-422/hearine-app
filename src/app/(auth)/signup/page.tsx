'use client';

import AuthForm from '@/components/auth/AuthForm';

interface SignupData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function SignUpPage() {
  const handleSignup = (data: SignupData) => {
    // サインアップ処理をここに実装
    console.log('Sign up data:', data);
  };

  return (
    <AuthForm
      mode="signup"
      onSubmit={handleSignup}
    />
  );
}
