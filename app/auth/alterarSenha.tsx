import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { apiRequest } from "../../services/apiService";
import { getCidadeEsqueciSenha, getMatriculaEsqueciSenha, getTokenEsqueciSenha } from "../../services/authStorageService";


const { width } = Dimensions.get('window');

type Props = {
    onSave: (password: string) => void;
    onCancel: () => void;
};

const AlterarSenhaScreen: React.FC<Props> = ({ onSave, onCancel }) => {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    const handleSave = async () => {
        if (!password) {
            Alert.alert('Erro', 'Digite a nova senha');
            return;
        }
        if (!confirm) {
            Alert.alert('Erro', 'Confirme a nova senha');
            return;
        }
        if (password !== confirm) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
            return;
        }
        try {
            const matricula = await getMatriculaEsqueciSenha();
            const cidade = await getCidadeEsqueciSenha();
            const token = await getTokenEsqueciSenha();
            const payload = {
                matricula: matricula,
                senhaAtual: token,
                novaSenha: password,
                codigoCidade: cidade,
            };
            const response = await apiRequest('/Auth/trocar-senha', 'POST', payload);
            if (response.sucesso || response.status === 200 || response === `Senha alterada com sucesso.`) {
                Alert.alert('Sucesso', 'Senha alterada com sucesso!', [
                    { text: 'OK' }
                ]);
                router.navigate('/auth/login')

            } else {
                Alert.alert('Erro', response.message || 'Não foi possível alterar a senha');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro inesperado');
            console.error('Erro ao alterar senha:', error);
        }
    };

    return (
        <>
            <Stack.Screen options={{ title: `Alterar senha` }} />

            <View style={styles.container}>

                <View style={[styles.inputWrapper, { marginTop: 24 }]}>
                    <MaterialIcons name="lock-outline" size={28} color="#444" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nova Senha"
                        placeholderTextColor="#444"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={28} color="#444" />
                    </TouchableOpacity>
                </View>

                <View style={[styles.inputWrapper, { marginBottom: 80 }]}>
                    <MaterialIcons name="lock-outline" size={28} color="#444" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar nova senha"
                        placeholderTextColor="#444"
                        secureTextEntry={!showConfirm}
                        value={confirm}
                        onChangeText={setConfirm}
                    />
                    <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={28} color="#444" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSave()}
                >
                    <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonSecondary}
                    onPress={onCancel}
                >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 32,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#222',
        marginBottom: 32,
        marginTop: 16,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#222',
        borderRadius: 40,
        paddingHorizontal: 18,
        width: width * 0.9,
        height: 70,
        marginBottom: 24,
        backgroundColor: '#fff',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: '#222',
    },
    button: {
        backgroundColor: '#244D60',
        borderRadius: 32,
        width: width * 0.8,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 1,
    },
    buttonSecondary: {
        borderWidth: 1,
        borderColor: '#244D60',
        borderRadius: 32,
        width: width * 0.8,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        marginTop: 8,
    },
    cancelButtonText: {
        color: '#25505E',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 2,
    },
});

export default AlterarSenhaScreen;