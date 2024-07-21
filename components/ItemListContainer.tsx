import {Text, View } from "react-native";
import TrashButton from "./buttons/TrashButton";
import PencilButton from "./buttons/PencilButton";
import DumbellButton from "./buttons/DumbellButton";
import { useRouter } from "expo-router";
import { rutinaRoutes } from "@/constants/Routes";

export default function ItemListContainer(props){
    const {style} = props
    return(
        <View className={"bg-gray-50 rounded-xl mx-5 mt-5 py-2 px-6 " + style}>
            {props.children}
        </View>
    )
}