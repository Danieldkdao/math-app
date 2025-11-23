"use client";
import React from "react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "katex/dist/katex.css";
import rehypeSanitize from "rehype-sanitize";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

interface PuzzleEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder: string;
}

const PuzzleEditor: React.FC<PuzzleEditorProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div
      data-color-mode="light"
      className="rounded-xl overflow-hidden border border-gray-200"
    >
      <MDEditor
        value={value}
        onChange={onChange}
        textareaProps={{
          placeholder,
        }}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize], [rehypeKatex]],
          remarkPlugins: [remarkMath],
        }}
        height={300}
        className="!border-none !shadow-none"
      />
    </div>
  );
};

export default PuzzleEditor;
