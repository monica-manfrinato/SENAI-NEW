import { View, Text, StyleSheet } from "react-native";

export default function CardProduto({produto, preco}){ {/*tem que colocar como paramentro */}
    return(
        <View>
             <Text>Produto: {produto}</Text>
            <Text>Preço: {preco}</Text>

        </View>
    )
}