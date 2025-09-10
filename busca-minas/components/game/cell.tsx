import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

export interface CellProps {
  row: number;
  col: number;
  value: number;
  isBomb: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
}

export default function Cell(props: CellProps) {
  const { isBomb, value } = props;

  return (
    <TouchableOpacity style={styles.container}>
      {/* 💣 */}
      <ThemedText style={styles.text}>{isBomb ? "💣" : value}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    backgroundColor: "#292d30ff",
    margin: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
