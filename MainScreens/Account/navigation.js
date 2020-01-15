import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { createStackNavigator } from "react-navigation";
import Account from './Account'

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjj6o6wbb26er0197za5tiva5"
});

const RootStack = createStackNavigator(
  {
   Account: {
      screen: Account
    },
  },
  {
    initialRouteName: "Account"
  }
);

export default class navigation extends Component {
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