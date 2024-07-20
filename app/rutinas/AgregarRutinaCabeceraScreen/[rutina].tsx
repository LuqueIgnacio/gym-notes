import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

export default function AgregarRutinaCabeceraScreen() {
  const {rutina} = useLocalSearchParams()
  const navigation = useNavigation()
  navigation.setOptions({headerTitle: `Rutinas>${rutina}`})
  
  return (
    <View className="flex mt-5 bg-gray-50">
      <Text className="text-s text-center font-bold">Agregar</Text>
      <Link href={"/peso"}>
        <Text>peso</Text>
      </Link>
    </View>
  );
}
