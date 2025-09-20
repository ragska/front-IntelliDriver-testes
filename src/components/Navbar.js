import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';

export default function NavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Historico')}>
        <Octicons style={styles.item} size={28} name="history"/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Home')}>
        <Octicons style={styles.item} size={28} name="home"/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Activity')}>
        <Octicons style={styles.item} size={28} name="bell"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing.xl,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    ...shadows.large,
  },
  item: {   
    color: colors.primary
  },
  iconWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  activeCircle: {
    backgroundColor: colors.secondary,
    padding: spacing.md,
    borderRadius: borderRadius.round,
    marginTop: -spacing.lg,
    ...shadows.medium,
  },
});