import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetalheScreen from "../screens/DetalheScreen";

const Stack = createNativeStackNavigator();
export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      {/*nome do COMPONENTE, não necessariamente do ARQUIVO */}
      <Stack.Screen name="Detalhe" component={DetalheScreen} />
      {/*nome do COMPONENTE, não necessariamente do ARQUIVO */}
    </Stack.Navigator>
  );
}
