import { Rutina as RutinaSchema, Ejercicio as EjercicioSchema, RutinaToEjercicio, Rutina } from "@/db/schema"
import { type InferSelectModel } from 'drizzle-orm'
export type EjercicioType = typeof EjercicioSchema.$inferSelect 
export type RutinaToEjercicioType = typeof RutinaToEjercicio.$inferSelect

export interface RutinaType extends Omit<InferSelectModel<typeof Rutina>, "id">{
    id?: unknown
}

export interface RutinaWithEjerciciosType extends RutinaType{
    ejercicios: EjercicioType[] 
}

export interface RutinaWithRutinaToEjercicioType extends RutinaType{
    ejercicios: RutinaToEjercicioType[]
}

export interface EjercicioSeleccionado extends EjercicioType{
    key: any
}

export interface EjercicioDropdownType extends EjercicioType{
    title: string,
    isSelected: boolean
}
