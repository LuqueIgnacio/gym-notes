import { View, Text } from 'react-native'
import React from 'react'
import { rutinaRoutes } from "@/constants/Routes";
import DumbellButton from '../buttons/DumbellButton';
import PencilButton from '../buttons/PencilButton';
import TrashButton from '../buttons/TrashButton';
import { useRouter } from 'expo-router';

export default function RutinaItem(props) {
    const {rutina} = props
    const router = useRouter()
    return (
        <>
        <View>
            <Text className="text-lg font-bold">{props.rutina.name}</Text>
        </View>
        <View className="flex-row justify-center space-x-3">
            <DumbellButton onPress={() => router.push(rutinaRoutes.agregarRutinaCabecera(rutina.name))} width={30} height={30}/>
            <PencilButton onPress={() => router.push(rutinaRoutes.editarRutina(rutina.id))} width={30} height={30}/>
            <TrashButton width={30} height={30}/>
        </View>
        </>
    )
}