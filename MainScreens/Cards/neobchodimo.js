import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Container,
  Image,
  FlatList,
  CardView,
} from 'react-native';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Title,
  Paragraph,
  TextInput,
} from 'react-native-paper';
import DatePicker from 'react-native-datepicker';

export default class Create extends React.Component {
  state = {
    name: '',
    description: '',
    deadline: '',
    isDatePickerVisible: false,
    selectedDate: '',
    cards: [
      {
        word: 'Hello',
        definition: 'privet',
      },
    ],
    word: '',
    definition: '',
  };

  renderCard = ({ item }) => {
    return (
      <Card style={styles.card}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.word}>{item.word}</Text>
          <Text style={styles.sign}>|</Text>
        <Text style={styles.definition}>{item.definition}</Text>
        </View>
      </Card>
    );
  };

  addCard = () => {
    const card = {
      word: this.state.word,
      definition: this.state.definition,
    };

    this.setState({
      cards: [...this.state.cards, card],
      word: '',
      definition: '',
    });
  };

  render() {
    return (
      <View>
        <TextInput
          style={styles.wordInput}
          placeholder="Name of Card"
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          style={styles.wordInput}
          placeholder="Brief description"
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
        />
        <View style={styles.global}>
          <Text style={styles.style}>Deadline:</Text>
          <DatePicker
            style={styles.date}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2020-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />
        </View>
        
        <Card>
          <TextInput
            style={styles.wordInput}
            placeholder="word"
            value={this.state.word}
            onChangeText={word => this.setState({ word })}
            selectionColor="#000"
          />
          <TextInput
            style={styles.wordInput}
            placeholder="definition"
            value={this.state.definition}
            onChangeText={definition => this.setState({ definition })}
          />
        </Card>
      <TouchableOpacity onPress={this.addCard} style={styles.addCardButton}>
          <Text style={styles.addCardButtonText}>Add Card</Text>
        </TouchableOpacity>
        <ScrollView style={{ marginTop: 40 }}>
          <FlatList
            style={{ height: 200 }}
            data={this.state.cards}
            renderItem={this.renderCard}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  global: {
    flexDirection: 'row',
  },
  addCardButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  addCardButton: {
    backgroundColor: '#6510e5',
    height: 34,
    width: 300,
    borderRadius: 10,
    marginLeft:30,
    marginTop: 20,
    alignItems: 'center',
  },
  wordInput: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 32,
    marginTop: 34,
    width: 300,
  },
  style: {
    marginLeft: 32,
    marginTop: 38,
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    width: 220,
    marginTop: 34,
    marginLeft: 7,
  },
  word:{
    marginLeft:32,
    marginTop:10,
    fontSize:18,
  },
  definition:{
    marginLeft:64,
    marginTop:10,
    fontSize:18,
  },
  card:{
    width:300,
    marginTop:10,
    marginLeft:32
  },
  sign:{
     marginLeft:48,
    marginTop:10,
    fontSize:18,
  }
});