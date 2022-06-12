import styles from "./styles";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import Loading from "../../components/LoadingComponent";
import { useAuth } from "../../hooks";
import { User, UserResponse } from "../../ts/types";

export default function Login(props: any) {
  const [mail, setMail] = useState<string>("ana@teste.com");
  const [password, setPassword] = useState<string>("123456");
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn } = useAuth();

  function handleSign() {
    if (!mail) {
      Alert.alert("Forneça o e-mail");
    } else if (password.length < 6 || password.length > 10) {
      Alert.alert("A senha precisa ter entre 6 e 10 caracteres");
    } else {
      setLoading(true);
      const user: User = { mail, password };
      signIn(user)
        .then((res: UserResponse) => {
          if (res?.error) Alert.alert(res.error);
        })
        .finally(() => setLoading(false));
    }
  }

  return !loading ? (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>LOGIN</Text>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            onChangeText={setMail}
            value={mail}
            autoCapitalize="none"
            // autoComplete="email"
            autoCorrect={false}
            keyboardType="email-address"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.boxButton}>
          <TouchableOpacity style={styles.button} onPress={handleSign}>
            <Text style={styles.buttonLabel}>logar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation?.navigate("Home")}
          >
            <Text style={styles.buttonLabel}>voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : (
    <Loading />
  );
}
