import React from 'react';
import { PressEvent, useButton } from 'react-aria';
import styles from './ToolbarButton.module.css'

type ButtonProps = {
  label: string;
  isActive: boolean;
  onPress: (event: PressEvent) =>  void;
}

export function ToolbarButton(props: ButtonProps) {
  let ref = React.useRef<HTMLButtonElement>(null)
  let { buttonProps } = useButton(props, ref)
  return (
    <button
      className={`${styles.button} ${props.isActive ? styles.active : ''}`}
      ref={ref}
      {...buttonProps}
    >
      {props.label}
    </button>
  )
}
