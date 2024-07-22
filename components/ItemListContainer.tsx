import {View } from "react-native";

export default function ItemListContainer(props){
    const {style} = props
    return(
        <View className={"bg-gray-50 rounded-xl mx-5 mt-5 py-2 px-6 " + style}>
            {props.children}
        </View>
    )
}