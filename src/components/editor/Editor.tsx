import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HeadingNode } from "@lexical/rich-text";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { Toolbar } from "./toolbar/Toolbar";
import styles from "./Editor.module.css";
import { AutoFocusPlugin } from "./plugins/AutoFocus";
import { LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";

function onError(error: Error) {
  console.error(error);
}

const THEME_PREFIX = "article-editor";
const theme = {
  text: {
    underline: `${THEME_PREFIX}-underline`,
    italic: `${THEME_PREFIX}-italic`,
  },
  heading: {
    h1: `${THEME_PREFIX}-h1`,
    h2: `${THEME_PREFIX}-h2`,
  },
};

export function Editor() {
  const initialConfig = {
    namespace: "ArticleEditor",
    nodes: [HeadingNode, LinkNode],
    theme,
    onError,
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={styles.editorContainer}>
        <Toolbar />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className={styles.editorContentEditable} />
          }
          ErrorBoundary={LexicalErrorBoundary}
          placeholder={
            <div className={styles.editorPlaceholder}>Enter some text...</div>
          }
        />
        <LinkPlugin />
      </div>
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}
