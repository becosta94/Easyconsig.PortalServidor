import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export type Proposta = {
  dataProposta: string;
  service: string;
  eventValue: string;
  valorSuspenso: string;
  parcela: string;
  prazo: string;
};

type PropostaCardProps = Proposta & {
  onAccept?: () => void;
};

const PropostaCard: React.FC<PropostaCardProps> = ({
  dataProposta,
  service,
  eventValue,
  valorSuspenso,
  parcela,
  prazo,
  onAccept,
}) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <View style={styles.col}>
        <Text style={styles.label}>Data proposta</Text>
        <Text style={styles.value}>{dataProposta}</Text>
        <Text style={styles.label}>Valor suspenso</Text>
        <Text style={styles.value}>{valorSuspenso}</Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>Serviço</Text>
        <Text style={styles.value}>{service}</Text>
        <Text style={styles.label}>Parcela</Text>
        <Text style={styles.value}>{parcela}</Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>Evento valor</Text>
        <Text style={styles.value}>{eventValue}</Text>
        <Text style={styles.label}>Prazo</Text>
        <Text style={styles.value}>{prazo}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.button} onPress={onAccept}>
      <Text style={styles.buttonText}>ACEITAR</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  row: { flexDirection: 'row', marginBottom: 10 },
  col: { flex: 1, marginRight: 8 },
  label: { color: '#757575', fontSize: 13 },
  value: { color: '#17404A', fontSize: 13, fontWeight: 'bold', marginBottom: 4 },
  button: {
    backgroundColor: '#4CA1AF',
    borderRadius: 4,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});

export default PropostaCard;