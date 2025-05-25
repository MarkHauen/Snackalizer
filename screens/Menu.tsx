import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../App';
import type { FoodData } from '../types'; // Adjust the import path as necessary
import foodDataJson from '../assets/nutrition.json';
import restaurantsData from '../assets/restaurants.json';
import SafePad from '../components/SafePad';


const foodData = foodDataJson as FoodData;
const restaurants = (restaurantsData as { restaurants: { name: string }[] }).restaurants;
type MenuScreenRouteProp = RouteProp<RootStackParamList, 'Menu'>;

export default function Menu() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Menu'>>();
    const route = useRoute<MenuScreenRouteProp>();
    const { restaurantId } = route.params;

    const [foodCategories, setFoodCategories] = useState<string[]>([]);

    useEffect(() => {
        const itemsForRestaurant = foodData.food_items.filter(
            (item) => item.restaurant_id === restaurantId
        );

        const uniqueCategories = [
            ...new Set(itemsForRestaurant.map((item) => item.food_category).filter(Boolean)),
        ];

        setFoodCategories(uniqueCategories);
    }, [restaurantId]);

    return (
        <ScrollView className="flex-1 bg-zinc-900 px-4 py-6">
            <SafePad />
            <Text className="text-white text-2xl font-bold text-center mb-6">
                Menu for {restaurants[restaurantId - 1]?.name ?? `Restaurant ID: ${restaurantId}`}
            </Text>
            
            {foodCategories.sort().map((category, index) => (
                <TouchableOpacity
                    key={index}
                    className="bg-zinc-700 rounded-xl py-4 px-4 mb-4"
                    onPress={() =>
                        navigation.navigate('Items', { restaurantId, category })
                    }
                >
                    <Text className="text-white text-lg font-semibold text-center">
                        {category}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}