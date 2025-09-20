import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackButton from '../components/BackButton';

export default function PercursoDetalhes() {
  const navigation = useNavigation();
  const route = useRoute();
  const { percurso } = route.params;

  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const DetailRow = ({ label, value, style }) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, style]}>{value || 'N/A'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <BackButton />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header com imagem e título */}
        <View style={styles.header}>
          <Image source={{ uri: percurso.img }} style={styles.headerImage} />
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{percurso.nome}</Text>
            <Text style={styles.date}>{formatDisplayDate(percurso.selectedDate)}</Text>
            <Text style={styles.time}>{percurso.horario}</Text>
          </View>
        </View>

        {/* Informações principais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações da Viagem</Text>
          
          <DetailRow label="Distância" value={percurso.distancia} />
          <DetailRow label="Duração" value={percurso.duracao} />
          <DetailRow label="Velocidade Média" value={percurso.velocidadeMedia} />
          <DetailRow label="Combustível Gasto" value={percurso.combustivel} />
          <DetailRow 
            label="Custo Estimado" 
            value={percurso.custo} 
            style={styles.costValue} 
          />
        </View>

        {/* Rota */}
        {percurso.rota && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rota Utilizada</Text>
            <Text style={styles.routeText}>{percurso.rota}</Text>
          </View>
        )}

        {/* Observações */}
        {percurso.observacoes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Observações</Text>
            <Text style={styles.observationText}>{percurso.observacoes}</Text>
          </View>
        )}

        {/* Estatísticas adicionais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{percurso.distancia?.replace(' km', '') || '0'}</Text>
              <Text style={styles.statLabel}>Quilômetros</Text>
            </View>
            
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{percurso.duracao?.replace(' min', '') || '0'}</Text>
              <Text style={styles.statLabel}>Minutos</Text>
            </View>
            
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{percurso.combustivel?.replace('L', '') || '0'}</Text>
              <Text style={styles.statLabel}>Litros</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9F7',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: 'rgba(42, 60, 26, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A3C1A',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#7F9170',
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#51663E',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: 'rgba(42, 60, 26, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2A3C1A',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#2A3C1A',
    fontWeight: '600',
  },
  costValue: {
    color: '#7F9170',
    fontSize: 16,
  },
  routeText: {
    fontSize: 14,
    color: '#51663E',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  observationText: {
    fontSize: 14,
    color: '#7F9170',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7F9170',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});