// app/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import restaurants from '../assets/restaurants.json';
import SafePad from '../components/SafePad';
import type { RootStackParamList } from '../App';

export default function Restaurants() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Restaurants'>>();
  const [restaurantList, setRestaurantList] = useState<any[]>([]);

  useEffect(() => {
    setRestaurantList(restaurants.restaurants);
  }, []);

  return (
    <ScrollView className="flex-1 bg-zinc-900 px-4 py-6">
        <SafePad />
      <Text className="text-white text-2xl font-bold text-center mb-6">
        Select a Restaurant
      </Text>
      {restaurantList.map((restaurant) => (
        <TouchableOpacity
          key={restaurant.id}
          className="bg-zinc-700 rounded-xl py-4 px-4 mb-4"
          onPress={() => navigation.navigate('Menu', { restaurantId: restaurant.id })}
        >
          <Text className="text-white text-lg text-center font-semibold">
            {restaurant.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};