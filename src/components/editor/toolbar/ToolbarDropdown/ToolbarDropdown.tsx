import React from "react";
import {Button, ListBox, ListBoxItem, Popover, Select, SelectValue} from 'react-aria-components';
import styles from './ToolbarDropdown.module.css'


type DropdownProps = {
  ariaLabel: string;
  options: string[],
}
export function ToolbarDropdown({ariaLabel, options}: DropdownProps) {
  return (
    <Select aria-label={ariaLabel} className={styles.select}>
      <Button className={styles.selectButton}>
        <SelectValue />
        <span aria-hidden="true">∨</span>
      </Button>
      <Popover className={styles.popover}>
        <ListBox>
          {options.map((option) => <ListBoxItem className={styles.option}>{option}</ListBoxItem>)}
        </ListBox>
      </Popover>
    </Select>
  )
}
