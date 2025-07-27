import React from 'react';
import { FlatList, View } from 'react-native';
import ContractCard from '@/components/ContratoCard';

export type Contract = {
  cdBaseConsignacao: string;
  consignataria: string;
  tipoServico: string;
  valorParcela: string;
  valorSuspenso: string;
  totalParcelas: string;
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
    renderItem={({ item }) => <ContractCard {...item} />}
    style={{ flex: 1 }}
    showsVerticalScrollIndicator={true}
    contentContainerStyle={{ paddingBottom: 20 }}
    ListFooterComponent={<View style={{ height: 32 }} />}
  />
);

export default ListaContratos;