import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import BackButton from '../components/BackButton';
import { Checkbox } from 'react-native-paper';

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
        placeholderTextColor="#A0A0A0"
      />

      <Text style={styles.inputText}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
      />

      <View style={styles.optionsRow}>
        <Checkbox
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={() => setIsChecked(!isChecked)}
          color="#00C853"
        />
        <Text style={styles.subtitle}>Lembrar senha</Text>
        <Text style={styles.forgot}>Esqueci minha senha</Text>
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
        <TouchableOpacity>
          <Image
            source={require('../assets/Google.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
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
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#33373dff',
    marginTop: 50,
  },
  subtitle: {
    fontSize: 13,
    color: '#3d3d3dff',
    marginBottom: 25,
  },
  inputText: {
    fontSize: 11,
    color: '#2C2C2C',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#e1e4ecff',
    borderRadius: 5,
    padding: 20,
    fontSize: 13,
    marginBottom: 20,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  forgot: {
    fontSize: 13,
    color: '#4CAF50',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#00C853',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flex: 1,
    borderColor: '#00C853',
    borderWidth: 1.5,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  secondaryButtonText: {
    color: '#00C853',
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#a5a5a5ff',
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 13,
    color: '#6F6F6F',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#ebebebff',
    borderColor: '#ebebebff',
    borderWidth: 1,
    padding: 35,
  },
});
