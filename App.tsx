import React, { useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";

import { AuthProvider } from "./contexts";

import Routes from "./routes";

export default function App() {
  useEffect(() => {
    // fixa a orientação da tela em portrait, no IOS precisa ser PORTRAIT_UP
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <NavigationContainer>
        <AuthProvider>
          {/*  tudo que fica dentro desse provider será repassado no children */}
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}
