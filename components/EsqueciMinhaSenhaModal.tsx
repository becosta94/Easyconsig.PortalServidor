import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import CirculoCheck from './CirculoCheck';
import { useRouter } from 'expo-router';
import CidadeSelect from '@/components/CidadeSelect';
import { apiRequest } from "../services/apiService";
import { saveCidadeEsqueciSenha, saveMatriculaEsqueciSenha } from "../services/authStorageService";

type EsqueciSenhaModalProps = {
  visible: boolean;
  onClose: () => void;
};

const { width } = Dimensions.get('window');



const EsqueciSenhaModal: React.FC<EsqueciSenhaModalProps> = ({ visible, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [matricula, setMatricula] = useState<string>('');
  const [cidade, setCidade] = useState('');
  const [cidadeError, setCidadeError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);
  const router = useRouter();
  const [error, setError] = useState('');


  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (sent) {
      timer = setTimeout(() => {
        router.navigate('../auth/codigoConfirmacao');
        setSent(false);
        setEmail('');
        setMatricula('');
        onClose();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [sent]);

  const handleSend = async () => {
    if (!email) return;
    setLoading(true);
    try {
      // Substitua pela sua API real
      const payload = {
        email: email,
        matricula: matricula,
        codigoCidade: cidade,
      }
      const response = await apiRequest("/Auth/resetar-senha", "POST", payload);
      await saveCidadeEsqueciSenha(cidade);
      await saveMatriculaEsqueciSenha(matricula);
      setSent(true);
    } catch (error) {
      setError('Não foi possível trocar a senha, entre em contato com a administração')
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setSent(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <MaterialIcons name="close" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={styles.title}>Esqueci a senha</Text>

          {sent ? (
            <>
              <CirculoCheck />
              <Text style={styles.sentText}>E-mail enviado</Text>
            </>
          ) : (
            <>
              <CidadeSelect
                cidade={cidade}
                setCidade={setCidade}
                cidadeError={cidadeError}
                setCidadeError={setCidadeError}
              />
              <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={24} color="#333" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  placeholderTextColor="#333"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={24} color="#333" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Matricula"
                  placeholderTextColor="#333"
                  value={matricula}
                  onChangeText={setMatricula}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <TouchableOpacity style={styles.button} onPress={handleSend} disabled={loading || !email}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Enviar</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 18,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 1,
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#222',
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    marginBottom: 18,
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 28,
    paddingHorizontal: 12,
    width: '100%',
    height: 56,
    marginBottom: 22,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  button: {
    backgroundColor: '#25505E',
    borderRadius: 46,
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  checkCircleContainer: {
    marginBottom: 24,
    marginTop: 8,
  },
  sentText: {
    fontSize: 20,
    color: '#222',
    fontWeight: '500',
    marginTop: 8,
  },
  errorText: {
    color: '#E53935',
    fontSize: 13,
    marginTop: -24,
    marginBottom: 16,
    marginLeft: 8,
    fontFamily: 'Inter',
  },
});

export default EsqueciSenhaModal;