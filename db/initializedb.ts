import db from "./database"
import uuid from "react-native-uuid"
import { Ejercicio, Rutina, RutinaToEjercicio } from "./schema"
import AsyncStorage from "@react-native-async-storage/async-storage"

export async function initializeDB(){
    try{
        await initializeEjercicios()
        await initializeRutinas()
        AsyncStorage.setItem("initializeddb", "1")
    }catch(error){

    }
}


async function initializeEjercicios(){
    await db.insert(Ejercicio).values([
        {
            id: 1,
            name: "Press Banca"
        },
        {
            id: 2,
            name: "Press Militar"
        },
        {
            id: 3,
            name: "Sentadillas"
        },
        {
            id: 4,
            name: "Fondos"
        },
        {
            id: 5,
            name: "Prensa"
        },
        {
            id: 6,
            name: "Remo en banco"
        },
        {
            id: 7,
            name: "Dominadas"
        },
        {
            id: 8,
            name: "Estocadas"
        },
        {
            id: 9,
            name: "Hip Thrust"
        },
        {
            id: 10,
            name: "Elevación de pantorrillas"
        },
    ])
} 

async function initializeRutinas(){
    const rutinaId = uuid.v4()
    await db.insert(Rutina).values([
        {
            id: rutinaId,
            name: "Torso"
        }
    ])
    await db.insert(RutinaToEjercicio).values([
        {
            rutinaId: rutinaId,
            ejercicioId: 1
        },
        {
            rutinaId: rutinaId,
            ejercicioId: 2
        }
    ])
}