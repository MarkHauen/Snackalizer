import { Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AboutScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ paddingTop: insets.top }}
      className="bg-black px-4"
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <Text className="text-white text-3xl font-bold my-4">About Snakalyzer</Text>

      <Text className="text-gray-300 text-base leading-relaxed mb-6">
        Snakalyzer helps you make smarter decisions when eating out. With a clear, side-by-side look
        at nutrition facts, daily values, and comparisons within food categories, you can better understand
        how your choices stack up.
      </Text>

      <Text className="text-white text-xl font-semibold mb-2">Disclaimer</Text>
      <Text className="text-gray-400 text-sm leading-relaxed mb-6">
        All nutritional data in this app is sourced from{' '}
        <Text className="text-blue-400 underline">menustat.org</Text>. While we strive to present the information accurately,
        it has not been independently verified. Use this app as a helpful guide, but consult original sources or medical professionals for dietary decisions.
      </Text>

      <Text className="text-white text-xl font-semibold mb-2">Free Service</Text>
      <Text className="text-gray-300 text-base leading-relaxed mb-2">
        Snackalizer is free service provided by SRS Bidness LLC because they're cool like that.
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.srs-bidness.com')}>
        <Text className="text-blue-400 underline text-base">
          www.srs-bidness.com
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}