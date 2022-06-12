import { View, ActivityIndicator, Text } from "react-native";
import styles from "./styles";

interface ILoadingProps {
  operation?: string;
}

const Loading: React.FC<ILoadingProps> = ({ operation }) => {
  return (
    <View style={styles.view}>
      {operation && <Text style={styles.text}>{operation}</Text>}
      <ActivityIndicator size="large" color="#666" />
    </View>
  );
};

export default Loading;
