import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import * as schema from "../db/schema"

const expo = openDatabaseSync(process.env.EXPO_PUBLIC_DB_NAME); 
const db = drizzle(expo, {schema});
/*Esto se hizo por un problema en las migraciones, cuando ya no se hagan más cambios en la bd borrar la carpeta drizzle y ejecutar 
npx drizzle-kit generate nuevamente. Ahora no se hace eso para no perder los datos con los que se está testeando la app */
//expo.execSync("ALTER TABLE RutinaCabecera ADD COLUMN finished INTEGER DEFAULT(0)")
export default db 
