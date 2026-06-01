import { Text, View, StyleSheet } from "react-native";

// Passe os parametros de forma correta e realize a estilização do componente
export default function CardJogo({ titulo, genero, plataforma, nota }) {
  return (
    <View>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.genero}>{genero}</Text>
      <Text style={styles.plataforma}>{plataforma}</Text>
      <Text style={styles.nota}>{nota}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3D2621',
    marginBottom: 6,
    letterSpacing: 0.5,
  },

  genero: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5343',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },

  plataforma: {
    fontSize: 14,
    color: '#3D2621',
    marginBottom: 6,
  },

  nota: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C59B4E',
    marginTop: 4,
  },
});
