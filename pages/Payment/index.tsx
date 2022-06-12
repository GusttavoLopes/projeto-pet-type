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
import { usePet, usePayment } from "../../hooks";
import { PaymentType, PaymentResponse } from "../../ts/types";
import Loading from "../../components/LoadingComponent";
import Empty from "../../components/EmptyComponent";

export default function Payment(props: any) {
  const { pet } = usePet();
  const { paymentCreate, paymentList, paymentRemove } = usePayment();

  const [register, setRegister] = useState<boolean>(false);
  const [list, setList] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [operationType, setOperationType] = useState<string>("");

  useEffect(() => {
    async function loadPaymentList(): Promise<void> {
      setOperationType("Carregando");
      setLoading(true);
      const { payments } = await paymentList(pet?.idpet);
      if (payments) {
        setList(payments);
      }
      setLoading(false);
    }
    loadPaymentList();
  }, [pet]);

  const add = async (description: string, value: number): Promise<void> => {
    setOperationType("Criando Pagamento");
    setLoading(true);
    description = description.trim();
    const date =
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear();

    const payment: PaymentType = {
      idpet: pet.idpet,
      description,
      value,
      date,
    };

    const res: PaymentType = await paymentCreate(payment);

    if (res.idpayment) {
      const { idpayment } = res;
      const aux = [...list, { idpayment, description, value, date }];
      setList(aux);
    }

    setRegister(false);
    setLoading(false);
  };

  const remove = async (
    id: string,
    paymentDescription: string
  ): Promise<void> => {
    setOperationType("Removendo Pagamento");

    Alert.alert(
      null,
      `Excluir definitivamente o pagamento ${paymentDescription}?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            setLoading(true);
            const response: PaymentResponse = await paymentRemove(id);
            if (response.idpayment) {
              const aux = [...list];
              for (let i = 0; i < aux.length; i++) {
                if (aux[i].idpayment == id) {
                  aux.splice(i, 1);
                  setList(aux);
                  break;
                }
              }
              setLoading(false);
            } else
              Alert.alert(
                response.error ||
                  `Problemas para remover o pagamento ${paymentDescription}`
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
        <Text style={styles.itemname}>{item.description}</Text>
        <Text style={styles.itemname}>
          R${item.value} - {item.date}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.remove}
        onPress={() => remove(item.idpayment, item.description)}
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
          keyExtractor={(item) => item.idpayment}
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
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<string>("");

  return (
    <View style={styles.registercontainer}>
      <View style={styles.box}>
        <Text style={styles.title}>CADASTRAR GASTO</Text>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
            autoCapitalize="words"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Valor</Text>
          <TextInput
            style={styles.input}
            onChangeText={setValue}
            value={value}
            keyboardType="decimal-pad"
          />
        </View>
        <View style={styles.boxButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.add(description, value)}
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
