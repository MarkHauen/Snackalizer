// app/screens/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../App';
import ScreenBackground from '../components/ScreenBackground'; // Adjust the import path as necessary

export default function Home() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  return (
    <ScreenBackground>
      <View className="flex-1 bg-zinc-900/80 px-4 justify-center items-center">
        <Text className="text-white text-2xl font-bold mb-10 text-center">
          Welcome to Snakalyzer
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Restaurants')}
          className="bg-zinc-700 rounded-xl w-full py-4 px-4 mb-4"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Browse by Restaurant
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Categories')}
          className="bg-zinc-700 rounded-xl w-full py-4 px-4 mb-16"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Browse by Category
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('About')}
          className="bg-zinc-700 rounded-xl w-full py-4 px-4"
        >
          <Text className="text-white text-lg font-semibold text-center">
            About Snakalyzer
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenBackground>
  );
};