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
  titulo: {},

  genero: {},

  plataforma: {},

  nota: {},
});
