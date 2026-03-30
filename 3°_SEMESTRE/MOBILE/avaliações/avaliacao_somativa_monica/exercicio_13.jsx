import { StyleSheet, Text, View } from "react-native";

export default function Somativa01() {
  return <View style={styles.container}>

    <View style={styles.header}><Text style = {styles.textStyle}>Header</Text></View>

    <View style={styles.body}>

        <View style={styles.sidebar}><Text style = {styles.textStyle}>Side</Text></View>

        <View style ={styles.areaPrincipal}>
            <View style={styles.secaoSuperior}>
                <View style={styles.greenCard}><Text style = {styles.textStyle}>Verde</Text></View>
                <View style={styles.blueCard}><Text style = {styles.textStyle}>Azul</Text></View>
            </View>

            <View style={styles.divisorCircular}/>

            <View style={styles.secaoInferior}>
                <View style={styles.redCard}><Text style = {styles.textStyle}>Vermelho</Text></View>
                <View style={styles.orangeCard}><Text style = {styles.textStyle}>Laranja</Text></View>
                <View style={styles.purpleCard}><Text style = {styles.textStyle}>Roxo</Text></View>
            </View>

        </View>
    </View>

    <View style={styles.footer}><Text style = {styles.textStyle}>Footer</Text></View>

  </View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding:8,
    gap:8,
    flexDirection:'column',
    backgroundColor:'#1a1a1a'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },

  header:{
    height: 60,
    backgroundColor:'#2c3e50',
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8
  },

    body:{
        flexDirection:'row',
        flex:1,
        gap:8
    },
    
    sidebar:{
        width:80,
        backgroundColor:'#95a5a6',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8
    },

    areaPrincipal:{
        flexDirection:'column',
        flex:1,
        gap:8
    },

  secaoSuperior:{
    flex:1,
    flexDirection:'row',
    gap:8
    },

  greenCard: {
    backgroundColor: "green",
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:4,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8

  },

  blueCard: {
    backgroundColor: "blue",
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:4,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8

  },

  divisorCircular:{
    width:50,
    height:50,
    borderRadius:25,
    backgroundColor:'#34495e',
    alignSelf:'center'
  },

  secaoInferior:{
    flex:1,
    flexDirection:'row',
    gap:8
    },

  redCard: {
    backgroundColor: "red",
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:4,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8

  },

  orangeCard: {
    backgroundColor: "orange",
    flex:2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:4,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8

  },
  purpleCard: {
    backgroundColor: "purple",
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:4,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8

  },

  footer:{
    width:'100%',
    height:50,
    backgroundColor:'#2c3e50',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8
  },

})