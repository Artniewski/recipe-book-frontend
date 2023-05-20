import React, {useState} from 'react'
import TopBar from '../components/TopBar'
import Button from '../components/Button'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import {logoutUser} from '../api/auth-api'
import RecipePreview from '../components/RecipePreview'
import { ScrollView } from 'react-native-gesture-handler'

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuPress = () => {
    console.log("pressed");
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logoutUser();
  }

  return (
    <View style={{height: '100%'}}>

    <TopBar
        onHamburgerPressed={handleMenuPress}
        style={styles.topBar}
    />

    <View style={styles.content}>
      {[1,2,3,4,5,6,7,8,9,10].map((item) => (
        <RecipePreview 
        key={item}
        title={"Recipe " + item}
        time="30 min"
        likes="100"
        />
        ))
      }
    </View>
    {menuOpen && (
      <TouchableOpacity style={styles.translucent} onPress={handleMenuPress}>
        <View style={styles.hamburger}>
        <Button mode="text" onPress={handleLogout}>
          Logout
        </Button>
      </View>
      </TouchableOpacity>
      
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  topBar:{
    height: 50,
    width: '100%',
  },

  translucent:{
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    height: '100%',
    width: '100%'
  },

  hamburger:{
    backgroundColor: '#FFFFFF',
    width: '66%',
    maxWidth: 250,
    height: '100%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },

  content:{
    display: 'grid', // use display: grid instead of display: flex
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // set the grid template columns
    gridGap: 10, // set the space between each item
    alignItems: 'center',
    justifyItems: 'center',
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    overflow: 'scroll',
  },
})




