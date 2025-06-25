import HeaderUsuario from '@/components/HeaderUsuario';
import ListaContratos, { Contract } from '@/components/ListaContratos';
import ListaPropostas from '@/components/ListaPropostas';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder, Dimensions } from 'react-native';
import type { HeaderUsuarioProps } from '@/components/HeaderUsuario';
import ResumoCards from '@/components/ResumoMargens';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SNAP_TOP = SCREEN_HEIGHT * 0.14;
const SNAP_BOTTOM = SCREEN_HEIGHT * 0.40;
const mainContentHeight = SCREEN_HEIGHT * 0.83;

const contracts: Contract[] = [
  {
    contractNumber: "45773889",
    service: "Empréstimo",
    eventValue: "R$350,00",
    valorSuspenso: "0,00",
    parcela: "43",
    prazo: "exe",
    dataInclusao: "10/03/2025",
    dataFinalizacao: "05/06/2025",
  },
  {
    contractNumber: "23452345",
    service: "Teste",
    eventValue: "R$450,32",
    valorSuspenso: "0,00",
    parcela: "43",
    prazo: "exe",
    dataInclusao: "23/05/2025",
    dataFinalizacao: "14/08/2025",
  },
  {
    contractNumber: "23452345",
    service: "Teste",
    eventValue: "R$450,32",
    valorSuspenso: "0,00",
    parcela: "43",
    prazo: "exe",
    dataInclusao: "23/05/2025",
    dataFinalizacao: "14/08/2025",
  },
  {
    contractNumber: "23452345",
    service: "Teste",
    eventValue: "R$450,32",
    valorSuspenso: "0,00",
    parcela: "43",
    prazo: "exe",
    dataInclusao: "23/05/2025",
    dataFinalizacao: "14/08/2025",
  },
  {
    contractNumber: "23452345",
    service: "Teste",
    eventValue: "R$200,32",
    valorSuspenso: "0,00",
    parcela: "43",
    prazo: "exe",
    dataInclusao: "23/05/2025",
    dataFinalizacao: "14/08/2025",
  },

  {
    contractNumber: "23452345",
    service: "Teste",
    eventValue: "R$300,32",
    valorSuspenso: "0,00",
    parcela: "43",
    prazo: "exe",
    dataInclusao: "23/05/2025",
    dataFinalizacao: "14/08/2025",
  },

  {
    contractNumber: "23452345",
    service: "Teste",
    eventValue: "R$500,32",
    valorSuspenso: "0,00",
    parcela: "43",
    prazo: "exe",
    dataInclusao: "23/05/2025",
    dataFinalizacao: "14/08/2025",
  },
];

const propostas = [
  {
    dataProposta: "10/03/2025",
    service: "Empréstimo",
    eventValue: "R$200,00",
    valorSuspenso: "50,00",
    parcela: "43",
    prazo: "exe",
  },
  {
    dataProposta: "10/03/2025",
    service: "Empréstimo",
    eventValue: "R$200,00",
    valorSuspenso: "50,00",
    parcela: "43",
    prazo: "exe",
  },
  {
    dataProposta: "10/03/2025",
    service: "Empréstimo",
    eventValue: "R$200,00",
    valorSuspenso: "50,00",
    parcela: "43",
    prazo: "exe",
  },
  {
    dataProposta: "10/03/2025",
    service: "Empréstimo",
    eventValue: "R$200,00",
    valorSuspenso: "50,00",
    parcela: "43",
    prazo: "exe",
  },
  {
    dataProposta: "10/03/2025",
    service: "Empréstimo",
    eventValue: "R$200,00",
    valorSuspenso: "50,00",
    parcela: "43",
    prazo: "exe",
  },

];
const headerData: HeaderUsuarioProps = {
  nome: "Joana Souza",
  cpf: "000.000.000-00",
  avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  infoEsquerda: [
    { label: 'Matrícula', value: 'exemplo' },
    { label: 'Vínculo empregatício', value: 'exemplo' },
    { label: 'Data de admissão', value: 'exemplo' },
    { label: 'Data fim do contrato', value: 'exemplo' },
    { label: 'Margem cartão de crédito', value: 'exemplo' },
  ],
  infoDireita: [
    { label: 'Secretaria', value: 'exemplo' },
    { label: 'Status', value: 'exemplo' },
    { label: 'Data de nascimento', value: 'exemplo' },
    { label: 'Margem consignado', value: 'exemplo' },
  ],
};


export default function Home() {
  const translateY = useRef(new Animated.Value(SNAP_BOTTOM)).current;
  const lastTranslateY = useRef(SNAP_BOTTOM); // Armazena a última posição
  const [activeTab, setActiveTab] = useState<'CONSIGNACOES' | 'PROPOSTAS'>('CONSIGNACOES');
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const touchY = evt.nativeEvent.locationY;
        const handleHeight = 50; // Exemplo: 50 pixels
        const isTouchInHandleArea = touchY < handleHeight;
        return isTouchInHandleArea && Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        translateY.stopAnimation((value) => {
          lastTranslateY.current = value;
        });
      },
      onPanResponderMove: (_, gestureState) => {
        let newY = lastTranslateY.current + gestureState.dy;
        if (newY < SNAP_TOP) newY = SNAP_TOP;
        if (newY > SNAP_BOTTOM) newY = SNAP_BOTTOM;
        translateY.setValue(newY);
      },
      onPanResponderRelease: (_, gestureState) => {
        let endY = lastTranslateY.current + gestureState.dy;
        if (endY < (SNAP_TOP + SNAP_BOTTOM) / 2) {
          Animated.spring(translateY, {
            toValue: SNAP_TOP,
            useNativeDriver: false,
            friction: 18,
            tension: 40,
          }).start(() => {
            lastTranslateY.current = SNAP_TOP;
          });
        } else {
          Animated.spring(translateY, {
            toValue: SNAP_BOTTOM,
            useNativeDriver: false,
            friction: 18,
            tension: 40,
          }).start(() => {
            lastTranslateY.current = SNAP_BOTTOM;
          });
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>

      <HeaderUsuario data={headerData} />

      <Animated.View
        style={[
          styles.mainContent,
          { transform: [{ translateY }], height: mainContentHeight }, 
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handle} />

        <ResumoCards />
        
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'CONSIGNACOES' && styles.tabActive]}
            onPress={() => setActiveTab('CONSIGNACOES')}
          >
            <Text style={activeTab === 'CONSIGNACOES' ? styles.tabTextActive : styles.tabText}>
              CONSIGNAÇÕES
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'PROPOSTAS' && styles.tabActive]}
            onPress={() => setActiveTab('PROPOSTAS')}
          >
            <Text style={activeTab === 'PROPOSTAS' ? styles.tabTextActive : styles.tabText}>
              PROPOSTAS
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'CONSIGNACOES' ? (
          <ListaContratos contracts={contracts} />
        ) : (
          <ListaPropostas propostas={propostas} onAccept={idx => alert(`Proposta ${idx + 1} aceita!`)} />
        )}

      </Animated.View >
    </View >
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#17404A' },
  mainContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    backgroundColor: '#F7F7F7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D9D9D9',
    marginBottom: 12,
  },
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
  tabsRow: { flexDirection: 'row', marginBottom: 8, marginTop: 8 },
  tab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#EDEDED',
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  tabActive: {
    backgroundColor: '#fff',
    borderColor: '#17404A',
    borderWidth: 1,
  },
  tabText: { color: '#17404A', fontWeight: 'bold' },
  tabTextActive: { color: '#17404A', fontWeight: 'bold' },
});