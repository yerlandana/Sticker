import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import CardFlip from 'react-native-card-flip';


export default class MyCarousel extends Component {
  state = {
    cards: this.props.navigation.state.params.recipe.words,
    definition: this.props.navigation.state.params.recipe.definition,
  };

  renderCard = ({item, index}) => {
    return (
      <View>
        <CardFlip
          style={styles.cardContainer}
          ref={card => (this['card' + index] = card)}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.card, styles.card1]}
            onPress={() => this['card' + index].flip()}>
            <Text style={styles.label} numberOfLines={5}>{item}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.card, styles.card2]}
            onPress={() => this['card' + index].flip()}>
            <Text style={styles.label} numberOfLines={5}>{this.state.definition[index]}</Text>
          </TouchableOpacity>

        </CardFlip>
      </View>
      );
    
  };

  render() {
    const { cards } = this.state;
    const {definition} = this.state;
    return (
   
      <Carousel
        data={this.state.cards}
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
    backgroundColor: '#FFFFFF',
  },
  card: {
    marginTop:30,
    alignSelf:'center',
    width: 300,
    height: 400,
    borderRadius: 5,
    borderRadius: 10,
    borderColor: '#1F567E',
    borderWidth: 2,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  card1: {
    backgroundColor: '#AFE3F8',
  },
  card2: {
    backgroundColor: '#AFE3F8',
  },
  label: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'regular',
    fontFamily: "System",
    color: "#1F567E",
    backgroundColor: 'transparent',
    marginTop:190
  },
});
