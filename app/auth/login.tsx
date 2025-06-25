import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import EsqueciSenhaModal from '@/components/EsqueciMinhaSenhaModal';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [cidade, setCidade] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [cidadeError, setCidadeError] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();
  
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

          <View style={[
            styles.inputContainer,
            cidadeError ? styles.inputContainerError : null
          ]}>
            <Ionicons name="location-outline" size={22} color="#2D2D2F" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Cidade"
              value={cidade}
              onChangeText={text => {
                setCidade(text);
                if (text) setCidadeError('');
              }}
              placeholderTextColor={cidadeError ? '#E53935' : '#A0A0A0'}
            />
            <MaterialIcons name="arrow-drop-down" size={24} color="#2D2D2F" />
          </View>
          {cidadeError ? <Text style={styles.errorText}>{cidadeError}</Text> : null}

          <View style={[
            styles.inputContainer,
            cpfError ? styles.inputContainerError : null
          ]}>
            <Ionicons name="person-outline" size={22} color="#2D2D2F" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="CPF"
              value={cpf}
              onChangeText={text => {
                setCpf(text);
                if (text) setCpfError('');
              }}
              keyboardType="numeric"
              placeholderTextColor={cpfError ? '#E53935' : '#A0A0A0'}
            />
          </View>
          {cpfError ? <Text style={styles.errorText}>{cpfError}</Text> : null}

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

              if (!senha) {
                setSenhaError('Informe a senha');
                hasError = true;
              } else {
                setSenhaError('');
              }

              if (hasError) return;

              // Chamada à API
              try {
                // const response = await fetch('SUA_URL_DA_API', {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify({ cidade, cpf, senha }),
                // });
                // const data = await response.json();

                // if (!response.ok) {
                //   // Exemplo: supondo que a API retorna { field: 'cpf' | 'senha', message: '...' }
                //   if (data.field === 'cpf') setCpfError(data.message || 'CPF inválido');
                //   if (data.field === 'senha') setSenhaError(data.message || 'Senha inválida');
                //   if (!data.field) {
                //     setCpfError('CPF ou senha inválidos');
                //     setSenhaError('CPF ou senha inválidos');
                //   }
                //   return;
                // }
                router.navigate('/(tabs)');
                // Se sucesso, prossiga com o login...
                // Exemplo: navegação, salvar token, etc.
              } catch (e) {
                setCpfError('Erro de conexão');
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
    borderColor: '#E53935', // vermelho de erro
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