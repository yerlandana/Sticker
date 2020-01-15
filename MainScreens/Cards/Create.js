import React, { Fragment } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Container,
  Image,
  FlatList,
  CardView
} from "react-native";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Title,
  Paragraph,
  TextInput
} from "react-native-paper";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import DatePicker from "react-native-datepicker";
import { width, height, totalSize } from "react-native-dimension";

const CREATE_LESSON = gql`
  mutation createLesson(
    $definition: [String!]!
    $name: String!
    $date: String!
    $word: [String!]!
    $userId: ID
  ) {
    createLesson(
      word: $word
      definition: $definition
      name: $name
      date: $date
      userId: $userId
    ) {
      id
      definition
      word
      name
      date
      user {
        id
      }
    }
  }
`;

const FILE_UPLOAD_URL =
  "https://api.graph.cool/file/v1/cjj6o6wbb26er0197za5tiva5";

export default class CreateScreen extends React.Component {
  state = {
    name: "",
    date: "",
    cards: [],
    word: "",
    definition: "",
    words: [],
    definitions: [],
    userId: ""
  };



  renderCard = ({ item, index }) => {
    return (
      <Card style={styles.createdCards}>
          <Text style={styles.word}>Word: {item}</Text>
          <Text style={styles.definition}>Definition: {this.state.definitions[index]}</Text>
      </Card>
    );
  };



  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem("userID");
      // const user = JSON.parse(value);
      console.log("value: ", value);
      if (value !== null) {
        this.setState(
          {
            userId: value
          },
          () => {
            console.log(this.state.userId, "userId");
          }
        );
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }



  createLesson = async createLesson => {
    try {
      const variables = {
        word: this.state.words,
        definition: this.state.definitions,
        name: this.state.name,
        date: this.state.date,
        userId: this.state.userId
      };

      console.log("variables: ", variables);

      await createLesson({
        variables
      });
      this.props.navigation.navigate("CreateCard");
    } catch (error) {
      console.log("error", error);
    }
  };



  addCard = () => {
    const { word, words, definition, definitions } = this.state;

    this.setState({
      words: [...words, word],
      definitions: [...definitions, definition],
      word:'',
      definition:''
    });
  };



  render() {
    return (
      <Fragment>
        <Mutation mutation={CREATE_LESSON}>
          {(createLesson, { data, loading, error }) => (
            <ScrollView alwaysBounceVertical={true}>
              <TextInput
                style={styles.wordInput}
                placeholder="Name of Card"
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
              />
              <View style={styles.global}>
                <Text style={styles.style}>Deadline:</Text>
                <DatePicker
                  style={styles.date}
                  date={this.state.date}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate="2018-05-01"
                  maxDate="2020-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: "absolute",
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                  }}
                  onDateChange={date => {
                    this.setState({ date: date });
                  }}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.saveCardButton}
                  disabled={loading}
                  onPress={() => this.createLesson(createLesson)}
                >
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.addCardButtonText}>Submit</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.addCard}
                  style={styles.addCardButton}
                >
                  <Text style={styles.addCardButtonText}>Add Card</Text>
                </TouchableOpacity>
              </View>
              <Card style={styles.card}>
                <TextInput
                  style={styles.wordInputOne}
                  placeholder="word"
                  value={this.state.word}
                  onChangeText={word => this.setState({ word })}
                  selectionColor="#000"
                />
                <TextInput
                  style={styles.wordInputTwo}
                  placeholder="definition"
                  value={this.state.definition}
                  onChangeText={definition => this.setState({ definition })}
                />
              </Card>
              <ScrollView style={{ marginTop: 22}}>
                <FlatList
                  data={this.state.words}
                  renderItem={this.renderCard}
                  inverted={true}
                />
              </ScrollView>
            </ScrollView>
          )}
        </Mutation>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  global: {
    flexDirection: "row"
  },
  addCardButtonText: {
    color: "#fff",
    fontSize: 16,
    alignSelf:'center',
    marginTop:7
  },
  addCardButton: {
    backgroundColor: "#4D9FCE",
    height: 34,
    width: 118,
    borderRadius: 6,
    marginLeft:  width(14),
    marginTop: 32,
    alignItems: "center"
  },
  saveCardButton: {
    backgroundColor: "#4D9FCE",
    height: 34,
    width: 120,
    borderRadius: 6,
    marginLeft:  width(9),
    marginTop: 32,
    alignItems: "center"
  },
  Input: {
    fontSize: 18,
    alignSelf: "center",
    marginTop: 6,
    width: 300
  },
  wordInput: {
    marginLeft: width(9),
    marginTop: 20,
    width: width(80)
  },
  wordInputTwo: {
    marginLeft:  width(6),
    marginTop: 32,
    marginBottom: 8,
    width: width(80)
  },
  wordInputOne: {
    marginLeft:  width(6),
    marginTop: 10,
    width: width(80)
  },
  style: {
    marginLeft: 28,
    marginTop: 40,
    fontSize: 18,
    fontWeight: "regular",
    color:'#848484'
  },
  card: {
    borderRadius: 6,
    width:width(92),
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 32,
    height: height(30)
  },
  date: {
    width:width(57),
    marginTop: 32,
    marginLeft: 7,
    borderRadius: 6,
  },
  word: {
    marginTop: 10,
    fontSize: 18,
    marginBottom:10,
    marginLeft:10,
    color:'#848484'
  },
  definition: {
    marginTop: 10,
    fontSize: 18,
    marginBottom:10,
    marginLeft: 10,
    color:'#848484'
  },
  sign: {
    marginLeft: 48,
    marginTop: 10,
    fontSize: 18
  },
  acty:{
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  createdCards:{
     marginTop: 8 ,
     borderRadius: 6,
     width:width(92),
     alignSelf: "center",
     marginTop: 18,
  }
});
