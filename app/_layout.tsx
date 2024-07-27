import { Stack, useLocalSearchParams } from "expo-router";
import { rutinaRoutes, agendaPesoHome } from '@/constants/Routes';

import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations';
import { ProgressBarAndroidComponent } from "react-native";
import getAllRutinas from "@/services/RutinasServices";
import db from "@/db/database";
import { AppProvider } from "@/context/AppProvider";



export default function IndexLayout(){
    const { success, error } = useMigrations(db, migrations);
    console.log(success)

    if(error){
        return(
            console.log(error)
        )
    }

    if(!success){
        return(
            console.log("cargando")
        )
    }
    
    return(
        <AppProvider>
            <Stack initialRouteName="(tabs)/RutinaHomeScreen">
                <Stack.Screen 
                    name="(tabs)" 
                    options={{
                        headerShown: false,

                }}/>
                <Stack.Screen
                    name={rutinaRoutes.agregarRutinaCabecera()}
                    options={{headerTitleAlign: "center"}}
                />
                <Stack.Screen
                    name={rutinaRoutes.agregarRutina}
                    options={{title: "Crear Rutina", headerTitleAlign: "center"}}
                />
                <Stack.Screen
                    name={rutinaRoutes.editarRutina()}
                    options={{title: "Editar Rutina", headerTitleAlign: "center"}}
                />
            </Stack>
        </AppProvider>
    )
}
