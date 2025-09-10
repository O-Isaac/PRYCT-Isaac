import { ThemedView } from "../ThemedView";
import { useReducer } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createBoard } from "@/utils/game";

import gameReducer from "@/reducers/gameState";
import Cell from "./cell";
import { ThemedText } from "../ThemedText";

interface BoardProps {
  size: number;
  bombs: number;
}

/**
 * TODO: Pass all to hooks
 * - useGame: all game logic (reducer, actions, etc.)
 */
export default function Board(props: BoardProps) {
  const { size, bombs } = props;

  const [gameState, dispatch] = useReducer(gameReducer, {
    board: createBoard(size, size, bombs),
    gameStatus: "playing" as const,
    flagCount: 0,
    mineCount: bombs,
  });

  const handleCellPress = (row: number, col: number) => {
    if (gameState.gameStatus === "lost" || gameState.gameStatus === "won") {
      return;
    }

    dispatch({ type: "REVEAL_CELL", payload: { row, col } });
  };

  const handleResetGame = () => {
    dispatch({ type: "RESET_GAME" });
  };

  return (
    <ThemedView style={styles.container}>
      {gameState.board.map((row, rowIdx) => (
        <ThemedView style={styles.row} key={rowIdx}>
          {row.map((cell, colIdx) => (
            <Cell
              onPress={handleCellPress}
              key={`${rowIdx}-${colIdx}`} // Mejor key
              {...cell}
            />
          ))}
        </ThemedView>
      ))}

      {gameState.gameStatus !== "playing" && (
        <TouchableOpacity style={styles.resetButton} onPress={handleResetGame}>
          <ThemedText>Reinciar juego</ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  resetButton: {
    backgroundColor: "#2e2f30ff",
    margin: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
  },
});
