import React, { Key, useCallback } from "react";
import styles from "./Toolbar.module.css";
import {
  DropdownOption,
  ToolbarDropdown,
} from "./ToolbarDropdown/ToolbarDropdown";
import { ToolbarButton } from "./ToolbarButton/ToolbarButton";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $INTERNAL_isPointSelection,
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  $isRootOrShadowRoot,
} from "lexical";
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $findMatchingParent } from "@lexical/utils";

const blockTypeName = {
  h1: "Heading 1",
  h2: "Heading 2",
  paragraph: "Normal Text",
};

const blockNames = Object.values(blockTypeName);

export function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);
  const [blockType, setBlockType] =
    React.useState<keyof typeof blockTypeName>("paragraph");

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return;

    // get anchor element of selection
    const anchorNode = selection.anchor.getNode();
    let element =
      anchorNode.getKey() === "root"
        ? anchorNode
        : $findMatchingParent(anchorNode, (e) => {
            const parent = e.getParent();
            return parent !== null && $isRootOrShadowRoot(parent);
          });

    if (element === null) {
      element = anchorNode.getTopLevelElementOrThrow();
    }
    const elementKey = element.getKey();
    const elementDOM = editor.getElementByKey(elementKey);

    // update text formats
    setIsBold(selection.hasFormat("bold"));
    setIsUnderline(selection.hasFormat("underline"));
  }, []);

  React.useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, $updateToolbar]);

  function onBlockTypeSelection(value: Key) {
    console.log(value);
    editor.update(() => {
      const selection = $getSelection();
      if ($INTERNAL_isPointSelection(selection)) {
        if (value === "paragraph") {
          $setBlocksType(selection, () => $createParagraphNode());
        } else if (value === "h1" || value === "h2") {
          $setBlocksType(selection, () => $createHeadingNode(value));
        }
      }
    });
  }

  return (
    <div className={styles.container}>
      <ToolbarDropdown
        ariaLabel="Text Select"
        selected={blockType}
        onSelectionChange={onBlockTypeSelection}
      >
        <DropdownOption id="h1" label={blockTypeName["h1"]} />
        <DropdownOption id="h2" label={blockTypeName["h2"]} />
        <DropdownOption id="paragraph" label={blockTypeName["paragraph"]} />
      </ToolbarDropdown>
      <div className={styles.separator}></div>
      <ToolbarButton
        label="Bold"
        isActive={isBold}
        onPress={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      />
      <ToolbarButton
        label="Underline"
        isActive={isUnderline}
        onPress={(e) => console.log(e)}
      />
      <div className={styles.separator}></div>
    </div>
  );
}
