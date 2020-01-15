import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Share
} from "react-native";
import SwipeCards from "react-native-swipe-cards";
import _ from "lodash";
import { width, height, totalSize } from "react-native-dimension";
import { BallIndicator } from "react-native-indicators";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    this.props.card;
    const { card } = this.props;
    const { word, definition, shuffledDefinition } = card;
    return (
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover"
        source={require("./images/back.jpg")}
      >
        <View style={styles.card}>
          <Text style={styles.word}>{word}</Text>
          <Text style={styles.definition}>{shuffledDefinition}</Text>
        </View>
      </ImageBackground>
    );
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);

    const { config, cards } = this.props.navigation.state.params.recipe;

    const shuffledDefinitions = _.shuffle(cards.map(card => card.definition));
    const newCard = cards.map((card, index) => ({
      ...card,
      shuffledDefinition: shuffledDefinitions[index]
    }));

    console.log("1", config.lives);
    this.state = {
      cards: newCard,
      currentLives: config.lives,
      countOfCorrect: 0,
      isGameOver: false
    };
  }

  componentDidMount() {}

  ShareMessage = () => {
    console.log(this.state.currentLives, "card");
    Share.share({
      message: this.state.countOfCorrect,
      title: "Я набрала максимальный балл. А ты сможешь?",
      url: ""
    })
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
  };

  result = () => {
    return (
      <View>
        <Image style={styles.image2} source={require("./images/relax.gif")} />
        <Text style={styles.gameText3}>Awesome!</Text>
        <Text style={styles.gameText2}>You make progress really fast!</Text>
        <TouchableOpacity style={styles.buttonGo2} onPress={this.ShareMessage}>
          <Text style={styles.text}>Share Result</Text>
        </TouchableOpacity>
      </View>
    );
  };

  handleYup = card => {
    const result = card.definition === card.shuffledDefinition;
    this.handleQuesiton(result, card);
  };
  handleNope = card => {
    const result = card.definition !== card.shuffledDefinition;
    this.handleQuesiton(result, card);
  };
  handleMaybe(card) {
    console.log(`Maybe for ${card.text}`);
  }

  handleQuesiton = (result, card) => {
    let { countOfCorrect, currentLives, isGameOver } = this.state;
    if (result) {
      // countOfCorrect = countOfCorrect + 1;
      countOfCorrect += 1;
    } else {
      currentLives -= 1;
    }

    if (currentLives === 0) {
      isGameOver = true;
    }

    this.setState({ countOfCorrect, currentLives, isGameOver });
  };
  render() {
    const { cards, isGameOver } = this.state;
    console.log("here2", this.state);

    if (isGameOver) {
      return (
        <View style={styles.game}>
          <Image style={styles.image} source={require("./images/book.gif")} />
          <Text style={styles.gameText}>Game Over. Practice more.</Text>
          <Text style={styles.result}>Score:{this.state.countOfCorrect}</Text>
          <TouchableOpacity
            style={styles.buttonGo}
            onPress={() => this.props.navigation.navigate("Lessons")}
          >
            <Text style={styles.text}>Practice</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <React.Fragment>
        <Text style={styles.lives}>Lives:{this.state.currentLives}</Text>
        <Text style={styles.lives}>Score:{this.state.countOfCorrect}</Text>
        <SwipeCards
          cards={cards}
          renderCard={card => <Card card={card} />}
          renderNoMoreCards={() => this.result()}
          handleYup={this.handleYup}
          handleNope={this.handleNope}
          yupText={"True"}
          nopeText={"False"}
          showYup={true}
          showNope={true}
          showMaybe={false}
        />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    width: 300,
    height: 300,
    marginTop: 60,
    borderRadius: 6
  },
  noMoreCardsText: {
    fontSize: 22
  },
  lives: {
    alignSelf: "center",
    fontStyle: "regular",
    fontSize: 22,
    color: "#222BA0"
  },
  image: {
    width: 200,
    height: 200,
    marginTop:height(3),
    marginLeft: width(15)
  },
  imgBackground: {},
  word: {
    fontSize: 26,
    marginTop: 0,
    fontWeight: "bold",
    color: "#222BA0",
    alignSelf: "center",
    fontFamily: "Slabo 27px"
  },
  definition: {
    fontSize: 26,
    marginTop: 12,
    fontWeight: "bold",
    color: "#6059FF",
    alignSelf: "center",
    marginLeft:6
  },
  game: {
    backgroundColor: "#ffffff",
    flex: 1
  },
  gameText: {
    marginTop: 50,
    alignSelf: "center",
    fontSize: 22,
    color: "#E74C3C"
  },
  buttonGo: {
    position: "absolute",
    zIndex: 11,
    alignSelf: "center",
    marginTop: height(65),
    backgroundColor: "#222BA0",
    width: 314,
    height: 50,
    borderRadius: 6,
    elevation: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  result: {
    marginTop: 20,
    alignSelf: "center",
    fontSize: 22,
    color: "#222BA0"
  },
  image2: {
    width: 200,
    height: 200,
    alignSelf: "center"
  },
  gameText2: {
    marginTop: 2,
    alignSelf: "center",
    fontSize: 22,
    color: "#222BA0"
  },
  gameText3: {
    marginTop: 8,
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#E74C3C"
  },
  buttonGo2: {
    position: "absolute",
    zIndex: 11,
    alignSelf: "center",
    marginTop: 270,
    backgroundColor: "#222BA0",
    width: 300,
    height: 50,
    borderRadius: 6,
    elevation: 8,
    alignItems: "center",
    justifyContent: "center"
  }
});
