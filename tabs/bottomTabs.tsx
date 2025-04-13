import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FormDon from "../screens/FormDon";
import ListeAssociations from "../screens/ListeAssociations";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="FormDon" component={FormDon} />
      <Tab.Screen name="ListeAssociations" component={ListeAssociations} />
    </Tab.Navigator>
  );
}
