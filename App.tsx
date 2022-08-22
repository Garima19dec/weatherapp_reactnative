import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Toast from "react-native-toast-message";
import CountryDetail from "./src/CountryDetail";
import CapitalWhether from "./src/CapitalWeather";

export default function App() {
  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();

  return (
    <NavigationContainer>
      <PaperProvider>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator initialRouteName="Country">
            <Stack.Screen
              name="Country"
              component={CountryDetail}
              options={{
                headerStyle: { backgroundColor: "#21130d" },
                title: "Country Details",
                headerTitleAlign: "center",
                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="weather"
              component={CapitalWhether}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </QueryClientProvider>
      </PaperProvider>
      <Toast position="bottom" bottomOffset={20} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
