import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/main/HomeScreen";
import ProfileScreen from "./screens/main/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Colors } from "./utils/colors";
import { Pressable, Image, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setColorMode } from "./redux/slices/color-mode-slice";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function BottomNavigationBarScreens() {
  const dispatch = useAppDispatch();
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: Colors.secondary500 },
        tabBarActiveTintColor: Colors.secondary100,
        tabBarInactiveTintColor: Colors.primary700,
      }}
    >
      <BottomTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerStyle: { backgroundColor: Colors.primary700 },
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

// ... (other imports)

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="BottomNavigationBar"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="BottomNavigationBar"
              component={BottomNavigationBarScreens}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
