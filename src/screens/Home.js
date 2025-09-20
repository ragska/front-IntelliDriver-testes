import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/logo.png';
import NavBar from '../components/Navbar';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';

export default function Home({ navigation }) {
  const topUsers = [
    { id: 1, name: 'User Name', points: 65321, position: 1 },
    { id: 2, name: 'User Name', points: 50000, position: 2 },
    { id: 3, name: 'User Name', points: 45321, position: 3 },
  ];

  const rankingUsers = [
    { id: 4, name: 'User Name', points: 36894, position: 4 },
    { id: 5, name: 'User Name', points: 23654, position: 5 },
    { id: 6, name: 'User Name', points: 18534, position: 6 },
    { id: 7, name: 'User Name', points: 18534, position: 7 },
    { id: 8, name: 'User Name', points: 18534, position: 8 },
    { id: 9, name: 'User Name', points: 18534, position: 9 },
    { id: 10, name: 'User Name', points: 18534, position: 10 },
  ];

  const objectives = [
    { id: 1, icon: 'leaf', title: 'Economia' },
    { id: 2, icon: 'time', title: 'Tempo' },
    { id: 3, icon: 'speedometer', title: 'Velocidade' },
    { id: 4, icon: 'car', title: 'Direção' },
    { id: 5, icon: 'shield-checkmark', title: 'Segurança' },
    { id: 6, icon: 'trophy', title: 'Conquistas' },
  ];

  const renderTopUser = (user, index) => (
    <View key={user.id} style={styles.topUserContainer}>
      <View style={[styles.medal, index === 1 && styles.firstPlace]}>
        <Image source={logo} style={styles.medalIcon} />
      </View>
      <Text style={styles.topUserName}>{user.name}</Text>
      <Text style={styles.topUserPoints}>{user.points.toLocaleString()}</Text>
    </View>
  );

  const renderRankingUser = (user) => (
    <View key={user.id} style={styles.rankingItem}>
      <View style={[styles.positionBadge, { backgroundColor: colors.secondary }]}>
        <Text style={styles.positionText}>{user.position}</Text>
      </View>
      <Text style={styles.rankingName}>{user.name}</Text>
      <Text style={styles.rankingPoints}>{user.points.toLocaleString()}</Text>
    </View>
  );

  const renderObjective = (objective) => (
    <TouchableOpacity key={objective.id} style={styles.objectiveItem}>
      <View style={styles.objectiveIcon}>
        <Ionicons name={objective.icon} size={24} color={colors.surface} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botão circular superior */}
      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Ionicons name="person" size={24} color={colors.surface} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header com gradiente verde */}
        <LinearGradient
          colors={[colors.primary, colors.dark]}
          style={styles.header}
        >
          <View style={styles.appSection}>
            <Text style={styles.headerTitle}>Adquira nosso app</Text>
            <Text style={styles.appName}>IntelliDriver</Text>
            
            {/* QR Code placeholder */}
            <View style={styles.qrContainer}>
              <View style={styles.qrCode}>
                <View style={styles.qrPattern} />
              </View>
            </View>
          </View>
          
          {/* Phone mockup */}
          <View style={styles.phoneContainer}>
            <View style={styles.phone}>
              <View style={styles.phoneScreen} />
            </View>
          </View>
        </LinearGradient>

        {/* Seção Melhores Usuários */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Melhores Usuários do Mês</Text>
          
          {/* Top 3 */}
          <View style={styles.topUsersContainer}>
            {topUsers.map((user, index) => renderTopUser(user, index))}
          </View>
          
          {/* Ranking 4-10 */}
          <View style={styles.rankingContainer}>
            {rankingUsers.map(renderRankingUser)}
          </View>
          
          {/* Search bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="pesquisar usuário"
              placeholderTextColor={colors.text.placeholder}
            />
            <Ionicons name="search" size={20} color={colors.text.placeholder} />
          </View>
        </View>

        {/* Seção Objetivos */}
        <View style={styles.objectivesSection}>
          <LinearGradient
            colors={[colors.primary, colors.dark]}
            style={styles.objectivesHeader}
          >
            <View style={styles.objectivesContent}>
              <Text style={styles.objectivesTitle}>NOSSOS</Text>
              <Text style={styles.objectivesTitle}>OBJETIVOS</Text>
              
              <View style={styles.objectivesGrid}>
                {objectives.map(renderObjective)}
              </View>
            </View>
            
            {/* Target illustration */}
            <View style={styles.targetContainer}>
              <View style={styles.target}>
                <View style={styles.targetRing} />
                <View style={styles.targetCenter} />
                <View style={styles.arrow} />
              </View>
            </View>
          </LinearGradient>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appSection: {
    flex: 1,
  },
  headerTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.surface,
    marginBottom: spacing.xs,
  },
  appName: {
    fontSize: fonts.sizes.title,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.surface,
    marginBottom: spacing.lg,
  },
  qrContainer: {
    alignItems: 'flex-start',
  },
  qrCode: {
    width: 80,
    height: 80,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrPattern: {
    width: 60,
    height: 60,
    backgroundColor: colors.dark,
    borderRadius: borderRadius.xs,
  },
  phoneContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  phone: {
    width: 120,
    height: 200,
    backgroundColor: colors.darker,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: fonts.sizes.xl,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  topUsersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.xl,
  },
  topUserContainer: {
    alignItems: 'center',
    flex: 1,
  },
  medal: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.round,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    borderWidth: 4,
    borderColor: colors.secondary,
  },
  firstPlace: {
    borderColor: '#FFD700',
    backgroundColor: '#FFD700',
  },
  medalIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  topUserName: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  topUserPoints: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    textAlign: 'center',
  },
  rankingContainer: {
    marginBottom: spacing.lg,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
    ...shadows.small,
  },
  positionBadge: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  positionText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.surface,
  },
  rankingName: {
    flex: 1,
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
  },
  rankingPoints: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  objectivesSection: {
    marginTop: spacing.lg,
  },
  objectivesHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  objectivesContent: {
    flex: 1,
  },
  objectivesTitle: {
    fontSize: fonts.sizes.title,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.surface,
    lineHeight: fonts.sizes.title + 4,
  },
  objectivesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  objectiveItem: {
    width: 50,
    height: 50,
    marginBottom: spacing.sm,
  },
  objectiveIcon: {
    width: 50,
    height: 50,
    backgroundColor: colors.dark,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  target: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  targetRing: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.round,
    borderWidth: 8,
    borderColor: colors.surface,
    position: 'absolute',
  },
  targetCenter: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.surface,
  },
  arrow: {
    position: 'absolute',
    right: -10,
    width: 40,
    height: 4,
    backgroundColor: '#FF6B35',
    transform: [{ rotate: '45deg' }],
  },
  loginButton: {
    position: 'absolute',
    top: spacing.xxl + spacing.md,
    right: spacing.lg,
    width: 50,
    height: 50,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    ...shadows.medium,
  },
});