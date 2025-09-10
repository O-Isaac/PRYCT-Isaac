import { Board, createBoard } from "@/utils/game";

// Tipo para el estado del juego
interface GameState {
  board: Board; // Mantiene tu estructura actual de createBoard
  gameStatus?: "playing" | "won" | "lost";
  flagCount?: number;
  mineCount?: number;
}

type GameAction =
  | { type: "REVEAL_CELL"; payload: { row: number; col: number } }
  | { type: "FLAG_CELL"; payload: { row: number; col: number } }
  | { type: "RESET_GAME" }
  | { type: "START_GAME"; payload: { size: number; bombs: number } }
  | { type: "SET_GAME_STATUS"; payload: "playing" | "won" | "lost" };

export default function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "REVEAL_CELL": {
      const { row, col } = action.payload;
      // Tu lógica para revelar celda
      return state;
    }

    case "FLAG_CELL": {
      const { row, col } = action.payload;
      // Tu lógica para marcar/desmarcar celda
      return state;
    }

    case "RESET_GAME":
      // Tu lógica para reiniciar el juego
      return state;

    case "START_GAME": {
      const { size, bombs } = action.payload;
      return {
        ...state,
        board: createBoard(size, size, bombs),
        gameStatus: "playing",
        flagCount: 0,
        mineCount: bombs,
      };
    }

    case "SET_GAME_STATUS":
      return {
        ...state,
        gameStatus: action.payload,
      };

    default:
      return state;
  }
}
