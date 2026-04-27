import { View, Text, StyleSheet, TouchableOpacity } from "react-native"; //importando os elementos que serão utilizados nesse código
import { useState } from "react";

//exportação da função
export default function ContadorExample(){
    const [contador, setContador] = useState(0) //declarando a variável de estado e a função = importação do useState (valor padrão é 0)

    return(
      <View style={styles.container}> 
        <Text>{contador}</Text>
        {/* Botão possuí alguns parâmetros: 'onPress' = indica quando q o botão vai funcionar, nesse caso ao ser pressionado */}

         <TouchableOpacity onPress={() =>setContador((prev) => prev + 1)} style={styles.button}> {/* prev significa previous, ou seja, depende do valor anterior para realizar a soma */}
            <Text style={styles.text}>Clique para acrescentar o valor</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() =>setContador((prev) => prev - 1)} style={styles.button}> {/* prev significa previous, ou seja, depende do valor anterior para realizar a subtração */}
            <Text style={styles.text}>Clique para decrescer o valor</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() =>setContador((prev) => prev = 0)} style={styles.button}> {/* prev significa previous, ou seja, depende do valor anterior para realizar o reset */}
            <Text style={styles.text}>Clique para resetar o valor</Text>
        </TouchableOpacity>
      </View>  
    )
}

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: "center",
justifyContent: "center",
},

button: {
backgroundColor: "#4285f4",
padding: 12,
borderRadius: 8,
marginTop: 16,
},

text: {
color: "#fff",
},
});