import { Stack, useLocalSearchParams } from "expo-router";
import { rutinaRoutes, agendaPesoHome } from '@/constants/Routes';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import db from "@/db/database";
import { AppProvider } from "@/context/AppProvider";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import { initializeDB } from "@/db/initializedb";



export default function IndexLayout(){
    const { success, error } = useMigrations(db, migrations);
    console.log(success)

    useEffect(() =>{
        const checkDBisInitialized = async () =>{
            const isDBinitialized = await AsyncStorage.getItem("initializeddb")
            console.log("hola", isDBinitialized)
            if(!isDBinitialized) initializeDB()
        }
        checkDBisInitialized()
    }, [])

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
            <Toast/>
        </AppProvider>
    )
}
