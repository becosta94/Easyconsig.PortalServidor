import React from 'react';
import { ScrollView, View } from 'react-native';
import PropostaCard, { Proposta } from './PropostaCard';

type ListaPropostasProps = {
  propostas: Proposta[];
  onAccept?: (cdPropostaEmprestimo: string) => void;
};

const ListaPropostas: React.FC<ListaPropostasProps> = ({ propostas, onAccept }) => (
  <ScrollView style={{ flex: 1 }}>
    {propostas.map((p, idx) => (
      <PropostaCard
        key={idx}
        {...p}
        onAccept={() => onAccept?.(p.cdPropostaEmprestimo)}
      />
    ))}
    <View style={{ height: 40 }} />
  </ScrollView>
);

export default ListaPropostas;