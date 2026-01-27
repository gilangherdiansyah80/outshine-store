import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border-b border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-4 cursor-pointer"
      >
        <span className="text-sm font-medium text-gray-800 text-left pr-4">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`text-gray-400 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FaqItem;
