import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const Row = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.cell}>1</Text>
      <Text style={styles.cell}>1</Text>
      <Text style={styles.cell}>1</Text>
      <Text style={styles.cell}>1</Text>
      <Text style={styles.cell}>1</Text>
      <Text style={styles.cell}>1</Text>
      <Text style={styles.cell}>1</Text>
      <Text style={styles.cell}>1</Text>
      <Text style={styles.cell}>1</Text>
    </View>
  )
}

export default function HomeScreen() {
  return (
    <View style={{ height: 100, display: "flex", alignContent: "center"}}>
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex", 
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  cell: {
    backgroundColor: "red",
    color: "white",
    height: 30,
    width: 30,
    textAlign: "center",
    marginInline: 2.5
  }
});
