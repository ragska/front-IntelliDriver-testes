import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Alert,
  Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import BackButton from '../components/BackButton';
import { colors, fonts, spacing, borderRadius, shadows } from '../constants/theme';
import { getFontFamily } from '../hooks/useFontLoader';

export default function Profile({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  
  // Estado dos dados do perfil
  const [profileData, setProfileData] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    birthDate: '15/03/1990',
    license: 'AB',
    licensePlate: 'ABC-1234',
    profileImage: null
  });

  // Estado temporário para edição
  const [tempData, setTempData] = useState({ ...profileData });

  const handleEdit = () => {
    setTempData({ ...profileData });
    setIsEditing(true);
  };

  const handleSave = () => {
    // Validação básica
    if (!tempData.name.trim()) {
      Alert.alert('Erro', 'Nome é obrigatório');
      return;
    }
    
    if (!tempData.email.trim()) {
      Alert.alert('Erro', 'Email é obrigatório');
      return;
    }

    // Validação de email simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempData.email)) {
      Alert.alert('Erro', 'Email inválido');
      return;
    }

    setProfileData({ ...tempData });
    setIsEditing(false);
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const pickImage = async (source) => {
    try {
      let result;
      
      if (source === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          Alert.alert('Erro', 'Permissão para acessar a câmera é necessária');
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      } else {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          Alert.alert('Erro', 'Permissão para acessar a galeria é necessária');
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.8,
        });
      }

      if (!result.canceled) {
        setTempData(prev => ({ ...prev, profileImage: result.assets[0].uri }));
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao selecionar imagem');
    }
    setShowImagePicker(false);
  };

  const renderField = (label, value, key, keyboardType = 'default', editable = true) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing && editable ? (
        <TextInput
          style={styles.fieldInput}
          value={tempData[key]}
          onChangeText={(text) => setTempData(prev => ({ ...prev, [key]: text }))}
          keyboardType={keyboardType}
          placeholder={`Digite seu ${label.toLowerCase()}`}
          placeholderTextColor={colors.text.placeholder}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.dark]}
        style={styles.header}
      >
        <BackButton />
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Meu Perfil</Text>
          
          {!isEditing && (
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Ionicons name="pencil" size={20} color={colors.surface} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Foto de Perfil */}
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageWrapper}>
            {(tempData.profileImage || profileData.profileImage) ? (
              <Image
                source={{ uri: tempData.profileImage || profileData.profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={60} color={colors.text.placeholder} />
              </View>
            )}
            
            {isEditing && (
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={() => setShowImagePicker(true)}
              >
                <Ionicons name="camera" size={20} color={colors.surface} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Informações Pessoais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          {renderField('Nome', profileData.name, 'name')}
          {renderField('Email', profileData.email, 'email', 'email-address')}
          {renderField('Telefone', profileData.phone, 'phone', 'phone-pad')}
          {renderField('Data de Nascimento', profileData.birthDate, 'birthDate')}
        </View>

        {/* Informações do Veículo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do Veículo</Text>
          
          {renderField('Categoria da CNH', profileData.license, 'license')}
          {renderField('Placa do Veículo', profileData.licensePlate, 'licensePlate')}
        </View>

        {/* Estatísticas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suas Estatísticas</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="trophy" size={24} color={colors.primary} />
              <Text style={styles.statValue}>1,250</Text>
              <Text style={styles.statLabel}>Pontos</Text>
            </View>
            
            <View style={styles.statItem}>
              <Ionicons name="car" size={24} color={colors.primary} />
              <Text style={styles.statValue}>85</Text>
              <Text style={styles.statLabel}>Viagens</Text>
            </View>
            
            <View style={styles.statItem}>
              <Ionicons name="leaf" size={24} color={colors.primary} />
              <Text style={styles.statValue}>23kg</Text>
              <Text style={styles.statLabel}>CO² Economizado</Text>
            </View>
          </View>
        </View>

        {/* Botões de Ação */}
        {isEditing && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Modal para escolher fonte da imagem */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showImagePicker}
        onRequestClose={() => setShowImagePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolher Foto</Text>
            
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => pickImage('camera')}
            >
              <Ionicons name="camera" size={24} color={colors.primary} />
              <Text style={styles.modalOptionText}>Tirar Foto</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => pickImage('gallery')}
            >
              <Ionicons name="images" size={24} color={colors.primary} />
              <Text style={styles.modalOptionText}>Escolher da Galeria</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowImagePicker(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: spacing.xxl + spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  headerTitle: {
    fontSize: fonts.sizes.xxl,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.surface,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.round,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.round,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.primary,
  },
  changeImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  fieldContainer: {
    marginBottom: spacing.lg,
  },
  fieldLabel: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  fieldValue: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  fieldInput: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.primary,
    ...shadows.small,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.medium,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: fonts.sizes.xl,
    fontFamily: getFontFamily('Poppins', 'Bold'),
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: fonts.sizes.sm,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.primary,
  },
  saveButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    ...shadows.medium,
  },
  saveButtonText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.surface,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    margin: spacing.lg,
    minWidth: 280,
    ...shadows.large,
  },
  modalTitle: {
    fontSize: fonts.sizes.lg,
    fontFamily: getFontFamily('Poppins', 'SemiBold'),
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  modalOptionText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Regular'),
    color: colors.text.primary,
    marginLeft: spacing.md,
  },
  modalCancel: {
    paddingVertical: spacing.md,
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  modalCancelText: {
    fontSize: fonts.sizes.md,
    fontFamily: getFontFamily('Poppins', 'Medium'),
    color: colors.text.secondary,
    textAlign: 'center',
  },
});