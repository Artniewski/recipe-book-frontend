import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Dimensions } from "react-native";
import { Svg, Path } from "react-native-svg";
import Icon from "react-native-vector-icons/Octicons";

const window = Dimensions.get("window");

export default function IngredientsView({ recipeData }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.containerText}>Ingredients</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <FlatList
          data={recipeData.ingredients}
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
              <Text style={styles.containerRowText}>
                {item.name} - {item.quantity} {item.unit}
              </Text>
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
    alignItems: "center",
  },
  dotContainer: {
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    alignSelf: "center",
  },
  containerRowText: {
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "500",
    color: "#333333",
  },
});
