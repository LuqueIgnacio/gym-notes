import db from "../db/database"
import { Users, Rutina, Ejercicio, RutinaToEjercicio, RutinaCabecera, RutinaDetalle } from "@/db/schema"
import { and, asc, eq, max, or} from "drizzle-orm"
import uuid from "react-native-uuid"
import { EjercicioSeleccionado, EjercicioType, RutinaType, RutinaToEjercicioType, RutinaWithEjerciciosType, RutinaWithRutinaToEjercicioType, EjercicioDropdownType, RutinaDetalleCompleto, RutinaDetalleType } from "@/types/types"

export async function getAllRutinas(){
    return await db.select().from(Rutina)
}

export async function getRutinaWithEjercicios(id: any){
    const rutinaEjercicios = await db.query.Rutina.findFirst({
        where: eq(Rutina.id, id),
        with: {
            rutinaToEjercicio: {
                with: {
                    ejercicio: true
                }
            }
        }
    })
    if(!rutinaEjercicios){
        return
    }
    const ejercicios = rutinaEjercicios?.rutinaToEjercicio.map(e => e.ejercicio)
    const rutinaWithEjercicios: RutinaWithEjerciciosType = {id: rutinaEjercicios?.id, name: rutinaEjercicios?.name, ejercicios: ejercicios}
    return rutinaWithEjercicios
}

export async function getRutina(rutinaId){
    const rutina = await db.select().from(Rutina).where(eq(Rutina.id, rutinaId)).limit(1)
    return rutina.at(0)
}

export async function addRutina(rutina: RutinaWithRutinaToEjercicioType){
    await db.insert(Rutina).values({id: rutina.id, name: rutina.name})
    await db.insert(RutinaToEjercicio).values(rutina.ejercicios)
}

export async function editRutina(rutina: RutinaWithRutinaToEjercicioType){
    await db.delete(RutinaToEjercicio).where(eq(RutinaToEjercicio.rutinaId, rutina.id))
    await db.insert(RutinaToEjercicio).values(rutina.ejercicios)
}

export async function deleteRutina(idRutina: unknown){
    return await db.delete(Rutina).where(eq(Rutina.id, idRutina)) 
}

export async function getAllEjercicios(){
    const ejercicios : EjercicioType[] = await db.select().from(Ejercicio)
    return ejercicios
}

export async function getAllEjerciciosForDropwdown() {
    let ejercicios = await getAllEjercicios()
    const ejerciciosDropdown = ejercicios.map( e => {
        const ejercicioDropdown : EjercicioDropdownType = {
            ...e,
            title: e.name,
            isSelected: false
        }
        return ejercicioDropdown
    })
    return ejerciciosDropdown
}

export function prepareDataForModifyRutinaComponent(rutinaWithEjercicios: RutinaWithEjerciciosType, ejerciciosDropdown: EjercicioDropdownType[]){
    const newEjerciciosSeleccionados: EjercicioSeleccionado[] = rutinaWithEjercicios.ejercicios.map(e => {
        return {...e, key: e.id}
    })
    newEjerciciosSeleccionados.forEach(es =>{
        const index = ejerciciosDropdown.findIndex(e => e.id === es.id)
        ejerciciosDropdown[index].isSelected = true
    })

    return {ejerciciosSeleccionados: newEjerciciosSeleccionados, ejerciciosDropdown: ejerciciosDropdown}
}

export function prepareDataForSaveRutina(rutina: RutinaType, ejercicios: EjercicioType[]): RutinaWithRutinaToEjercicioType{
    let newEjercicios: RutinaToEjercicioType[]
    if(rutina.id){
        newEjercicios = ejercicios.slice().map( e => {
            return {ejercicioId: e.id, rutinaId: rutina.id}
        })
    }else{
        const rutinaId = uuid.v4()
        rutina.id = rutinaId
        newEjercicios = ejercicios.slice().map( e => {
            return {ejercicioId: e.id, rutinaId: rutinaId}
        })
    }
    return ({...rutina ,ejercicios: newEjercicios})
}

export async function getCurrentRutinaDetalleAndEjerciciosNames(rutinaId){

    const ejercicios = await db.select().from(RutinaToEjercicio)
        .innerJoin(Ejercicio, eq(Ejercicio.id, RutinaToEjercicio.ejercicioId))
        .where(eq(RutinaToEjercicio.rutinaId, rutinaId))
        .orderBy(asc(Ejercicio.id))
    const currentDetalle = await db.select().from(RutinaDetalle)
        .innerJoin(RutinaCabecera, eq(RutinaCabecera.id, RutinaDetalle.idRutinaCabecera))
        .where(
            and(
                eq(RutinaCabecera.idRutina, rutinaId),
                eq(RutinaCabecera.finished, false)
            )
        )
        .orderBy(asc(RutinaDetalle.idEjercicio))

    const nombreEjercicios: (string|null)[] = []
    const detalles: RutinaDetalleType[] = []
    let currentDetalleIndex = 0
    const idRutinaCabecera = currentDetalle[0]?.RutinaCabecera?.id ?? null
    for(let i=0; i<ejercicios.length; i++){
        nombreEjercicios.push(ejercicios[i].ejercicio.name)
        if(currentDetalle.length > 0 && currentDetalleIndex < currentDetalle.length  && 
        ejercicios[i].ejercicio.id === currentDetalle[currentDetalleIndex].RutinaDetalle.idEjercicio){
            detalles.push({
                idRutinaCabecera: idRutinaCabecera,
                idEjercicio: ejercicios[i].ejercicio.id,
                numeroSerie: currentDetalle[currentDetalleIndex].RutinaDetalle.numeroSerie,
                peso: currentDetalle[currentDetalleIndex].RutinaDetalle.peso,
                reps: currentDetalle[currentDetalleIndex].RutinaDetalle.reps
            })
            currentDetalleIndex++
        }else{
            detalles.push({
                idRutinaCabecera: idRutinaCabecera,
                idEjercicio: ejercicios[i].ejercicio.id,
                numeroSerie: 1,
                peso: null,
                reps: null
            })
        }
    }
    return {nombreEjercicios, detalles}
}

//Revisar esta función cuando se agregue un nuevo ejercicio a la rutina y este aún no tenga un detalle asociado
export async function getRutinaEjercicioWithLastFinishedDetalle(rutinaId){ 
    const ids = await db.select({ejercicioId: RutinaToEjercicio.ejercicioId, fecha: max(RutinaCabecera.fecha)}).from(RutinaToEjercicio)
        .leftJoin(RutinaDetalle, eq(RutinaDetalle.idEjercicio, RutinaToEjercicio.ejercicioId))
        .leftJoin(RutinaCabecera, eq(RutinaCabecera.id, RutinaDetalle.idRutinaCabecera))
        .where(
            and(
                eq(RutinaToEjercicio.rutinaId, rutinaId),
                eq(RutinaCabecera.finished, true)
            )
        )
        .groupBy(RutinaToEjercicio.ejercicioId)
    const results = await db.select().from(RutinaDetalle)
        .innerJoin(RutinaCabecera, eq(RutinaCabecera.id, RutinaDetalle.idRutinaCabecera))
        .where(
            or(
                ...ids.map(i => {
                    return(
                        and(
                            eq(i.ejercicioId, RutinaDetalle.idEjercicio),
                            eq(i.fecha, RutinaCabecera.fecha)
                        )
                    )
                })
            )
        )

    return results.map(r => r.RutinaDetalle)
}

export async function saveRutinaCabeceraAndDetalle(detalle: RutinaDetalleType[], idRutina){
    let filteredDetalles = detalle.filter(d => (d.reps && d.peso) !== null )
    console.log(filteredDetalles)
    //Si no tiene rutina cabecera, entonces el detalle tampoco existe
    if(!detalle[0].idRutinaCabecera){
        const idRutinaCabecera = uuid.v4()
        await db.insert(RutinaCabecera).values({
            id: idRutinaCabecera,
            idRutina: idRutina,
            fecha: new Date().toISOString(),
            finished: false
        })
        filteredDetalles.forEach(d => d.idRutinaCabecera = idRutinaCabecera)
        await db.insert(RutinaDetalle).values(filteredDetalles)
        return
    }
    await db.delete(RutinaDetalle).where(eq(RutinaDetalle.idRutinaCabecera, detalle[0].idRutinaCabecera))
    await db.insert(RutinaDetalle).values(filteredDetalles)
}

export async function saveAndFinishRutinaCabeceraAndDetalle(detalle: RutinaDetalleType[], idRutina){
    let filteredDetalles = detalle.filter(d => (d.reps && d.peso) !== null )
    //Si no tiene rutina cabecera, entonces el detalle tampoco existe
    if(!detalle[0].idRutinaCabecera){
        const idRutinaCabecera = uuid.v4()
        await db.insert(RutinaCabecera).values({
            id: idRutinaCabecera,
            idRutina: idRutina,
            fecha: new Date().toISOString(),
            finished: true
        })
        filteredDetalles.forEach(d => d.idRutinaCabecera = idRutinaCabecera)
        await db.insert(RutinaDetalle).values(filteredDetalles)
        return
    }
    await db.delete(RutinaDetalle).where(eq(RutinaDetalle.idRutinaCabecera, detalle[0].idRutinaCabecera))
    await db.insert(RutinaDetalle).values(filteredDetalles)
    await db.update(RutinaCabecera).set({finished: true}).where(eq(RutinaCabecera.id, detalle[0].idRutinaCabecera))
}

const crearCabecera = async (rutinaId)=>{
    await db.insert(RutinaCabecera).values({
        id: 2,
        idRutina: rutinaId,
        fecha: new Date().toISOString()
    })
    await db.insert(RutinaDetalle).values([
        {idRutinaCabecera: 1,
        idEjercicio: 1,
        peso: 50,
        reps: 25,
        numeroSerie: 1,},
        {idRutinaCabecera: 1,
        idEjercicio: 2,
        peso: 25,
        reps: 25,
        numeroSerie: 1,}
]
    )
}

export async function initializeDB(){
    await initializeEjercicios()
    await initializeRutinas()
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
        }
    ])
} 

async function initializeRutinas(){
    
    await db.insert(Rutina).values([
        {
            id: 1,
            name: "Torso"
        }
    ])
    await db.insert(RutinaToEjercicio).values([
        {
            rutinaId: 1,
            ejercicioId: 1
        },
        {
            rutinaId: 1,
            ejercicioId: 2
        }
    ])
}
//export function saveTrain()