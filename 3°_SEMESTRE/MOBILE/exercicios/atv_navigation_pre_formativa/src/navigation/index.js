import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* n precisa colocar o stack aq? */}
      <TabNavigator /> 
    </NavigationContainer>
  );
}