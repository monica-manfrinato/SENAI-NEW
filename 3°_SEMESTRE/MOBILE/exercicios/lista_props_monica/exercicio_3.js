import { View, Text, StyleSheet } from "react-native";

export default function Saudacao({nome}){ 
    return(
        <View>
             <Text>Olá, {nome}! Bem-vindo(a)</Text>
        </View>
    )
}