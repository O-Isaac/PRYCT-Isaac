import { ThemedView } from "@/components/ThemedView";
import Board from "@/components/game/board";

export default function GameScreen() {
  return (
    <ThemedView>
      <Board size={10} bombs={10} />
    </ThemedView>
  );
}
