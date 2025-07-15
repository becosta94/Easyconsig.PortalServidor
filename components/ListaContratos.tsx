import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import ContractCard from '@/components/ContratoCard';

export type Contract = {
  cdBaseConsignacao: string;
  contractNumber: string;
  service: string;
  valorParcela: string;
  valorSuspenso: string;
  parcelaAtual: string;
  quantidadeParcelas: string;
  dtInclusao: string;
  dtFinalizacao: string;
};

export type ContractListProps = {
  contractsUser: Contract[];
};

const ListaContratos: React.FC<ContractListProps> = ({ contractsUser }) => (
  <FlatList
    data={contractsUser}
    keyExtractor={(item, index) => item.cdBaseConsignacao + index}
    renderItem={({ item }) => {
      return <ContractCard {...item} />;
    }}
    style={{ flex: 1 }}
    showsVerticalScrollIndicator={true}
    contentContainerStyle={{ paddingBottom: 20 }}
  />
);

export default ListaContratos;