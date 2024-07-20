import {Text, View } from "react-native";
import { useState } from "react";
import TrashButton from "./buttons/TrashButton";
import PencilButton from "./buttons/PencilButton";
import DumbellButton from "./buttons/DumbellButton";
import { useRouter } from "expo-router";
import { rutinaRoutes } from "@/constants/Routes";
import BalanceIcon from "./icons/BalanceIcon";
import BaseButton from "./buttons/BaseButton";

export default function ItemListContainer(){
    const router = useRouter()
    return(
        <>
        <View className="flex-row justify-between items-center bg-gray-50 rounded-lg m-5 py-2 px-6">
            <View>
                <Text className="text-lg font-bold">Torso</Text>
            </View>
            <View className="flex-row justify-center space-x-3">
                <DumbellButton onPress={() => router.push(rutinaRoutes.agregarRutinaCabecera("Torso"))} width={30} height={30}/>
                <PencilButton width={30} height={30}/>
                <TrashButton width={30} height={30}/>
            </View>
        </View>

        <View className="flex-row justify-between items-center bg-gray-50 rounded-lg m-5 py-2 px-6">
            <View>
                <Text className="text-lg font-bold">Pierna</Text>
            </View>
            <View className="flex-row justify-center space-x-3">
                <DumbellButton width={30} height={30}/>
                <PencilButton width={30} height={30}/>
                <TrashButton width={30} height={30}/>
            </View>
        </View>
        </>
    )
}