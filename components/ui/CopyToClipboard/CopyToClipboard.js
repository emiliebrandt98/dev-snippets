import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CopyToClipboard({ textToCopy }) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    if (isCopied) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error(error);
      toast.error("Error copying text.");
    }
  }
  return (
    <button
      onClick={handleCopy}
      disabled={isCopied}
      className="cursor-pointer inline-flex items-center justify-center w-6 h-6 aspect-square rounded-lg bg-gray-100 hover:bg-gray-200 "
    >
      {isCopied ? (
        <Check size={16} className="text-green-600" />
      ) : (
        <Copy size={16} />
      )}
    </button>
  );
}
