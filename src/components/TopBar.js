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


export default function TopBar(props) {

    const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.container}>
        <Searchbar
            style={styles.search}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
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