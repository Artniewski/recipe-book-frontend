import React, {useState} from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Searchbar } from 'react-native-paper';

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
        <Image
          style={styles.image}
          source={require('../assets/hamburger.svg')}
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
    height: '60px',
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