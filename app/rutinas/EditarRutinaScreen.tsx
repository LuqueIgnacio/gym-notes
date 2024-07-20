import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function EditarRutinaScreen() {
  return (
    <View className="flex mt-5 bg-gray-50">
      <Text className="text-s text-center font-bold">Editar rutina</Text>
      <Link href={"/peso"}>
        <Text>peso</Text>
      </Link>
    </View>
  );
}
