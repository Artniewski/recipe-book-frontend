import React, {useState, useEffect} from 'react'
import TopBar from '../components/TopBar'
import Button from '../components/Button'
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native'
import {logoutUser} from '../api/auth-api'
import { BottomNavigation } from 'react-native-paper'
import Home from '../components/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


const HomeRoute = () => <Home />;
const FavRoute = () => <Home />;
const BookRoute = () => <Home />;

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [index, setIndex] = useState(0);


  const handleMenuPress = () => {
    console.log("pressed");
    setMenuOpen(!menuOpen);
  };

  const [routes] = useState([
    { key: 'book', title: 'Book', icon: '../assets/icon_heart.png' },
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'fav', title: 'Favourite', icon: 'heart' }]
    );

  

  const onIndexChange = (i) => {
    console.log(i);
    setIndex(i);
  };

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    fav: FavRoute,
    book: BookRoute,
  });


  return (
    <View style={{height: '100%',  width: '100%'}}>

    <TopBar
        onHamburgerPressed={handleMenuPress}
        style={styles.topBar}
    />


    <Tab.Navigator
    screenOptions={({ route }) => ({ 
      headerShown: false,
      tabBarActiveBackgroundColor: '#CBB18A',
      tabBarInactiveBackgroundColor: '#CBB18A',
    })}
    initialRouteName='Home'
    barStyle={{height:75}}
    >
      <Tab.Screen 
      name="Favourite" 
      component={FavRoute}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Image style={styles.image} source={focused?require('../assets/icon_heart_white.svg'):require('../assets/icon_heart.svg')}/>
        ),
        tabBarLabel: ''
      }} />
      <Tab.Screen name="Home" component={HomeRoute}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Image style={styles.image} source={focused?require('../assets/icon_globe_white.svg'):require('../assets/icon_globe.svg')}/>
        ),
        tabBarLabel: ''
      }} />
      <Tab.Screen name="Book" component={BookRoute} 
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Image style={styles.image} source={focused?require('../assets/icon_user_white.svg'):require('../assets/icon_user.svg')}/>
        ),
        tabBarLabel: ''
      }}/>
    </Tab.Navigator>


    {menuOpen && (
      <TouchableOpacity style={styles.translucent} onPress={handleMenuPress}>
        <View style={styles.hamburger}>
        <Button mode="text" onPress={logoutUser}>
          Logout
        </Button>
      </View>
      </TouchableOpacity>
      
      )}
    </View>

  )
}

const styles = StyleSheet.create({
  navBar:{
    backgroundColor: 'red',
  },
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
    width: '100%',
    zIndex: 2,
  },

  hamburger:{
    backgroundColor: '#FFFFFF',
    width: '66%',
    maxWidth: 250,
    height: '100%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: 3,
  },
  image:{
    width: 30,
    height: 30,
  }
})




