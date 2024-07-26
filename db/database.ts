import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import * as schema from "../db/schema"

const expo = openDatabaseSync(process.env.EXPO_PUBLIC_DB_NAME); 
const db = drizzle(expo, {schema});
export default db 
