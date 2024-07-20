import ItemListContainer from '@/components/ItemListContainer';
import { Link, useRouter } from 'expo-router';
import { Image, StyleSheet, Platform, View, Text, Button } from 'react-native';

export default function RutinaHomeScreen() {
  const router = useRouter()
  return (
    <>
    <ItemListContainer></ItemListContainer>
    </>
  );
}
