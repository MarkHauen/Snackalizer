import { Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SafePad from '../components/SafePad'; 

export default function AboutScreen() {
  const insets = useSafeAreaInsets();

return (
    <ScrollView
      style={{ paddingTop: insets.top }}
      className="bg-black px-4"
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <Text className="text-white text-3xl font-bold my-4">About Snackalyzer</Text>

      <Text className="text-gray-300 text-base leading-relaxed mb-6">
        Snackalyzer helps you make smarter decisions when eating out. With a clear, side-by-side look
        at nutrition facts, daily values, and comparisons within food categories, you can better understand
        how your choices stack up.
      </Text>

      <Text className="text-white text-xl font-semibold mb-2">Disclaimers:</Text>
      <Text className="text-gray-300 text-base leading-relaxed mb-6">
        All nutritional data in this app is sourced from{' '}
        <Text
          className="text-blue-400 underline"
          onPress={() => Linking.openURL('https://menustat.org')}
        >
          menustat.org
        </Text>
        . While we strive to present the information accurately,
        it has not been independently verified. Use this app as a helpful guide, but consult original sources or medical professionals for dietary decisions.
      </Text>

        <Text className="text-white text-xl font-semibold mb-2">Privacy Policy</Text>
        <Text className="text-gray-300 text-base leading-relaxed mb-6">
        Your privacy is important to us. Snackalyzer does not collect any personal data or usage statistics. The app operates entirely offline, ensuring your information remains private and secure.
      </Text>

      <Text className="text-white text-xl font-semibold mb-2">Free Service</Text>
      <Text className="text-gray-300 text-base leading-relaxed mb-2">
        Snackalizer is free service provided by {' '}<Text
          className="text-blue-400 underline"
          onPress={() => Linking.openURL('https://www.srs-bidness.com')}
        >
          SRS Bidness
        </Text> because they're cool like that. The code is open source, feel free to contribute to the project:{' '}
        <Text
          className="text-blue-400 underline"
          onPress={() => Linking.openURL('https://github.com/MarkHauen/Snackalizer')}
        >
          GitHub Repo
        </Text>.
      </Text>
      <SafePad />
   
    </ScrollView>
  );
}