import React from 'react';
import { ScrollView } from 'react-native';
import PropostaCard, { Proposta } from './PropostaCard';

type ListaPropostasProps = {
  propostas: Proposta[];
  onAccept?: (index: number) => void;
};

const ListaPropostas: React.FC<ListaPropostasProps> = ({ propostas, onAccept }) => (
  <ScrollView style={{ flex: 1 }}>
    {propostas.map((p, idx) => (
      <PropostaCard key={idx} {...p} onAccept={() => onAccept?.(idx)} />
    ))}
  </ScrollView>
);

export default ListaPropostas;