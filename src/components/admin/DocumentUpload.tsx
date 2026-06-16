'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface DocumentUploadProps {
  value: string;
  onChange: (url: string, documentId?: number) => void;
  folder?: string;
  label?: string;
  required?: boolean;
}

const DOC_TYPES_MAP: Record<string, string> = {
  'application/pdf': 'PDF',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'text/plain': 'TXT',
};

const VALID_TYPES = Object.keys(DOC_TYPES_MAP);

export default function DocumentUpload({
  value,
  onChange,
  folder = 'documents',
  label = 'Document',
  required = false,
}: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!VALID_TYPES.includes(file.type)) {
      setError('Please upload a valid document (PDF, DOCX, or TXT)');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('Document size must be less than 20MB');
      return;
    }

    setError(null);
    setFileName(file.name);
    setFileType(file.type);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      formData.append('type', 'document');
      formData.append('title', file.name.replace(/\.[^.]+$/, ''));

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.url, data.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setFileName(null);
      setFileType(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const clearFile = () => {
    onChange('');
    setFileName(null);
    setFileType(null);
    setError(null);
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}

      {!value && !uploading ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            dragActive
              ? 'border-primary bg-muted'
              : 'border-border hover:border-primary/50 hover:bg-muted/50'
          }`}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
            className="hidden"
            onChange={handleChange}
          />
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Drag and drop or click to upload
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PDF, DOCX, TXT (max 20MB)
          </p>
        </div>
      ) : uploading ? (
        <div className="border-2 border-primary/30 rounded-lg p-6 text-center bg-muted/30">
          <Loader2 className="w-6 h-6 text-primary animate-spin mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Uploading and processing...</p>
          <p className="text-xs text-muted-foreground mt-1">{fileName}</p>
        </div>
      ) : (
        <div className="border border-border rounded-lg p-4 bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {fileName || value.split('/').pop() || 'Document'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {fileType ? DOC_TYPES_MAP[fileType] || fileType : 'Uploaded'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearFile}
              className="p-1.5 text-muted-foreground hover:text-destructive rounded flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}
