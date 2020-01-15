import React from "react";
import gql from "graphql-tag";
import { AsyncStorage } from "react-native";
import { Query, Mutation } from "react-apollo";
import {
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  View,
  RefreshControl
} from "react-native";
import {
  BallIndicator
} from 'react-native-indicators';
import { Button, Card } from "react-native-paper";
import { width, height, totalSize } from "react-native-dimension";

const GET_ALL_LESSONS = gql`
  query allLessons($userId: ID!) {
    allLessons(filter: { user: { id: $userId } }) {
      id
      definition
      name
      date
      word
    }
  }
`;
//cjki6x0b009tu0162xthlt8ve

const DELETE_LESSON = gql`
  mutation deleteLesson($id: ID!) {
    deleteLesson(id: $id) {
      id
    }
  }
`;

class CreateCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: undefined,
      refreshing: false,
      isLoading: true
    };
  }


  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem("userID");
      if (value !== null) {
        console.log(value, "2222");
      }

      this.setState({ userID: value, isLoading: false });
    } catch (error) {
      // Error retrieving data
      this.setState({ isLoading: false });
    }
  }

  _delete = item => {
    console.log(item);
  };

  handleOnPressed = item => {
    this.props.navigation.navigate("CardRepeat", { lesson: item });
  };

  keyExtractor = item => item.id;
  renderItem = ({ item }) => (
    <Mutation mutation={DELETE_LESSON}>
      {(deleteLesson, { data, loading, error }) => (
          <Card style={styles.card}>
          <ImageBackground
             style={styles.imgBackground}
             resizeMode="cover"
              source={require("./card.jpg")}
               >
            <Text style={styles.name}> {item.name} </Text>
            <TouchableOpacity onPress={() => this.handleOnPressed(item)}>
              <Image style={styles.image1} source={require("./repeat.png")} />
            </TouchableOpacity>
            <Text style={styles.date}>Deadline: {item.date}</Text>
            <TouchableOpacity
              onPress={() => {
                deleteLesson({
                  variables: {
                    id: item.id
                  }
                });
              }}
            >
              <Text style={styles.delete}>DELETE</Text>
            </TouchableOpacity>
            </ImageBackground>
          </Card>
      )}
    </Mutation>
  );

  _onRefresh = refetch => {
    this.setState({ refreshing: true });
    refetch().then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    const { userID: id, isLoading } = this.state;

    if (isLoading) {
      return <Text> Loading. ...</Text>;
    }

    if (id === undefined) {
      return <Text> Error ...</Text>;
    }

    // const UserFilter = { id: userID };
    return (
      <Query query={GET_ALL_LESSONS} variables={{ userId: id }}>
        {({ refetch, loading, data, error }) => {
          console.log(error, "1", data);

          if (error) {
            return <Text style={styles.active}> Can't connect to Internet </Text>;
          }

          return loading ? (
            < BallIndicator color='#1F567E' style={styles.active} />
          ) : (
            <React.Fragment>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh(refetch)}
                  />
                }
              >
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={data ? data.allLessons : []}
                  renderItem={this.renderItem}
                  refreshing={data.networkStatus === 4}
                  style={styles.flatList}
                />
              </ScrollView>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  this.props.navigation.navigate("Create");
                }}
              >
                <Text style={styles.text}>+</Text>
              </TouchableOpacity>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    width: "95%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 3,
    marginHorizontal: 5
  },
  image1: {
    width: 60,
    height: 60,
    marginLeft: width(70),
    marginTop: 2,
    flexDirection:'row'
  },
  date: {
    marginTop: 0,
    fontSize: 18,
    color: "#1f567e",
    marginTop: 6,
    marginLeft: 10
  },
  name: {
    fontSize: 28,
    marginLeft: 6,
    marginTop: 8,
    fontWeight: "bold",
    color: "#ffffff"
  },
  descriptionInput: {
    paddingHorizontal: 20,
    height: 100,
    fontSize: 20
  },
  image2: {
    marginLeft: 36,
    marginTop: 0,
    width: 24,
    height: 20
  },
  saveButton: {
    position: "absolute",
    right: 20,
    bottom: 10,
    backgroundColor: "#1f567e",
    width: 61,
    height: 61,
    borderRadius: 50
  },
  saveButtonText: {
    color: "white"
  },
  text: {
    color: "#fff",
    fontSize: 37,
    marginTop: 7,
    marginLeft: 2,
    alignSelf: "center"
  },
  image: {
    height: 100,
    width: 100
  },
  imageStyle: {
    marginLeft: 1
  },
  description: {
    marginLeft: 120,
    marginTop: 1
  },
  card: {
    width:width(92),
    marginTop: 26,
    marginLeft:width(4),
    borderRadius: 12,
  },
  delete: {
    fontSize: 14,
    marginBottom: 10,
    marginTop:5,
    color: "red",
    fontFamily: "Ubuntu",
    marginLeft: 12
  },
  active:{
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  imgBackground:{

  }
});
export default CreateCard;
