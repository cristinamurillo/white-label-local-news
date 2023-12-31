import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function AutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    editor.focus();
  }, [editor]);
  return null;
}
