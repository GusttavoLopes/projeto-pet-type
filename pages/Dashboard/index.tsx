import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const { Navigator, Screen } = createMaterialTopTabNavigator();

import { PetProvider, MedicineProvider, PaymentProvider } from "../../contexts";

import { Pet, Payment, Medicine } from "../index";
import "./styles";

export default function Dashboard() {
  return (
    <PetProvider>
      <MedicineProvider>
        <PaymentProvider>
          <Navigator
            initialRouteName="Pet"
            screenOptions={{
              tabBarActiveTintColor: "#EE7600",
              tabBarInactiveTintColor: "#555",
              tabBarPressColor: "red",
              tabBarShowLabel: false,
              tabBarIndicatorStyle: { backgroundColor: "#EE7600" },
              tabBarStyle: { backgroundColor: "#fefefe" },
            }}
          >
            <Screen
              name="Pet"
              component={Pet}
              options={{
                tabBarLabel: "Pets",
                tabBarIcon: ({ color }) => (
                  <FontAwesome5 name="dog" color={color} size={25} />
                ),
              }}
            />
            <Screen
              name="Payment"
              component={Payment}
              options={{
                tabBarLabel: "Gastos",
                tabBarIcon: ({ color }) => (
                  <FontAwesome name="dollar" color={color} size={25} />
                ),
              }}
            />
            <Screen
              name="Medicine"
              component={Medicine}
              options={{
                tabBarLabel: "Medicamentos",
                tabBarIcon: ({ color }) => (
                  <AntDesign name="medicinebox" color={color} size={25} />
                ),
              }}
            />
          </Navigator>
        </PaymentProvider>
      </MedicineProvider>
    </PetProvider>
  );
}
