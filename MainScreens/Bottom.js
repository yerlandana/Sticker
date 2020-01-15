import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation'; 
import { View } from 'react-native';
import { StyleSheet } from "react-native";
import { Ionicons} from '@expo/vector-icons';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import nav from './Cards/nav';
import NavL  from './Lessons/NavL';

const client = new ApolloClient({
uri: "https://api.graph.cool/simple/v1/cjj6o6wbb26er0197za5tiva5"
});

const Tab =  TabNavigator(
  {
    Lesson: {screen: NavL},
    Words: { screen: nav },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Words') {
          iconName = `ios-book${focused ? '' : '-outline'}`;
        }if (routeName === 'Lesson') {
          iconName = `ios-clipboard${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#4D9FCE',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);

export default class Bottom extends React.Component {
  static navigationOptions = {
    header: null
  };

  
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Tab/>
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});