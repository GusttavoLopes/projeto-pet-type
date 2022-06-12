import styles from "./styles";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { FAB } from "react-native-paper";
import { useAuth, usePet } from "../../hooks";
import Loading from "../../components/LoadingComponent";
import Empty from "../../components/EmptyComponent";
import { PetResponse, Pet as PetType } from "../../ts/types";

export default function Pet(props: any) {
  const [selected, setSelected] = useState<string>("");
  const [register, setRegister] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [operationType, setOperationType] = useState<string>("");
  const [list, setList] = useState<PetType[]>([]);

  const { signOut } = useAuth();
  const { selectPet, petList, petCreate, petRemove } = usePet();

  useEffect(() => {
    async function list(): Promise<void> {
      setLoading(true);
      setOperationType("Carregando Pets");
      const response: PetResponse = await petList();
      if (response.pets) {
        setList(response.pets);
        if (response.pets.length > 0) handleSelect(response.pets[0]);
      }
      setLoading(false);
    }
    list();
  }, []);

  const handleSelect = (pet: PetType) => {
    setSelected(pet?.idpet);
    selectPet(pet);
  };

  //* create pet
  const add = async (name: string): Promise<void> => {
    setOperationType("Criando Pet");
    name = name.trim();
    if (name) {
      setLoading(true);
      const response: PetResponse = await petCreate(name);
      if (response.idpet) {
        console.log(response.idpet);
        const aux = [...list, response];
        setList(aux);
        handleSelect(response);
        setRegister(false);
      } else Alert.alert(response.error || "Problemas para cadastrar o pet");
      setLoading(false);
    } else Alert.alert("Forneça o nome do pet");
  };

  //* remove pet
  const remove = async (idpet: string, name: string): Promise<void> => {
    setOperationType("Removendo Pet");
    Alert.alert(null, `Excluir definitivamente o pet ${name}?`, [
      {
        text: "Sim",
        onPress: async () => {
          setLoading(true);
          const response: PetResponse = await petRemove(idpet);
          if (response.idpet) {
            const aux = [...list];
            for (let i = 0; i < aux.length; i++) {
              if (aux[i].idpet == idpet) {
                aux.splice(i, 1);
                setList(aux);
                if (idpet == selected && aux.length > 0) handleSelect(aux[0]);
                break;
              }
            }
            setLoading(false);
          } else
            Alert.alert(response.error || "Problemas para cadastrar o pet");
        },
      },
      {
        text: "Não",
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.itemtext}
        onPress={() => {
          handleSelect(item);
        }}
      >
        <Text
          style={[
            styles.itemname,
            selected == item.idpet && { fontWeight: "bold" },
          ]}
        >
          {item.name}
        </Text>
        {selected == item.idpet && (
          <Entypo
            name="check"
            color="#555"
            size={25}
            style={styles.itemcheck}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.remove}
        onPress={() => remove(item.idpet, item.name)}
      >
        <MaterialCommunityIcons name="delete" color="#555" size={25} />
      </TouchableOpacity>
    </View>
  );

  return loading ? (
    <Loading operation={operationType} />
  ) : register ? (
    <Register
      lista={list}
      setLista={setList}
      setRegister={setRegister}
      add={add}
    />
  ) : (
    <View style={styles.container}>
      {list.length > 0 ? (
        <FlatList
          style={styles.list}
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.idpet}
        />
      ) : (
        <Empty />
      )}
      <FAB
        style={styles.add}
        small
        color="white"
        icon="plus"
        onPress={() => setRegister(true)}
      />
      <FAB
        style={styles.exit}
        small
        color="white"
        icon="exit-to-app"
        onPress={() => signOut()}
      />
    </View>
  );
}

//* register pet
function Register(props: any) {
  const [name, setName] = useState<string>("");

  return (
    <View style={styles.registercontainer}>
      <View style={styles.box}>
        <Text style={styles.title}>CADASTRAR PET</Text>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Nome do pet</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            autoCapitalize="words"
          />
        </View>
        <View style={styles.boxButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.add(name)}
          >
            <Text style={styles.buttonLabel}>salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.setRegister(false)}
          >
            <Text style={styles.buttonLabel}>voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
