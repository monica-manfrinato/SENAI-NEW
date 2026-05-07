// import { FlatList } from "react-native"



// //==================================================================

// <FlatList ListEmptyComponent>





import { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import Card from "./atv_lista_compras_card"


export default function ListaDeCompras(){

    const [item, setItem] = useState("")    
    const [digitado, setDigitado] = useState("")    

    const novoItem = {
        id: Date.now().toString(),
        nome: item
    }

    function handleAdicionar(){
        console.log("Nome:", item)
        setItem(digitado) //tira o nome do campo
        setDigitado("")
    }
return(
    <View style ={styles.container}>
        <Text style={styles.titulo}>teste</Text>
        <TextInput style={styles.input}
        placeholder="Digite o nome do produto"
        value={digitado}
        onChangeText={texto => setDigitado(texto)}/>

        <TouchableOpacity style={styles.botao} onPress={handleAdicionar}> <Text> Enviar </Text> </TouchableOpacity>

        <FlatList scrollEnabled={true}
            data={item} 
            keyExtractor={(item)=> item.id} 
            renderItem={({item}) => ( <Card nome={item.nome}/>)} />
    </View>

)}





const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
backgroundColor: "#f5f5f5",
},
titulo: {
fontSize: 20,
fontWeight: "bold",
marginBottom: 20,
},
subtitulo: {
fontSize: 14,
fontWeight: "bold",
color: "#a3c6ff",
marginBottom: 8,
},
exemplo: {
width: "80%",
padding: 16,
marginBottom: 16,
backgroundColor: "#fff",
borderRadius: 8,
},
input: {
borderWidth: 1,
borderColor: "#ddd",
borderRadius: 8,
padding: 12,
marginBottom: 8,
},
botao: {
backgroundColor: "#13356b",
padding: 12,
borderRadius: 8,
alignItems: "center",
marginTop: 4,
},
textoBotao: {
color: "#fff",
fontWeight: "bold",
},
});