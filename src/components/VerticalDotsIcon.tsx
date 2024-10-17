import React from "react";

export type VerticalDotsIconsProps = React.ComponentProps<'svg'> & {
    width?: number;
    height?: number;
    size?: number;
}

export const VerticalDotsIcon: React.FC<VerticalDotsIconsProps> = ({size = 24, width, height, ...props}) => (
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
        <path
            d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
            fill="currentColor"
        />
    </svg>
);