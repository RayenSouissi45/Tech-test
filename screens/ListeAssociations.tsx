import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import MapView from "react-native-maps";
import LottieView from "lottie-react-native";

const associations = [
  { id: "1", name: "foodBardo", category: "food" },
  { id: "2", name: "hospital", category: "healthcare" },
  { id: "3", name: "restau", category: "restaurants" },
  { id: "4", name: "big pro", category: "pro" },
  { id: "5", name: "Clean Water", category: "sale de jeux" },
];

export default function ListeAssociations() {
  const [search, setSearch] = useState("");
  const [mapVisible, setMapVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredAssociations = associations.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword)
    );
  });

  if (!isReady) {
    return (
      <View style={styles.lottieContainer}>
        <LottieView
          source={require("../assets/lottie/dealForm.json")}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Associations</Text>

      <TextInput
        style={styles.input}
        placeholder="Rechercher par nom ou catégorie"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredAssociations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>Cateorie: {item.category}</Text>
          </View>
        )}
      />

      <TouchableWithoutFeedback onPress={() => setMapVisible(true)}>
        <View style={styles.mapContainer}>
          <MapView style={styles.map} />
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={mapVisible}>
        <TouchableWithoutFeedback onPress={() => setMapVisible(false)}>
          <View style={styles.fullMapContainer}>
            <MapView style={styles.fullMap} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  lottieContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "grey",
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
  },
  category: {
    fontSize: 14,
    color: "black",
    marginTop: 4,
  },
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 15,
  },
  map: {
    flex: 1,
  },
  fullMapContainer: {
    flex: 1,
  },
  fullMap: {
    flex: 1,
  },
});
