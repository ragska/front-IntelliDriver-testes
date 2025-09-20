import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/Navbar';
import Calendario from '../components/Calendario';
import { getPercursosByDate, formatDateToString, getTodayString } from '../data/percursosData';

export default function Historico() {
  const navigation = useNavigation();
  const [isWeeklyView, setIsWeeklyView] = useState(true); // Inicia com visualização semanal
  const [selectedDate, setSelectedDate] = useState(getTodayString()); // Data selecionada (hoje por padrão)
  const [percursos, setPercursos] = useState(getPercursosByDate(getTodayString())); // Percursos da data selecionada

  const handleDayPress = (day) => {
    const dateString = formatDateToString(day);
    if (dateString) {
      setSelectedDate(dateString);
      setPercursos(getPercursosByDate(dateString));
      console.log('Data selecionada:', dateString);
    }
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'Selecione uma data';
    
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleItemPress = (item) => {
    navigation.navigate('PercursoDetalhes', { 
      percurso: { ...item, selectedDate } 
    });
  };

  const renderPercursoItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
      <Image source={{ uri: item.img }} style={styles.img} />
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{item.nome}</Text>
        <View style={styles.itemDetails}>
          <Text style={styles.itemTime}>{item.horario}</Text>
          <Text style={styles.itemDistance}>{item.distancia}</Text>
        </View>
        <View style={styles.viewMoreContainer}>
          <Text style={styles.viewMoreText}>Toque para ver detalhes ›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const ListHeaderComponent = () => (
    <View style={styles.listHeader}>
      {!isWeeklyView && (
        <View style={styles.calendarInHeader}>
          <Calendario 
            onDayPress={handleDayPress}
            isWeeklyView={isWeeklyView}
            selectedDate={selectedDate}
          />
        </View>
      )}
      <View style={styles.divider} />
      {percursos.length === 0 && (
        <Text style={styles.noDataText}>
          Nenhum percurso encontrado para esta data
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>
      
      {/* Botões alternadores */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, styles.leftButton, isWeeklyView && styles.activeButton]}
          onPress={() => setIsWeeklyView(true)}
        >
          <Text style={[styles.toggleText, isWeeklyView && styles.activeText]}>Semanal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, styles.rightButton, !isWeeklyView && styles.activeButton]}
          onPress={() => setIsWeeklyView(false)}
        >
          <Text style={[styles.toggleText, !isWeeklyView && styles.activeText]}>Mensal</Text>
        </TouchableOpacity>
      </View>

      {/* Calendário fixo apenas para visualização semanal */}
      {isWeeklyView && (
        <View style={styles.calendarContainer}>
          <Calendario 
            onDayPress={handleDayPress}
            isWeeklyView={isWeeklyView}
            selectedDate={selectedDate}
          />
        </View>
      )}

      <FlatList
        data={percursos}
        keyExtractor={(item) => item.id}
        renderItem={renderPercursoItem}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        style={styles.flatList}
      />
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9F7',
    paddingHorizontal: 24,
    paddingTop: 64,
  },
  title: { 
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2A3C1A',
    marginBottom: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 4,
    marginBottom: 8,
    shadowColor: 'rgba(42, 60, 26, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButton: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  rightButton: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  activeButton: {
    backgroundColor: '#7F9170',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#51663E',
  },
  activeText: {
    color: '#FFFFFF',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 6,
    marginBottom: 16,
    shadowColor: 'rgba(42, 60, 26, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: { 
    fontSize: 16,
    fontWeight: '600',
    color: '#51663E',
    marginTop: 24,
    marginBottom: 16,
  },
  flatList: {
    flex: 1,
  },
  listHeader: {
    paddingVertical: 8,
  },
  calendarInHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 6,
    marginBottom: 16,
    shadowColor: 'rgba(42, 60, 26, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A3C1A',
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  noDataText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: 'rgba(42, 60, 26, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  img: { 
    width: 50, 
    height: 50, 
    marginRight: 16, 
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2A3C1A',
    marginBottom: 4,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTime: {
    fontSize: 12,
    color: '#7F9170',
    fontWeight: '500',
  },
  itemDistance: {
    fontSize: 12,
    color: '#666',
  },
  viewMoreContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  viewMoreText: {
    fontSize: 11,
    color: '#7F9170',
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 120,
  },
});