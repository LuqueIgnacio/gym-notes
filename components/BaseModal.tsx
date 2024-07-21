import { View, Modal} from 'react-native'
import React from 'react'

export default function BaseModal({animationType, visible, children}) {
  return (
    <Modal animationType={animationType} visible={visible} transparent={true}>
        <View className="flex items-center w-2/3 m-auto bg-gray-50 rounded-xl p-4 shadow-2xl shadow-gray-700">
            {children}
        </View>
    </Modal>
  )
}