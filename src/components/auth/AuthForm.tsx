'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmit: (data: AuthFormData) => void;
  onForgotPassword?: () => void;
}

export default function AuthForm({ mode, onSubmit, onForgotPassword }: AuthFormProps) {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    ...(mode === 'signup' && { confirmPassword: '' }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isSignup = mode === 'signup';
  const title = isSignup ? 'Hearineへようこそ！' : 'Hearineへようこそ！';
  const buttonText = isSignup ? 'サインアップ' : 'ログイン';

  // 共通のテキストフィールドスタイル
  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#ffffff',
      borderRadius: 2,
      '& fieldset': {
        borderColor: '#e0e0e0',
      },
      '&:hover fieldset': {
        borderColor: '#1db584',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1db584',
      },
    },
  };

  // 共通のラベルスタイル
  const labelStyles = {
    mb: 1,
    color: '#333',
    fontWeight: 500,
    fontFamily: 'var(--font-geist-sans)',
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f0f8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-geist-sans)',
        p: 2,
      }}
    >
      <Box sx={{ maxWidth: 450, width: '100%' }}>
        {/* タイトル */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: 'center',
            mb: 4,
            color: '#1db584',
            fontWeight: 'bold',
            fontFamily: 'var(--font-geist-sans)',
          }}
        >
          {title}
        </Typography>

        {/* フォーム */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: '#ffffff',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Email */}
            <Box>
              <Typography variant="body1" sx={labelStyles}>
                メールアドレス
              </Typography>
              <TextField
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={textFieldStyles}
              />
            </Box>

            {/* Password */}
            <Box>
              <Typography variant="body1" sx={labelStyles}>
                パスワード
              </Typography>
              <TextField
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={textFieldStyles}
              />
            </Box>

            {/* Confirm Password (signup only) */}
            {isSignup && (
              <Box>
                <Typography variant="body1" sx={labelStyles}>
                  パスワード確認
                </Typography>
                <TextField
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword || ''}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={textFieldStyles}
                />
              </Box>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: '#1db584',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1.1rem',
                borderRadius: 2,
                fontFamily: 'var(--font-geist-sans)',
                textTransform: 'none',
                boxShadow: '0 4px 16px rgba(29, 181, 132, 0.3)',
                '&:hover': {
                  backgroundColor: '#17a374',
                  boxShadow: '0 6px 20px rgba(29, 181, 132, 0.4)',
                },
              }}
            >
              {buttonText}
            </Button>

            {/* Forgot Password Link (login only) */}
            {!isSignup && onForgotPassword && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link
                  component="button"
                  type="button"
                  onClick={onForgotPassword}
                  sx={{
                    color: '#333',
                    textDecoration: 'underline',
                    fontFamily: 'var(--font-geist-sans)',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    border: 'none',
                    background: 'none',
                    '&:hover': {
                      color: '#1db584',
                    },
                  }}
                >
                  パスワードをお忘れですか？
                </Link>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}