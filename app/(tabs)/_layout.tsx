import { Tabs } from 'expo-router';
import { rutinaRoutes, agendaPesoHome } from '@/constants/Routes';
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { Colors } from '@/constants/Colors';
// eslint-disable-next-line import/no-unresolved
import { useColorScheme } from '@/hooks/useColorScheme';
import BalanceIcon from '@/components/icons/BalanceIcon';
import DumbellIcon from '@/components/icons/DumbellIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    
    <Tabs
      initialRouteName={rutinaRoutes.rutinaHome}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
      }}>
      
      <Tabs.Screen
        name={rutinaRoutes.rutinaHome}
        options={{
          title: 'Rutinas', 
          headerTitleAlign: "center",

          tabBarIcon: () => (
            <DumbellIcon viewBox={"0.6 3 18 18"}/>
          ),
        }}
      />

      <Tabs.Screen
        name={agendaPesoHome}
        options={{
          title: 'Libreta de peso', 
          headerTitleAlign: "center",
          tabBarIcon: ({ color, focused }) => (
            <BalanceIcon/>
          ),
        }}
      />
    </Tabs>
  );
}
