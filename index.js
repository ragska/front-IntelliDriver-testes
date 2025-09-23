// ========================================
// PONTO DE ENTRADA DA APLICAÇÃO - INDEX.JS
// ========================================

// Importação da função de registro do componente raiz do Expo
import { registerRootComponent } from 'expo';

// Importação do componente principal da aplicação
import App from './App';

// ========================================
// REGISTRO DO COMPONENTE RAIZ
// ========================================

/**
 * FUNÇÃO registerRootComponent
 * 
 * Esta função é responsável por registrar o componente principal da aplicação
 * no sistema do React Native/Expo. Ela funciona como ponte entre o JavaScript
 * e as plataformas nativas (iOS/Android).
 * 
 * O que esta função faz internamente:
 * 1. Chama AppRegistry.registerComponent('main', () => App)
 * 2. Configura o ambiente adequadamente para Expo Go e builds nativos
 * 3. Define o ponto de entrada único da aplicação
 * 4. Garante compatibilidade entre desenvolvimento e produção
 * 
 * Diferenças entre ambientes:
 * - Expo Go: Executa o app dentro do cliente Expo
 * - Build nativo: Executa como app standalone no dispositivo
 * 
 * Esta função garante que ambos os ambientes funcionem corretamente
 * sem necessidade de configuração adicional.
 * 
 * @param {React.Component} App - Componente raiz da aplicação
 */
registerRootComponent(App);
