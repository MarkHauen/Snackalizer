import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../App';
import foodDataRaw from '../assets/nutrition.json';
import type { FoodData, FoodItem } from '../types'; // Adjust the import path as necessary
import { Text as RNText } from 'react-native';
import SafePad from '../components/SafePad';

const foodData = foodDataRaw as FoodData;

type ItemsScreenRouteProp = RouteProp<RootStackParamList, 'Items'>;

export default function Items() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Items'>>();
    const route = useRoute<ItemsScreenRouteProp>();
    const { restaurantId, category } = route.params;

    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        const filtered = foodData.food_items.filter(
            (item) =>
                item.restaurant_id === restaurantId &&
                item.food_category === category
        );
        setItems(filtered);
    }, [restaurantId, category]);

    return (
        <ScrollView className="flex-1 bg-zinc-900 px-4 py-6">
            <SafePad />
            <Text className="text-white text-2xl font-bold text-center mb-6">
                {category}
            </Text>
            {items.sort().map((item) => (
                <TouchableOpacity
                    key={item.id}
                    className="bg-zinc-700 rounded-xl py-4 px-4 mb-4"
                    onPress={() =>
                        navigation.navigate('Nutrition', {
                            itemId: item.id,
                        })
                    }
                >
                    <Text className="text-white text-lg font-semibold">
                        {item.item_name}
                    </Text>
                    {item.item_description && (
                        <Text className="text-zinc-300 text-sm mt-1">
                            {item.item_description}
                        </Text>
                    )}
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}