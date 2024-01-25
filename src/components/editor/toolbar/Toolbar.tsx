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
  RangeSelection,
  TextNode,
  ElementNode,
  KEY_MODIFIER_COMMAND,
  COMMAND_PRIORITY_NORMAL,
} from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $createHeadingNode, $isHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $findMatchingParent } from "@lexical/utils";
import { $isAtNodeEnd } from "@lexical/selection";

const blockTypeName = {
  h1: "Heading 1",
  h2: "Heading 2",
  paragraph: "Normal Text",
};

//TODO: move to utils or something
function getSelectedNode(selection: RangeSelection): TextNode | ElementNode {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
  }
}
const SUPPORTED_URL_PROTOCOLS = new Set([
  "http:",
  "https:",
  "mailto:",
  "sms:",
  "tel:",
]);
function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    // eslint-disable-next-line no-script-url
    if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
      return "about:blank";
    }
  } catch {
    return url;
  }
  return url;
}

export function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isLink, setIsLink] = React.useState(false);
  const [blockType, setBlockType] =
    React.useState<keyof typeof blockTypeName>("paragraph");
  const [isApple, setIsApple] = React.useState(false);

  React.useEffect(() => {
    const appleUserAgent = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
    setIsApple(appleUserAgent);
  }, []);

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

    // update active text formats
    setIsBold(selection.hasFormat("bold"));
    setIsUnderline(selection.hasFormat("underline"));
    setIsItalic(selection.hasFormat("italic"));

    // update links
    const node = getSelectedNode(selection);
    const parent = node.getParent();
    if ($isLinkNode(parent) || $isLinkNode(node)) {
      setIsLink(true);
    } else {
      setIsLink(false);
    }

    // update block type
    // TODO: add typing here
    const selectedBlockType = $isHeadingNode(element)
      ? element.getTag()
      : element.getType();
    setBlockType(selectedBlockType);
  }, []);

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

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

  React.useEffect(() => {
    return editor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload;
        const { code, ctrlKey, metaKey } = event;

        if (code === "KeyK" && (ctrlKey || metaKey)) {
          event.preventDefault();
          let url: string | null;
          if (!isLink) {
            url = sanitizeUrl("https://");
          } else {
            url = null;
          }
          return editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
        }
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [editor, isLink]);

  function onBlockTypeSelection(value: Key) {
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
        title={isApple ? "Bold (⌘B)" : "Bold (Ctrl + B)"}
        onPress={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      />
      <ToolbarButton
        label="Underline"
        isActive={isUnderline}
        title={isApple ? "Underline (⌘U)" : "Underline (Ctrl + U)"}
        onPress={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      />
      <ToolbarButton
        label="Italics"
        isActive={isItalic}
        title={isApple ? "Italics (⌘I)" : "Italics (Ctrl + I)"}
        onPress={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      />
      <div className={styles.separator}></div>
    </div>
  );
}
