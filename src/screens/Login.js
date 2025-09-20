import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import BackButton from '../components/BackButton';
import { Checkbox } from 'react-native-paper';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const validUsername = 'rafa';
    const validPassword = '1234';

    if (username === validUsername && password === validPassword) {
      alert('Login bem-sucedido!');
    } else {
      alert('Usuário ou senha inválidos.');
    }
  };

  const[isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>

      <BackButton />
      
      <Text style={styles.title}>Acesse</Text>
      <Text style={styles.subtitle}>com E-mail e senha</Text>

      <Text style={styles.inputText}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Digite seu E-mail"
        placeholderTextColor={colors.text.placeholder}
      />

      <Text style={styles.inputText}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        placeholderTextColor={colors.text.placeholder}
        secureTextEntry
      />

      <View style={styles.optionsRow}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsChecked(!isChecked)}
            color={colors.primary}
          />
          <Text style={styles.checkboxText}>Lembrar senha</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>Ou continue com</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../assets/Google.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../assets/Facebook.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  title: {
    fontSize: fonts.sizes.hero,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginTop: spacing.xxl + spacing.md,
  },
  subtitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  inputText: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Montserrat', 'Medium'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    padding: spacing.lg,
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.accent,
    ...shadows.small,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkboxText: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  forgot: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.primary,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.medium,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
  },
  secondaryButton: {
    flex: 1,
    borderColor: colors.primary,
    borderWidth: 2,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.accent,
  },
  separatorText: {
    marginHorizontal: spacing.md,
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Montserrat', 'Regular'),
    color: colors.text.light,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderColor: colors.accent,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },
  socialIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
