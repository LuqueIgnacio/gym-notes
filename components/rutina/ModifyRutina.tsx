import ItemListContainer from "@/components/ItemListContainer";
import CircleCheckButton from "@/components/buttons/CircleCheckButton";
import CirclePlusButton from "@/components/buttons/CirclePlusButton";
import EjercicioRutinaItem from "@/components/rutina/EjercicioRutinaItem";
import { useState } from "react";
import { View, TextInput, FlatList } from "react-native";
import uuid from "react-native-uuid";

export default function ModifyRutina({nombreRutinaState, cantidadEjerciciosSeleccionadosState, ejerciciosSeleccionadosState, onSave, ejerciciosState}) {
  const [nombreRutina, setNombreRutina] = nombreRutinaState;
  const [ejerciciosSeleccionados, setEjerciciosSeleccionados] = ejerciciosSeleccionadosState;
  const [cantidadEjerciciosSeleccionados, setCantidadEjerciciosSeleccionados] = cantidadEjerciciosSeleccionadosState;
  const [data, setData] = ejerciciosState

  const handleOnSelect = (index: number, ejercicio) => {
    const newEjercicios = ejerciciosSeleccionados.slice(0);
    const newData = data.slice(0);
    let newCantidadEjerciciosSeleccionados =
      cantidadEjerciciosSeleccionados + 1;
      newEjercicios[index] = {
      id: ejercicio.id,
      name: ejercicio.name,
      key: ejerciciosSeleccionados[index].key,
    };
    newData[newData.findIndex((item) => item.id === ejercicio.id)].isSelected =
      true;
    if (ejerciciosSeleccionados[index].id) {
      newData[
        newData.findIndex((item) => item.id === ejerciciosSeleccionados[index].id)
      ].isSelected = false;
      newCantidadEjerciciosSeleccionados--;
    }
    setEjerciciosSeleccionados(newEjercicios);
    setData(newData);
    setCantidadEjerciciosSeleccionados(newCantidadEjerciciosSeleccionados);
  };

  const deleteItem = (index: number) => {
    const newEjercicios = ejerciciosSeleccionados.slice(0);
    const newData = data.slice(0);
    newEjercicios.splice(index, 1);
    if (ejerciciosSeleccionados[index].name) {
      newData[
        newData.findIndex((item) => item.id === ejerciciosSeleccionados[index].id)
      ].isSelected = false;
      setCantidadEjerciciosSeleccionados(cantidadEjerciciosSeleccionados - 1);
    }
    setEjerciciosSeleccionados(newEjercicios);
    setData(newData);
  };

  const addItem = () => {
    const newEjercicios = ejerciciosSeleccionados.slice(0);
    newEjercicios.push({ id: null, name: "", key: uuid.v4() });
    setEjerciciosSeleccionados(newEjercicios);
  };

  const areButtonsDisabled = cantidadEjerciciosSeleccionados === data.length;

  return (
    <>
      <View>
        <ItemListContainer className="flex-row justify-center mx-5 mt-5 bg-gray-50 ">
          <View>
            <TextInput
              className="text-base text-center font-bold"
              placeholder="Nombre Rutina"
              textAlign="center"
              maxLength={20}
              onChangeText={(text) => setNombreRutina(text)}
              defaultValue={nombreRutina}
            ></TextInput>
          </View>
        </ItemListContainer>
      </View>

      <FlatList
        className="flex grow-0"
        data={ejerciciosSeleccionados}
        keyExtractor={(item) => item.key}
        renderItem={({ index }) => {
          return (
            <EjercicioRutinaItem
              index={index}
              data={data}
              ejercicios={ejerciciosSeleccionados}
              deleteItem={deleteItem}
              handleOnSelect={handleOnSelect}
              disabled={areButtonsDisabled}
            />
          );
        }}
      />

      <View className="flex-row justify-center mb-5 mt-4">
        {ejerciciosSeleccionados.length != data.length ? (
          <CirclePlusButton width={40} height={40} onPress={addItem} />
        ) : null}
        <CircleCheckButton width={40} height={40} onPress={() => onSave()} />
      </View>
    </>
  );
}