import { View, Text, StyleSheet } from "react-native";

export default function PerfilAluno({nome, turma, matricula}){ 
    return(
        <View>
             <Text>Nome: {nome}</Text>
            <Text>Turma: {turma}</Text>
            <Text>Matrícula: {matricula}</Text>

        </View>
    )
}