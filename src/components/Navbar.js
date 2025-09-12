import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';

export default function NavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Cardapio')}>
        <Octicons style={styles.item} size={30} name="history"/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Home')}>
        <Octicons style={styles.item} size={30} name="home"/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Activity')}>
        <Octicons style={styles.item} size={30} name="bell"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 12,
    marginBottom: 40,
    backgroundColor: '#fff',
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
  },
  item: {   
    color: '#22d156ff'
  },
  iconWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: '#6bbf59',
    padding: 12,
    borderRadius: 50,
    marginTop: -24,
    elevation: 4,
  },
});