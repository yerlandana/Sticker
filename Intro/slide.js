import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import CardFlip from "react-native-card-flip";

export default class Slide extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Onboarding
        onDone={() => {
          this.props.navigation.navigate("Details");
        }}
        onSkip={() => {
          this.props.navigation.navigate("Details");
        }}
        pages={[
          {
            backgroundColor:"#ffffff",
            image: (
              <CardFlip
                style={styles.cardContainer}
                ref={card => (this.card = card)}
              >
                <TouchableOpacity
                  style={styles.card1}
                  onPress={() => this.card.flip()}
                >
                  <Text  style={styles.label}> Нажми </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.card2}
                  onPress={() => this.card.flip()}
                >
               <Text  style={styles.label} > Press </Text>
                </TouchableOpacity>
              </CardFlip>
            ),
            title: "Новое слово?",
            subtitle:
              "Создай карточки. Смотря на одну сторону, попробуй вспомнить перевод или значение."
          },
          {
            backgroundColor: "#ffffff",
            image: <Image style={styles.image} source={require("./images/telephone.gif")} />,
            title: "Не хватает времени?",
            subtitle:
              "200 базовых слов по IELTS и новые уроки помогут обогатить словарный запас в любое время."
          },
          {
            backgroundColor: "#ffffff",
            image: <Image style={styles.image} source={require("./images/share.gif")} />,
            title: "Делись прогрессом!",
            subtitle:
              "Повторяй часто слова, и они помогут тебе в английской речи! Делись прогрессом с друзьями!"
          }
        ]}
      />
    );
  }
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  container: {
    flex: 1,
  },
  cardContainer: {
    width: 130,
    height: 250
  },
  card1: {
    width: 130,
    height: 250,
    backgroundColor: "#AFE3F8",
    borderRadius: 10,
    borderColor: '#1F567E',
    borderWidth: 2,
    fontFamily:'Neucha',
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5
  },
  card2: {
    width: 130,
    height: 250,
    backgroundColor: "#AFE3F8",
    borderRadius: 10,
    borderColor: '#1F567E',
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5
  },
  label: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: 'regular',
    fontFamily: "System",
    color: "#1F567E",
    backgroundColor: "transparent"
  },
  text:{
    fontSize:20,
    fontWeight:'regular',
  },
   image:{
     height: 250,
     width: 250
   },
   imageStyle:{
    height: 150,
    width: 150
  }
});
