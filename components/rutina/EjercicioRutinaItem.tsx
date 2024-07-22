import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import PencilIcon from '../icons/PencilIcon'
import ItemListContainer from '../ItemListContainer'
import SelectDropdown from "react-native-select-dropdown"
import TrashButton from '../buttons/TrashButton'
import DropdownItemContainer from '../DropdownItemContainer'

export default function EjercicioRutinaItem({handleOnSelect, deleteItem, data, ejercicios, index, disabled}) {
    const ref = useRef(null)
    const ejercicio = ejercicios[index]
    return (
    <>
    <ItemListContainer style="flex-row justify-between items-center">
        <TouchableOpacity className="flex-row space-x-2" disabled={disabled} onPress={() => ref.current.openDropdown()}>
            <Text className="text-base font-bold">{ejercicio.name}</Text>
            <PencilIcon width={30} height={30} />
        </TouchableOpacity>
        {ejercicios.length > 1 ?
            (
                <TrashButton width={30} height={30} onPress={() => deleteItem(index)} />
            ): null}
    </ItemListContainer>
    <View className="flex mx-auto w-4/6">
        <SelectDropdown
            search={true}
            ref={ref}
            dropdownStyle={{ borderRadius: 8 }}
            data={data}
            onSelect={(selectedItem) => {handleOnSelect(index, {id: selectedItem.id, name: selectedItem.title})}}
            renderItem={(ejercicio, index, isSelected) => {
                return !ejercicio.isSelected ? (
                    <View>
                        <DropdownItemContainer>
                            <Text className="text-base" >{ejercicio.title}</Text>
                        </DropdownItemContainer>
                    </View>
                ): <></>
            } } />
    </View>
    </>
    )
}