import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const MarkdownRenderer = ({ text }: { text: string }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
      {text}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
