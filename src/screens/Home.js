import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import casual_dog from '../assets/casual_dog.png'; 
import Google from '../assets/Google.png';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={casual_dog}
        style={styles.casualDogImage}
      />

      <Text style={styles.title}>Ótimo dia!</Text>

      <Text style={styles.subtitle}>Como deseja acessar?</Text>

      <TouchableOpacity style={styles.tamanhoTelaButton}>
        <Image
          source={Google}
          style={styles.buttonImage}
        />
        <Text style={styles.buttonText}>Como deseja acessar?</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.outlineButton}
        onPress={() => navigation.navigate('Activity') }
      >
        <Text style={styles.outlineButtonText}>Atividade</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.outlineButton}
        onPress={() => navigation.navigate('Cardapio') }
      >
        <Text style={styles.outlineButtonText}>Restaurante</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },

  casualDogImage: {
    width: 300,
    height: 250,
    marginBottom: 20,
  },

  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 12,
    marginBottom: 60,
  },

  tamanhoTelaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    width: '100%', 
    marginBottom: 10,
  },

  buttonImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  outlineButton: {
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    width: '100%', 
    alignItems: 'center',
  },

  outlineButtonText: {
    color: 'green',
    fontSize: 12,
    fontWeight: 'bold',
  },
});