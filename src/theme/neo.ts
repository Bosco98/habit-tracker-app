export const neoTheme = {
  colors: {
    primary: "#c084fc", // Light pastel purple for main login
    secondary: "#fecca7", // Soft pastel orange
    accent: "#bfdbfe", // Soft pastel blue
    backgroundLight: "#fdfbf7", // Off-white/cream
    backgroundDark: "#1a1a1a",
    surfaceLight: "#ffffff",
    surfaceDark: "#262626",
    text: "#000000",
    textDark: "#ffffff",
    border: "#000000",
    shadow: "#000000",
    error: "#FF3D00",
    success: "#4CAF50",
    google: "#FFFFFF",
    inputPlaceholder: "#9CA3AF",
    highlight: "#FDE047",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  borderWidth: {
    thin: 2,
    thick: 4,
  },
  shadows: {
    neo: {
      shadowColor: "#000000",
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 4,
    },
    neoLg: {
      shadowColor: "#000000",
      shadowOffset: { width: 8, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 8,
    },
    neoSm: {
      shadowColor: "#000000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 2,
    },
    none: {
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    }
  },
  text: {
    h1: { fontSize: 32, fontWeight: "900", letterSpacing: -1 },
    h2: { fontSize: 24, fontWeight: "900", letterSpacing: -0.5 },
    body: { fontSize: 16, fontWeight: "700" },
    caption: { fontSize: 14, fontWeight: "500" },
    button: { fontSize: 18, fontWeight: "800", textTransform: "uppercase" },
  }
} as const;

export type NeoTheme = typeof neoTheme;
