import { View, Text, StyleSheet, TextInput, Alert, Button } from "react-native"; //importando os elementos que serão utilizados nesse código
import { useEffect, useState } from "react";

export default function TelaMoeda(){

    const [moedas, setMoedas] = useState(0)
    //useEffect(() => {}, []) ---> MODELO BASE DO USE EFECT
    useEffect(() => {
        console.log('Executou!')
        if (moedas === 5){
            Alert.alert("Sucesso, você desbloqueou o baú")
        }
    }, [moedas])

    return(
        <View style={styles.container}>
            <Text style={styles.texto}>Moedas coletadas: {moedas}</Text>
            <Button title="Pegar moeda" onPress={() => setMoedas(moedas + 1)}/>
        </View>
    )
}

const styles = StyleSheet.create({
container: { flex: 1, justifyContent: "center", alignItems: "center" },
texto: { fontSize: 24, marginBottom: 20 },
});