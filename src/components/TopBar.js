import React, {useState} from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Searchbar } from 'react-native-paper';
import { Svg, Path } from 'react-native-svg';



const IconHamburger = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={26}
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
)

const IconSearch = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    viewBox="0 0 19 19"
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.504}
      d="M13.25 13.25 17 17M2 8.429a6.429 6.429 0 1 0 12.857 0A6.429 6.429 0 0 0 2 8.429Z"
    />
  </Svg>
)


export default function TopBar(props) {


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onSearchPressed}>
        <IconSearch
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onHamburgerPressed}>
        <IconHamburger
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 60,
    alignItems: 'center',
    backgroundColor: '#CBB18A',
    padding: 10,
    justifyContent: 'space-between',
},
image: {
    width: 24,
    height: 24,
    marginRight: 20,
    marginLeft: 20,
},
search: {
    flex : 1,
    marginRight: 20,
    marginLeft: 20,

}
})