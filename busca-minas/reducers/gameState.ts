import { Board, createBoard } from "@/utils/game";

// States and Actions for the game
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

      const newBoard = state.board.map((boardRow) => boardRow.map((cell) => ({ ...cell })));
      const cell = newBoard[row][col];

      // Not revealing if already revealed or flagged
      if (cell.isRevealed || cell.isFlagged) {
        return state;
      }

      // Function to reveal cells recursively
      // TODO: Extract this function to utils/game.ts
      function revealCell(r: number, c: number): void {
        // Verify that the coordinates are within the board
        if (r < 0 || r >= newBoard.length || c < 0 || c >= newBoard[0].length) {
          return;
        }

        const currentCell = newBoard[r][c];

        // Not revealing if already revealed or flagged
        if (currentCell.isRevealed || currentCell.isFlagged) {
          return;
        }

        // Reveal the cell
        currentCell.isRevealed = true;

        // If cell value is 0, reveal adjacent cells
        if (currentCell.value === 0) {
          // Directions of the 8 adjacent cells
          const directions = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
          ];

          for (const [rowOffset, colOffset] of directions) {
            revealCell(r + rowOffset, c + colOffset);
          }
        }
      }

      revealCell(row, col);

      // Game over if a bomb is revealed
      if (cell.isBomb) {
        // Reveal all bombs if a bomb is clicked
        newBoard.forEach((boardRow) => {
          boardRow.forEach((boardCell) => {
            if (boardCell.isBomb) {
              boardCell.isRevealed = true;
            }
          });
        });

        alert("Game Over!");

        return {
          ...state,
          board: newBoard,
          gameStatus: "lost" as const,
        };
      }

      // Check for win condition
      const hasWon = newBoard.every((boardRow) =>
        boardRow.every((boardCell) => boardCell.isBomb || boardCell.isRevealed)
      );

      return {
        ...state,
        board: newBoard,
        gameStatus: hasWon ? ("won" as const) : state.gameStatus,
      };
    }

    case "FLAG_CELL": {
      const { row, col } = action.payload;
      return state;
    }

    case "RESET_GAME":
      const height = state.board.length;
      const width = state.board[0].length;
      const bombs = state.mineCount || 10; // valor por defecto si no existe

      return {
        board: createBoard(height, width, bombs),
        gameStatus: "playing" as const,
        flagCount: 0,
        mineCount: bombs,
      };

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
