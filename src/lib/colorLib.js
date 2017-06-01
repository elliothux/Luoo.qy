// Basic function to convert color values


// Convert RGB to HSL
export function RGB2HSL(r, g, b) {
    r = r / 255; g = g / 255; b = b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return {
        H: Math.round(getH()),
        S: Math.round(getS() * Math.pow(10, 2)) / Math.pow(10, 2),
        L: Math.round(getL() * Math.pow(10, 2)) / Math.pow(10, 2)
    };

    function getH() {
        if (max === min) return 0;
        else if (max === g)
            return 60 * (b - r) / (max -min) + 120;
        else if (max === b)
            return 60 * (r - g) / (max -min) + 240;
        else if (max === r && g >= b)
            return 60 * (g - b) / (max -min);
        else if (max === r && g < b)
            return 60 * (g - b) / (max -min) + 360;
        return 0;
    }

    function getL() {
        return 1/2 * (max + min)
    }

    function getS() {
        const l = getL();
        if (l === 0) return 0;
        else if (l > 0 && l < 0.5)
            return (max - min) / (max + min);
        else if (l > 0.5)
            return (max - min) / (2 - (max + min));
    }
}


// Convert HSL to RGB
export function HSL2RGB(h, s, l) {
    const C = (1 - Math.abs(2 * l - 1)) * s;
    const X = C * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - C / 2;

    let {r, g, b} = function () {
        if (h >= 0 && h < 60) return {r: C, g: X, b: 0};
        else if (h >= 60 && h < 120) return {r: X, g: C, b: 0};
        else if (h >= 120 && h < 180) return {r: 0, g: C, b: X};
        else if (h >= 180 && h < 240) return {r: 0, g: X, b: C};
        else if (h >= 240 && h < 300) return {r: X, g: 0, b: C};
        else if (h >= 300 && h <= 360) return {r: C, g: 0, b: X};
    }();

    return {
        R: Math.round((r + m) * 255),
        G: Math.round((g + m) * 255),
        B: Math.round((b + m) * 255)
    }
}


// Convert RGB to HEX
export function RGB2HEX(r, g, b) {
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}


// Convert HEX to RGB
export function HEX2RGB(hex) {
    if (hex.length === 4)
        hex = [hex.slice(1, 2), hex.slice(2, 3), hex.slice(3, 4)];
    else if (hex.length === 7)
        hex = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)];
    return {
        R: parseInt(hex[0], 16),
        G: parseInt(hex[1], 16),
        B: parseInt(hex[2], 16)
    }
}
