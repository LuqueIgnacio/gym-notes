import { Stack, useLocalSearchParams } from "expo-router";
import { rutinaRoutes, agendaPesoHome } from '@/constants/Routes';

export default function IndexLayout(){
    return(
        <Stack initialRouteName="(tabs)">
            <Stack.Screen 
                name="(tabs)" 
                options={{
                    headerShown: false,

            }}/>
            <Stack.Screen
                name={rutinaRoutes.agregarRutinaCabecera()}
            />
        </Stack>
    )
}
