import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
  AsyncStorage
} from "react-native";
import {
  BallIndicator,
} from 'react-native-indicators';
import { TextInput } from "react-native-paper";
import gql from "graphql-tag";
import { StackActions, NavigationActions } from "react-navigation";
import React from "react";
import ApolloClient from "apollo-boost";
import { width, height, totalSize } from 'react-native-dimension';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Bottom" })]
});

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjj6o6wbb26er0197za5tiva5"
});

export default class SignIn extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    email: "",
    password: "",
    disabled: true
  };

  handleChange = (type, text) => {
    if (type === "email") {
      this.setState({ email: text });
    } else if (type === "password") {
      this.setState({ password: text });
      let mail = this.state.email;
      let password = this.state.password;
      if (mail && password) {
        this.setState({ disabled: false });
      }
    }
  };

  storeData = user => {
    try {
      console.log("saved", user);
      AsyncStorage.setItem("userID", user.id);
    } catch (error) {
      console.log("Error saving data", error);
    }
  };

  handleLogin = () => {
    console.log("button pressed");

    client
      .mutate({
        variables: {
          email: {
            email: this.state.email,
            password: this.state.password
          }
        },
        mutation: gql`
          mutation signIn(
            $email: AUTH_PROVIDER_EMAIL = { email: "", password: "" }
          ) {
            signinUser(email: $email) {
              token
              user {
                id
                username
              }
            }
          }
        `
      })
      .then(response => {
        // console.log('responseAuth', response);
        // console.log(response.data.signinUser.user.id)
        // console.log(response.data.signinUser);
        const user = response.data.signinUser.user;
        this.storeData(user);
        this.props.navigation.dispatch(resetAction, {
          user
        });
        this.setState({
          email: "",
          password: ""
        });
      })
      .catch(error => alert(error));
  };

  render() {
    let disabled = true;
    let error = "";
    return (
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover"
        source={require("./images/frame.jpg")}
      >
        <View style={styles.background}>
          <Image style={styles.image} source={require("./images/logo.jpg")} />
          <View style={styles.container}>
            <TextInput
              label="Email"
              theme={{ colors: { primary: "#0078b4" } }}
              value={this.state.email}
              style={styles.email}
              onChangeText={text => this.handleChange("email", text)}
            />
            <TextInput
              label="Password"
              secureTextEntry={true}
              theme={{ colors: { primary: "#0078b4" } }}
              style={styles.password}
              value={this.state.password}
              onChangeText={text => this.handleChange("password", text)}
            />
            <TouchableOpacity
              disabled={this.state.disabled}
              style={styles.saveButton}
              onPress={this.handleLogin}
            >
              <Text style={styles.textStyle}>Войти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Register")}
              style={styles.saveButtonTwo}
            >
              <Text style={styles.text2}>Еще не зарегистрировались?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  email: {
    marginTop:height(3),
    backgroundColor: "#fff",
    width: width(70),
    marginLeft: 50
  },
  password: {
    marginTop:height(2),
    backgroundColor: "#fff",
    width: width(70),
    marginLeft: 50
  },
  saveButton: {
    position: "absolute",
    zIndex: 11,
    alignSelf: "center",
    marginTop: 320,
    backgroundColor: "#fff",
    width: width(80),
    marginTop: height(48),
    borderRadius: 6,
    height: 50,
    elevation: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  saveButtonTwo: {
    position: "absolute",
    zIndex: 11,
    alignSelf: "center",
    marginTop: height(55),
    width: width(80),
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8
  },
  textStyle: {
    color: "#000",
    fontWeight: "bold"
  },
  text2: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10
  },
  image: {
    width: 200,
    height: 120,
    marginLeft: width(22),
    marginTop: height(12)
  },
  background: {
    flex: 1
  },
  imgBackground: {
    width: "100%",
    height: "100%"
  },
  active:{
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center'
  }
});
