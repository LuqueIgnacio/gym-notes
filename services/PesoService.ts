import db from "@/db/database";
import { Peso } from "@/db/schema";
import { PesoType } from "@/types/types";
import { asc, desc, eq } from "drizzle-orm";

export async function savePeso({peso, fecha}: {peso: number, fecha: Date}){
    const stringFecha = fecha.toISOString()
    const result = await db.query.Peso.findFirst({
        where: eq(Peso.fecha, stringFecha)
    })

    if(result){
        return (await db.update(Peso).set({peso: peso}).where(eq(Peso.id, result.id)).returning())[0].id
    }
    return (await db.insert(Peso).values({peso: peso, fecha: stringFecha}).returning())[0].id
}

export async function getLastSevenPesos(){
    const pesos: PesoType[] = (await db.select().from(Peso).limit(7).orderBy(desc(Peso.fecha))).map( peso => {
        return {id: peso.id, fecha: new Date(peso.fecha), peso: peso.peso}
    })
    return pesos.toReversed()
}

export async function deletePeso(id: number){
    await db.delete(Peso).where(eq(Peso.id, id))
}