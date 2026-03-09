import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FounderMessageCollapseProps {
  paragraphs: string[];
}

export default function FounderMessageCollapse({ paragraphs }: FounderMessageCollapseProps) {
  const [expanded, setExpanded] = useState(false);

  const renderParagraph = (text: string, idx: number) => {
    if (idx === 0) {
      return (
        <p key={idx}>
          <span className="font-bold text-primary">{text}</span>
        </p>
      );
    }
    if (idx === paragraphs.length - 1) {
      return (
        <p key={idx} className="font-semibold text-primary text-center pt-2">
          {text}
        </p>
      );
    }
    return <p key={idx}>{text}</p>;
  };

  return (
    <div>
      {expanded ? (
        <div className="space-y-4">
          {paragraphs.map(renderParagraph)}
          <button
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full border-2 border-primary text-primary bg-primary/5 hover:bg-primary/10 transition-all"
            onClick={() => setExpanded(false)}
          >
            Show Less <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div>
          {paragraphs.slice(0, 2).map(renderParagraph)}
          <div className="flex justify-center mt-4">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary text-primary bg-primary/5 hover:bg-primary/10 transition-all"
              onClick={() => setExpanded(true)}
            >
              Read More <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
