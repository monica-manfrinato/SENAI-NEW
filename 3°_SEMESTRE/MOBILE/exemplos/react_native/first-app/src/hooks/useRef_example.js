import { View, Text, StyleSheet, TextInput } from "react-native"; //importando os elementos que serão utilizados nesse código
import { useRef } from "react";


export default function TelaDeLogin(){
    const senhaRef = useRef(null)

    return(
        <View style={styles.container}>


{/* Text input é um input de texto que possuí especificações que ajudam o usuário */}
<TextInput 
    style={styles.input} 
    placeholder="Digite o seu e-mail" 
    keyboardType="email-address" 
    returnKeyType="next" 
    onSubmitEditing={() => senhaRef.current?.focus()}/> {/* onSubmitEditing fala qual ação será executada */}

<TextInput 
    style={styles.input} 
    placeholder="Digite sua senha" 
    secureTextEntry={true}
    returnKeyType="send"
    ref={senhaRef}
/> {/* onSubmitEditing fala qual ação será executada */}

 </View>       
    )
}

const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
justifyContent: "center",
},
titulo: {
fontSize: 24,
fontWeight: "bold",
marginBottom: 20,
textAlign: "center",
},
input: {
borderWidth: 1,
borderColor: "#ccc",
borderRadius: 8,
padding: 15,
marginBottom: 15,
fontSize: 16,
},
});