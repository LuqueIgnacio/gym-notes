import ItemListContainer from '@/components/ItemListContainer';
import RutinaItem from '@/components/rutina/RutinaItem';
import { Link, useRouter } from 'expo-router';
import { Image, StyleSheet, Platform, View, Text, Button } from 'react-native';

export default function RutinaHomeScreen() {
  const router = useRouter()
  const rutina = {
    name: "Torso"
  }

  return (
    <>
    <ItemListContainer style="flex-row justify-between items-center">
      <RutinaItem rutina={rutina}></RutinaItem>
    </ItemListContainer>
    </>
  );
}
