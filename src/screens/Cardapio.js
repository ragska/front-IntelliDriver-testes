import { StyleSheet, Text, View, SectionList, Image } from 'react-native';

const menu = [
  {
    title: 'Entradas',
    data: [
      { id: '1', nome: 'Salada', img: 'https://picsum.photos/200/200?10' },
      { id: '2', nome: 'Sopa', img: 'https://picsum.photos/200/200?11' },
    ],
  },
  {
    title: 'Pratos Principais',
    data: [
      { id: '3', nome: 'Lasanha', img: 'https://picsum.photos/200/200?12' },
      { id: '4', nome: 'Frango Grelhado', img: 'https://picsum.photos/200/200?13' },
    ],
  },
  {
    title: 'Sobremesas',
    data: [
      { id: '5', nome: 'Sorvete', img: 'https://picsum.photos/200/200?14' },
      { id: '6', nome: 'Bolo de Chocolate', img: 'https://picsum.photos/200/200?15' },
    ],
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cardápio</Text>
      <SectionList
        sections={menu}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
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
  title: { fontSize: 22, marginBottom: 15 },
  header: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  img: { width: 50, height: 50, marginRight: 10, borderRadius: 8 },
});