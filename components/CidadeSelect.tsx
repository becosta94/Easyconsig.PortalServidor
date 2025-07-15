import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

type CidadeSelectProps = {
  cidade: string;
  setCidade: React.Dispatch<React.SetStateAction<string>>;
  cidadeError: string;
  setCidadeError: React.Dispatch<React.SetStateAction<string>>;
};

const CidadeSelect: React.FC<CidadeSelectProps> = ({
  cidade,
  setCidade,
  cidadeError,
  setCidadeError,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.row}>
      <Ionicons name="location-outline" size={22} color="#2D2D2F" style={styles.icon} />
      <View style={{ flex: 1 }}>
        <DropDownPicker
          open={open}
          value={cidade}
          setOpen={setOpen}
          setValue={setCidade}
          items={[
            { label: 'Garopaba', value: 'TesteGaropaba' },
            { label: 'Icara', value: 'TesteIcara' },
            // ...adicione mais cidades aqui
          ]}
          placeholder="Selecione a cidade"
          style={{
            borderColor: cidadeError ? '#E53935' : '#EBEBEC',
            borderRadius: 24,
            backgroundColor: '#EBEBEC',
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
  );
};

export default CidadeSelect;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30, // igual ao seu inputContainer
  },
  icon: {
    marginRight: 8,
    marginLeft: 8,
  },
});