import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../App';
import foodDataRaw from '../assets/nutrition.json'; 
import type { FoodData } from '../types'; 
import SafePad from '../components/SafePad'; 

const foodData = foodDataRaw as FoodData;

export default function Categories() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Categories'>>();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(
        foodData.food_items
          .map((item) => item.food_category?.trim())
          .filter((cat): cat is string => !!cat)
      )
    ).sort((a, b) => a.localeCompare(b));

    setCategories(uniqueCategories);
  }, []);

  return (
    
    <ScrollView className="flex-1 bg-zinc-900 px-4 py-6">
         <SafePad />
      <Text className="text-white text-2xl font-bold text-center mb-6">
        Browse by Category
      </Text>

      {categories.sort().map((category) => (
        <TouchableOpacity
          key={category}
          className="bg-zinc-700 rounded-xl py-4 px-4 mb-4"
          onPress={() => navigation.navigate('CategoryItems', { category })}
        >
          <Text className="text-white text-lg font-semibold text-center">
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}