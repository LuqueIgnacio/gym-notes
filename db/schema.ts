import { integer, sqliteTable, blob, text, primaryKey, real } from 'drizzle-orm/sqlite-core'
import { relations } from 'drizzle-orm';


export const Peso = sqliteTable("peso", {
    id: integer("id").primaryKey({autoIncrement: true}),
    peso: real("peso").notNull(),
    fecha: text("fecha").notNull()
})

export const Actividad = sqliteTable("actividad", {
    id: integer("id").primaryKey({autoIncrement: true}),
    huboActividad: integer("huboActividad", {mode: 'boolean'}),
    fecha: text("fecha").notNull()
})

export const Rutina = sqliteTable("rutina", {
    id: blob("id").primaryKey(),
    name: text("name")
})

export const rutinaRelations = relations( Rutina, ({many}) =>({
    rutinaToEjercicio: many(RutinaToEjercicio),
    rutinaCabecera: many(RutinaCabecera)
}))

export const Ejercicio = sqliteTable("ejercicio", {
    id: integer("id").primaryKey({autoIncrement: true}),
    name: text("name")
})

export const ejercicioRelations = relations(Ejercicio, ({many}) => ({
    rutinaToEjercicio: many(RutinaToEjercicio),
    rutinaDetalle: many(RutinaDetalle) 
}))

export const RutinaToEjercicio = sqliteTable("Rutina-Ejercicio", {
    rutinaId: blob("rutinaId").notNull().references(() => Rutina.id),
    ejercicioId: integer("ejercicioId").notNull().references(() => Ejercicio.id),
    },
    (t) => ({
        pk: primaryKey({columns: [t.rutinaId, t.ejercicioId]}),
    })
)

export const RutinaToEjercicioRelations = relations(RutinaToEjercicio, ({one}) =>({
    rutina: one(Rutina, {
        fields: [RutinaToEjercicio.rutinaId],
        references: [Rutina.id]
    }),
    ejercicio: one(Ejercicio, {
        fields: [RutinaToEjercicio.ejercicioId],
        references: [Ejercicio.id]
    })
}))

export const RutinaCabecera = sqliteTable("RutinaCabecera", {
    id: blob("id").primaryKey(),
    idRutina: blob("idRutina").notNull().references(() => Rutina.id),
    fecha: text("fecha"),
    tiempoInicio: text("tiempoInicio"),
    tiempoFinal: text("tiempoFinal"),
    finished: integer("finished", {mode: 'boolean'}).default(false)
})

export const rutinaCabeceraRelations = relations(RutinaCabecera, ({one, many}) =>({
    rutina: one(Rutina, {
        fields: [RutinaCabecera.idRutina],
        references: [Rutina.id]
    }),
    rutinaDetalle: many(RutinaDetalle)
}))

export const RutinaDetalle = sqliteTable("RutinaDetalle", {
    idRutinaCabecera: blob("idRutinaCabecera").notNull().references(() => RutinaCabecera.id),
    idEjercicio: integer("idEjercicio").notNull().references(() => Ejercicio.id),
    numeroSerie: integer("numeroSerie"),
    peso: real("peso"),
    reps: integer("reps"),
    },
    (t) => ({
        pk: primaryKey({columns: [t.idEjercicio, t.idRutinaCabecera, t.numeroSerie]})
    })
)

export const rutinaDetalleRelations = relations(RutinaDetalle, ({one}) =>({
    rutinaCabecera: one(RutinaCabecera, {
        fields: [RutinaDetalle.idRutinaCabecera],
        references: [RutinaCabecera.id]
    }),
    ejercicio: one(Ejercicio, {
        fields: [RutinaDetalle.idEjercicio],
        references: [Ejercicio.id]
    })
}))

