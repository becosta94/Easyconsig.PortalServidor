import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type ContractCardProps = {
  contractNumber: string;
  service: string;
  valorParcela: string;
  valorSuspenso: string;
  parcelaAtual: string;
  quantidadeParcelas: string;
  dtInclusao: string;
  dtFinalizacao: string;
  expanded?: boolean;
};

const ContratoCard: React.FC<ContractCardProps> = ({
  contractNumber,
  service,
  valorParcela,
  valorSuspenso,
  parcelaAtual,
  quantidadeParcelas,
  dtInclusao,
  dtFinalizacao,
  expanded: expandedProp = false,
}) => {
  const [expanded, setExpanded] = useState(expandedProp);
  const formatDateOnly = (dateTimeString: string) => {
    if (!dateTimeString || dateTimeString === "0001-01-01T00:00:00") return "-";
    const [year, month, day] = dateTimeString.split('T')[0].split('-');
    return `${day}-${month}-${year}`;
  };
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => setExpanded((prev) => !prev)}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerCol}>
          <Text style={styles.label}>Nº Contrato</Text>
          <Text style={styles.value}>{contractNumber}</Text>
        </View>
        <View style={styles.headerCol}>
          <Text style={styles.label}>Serviço</Text>
          <Text style={styles.value}>{service}</Text>
        </View>
        <View style={styles.headerCol}>
          <Text style={styles.label}>Evento valor</Text>
          <Text style={styles.value}>
            R$ {valorParcela && !isNaN(parseFloat(valorParcela))
              ? parseFloat(valorParcela).toFixed(2).replace('.', ',')
              : '0,00'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => setExpanded((prev) => !prev)}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={32}
            color="#5A8A97"
          />
        </TouchableOpacity>
      </View>
      {expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.expandedCol}>
            <Text style={styles.label}>Valor suspenso</Text>
            <Text style={styles.value}>
              R$ {valorSuspenso && !isNaN(parseFloat(valorSuspenso))
                ? parseFloat(valorSuspenso).toFixed(2).replace('.', ',')
                : '0,00'}
            </Text>
          </View>
          <View style={styles.expandedCol}>
            <Text style={styles.label}>Parcela</Text>
            <Text style={styles.value}>{parcelaAtual}</Text>
          </View>
          <View style={styles.expandedCol}>
            <Text style={styles.label}>Prazo</Text>
            <Text style={styles.value}>{quantidadeParcelas}</Text>
          </View>
          <View style={styles.expandedCol}>
            <Text style={styles.label}>Data inclusão</Text>
            <Text style={styles.value}>{formatDateOnly(dtInclusao)}</Text>
          </View>
          <View style={styles.expandedCol}>
            <Text style={styles.label}>Data finalização</Text>
            <Text style={styles.value}>{formatDateOnly(dtFinalizacao)}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    position: 'relative',
  },
  headerCol: {
    flex: 1,
    marginRight: 8,
  },
  label: { color: '#757575', fontSize: 13 },
  value: { color: '#17404A', fontSize: 13, fontWeight: 'bold', marginBottom: 4 },
  expandIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: 22,
    color: '#5A8A97',
  },
  expandedContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  expandedCol: {
    width: '32%',
    marginBottom: 8,
  },
  expandButton: {
    position: 'absolute',
    right: -10,
    top: 0,
    padding: 4,
    zIndex: 2,
  },
});

export default ContratoCard;