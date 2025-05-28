import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../App';
import foodDataRaw from '../assets/nutrition.json';
import type { FoodData } from '../types';
import SafePad from '../components/SafePad';

const foodData = foodDataRaw as FoodData;

const DAILY_VALUES = {
  calories: 2000,
  total_fat: 78,
  saturated_fat: 20,
  cholesterol: 300,
  sodium: 2300,
  carbohydrates: 275,
  dietary_fiber: 28,
  sugar: 50,
  protein: 50,
  potassium: 4700,
};

type NutritionScreenRouteProp = RouteProp<RootStackParamList, 'Nutrition'>;

export default function Nutrition() {
  const route = useRoute<NutritionScreenRouteProp>();
  const { itemId } = route.params;

  const getDailyValuePercent = (value: number | string | null, nutrient: keyof typeof DAILY_VALUES): string => {
    if (value === null || value === '' || isNaN(Number(value))) return '-';
    const daily = DAILY_VALUES[nutrient];
    const percent = (Number(value) / daily) * 100;
    return `${percent.toFixed(1)}%`;
  };

  const getComparisonLabel = (
  value: number | string | null,
  nutrient: keyof typeof DAILY_VALUES,
  allItems: any[]
): { label: string; color: keyof typeof colorMap } => {
  // Remove commas from value for correct number conversion
  const sanitizedValue = typeof value === 'string' ? value.replace(/,/g, '') : value;
  if (sanitizedValue === null || sanitizedValue === '' || isNaN(Number(sanitizedValue))) return { label: '-', color: 'gray' };

  const numValue = Number(sanitizedValue);
  const values: number[] = allItems
    .map(i => {
      const v = typeof i[nutrient] === 'string' ? i[nutrient].replace(/,/g, '') : i[nutrient];
      return Number(v);
    })
    .filter(n => !isNaN(n));

  if (values.length === 0) return { label: '-', color: 'gray' };

  values.sort((a, b) => a - b);

  const index = values.findIndex(v => v >= numValue);
  const percentile = index / values.length;
  if ((nutrient === 'protein') || (nutrient === 'potassium')) {
    if (percentile >= 0.75) return { label: 'High', color: 'green' };
    if (percentile >= 0.25) return { label: 'Moderate', color: 'yellow' };
    return { label: 'Low', color: 'red' }
  }
  if (percentile >= 0.75) return { label: 'High', color: 'red' };
  if (percentile >= 0.25) return { label: 'Moderate', color: 'yellow' };
  return { label: 'Low', color: 'green' };
};

  const item = foodData.food_items.find((item) => item.id === itemId);

  // Define nutrientKeys and allItemsInCategory
  const nutrientKeys = Object.keys(DAILY_VALUES) as (keyof typeof DAILY_VALUES)[];
  const allItemsInCategory = foodData.food_items.filter(i => i.food_category === item?.food_category);

  if (!item) {
    return (
      <View className="flex-1 bg-zinc-900 justify-center items-center px-4">
        <Text className="text-white text-xl">Item not found.</Text>
      </View>
    );
  }

  const colorMap = {
    red: '#f87171',    // Tailwind red-400
    yellow: '#fde047', // Tailwind yellow-400
    green: '#4ade80',  // Tailwind green-400
    gray: '#9ca3af',   // Tailwind gray-400
  };

  return (
    <ScrollView className="flex-1 bg-zinc-900 px-4">
      <SafePad />
      {/* Item Title and Description */}
      <Text className="text-white text-2xl font-bold mb-4">{item.item_name}</Text>
      {item.item_description && (
        <Text className="text-zinc-300 text-sm mb-4">{item.item_description}</Text>
      )}

      {/* Nutrient Summary */}
      {/* Column Headers */}
      <View className="flex-row justify-between border-b border-zinc-800 py-2 mb-2">
        <Text className="text-white capitalize w-1/4">Nutrient</Text>
        <Text className="text-white w-1/4 text-right">Amount</Text>
        <Text className="text-white w-1/4 text-right">%DV</Text>
        <Text className="text-white w-1/4 text-right">Category Score*</Text>
      </View>
      {nutrientKeys.map((key) => {
        const value = item[key];
        // Sanitize value for calculations: remove commas and parse as number
        const sanitizedValue = typeof value === 'string' ? value.replace(/,/g, '') : value;
        const dailyValue = getDailyValuePercent(sanitizedValue, key as keyof typeof DAILY_VALUES);
        const comparison = getComparisonLabel(sanitizedValue, key as keyof typeof DAILY_VALUES, allItemsInCategory);

        return (
          <View key={key} className="flex-row justify-between border-b border-zinc-800 py-2">
            <Text className="text-white capitalize w-1/4">{key.replace(/_/g, ' ')}</Text>
            <Text className="text-white w-1/4 text-right">{value ?? '-'}</Text>
            <Text className="text-gray-400 w-1/4 text-right">{dailyValue}</Text>
            <Text style={{ color: colorMap[comparison.color], textAlign: 'right', width: '25%' }}>{comparison.label}</Text>
          </View>
        );
      })}
      <Text className="text-gray-400 text-xs mt-4">
        * Category Score is based on the item's nutrient content compared to others in the same category.
      </Text>
      <Text className="text-gray-400 text-xs mt-2">
        % Daily values are based on the 2,000 calorie diet and other reccomended limits from the FDA. Your daily values may be higher or lower depending on your calorie/nutritional needs.
      </Text>


    </ScrollView>
  )
};