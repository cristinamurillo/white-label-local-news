import React from "react";
import { Editor } from "@/components/editor";
import styles from "./editor.module.css";

export default function ArticleEditor() {
  return (
    <div className={styles.pageContainer}>
      <Editor />
    </div>
  );
}
