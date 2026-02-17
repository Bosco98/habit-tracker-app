export const theme = {
  colors: {
    primary: '#8B5CF6', // Vibrant Purple
    secondary: '#10B981', // Emerald Green
    accent: '#F59E0B', // Amber
    background: '#F3F4F6', // Light Gray
    surface: '#FFFFFF', // White
    text: '#1F2937', // Dark Gray
    border: '#111827', // Almost Black
    error: '#EF4444', // Red
    success: '#10B981', // Green
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
