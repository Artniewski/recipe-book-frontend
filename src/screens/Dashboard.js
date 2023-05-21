import React, {useState, useEffect} from 'react'
import TopBar from '../components/TopBar'
import Button from '../components/Button'
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image, StatusBar } from 'react-native'
import {logoutUser} from '../api/auth-api'
import Home from '../components/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Favourite from '../components/Favourite'
import { Svg, Path } from 'react-native-svg';



const IconGlobe = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M20 38c9.941 0 18-8.059 18-18S29.941 2 20 2 2 10.059 2 20s8.059 18 18 18Z"
    />
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="m2.9 20.9 9.9 3.6-1.8 6.3 1.8 5.4M29 35.3l-.9-4.5-4.5-1.8v-6.3l5.4-1.8 8.1.9M32.6 8.3l-.9 2.7-6.3.9v5.4l4.5-1.8h3.6l3.6 1.8M2.9 17.3l4.5-3.6 4.5-.9 3.6-5.4-1.8-3.6"
    />
  </Svg>
)

const IconHeart = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16.556 6.741c0 1.253-.462 2.457-1.287 3.348-1.899 2.05-3.74 4.19-5.71 6.165a1.106 1.106 0 0 1-1.599-.036l-5.674-6.129c-1.715-1.853-1.715-4.843 0-6.696 1.732-1.87 4.554-1.87 6.285 0l.207.223.206-.223c.83-.897 1.961-1.404 3.142-1.404 1.182 0 2.313.507 3.143 1.404.825.89 1.287 2.095 1.287 3.348Z"
    />
  </Svg>
)

const IconUser = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M2 38v-2.25C2 27.052 9.052 20 17.75 20S33.5 27.052 33.5 35.75V38M17.75 20a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
    />
  </Svg>
)


const HomeRoute = () => <Home />;
const FavRoute = () => <Favourite />;
const BookRoute = () => <Home />;

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);


  const handleMenuPress = () => {
    console.log("pressed");
    setMenuOpen(!menuOpen);
  };
  



  return (
    <View style={{height: '100%',  width: '100%'}}>
    <StatusBar backgroundColor="#CBB18A" barStyle="light-content" />
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
          <IconHeart style={styles.image} color={focused?'white':'black'}/>
        ),
        tabBarLabel: ''
      }} />
      <Tab.Screen name="Home" component={HomeRoute}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <IconGlobe style={styles.image} color={focused?'white':'black'}/>
        ),
        tabBarLabel: ''
      }} />
      <Tab.Screen name="Book" component={BookRoute} 
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <IconUser style={styles.image} color={focused?'white':'black'}/>
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




