import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../App';
import foodData from '../assets/nutrition.json';
import type { FoodData } from '../types';
import restaurantsData from '../assets/restaurants.json';
import SafePad from '../components/SafePad';

const foodDataTyped = foodData as FoodData;
const restaurants = (restaurantsData as { restaurants: { id: number; name: string }[] }).restaurants;
type CategoryItemsScreenRouteProp = RouteProp<RootStackParamList, 'CategoryItems'>;
type Navigation = StackNavigationProp<RootStackParamList, 'CategoryItems'>;

export default function CategoryItems() {
    const route = useRoute<CategoryItemsScreenRouteProp>();
    const navigation = useNavigation<Navigation>();
    const { category } = route.params;


    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        const filtered = foodDataTyped.food_items.filter(
            (item) => item.food_category?.trim().toLowerCase() === category.toLowerCase()
        );
        setItems(filtered);
    }, [category]);

    return (
        <ScrollView className="flex-1 bg-zinc-900 px-4 py-6">
            <SafePad />
            <Text className="text-white text-2xl font-bold text-center mb-6">
                {category}
            </Text>

            {items
                .slice() // create a shallow copy to avoid mutating state
                .sort((a, b) => a.item_name.localeCompare(b.item_name))
                .map((item) => {
                    const restaurant = restaurants.find(r => r.id === item.restaurant_id);
                    return (
                        <TouchableOpacity
                            key={item.id}
                            className="bg-zinc-700 rounded-xl py-4 px-4 mb-4"
                            onPress={() => navigation.navigate('Nutrition', { itemId: item.id })}
                        >
                            <Text className="text-white text-lg font-semibold text-center">
                                {item.item_name}
                            </Text>
                            <Text className="text-zinc-300 text-sm text-center mt-1">
                                {restaurant ? restaurant.name : ''}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
        </ScrollView>
    );
}