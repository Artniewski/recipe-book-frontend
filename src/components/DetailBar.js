import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Svg, Path } from "react-native-svg";
import Icon from "react-native-vector-icons/FontAwesome";

const window = Dimensions.get("window");

export default function DetailBar({ recipeData }) {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Icon name="heart-o" size={24} color="#333333" />
        <Text style={styles.text}>{recipeData.fav_count}</Text>
      </View>
      <View style={styles.item}>
        <Icon name="clock-o" size={24} color="#333333" />
        <Text style={styles.text}>{recipeData.time} min</Text>
      </View>
      <View style={styles.item}>
        <Icon name="user-o" size={24} color="#333333" />
        <Text style={styles.text}>{recipeData.userName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CBB18A",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    marginTop: 4,
    color: "#333333",
  },
});
