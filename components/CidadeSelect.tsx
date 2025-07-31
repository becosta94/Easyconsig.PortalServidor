import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { apiRequest } from '@/services/apiService'; // Importe sua função de API

type CidadeSelectProps = {
  cidade: string;
  setCidade: React.Dispatch<React.SetStateAction<string>>;
  cidadeError: string;
  setCidadeError: React.Dispatch<React.SetStateAction<string>>;
  backgroundColor?: string;
};

// Tipo para os itens do dropdown
type CidadeItem = {
  label: string;
  value: string;
};

const CidadeSelect: React.FC<CidadeSelectProps> = ({
  cidade,
  setCidade,
  cidadeError,
  setCidadeError,
  backgroundColor = '#EBEBEC',
}) => {
  const [open, setOpen] = useState(false);
  const [cidades, setCidades] = useState<CidadeItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Buscar cidades da API quando o componente for montado
  useEffect(() => {
    const fetchCidades = async () => {
      try {
        setLoading(true);
        const response: string[] = await apiRequest('/Auth/cidades', 'GET'); // Ajuste a URL conforme sua API

        // Mapear a resposta da API (lista de strings) para o formato esperado pelo DropDownPicker
        const cidadesFormatadas = response.map((nomeCidade: string) => ({
          label: nomeCidade,
          value: nomeCidade,
        }));

        setCidades(cidadesFormatadas);
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCidades();
  }, []);

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: cidadeError ? '#E53935' : '#EBEBEC',
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <Ionicons name="location-outline" size={22} color="#2D2D2F" style={styles.icon} />
        <View style={{ flex: 1 }}>
          <DropDownPicker
            open={open}
            value={cidade}
            setOpen={setOpen}
            setValue={setCidade}
            items={cidades}
            placeholder={loading ? "Carregando cidades..." : "Selecione a cidade"}
            disabled={loading}
            style={{
              borderWidth: 0, // Remove a borda do DropDownPicker
              backgroundColor: 'transparent', // Deixe transparente para herdar do container
              minHeight: 48,
            }}
            placeholderStyle={{
              color: '#A0A0A0',
            }}
            dropDownContainerStyle={{
              borderColor: cidadeError ? '#E53935' : '#EBEBEC',
              borderRadius: 16,
            }}
            textStyle={{
              color: cidadeError ? '#E53935' : '#2D2D2F',
              fontSize: 16,
            }}
            onChangeValue={value => {
              if (value) setCidadeError('');
            }}
            zIndex={1000}
          />
        </View>
      </View>
    </View>
  );
};

export default CidadeSelect;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EBEBEC', // ou use a cor do erro se necessário
    borderRadius: 24,
    backgroundColor: '#EBEBEC', // ou use a prop backgroundColor
    minHeight: 48,
    paddingHorizontal: 8,
    flex: 1,
  },
  icon: {
    marginRight: 8,
    marginLeft: 8,
  },
});