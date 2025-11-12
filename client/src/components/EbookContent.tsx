import React from "react";
import { Streamdown } from "streamdown";

interface EbookContentProps {
  content: string;
  className?: string;
}

export const EbookContent: React.FC<EbookContentProps> = ({ content, className = "" }) => {
  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <Streamdown>{content}</Streamdown>
    </div>
  );
};

export default EbookContent;
