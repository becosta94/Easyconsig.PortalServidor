import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import EsqueciSenhaModal from '@/components/EsqueciMinhaSenhaModal';
import { useRouter } from 'expo-router';
import { login } from '@/services/authService';
import CidadeSelect from '@/components/CidadeSelect';

export default function LoginScreen() {
  const [cidade, setCidade] = useState('');
  const [cpf, setCpf] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [cidadeError, setCidadeError] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [matriculaError, setMatriculaError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  function formatCpf(cpf: string) {
    cpf = cpf.replace(/\D/g, '');
    return cpf
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
      .slice(0, 14); 
  }

  return (
    <LinearGradient
      colors={['#244D60', '#D3D6D8', '#FFFFFF']}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      style={styles.gradient}
    >
      <View style={styles.container}>

        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.card}>
          <Text style={styles.title}>Acesso</Text>

          <CidadeSelect
            cidade={cidade}
            setCidade={setCidade}
            cidadeError={cidadeError}
            setCidadeError={setCidadeError}
          />
          {cidadeError ? <Text style={styles.errorText}>{cidadeError}</Text> : null}

          <View style={[
            styles.inputContainer,
            cpfError ? styles.inputContainerError : null
          ]}>
            <Ionicons name="person-outline" size={22} color="#2D2D2F" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="CPF"
              value={formatCpf(cpf)}
              onChangeText={text => {
                const onlyNumbers = text.replace(/\D/g, '');
                setCpf(onlyNumbers);
                if (onlyNumbers) setCpfError('');
              }}
              keyboardType="numeric"
              placeholderTextColor={cpfError ? '#E53935' : '#A0A0A0'}
              maxLength={14}
            />
          </View>
          {cpfError ? <Text style={styles.errorText}>{cpfError}</Text> : null}

          <View style={[
            styles.inputContainer,
            matriculaError ? styles.inputContainerError : null
          ]}>
            <Ionicons name="person-outline" size={22} color="#2D2D2F" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Matrícula"
              value={matricula}
              onChangeText={text => {
                setMatricula(text);
                if (text) setMatriculaError('');
              }}
              keyboardType="numeric"
              placeholderTextColor={matriculaError ? '#E53935' : '#A0A0A0'}
            />
          </View>
          {matriculaError ? <Text style={styles.errorText}>{matriculaError}</Text> : null}


          <View style={[
            styles.inputContainer,
            senhaError ? styles.inputContainerError : null
          ]}>
            <Ionicons name="lock-closed-outline" size={22} color="#2D2D2F" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={senha}
              onChangeText={text => {
                setSenha(text);
                if (text) setSenhaError('');
              }}
              secureTextEntry={!showPassword}
              placeholderTextColor={senhaError ? '#E53935' : '#A0A0A0'}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#2D2D2F" />
            </TouchableOpacity>
          </View>
          {senhaError ? <Text style={styles.errorText}>{senhaError}</Text> : null}

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.forgot}>Esqueci a senha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              let hasError = false;

              if (!cidade) {
                setCidadeError('Selecione a cidade');
                hasError = true;
              } else {
                setCidadeError('');
              }

              if (!cpf) {
                setCpfError('Informe o CPF');
                hasError = true;
              } else {
                setCpfError('');
              }

              if (!matricula) {
                setMatriculaError('Informe a matrícula');
                hasError = true;
              } else {
                setMatriculaError('');
              }

              if (!senha) {
                setSenhaError('Informe a senha');
                hasError = true;
              } else {
                setSenhaError('');
              }

              if (hasError) return;

              try {
                const response = await login(cpf, senha, cidade, matricula);
                if (typeof response === 'object' && response !== null && 'message' in response) {
                    setCpfError(' ');
                    setMatriculaError(' ');
                    setSenhaError(response.message);
                    return;
                } 
                router.replace('/(tabs)');
              } catch (e) {
                setCpfError(' ');
                setMatriculaError(' ');
                setSenhaError('Erro de conexão');
              }
            }}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <EsqueciSenhaModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  logo: {
    width: 160,
    height: 80,
    marginBottom: 20,
    marginTop: 20
  },
  card: {
    width: '90%',
    backgroundColor: '#FAFAFA66',
    borderRadius: 20,
    padding: 24,
    shadowRadius: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    marginBottom: 24,
    color: '#222',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBEBEC',
    borderRadius: 24,
    paddingHorizontal: 16,
    marginBottom: 30,
    height: 48,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2D2D2F',
    fontFamily: 'Roboto'

  },
  forgot: {
    alignSelf: 'flex-end',
    color: '#FFFFFF',
    marginBottom: 20,
    marginTop: -8,
    fontSize: 14,
    fontFamily: 'Inter'
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#222',
    fontSize: 18,
    fontWeight: '500',
  },
  inputContainerError: {
    borderWidth: 1.5,
    borderColor: '#E53935',
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