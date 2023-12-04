import React from "react";
import Image from "next/image";
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
        <div className={styles.icon}>
          <Image alt='chevron down icon' src='/icons/chevrondown.svg' fill={true}/>
        </div>
      </Button>
      <Popover className={styles.popover}>
        <ListBox>
          {options.map((option) => <ListBoxItem key={option} className={styles.option}>{option}</ListBoxItem>)}
        </ListBox>
      </Popover>
    </Select>
  )
}
