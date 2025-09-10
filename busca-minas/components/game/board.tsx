import { ThemedView } from "../ThemedView";
import { useReducer } from "react";
import { StyleSheet } from "react-native";
import { createBoard } from "@/utils/game";

import gameReducer from "@/reducers/gameState";
import Cell from "./cell";

interface BoardProps {
  size: number;
  bombs: number;
}

export default function Board(props: BoardProps) {
  const { size, bombs } = props;

  const [gameState, dispatch] = useReducer(gameReducer, {
    board: createBoard(size, size, bombs),
    gameStatus: "playing",
    flagCount: 0,
    mineCount: bombs,
  });

  return (
    <ThemedView style={styles.container}>
      {gameState.board.map((row, rowIdx) => (
        <ThemedView style={styles.row} key={rowIdx}>
          {row.map((cell, colIdx) => (
            <Cell key={colIdx} {...cell} />
          ))}
        </ThemedView>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
});
