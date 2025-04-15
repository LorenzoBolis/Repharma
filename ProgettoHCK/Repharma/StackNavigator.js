import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import AddMedicine from "./screens/AddMedicine";
import Details from "./screens/Details";
import Farmacie from "./screens/Farmacie";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Group>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="AddMedicine" component={AddMedicine}/>
                <Stack.Screen name="Details" component={Details}/>
                <Stack.Screen name="Farmacie" component={Farmacie}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackNavigator;