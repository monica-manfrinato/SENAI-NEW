import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView, Text } from "react-native";

import ExercicioView01 from "./exercicio_flex_box/exercicio_1";
import ExercicioView02 from "./exercicio_flex_box/exercicio_2";
import ExercicioView03 from "./exercicio_flex_box/exercicio_3";
import ExercicioView04 from "./exercicio_flex_box/exercicio_4";
import ExercicioView05 from "./exercicio_flex_box/exercicio_5";
import ExercicioView06 from "./exercicio_flex_box/exercicio_6";
import ExercicioView07 from "./exercicio_flex_box/exercicio_7";
import ExercicioView08 from "./exercicio_flex_box/exercicio_8";
import ExercicioView09 from "./exercicio_flex_box/exercicio_9";
import ExercicioView10 from "./exercicio_flex_box/exercicio_10";
import Exemplo03 from "./jsx_examples/exemplo_03_condicionais";
import Treino01 from "./treino_avaliacao/exercicio_01";
import Treino02 from "./treino_avaliacao/exercicio_02";
import Somativa01 from "./avaliacao_somativa/exercicio_12";
import Somativa02 from "./avaliacao_somativa/exercicio_13";
import CartaoPerfil from "./basic_components/props/CartaoPerfil";
import CardProduto from "./basic_components/props/exercicio_1";
import CartaoUsuario from "./basic_components/props/exercicio_2";
import Saudacao from "./basic_components/props/exercicio_3";
import PerfilAluno from "./basic_components/props/exercicio_4";
import Botao from "./basic_components/props/desafio";

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Lista props - Mônica Cotrim Manfinato</Text>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Exemplos aula</Text>
        <CartaoPerfil nome="Ana" idade={22}/>
        <CartaoPerfil nome="Bruno" idade={19}/>
        <CartaoPerfil nome="Carla" idade={25}/>
      </View>


      <View style={styles.card}>
        <Text style={styles.subtitulo}>Exercício 1</Text>
        <CardProduto produto="Banana" preco={6.90}/>
        <CardProduto produto="Estojo" preco={19}/>
      </View>


      <View style={styles.card}>
        <Text style={styles.subtitulo}>Exercício 2</Text>
        <CartaoUsuario nome="Mônica Manfrinato" email="monica.manfrinato@gmail.com"/>
        <CartaoUsuario nome="Davi Manfrinato" email="davi.manfrinato@gmail.com"/>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Exercício 3</Text>
        <Saudacao nome = "Júlia"/>
        <Saudacao nome = "Maria"/>
        <Saudacao nome = "Pedro"/>

      </View>


      <View style={styles.card}>
        <Text style={styles.subtitulo}>Exercício 4</Text>
        <PerfilAluno nome = "Carlos" turma = "DS-2025" matricula="00123"/>
        <PerfilAluno produto="Estojo" preco={19}/>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitulo}>Desafio</Text>
        <Botao titulo = "Entrar"/>
        <Botao titulo = "Sair"/>
        <Botao titulo = "Cadastrar"/>

      </View>
    </ScrollView>

  );

}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 60 },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#212121",
  },

    subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#212121",
  },

  card: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1565C0",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 8,
  },
  texto: { fontSize: 14, color: "#424242", lineHeight: 22 },
});
