'use client';

import { useState } from 'react';
import { Typography, Box, Paper, Button, Alert } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

export default function EmployeeInfoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      // TODO: API呼び出しを実装
      // const response = await fetch('/api/employee-info/upload', {
      //   method: 'POST',
      //   body: formData,
      // });

      console.log('File uploaded:', file.name);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        p: 4,
        maxWidth: 800,
        mx: 'auto'
      }}
    >
      <Typography variant="h4" gutterBottom>
        社員情報アップロード
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3,  }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 2,  }}>
            CSVまたはExcelファイルを選択してください
          </Typography>
          <Box
            component="label"
            sx={{
              display: 'block',
              cursor: 'pointer',
              border: '2px dashed #e0e0e0',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              '&:hover': {
                borderColor: '#1976d2',
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            <CloudUpload sx={{ fontSize: 48, color: '#757575', mb: 1 }} />
            <Typography variant="body2" sx={{  }}>
              ファイルをドラッグ&ドロップまたはクリックして選択
            </Typography>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </Box>
        </Box>

        {file && (
          <Alert severity="success" sx={{ mb: 3,  }}>
            <Typography variant="body2" sx={{  }}>
              選択されたファイル: <strong>{file.name}</strong>
            </Typography>
            <Typography variant="caption" sx={{  }}>
              サイズ: {(file.size / 1024).toFixed(2)} KB
            </Typography>
          </Alert>
        )}

        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
          variant="contained"
          size="large"
          startIcon={<CloudUpload />}
          sx={{ 
            px: 4,
            py: 1.5
          }}
        >
          {uploading ? 'アップロード中...' : 'アップロード'}
        </Button>
      </Paper>
    </Box>
  );
}