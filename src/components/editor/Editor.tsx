import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HeadingNode } from "@lexical/rich-text";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { Toolbar } from "./toolbar/Toolbar";

function onError(error: Error) {
  console.error(error);
}

const THEME_PREFIX = "article-editor";
const theme = {
  text: {
    underline: `${THEME_PREFIX}-underline`,
  },
  heading: {
    h1: `${THEME_PREFIX}-h1`,
    h2: `${THEME_PREFIX}-h2`,
  },
};

export function Editor() {
  const initialConfig = {
    namespace: "ArticleEditor",
    nodes: [HeadingNode],
    theme,
    onError,
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbar />
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
    </LexicalComposer>
  );
}
