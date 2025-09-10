import { CellProps } from "@/components/game/cell";

// I need cell props into params of the function
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

  // Aquí deberías añadir la lógica para colocar las bombas aleatoriamente
  // y calcular los valores de las celdas adyacentes

  insertBombs(board, bombs);

  return board;
}

function updateAdjacentCells(board: Board, bombRow: number, bombCol: number): void {
  const height = board.length;
  const width = board[0].length;

  /**
   * Direcciones de las 8 celdas adyacentes
   *
   * [-1, -1], [-1, 0], [-1, 1],  // fila superior
   * [0, -1],           [0, 1],   // fila actual (izquierda y derecha)
   * [1, -1],  [1, 0],  [1, 1]    // fila inferior
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

    // Verificar que las coordenadas estén dentro del tablero
    if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
      const cell = board[newRow][newCol];
      // Solo incrementar si no es una bomba
      if (!cell.isBomb) {
        cell.value = (cell.value || 0) + 1;
      }
    }
  }
}

// Función para insertar bombas en el tablero
function insertBombs(board: Board, bombs: number): void {
  const height = board.length;
  const width = board[0].length;
  const totalCells = height * width;

  // Verificar que no se pidan más bombas que celdas disponibles
  if (bombs >= totalCells) {
    throw new Error("No se pueden colocar más bombas que celdas disponibles");
  }

  let bombsPlaced = 0;

  while (bombsPlaced < bombs) {
    // Generar coordenadas aleatorias
    const randomRow = Math.floor(Math.random() * height);
    const randomCol = Math.floor(Math.random() * width);

    // Verificar si la celda ya tiene una bomba
    if (!board[randomRow][randomCol].isBomb) {
      // Colocar la bomba
      board[randomRow][randomCol].isBomb = true;
      bombsPlaced++;

      // Incrementar el valor de las celdas adyacentes
      updateAdjacentCells(board, randomRow, randomCol);
    }
  }
}
