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
            <Stack.Screen
                name={rutinaRoutes.agregarRutina}
                options={{title: "Crear Rutina"}}
            />
            <Stack.Screen
                name={rutinaRoutes.editarRutina()}
                options={{title: "Editar Rutina"}}
            />
        </Stack>
    )
}
