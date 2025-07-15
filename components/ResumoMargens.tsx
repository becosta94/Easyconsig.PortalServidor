import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderUsuarioProps } from './HeaderUsuario';

const ResumoCards: React.FC<{ data: HeaderUsuarioProps }> = ({ data }) => {
  // Exemplo de uso dos dados recebidos:
  // Você pode formatar os valores conforme necessário
  const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;

  return (
    <View style={styles.cardsRow}>
      <View style={styles.card}>
        <Text style={styles.cardIcon}>📋</Text>
        <Text style={styles.cardTitle}>Consignado</Text>
        <Text style={styles.cardValue}>{formatCurrency(data.margem)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardIcon}>💳</Text>
        <Text style={styles.cardTitle}>Crédito</Text>
        <Text style={styles.cardValue}>{formatCurrency(data.margemCartao)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardIcon}>🎁</Text>
        <Text style={styles.cardTitle}>Benefício</Text>
        <Text style={styles.cardValue}>{formatCurrency(data.margemReservada)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardIcon: { fontSize: 28, marginBottom: 4 },
  cardTitle: { fontWeight: 'bold', fontSize: 14, marginBottom: 2 },
  cardValue: { fontSize: 14, color: '#17404A' },
});

export default ResumoCards;