// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={require('./screens/About').default} />
        <Stack.Screen name="Restaurants" component={require('./screens/Restaurants').default} />
        <Stack.Screen name="Categories" component={require('./screens/Categories').default} />
        <Stack.Screen name="CategoryItems" component={require('./screens/CategoryItems').default} />
        <Stack.Screen name="Menu" component={require('./screens/Menu').default} />
        <Stack.Screen name="Items" component={require('./screens/Items').default} />
        <Stack.Screen name="Nutrition" component={require('./screens/Nutrition').default} />
        {}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type RootStackParamList = {
  Home: undefined;
  Restaurants: undefined;
  Categories: undefined;
  About: undefined;
  Items: { restaurantId: number; category: string }; // ✅ for this screen to work
  CategoryItems: { category: string };
  Menu: { restaurantId: number };
  Nutrition: { itemId: number };
};