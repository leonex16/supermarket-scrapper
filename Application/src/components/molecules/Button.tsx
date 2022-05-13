import React from "react";
import styles from '@Application/styles/molecules/Button.module.css'

export enum ButtonColor {
  Primary = 'scr-btn--primary'
}

export interface ButtonProps {
  color: ButtonColor;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string; 
}

export function Button( {color, onClick, text}: ButtonProps ) {
  return (
    <button className={`${styles['scr-btn']} ${styles[color]}`} onClick={onClick}  >{ text }</button>
  )
}