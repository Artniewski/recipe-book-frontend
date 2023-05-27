import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Svg, Path } from "react-native-svg";

const window = Dimensions.get("window");

export default function TopHeader({
  recipeData,
  navigation,
  headerText,
  isAdd = false,
}) {
  var title;
  if (recipeData == null) {
    title = headerText;
  } else {
    title = recipeData.title;
  }
  // var title = recipeData == null ? headerText : recipeData.title;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconBack style={styles.image} />
        </TouchableOpacity>
      </View>
      {!{ isAdd } && (
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconHamburger style={styles.image} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const IconBack = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M11.707 4.293a1 1 0 0 1 0 1.414L6.414 11H20a1 1 0 1 1 0 2H6.414l5.293 5.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z"
      clipRule="evenodd"
    />
  </Svg>
);

const IconHamburger = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 33 26"
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={6.553}
      d="M4 4h25.658M4 13h25.658M4 22h25.658"
    />
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: "100%",
    height: 60,
    backgroundColor: "#CBB18A",
  },
  leftContainer: {
    marginRight: 10,
  },
  rightContainer: {
    marginLeft: "auto",
  },
  titleContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    textAlignVertical: "center",
  },
  image: {
    marginRight: 20,
    marginLeft: 0,
    width: 30,
    height: 30,
  },
});
