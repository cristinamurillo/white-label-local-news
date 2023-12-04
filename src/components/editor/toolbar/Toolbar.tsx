import React from "react";
import styles from './Toolbar.module.css';
import {ToolbarDropdown} from "./ToolbarDropdown/ToolbarDropdown";
import {ToolbarButton} from "./ToolbarButton/ToolbarButton";

export function Toolbar() {
  return (
    <div className={styles.container}>
      <ToolbarDropdown
        ariaLabel="Text Select"
        options={[
          'Normal Text',
          'Heading 1',
          'Heading 2'
        ]}
      />
      <div className={styles.separator}></div>
        <ToolbarButton label="Bold" isActive={false} onPress={(e) => console.log(e)}/>
        <ToolbarButton label="Underline" isActive={false} onPress={(e) => console.log(e)}/>
      <div className={styles.separator}></div>
    </div>
  )
}
