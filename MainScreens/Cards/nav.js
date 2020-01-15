import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { createStackNavigator } from "react-navigation";
import Create from './Create'
import CreateCard from './CreateCard'
import CardRepeat from './CardRepeat'

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjj6o6wbb26er0197za5tiva5"
});

const RootStack = createStackNavigator(
  {
    Create: {
      screen: Create
    },
    CreateCard: {
      screen: CreateCard
    },
    CardRepeat: {
      screen: CardRepeat
    }
  },
  {
    initialRouteName: "CreateCard"
  }
);

export default class nav extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
        <ApolloProvider client={client}>
        <View style={styles.container}>
          <RootStack />
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