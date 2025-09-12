import { StyleSheet, Text, View, SectionList, Image } from 'react-native';
import NavBar from '../components/Navbar';
import Calendario from '../components/Calendario';

const percursos = [
  {
    title: '12/09/2025',
    data: [
      { id: '1', nome: 'Casa → Trabalho', img: 'https://picsum.photos/200/200?20' },
      { id: '2', nome: 'Trabalho → Supermercado', img: 'https://picsum.photos/200/200?21' },
    ],
  },
  {
    title: '11/09/2025',
    data: [
      { id: '3', nome: 'Casa → Academia', img: 'https://picsum.photos/200/200?22' },
      { id: '4', nome: 'Academia → Shopping', img: 'https://picsum.photos/200/200?23' },
    ],
  },
  {
    title: '10/09/2025',
    data: [
      { id: '5', nome: 'Casa → Escola', img: 'https://picsum.photos/200/200?24' },
      { id: '6', nome: 'Escola → Centro da Cidade', img: 'https://picsum.photos/200/200?25' },
    ],
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>
      <Calendario onDayPress={(day) => console.log(day)} />

      <SectionList
        sections={percursos}
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
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 35, marginVertical: 20 , fontWeight: 'bold'},
  header: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  img: { width: 50, height: 50, marginRight: 10, borderRadius: 8 },
});