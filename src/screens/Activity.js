import React, {useState, useEffect } from "react";
import { SectionList, Text, View } from "react-native";
import { StyleSheet } from 'react-native';
import NavBar from "../components/Navbar";
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons } from '@expo/vector-icons';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';

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
        const res = await fetch("http://localhost:3000/atividades");
        const data = await res.json();

        // Os dados já vêm no formato correto para SectionList
        setAtividades(data);
        console.log("Atividades carregadas:", data);
      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
        // Dados de fallback para teste
        setAtividades([
          {
            date: "2024-06-01",
            data: [
              { id: "1", nome: "Corrida - 5km", icon: "flame" },
              { id: "2", nome: "Caminhada - 2km", icon: "pulse" }
            ]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAtividades();
  }, []);

  const iconColor = (iconName) => {
    if (iconName === "trophy") return "#CDA34F"; // dourado
    if (iconName === "plus-circle") return colors.success; // verde ganho
    if (iconName === "x-circle") return colors.error; // vermelho perda
    if (iconName === "flame") return "#F57C00"; // corrida
    if (iconName === "pulse") return "#1565C0"; // caminhada
    if (iconName === "zap") return "#6A1B9A"; // ciclismo
    if (iconName === "checklist") return colors.primary; // desafios
    return colors.text.secondary; // padrão
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.secondary]}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Atividades</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando atividades...</Text>
          </View>
        ) : (
          <SectionList
            sections={atividades}
            keyExtractor={(item) => item.id}
            renderSectionHeader={({ section }) => (
              <Text style={styles.header}>{formatDate(section.date)}</Text>
            )}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={[styles.iconContainer, { backgroundColor: iconColor(item.icon) + '20' }]}>
                  <Octicons 
                    name={item.icon || "dot-fill"} 
                    size={24} 
                    color={iconColor(item.icon)} 
                  />
                </View>
                <Text style={styles.itemText}>{item.nome}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            stickySectionHeadersEnabled={false}
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
  container: { 
    flex: 1, 
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl + spacing.md,
  },
  title: { 
    fontSize: fonts.sizes.title,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginVertical: spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  header: { 
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.secondary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.surface,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
    ...shadows.small,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  itemText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.primary,
    flex: 1,
  },
  listContent: {
    paddingBottom: 120,
  },
});

