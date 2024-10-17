import React from "react";

export type PlusIconsProps = React.ComponentProps<'svg'> & {
    width?: number;
    height?: number;
    size?: number;
}

export const PlusIcon: React.FC<PlusIconsProps> = ({size = 24, width, height, ...props}) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height={size || height}
        role="presentation"
        viewBox="0 0 24 24"
        width={size || width}
        {...props}
    >
        <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        >
            <path d="M6 12h12"/>
            <path d="M12 18V6"/>
        </g>
    </svg>
);