import { AppContext } from "@/context/AppProvider"
import { useContext } from "react"

export const useAppContext = () =>{
    return useContext(AppContext)
}