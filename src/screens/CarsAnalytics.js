import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/Navbar';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';

export default function CarsAnalytics({ navigation }) {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bluetoothConnected, setBluetoothConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  // Dados mock focados em manutenção e diagnóstico
  const mockData = {
    // Status geral do veículo
    vehicleHealth: {
      overallStatus: 'WARNING', // OK, WARNING, CRITICAL
      healthScore: 72,
      lastMaintenance: '15/08/2024',
      nextMaintenance: '15/10/2024',
      mileage: 45820
    },
    
    // Alertas de manutenção urgentes
    maintenanceAlerts: [
      {
        id: 1,
        type: 'oil_change',
        priority: 'high',
        title: 'Troca de Óleo Vencida',
        description: 'Última troca há 8.000 km. Recomendado a cada 5.000 km.',
        daysOverdue: 15,
        estimatedCost: 120,
        urgency: 'urgent'
      },
      {
        id: 2,
        type: 'brake_pads',
        priority: 'medium',
        title: 'Pastilhas de Freio',
        description: 'Desgaste detectado. Substituir em até 2.000 km.',
        remainingKm: 1800,
        estimatedCost: 250,
        urgency: 'moderate'
      },
      {
        id: 3,
        type: 'air_filter',
        priority: 'low',
        title: 'Filtro de Ar Sujo',
        description: 'Filtro obstruído. Pode afetar performance e consumo.',
        efficiency: 65,
        estimatedCost: 45,
        urgency: 'low'
      },
      {
        id: 4,
        type: 'battery',
        priority: 'high',
        title: 'Bateria Fraca',
        description: 'Voltagem baixa detectada. Risco de falha.',
        voltage: 11.8,
        estimatedCost: 180,
        urgency: 'urgent'
      }
    ],

    // Erros ativos do OBD-II
    activeErrors: [
      {
        code: 'P0171',
        description: 'Sistema muito pobre (Banco 1)',
        severity: 'medium',
        impact: 'Aumento do consumo, possível dano ao catalisador',
        recommendedAction: 'Verificar sensores de oxigênio e injetores',
        estimatedRepairCost: 350,
        detected: '18/09/2024'
      },
      {
        code: 'P0300',
        description: 'Falha aleatória de ignição',
        severity: 'high',
        impact: 'Perda de potência, tremores, danos ao motor',
        recommendedAction: 'Verificar velas, bobinas e cabos de ignição',
        estimatedRepairCost: 280,
        detected: '19/09/2024'
      }
    ],

    // Leituras básicas OBD-II
    basicReadings: {
      engine: {
        rpm: 850, // Marcha lenta
        coolantTemp: 89,
        oilTemp: 95,
        engineLoad: 15
      },
      fuel: {
        level: 75,
        consumption: 8.2,
        pressure: 3.8
      },
      electrical: {
        batteryVoltage: 11.8, // Baixo
        alternatorOutput: 14.2
      },
      emissions: {
        lambdaSensor1: 0.98,
        lambdaSensor2: 1.02,
        catalystTemp: 520
      }
    },

    // Próximas manutenções programadas
    scheduledMaintenance: [
      { item: 'Revisão geral', km: 50000, daysRemaining: 25, cost: 450 },
      { item: 'Troca do filtro de combustível', km: 48000, daysRemaining: 45, cost: 80 },
      { item: 'Alinhamento e balanceamento', km: 46000, daysRemaining: 60, cost: 120 }
    ]
  };

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setAnalyticsData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Função para conectar/desconectar Bluetooth
  const handleBluetoothConnection = async () => {
    if (bluetoothConnected) {
      // Desconectar
      setBluetoothConnected(false);
      return;
    }

    setConnecting(true);
    try {
      // Simular processo de conexão Bluetooth
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBluetoothConnected(true);
    } catch (error) {
      console.error('Erro ao conectar Bluetooth:', error);
    } finally {
      setConnecting(false);
    }
  };

  // Componente para exibir a saúde geral do veículo
  const HealthScoreCard = ({ score, status }) => {
    const getStatusColor = () => {
      if (score >= 80) return colors.success;
      if (score >= 60) return colors.warning;
      return colors.error;
    };

    return (
      <LinearGradient
        colors={[getStatusColor(), getStatusColor() + '80']}
        style={styles.healthCard}
      >
        <View style={styles.healthHeader}>
          <Ionicons name="car-sport" size={32} color={colors.surface} />
          <Text style={styles.healthTitle}>Saúde do Veículo</Text>
        </View>
        <View style={styles.healthScore}>
          <Text style={styles.scoreValue}>{score}</Text>
          <Text style={styles.scoreLabel}>/100</Text>
        </View>
        <Text style={styles.statusText}>
          {status === 'OK' ? 'Excelente' : status === 'WARNING' ? 'Atenção Necessária' : 'Crítico'}
        </Text>
      </LinearGradient>
    );
  };

  // Componente para alertas de manutenção
  const MaintenanceAlert = ({ alert }) => {
    const getPriorityColor = () => {
      switch (alert.priority) {
        case 'high': return colors.error;
        case 'medium': return colors.warning;
        case 'low': return colors.accent;
        default: return colors.text.secondary;
      }
    };

    const getIcon = () => {
      switch (alert.type) {
        case 'oil_change': return 'water';
        case 'brake_pads': return 'hand-left';
        case 'air_filter': return 'leaf';
        case 'battery': return 'battery-charging';
        default: return 'construct';
      }
    };

    return (
      <View style={styles.alertCard}>
        <View style={[styles.alertPriority, { backgroundColor: getPriorityColor() }]} />
        <View style={[styles.alertIcon, { backgroundColor: getPriorityColor() + '20' }]}>
          <Ionicons name={getIcon()} size={24} color={getPriorityColor()} />
        </View>
        <View style={styles.alertContent}>
          <Text style={styles.alertTitle}>{alert.title}</Text>
          <Text style={styles.alertDescription}>{alert.description}</Text>
          <View style={styles.alertFooter}>
            <Text style={styles.alertCost}>Custo: R$ {alert.estimatedCost}</Text>
            {alert.urgency === 'urgent' && (
              <View style={styles.urgentBadge}>
                <Text style={styles.urgentText}>URGENTE</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  // Componente para erros OBD-II
  const ErrorCard = ({ error }) => {
    const getSeverityColor = () => {
      switch (error.severity) {
        case 'high': return colors.error;
        case 'medium': return colors.warning;
        case 'low': return colors.accent;
        default: return colors.text.secondary;
      }
    };

    return (
      <View style={styles.errorCard}>
        <View style={styles.errorHeader}>
          <View style={[styles.errorCodeBadge, { backgroundColor: getSeverityColor() }]}>
            <Text style={styles.errorCodeText}>{error.code}</Text>
          </View>
          <View style={styles.errorInfo}>
            <Text style={styles.errorTitle}>{error.description}</Text>
            <Text style={styles.errorImpact}>{error.impact}</Text>
          </View>
        </View>
        <Text style={styles.errorAction}>💡 {error.recommendedAction}</Text>
        <View style={styles.errorFooter}>
          <Text style={styles.errorCost}>Reparo: R$ {error.estimatedRepairCost}</Text>
          <Text style={styles.errorDate}>Detectado: {error.detected}</Text>
        </View>
      </View>
    );
  };

  // Componente para leituras básicas OBD-II
  const BasicReading = ({ icon, label, value, unit, status = 'normal' }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'warning': return colors.warning;
        case 'error': return colors.error;
        case 'good': return colors.success;
        default: return colors.primary;
      }
    };

    return (
      <View style={styles.readingCard}>
        <View style={[styles.readingIcon, { backgroundColor: getStatusColor() + '20' }]}>
          <Ionicons name={icon} size={20} color={getStatusColor()} />
        </View>
        <Text style={styles.readingLabel}>{label}</Text>
        <View style={styles.readingValue}>
          <Text style={[styles.readingNumber, { color: getStatusColor() }]}>{value}</Text>
          {unit && <Text style={styles.readingUnit}>{unit}</Text>}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Diagnóstico do Carro</Text>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando diagnóstico...</Text>
        </View>
        <NavBar />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnóstico do Carro</Text>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Botão de Conexão Bluetooth */}
        <View style={styles.bluetoothContainer}>
          <TouchableOpacity 
            style={[
              styles.bluetoothButton, 
              bluetoothConnected ? styles.bluetoothConnected : styles.bluetoothDisconnected
            ]}
            onPress={handleBluetoothConnection}
            disabled={connecting}
          >
            <Ionicons 
              name={bluetoothConnected ? "bluetooth" : "bluetooth-outline"} 
              size={20} 
              color={bluetoothConnected ? colors.surface : colors.primary} 
            />
            <Text style={[
              styles.bluetoothText,
              bluetoothConnected ? styles.bluetoothTextConnected : styles.bluetoothTextDisconnected
            ]}>
              {connecting ? 'Conectando...' : 
               bluetoothConnected ? 'ELM327 Conectado' : 'Conectar Scanner'}
            </Text>
            {bluetoothConnected && (
              <View style={styles.statusIndicator} />
            )}
          </TouchableOpacity>
        </View>
        {/* Saúde Geral do Veículo */}
        <View style={styles.section}>
          <HealthScoreCard 
            score={analyticsData.vehicleHealth.healthScore}
            status={analyticsData.vehicleHealth.overallStatus}
          />
          <View style={styles.healthInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Última Manutenção</Text>
              <Text style={styles.infoValue}>{analyticsData.vehicleHealth.lastMaintenance}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Próxima Manutenção</Text>
              <Text style={styles.infoValue}>{analyticsData.vehicleHealth.nextMaintenance}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Quilometragem</Text>
              <Text style={styles.infoValue}>{analyticsData.vehicleHealth.mileage.toLocaleString()} km</Text>
            </View>
          </View>
        </View>

        {/* Alertas de Manutenção Urgente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚨 Manutenção Necessária</Text>
          {analyticsData.maintenanceAlerts.map((alert) => (
            <MaintenanceAlert key={alert.id} alert={alert} />
          ))}
        </View>

        {/* Erros Encontrados */}
        {analyticsData.activeErrors.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚠️ Erros Detectados (OBD-II)</Text>
            {analyticsData.activeErrors.map((error, index) => (
              <ErrorCard key={index} error={error} />
            ))}
          </View>
        )}

        {/* Leituras Básicas OBD-II */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Leituras Básicas OBD-II</Text>
          
          <View style={styles.readingsGrid}>
            <BasicReading
              icon="speedometer"
              label="RPM"
              value={analyticsData.basicReadings.engine.rpm}
              unit="rpm"
              status="normal"
            />
            <BasicReading
              icon="thermometer"
              label="Temp. Motor"
              value={analyticsData.basicReadings.engine.coolantTemp}
              unit="°C"
              status={analyticsData.basicReadings.engine.coolantTemp > 95 ? 'warning' : 'normal'}
            />
            <BasicReading
              icon="water"
              label="Temp. Óleo"
              value={analyticsData.basicReadings.engine.oilTemp}
              unit="°C"
              status={analyticsData.basicReadings.engine.oilTemp > 100 ? 'warning' : 'normal'}
            />
            <BasicReading
              icon="pulse"
              label="Carga Motor"
              value={analyticsData.basicReadings.engine.engineLoad}
              unit="%"
              status="normal"
            />
            <BasicReading
              icon="car"
              label="Combustível"
              value={analyticsData.basicReadings.fuel.level}
              unit="%"
              status={analyticsData.basicReadings.fuel.level < 20 ? 'warning' : 'normal'}
            />
            <BasicReading
              icon="battery-charging"
              label="Bateria"
              value={analyticsData.basicReadings.electrical.batteryVoltage}
              unit="V"
              status={analyticsData.basicReadings.electrical.batteryVoltage < 12.0 ? 'error' : 'normal'}
            />
            <BasicReading
              icon="flash"
              label="Alternador"
              value={analyticsData.basicReadings.electrical.alternatorOutput}
              unit="V"
              status="normal"
            />
            <BasicReading
              icon="leaf"
              label="Lambda 1"
              value={analyticsData.basicReadings.emissions.lambdaSensor1}
              unit="λ"
              status={Math.abs(analyticsData.basicReadings.emissions.lambdaSensor1 - 1.0) > 0.1 ? 'warning' : 'good'}
            />
          </View>
        </View>

        {/* Próximas Manutenções */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Próximas Manutenções</Text>
          <View style={styles.scheduledContainer}>
            {analyticsData.scheduledMaintenance.map((item, index) => (
              <View key={index} style={styles.scheduledItem}>
                <View style={styles.scheduledInfo}>
                  <Text style={styles.scheduledTitle}>{item.item}</Text>
                  <Text style={styles.scheduledDetails}>
                    {item.km.toLocaleString()} km • {item.daysRemaining} dias
                  </Text>
                </View>
                <Text style={styles.scheduledCost}>R$ {item.cost}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 64,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 20,
    paddingHorizontal: spacing.lg,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: fonts.sizes.md,
    fontWeight: '400',
    color: colors.text.secondary,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  
  // Health Score Card
  healthCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.medium,
  },
  healthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  healthTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: 'bold',
    color: colors.surface,
    marginLeft: spacing.md,
  },
  healthScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  scoreValue: {
    fontSize: fonts.sizes.hero,
    fontWeight: 'bold',
    color: colors.surface,
  },
  scoreLabel: {
    fontSize: fonts.sizes.xl,
    fontWeight: '400',
    color: colors.surface,
    opacity: 0.8,
  },
  statusText: {
    fontSize: fonts.sizes.lg,
    fontWeight: '500',
    color: colors.surface,
    textAlign: 'center',
  },
  healthInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.small,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  infoValue: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    textAlign: 'center',
  },

  // Maintenance Alerts
  alertCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.small,
  },
  alertPriority: {
    width: 4,
    height: '100%',
    borderRadius: borderRadius.xs,
    marginRight: spacing.md,
  },
  alertIcon: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  alertDescription: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertCost: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
  },
  urgentBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  urgentText: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.surface,
  },

  // Error Cards
  errorCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.small,
  },
  errorHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  errorCodeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.md,
  },
  errorCodeText: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.surface,
  },
  errorInfo: {
    flex: 1,
  },
  errorTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  errorImpact: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  errorAction: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontStyle: 'italic',
  },
  errorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorCost: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.primary,
  },
  errorDate: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },

  // Basic Readings
  readingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  readingCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    alignItems: 'center',
    ...shadows.small,
  },
  readingIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  readingLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  readingValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  readingNumber: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'Bold'),
  },
  readingUnit: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },

  // Scheduled Maintenance
  scheduledContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.small,
  },
  scheduledItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  scheduledInfo: {
    flex: 1,
  },
  scheduledTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  scheduledDetails: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  scheduledCost: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.primary,
  },

  // Bluetooth Connection
  bluetoothContainer: {
    marginBottom: spacing.md,
  },
  bluetoothButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    ...shadows.small,
  },
  bluetoothConnected: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  bluetoothDisconnected: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
  },
  bluetoothText: {
    fontSize: fonts.sizes.md,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  bluetoothTextConnected: {
    color: colors.surface,
  },
  bluetoothTextDisconnected: {
    color: colors.primary,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surface,
    marginLeft: spacing.sm,
  },
});