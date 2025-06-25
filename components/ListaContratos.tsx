import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import ContractCard from '@/components/ContratoCard';

export type Contract = {
  contractNumber: string;
  service: string;
  eventValue: string;
  valorSuspenso: string;
  parcela: string;
  prazo: string;
  dataInclusao: string;
  dataFinalizacao: string;
};

type ContractListProps = {
  contracts: Contract[];
};

const ListaContratos: React.FC<ContractListProps> = ({ contracts }) => (
  <FlatList
    data={contracts}
    keyExtractor={(item, index) => item.contractNumber + index}
    renderItem={({ item }) => {
      return <ContractCard {...item} />;
    }}
    style={{ flex: 1 }}
    showsVerticalScrollIndicator={true}
    contentContainerStyle={{ paddingBottom: 20 }}
  />
);

export default ListaContratos;