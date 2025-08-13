import HeaderUsuario from '@/components/HeaderUsuario';
import ListaContratos, { Contract } from '@/components/ListaContratos';
import ListaPropostas from '@/components/ListaPropostas';
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, PanResponder, Dimensions, Alert, RefreshControl, ScrollView } from 'react-native';
import type { HeaderUsuarioProps } from '@/components/HeaderUsuario';
import ResumoCards from '@/components/ResumoMargens';
import { apiRequest } from '@/services/apiService';
import { Proposta } from '@/components/PropostaCard';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SNAP_TOP = SCREEN_HEIGHT * 0.14;
const SNAP_BOTTOM = SCREEN_HEIGHT * 0.41;
const mainContentHeight = SCREEN_HEIGHT * 0.83;



export default function Home() {
  const translateY = useRef(new Animated.Value(SNAP_BOTTOM)).current;
  const lastTranslateY = useRef(SNAP_BOTTOM); // Armazena a última posição
  const [activeTab, setActiveTab] = useState<'CONSIGNACOES' | 'PROPOSTAS'>('CONSIGNACOES');
  const [headerData, setHeaderData] = useState<HeaderUsuarioProps | null>(null);
  const [contractsUser, setContractsUser] = useState<Contract[] | null>(null);
  const [propostas, setpropostas] = useState<Proposta[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchHeaderData() {
    try {
      const response1 = await apiRequest('/Servidor/dados', `GET`) // coloque a URL correta aqui
      const response2 = await apiRequest('/Contratos', `GET`)
      const response3 = await apiRequest('/Propostas', `GET`)
      setHeaderData(response1);
      setContractsUser(response2);
      setpropostas(response3);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHeaderData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchHeaderData();
  }, []);

  async function handleAceitarProposta(id: string) {
    try {
      Alert.alert(
        'Confirmar aceite',
        `Deseja realmente aceitar a proposta?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Confirmar', onPress: async () => {
              const payload = { propostaId: id };
              console.log('response');
              try {
                await apiRequest('/Propostas/aceite', 'POST', payload);
                Alert.alert('Sucesso', 'Proposta aceita com sucesso!');
                await fetchHeaderData();

              } catch (error: any) {
                Alert.alert('Erro', error.message);
              }
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado.');
    }

  }

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
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {headerData ? (
          <HeaderUsuario data={headerData} />
        ) : (
          <Text style={{ color: '#fff', textAlign: 'center', marginTop: 40 }}>Carregando...</Text>
        )}
      </ScrollView>

      <Animated.View
        style={[
          styles.mainContent,
          { transform: [{ translateY }], height: mainContentHeight },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handle} />

        {headerData ? (
          <ResumoCards data={headerData} />
        ) : (
          <Text>Carregando resumo...</Text>
        )}

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
          contractsUser ? (
            <ListaContratos contractsUser={contractsUser} />
          ) : (
            <Text>Carregando resumo...</Text>)

        ) : (
          propostas ? (
            <ListaPropostas propostas={propostas} onAccept={idx => handleAceitarProposta(idx)} />
          ) : (
            <Text>Carregando resumo...</Text>)
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