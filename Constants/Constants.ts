// constants.ts

export const COLORS = {
    primary: "#12A3ED",
    secondary: "#E8F0F2",
    background: "#FFFFFF",
    text: "#111827",
    mutedText: "#6B7280",
    border: "#E5E7EB",
    danger: "#EF4444",
    success: "#22C55E",
    warning: "#FACC15",
  };
  
  export const FONTSIZES = {
    h1: 32,
    h2: 26,
    h3: 22,
    h4: 18,
    bodyLarge: 18,
    body: 16,
    bodySmall: 14,
    caption: 12,
    tiny: 10,
  };
  
  export const FONTWEIGHTS = {
    bold: "700" as const,
    semibold: "600" as const,
    medium: "500" as const,
    regular: "400" as const,
  };
  
  export const SPACING = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 28,
  };
  
  export const RADIUS = {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 20,
    round: 100,
  };
  
  // ⭐ Ready-to-use text styles (Typography)
  export const TYPOGRAPHY = {
    h1: {
      fontSize: FONTSIZES.h1,
      fontWeight: FONTWEIGHTS.bold,
      color: COLORS.text,
    },
    h2: {
      fontSize: FONTSIZES.h2,
      fontWeight: FONTWEIGHTS.bold,
      color: COLORS.text,
    },
    h3: {
      fontSize: FONTSIZES.h3,
      fontWeight: FONTWEIGHTS.semibold,
      color: COLORS.text,
    },
    body: {
      fontSize: FONTSIZES.body,
      fontWeight: FONTWEIGHTS.regular,
      color: COLORS.text,
    },
    caption: {
      fontSize: FONTSIZES.caption,
      fontWeight: FONTWEIGHTS.regular,
      color: COLORS.mutedText,
    },
  };
  