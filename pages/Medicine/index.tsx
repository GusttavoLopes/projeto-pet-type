import styles from "./styles";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FAB } from "react-native-paper";
import { usePet, useMedicine } from "../../hooks";
import Loading from "../../components/LoadingComponent";
import Empty from "../../components/EmptyComponent";

import { MedicineType, MedicineResponse } from "../../ts/types";

export default function Medicine(props) {
  const { pet } = usePet();
  const { medicineCreate, medicineList, medicineRemove } = useMedicine();

  const [register, setRegister] = useState<boolean>(false);
  const [list, setList] = useState<MedicineType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [operationType, setOperationType] = useState<string>("");

  useEffect(() => {
    async function list(): Promise<void> {
      setOperationType("Carregando");
      setLoading(true);

      const { medicines } = await medicineList(pet?.idpet);

      if (medicines) {
        setList(medicines);
      }

      setLoading(false);
    }
    list();
  }, []);

  useEffect(() => {
    async function list(): Promise<void> {
      setOperationType("Carregando");
      setLoading(true);

      const { medicines } = await medicineList(pet?.idpet);

      if (medicines) {
        setList(medicines);
      }

      setLoading(false);
    }
    list();
  }, [pet]); 

  const add = async (name: string): Promise<void> => {
    setOperationType("Criando Medicamento");
    setLoading(true);
    name = name.trim();
    const date =
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear();

    const medicine: MedicineType = { idpet: pet.idpet, name: name };

    const res: MedicineType = await medicineCreate(medicine);
    if (res.idmedicine) {
      const { idmedicine } = res;
      const aux = [...list, { idmedicine, name, date }];
      setList(aux);
    }

    setRegister(false);
    setLoading(false);
  };

  const remove = async (id: string, medicineName: string): Promise<void> => {
    setOperationType("Removendo Medicamento");

    Alert.alert(
      null,
      `Excluir definitivamente o medicamento ${medicineName}?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            setLoading(true);
            const response: MedicineResponse = await medicineRemove(id);
            if (response.idmedicine) {
              const aux = [...list];
              console.log(aux);
              for (let i = 0; i < aux.length; i++) {
                if (aux[i].idmedicine == response.idmedicine) {
                  aux.splice(i, 1);
                  setList(aux);
                  break;
                }
              }
              setLoading(false);
            } else
              Alert.alert(
                response.error ||
                  `Problemas para remover o medicamento ${medicineName}`
              );
          },
        },
        {
          text: "Não",
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemtext}>
        <Text style={styles.itemname}>{item.name}</Text>
        <Text style={styles.itemname}>{item.date}</Text>
      </View>
      <TouchableOpacity
        style={styles.remove}
        onPress={() => remove(item.idmedicine, item.name)}
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
      <View style={styles.titlebox}>
        <Text style={styles.titletext}>{pet?.name}</Text>
      </View>
      {list.length > 0 ? (
        <FlatList
          style={styles.list}
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.idmedicine}
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
    </View>
  );
}

function Register(props: any) {
  const [name, setName] = useState<string>("");

  return (
    <View style={styles.registercontainer}>
      <View style={styles.box}>
        <Text style={styles.title}>CADASTRAR MEDICAMENTO</Text>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Nome do medicamento</Text>
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
