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
      aria-label="copy text"
      className="button-icon button-icon-primary rounded-lg h-8 w-8 hover:shadow-transparent"
    >
      {isCopied ? (
        <Check size={16} className="cursor-not-allowed" />
      ) : (
        <Copy size={16} />
      )}
    </button>
  );
}
