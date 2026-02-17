export const theme = {
  colors: {
    primary: '#8B5CF6', // Vibrant Purple
    secondary: '#10B981', // Emerald Green
    accent: '#F59E0B', // Amber
    background: '#FEFCE8', // Cream/Beige (updated from design)
    surface: '#FFFFFF', // White
    text: '#1F2937', // Dark Gray
    border: '#111827', // Almost Black
    error: '#EF4444', // Red
    success: '#A3E635', // Lime Green (updated from design)
    warning: '#FDE047', // Yellow
    info: '#60A5FA', // Blue

    // Specific UI colors
    chartPrimary: '#8B5CF6',
    chartSecondary: '#A3E635',
    missed: '#F472B6', // Pink/Red for missed habits
    buttonYellow: '#FDE047',
    iconPurple: '#C084FC',
    progressBarBg: '#E5E7EB',
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
    thin: 1,
    medium: 2,
    thick: 3,
  },
  shadows: {
    default: {
      shadowColor: '#111827',
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 4, // Android
    },
    pressed: {
      shadowColor: '#111827',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 2, // Android
    },
    none: {
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    }
  },
  text: {
    h1: { fontSize: 32, fontWeight: '800' },
    h2: { fontSize: 24, fontWeight: '700' },
    h3: { fontSize: 20, fontWeight: '700' },
    body: { fontSize: 16, fontWeight: '500' },
    caption: { fontSize: 14, fontWeight: '400' },
  }
} as const;

export type Theme = typeof theme;
