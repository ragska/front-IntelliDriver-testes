// Cores da identidade visual IntelliDriver
export const colors = {
  // Cores principais
  primary: '#7F9170',      // Verde principal
  secondary: '#BFE59E',    // Verde claro
  accent: '#ADBBA0',       // Verde acinzentado
  dark: '#51663E',         // Verde escuro
  darker: '#2A3C1A',       // Verde mais escuro

  // Cores auxiliares
  background: '#F8F9F7',   // Fundo claro
  surface: '#FFFFFF',      // Superfície branca
  text: {
    primary: '#2A3C1A',    // Texto principal
    secondary: '#51663E',  // Texto secundário
    light: '#7F9170',      // Texto claro
    placeholder: '#ADBBA0' // Placeholder
  },
  
  // Estados
  success: '#BFE59E',
  warning: '#ADBBA0',
  error: '#D32F2F',
  
  // Transparências
  overlay: 'rgba(42, 60, 26, 0.5)',
  shadow: 'rgba(42, 60, 26, 0.1)'
};

// Configuração de fontes
export const fonts = {
  primary: 'Poppins',
  secondary: 'Montserrat',
  
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    title: 32,
    hero: 45
  },
  
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  }
};

// Espaçamentos
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

// Bordas e raios
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 50
};

// Sombras
export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8
  }
};