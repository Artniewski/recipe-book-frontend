import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  Image,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { Svg, Path } from "react-native-svg";

const IconTime = (props) => (
  <Svg width={15} height={15} viewBox="0 0 17 17" fill="none" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.5 9.25H7.75V5.5M2.5 2.125 4 1M13 2.125 11.5 1"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7.75 16a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z"
    />
  </Svg>
);

const IconHeart = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16.556 6.741c0 1.253-.462 2.457-1.287 3.348-1.899 2.05-3.74 4.19-5.71 6.165a1.106 1.106 0 0 1-1.599-.036l-5.674-6.129c-1.715-1.853-1.715-4.843 0-6.696 1.732-1.87 4.554-1.87 6.285 0l.207.223.206-.223c.83-.897 1.961-1.404 3.142-1.404 1.182 0 2.313.507 3.143 1.404.825.89 1.287 2.095 1.287 3.348Z"
    />
  </Svg>
);

export default function RecipePreview(props) {
  return (
    <View style={{ padding: 10 }}>
      <TouchableOpacity style={styles.container} onPress={props.onPress}>
        <Image style={styles.image} source={{ uri: props.image }} />
        <View style={styles.bar}>
          <View style={styles.topRow}>
            <Text style={styles.topRowText}>{props.title}</Text>
          </View>
          <View style={styles.bottomRow}>
            <View style={styles.bottomRowItem}>
              <IconTime style={styles.icon} />
              <Text style={{ marginLeft: 5 }}>{props.time}</Text>
            </View>
            <View style={styles.bottomRowItem}>
              <IconHeart style={styles.icon} />
              <Text style={{ marginLeft: 5 }}>{props.likes}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: 170,
    width: 150,
    borderRadius: 20,
    backgroundColor: "#CBB18A",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
  },
  bar: {
    width: "100%",
    height: "30%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#CBB18A",
    borderRadius: 20,
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  topRowText: {
    fontSize: 20,
  },
  bottomRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    width: 15,
    height: 15,
  },
  bottomRowItem: {
    display: "flex",
    flexDirection: "row",
  },
});
