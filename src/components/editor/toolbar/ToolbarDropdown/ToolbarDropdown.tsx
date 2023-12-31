import React, { Key, PropsWithChildren } from "react";
import Image from "next/image";
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import styles from "./ToolbarDropdown.module.css";

type DropdownProps = {
  ariaLabel: string;
  selected: string;
  onSelectionChange: (key: Key) => void;
};
export function ToolbarDropdown({
  children,
  ariaLabel,
  selected,
  onSelectionChange,
}: PropsWithChildren<DropdownProps>) {
  return (
    <Select
      aria-label={ariaLabel}
      className={styles.select}
      selectedKey={selected}
      onSelectionChange={onSelectionChange}
    >
      <Button className={styles.selectButton}>
        <SelectValue />
        <div className={styles.icon}>
          <Image
            alt="chevron down icon"
            src="/icons/chevrondown.svg"
            fill={true}
          />
        </div>
      </Button>
      <Popover className={styles.popover}>
        <ListBox>{children}</ListBox>
      </Popover>
    </Select>
  );
}

type DropdownOptionProps = {
  id: string;
  label: string;
};
export function DropdownOption({ id, label }: DropdownOptionProps) {
  return (
    <ListBoxItem id={id} className={styles.option}>
      {label}
    </ListBoxItem>
  );
}
