export type FoodItem = {
    id: number;
    restaurant_id: number;
    food_category: string;
    item_name: string;
    item_description: string;
    serving_size: number | null;
    serving_size_text: string | null;
    serving_size_unit: string | null;
    serving_size_household: string | null;
    calories: number | null;
    total_fat: number | null;
    saturated_fat: number | null;
    trans_fat: number | null;
    cholesterol: number | null;
    sodium: string | null;
    carbohydrates: number | null;
    dietary_fiber: number | null;
    sugar: number | null;
    protein: number | null;
    potassium: number | null;
    notes: string | null;
    calories_text: string | null;
    total_fat_text: string | null;
    saturated_fat_text: string | null;
    trans_fat_text: string | null;
    cholesterol_text: string | null;
    sodium_text: string | null;
    carbohydrates_text: string | null;
    dietary_fiber_text: string | null;
    sugar_text: string | null;
    protein_text: string | null;
};

export type FoodData = {
    food_items: FoodItem[];
};

export type restaurant = {
    id: number;
    name: string;
}

