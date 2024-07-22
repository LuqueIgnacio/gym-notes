import {View } from "react-native";

export default function DropdownItemContainer(props){
    const {style} = props
    return(
        <View className={"bg-gray-50 py-2 px-6 " + style}>
            {props.children}
        </View>
    )
}