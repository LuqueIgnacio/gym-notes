import Toast from "react-native-toast-message";

export function showSuccesToast(text: string){
    Toast.show({
        type: 'success',
        text1: text,
        visibilityTime: 1200,
        position: "top"
    });
}