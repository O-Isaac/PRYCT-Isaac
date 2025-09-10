import { CellProps } from "@/components/game/cell";

// I need cell props as params of the function
export function createCell(props: Partial<CellProps>): CellProps {
  return {
    row: props.row ?? 0,
    col: props.col ?? 0,
    value: props.value ?? 0,
    isBomb: props.isBomb ?? false,
    isRevealed: props.isRevealed ?? false,
    isFlagged: props.isFlagged ?? false,
  };
}

export type Board = CellProps[][];

export function createBoard(height: number, width: number, bombs: number) {
  const board = Array.from({ length: height }, (_, row) =>
    Array.from({ length: width }, (_, col) => createCell({ row, col }))
  );

  // Here you should add the logic to randomly place bombs
  // and calculate the values of the adjacent cells

  insertBombs(board, bombs);

  return board;
}

function updateAdjacentCells(board: Board, bombRow: number, bombCol: number): void {
  const height = board.length;
  const width = board[0].length;

  /**
   * Directions of the 8 adjacent cells
   *
   * [-1, -1], [-1, 0], [-1, 1],  // top row
   * [0, -1],           [0, 1],   // current row (left and right)
   * [1, -1],  [1, 0],  [1, 1]    // bottom row
   */
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
    const newRow = bombRow + rowOffset;
    const newCol = bombCol + colOffset;

    // Check that the coordinates are within the board
    if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
      const cell = board[newRow][newCol];
      // Only increment if it is not a bomb
      if (!cell.isBomb) {
        cell.value = (cell.value || 0) + 1;
      }
    }
  }
}

// Function to insert bombs into the board
function insertBombs(board: Board, bombs: number): void {
  const height = board.length;
  const width = board[0].length;
  const totalCells = height * width;

  // Make sure not to place more bombs than available cells
  if (bombs >= totalCells) {
    throw new Error("You cannot place more bombs than available cells");
  }

  let bombsPlaced = 0;

  while (bombsPlaced < bombs) {
    // Generate random coordinates
    const randomRow = Math.floor(Math.random() * height);
    const randomCol = Math.floor(Math.random() * width);

    // Check if the cell already has a bomb
    if (!board[randomRow][randomCol].isBomb) {
      // Place the bomb
      board[randomRow][randomCol].isBomb = true;
      bombsPlaced++;

      // Increment the value of adjacent cells
      updateAdjacentCells(board, randomRow, randomCol);
    }
  }
}
