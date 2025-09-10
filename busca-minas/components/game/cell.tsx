import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";

export interface CellProps {
  row: number;
  col: number;
  value: number;
  isBomb: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
}

interface CellComponentProps {
  onPress: (row: number, col: number) => void;
}

export default function Cell(props: CellProps & CellComponentProps) {
  const { isBomb, value, isRevealed, onPress, row, col } = props;

  return (
    <TouchableOpacity
      onPress={() => onPress(row, col)}
      style={[styles.container, !isRevealed && styles.hidden]}
    >
      {/* 💣 */}
      <ThemedText style={styles.text}>
        {isRevealed && (isBomb ? "💣" : value === 0 ? "" : value)}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    backgroundColor: "#202122ff",
    margin: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  hidden: {
    backgroundColor: "#292d30ff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
