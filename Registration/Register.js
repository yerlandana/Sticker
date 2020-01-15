import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import { BallIndicator } from "react-native-indicators";
import { TextInput } from "react-native-paper";
import { Mutation } from "react-apollo";
import { StackActions, NavigationActions } from "react-navigation";
import gql from "graphql-tag";
import { width, height, totalSize } from "react-native-dimension";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Bottom" })]
});


const CREATE_USER = gql`
  mutation addUser(
    $authProvider: AuthProviderSignupData = {
      email: { email: "", password: "" }
    }
    $username: String!
  ) {
    createUser(authProvider: $authProvider, username: $username) {
      email
      password
      username
      id
    }
  }
`;

export default class Register extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.defaultState = {
      username: "",
      email: "",
      password: "",
      disabled: true
    };

    this.state = this.defaultState;
  }

  storeData = user => {
    try {
      AsyncStorage.setItem("userID", user.data.createUser.id);
    } catch (error) {
      console.log("Error saving data");
    }
  };

  handleChange = (type, text) => {
    if (type === "username") {
      this.setState({ username: text });
      return;
    }

    if (type === "email") {
      this.setState({ email: text });
      return;
    }

    if (type === "password") {
      const { name, mail, password } = this.state;
      this.setState({ password: text, disabled: name && mail });
      return;
    }
  };

  handleSignUp = async createUser => {
    await console.log("button pressed");
    try {
      const user = await createUser({
        variables: {
          authProvider: {
            email: {
              email: this.state.email,
              password: this.state.password
            }
          },
          username: this.state.username
        }
      });
      this.setState(this.defaultState);
      this.storeData(user);
      //
      this.props.navigation.dispatch(resetAction);
      //
    } catch (e) {
      console.log("error", e);
    }
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
          <Mutation mutation={CREATE_USER}>
            {(createUser, { data, loading, error }) =>
              loading ? (
                <BallIndicator color="#1F567E" style={styles.active} />
              ) : (
                <View style={styles.container}>
                  <TextInput
                    label="Username"
                    theme={{ colors: { primary: "#0078b4" } }}
                    value={this.state.username}
                    style={styles.username}
                    onChangeText={text => this.handleChange("username", text)}
                  />
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
                    onPress={() => this.handleSignUp(createUser)}
                  >
                    {loading ? (
                      <UIActivityIndicator
                        color="#0078b4"
                        style={styles.acty}
                      />
                    ) : (
                      <Text style={styles.textStyle}>Зарегистрироваться</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("SignIn");
                    }}
                    style={styles.saveButtonTwo}
                  >
                    <Text style={styles.text2}>Уже есть аккаунт? Войти</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          </Mutation>
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
    marginTop: height(0.2),
    backgroundColor: "#fff",
    width: width(70),
    marginLeft: 50
  },
  password: {
    marginTop: height(0.2),
    backgroundColor: "#fff",
    width: width(70),
    marginLeft: 50
  },
  username: {
    marginTop: height(0.2),
    backgroundColor: "#fff",
    width: width(70),
    marginLeft: 50
  },
  saveButton: {
    position: "absolute",
    zIndex: 11,
    alignSelf: "center",
    marginTop: height(48),
    backgroundColor: "#fff",
    width: width(80),
    height: 50,
    borderRadius: 6,
    elevation: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  saveButtonTwo: {
    position: "absolute",
    zIndex: 11,
    marginLeft: 30,
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
  background: {
    flex: 1
  },
  imgBackground: {
    width: "100%",
    height: "100%"
  },
  image: {
    width: 200,
    height: 120,
    marginLeft: width(22),
    marginTop: height(12)
  },
  active: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});
