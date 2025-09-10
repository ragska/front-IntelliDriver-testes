import React from "react";
import { SectionList, Text, View } from "react-native";
import { StyleSheet, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atividade</Text>
      <SectionList
        sections={percussos}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.date}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.img }} style={styles.img} />
            <Text>{item.nome}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 30, marginBottom: 15 , fontWeight: 'bold'},
  header: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  img: { width: 50, height: 50, marginRight: 10, borderRadius: 8 },
});

const percussos = [
    {
        date: '2024-06-01',
        data: [
            { id: '1', nome: 'Corrida - 5km', img: 'https://picsum.photos/200/200?10' },
            { id: '2', nome: 'Caminhada - 2km', img: 'https://picsum.photos/200/200?11' },
            { id: '3', nome: 'Ciclismo - 10km', img: 'https://picsum.photos/200/200?12' },
        ],
    },
    {
        date: '2024-06-02',
        data: [
            { id: '4', nome: 'Corrida - 3km', img: 'https://picsum.photos/200/200?13' },
            { id: '5', nome: 'Caminhada - 4km', img: 'https://picsum.photos/200/200?14' },
        ],
    },
    {
        date: '2024-06-03',
        data: [
            { id: '6', nome: 'Corrida - 8km', img: 'https://picsum.photos/200/200?15' },
            { id: '7', nome: 'Caminhada - 5km', img: 'https://picsum.photos/200/200?16' },
            { id: '8', nome: 'Ciclismo - 12km', img: 'https://picsum.photos/200/200?17' },
        ],
    },
    {
        date: '2024-06-04',
        data: [
            { id: '9', nome: 'Corrida - 6km', img: 'https://picsum.photos/200/200?18' },
        ],
    },
];