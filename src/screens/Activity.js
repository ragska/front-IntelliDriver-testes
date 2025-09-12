import React, {useState, useEffect } from "react";
import { SectionList, Text, View } from "react-native";
import { StyleSheet } from 'react-native';
import NavBar from "../components/Navbar";
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons } from '@expo/vector-icons';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
};


export default function App() {

    const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        //http://192.168.0.10:3000/atividades (ip da rede local)
        //http://localhost:3000/atividades (localhost)
        //const res = await fetch("http://192.168.0.10:3000/atividades");
        const res = await fetch("http://localhost:3000/atividades");
        const data = await res.json();

        setAtividades(Array.isArray(data) ? data : data.atividades);
      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAtividades();
  }, []);

  const iconColor = (iconName) => {
    if (iconName === "trophy") return "#CDA34F"; // dourado
    if (iconName === "plus-circle") return "#2E7D32"; // verde ganho
    if (iconName === "x-circle") return "#C62828"; // vermelho perda
    if (iconName === "flame") return "#F57C00"; // corrida
    if (iconName === "pulse") return "#1565C0"; // caminhada
    if (iconName === "zap") return "#6A1B9A"; // ciclismo
    return "#37474F"; // padrão
  };


  return (
    <LinearGradient
      colors={['#fff', '#c8f7c5']}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Atividade</Text>

        {loading ? (
          <Text>Carregando atividades...</Text>
        ) : (

          <SectionList
            sections={atividades}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section }) => (
              <Text style={styles.header}>{formatDate(section.date)}</Text>
            )}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Octicons name={item.icon || "dot-fill" } size={40} color={iconColor(item.icon)} style={styles.icon} />
                <Text>{item.nome}</Text>
              </View>
            )}
          />

        )}

        <NavBar />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 35, marginVertical: 20 , fontWeight: 'bold'},
  header: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  icon: {
     backgroundColor: '#ffffff4f',
     margin : 5,
     padding: 5,
     borderRadius: 8,
     width: 50,
     textAlign: 'center',
     height: 50,
     textAlignVertical: 'center'
  },

});

