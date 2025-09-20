import React, { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { percursosData } from '../data/percursosData';
import { colors } from '../constants/theme';

// Configuração de localização para português
LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

export default function Calendario({ onDayPress, isWeeklyView = false, selectedDate = null }) {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

  function getCurrentWeek() {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    
    // Ajustar para segunda-feira ser o primeiro dia (currentDay === 0 significa domingo)
    const daysToSubtract = currentDay === 0 ? 6 : currentDay - 1;
    startOfWeek.setDate(today.getDate() - daysToSubtract);

    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  }

  function goToPreviousWeek() {
    const newWeek = currentWeek.map(day => {
      const newDay = new Date(day);
      newDay.setDate(day.getDate() - 7);
      return newDay;
    });
    setCurrentWeek(newWeek);
  }

  function goToNextWeek() {
    const newWeek = currentWeek.map(day => {
      const newDay = new Date(day);
      newDay.setDate(day.getDate() + 7);
      return newDay;
    });
    setCurrentWeek(newWeek);
  }

  function formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  function isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  function isSelected(date) {
    if (!selectedDate) return false;
    return formatDate(date) === selectedDate;
  }

  function hasPercursos(date) {
    const dateString = formatDate(date);
    return percursosData[dateString] && percursosData[dateString].length > 0;
  }

  const dayNames = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];

  const handleDayPress = (date) => {
    console.log('Day pressed:', formatDate(date));
    if (onDayPress && typeof onDayPress === 'function') {
      onDayPress({
        dateString: formatDate(date),
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    }
  };

  if (isWeeklyView) {
    return (
      <View style={weekStyles.container}>
        {/* Header com navegação */}
        <View style={weekStyles.header}>
          <TouchableOpacity onPress={goToPreviousWeek} style={weekStyles.navButton}>
            <Text style={weekStyles.navButtonText}>‹</Text>
          </TouchableOpacity>
          
          <Text style={weekStyles.monthYear}>
            {currentWeek[0].toLocaleDateString('pt-BR', { 
              month: 'long', 
              year: 'numeric' 
            }).replace(' de ', ' de ')}
          </Text>
          
          <TouchableOpacity onPress={goToNextWeek} style={weekStyles.navButton}>
            <Text style={weekStyles.navButtonText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Dias da semana */}
        <View style={weekStyles.weekContainer}>
          {currentWeek.map((date, index) => {
            const isTodayDate = isToday(date);
            const isSelectedDate = isSelected(date);
            const isTodayAndSelected = isTodayDate && isSelectedDate;
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  weekStyles.dayContainer,
                  isTodayDate && !isSelectedDate && weekStyles.todayContainer,
                  isSelectedDate && !isTodayDate && weekStyles.selectedContainer,
                  isTodayAndSelected && weekStyles.todaySelectedContainer
                ]}
                onPress={() => handleDayPress(date)}
              >
                <Text style={[
                  weekStyles.dayName,
                  (isTodayDate || isSelectedDate) && weekStyles.highlightText
                ]}>
                  {dayNames[index]}
                </Text>
                <Text style={[
                  weekStyles.dayNumber,
                  (isTodayDate || isSelectedDate) && weekStyles.highlightText
                ]}>
                  {date.getDate()}
                </Text>
                {hasPercursos(date) && (
                  <View style={weekStyles.dotIndicator} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  // Visualização mensal (calendário completo)
  try {
    const calendarTheme = {
      backgroundColor: colors.surface,
      calendarBackground: colors.surface,
      textSectionTitleColor: colors.primary,
      selectedDayBackgroundColor: colors.secondary,
      selectedDayTextColor: colors.darker,
      todayBackgroundColor: colors.primary,
      todayTextColor: colors.surface,
      dayTextColor: colors.text.primary,
      arrowColor: colors.primary,
      monthTextColor: colors.text.primary,
      indicatorColor: colors.primary,
      dotColor: colors.accent,
      selectedDotColor: colors.darker,
      textDayFontSize: 14,
      textMonthFontSize: 13,
      textDayHeaderFontSize: 12,
    };

    // Criar markedDates dinâmico com a data selecionada e dias com percursos
    const markedDates = {};
    const today = new Date().toISOString().split('T')[0];
    
    // Marcar data selecionada
    if (selectedDate) {
      if (selectedDate === today) {
        // Se o dia selecionado é hoje, usar estilo personalizado com borda do dia atual e fundo de selecionado
        markedDates[selectedDate] = { 
          customStyles: {
            container: {
              backgroundColor: colors.secondary, // Fundo verde claro (selecionado)
              borderWidth: 2,
              borderColor: colors.primary, // Borda verde principal (dia atual)
              borderRadius: 16,
            },
            text: {
              color: colors.darker,
              fontWeight: 'bold',
            },
          }
        };
      } else {
        markedDates[selectedDate] = { 
          customStyles: {
            container: {
              backgroundColor: colors.secondary,
              borderRadius: 16,
            },
            text: {
              color: colors.darker,
              fontWeight: 'bold',
            },
          }
        };
      }
    } else if (today) {
      // Se hoje não está selecionado, mostrar apenas como dia atual
      markedDates[today] = {
        customStyles: {
          container: {
            backgroundColor: colors.primary,
            borderRadius: 16,
          },
          text: {
            color: colors.surface,
            fontWeight: 'bold',
          },
        }
      };
    }
    
    // Marcar dias com percursos
    Object.keys(percursosData).forEach(dateString => {
      if (percursosData[dateString] && percursosData[dateString].length > 0) {
        if (markedDates[dateString]) {
          // Se já está marcado, manter o estilo existente e adicionar indicador
          markedDates[dateString].marked = true;
          markedDates[dateString].dotColor = colors.accent;
        } else {
          // Apenas marcar com dot
          markedDates[dateString] = { 
            marked: true,
            dotColor: colors.accent,
            customStyles: {
              container: {},
              text: {
                color: colors.text.primary,
              },
            }
          };
        }
      }
    });

    return (
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        markingType="custom"
        theme={calendarTheme}
        firstDay={1}
      />
    );
  } catch (error) {
    console.error('Erro no componente Calendario:', error);
    return (
      <View style={{ padding: 20, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
        <Text style={{ textAlign: 'center', color: '#666' }}>
          Erro ao carregar calendário
        </Text>
      </View>
    );
  }
}

const weekStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0',
  },
  navButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
  navButtonText: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
  monthYear: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.text.secondary,
    textTransform: 'none',
  },
  weekContainer: {
    flexDirection: 'row',
    padding: 2,
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 3,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  todayContainer: {
    backgroundColor: colors.primary,
  },
  selectedContainer: {
    backgroundColor: colors.secondary,
  },
  todaySelectedContainer: {
    backgroundColor: colors.secondary, // Fundo de selecionado
    borderWidth: 2,
    borderColor: colors.primary,       // Borda do dia atual
  },
  dayName: {
    fontSize: 10,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  highlightText: {
    color: colors.surface,
  },
  dotIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginTop: 2,
  },
  selectedText: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
});