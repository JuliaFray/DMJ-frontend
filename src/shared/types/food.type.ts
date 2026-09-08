import { Meal, MealsOptions } from './diet.type';

export type Unit = 'g' | 'kcal' | 'kJ';

export interface Nutrients {
  calcium: number;
  calcium_100g: number;
  calcium_unit: Unit;
  calcium_value: number;
  carbohydrates: number;
  carbohydrates_100g: number;
  carbohydrates_unit: Unit;
  carbohydrates_value: number;
  energy: number;
  'energy-kcal': number;
  'energy-kcal_100g': number;
  'energy-kcal_unit': Unit;
  'energy-kcal_value': number;
  'energy-kcal_value_computed': number;
  'energy-kj': number;
  'energy-kj_100g': number;
  'energy-kj_unit': Unit;
  'energy-kj_value': number;
  'energy-kj_value_computed': number;
  energy_100g: number;
  energy_unit: Unit;
  energy_value: number;
  fat: number;
  fat_100g: number;
  fat_unit: Unit;
  fat_value: number;
  'fruits-vegetables-legumes-estimate-from-ingredients_100g': number;
  'fruits-vegetables-legumes-estimate-from-ingredients_serving': number;
  'fruits-vegetables-nuts-estimate-from-ingredients_100g': number;
  'fruits-vegetables-nuts-estimate-from-ingredients_serving': number;
  'nova-group': number;
  'nova-group_100g': number;
  'nova-group_serving': number;
  proteins: number;
  proteins_100g: number;
  proteins_unit: Unit;
  proteins_value: number;
  salt: number;
  salt_100g: number;
  salt_unit: Unit;
  salt_value: number;
  sodium: number;
  sodium_100g: number;
  sodium_unit: Unit;
  sodium_value: number;
  'trans-fat': number;
  'trans-fat_100g': number;
  'trans-fat_unit': Unit;
  'trans-fat_value': number;
  'vitamin-b2': number;
  'vitamin-b2_100g': number;
  'vitamin-b2_unit': Unit;
  'vitamin-b2_value': number;
}

export interface ProductItem {
  id: string;
  product_name: string;
  product_name_ru: string;
  brands: string;
  image_front_thumb_url: string;
  nutriments: Nutrients;
  nutriments_estimated: {
    alcohol_100g: number;
    'beta-carotene_100g': number;
    calcium_100g: number;
    carbohydrates_100g: number;
    cholesterol_100g: number;
    copper_100g: number;
    'energy-kcal_100g': number;
    'energy-kj_100g': number;
    energy_100g: number;
    fat_100g: number;
    fiber_100g: number;
    fructose_100g: number;
    galactose_100g: number;
    glucose_100g: number;
    iodine_100g: number;
    iron_100g: number;
    lactose_100g: number;
    magnesium_100g: number;
    maltose_100g: number;
    manganese_100g: number;
    'pantothenic-acid_100g': number;
    phosphorus_100g: number;
    phylloquinone_100g: number;
    polyols_100g: number;
    potassium_100g: number;
    proteins_100g: number;
    salt_100g: number;
    'saturated-fat_100g': number;
    selenium_100g: number;
    sodium_100g: number;
    starch_100g: number;
    sucrose_100g: number;
    sugars_100g: number;
    'vitamin-a_100g': number;
    'vitamin-b12_100g': number;
    'vitamin-b1_100g': number;
    'vitamin-b2_100g': number;
    'vitamin-b6_100g': number;
    'vitamin-b9_100g': number;
    'vitamin-c_100g': number;
    'vitamin-d_100g': number;
    'vitamin-e_100g': number;
    'vitamin-pp_100g': number;
    water_100g: number;
    zinc_100g: number;
  };
  serving_quantity: string;
  serving_size: string;
  serving_quantity_unit: Unit;
}

export interface FoodList {
  count: number;
  page: number;
  page_count: number;
  page_size: number;
  skip: number;
  products: ProductItem[];
}

export interface FoodItem {
  code: string;
  product: ProductItem;
  status: number;
}

export interface AddFoodType {
  id: string;
  foods: {
    name: string;
    proteins: number;
    cal: number;
    fats: number;
    carb: number;
    otherNutrients: Nutrients;
    day: number;
    meals: MealsOptions[];
  }[];
}
