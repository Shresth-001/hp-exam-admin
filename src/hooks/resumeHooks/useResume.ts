// hooks/useResumePreview.ts
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchResume } from '@/app/api/resumeApi/fetchResumeApi';

interface UseResumePreviewResult {
  previewUrl: string | null;
  handlePreviewClick: (url: string) => void;
  isLoading: boolean;
  isError: boolean;
  closePreview: () => void;
}

export const useResumePreview = (): UseResumePreviewResult => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  
  const {
    mutate,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: fetchResume, 
    onSuccess: (blob: Blob) => {
      console.log('hey')
      const objectUrl = URL.createObjectURL(blob);
      setPreviewUrl(objectUrl);
    },
    onError: (error) => {
      console.error('An error occurred during resume preview:', error);
      
      setPreviewUrl(null);
    },
  });

 
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

 
  const handlePreviewClick = (url: string) => {
    
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    mutate(url);
  };

  
  const closePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  return { previewUrl, handlePreviewClick, isLoading, isError, closePreview };
};