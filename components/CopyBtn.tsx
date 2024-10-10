"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clipboard } from "lucide-react";

const CopyBtn = ({ text }: { text: string }) => {
  const copyToClipBoard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Text copied to clipboard");
    });
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => copyToClipBoard(text)}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full absolute top-2 right-2"
          >
            <Clipboard />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy to Clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyBtn;
