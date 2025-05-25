// components/SafePad.tsx
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SafePad() {
  const insets = useSafeAreaInsets();

  return <View style={{ height: insets.top }} />;
}