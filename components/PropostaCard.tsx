import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getFlagAceite } from "../services/authStorageService";

export type Proposta = {
  dtProposta: string;
  tipoServico: string;
  vlPrestacao: string;
  dtAceite: string;
  quantidadeParcelas: string;
  consignataria: string;
  cdPropostaEmprestimo: string;
};

type PropostaCardProps = Proposta & {
  onAccept?: () => void;
};
const formatDateOnly = (dateTimeString: string) => {
  if (!dateTimeString || dateTimeString === "0001-01-01T00:00:00") return "-";
  const [year, month, day] = dateTimeString.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};

const PropostaCard: React.FC<PropostaCardProps> = ({
  dtProposta,
  tipoServico,
  vlPrestacao,
  dtAceite,
  quantidadeParcelas,
  consignataria,
  onAccept,
}) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const value = await getFlagAceite();
        setShowButton(value === 'S');
      } catch (e) {
        setShowButton(false);
      }
    };
    fetchFlag();
  }, []);
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Data proposta</Text>
          <Text style={styles.value}>{formatDateOnly(dtProposta)}</Text>
          <Text style={styles.label}>Data aceite</Text>
          <Text style={styles.value}>{formatDateOnly(dtAceite)}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Serviço</Text>
          <Text style={styles.value}>{tipoServico}</Text>
          <Text style={styles.label}>Consignatária</Text>
          <Text style={styles.value}>{consignataria}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Evento valor</Text>
          <Text style={styles.value}>
            R$ {vlPrestacao && !isNaN(parseFloat(vlPrestacao))
              ? parseFloat(vlPrestacao).toFixed(2).replace('.', ',')
              : '0,00'}
          </Text>
          <Text style={styles.label}>Prazo</Text>
          <Text style={styles.value}>{quantidadeParcelas}</Text>
        </View>
      </View>
      {!dtAceite && showButton && (
        <TouchableOpacity style={styles.button} onPress={onAccept}>
          <Text style={styles.buttonText}>ACEITAR</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

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