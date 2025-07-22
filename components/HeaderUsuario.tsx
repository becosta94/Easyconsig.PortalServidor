// components/HeaderUsuario.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export type HeaderUsuarioProps = {
  nome: string;
  matricula: string;
  orgao: string;
  cargo: string;
  status: string;
  dataAdmissao: string;
  dataNascimento: string;
  dataFimContrato: string;
  margem: number;
  margemCartao: number;
  margemCartaoAdiantamento: number;
  margemReservada: number;
  cpf: string;
};

const HeaderUsuario: React.FC<{ data: HeaderUsuarioProps }> = ({ data }) => {
  // Função para formatar datas
  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "0001-01-01T00:00:00") return "-";
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  function maskCPF(cpf: string) {
    // Remove tudo que não for número
    if (!cpf) return "-";
    const cleaned = cpf.replace(/\D/g, '').padStart(11, "0");
    // Aplica a máscara se tiver 11 dígitos
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    // Se não tiver 11 dígitos, retorna o valor original
    return cpf;
  }
  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  return (
    <View style={styles.header}>
      <View style={styles.profileRow}>
        <Image
          source={require('../assets/images/avatar-placeholder.png')}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.greeting}>Olá, {data.nome}</Text>
          <Text style={styles.cpf}>CPF: {maskCPF(data.cpf)}</Text>
        </View>
      </View>
      <View style={styles.infoGrid}>
        <View style={styles.infoCol}>
          <Text style={styles.label}>Matrícula</Text>
          <Text style={styles.value}>{data.matricula}</Text>

          <Text style={styles.label}>Vínculo Empregatício</Text>
          <Text style={styles.value}>{data.cargo}</Text>

          <Text style={styles.label}>Data de admissão</Text>
          <Text style={styles.value}>{formatDate(data.dataAdmissao)}</Text>

          <Text style={styles.label}>Data fim do contrato</Text>
          <Text style={styles.value}>{formatDate(data.dataFimContrato)}</Text>

          <Text style={styles.label}>Margem cartão de crédito</Text>
          <Text style={styles.value}>{formatCurrency(data.margemCartao)}</Text>
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.label}>Secretaria</Text>
          <Text style={styles.value}>{data.orgao}</Text>

          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>{data.status}</Text>

          <Text style={styles.label}>Data de nascimento</Text>
          <Text style={styles.value}>{formatDate(data.dataNascimento)}</Text>

          <Text style={styles.label}>Margem consignado</Text>
          <Text style={styles.value}>{formatCurrency(data.margem)}</Text>
        </View>
      </View>
    </View>
  );
};

// ... styles permanecem iguais

const styles = StyleSheet.create({
  header: { backgroundColor: '#17404A', padding: 16, paddingTop: 56 },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  greeting: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cpf: { color: '#fff', fontSize: 14 },
  infoGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  infoCol: { flex: 1, marginRight: 8 },
  label: { color: '#B0C4C8', fontSize: 12 },
  value: { color: '#fff', fontSize: 13, marginBottom: 6 },
});

export default HeaderUsuario;