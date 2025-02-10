"use client"

import React from 'react';
import copy from 'copy-to-clipboard';

export interface CopyToClipboardProps {
    text: string
    children: React.ReactNode
    onCopy?: (text: string, result: boolean) => void
    options?: {
        debug: boolean
        message: string
        format: string
    },
    className?: string
    onClick?:  React.MouseEventHandler<HTMLButtonElement>
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
                                                              text,
                                                              onCopy,
                                                              children,
                                                              options, ...other }) => {


    const clickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        const result = copy(text, options);

        if (onCopy) {
            onCopy(text, result);
        }
    };

    return (
        <button {...other} onClick={clickHandler}>
            {children}
        </button>
    )
}

export default CopyToClipboard;
