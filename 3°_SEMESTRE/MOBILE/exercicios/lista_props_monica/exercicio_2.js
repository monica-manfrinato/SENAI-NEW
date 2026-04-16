import { View, Text, StyleSheet } from "react-native";

export default function CartaoUsuario({nome, email}){ 
    return(
        <View>
             <Text>Nome: {nome}</Text>
            <Text>Email: {email}</Text>

        </View>
    )
}