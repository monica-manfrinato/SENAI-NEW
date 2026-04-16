import { View, Text, StyleSheet } from "react-native";


// export default function CartaoPerfil(){
//     return(
//         <View>
//             <Text>Nome: ???</Text>
//             <Text>Idade: ???</Text>

//         </View>
//     )
// }


export default function CartaoPerfil({nome, idade}){ {/*tem que colocar como paramentro */}
    return(
        <View>
             <Text>Nome: {nome}</Text> {/*props.nome da varíavel que vai se modificar nos elementos */}
            <Text>Idade: {idade}</Text>

        </View>
    )
}