import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { apiRequest } from "../../services/apiService";
import { getMatriculaEsqueciSenha, getCidadeEsqueciSenha, getCpfEsqueciSenha, saveTokenEsqueciSenha, getEmailEsqueciSenha } from '@/services/authStorageService';

const { width } = Dimensions.get('window');

type Props = {
    email: string;
    onResend: () => void;
};

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

const CodigoConfirmacao: React.FC<Props> = ({ email, onResend }) => {
    const [code, setCode] = useState<string>('');
    const [timer, setTimer] = useState<number>(RESEND_SECONDS);
    const inputRefs = useRef<Array<TextInput | null>>([]);
    const router = useRouter();
    const [error, setError] = useState('');

    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (value: string, idx: number) => {
        if (!/^\d*$/.test(value)) return;
        const newCode = code.split('');
        newCode[idx] = value;
        const joined = newCode.join('').slice(0, CODE_LENGTH);
        setCode(joined);
        if (value && idx < CODE_LENGTH - 1) {
            inputRefs.current[idx + 1]?.focus();
        }
    };

    const handleResend = async () => {
        setTimer(RESEND_SECONDS);
        setCode('');
        inputRefs.current[0]?.focus();
        const matricula = await getMatriculaEsqueciSenha();
        const cidade = await getCidadeEsqueciSenha();
        const email = await getEmailEsqueciSenha();
        const payload = {
            email: email,
            matricula: matricula,
            codigoCidade: cidade,
        }
        await apiRequest("/Auth/resetar-senha", "POST", payload);
    };

    const handleSendCode = async (code: string) => {
        console.log('teste');
        const matricula = await getMatriculaEsqueciSenha();
        const cidade = await getCidadeEsqueciSenha();
        const cpf = await getCpfEsqueciSenha();
        const payload = {
            cpf: cpf,
            matricula: matricula,
            codigoCidade: cidade,
            senhaEmail: code
        }
        const response = await apiRequest('/Auth/validar-senha', 'POST', payload);
        if (response.sucesso || response.status === 200 || response === 'Senha válida.') {
            await saveTokenEsqueciSenha(code);
            router.navigate('/auth/alterarSenha')
        } else {
            setError(response.Error);
        }
    };

    return (
        <>
            <Stack.Screen options={{ title: `Código de verificação` }} />

            <View style={styles.container}>
                <Text style={styles.title}>
                    Seu código de verificação foi enviado{'\n'}para o e-mail
                </Text>
                <Text style={styles.email}>{email}</Text>

                <View style={styles.codeContainer}>
                    {Array.from({ length: CODE_LENGTH }).map((_, idx) => (
                        <TextInput
                            key={idx}
                            ref={ref => { inputRefs.current[idx] = ref; }}
                            style={[
                                styles.codeInput,
                                code[idx] ? styles.codeInputFilled : undefined
                            ]}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={code[idx] || ''}
                            onChangeText={(value) => handleChange(value, idx)}
                            autoFocus={idx === 0}
                            returnKeyType="next"
                            textAlign="center"
                            selectionColor="#25505E"
                        />
                    ))}
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity
                    style={[
                        styles.button,
                        { opacity: code.length === CODE_LENGTH ? 1 : 0.5 },
                    ]}
                    disabled={code.length !== CODE_LENGTH}
                    onPress={() => handleSendCode(code)}
                >
                    <Text style={styles.buttonText}>Próximo</Text>
                </TouchableOpacity>

                {timer > 0 ? (
                    <Text style={styles.resendText}>
                        Aguarde <Text style={styles.resendTime}>{timer}</Text> segundos para reenviar
                    </Text>
                ) : (
                    <TouchableOpacity onPress={handleResend} style={styles.buttonSecondary}>
                        <Text style={styles.resendLink}>
                            Reenviar código
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 48,
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        color: '#4B4B4B',
        textAlign: 'center',
        marginBottom: 12,
        fontWeight: '400',
        lineHeight: 30,
    },
    email: {
        fontSize: 26,
        color: '#222',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 36,
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.9,
        marginBottom: 40,
    },
    codeInput: {
        width: 48,
        height: 60,
        borderBottomWidth: 3,
        borderColor: '#B6D6E2',
        fontSize: 32,
        color: '#222',
        marginHorizontal: 8,
        textAlign: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    codeInputFilled: {
        borderColor: '#25505E',
    },
    button: {
        backgroundColor: '#244D60',
        borderRadius: 32,
        width: width * 0.8,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        marginTop: 8,
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
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    resendText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    resendTime: {
        color: '#25505E',
        fontWeight: '700',
    },
    resendLink: {
        fontSize: 16,
        color: '#244D60',
        textAlign: 'center',
        fontWeight: '500',
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

export default CodigoConfirmacao;