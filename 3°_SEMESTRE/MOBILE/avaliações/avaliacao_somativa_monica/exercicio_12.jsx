import { StyleSheet, Text, View } from "react-native";

export default function Somativa01() {
  return <View style={styles.container}>

    <View style={styles.linhaTopo}>
        <View style={styles.yellowColumn}> <Text style={styles.textStyle}>Amarelo</Text></View>
        <View style={styles.blueColumn}> <Text style={styles.textStyle}>Azul Escuro</Text></View>
    </View>

    <View style={styles.areaCentral}>
        <View style={styles.greenColumn}> <Text style={styles.textStyle}>Verde</Text></View>
        <View style ={styles.columnBlocos}>
            <View style={styles.pinkColumn}> <Text style={styles.textStyle}>Rosa</Text></View>
            <View style={styles.orangeColumn}> <Text style={styles.textStyle}>Laranja</Text></View>

        </View>
    </View>

    <View style={styles.linhaFundo}>
        <View style={styles.redColumn}> <Text style={styles.textStyle}>Vermelho</Text></View>
        <View style={styles.tealColumn}> <Text style={styles.textStyle}>Teal</Text></View>
        <View style={styles.purpleColumn}> <Text style={styles.textStyle}>Roxo</Text></View>

    </View>
    
  </View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap:8,
    padding:8,
    flexDirection:'column'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },

  linhaTopo:{
    flexDirection:"row",
    height: 100,
    gap:8
  },


  yellowColumn: {
    backgroundColor: "yellow",
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:4

  },
  blueColumn: {
    backgroundColor: "darkblue",
    flex:3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:4

  },

  areaCentral:{
    flex:1,
    borderRadius:4,
    flexDirection:'row',
    gap:8
  },

  greenColumn:{
    backgroundColor:'green',
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius:4


  },

  columnBlocos:{
    flexDirection:'column',
    flex:1,
    gap:8
  },


  pinkColumn:{
    backgroundColor:'pink',
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius:4

  },

  orangeColumn:{
    backgroundColor:'orange',
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius:4

  },

  linhaFundo: {
    flexDirection:"row",
    height:90,
    gap: 8
  },

  redColumn:{
    backgroundColor: "red",
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:4
  },

  tealColumn:{
    backgroundColor: "teal",
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:4
  },

    purpleColumn:{
    backgroundColor:"purple",
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:4
  },
});