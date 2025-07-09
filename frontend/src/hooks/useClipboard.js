const useClipboard = (text) => {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return { hasCopied, onCopy };
};

export default Session;