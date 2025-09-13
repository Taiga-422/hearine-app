'use client';

import AuthForm from '@/components/auth/AuthForm';

interface LoginData {
  email: string;
  password: string;
}

export default function LoginPage() {

  const handleLogin = (data: LoginData) => {
    // ログイン処理をここに実装
    console.log('Login data:', data);
  };

  const handleForgotPassword = () => {
    // パスワードリセット処理
    console.log('Forgot password clicked');
  };

  return (
    <AuthForm
      mode="login"
      onSubmit={handleLogin}
      onForgotPassword={handleForgotPassword}
    />
  );
}