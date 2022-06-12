import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Message } from "../../ts/types";
import styles from "./styles";
const image = require("../../assets/no-data.png");

export default function Empty() {
  const route = useRoute();
  const [message, setMessage] = useState<Message>({});

  useEffect(() => {
    function handleScreenNavigation() {
      switch (route.name) {
        case "Payment":
          setMessage({
            top: "Não há pagamento cadastrado",
            bottom: "Clique no botão para efetuar o cadastro",
          });
          break;
        case "Medicine":
          setMessage({
            top: "Não há medicamento cadastrado",
            bottom: "Clique no botão para efetuar o cadastro",
          });
          break;
        case "Pet":
          setMessage({
            top: "Não há pet cadastrado",
            bottom: "Clique no botão para efetuar o cadastro",
          });
          break;
        default:
          setMessage({});
          break;
      }
    }

    handleScreenNavigation();
  }, []);

  return (
    <View style={styles.view}>
      <Text style={styles.text}>{message.top}</Text>
      <Image style={styles.image} source={image} resizeMode="contain" />
      <Text style={styles.text}>{message.bottom}</Text>
    </View>
  );
}
