import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ContractCardProps = {
  contractNumber: string;
  service: string;
  eventValue: string;
  valorSuspenso: string;
  parcela: string;
  prazo: string;
  dataInclusao: string;
  dataFinalizacao: string;
  expanded?: boolean;
};

const ContratoCard: React.FC<ContractCardProps> = ({
  contractNumber,
  service,
  eventValue,
  valorSuspenso,
  parcela,
  prazo,
  dataInclusao,
  dataFinalizacao,
  expanded: expandedProp = false,
}) => {
  const [expanded, setExpanded] = useState(expandedProp);

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
          <Text style={styles.value}>{eventValue}</Text>
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
            <Text style={styles.value}>{valorSuspenso}</Text>
          </View>
          <View style={styles.expandedCol}>
            <Text style={styles.label}>Parcela</Text>
            <Text style={styles.value}>{parcela}</Text>
          </View>
          <View style={styles.expandedCol}>
            <Text style={styles.label}>Prazo</Text>
            <Text style={styles.value}>{prazo}</Text>
          </View>
          <View style={styles.expandedCol}>
            <Text style={styles.label}>Data inclusão</Text>
            <Text style={styles.value}>{dataInclusao}</Text>
          </View>
          <View style={styles.expandedCol}>
            <Text style={styles.label}>Data finalização</Text>
            <Text style={styles.value}>{dataFinalizacao}</Text>
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