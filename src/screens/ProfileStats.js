import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/Navbar';
import EcoCoinIcon from '../assets/ecocoin-icon';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';

const { width } = Dimensions.get('window');

export default function ProfileStats({ navigation }) {
  // Dados do usuário (normalmente viriam de um contexto ou API)
  const [userData] = useState({
    name: 'João Silva',
    profileImage: null, // URL da imagem ou null para placeholder
    ecocoins: 1850,
    level: 'Eco Driver',
    stats: {
      totalTrips: 124,
      totalDistance: '2,840 km',
      co2Saved: '45.2 kg',
      fuelSaved: '186 L',
      points: 1850,
      ranking: 23
    },
    achievements: [
      { id: 1, icon: 'leaf', title: 'Eco Warrior', description: 'Economizou 50kg de CO²', unlocked: true },
      { id: 2, icon: 'speedometer', title: 'Speed Master', description: 'Manteve velocidade ideal', unlocked: true },
      { id: 3, icon: 'trophy', title: 'Top Driver', description: 'Entre os 50 melhores', unlocked: true },
      { id: 4, icon: 'star', title: 'Consistent', description: '30 dias consecutivos', unlocked: false },
    ]
  });

  const StatCard = ({ icon, value, label, color = colors.primary }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={20} color={colors.surface} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const AchievementItem = ({ achievement }) => (
    <View style={[styles.achievementItem, !achievement.unlocked && styles.achievementLocked]}>
      <View style={[styles.achievementIcon, !achievement.unlocked && styles.achievementIconLocked]}>
        <Ionicons 
          name={achievement.icon} 
          size={20} 
          color={achievement.unlocked ? colors.surface : colors.text.placeholder} 
        />
      </View>
      <View style={styles.achievementText}>
        <Text style={[styles.achievementTitle, !achievement.unlocked && styles.achievementTitleLocked]}>
          {achievement.title}
        </Text>
        <Text style={[styles.achievementDescription, !achievement.unlocked && styles.achievementDescriptionLocked]}>
          {achievement.description}
        </Text>
      </View>
      {achievement.unlocked && (
        <Ionicons name="checkmark-circle" size={20} color={colors.success} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header com Perfil */}
        <LinearGradient
          colors={[colors.primary, colors.dark]}
          style={styles.header}
        >
          {/* Foto do Usuário - Clicável */}
          <TouchableOpacity 
            style={styles.profileImageContainer}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.8}
          >
            {userData.profileImage ? (
              <Image
                source={{ uri: userData.profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={60} color={colors.surface} />
              </View>
            )}
            {/* Indicador de que é clicável */}
            <View style={styles.editIndicator}>
              <Ionicons name="pencil" size={12} color={colors.surface} />
            </View>
          </TouchableOpacity>

          {/* Informações do Usuário */}
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userLevel}>{userData.level}</Text>

          {/* EcoCoins */}
          <View style={styles.ecocoinsContainer}>
            <View style={styles.ecocoinIcon}>
              <EcoCoinIcon size={30} />
            </View>
            <Text style={styles.ecocoinsValue}>{userData.ecocoins.toLocaleString()}</Text>
            <Text style={styles.ecocoinsLabel}>EcoCoins</Text>
          </View>
        </LinearGradient>

        {/* Estatísticas Principais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suas Estatísticas</Text>
          
          <View style={styles.statsGrid}>
            <StatCard 
              icon="car" 
              value={userData.stats.totalTrips} 
              label="Viagens" 
              color={colors.primary}
            />
            <StatCard 
              icon="speedometer" 
              value={userData.stats.totalDistance} 
              label="Distância" 
              color={colors.accent}
            />
          </View>

          <View style={styles.statsGrid}>
            <StatCard 
              icon="leaf" 
              value={userData.stats.co2Saved} 
              label="CO² Economizado" 
              color={colors.success}
            />
            <StatCard 
              icon="water" 
              value={userData.stats.fuelSaved} 
              label="Combustível Economizado" 
              color={colors.secondary}
            />
          </View>
        </View>

        {/* Performance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Recente</Text>
          
          <View style={styles.performanceGrid}>
            <View style={styles.performanceCard}>
              <View style={[styles.performanceIcon, { backgroundColor: '#2196F3' + '20' }]}>
                <Ionicons name="speedometer-outline" size={20} color="#2196F3" />
              </View>
              <Text style={styles.performanceValue}>48.5 km/h</Text>
              <Text style={styles.performanceLabel}>Velocidade Média</Text>
            </View>
            
            <View style={styles.performanceCard}>
              <View style={[styles.performanceIcon, { backgroundColor: '#4CAF50' + '20' }]}>
                <Ionicons name="leaf" size={20} color="#4CAF50" />
              </View>
              <Text style={styles.performanceValue}>8.2 L/100km</Text>
              <Text style={styles.performanceLabel}>Consumo Médio</Text>
            </View>
            
            <View style={styles.performanceCard}>
              <View style={[styles.performanceIcon, { backgroundColor: '#FF9800' + '20' }]}>
                <Ionicons name="pulse" size={20} color="#FF9800" />
              </View>
              <Text style={styles.performanceValue}>85</Text>
              <Text style={styles.performanceLabel}>Eco Score</Text>
            </View>
            
            <View style={styles.performanceCard}>
              <View style={[styles.performanceIcon, { backgroundColor: '#9C27B0' + '20' }]}>
                <Ionicons name="shield-checkmark" size={20} color="#9C27B0" />
              </View>
              <Text style={styles.performanceValue}>92</Text>
              <Text style={styles.performanceLabel}>Safety Score</Text>
            </View>
          </View>
          
          {/* Performance Summary */}
          <TouchableOpacity 
            style={styles.performanceSummary}
            onPress={() => navigation.navigate('CarsAnalytics')}
          >
            <LinearGradient
              colors={[colors.accent, colors.secondary]}
              style={styles.performanceSummaryGradient}
            >
              <View style={styles.performanceSummaryHeader}>
                <Ionicons name="analytics" size={24} color={colors.dark} />
                <Text style={styles.performanceSummaryTitle}>Análise Detalhada</Text>
                <Ionicons name="arrow-forward" size={20} color={colors.dark} />
              </View>
              
              <View style={styles.performanceSummaryContent}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryValue}>124</Text>
                  <Text style={styles.summaryLabel}>Viagens</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryValue}>2,840 km</Text>
                  <Text style={styles.summaryLabel}>Distância Total</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryValue}>45.2 kg</Text>
                  <Text style={styles.summaryLabel}>CO² Economizado</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Ranking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Classificação</Text>
          
          <View style={styles.rankingCard}>
            <View style={styles.rankingContent}>
              <View style={styles.rankingIcon}>
                <Ionicons name="trophy" size={24} color="#FFD700" />
              </View>
              <View style={styles.rankingInfo}>
                <Text style={styles.rankingPosition}>#{userData.stats.ranking}</Text>
                <Text style={styles.rankingLabel}>Posição no Ranking</Text>
              </View>
              <View style={styles.pointsInfo}>
                <Text style={styles.pointsValue}>{userData.stats.points}</Text>
                <Text style={styles.pointsLabel}>Pontos</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Conquistas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conquistas</Text>
          
          <View style={styles.achievementsContainer}>
            {userData.achievements.map((achievement) => (
              <AchievementItem key={achievement.id} achievement={achievement} />
            ))}
          </View>
        </View>

        {/* Botão para Ver Perfil Completo */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.fullProfileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.fullProfileButtonText}>Ver Perfil Completo</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.surface} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
      
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: spacing.xxl + spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: spacing.lg,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.round,
    borderWidth: 4,
    borderColor: colors.surface,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.round,
    backgroundColor: colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.surface,
  },
  editIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: borderRadius.round,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  userName: {
    fontSize: fonts.sizes.xxl,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.surface,
    marginBottom: spacing.xs,
  },
  userLevel: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.secondary,
    marginBottom: spacing.lg,
  },
  ecocoinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    ...shadows.medium,
  },
  ecocoinIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  ecocoinsValue: {
    fontSize: fonts.sizes.xl,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginRight: spacing.xs,
  },
  ecocoinsLabel: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.small,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    textAlign: 'center',
  },
  rankingCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.medium,
  },
  rankingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankingIcon: {
    marginRight: spacing.md,
  },
  rankingInfo: {
    flex: 1,
  },
  rankingPosition: {
    fontSize: fonts.sizes.xl,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
  },
  rankingLabel: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  pointsInfo: {
    alignItems: 'flex-end',
  },
  pointsValue: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.primary,
  },
  pointsLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  achievementsContainer: {
    gap: spacing.sm,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.small,
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  achievementIconLocked: {
    backgroundColor: colors.secondary,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  achievementTitleLocked: {
    color: colors.text.placeholder,
  },
  achievementDescription: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  achievementDescriptionLocked: {
    color: colors.text.placeholder,
  },
  fullProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    ...shadows.medium,
    gap: spacing.sm,
  },
  fullProfileButtonText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.surface,
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  performanceCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.small,
  },
  performanceIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  performanceValue: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  performanceLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    textAlign: 'center',
  },
  performanceSummary: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.medium,
  },
  performanceSummaryGradient: {
    padding: spacing.lg,
  },
  performanceSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  performanceSummaryTitle: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.dark,
    flex: 1,
    marginLeft: spacing.sm,
  },
  performanceSummaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.dark,
  },
  summaryLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.dark,
    opacity: 0.8,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});