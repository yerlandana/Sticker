import React from 'react';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import Navigation from './Navigation';
import Slide from './Intro/slide';


const RootStack = createStackNavigator(
  {
    Home: Slide,
    Details: Navigation,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
