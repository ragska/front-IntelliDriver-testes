import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import NavBar from '../components/Navbar';
import BackButton from '../components/BackButton';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';

export default function Analytics({ navigation }) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dados mock para demonstração (incluindo dados OBD-II)
  const mockData = {
    general: {
      totalTrips: 47,
      totalDistance: 1240.5,
      totalTime: '25h 32min',
      avgFuelConsumption: 8.2,
      ecoScore: 85
    },
    performance: {
      avgSpeed: 48.5,
      maxSpeed: 120,
      acceleration: 'Moderada',
      braking: 'Suave',
      cornering: 'Excelente'
    },
    efficiency: {
      fuelEfficiency: 12.8,
      ecoPoints: 1250,
      co2Saved: 15.2,
      moneySlaved: 125.40
    },
    safety: {
      hardBraking: 3,
      rapidAcceleration: 2,
      speeding: 1,
      phoneUsage: 0,
      safetyScore: 92
    },
    // Dados OBD-II do ELM327
    obdData: {
      engine: {
        rpm: 2450,
        coolantTemp: 89,
        oilTemp: 95,
        intakeAirTemp: 22,
        throttlePosition: 45,
        engineLoad: 68,
        fuelLevel: 75
      },
      exhaust: {
        exhaustGasTemp: 450,
        lambdaSensor1: 0.98,
        lambdaSensor2: 1.02,
        catalystTemp: 520
      },
      turbo: {
        boostPressure: 1.2,
        intakeManifoldPressure: 950,
        barometricPressure: 1013
      },
      fuel: {
        fuelPressure: 3.8,
        fuelTrim1: 2.5,
        fuelTrim2: -1.2,
        fuelInjectionTime: 4.2
      },
      electrical: {
        batteryVoltage: 12.8,
        alternatorOutput: 14.2,
        chargeRate: 85
      },
      emissions: {
        co: 0.12,
        hc: 45,
        nox: 0.08,
        o2: 18.5
      }
    },
    diagnostics: {
      dtcCodes: [
        { code: 'P0171', description: 'Sistema muito pobre (Banco 1)', severity: 'medium' },
        { code: 'P0300', description: 'Falha aleatória de ignição', severity: 'high' }
      ],
      systemStatus: {
        oxygenSensor: 'OK',
        catalyticConverter: 'OK',
        evaporativeSystem: 'WARNING',
        airInjection: 'OK',
        acRefrigerant: 'OK',
        oxygenSensorHeater: 'OK',
        egrSystem: 'ERROR'
      },
      readiness: {
        misfire: true,
        fuelSystem: true,
        components: false,
        catalyst: true,
        heatedCatalyst: true,
        evaporative: false,
        secondaryAir: true,
        acRefrigerant: true,
        oxygenSensor: true,
        oxygenSensorHeater: true,
        egrSystem: false
      }
    }
  };

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setAnalyticsData(mockData);
      setLoading(false);
    }, 1000);
  }, [selectedPeriod]);

  const periods = [
    { key: 'day', label: 'Hoje' },
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
    { key: 'year', label: 'Ano' }
  ];

  const MetricCard = ({ icon, title, value, subtitle, color = colors.primary, trend }) => (
    <View style={styles.metricCard}>
      <View style={[styles.metricIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View style={styles.metricContent}>
        <Text style={styles.metricTitle}>{title}</Text>
        <Text style={styles.metricValue}>{value}</Text>
        {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
        {trend && (
          <View style={styles.trendContainer}>
            <Ionicons 
              name={trend > 0 ? 'trending-up' : 'trending-down'} 
              size={16} 
              color={trend > 0 ? colors.success : colors.error} 
            />
            <Text style={[styles.trendText, { color: trend > 0 ? colors.success : colors.error }]}>
              {Math.abs(trend)}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const ScoreCard = ({ title, score, maxScore = 100, color = colors.primary }) => {
    const percentage = (score / maxScore) * 100;
    
    return (
      <View style={styles.scoreCard}>
        <Text style={styles.scoreTitle}>{title}</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreValue}>{score}</Text>
          <Text style={styles.scoreMax}>/{maxScore}</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${percentage}%`, backgroundColor: color }
            ]} 
          />
        </View>
        <Text style={styles.scorePercentage}>{percentage.toFixed(0)}%</Text>
      </View>
    );
  };

  const OBDParameter = ({ icon, label, value, unit, status = 'normal', color }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'warning': return colors.warning;
        case 'error': return colors.error;
        case 'good': return colors.success;
        default: return color || colors.primary;
      }
    };

    return (
      <View style={styles.obdParameter}>
        <View style={[styles.obdIcon, { backgroundColor: getStatusColor() + '20' }]}>
          <Ionicons name={icon} size={20} color={getStatusColor()} />
        </View>
        <View style={styles.obdContent}>
          <Text style={styles.obdLabel}>{label}</Text>
          <View style={styles.obdValueContainer}>
            <Text style={[styles.obdValue, { color: getStatusColor() }]}>{value}</Text>
            {unit && <Text style={styles.obdUnit}>{unit}</Text>}
          </View>
        </View>
      </View>
    );
  };

  const DTCCode = ({ code, description, severity }) => {
    const getSeverityColor = () => {
      switch (severity) {
        case 'high': return colors.error;
        case 'medium': return colors.warning;
        case 'low': return colors.accent;
        default: return colors.text.secondary;
      }
    };

    return (
      <View style={styles.dtcItem}>
        <View style={[styles.dtcSeverity, { backgroundColor: getSeverityColor() }]} />
        <View style={styles.dtcContent}>
          <Text style={styles.dtcCode}>{code}</Text>
          <Text style={styles.dtcDescription}>{description}</Text>
        </View>
        <Ionicons name="alert-circle" size={20} color={getSeverityColor()} />
      </View>
    );
  };

  const SystemStatus = ({ system, status }) => {
    const getStatusIcon = () => {
      switch (status) {
        case 'OK': return { name: 'checkmark-circle', color: colors.success };
        case 'WARNING': return { name: 'warning', color: colors.warning };
        case 'ERROR': return { name: 'close-circle', color: colors.error };
        default: return { name: 'help-circle', color: colors.text.secondary };
      }
    };

    const statusIcon = getStatusIcon();

    return (
      <View style={styles.systemItem}>
        <Ionicons name={statusIcon.name} size={24} color={statusIcon.color} />
        <Text style={styles.systemName}>{system}</Text>
        <Text style={[styles.systemStatus, { color: statusIcon.color }]}>{status}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.title}>Analytics</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando analytics...</Text>
        </View>
        <NavBar />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Analytics</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                selectedPeriod === period.key && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period.key && styles.periodTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Overview Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visão Geral</Text>
          <View style={styles.metricsGrid}>
            <MetricCard
              icon="car"
              title="Viagens"
              value={analyticsData.general.totalTrips}
              color={colors.primary}
              trend={12}
            />
            <MetricCard
              icon="speedometer"
              title="Distância"
              value={`${analyticsData.general.totalDistance} km`}
              color={colors.secondary}
              trend={-5}
            />
            <MetricCard
              icon="time"
              title="Tempo Total"
              value={analyticsData.general.totalTime}
              color={colors.accent}
              trend={8}
            />
            <MetricCard
              icon="leaf"
              title="Consumo Médio"
              value={`${analyticsData.general.avgFuelConsumption} L/100km`}
              color={colors.dark}
              trend={-15}
            />
          </View>
        </View>

        {/* Performance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance</Text>
          <View style={styles.performanceContainer}>
            <MetricCard
              icon="speedometer-outline"
              title="Velocidade Média"
              value={`${analyticsData.performance.avgSpeed} km/h`}
              subtitle={`Máx: ${analyticsData.performance.maxSpeed} km/h`}
              color="#2196F3"
            />
            <MetricCard
              icon="trending-up"
              title="Aceleração"
              value={analyticsData.performance.acceleration}
              color="#FF9800"
            />
            <MetricCard
              icon="hand-left"
              title="Frenagem"
              value={analyticsData.performance.braking}
              color="#9C27B0"
            />
            <MetricCard
              icon="git-branch"
              title="Curvas"
              value={analyticsData.performance.cornering}
              color="#4CAF50"
            />
          </View>
        </View>

        {/* Efficiency Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Eficiência</Text>
          <LinearGradient
            colors={[colors.primary, colors.dark]}
            style={styles.efficiencyCard}
          >
            <View style={styles.efficiencyHeader}>
              <Ionicons name="leaf" size={32} color={colors.surface} />
              <Text style={styles.efficiencyTitle}>Eco Performance</Text>
            </View>
            <View style={styles.efficiencyMetrics}>
              <View style={styles.efficiencyItem}>
                <Text style={styles.efficiencyValue}>{analyticsData.efficiency.fuelEfficiency}</Text>
                <Text style={styles.efficiencyLabel}>km/L</Text>
              </View>
              <View style={styles.efficiencyItem}>
                <Text style={styles.efficiencyValue}>{analyticsData.efficiency.ecoPoints}</Text>
                <Text style={styles.efficiencyLabel}>EcoPoints</Text>
              </View>
              <View style={styles.efficiencyItem}>
                <Text style={styles.efficiencyValue}>{analyticsData.efficiency.co2Saved}</Text>
                <Text style={styles.efficiencyLabel}>kg CO₂ poupados</Text>
              </View>
              <View style={styles.efficiencyItem}>
                <Text style={styles.efficiencyValue}>R$ {analyticsData.efficiency.moneySlaved}</Text>
                <Text style={styles.efficiencyLabel}>economizados</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Safety & Scores Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Segurança & Pontuação</Text>
          <View style={styles.scoresContainer}>
            <ScoreCard
              title="Eco Score"
              score={analyticsData.general.ecoScore}
              color={colors.success}
            />
            <ScoreCard
              title="Safety Score"
              score={analyticsData.safety.safetyScore}
              color={colors.primary}
            />
          </View>
          
          <View style={styles.safetyAlerts}>
            <View style={styles.alertItem}>
              <Ionicons name="warning" size={20} color={colors.error} />
              <Text style={styles.alertText}>Frenagens bruscas: {analyticsData.safety.hardBraking}</Text>
            </View>
            <View style={styles.alertItem}>
              <Ionicons name="flash" size={20} color={colors.warning} />
              <Text style={styles.alertText}>Acelerações rápidas: {analyticsData.safety.rapidAcceleration}</Text>
            </View>
            <View style={styles.alertItem}>
              <Ionicons name="speedometer" size={20} color={colors.error} />
              <Text style={styles.alertText}>Excesso de velocidade: {analyticsData.safety.speeding}</Text>
            </View>
            <View style={styles.alertItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.alertText}>Uso do celular: {analyticsData.safety.phoneUsage}</Text>
            </View>
          </View>
        </View>

        {/* Engine Parameters Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parâmetros do Motor (OBD-II)</Text>
          <View style={styles.obdSection}>
            <Text style={styles.obdSubtitle}>Motor</Text>
            <View style={styles.obdGrid}>
              <OBDParameter
                icon="speedometer"
                label="RPM"
                value={analyticsData.obdData.engine.rpm}
                unit="rpm"
                color="#E91E63"
              />
              <OBDParameter
                icon="thermometer"
                label="Temp. Líquido"
                value={analyticsData.obdData.engine.coolantTemp}
                unit="°C"
                status={analyticsData.obdData.engine.coolantTemp > 95 ? 'warning' : 'normal'}
                color="#FF5722"
              />
              <OBDParameter
                icon="water"
                label="Temp. Óleo"
                value={analyticsData.obdData.engine.oilTemp}
                unit="°C"
                status={analyticsData.obdData.engine.oilTemp > 100 ? 'warning' : 'normal'}
                color="#795548"
              />
              <OBDParameter
                icon="snow"
                label="Temp. Admissão"
                value={analyticsData.obdData.engine.intakeAirTemp}
                unit="°C"
                color="#2196F3"
              />
              <OBDParameter
                icon="car"
                label="Posição Acelerad."
                value={analyticsData.obdData.engine.throttlePosition}
                unit="%"
                color="#4CAF50"
              />
              <OBDParameter
                icon="pulse"
                label="Carga do Motor"
                value={analyticsData.obdData.engine.engineLoad}
                unit="%"
                status={analyticsData.obdData.engine.engineLoad > 80 ? 'warning' : 'normal'}
                color="#9C27B0"
              />
            </View>
          </View>

          <View style={styles.obdSection}>
            <Text style={styles.obdSubtitle}>Sistema de Combustível</Text>
            <View style={styles.obdGrid}>
              <OBDParameter
                icon="water"
                label="Nível Combust."
                value={analyticsData.obdData.engine.fuelLevel}
                unit="%"
                status={analyticsData.obdData.engine.fuelLevel < 20 ? 'warning' : 'normal'}
                color="#FF9800"
              />
              <OBDParameter
                icon="speedometer"
                label="Pressão Combust."
                value={analyticsData.obdData.fuel.fuelPressure}
                unit="bar"
                color="#607D8B"
              />
              <OBDParameter
                icon="time"
                label="Tempo Injeção"
                value={analyticsData.obdData.fuel.fuelInjectionTime}
                unit="ms"
                color="#E91E63"
              />
              <OBDParameter
                icon="trending-up"
                label="Trim Banco 1"
                value={analyticsData.obdData.fuel.fuelTrim1}
                unit="%"
                color="#8BC34A"
              />
            </View>
          </View>

          <View style={styles.obdSection}>
            <Text style={styles.obdSubtitle}>Turbo & Pressões</Text>
            <View style={styles.obdGrid}>
              <OBDParameter
                icon="speedometer"
                label="Pressão Turbo"
                value={analyticsData.obdData.turbo.boostPressure}
                unit="bar"
                color="#3F51B5"
              />
              <OBDParameter
                icon="thermometer"
                label="Pressão Coletor"
                value={analyticsData.obdData.turbo.intakeManifoldPressure}
                unit="mbar"
                color="#009688"
              />
              <OBDParameter
                icon="cloud"
                label="Pressão Atmosf."
                value={analyticsData.obdData.turbo.barometricPressure}
                unit="mbar"
                color="#607D8B"
              />
            </View>
          </View>

          <View style={styles.obdSection}>
            <Text style={styles.obdSubtitle}>Sistema Elétrico</Text>
            <View style={styles.obdGrid}>
              <OBDParameter
                icon="battery-charging"
                label="Voltagem Bateria"
                value={analyticsData.obdData.electrical.batteryVoltage}
                unit="V"
                status={analyticsData.obdData.electrical.batteryVoltage < 12.0 ? 'warning' : 'normal'}
                color="#FFC107"
              />
              <OBDParameter
                icon="flash"
                label="Saída Alternador"
                value={analyticsData.obdData.electrical.alternatorOutput}
                unit="V"
                color="#FF5722"
              />
              <OBDParameter
                icon="battery-full"
                label="Taxa de Carga"
                value={analyticsData.obdData.electrical.chargeRate}
                unit="%"
                color="#4CAF50"
              />
            </View>
          </View>
        </View>

        {/* Emissions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emissões & Sensores</Text>
          <LinearGradient
            colors={[colors.accent, colors.secondary]}
            style={styles.emissionsCard}
          >
            <View style={styles.emissionsHeader}>
              <Ionicons name="leaf" size={32} color={colors.dark} />
              <Text style={styles.emissionsTitle}>Níveis de Emissão</Text>
            </View>
            <View style={styles.emissionsGrid}>
              <View style={styles.emissionItem}>
                <Text style={styles.emissionValue}>{analyticsData.obdData.emissions.co}</Text>
                <Text style={styles.emissionLabel}>CO (%)</Text>
              </View>
              <View style={styles.emissionItem}>
                <Text style={styles.emissionValue}>{analyticsData.obdData.emissions.hc}</Text>
                <Text style={styles.emissionLabel}>HC (ppm)</Text>
              </View>
              <View style={styles.emissionItem}>
                <Text style={styles.emissionValue}>{analyticsData.obdData.emissions.nox}</Text>
                <Text style={styles.emissionLabel}>NOx (%)</Text>
              </View>
              <View style={styles.emissionItem}>
                <Text style={styles.emissionValue}>{analyticsData.obdData.emissions.o2}</Text>
                <Text style={styles.emissionLabel}>O₂ (%)</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.lambdaSection}>
            <Text style={styles.obdSubtitle}>Sensores Lambda</Text>
            <View style={styles.obdGrid}>
              <OBDParameter
                icon="radio-button-on"
                label="Sensor Lambda 1"
                value={analyticsData.obdData.exhaust.lambdaSensor1}
                unit="λ"
                status={Math.abs(analyticsData.obdData.exhaust.lambdaSensor1 - 1.0) > 0.1 ? 'warning' : 'good'}
                color="#E91E63"
              />
              <OBDParameter
                icon="radio-button-on"
                label="Sensor Lambda 2"
                value={analyticsData.obdData.exhaust.lambdaSensor2}
                unit="λ"
                status={Math.abs(analyticsData.obdData.exhaust.lambdaSensor2 - 1.0) > 0.1 ? 'warning' : 'good'}
                color="#9C27B0"
              />
              <OBDParameter
                icon="thermometer"
                label="Temp. Catalis."
                value={analyticsData.obdData.exhaust.catalystTemp}
                unit="°C"
                status={analyticsData.obdData.exhaust.catalystTemp > 600 ? 'warning' : 'normal'}
                color="#FF5722"
              />
            </View>
          </View>
        </View>

        {/* Diagnostics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diagnósticos OBD-II</Text>
          
          {/* DTC Codes */}
          {analyticsData.diagnostics.dtcCodes.length > 0 && (
            <View style={styles.dtcSection}>
              <Text style={styles.obdSubtitle}>Códigos de Erro (DTC)</Text>
              <View style={styles.dtcContainer}>
                {analyticsData.diagnostics.dtcCodes.map((dtc, index) => (
                  <DTCCode
                    key={index}
                    code={dtc.code}
                    description={dtc.description}
                    severity={dtc.severity}
                  />
                ))}
              </View>
            </View>
          )}

          {/* System Status */}
          <View style={styles.systemStatusSection}>
            <Text style={styles.obdSubtitle}>Status dos Sistemas</Text>
            <View style={styles.systemContainer}>
              {Object.entries(analyticsData.diagnostics.systemStatus).map(([system, status]) => (
                <SystemStatus
                  key={system}
                  system={system.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  status={status}
                />
              ))}
            </View>
          </View>

          {/* Readiness Tests */}
          <View style={styles.readinessSection}>
            <Text style={styles.obdSubtitle}>Testes de Prontidão</Text>
            <View style={styles.readinessGrid}>
              {Object.entries(analyticsData.diagnostics.readiness).map(([test, ready]) => (
                <View key={test} style={styles.readinessItem}>
                  <Ionicons 
                    name={ready ? "checkmark-circle" : "close-circle"} 
                    size={20} 
                    color={ready ? colors.success : colors.error} 
                  />
                  <Text style={styles.readinessText}>
                    {test.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Text>
                </View>
              ))}
            </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl + spacing.md,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: fonts.sizes.title,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
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
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xs,
    marginBottom: spacing.lg,
    ...shadows.small,
  },
  periodButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.lg,
  },
  periodButtonActive: {
    backgroundColor: colors.primary,
  },
  periodText: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
  },
  periodTextActive: {
    color: colors.surface,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fonts.sizes.xl,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.small,
  },
  metricIcon: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  metricContent: {
    flex: 1,
  },
  metricTitle: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  metricValue: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
  },
  metricSubtitle: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.light,
    marginTop: spacing.xs,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  trendText: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    marginLeft: spacing.xs,
  },
  performanceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  efficiencyCard: {
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    ...shadows.medium,
  },
  efficiencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  efficiencyTitle: {
    fontSize: fonts.sizes.xl,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.surface,
    marginLeft: spacing.md,
  },
  efficiencyMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  efficiencyItem: {
    alignItems: 'center',
    width: '48%',
    marginBottom: spacing.md,
  },
  efficiencyValue: {
    fontSize: fonts.sizes.xxl,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.surface,
  },
  efficiencyLabel: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.surface,
    opacity: 0.8,
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  scoreCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.small,
  },
  scoreTitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  scoreValue: {
    fontSize: fonts.sizes.hero,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
  },
  scoreMax: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.xs,
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.xs,
  },
  scorePercentage: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
  },
  safetyAlerts: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.small,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  alertText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  // OBD-II Styles
  obdSection: {
    marginBottom: spacing.lg,
  },
  obdSubtitle: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  obdGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  obdParameter: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.small,
  },
  obdIcon: {
    width: 35,
    height: 35,
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  obdContent: {
    flex: 1,
  },
  obdLabel: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  obdValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  obdValue: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Bold'),
  },
  obdUnit: {
    fontSize: fonts.sizes.xs,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  // Emissions Styles
  emissionsCard: {
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.medium,
  },
  emissionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  emissionsTitle: {
    fontSize: fonts.sizes.xl,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.dark,
    marginLeft: spacing.md,
  },
  emissionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  emissionItem: {
    alignItems: 'center',
    width: '48%',
    marginBottom: spacing.md,
  },
  emissionValue: {
    fontSize: fonts.sizes.xxl,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.dark,
  },
  emissionLabel: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.dark,
    opacity: 0.8,
  },
  lambdaSection: {
    marginTop: spacing.md,
  },
  // DTC Styles
  dtcSection: {
    marginBottom: spacing.lg,
  },
  dtcContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.small,
  },
  dtcItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  dtcSeverity: {
    width: 4,
    height: 40,
    borderRadius: borderRadius.xs,
    marginRight: spacing.md,
  },
  dtcContent: {
    flex: 1,
  },
  dtcCode: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  dtcDescription: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
  },
  // System Status Styles
  systemStatusSection: {
    marginBottom: spacing.lg,
  },
  systemContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.small,
  },
  systemItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  systemName: {
    flex: 1,
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.primary,
    marginLeft: spacing.md,
  },
  systemStatus: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Bold'),
  },
  // Readiness Styles
  readinessSection: {
    marginBottom: spacing.lg,
  },
  readinessGrid: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.small,
  },
  readinessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  readinessText: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
});