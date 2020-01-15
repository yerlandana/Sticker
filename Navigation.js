import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createStackNavigator } from "react-navigation";
import Register from "./Registration/Register";
import SignIn from "./Registration/SignIn";
import Bottom from "./MainScreens/Bottom"

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjj6o6wbb26er0197za5tiva5"
});

console.disableYellowBox = true;
const RootStack = createStackNavigator(
  {
    SignIn: {
      screen: SignIn
    },
    Register: {
      screen: Register
    },
    Bottom: {
        screen: Bottom
       },
  },
  {
    initialRouteName: "Register",
    navigationOptions: {
      header: null
    }
  }
);

export default class Navigation extends Component {
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