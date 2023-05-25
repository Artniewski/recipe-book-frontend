import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Octicons";

export default function StepsView({ recipeData }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.containerText}>Instructions</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={recipeData.instructions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.containerRow} key={item}>
              <View style={styles.dotContainer}>
                <Icon
                  style={styles.dot}
                  name="dot-fill"
                  size={15}
                  color="#333333"
                />
              </View>
              <Text style={styles.containerRowText}>{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    margin: 25,
    borderRadius: 20,
    paddingBottom: 20,
  },
  containerHeader: {
    backgroundColor: "#CBB18A",
    padding: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  containerText: {
    fontSize: 25,
    fontFamily: "Inter",
    fontWeight: "800",
    color: "#333333",
  },
  containerRow: {
    marginLeft: 20,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  dotContainer: {
    marginRight: 5,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  dot: {
    alignSelf: "center",
  },
  containerRowText: {
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "500",
    color: "#333333",
    flex: 1,
  },
});
