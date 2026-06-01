// TODO: escolher um tema e personalizar os dados e estilizacao desta tela
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PerfilScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Perfil</Text>
      </View>

      <View style={styles.cartao}>
        {/* TODO: personalizar o avatar com a inicial do nome do usuario */}
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>M</Text>
        </View>
        {/* TODO: personalizar nome e e-mail */}
        <Text style={styles.nome}>Mônica</Text>
        <Text style={styles.email}>monica@email.com</Text>

        <View style={styles.separador} />

        {/* TODO: substituir pelas estatisticas que fazem sentido no seu tema */}
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Itens salvos</Text>
          <Text style={styles.infoValor}>2</Text>
        </View>
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Itens favoritos</Text>
          <Text style={styles.infoValor}>4</Text>
        </View>
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Membro desde</Text>
          <Text style={styles.infoValor}>Maio 2026</Text>
        </View>
      </View>

      {/* TODO: mudar o texto do botao para o contexto do seu tema */}
      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Editar perfil</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// TODO: estilizar com as cores e identidade visual do seu tema
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F1EA",
  },
  header: {
    backgroundColor: "#631A24",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#F4F1EA",
  },
  cartao: {
    margin: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#3D2621",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#C59B4E",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#631A24",
    marginBottom: 16,
  },
  avatarTexto: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#F4F1EA",
  },
  nome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3D2621",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#4A5343",
    marginBottom: 20,
  },
  separador: {
    width: "100%",
    height: 1,
    backgroundColor: "#F4F1EA",
    marginBottom: 16,
  },
  infoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#4A5343",
  },
  infoValor: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3D2621",
  },
  botao: {
    marginHorizontal: 16,
    backgroundColor: "#3D2621",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  botaoTexto: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#F4F1EA",
  },
});
