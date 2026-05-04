import { View, StyleSheet, Text, FlatList} from "react-native"

export default function CardItem(nome){
    return (
        <View style={styles.linha}>
            <Text>{nome}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
linha: {
flexDirection: "row",
justifyContent: "space-between",
padding: 10,
backgroundColor: "#d7e7f8",
marginBottom: 4,
borderRadius: 4,
},
});