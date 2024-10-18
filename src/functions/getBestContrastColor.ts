function hexToRGB(hex: string): [number, number, number] {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return [r, g, b];
}


function luminance(r: number, g: number, b: number): number {
    const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrastRatio(lum1: number, lum2: number): number {
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}


export default function getBestContrastColor(hexColor: string): '#000000' | '#FFFFFF' {
    const rgb = hexToRGB(hexColor);
    const lum = luminance(rgb[0], rgb[1], rgb[2]);

    const whiteLum = luminance(255, 255, 255);
    const blackLum = luminance(0, 0, 0);

    const contrastWhite = contrastRatio(lum, whiteLum);
    const contrastBlack = contrastRatio(lum, blackLum);

    return contrastBlack > contrastWhite ? '#000000' : '#FFFFFF';
}
