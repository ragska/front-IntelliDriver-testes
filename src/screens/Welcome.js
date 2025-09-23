import React from 'react';
import { 
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';

export default function Welcome({ navigation }) {
  
  /**
   * FUNÇÃO DE NAVEGAÇÃO PARA LOGIN
   * 
   * Navega para a tela de Login existente.
   */
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  /**
   * FUNÇÃO DE NAVEGAÇÃO PARA CADASTRO
   * 
   * Navega para a nova tela de Cadastro.
   */
  const goToRegister = () => {
    navigation.navigate('Cadastro');
  };

  // ========================================
  // RENDERIZAÇÃO DA INTERFACE
  // ========================================
  
  return (
    <View style={styles.container}>

      {/* ========================================
          CONTEÚDO PRINCIPAL
          ======================================== */}
      
      <View style={styles.content}>
        
        {/* ========================================
            SEÇÃO DE BOAS-VINDAS
            ======================================== */}
        
        <View style={styles.welcomeSection}>
          
          {/**
           * TÍTULO PRINCIPAL
           * 
           * Mensagem de boas-vindas acolhedora e profissional.
           */}
          <Text style={styles.title}>Bem-vindo ao</Text>
          <Text style={styles.appName}>IntelliDriver</Text>
          
          {/**
           * SUBTÍTULO EXPLICATIVO
           * 
           * Descrição breve do aplicativo para contextualizar o usuário.
           */}
          <Text style={styles.subtitle}>
            Sua experiência de direção consciente começa aqui
          </Text>
        </View>

        {/* ========================================
            ÍCONE CENTRAL
            ======================================== */}
        
        <View style={styles.iconSection}>
          
            <Image
              source={require('../assets/icon.png')}
              style={styles.appIcon}
            />
          
        </View>

        {/* ========================================
            BOTÕES DE AÇÃO
            ======================================== */}
        
        <View style={styles.buttonSection}>
          
          {/**
           * BOTÃO LOGIN (PRIMARY)
           * 
           * Botão principal para usuários existentes.
           */}
          <TouchableOpacity style={styles.primaryButton} onPress={goToLogin}>
            <Text style={styles.primaryButtonText}>Entrar</Text>
          </TouchableOpacity>

          {/**
           * BOTÃO CADASTRO (SECONDARY)
           * 
           * Botão secundário para novos usuários.
           */}
          <TouchableOpacity style={styles.secondaryButton} onPress={goToRegister}>
            <Text style={styles.secondaryButtonText}>Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ========================================
// ESTILOS DA TELA WELCOME
// ========================================

/**
 * SISTEMA DE ESTILOS COMPLETO
 * 
 * Estilos organizados por seção da tela de Welcome:
 * 1. Layout principal e containers
 * 2. Seção de boas-vindas
 * 3. Ícone central
 * 4. Botões de ação
 */
const styles = StyleSheet.create({
  
  // ========================================
  // LAYOUT PRINCIPAL
  // ========================================
  
  /**
   * CONTAINER RAIZ DA TELA
   * 
   * Estilo base que define o layout principal da tela de Welcome.
   */
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /**
   * CONTEÚDO PRINCIPAL
   * 
   * Container que organiza todo o conteúdo da tela com espaçamento adequado.
   */
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    justifyContent: 'space-between',
  },
  
  // ========================================
  // SEÇÃO DE BOAS-VINDAS
  // ========================================
  
  /**
   * CONTAINER DA SEÇÃO DE BOAS-VINDAS
   * 
   * Agrupa título, nome do app e subtítulo.
   */
  welcomeSection: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },

  /**
   * TÍTULO PRINCIPAL
   * 
   * "Bem-vindo ao" em fonte grande.
   */
  title: {
    fontSize: fonts.sizes.xl,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.primary,
    textAlign: 'center',
  },

  /**
   * NOME DO APLICATIVO
   * 
   * "IntelliDriver" em destaque máximo.
   */
  appName: {
    fontSize: fonts.sizes.hero,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.logo,
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  /**
   * SUBTÍTULO EXPLICATIVO
   * 
   * Descrição do aplicativo para contextualizar.
   */
  subtitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.lg,
  },
  
  // ========================================
  // ÍCONE CENTRAL
  // ========================================
  
  /**
   * SEÇÃO DO ÍCONE
   * 
   * Container centralizador para o ícone do app.
   */
  iconSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  /**
   * ÍCONE DO APLICATIVO
   * 
   * Logo principal do IntelliDriver.
   */
  appIcon: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  
  // ========================================
  // BOTÕES DE AÇÃO
  // ========================================
  
  /**
   * SEÇÃO DOS BOTÕES
   * 
   * Container para organizar os botões de ação.
   */
  buttonSection: {
    marginBottom: spacing.xxl,
    gap: spacing.md,
  },

  /**
   * BOTÃO PRIMARY (FAZER LOGIN)
   * 
   * Botão principal para usuários existentes.
   */
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.medium,
  },

  /**
   * TEXTO DO BOTÃO PRIMARY
   */
  primaryButtonText: {
    color: colors.surface,
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
  },

  /**
   * BOTÃO SECONDARY (CRIAR CONTA)
   * 
   * Botão secundário para novos usuários.
   */
  secondaryButton: {
    borderColor: colors.primary,
    borderWidth: 2,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },

  /**
   * TEXTO DO BOTÃO SECONDARY
   */
  secondaryButtonText: {
    color: colors.primary,
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
  },
});