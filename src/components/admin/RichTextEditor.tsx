'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

// Quill toolbar configuration
const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['link'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'list', 'bullet', 'indent',
  'align',
  'link'
];

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = 'Write your content here...',
  height = '300px'
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div 
        className="w-full border border-gray-200 rounded-xl bg-gray-50 animate-pulse"
        style={{ height }}
      />
    );
  }

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height }}
      />
      <style jsx global>{`
        .rich-text-editor .ql-toolbar {
          border: 1px solid #e5e7eb;
          border-bottom: none;
          border-radius: 0.75rem 0.75rem 0 0;
          background: #f9fafb;
        }
        .rich-text-editor .ql-container {
          border: 1px solid #e5e7eb;
          border-radius: 0 0 0.75rem 0.75rem;
          font-family: inherit;
          font-size: 15px;
        }
        .rich-text-editor .ql-editor {
          min-height: 200px;
          padding: 16px;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }
        .rich-text-editor .ql-tooltip {
          z-index: 100;
        }
        .rich-text-editor .ql-toolbar button {
          color: #374151;
        }
        .rich-text-editor .ql-toolbar button:hover,
        .rich-text-editor .ql-toolbar button.ql-active {
          color: #166534;
        }
        .rich-text-editor .ql-toolbar .ql-stroke {
          stroke: #374151;
        }
        .rich-text-editor .ql-toolbar .ql-stroke:hover,
        .rich-text-editor .ql-toolbar .ql-stroke.ql-active {
          stroke: #166534;
        }
        .rich-text-editor .ql-toolbar .ql-fill {
          fill: #374151;
        }
        .rich-text-editor .ql-toolbar .ql-fill:hover,
        .rich-text-editor .ql-toolbar .ql-fill.ql-active {
          fill: #166534;
        }
        .rich-text-editor .ql-toolbar .ql-picker {
          color: #374151;
        }
        .rich-text-editor .ql-toolbar .ql-picker:hover {
          color: #166534;
        }
        .rich-text-editor .ql-toolbar .ql-picker-options {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
      `}</style>
    </div>
  );
}
