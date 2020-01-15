import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  AsyncStorage,
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  View,
  RefreshControl,
  TouchableHighlight,
  fetchData
} from "react-native";
import {
  BallIndicator
} from 'react-native-indicators';
import { Button } from "react-native-paper";
import { width, height, totalSize } from "react-native-dimension";

const GET_ALL_RECIPES = gql`
  {
    allRecipes {
      id
      topic
      description
      words
      photoUri
      definition
    }
  }
`;

const modify = recipes => {
  const cards = recipes.map(recipe => {
    const cards = recipe.words.map((word, index) => ({
      word: word,
      definition: recipe.definition[index]
    }));

    const defaultConfig = {
      eachSeconds: 5,
      lives: 3
    };
    return { ...recipe, cards, config: defaultConfig };
  });

  return cards;
};

export default class Lessons extends React.Component {
  state = {
    refreshing: false
  };
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem("userID");
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

  handleOnPressed = item => {
    console.log("item", item);
    this.props.navigation.navigate("FlipCards", { recipe: item });
  };

  Swipe = item => {
    console.log("item", item);
    this.props.navigation.navigate("SwipeCards", { recipe: item });
  };

  keyExtractor = item => item.id;
  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => this.handleOnPressed(item)}>
      <Text style={styles.topic}> {item.topic} </Text>
      <View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => this.Swipe(item)}>
      <Image style={styles.image1} source={require("./images/need.png")} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  _onRefresh = refetch => {
    this.setState({ refreshing: true });
    refetch().then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 10, margin:7 }}>
        <Query query={GET_ALL_RECIPES}>
          {({ loading, data, error, refetch }) =>
            loading ? (
              < BallIndicator color='#1F567E' style={styles.active} />
            ) : (
              <React.Fragment>
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={() => this._onRefresh(refetch)}
                    />
                  }
                  inverted={false}
                  keyExtractor={this.keyExtractor}
                  data={data ? modify(data.allRecipes) : []}
                  renderItem={this.renderItem}
                  numColumns={2}
                  refreshing={data.networkStatus === 4}
                />
              </React.Fragment>
            )
          }
        </Query>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 140,
    marginTop: 10,
    borderColor: "#fff",
    borderWidth: 2,
    margin: 2,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: "#fff"
  },
  topic: {
    fontSize: 20,
    margin: 2,
    marginTop: 8,
    fontWeight: "bold",
    color: "#1F567E",
    alignSelf: "center"
  },
  description: {
    alignSelf: "center",
    marginTop: 10,
    color: "#4D9FCE",
    fontSize: 14
  },
  button: {
    marginLeft: width(27),
    marginTop: height(1),
  },
  image1:{
    height:40,
    width:40
  },
  active:{
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center'
  },
});
