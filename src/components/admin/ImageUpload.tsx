'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  required?: boolean;
  preview?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  folder = 'images',
  label = 'Image',
  required = false,
  preview = true
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`relative border-2 border-dashed rounded-xl transition-all ${
          dragActive
            ? 'border-primary bg-primary/5'
            : value
            ? 'border-border'
            : 'border-gray-200 hover:border-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {uploading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
            <p className="text-sm text-muted-foreground">Uploading...</p>
          </div>
        ) : value ? (
          <div className="relative group">
            {preview && (
              <div className="p-4">
                <div className="relative inline-block">
                  <img
                    src={value}
                    alt="Uploaded image"
                    className="max-h-48 rounded-lg object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                    }}
                  />
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={handleRemove}
                    className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            )}
            <div className="px-4 pb-4">
              <p className="text-xs text-muted-foreground truncate max-w-md">{value}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center justify-center py-8 cursor-pointer"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              Drag and drop or click to upload
            </p>
            <p className="text-xs text-muted-foreground">
              JPEG, PNG, GIF or WebP (max 5MB)
            </p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
