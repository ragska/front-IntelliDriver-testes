// Dados dos percursos organizados por data
export const percursosData = {
  '2025-09-20': [
    { 
      id: '1', 
      nome: 'Casa → Trabalho', 
      img: 'https://picsum.photos/200/200?20', 
      horario: '08:30', 
      distancia: '12.5 km',
      duracao: '25 min',
      velocidadeMedia: '30 km/h',
      combustivel: '1.2L',
      custo: 'R$ 6,50',
      rota: 'Av. Principal → Rua das Flores → Centro',
      observacoes: 'Trânsito moderado no horário de pico',
      ecoCoins: 45
    },
    { 
      id: '2', 
      nome: 'Trabalho → Academia', 
      img: 'https://picsum.photos/200/200?21', 
      horario: '18:45', 
      distancia: '3.2 km',
      duracao: '8 min',
      velocidadeMedia: '24 km/h',
      combustivel: '0.3L',
      custo: 'R$ 1,65',
      rota: 'Centro → Av. Esportiva',
      observacoes: 'Caminho sem trânsito',
      ecoCoins: 28
    },
    { 
      id: '3', 
      nome: 'Academia → Casa', 
      img: 'https://picsum.photos/200/200?22', 
      horario: '20:15', 
      distancia: '15.1 km',
      duracao: '32 min',
      velocidadeMedia: '28 km/h',
      combustivel: '1.4L',
      custo: 'R$ 7,35',
      rota: 'Av. Esportiva → Rodovia → Av. Principal',
      observacoes: 'Trânsito leve no retorno',
      ecoCoins: 52
    },
  ],
  '2025-09-19': [
    { 
      id: '4', 
      nome: 'Casa → Shopping', 
      img: 'https://picsum.photos/200/200?23', 
      horario: '14:20', 
      distancia: '8.7 km',
      duracao: '18 min',
      velocidadeMedia: '29 km/h',
      combustivel: '0.8L',
      custo: 'R$ 4,20',
      rota: 'Av. Principal → Shopping Center',
      observacoes: 'Trânsito fluindo bem',
      ecoCoins: 38
    },
    { 
      id: '5', 
      nome: 'Shopping → Supermercado', 
      img: 'https://picsum.photos/200/200?24', 
      horario: '16:30', 
      distancia: '2.1 km',
      duracao: '6 min',
      velocidadeMedia: '21 km/h',
      combustivel: '0.2L',
      custo: 'R$ 1,05',
      rota: 'Via comercial direta',
      observacoes: 'Percurso rápido',
      ecoCoins: 22
    },
    { 
      id: '6', 
      nome: 'Supermercado → Casa', 
      img: 'https://picsum.photos/200/200?25', 
      horario: '17:45', 
      distancia: '9.3 km',
      duracao: '22 min',
      velocidadeMedia: '25 km/h',
      combustivel: '0.9L',
      custo: 'R$ 4,70',
      rota: 'Via residencial → Av. Principal',
      observacoes: 'Trânsito intenso no fim de tarde',
      ecoCoins: -15
    },
  ],
  '2025-09-18': [
    { id: '7', nome: 'Casa → Escola', img: 'https://picsum.photos/200/200?26', horario: '07:15', distancia: '6.8 km', ecoCoins: 31 },
    { id: '8', nome: 'Escola → Biblioteca', img: 'https://picsum.photos/200/200?27', horario: '16:00', distancia: '1.5 km', ecoCoins: 18 },
    { id: '9', nome: 'Biblioteca → Casa', img: 'https://picsum.photos/200/200?28', horario: '18:30', distancia: '7.9 km', ecoCoins: 35 },
  ],
  '2025-09-17': [
    { id: '10', nome: 'Casa → Hospital', img: 'https://picsum.photos/200/200?29', horario: '09:00', distancia: '11.2 km', ecoCoins: 48 },
    { id: '11', nome: 'Hospital → Farmácia', img: 'https://picsum.photos/200/200?30', horario: '11:30', distancia: '0.8 km', ecoCoins: 12 },
    { id: '12', nome: 'Farmácia → Casa', img: 'https://picsum.photos/200/200?31', horario: '12:15', distancia: '11.7 km', ecoCoins: 50 },
  ],
  '2025-09-16': [
    { id: '13', nome: 'Casa → Centro da Cidade', img: 'https://picsum.photos/200/200?32', horario: '10:45', distancia: '18.3 km', ecoCoins: -8 },
    { id: '14', nome: 'Centro → Banco', img: 'https://picsum.photos/200/200?33', horario: '14:20', distancia: '0.5 km', ecoCoins: 8 },
    { id: '15', nome: 'Banco → Restaurante', img: 'https://picsum.photos/200/200?34', horario: '15:30', distancia: '1.2 km', ecoCoins: -3 },
    { id: '16', nome: 'Restaurante → Casa', img: 'https://picsum.photos/200/200?35', horario: '19:00', distancia: '17.8 km', ecoCoins: 62 },
  ],
  '2025-09-15': [
    { id: '17', nome: 'Casa → Parque', img: 'https://picsum.photos/200/200?36', horario: '06:30', distancia: '4.2 km', ecoCoins: 26 },
    { id: '18', nome: 'Parque → Padaria', img: 'https://picsum.photos/200/200?37', horario: '08:15', distancia: '1.8 km', ecoCoins: 20 },
    { id: '19', nome: 'Padaria → Casa', img: 'https://picsum.photos/200/200?38', horario: '09:00', distancia: '5.1 km', ecoCoins: 28 },
  ],
  '2025-09-14': [
    { id: '20', nome: 'Casa → Aeroporto', img: 'https://picsum.photos/200/200?39', horario: '05:30', distancia: '35.2 km' },
    { id: '21', nome: 'Aeroporto → Hotel', img: 'https://picsum.photos/200/200?40', horario: '22:45', distancia: '12.1 km' },
  ],
  '2025-09-13': [
    { id: '22', nome: 'Casa → Clínica Veterinária', img: 'https://picsum.photos/200/200?41', horario: '10:00', distancia: '7.5 km' },
    { id: '23', nome: 'Clínica → Pet Shop', img: 'https://picsum.photos/200/200?42', horario: '11:30', distancia: '2.3 km' },
    { id: '24', nome: 'Pet Shop → Casa', img: 'https://picsum.photos/200/200?43', horario: '12:45', distancia: '8.9 km' },
  ],
  '2025-09-12': [
    { id: '25', nome: 'Casa → Trabalho', img: 'https://picsum.photos/200/200?44', horario: '08:30', distancia: '12.5 km' },
    { id: '26', nome: 'Trabalho → Supermercado', img: 'https://picsum.photos/200/200?45', horario: '18:30', distancia: '5.7 km' },
    { id: '27', nome: 'Supermercado → Casa', img: 'https://picsum.photos/200/200?46', horario: '19:45', distancia: '14.2 km' },
  ],
  '2025-09-11': [
    { id: '28', nome: 'Casa → Academia', img: 'https://picsum.photos/200/200?47', horario: '06:00', distancia: '3.2 km' },
    { id: '29', nome: 'Academia → Trabalho', img: 'https://picsum.photos/200/200?48', horario: '07:30', distancia: '9.8 km' },
    { id: '30', nome: 'Trabalho → Casa', img: 'https://picsum.photos/200/200?49', horario: '17:30', distancia: '12.5 km' },
  ],
  '2025-09-10': [
    { id: '31', nome: 'Casa → Escola', img: 'https://picsum.photos/200/200?50', horario: '07:15', distancia: '6.8 km' },
    { id: '32', nome: 'Escola → Centro da Cidade', img: 'https://picsum.photos/200/200?51', horario: '16:00', distancia: '11.5 km' },
    { id: '33', nome: 'Centro → Casa', img: 'https://picsum.photos/200/200?52', horario: '18:30', distancia: '18.3 km' },
  ],
};

// Função helper para obter percursos de uma data específica
export const getPercursosByDate = (dateString) => {
  return percursosData[dateString] || [];
};

// Função helper para formatar data para string
export const formatDateToString = (date) => {
  if (!date) return null;
  
  if (typeof date === 'string') {
    return date;
  }
  
  // Se for um objeto de data do calendário
  if (date.dateString) {
    return date.dateString;
  }
  
  // Se for um objeto Date
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  
  return null;
};

// Função helper para obter data de hoje
export const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};