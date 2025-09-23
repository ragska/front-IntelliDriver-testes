// Importação do React com hook useState para gerenciamento de dados do usuário
// useState usado para simular dados que normalmente viriam de uma API ou contexto global
import React, { useState } from 'react';
// Importações abrangentes de componentes do React Native para interface complexa de estatísticas
// StyleSheet: Sistema de estilos otimizado para performance
// Text: Componente fundamental para renderização de textos formatados
// View: Container universal para estruturação e layout de elementos
// Image: Componente para exibição de foto de perfil do usuário
// TouchableOpacity: Botões interativos para navegação e ações
// ScrollView: Container scrollável para conteúdo extenso com múltiplas seções
// Dimensions: API para obtenção de dimensões da tela para layouts responsivos
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Dimensions
} from 'react-native';
// Importação do LinearGradient do Expo para efeitos visuais elegantes
// Usado no header e cards especiais para depth visual e hierarquia
import { LinearGradient } from 'expo-linear-gradient';
// Importação da biblioteca Ionicons para ícones consistentes e variados
// Fornece ícones para estatísticas, conquistas, navegação e status
import { Ionicons } from '@expo/vector-icons';
// Importação do componente de navegação inferior universal
// Mantém consistência de navegação entre todas as telas da aplicação
import NavBar from '../components/Navbar';
// Importação do componente Header para cabeçalho com logo centralizada
import Header from '../components/Header';
// Importação do ícone personalizado EcoCoin para representação da moeda virtual
// Componente SVG customizado para branding e gamificação
import EcoCoinIcon from '../assets/ecocoin-icon';
// Importação completa do sistema de design centralizado
// colors: Paleta de cores consistente para temas e estados
// fonts: Sistema tipográfico com tamanhos e pesos padronizados
// spacing: Tokens de espaçamento para margins, paddings e gaps
// borderRadius: Padrões de bordas arredondadas para elementos
// shadows: Sistema de sombras para depth e hierarquia visual
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
// Importação da função helper para mapeamento dinâmico de famílias de fontes
// Facilita uso consistente das fontes Poppins e Montserrat
import { getFontFamily } from '../hooks/useFontLoader';

// Extração da largura da tela para layouts responsivos
// Usado para cálculos de dimensionamento de componentes adaptativos
const { width } = Dimensions.get('window');

// Componente principal da tela de estatísticas detalhadas do perfil
// Apresenta métricas de desempenho, conquistas, ranking e análises de condução
// Recebe navigation como prop para transições entre telas
export default function ProfileStats({ navigation }) {
  // Estado para dados do usuário com estrutura completa de perfil e estatísticas
  // Normalmente estes dados viriam de um contexto global, API ou banco de dados local
  // Simulação de dados reais para demonstração de funcionalidades
  const [userData] = useState({
    // Informações básicas do perfil
    name: 'João Silva', // Nome completo do usuário
    profileImage: null, // URL da imagem de perfil ou null para placeholder
    ecocoins: 1850, // Saldo atual de EcoCoins acumulados
    level: 'Eco Driver', // Nível/categoria atual do usuário no sistema
    // Objeto com estatísticas detalhadas de performance
    stats: {
      totalTrips: 124, // Total de viagens realizadas
      totalDistance: '2,840 km', // Distância total percorrida
      co2Saved: '45.2 kg', // Quantidade de CO² economizado
      fuelSaved: '186 L', // Combustível economizado em litros
      points: 1850, // Pontos totais acumulados
      ranking: 23 // Posição atual no ranking global
    },
    // Array de conquistas/achievements do usuário
    achievements: [
      { 
        id: 1, 
        icon: 'leaf', // Ícone representativo da conquista
        title: 'Eco Warrior', // Título da conquista
        description: 'Economizou 50kg de CO²', // Descrição do critério
        unlocked: true // Status: desbloqueada ou bloqueada
      },
      { 
        id: 2, 
        icon: 'speedometer', 
        title: 'Speed Master', 
        description: 'Manteve velocidade ideal', 
        unlocked: true 
      },
      { 
        id: 3, 
        icon: 'trophy', 
        title: 'Top Driver', 
        description: 'Entre os 50 melhores', 
        unlocked: true 
      },
      { 
        id: 4, 
        icon: 'star', 
        title: 'Consistent', 
        description: '30 dias consecutivos', 
        unlocked: false // Conquista ainda não desbloqueada
      },
    ]
  });

  // Componente reutilizável para cards de estatísticas principais
  // Cria layout consistente para exibição de métricas com ícone, valor e label
  // Parâmetros: icon (string), value (número/string), label (string), color (opcional)
  const StatCard = ({ icon, value, label, color = colors.primary }) => (
    <View style={styles.statCard}>
      {/* Container do ícone com fundo colorido circular */}
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        {/* Ícone Ionicons com cor de superfície para contraste */}
        <Ionicons name={icon} size={20} color={colors.surface} />
      </View>
      {/* Valor principal da estatística com destaque tipográfico */}
      <Text style={styles.statValue}>{value}</Text>
      {/* Label descritivo da métrica */}
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  // Componente para renderização individual de cada conquista/achievement
  // Apresenta visual diferenciado baseado no status de desbloqueio
  // Parâmetro: achievement (objeto com id, icon, title, description, unlocked)
  const AchievementItem = ({ achievement }) => (
    // Container principal com estilo condicional baseado em status de desbloqueio
    <View style={[styles.achievementItem, !achievement.unlocked && styles.achievementLocked]}>
      {/* Container do ícone da conquista com estilo baseado em status */}
      <View style={[styles.achievementIcon, !achievement.unlocked && styles.achievementIconLocked]}>
        {/* Ícone com cor condicional: branco para desbloqueadas, cinza para bloqueadas */}
        <Ionicons 
          name={achievement.icon} 
          size={20} 
          color={achievement.unlocked ? colors.surface : colors.text.placeholder} 
        />
      </View>
      {/* Container das informações textuais da conquista */}
      <View style={styles.achievementText}>
        {/* Título da conquista com estilo condicional */}
        <Text style={[styles.achievementTitle, !achievement.unlocked && styles.achievementTitleLocked]}>
          {achievement.title}
        </Text>
        {/* Descrição da conquista com estilo condicional */}
        <Text style={[styles.achievementDescription, !achievement.unlocked && styles.achievementDescriptionLocked]}>
          {achievement.description}
        </Text>
      </View>
      {/* Indicador visual de conquista desbloqueada (checkmark) */}
      {achievement.unlocked && (
        <Ionicons name="checkmark-circle" size={20} color={colors.success} />
      )}
    </View>
  );

  // Renderização da interface principal da tela de estatísticas do perfil
  return (
    // Container principal com fundo consistente do sistema de design
    <View style={styles.container}>
      {/* Header com logo centralizada */}
      <Header />
      
      {/* ScrollView para navegação vertical suave através das múltiplas seções */}
      {/* Indicador de scroll desabilitado para interface mais limpa */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header com gradiente e informações principais do usuário */}
        {/* LinearGradient cria transição suave entre cor primária e escura */}
        <LinearGradient
          colors={[colors.primary, colors.dark]}
          style={styles.header}
        >
          {/* Container da foto de perfil com funcionalidade de navegação */}
          {/* TouchableOpacity permite navegação para tela de edição de perfil */}
          <TouchableOpacity 
            style={styles.profileImageContainer}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.8} // Feedback visual sutil ao toque
          >
            {/* Renderização condicional da imagem de perfil */}
            {userData.profileImage ? (
              // Exibição da imagem real do usuário quando disponível
              <Image
                source={{ uri: userData.profileImage }}
                style={styles.profileImage}
              />
            ) : (
              // Placeholder com ícone de pessoa quando imagem não disponível
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={60} color={colors.surface} />
              </View>
            )}
            {/* Indicador visual pequeno mostrando que a imagem é editável */}
            <View style={styles.editIndicator}>
              <Ionicons name="pencil" size={12} color={colors.surface} />
            </View>
          </TouchableOpacity>

          {/* Seção de informações textuais do usuário */}
          {/* Nome do usuário com destaque tipográfico máximo */}
          <Text style={styles.userName}>{userData.name}</Text>
          {/* Nível/categoria atual do usuário no sistema */}
          <Text style={styles.userLevel}>{userData.level}</Text>

          {/* Container dos EcoCoins com design destacado */}
          {/* Card branco sobre o gradiente para criar contraste e hierarquia */}
          <View style={styles.ecocoinsContainer}>
            {/* Container do ícone EcoCoin personalizado */}
            <View style={styles.ecocoinIcon}>
              <EcoCoinIcon size={30} />
            </View>
            {/* Valor dos EcoCoins formatado com separadores de milhares */}
            <Text style={styles.ecocoinsValue}>{userData.ecocoins.toLocaleString()}</Text>
            {/* Label identificativo da moeda virtual */}
            <Text style={styles.ecocoinsLabel}>EcoCoins</Text>
          </View>
        </LinearGradient>

        {/* Seção de estatísticas principais do usuário */}
        {/* Apresenta métricas fundamentais de performance em layout de cards */}
        <View style={styles.section}>
          {/* Título da seção com hierarquia tipográfica clara */}
          <Text style={styles.sectionTitle}>Suas Estatísticas</Text>
          
          {/* Primeira linha de estatísticas: Viagens e Distância */}
          {/* Layout horizontal com distribuição uniforme entre cards */}
          <View style={styles.statsGrid}>
            {/* Card de total de viagens com ícone de carro e cor primária */}
            <StatCard 
              icon="car" 
              value={userData.stats.totalTrips} 
              label="Viagens" 
              color={colors.primary}
            />
            {/* Card de distância total com ícone de velocímetro e cor accent */}
            <StatCard 
              icon="speedometer" 
              value={userData.stats.totalDistance} 
              label="Distância" 
              color={colors.accent}
            />
          </View>

          {/* Segunda linha de estatísticas: Economia ambiental */}
          {/* Foco em métricas de sustentabilidade e eficiência ecológica */}
          <View style={styles.statsGrid}>
            {/* Card de CO² economizado com ícone de folha e cor de sucesso */}
            <StatCard 
              icon="leaf" 
              value={userData.stats.co2Saved} 
              label="CO² Economizado" 
              color={colors.success}
            />
            {/* Card de combustível economizado com ícone de água e cor secundária */}
            <StatCard 
              icon="water" 
              value={userData.stats.fuelSaved} 
              label="Combustível Economizado" 
              color={colors.secondary}
            />
          </View>
        </View>

        {/* Seção de análise de performance recente */}
        {/* Métricas detalhadas de condução com cards coloridos e botão de análise */}
        <View style={styles.section}>
          {/* Título da seção de performance */}
          <Text style={styles.sectionTitle}>Performance Recente</Text>
          
          {/* Grid de cards de performance em layout flexível */}
          {/* 4 cards organizados em 2 colunas com métricas específicas */}
          <View style={styles.performanceGrid}>
            {/* Card de velocidade média com cor azul identificativa */}
            <View style={styles.performanceCard}>
              {/* Ícone com fundo colorido e transparência para suavidade */}
              <View style={[styles.performanceIcon, { backgroundColor: '#2196F3' + '20' }]}>
                <Ionicons name="speedometer-outline" size={20} color="#2196F3" />
              </View>
              {/* Valor da métrica com destaque tipográfico */}
              <Text style={styles.performanceValue}>48.5 km/h</Text>
              {/* Label descritivo da métrica */}
              <Text style={styles.performanceLabel}>Velocidade Média</Text>
            </View>
            
            {/* Card de consumo médio com cor verde eco-friendly */}
            <View style={styles.performanceCard}>
              <View style={[styles.performanceIcon, { backgroundColor: '#4CAF50' + '20' }]}>
                <Ionicons name="leaf" size={20} color="#4CAF50" />
              </View>
              <Text style={styles.performanceValue}>8.2 L/100km</Text>
              <Text style={styles.performanceLabel}>Consumo Médio</Text>
            </View>
            
            {/* Card de Eco Score com cor laranja para destaque */}
            <View style={styles.performanceCard}>
              <View style={[styles.performanceIcon, { backgroundColor: '#FF9800' + '20' }]}>
                <Ionicons name="pulse" size={20} color="#FF9800" />
              </View>
              <Text style={styles.performanceValue}>85</Text>
              <Text style={styles.performanceLabel}>Eco Score</Text>
            </View>
            
            {/* Card de Safety Score com cor roxa para diferenciação */}
            <View style={styles.performanceCard}>
              <View style={[styles.performanceIcon, { backgroundColor: '#9C27B0' + '20' }]}>
                <Ionicons name="shield-checkmark" size={20} color="#9C27B0" />
              </View>
              <Text style={styles.performanceValue}>92</Text>
              <Text style={styles.performanceLabel}>Safety Score</Text>
            </View>
          </View>
          
          {/* Card de resumo de performance com gradiente e navegação */}
          {/* Botão interativo que leva para análise detalhada de veículos */}
          <TouchableOpacity 
            style={styles.performanceSummary}
            onPress={() => navigation.navigate('CarsAnalytics')}
          >
            {/* Gradiente entre cores accent e secondary para destaque visual */}
            <LinearGradient
              colors={[colors.accent, colors.secondary]}
              style={styles.performanceSummaryGradient}
            >
              {/* Header do card com ícone, título e indicador de navegação */}
              <View style={styles.performanceSummaryHeader}>
                {/* Ícone de analytics para identificação da funcionalidade */}
                <Ionicons name="analytics" size={24} color={colors.dark} />
                {/* Título explicativo da ação */}
                <Text style={styles.performanceSummaryTitle}>Análise Detalhada</Text>
                {/* Seta indicando navegação disponível */}
                <Ionicons name="arrow-forward" size={20} color={colors.dark} />
              </View>
              
              {/* Conteúdo do card com métricas resumidas */}
              {/* Layout horizontal para distribuição uniforme de informações */}
              <View style={styles.performanceSummaryContent}>
                {/* Item de resumo: Total de viagens */}
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryValue}>124</Text>
                  <Text style={styles.summaryLabel}>Viagens</Text>
                </View>
                {/* Item de resumo: Distância total percorrida */}
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryValue}>2,840 km</Text>
                  <Text style={styles.summaryLabel}>Distância Total</Text>
                </View>
                {/* Item de resumo: CO² economizado total */}
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryValue}>45.2 kg</Text>
                  <Text style={styles.summaryLabel}>CO² Economizado</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Seção de classificação/ranking do usuário */}
        {/* Exibe posição no ranking global e pontuação atual */}
        <View style={styles.section}>
          {/* Título da seção de ranking */}
          <Text style={styles.sectionTitle}>Classificação</Text>
          
          {/* Card principal do ranking com layout horizontal */}
          <View style={styles.rankingCard}>
            <View style={styles.rankingContent}>
              {/* Ícone de troféu dourado para representar competição */}
              <View style={styles.rankingIcon}>
                <Ionicons name="trophy" size={24} color="#FFD700" />
              </View>
              {/* Informações da posição no ranking */}
              <View style={styles.rankingInfo}>
                {/* Posição atual com formatação de ordinal (#) */}
                <Text style={styles.rankingPosition}>#{userData.stats.ranking}</Text>
                {/* Label explicativo da métrica */}
                <Text style={styles.rankingLabel}>Posição no Ranking</Text>
              </View>
              {/* Informações de pontuação total */}
              <View style={styles.pointsInfo}>
                {/* Valor total de pontos com destaque visual */}
                <Text style={styles.pointsValue}>{userData.stats.points}</Text>
                {/* Label dos pontos */}
                <Text style={styles.pointsLabel}>Pontos</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Seção de conquistas/achievements do usuário */}
        {/* Sistema de gamificação com conquistas desbloqueadas e bloqueadas */}
        <View style={styles.section}>
          {/* Título da seção de conquistas */}
          <Text style={styles.sectionTitle}>Conquistas</Text>
          
          {/* Container das conquistas com espaçamento entre itens */}
          <View style={styles.achievementsContainer}>
            {/* Mapeamento de cada conquista para componente visual */}
            {userData.achievements.map((achievement) => (
              <AchievementItem key={achievement.id} achievement={achievement} />
            ))}
          </View>
        </View>

        {/* Seção do botão de ação principal */}
        {/* Call-to-action para navegação para perfil completo */}
        <View style={styles.section}>
          {/* Botão destacado para ver perfil completo */}
          {/* Layout horizontal com texto e ícone de navegação */}
          <TouchableOpacity 
            style={styles.fullProfileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            {/* Texto do botão com estilo destacado */}
            <Text style={styles.fullProfileButtonText}>Ver Perfil Completo</Text>
            {/* Ícone de seta indicando navegação */}
            <Ionicons name="arrow-forward" size={20} color={colors.surface} />
          </TouchableOpacity>
        </View>

        {/* Espaçamento inferior para evitar sobreposição com NavBar */}
        {/* Height fixo de 100px para garantir espaço adequado */}
        <View style={{ height: 100 }} />
      </ScrollView>
      
      {/* Componente de navegação inferior fixo */}
      {/* Mantém consistência de navegação em toda a aplicação */}
      <NavBar />
    </View>
  );
}

// Sistema de estilos da tela ProfileStats com design moderno e hierarquia visual clara
// Utiliza sistema de design consistente com gradientes, sombras e tipografia estruturada
const styles = StyleSheet.create({
  // Container principal que ocupa toda a tela com fundo do tema
  container: {
    flex: 1, // Ocupa todo espaço vertical disponível
    backgroundColor: colors.background, // Cor de fundo padrão do sistema
  },
  // Header com gradiente e padding para status bar
  // Contém foto de perfil, informações do usuário e EcoCoins
  header: {
    paddingTop: spacing.xxl + spacing.lg, // Padding superior para status bar + extra
    paddingHorizontal: spacing.lg, // Padding lateral generoso
    paddingBottom: spacing.xl, // Padding inferior amplo para respiração
    alignItems: 'center', // Centralização horizontal de todos os elementos
  },
  // Container da imagem de perfil com posicionamento relativo para indicador
  profileImageContainer: {
    position: 'relative', // Permite posicionamento absoluto do indicador de edição
    marginBottom: spacing.lg, // Margem inferior para separação das informações
  },
  // Estilo da imagem de perfil real com bordas e dimensões fixas
  profileImage: {
    width: 120, // Largura fixa para consistência visual
    height: 120, // Altura quadrada para proporção harmoniosa
    borderRadius: borderRadius.round, // Bordas completamente arredondadas (circular)
    borderWidth: 4, // Borda branca para destaque sobre gradiente
    borderColor: colors.surface, // Cor branca da borda
  },
  // Placeholder para quando não há imagem de perfil definida
  // Mantém mesmas dimensões da imagem real para consistência
  profileImagePlaceholder: {
    width: 120, // Largura idêntica à imagem real
    height: 120, // Altura idêntica à imagem real
    borderRadius: borderRadius.round, // Bordas circulares consistentes
    backgroundColor: colors.dark, // Fundo escuro para contraste
    justifyContent: 'center', // Centralização vertical do ícone
    alignItems: 'center', // Centralização horizontal do ícone
    borderWidth: 4, // Borda consistente com imagem real
    borderColor: colors.surface, // Cor branca da borda
  },
  // Indicador pequeno de que a imagem é editável
  // Posicionado absolutamente no canto inferior direito
  editIndicator: {
    position: 'absolute', // Posicionamento absoluto para sobreposição
    bottom: 0, // Alinhamento ao fundo do container
    right: 0, // Alinhamento à direita do container
    width: 28, // Largura pequena para discrição
    height: 28, // Altura quadrada pequena
    borderRadius: borderRadius.round, // Bordas circulares
    backgroundColor: colors.accent, // Cor accent para destaque sutil
    justifyContent: 'center', // Centralização vertical do ícone
    alignItems: 'center', // Centralização horizontal do ícone
    borderWidth: 2, // Borda branca para separação visual
    borderColor: colors.surface, // Cor branca da borda
  },
  // Estilo do nome do usuário com máxima hierarquia tipográfica
  // Cor branca para contraste sobre gradiente escuro
  userName: {
    fontSize: fonts.sizes.xxl, // Tamanho extra grande para destaque principal
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte Poppins Bold para impacto
    color: colors.surface, // Cor branca para contraste sobre gradiente
    marginBottom: spacing.xs, // Margem inferior pequena para proximidade
  },
  // Estilo do nível/categoria do usuário com cor secundária
  // Informação complementar com menos destaque que o nome
  userLevel: {
    fontSize: fonts.sizes.md, // Tamanho médio para informação secundária
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte regular para hierarquia
    color: colors.secondary, // Cor secundária para diferenciação
    marginBottom: spacing.lg, // Margem inferior para separação dos EcoCoins
  },
  // Container dos EcoCoins com design de card destacado
  // Fundo branco sobre gradiente para máximo contraste e visibilidade
  ecocoinsContainer: {
    flexDirection: 'row', // Layout horizontal para ícone + texto
    alignItems: 'center', // Alinhamento vertical central
    backgroundColor: colors.surface, // Fundo branco para contraste
    paddingHorizontal: spacing.lg, // Padding lateral generoso
    paddingVertical: spacing.md, // Padding vertical médio
    borderRadius: borderRadius.xl, // Bordas muito arredondadas para suavidade
    ...shadows.medium, // Sombra média para depth visual
  },
  // Container do ícone EcoCoin com dimensões circulares
  ecocoinIcon: {
    width: 32, // Largura fixa para consistência
    height: 32, // Altura circular
    borderRadius: borderRadius.round, // Bordas completamente arredondadas
    justifyContent: 'center', // Centralização vertical do ícone
    alignItems: 'center', // Centralização horizontal do ícone
    marginRight: spacing.sm, // Margem direita para separação do texto
  },
  // Valor dos EcoCoins com destaque tipográfico máximo
  // Formatação com separadores para legibilidade de números grandes
  ecocoinsValue: {
    fontSize: fonts.sizes.xl, // Tamanho grande para destaque do valor
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte bold para importância
    color: colors.text.primary, // Cor primária do texto
    marginRight: spacing.xs, // Margem direita pequena para proximidade com label
  },
  // Label dos EcoCoins com hierarquia inferior ao valor
  ecocoinsLabel: {
    fontSize: fonts.sizes.sm, // Tamanho pequeno para label
    fontFamily: getFontFamily('Poppins', 'Medium'), // Fonte medium para destaque sutil
    color: colors.text.secondary, // Cor secundária para hierarquia
  },
  // Estilo base das seções de conteúdo com padding consistente
  section: {
    padding: spacing.lg, // Padding uniforme para todas as seções
  },
  // Títulos das seções com hierarquia tipográfica clara
  sectionTitle: {
    fontSize: fonts.sizes.lg, // Tamanho grande para títulos de seção
    fontFamily: getFontFamily('Poppins', 'SemiBold'), // Fonte semi-bold para estruturação
    color: colors.text.secondary, // Cor secundária para diferenciação
    marginBottom: spacing.md, // Margem inferior para separação do conteúdo
  },
  // Layout grid para distribuição horizontal dos cards de estatísticas
  // Flexbox com distribuição uniforme e gap para espaçamento
  statsGrid: {
    flexDirection: 'row', // Layout horizontal para cards lado a lado
    justifyContent: 'space-between', // Distribuição uniforme com espaços
    marginBottom: spacing.md, // Margem inferior para separação entre linhas
    gap: spacing.sm, // Espaçamento entre cards individuais
  },
  // Estilo individual dos cards de estatísticas principais
  // Design com ícone, valor e label em layout vertical centralizado
  statCard: {
    flex: 1, // Ocupação igual do espaço disponível entre cards
    backgroundColor: colors.surface, // Fundo branco para destaque
    borderRadius: borderRadius.lg, // Bordas arredondadas grandes
    padding: spacing.md, // Padding interno médio
    alignItems: 'center', // Centralização horizontal do conteúdo
    ...shadows.small, // Sombra pequena para depth sutil
  },
  // Container do ícone nas estatísticas com fundo colorido circular
  // Cor do fundo definida dinamicamente baseada no tipo de estatística
  statIcon: {
    width: 40, // Largura fixa para consistência
    height: 40, // Altura circular
    borderRadius: borderRadius.round, // Bordas completamente arredondadas
    justifyContent: 'center', // Centralização vertical do ícone
    alignItems: 'center', // Centralização horizontal do ícone
    marginBottom: spacing.sm, // Margem inferior para separação do valor
  },
  // Valor numérico das estatísticas com destaque tipográfico
  statValue: {
    fontSize: fonts.sizes.lg, // Tamanho grande para destaque do valor
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte bold para importância
    color: colors.text.primary, // Cor primária para máximo contraste
    marginBottom: spacing.xs, // Margem inferior pequena para proximidade com label
  },
  // Label descritivo das estatísticas com hierarquia inferior
  // Texto centralizado para harmonia com layout vertical do card
  statLabel: {
    fontSize: fonts.sizes.xs, // Tamanho pequeno para informação secundária
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte regular para hierarquia
    color: colors.text.secondary, // Cor secundária para diferenciação
    textAlign: 'center', // Centralização para quebras de linha harmoniosas
  },
  // Card principal do ranking com design destacado e sombra média
  rankingCard: {
    backgroundColor: colors.surface, // Fundo branco para destaque
    borderRadius: borderRadius.lg, // Bordas arredondadas grandes
    padding: spacing.lg, // Padding interno generoso
    ...shadows.medium, // Sombra média para importância visual
  },
  // Layout horizontal do conteúdo do ranking
  rankingContent: {
    flexDirection: 'row', // Layout horizontal para ícone + info + pontos
    alignItems: 'center', // Alinhamento vertical central
  },
  // Container do ícone de troféu no ranking
  rankingIcon: {
    marginRight: spacing.md, // Margem direita para separação das informações
  },
  // Container flexível para informações de posição
  rankingInfo: {
    flex: 1, // Ocupa espaço disponível entre ícone e pontos
  },
  // Estilo da posição no ranking com destaque tipográfico
  rankingPosition: {
    fontSize: fonts.sizes.xl, // Tamanho grande para destaque da posição
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte bold para importância
    color: colors.text.primary, // Cor primária para máximo contraste
  },
  // Label explicativo da posição no ranking
  rankingLabel: {
    fontSize: fonts.sizes.sm, // Tamanho pequeno para informação secundária
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte regular para hierarquia
    color: colors.text.secondary, // Cor secundária para diferenciação
  },
  // Container das informações de pontos alinhado à direita
  pointsInfo: {
    alignItems: 'flex-end', // Alinhamento à direita para simetria visual
  },
  // Valor dos pontos com cor primária para destaque
  pointsValue: {
    fontSize: fonts.sizes.lg, // Tamanho grande para importância
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte bold para destaque
    color: colors.primary, // Cor primária do tema para consistência
  },
  // Label dos pontos com hierarquia visual inferior
  pointsLabel: {
    fontSize: fonts.sizes.xs, // Tamanho pequeno para informação secundária
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte regular para hierarquia
    color: colors.text.secondary, // Cor secundária para diferenciação
  },
  // Container das conquistas com espaçamento uniforme entre itens
  achievementsContainer: {
    gap: spacing.sm, // Espaçamento pequeno entre conquistas para densidade visual
  },
  // Estilo base dos itens de conquista com layout horizontal
  achievementItem: {
    flexDirection: 'row', // Layout horizontal para ícone + texto + status
    alignItems: 'center', // Alinhamento vertical central
    backgroundColor: colors.surface, // Fundo branco para destaque
    borderRadius: borderRadius.md, // Bordas arredondadas médias
    padding: spacing.md, // Padding interno médio
    ...shadows.small, // Sombra pequena para depth sutil
  },
  // Estilo para conquistas ainda não desbloqueadas (visual atenuado)
  achievementLocked: {
    opacity: 0.6, // Redução de opacidade para indicar status bloqueado
  },
  // Container do ícone das conquistas com fundo colorido
  achievementIcon: {
    width: 40, // Largura fixa para consistência
    height: 40, // Altura circular
    borderRadius: borderRadius.round, // Bordas completamente arredondadas
    backgroundColor: colors.primary, // Cor primária para conquistas desbloqueadas
    justifyContent: 'center', // Centralização vertical do ícone
    alignItems: 'center', // Centralização horizontal do ícone
    marginRight: spacing.md, // Margem direita para separação do texto
  },
  // Ícone para conquistas bloqueadas com cor secundária
  achievementIconLocked: {
    backgroundColor: colors.secondary, // Cor secundária para status bloqueado
  },
  // Container flexível para textos das conquistas
  achievementText: {
    flex: 1, // Ocupa espaço disponível entre ícone e indicador de status
  },
  // Título das conquistas com peso semi-bold
  achievementTitle: {
    fontSize: fonts.sizes.md, // Tamanho médio para títulos de conquista
    fontFamily: getFontFamily('Poppins', 'SemiBold'), // Fonte semi-bold para destaque
    color: colors.text.primary, // Cor primária para máximo contraste
    marginBottom: spacing.xs, // Margem inferior pequena para proximidade
  },
  // Título para conquistas bloqueadas com cor atenuada
  achievementTitleLocked: {
    color: colors.text.placeholder, // Cor placeholder para status bloqueado
  },
  // Descrição das conquistas com hierarquia inferior
  achievementDescription: {
    fontSize: fonts.sizes.sm, // Tamanho pequeno para descrição
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte regular para hierarquia
    color: colors.text.secondary, // Cor secundária para diferenciação
  },
  // Descrição para conquistas bloqueadas com cor atenuada
  achievementDescriptionLocked: {
    color: colors.text.placeholder, // Cor placeholder para status bloqueado
  },
  // Botão principal de ação com destaque visual máximo
  fullProfileButton: {
    flexDirection: 'row', // Layout horizontal para texto + ícone
    alignItems: 'center', // Alinhamento vertical central
    justifyContent: 'center', // Centralização horizontal do conteúdo
    backgroundColor: colors.primary, // Cor primária para call-to-action
    borderRadius: borderRadius.lg, // Bordas arredondadas grandes
    paddingVertical: spacing.md, // Padding vertical médio
    paddingHorizontal: spacing.lg, // Padding horizontal generoso
    ...shadows.medium, // Sombra média para importância visual
    gap: spacing.sm, // Espaçamento entre texto e ícone
  },
  // Texto do botão principal com cor branca para contraste
  fullProfileButtonText: {
    fontSize: fonts.sizes.md, // Tamanho médio para call-to-action
    fontFamily: getFontFamily('Poppins', 'SemiBold'), // Fonte semi-bold para destaque
    color: colors.surface, // Cor branca para contraste sobre fundo primário
  },
  // Grid flexível para cards de performance em layout de 2 colunas
  performanceGrid: {
    flexDirection: 'row', // Layout horizontal base
    flexWrap: 'wrap', // Quebra de linha automática para responsividade
    justifyContent: 'space-between', // Distribuição uniforme entre cards
    marginBottom: spacing.lg, // Margem inferior para separação
  },
  // Cards individuais de performance com largura fixa
  performanceCard: {
    width: '48%', // Largura de 48% para 2 colunas com espaço entre elas
    backgroundColor: colors.surface, // Fundo branco para destaque
    borderRadius: borderRadius.md, // Bordas arredondadas médias
    padding: spacing.md, // Padding interno médio
    alignItems: 'center', // Centralização horizontal do conteúdo
    marginBottom: spacing.sm, // Margem inferior para espaçamento vertical
    ...shadows.small, // Sombra pequena para depth sutil
  },
  // Container dos ícones de performance com fundo colorido dinâmico
  performanceIcon: {
    width: 40, // Largura fixa para consistência
    height: 40, // Altura circular
    borderRadius: borderRadius.round, // Bordas completamente arredondadas
    justifyContent: 'center', // Centralização vertical do ícone
    alignItems: 'center', // Centralização horizontal do ícone
    marginBottom: spacing.sm, // Margem inferior para separação do valor
  },
  // Valores das métricas de performance com destaque tipográfico
  performanceValue: {
    fontSize: fonts.sizes.lg, // Tamanho grande para destaque do valor
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte bold para importância
    color: colors.text.primary, // Cor primária para máximo contraste
    marginBottom: spacing.xs, // Margem inferior pequena para proximidade
  },
  // Labels das métricas de performance com hierarquia inferior
  performanceLabel: {
    fontSize: fonts.sizes.xs, // Tamanho pequeno para informação secundária
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte regular para hierarquia
    color: colors.text.secondary, // Cor secundária para diferenciação
    textAlign: 'center', // Centralização para quebras de linha harmoniosas
  },
  // Container do resumo de performance com overflow hidden para gradiente
  performanceSummary: {
    borderRadius: borderRadius.lg, // Bordas arredondadas grandes
    overflow: 'hidden', // Esconde conteúdo que excede as bordas arredondadas
    ...shadows.medium, // Sombra média para importância visual
  },
  // Gradiente interno do resumo de performance
  performanceSummaryGradient: {
    padding: spacing.lg, // Padding interno generoso
  },
  // Header do resumo com layout horizontal e distribuição de espaço
  performanceSummaryHeader: {
    flexDirection: 'row', // Layout horizontal para ícone + título + seta
    alignItems: 'center', // Alinhamento vertical central
    justifyContent: 'space-between', // Distribuição de espaço entre elementos
    marginBottom: spacing.md, // Margem inferior para separação do conteúdo
  },
  // Título do resumo de performance com fonte destacada
  performanceSummaryTitle: {
    fontSize: fonts.sizes.lg, // Tamanho grande para título de seção
    fontFamily: getFontFamily('Poppins', 'SemiBold'), // Fonte semi-bold para destaque
    color: colors.dark, // Cor escura para contraste sobre gradiente claro
    flex: 1, // Ocupa espaço disponível entre ícone e seta
    marginLeft: spacing.sm, // Margem esquerda para separação do ícone
  },
  // Container horizontal para itens do resumo de performance
  performanceSummaryContent: {
    flexDirection: 'row', // Layout horizontal para distribuição uniforme
    justifyContent: 'space-around', // Distribuição uniforme com espaçamento automático
  },
  // Itens individuais do resumo com centralização
  summaryItem: {
    alignItems: 'center', // Centralização horizontal para layout vertical
  },
  // Valores do resumo com destaque tipográfico
  summaryValue: {
    fontSize: fonts.sizes.md, // Tamanho médio para valores de resumo
    fontFamily: getFontFamily('Poppins', 'Bold'), // Fonte bold para destaque
    color: colors.dark, // Cor escura para contraste sobre gradiente
  },
  // Labels do resumo com hierarquia visual inferior
  summaryLabel: {
    fontSize: fonts.sizes.xs, // Tamanho pequeno para labels de resumo
    fontFamily: getFontFamily('Poppins', 'Regular'), // Fonte regular para hierarquia
    color: colors.dark, // Cor escura para consistência
    opacity: 0.8, // Leve transparência para hierarquia visual
    marginTop: spacing.xs, // Margem superior pequena para separação
    textAlign: 'center', // Centralização para quebras de linha harmoniosas
  },
});