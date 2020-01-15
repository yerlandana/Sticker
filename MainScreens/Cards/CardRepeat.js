import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import CardFlip from 'react-native-card-flip';


export default class MyCarousel extends Component {
  state = {
    word: this.props.navigation.state.params.lesson.word,
    definition: this.props.navigation.state.params.lesson.definition,
    
  };

  renderCard = ({item, index}) => {
    return (
      <View style={styles.container}>
        <CardFlip
          style={styles.cardContainer}
          ref={card => (this['card' + index] = card)}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.card, styles.card1]}
            onPress={() => this['card' + index].flip()}>
            <Text style={styles.label}>{this.state.word[index]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.card, styles.card2]}
            onPress={() => this['card' + index].flip()}>
            <Text style={styles.label}>{item}</Text>
          </TouchableOpacity>
        </CardFlip>
      </View>
      );
    
  };

  render() {
    const { word } = this.state;
    const {definition} = this.state;
    return (
   
      <Carousel
        data={this.state.definition}
        renderItem={this.renderCard}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth}
        slideStyle={{ width: viewportWidth }}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        layout={'default'}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  cardContainer: {
    width: 300,
    height: 450,
  },
  card: {
    marginTop:30,
    alignSelf:'center',
    width: 300,
    height: 400,
    backgroundColor: "#5063C2",
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  card1: {
    backgroundColor: '#1034A6',
  },
  card2: {
    backgroundColor: '#5063C2',
  },
  label: {
    lineHeight: 400,
    textAlign: 'center',
    fontSize: 35,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
