import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthPhoneInputScreen from "../screens/authPhoneInputScreen";
import Welcome from "../screens/welcome";
import CodeVerificationScreen from "../screens/codeVerificationScreen";
import { style } from "./styles";
import ProfileInfoScreen from "../screens/profileInfoScreen";

const AuthSatack = () => {
  const stack = createStackNavigator();
  const authOption = {
    headerTitleAlign: "center",
    headerTitleStyle: style.headerTitle,
  };
  return (
    <stack.Navigator>
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="welcome"
        component={Welcome}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="auth_phone_input"
        component={AuthPhoneInputScreen}
      />
      <stack.Screen
        options={authOption}
        name="Code Verification"
        component={CodeVerificationScreen}
      />
      <stack.Screen
        options={authOption}
        name="Profile Info"
        component={ProfileInfoScreen}
      />
    </stack.Navigator>
  );
};

export default AuthSatack;
