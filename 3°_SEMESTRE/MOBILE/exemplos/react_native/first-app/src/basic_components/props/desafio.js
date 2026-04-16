import { View, Text,TouchableOpacity, StyleSheet } from "react-native";

export default function Botao({titulo}){ 
    return(
        <View>
             <TouchableOpacity style = {styles.buutton}>
                <Text style={styles.textstyle}> {titulo}</Text>
             </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingTop: 60 },
  buutton: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    backgroundColor: "#ff1313",
    height: 20,
    flex:1
  },

  textstyle:{
    color:"#ffff",
    fontStyle:"italic",
    fontWeight:"bold"
  }
})