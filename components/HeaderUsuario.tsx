// components/HeaderUsuario.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export type HeaderUsuarioProps = {
  nome: string;
  cpf: string;
  avatarUrl: string;
  infoEsquerda: { label: string; value: string }[];
  infoDireita: { label: string; value: string }[];
};

const HeaderUsuario: React.FC<{ data: HeaderUsuarioProps }> = ({ data }) => (
  <View style={styles.header}>
    <View style={styles.profileRow}>
      <Image source={{ uri: data.avatarUrl }} style={styles.avatar} />
      <View>
        <Text style={styles.greeting}>Olá, {data.nome}</Text>
        <Text style={styles.cpf}>{data.cpf}</Text>
      </View>
    </View>
    <View style={styles.infoGrid}>
      <View style={styles.infoCol}>
        {data.infoEsquerda.map((item, idx) => (
          <React.Fragment key={idx}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </React.Fragment>
        ))}
      </View>
      <View style={styles.infoCol}>
        {data.infoDireita.map((item, idx) => (
          <React.Fragment key={idx}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </React.Fragment>
        ))}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: { backgroundColor: '#17404A', padding: 16, paddingTop: 56 },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  greeting: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cpf: { color: '#fff', fontSize: 14 },
  infoGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  infoCol: { flex: 1, marginRight: 8 },
  label: { color: '#B0C4C8', fontSize: 12 },
  value: { color: '#fff', fontSize: 13, marginBottom: 6 },
});

export default HeaderUsuario;