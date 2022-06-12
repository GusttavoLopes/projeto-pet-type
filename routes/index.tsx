import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

import { AuthContext } from "../contexts";

export default function Routes() {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return !token ? <AuthRoutes /> : <AppRoutes />;
}

const Loading = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFC125",
    }}
  >
    <ActivityIndicator size="large" color="#666" />
  </View>
);
