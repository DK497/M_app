import React, { Component } from 'react';
import { View,Image,Text, Platform,ScrollView,StyleSheet} from 'react-native';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator ,DrawerItems} from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator,SafeAreaView } from 'react-navigation'
import Home from './HomeComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'
import {Icon} from 'react-native-elements'
import {connect} from 'react-redux'
import {baseUrl} from '../shared/baseUrl'
import {fetchComments,fetchDishes,fetchLeaders,fetchPromos} from '../redux/ActionCreators'
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent'

const mapStateToProps=(state)=>{
    return{dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders}
}
const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
  })


const FavoritesNavigator = createStackNavigator({
    Favorites: { screen: Favorites }
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerRight:()=>(<Icon name="menu" size={24}
        iconStyle={{ color: 'white' }} 
        onPress={ () =>  navigation.toggleDrawer() } />)    
    })
  })

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation }
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerRight:()=> (<Icon name="menu" size={24}
        iconStyle={{ color: 'white' }} 
        onPress={ () => navigation.toggleDrawer() } />)    
    })
  })  

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu ,
        navigationOptions:({navigation})=>({
        headerRight: () => (
            <Icon name="menu" size={24} 
              color= 'white'
              onPress={ () => navigation.toggleDrawer() } /> 
          )
        })
},Dish: { screen: Dishdetail }
}, {
    initialRouteName: "Menu",
    defaultNavigationOptions:({navigation})=>({
        headerStyle:
        {
            backgroundColor: "#4b40ef",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"
        }
    })
})

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#4b40ef"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerRight: () => (
            <Icon name="menu" size={24} 
              color= 'white'
              onPress={ () => navigation.toggleDrawer() } /> 
          )
    })
})
const ContactNav = createStackNavigator({
    Contact: { screen: Contact }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#4b40ef"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerRight: () => (
            <Icon name="menu" size={24} 
              color= 'white'
              onPress={ () => navigation.toggleDrawer() } /> 
          )
    })
})
const AboutNav = createStackNavigator({
    About: { screen: About }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#4b40ef"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerRight: () => (
            <Icon name="menu" size={24} 
              color= 'white'
              onPress={ () => navigation.toggleDrawer() } /> 
          )
    })
})

const CustomDrawerContentComponent=(props)=>(
   <ScrollView>
       <SafeAreaView style={styles.container} forceInset={{top:'always',horizontal:'never'}}>
            <View style={styles.drawerHeader}>
              <View style={{flex:1}}>
              <Image source={require('./images/logo.png')} style={styles.drawerImage} />   
               </View> 
               <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
              </View>      
            </View>
            <DrawerItems {...props}/>  
       </SafeAreaView>
   </ScrollView>
   )

const MainNavigator = createDrawerNavigator({
    Home:
    {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
              )
        }
    },AboutUs: {
        screen: AboutNav,
        navigationOptions: {
            title: 'About',
            drawerLabel: 'About',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='info-circle'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              )
        }
    },
    Menu:
    {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='list'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
              )
        }
    },
    ContactUs: {
        screen: ContactNav,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                   name='address-card'
                  type='font-awesome'            
                  size={22}
                  color={tintColor}
                />
              )
        }
    },
    Favorites:
    { screen: FavoritesNavigator,
      navigationOptions: {
        title: 'My Favorites',
        drawerLabel: 'My Favorites',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='heart'
            type='font-awesome'            
            size={24}
            iconStyle={{ color: tintColor }}
          />
        ),
      }
    },
    Reservation:
      { screen: ReservationNavigator,
        navigationOptions: {
          title: 'Reserve Table',
          drawerLabel: 'Reserve Table',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='cutlery'
              type='font-awesome'            
              size={24}
              iconStyle={{ color: tintColor }}
            />
          ),
        }
      }
    
},
    {drawerBackgroundColor: '#D1C4E9',
    contentComponent:CustomDrawerContentComponent
})



const App = createAppContainer(MainNavigator);
class Main extends Component {

    componentDidMount() {
        console.log("yo man")
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
      }

    render() {

        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : 2 }}>
                <App />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  })

export default connect(mapStateToProps, mapDispatchToProps)(Main);