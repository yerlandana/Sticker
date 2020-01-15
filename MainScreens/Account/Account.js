import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Image, ActivityIndicator,FlatList, ScrollView,
  RefreshControl,} from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// const GET_ALL_USERS = gql`
//   {
//     allUsers {
//       id
//      email
//      username
//     }
//   }
// `;


 export default class Account extends React.Component {
  state = {
    refreshing: false
  };
  static navigationOptions = {
    header: null
  };


  render() {
    return (
      <View>
      <ImageBackground
      style={styles.imgBackground}
      resizeMode="cover"
      source={require("./images/background.jpg")}
    />
         {/* <Query query={GET_ALL_USERS}>
          {({ loading, data, error, refetch }) =>
            loading ? (
              <ActivityIndicator />
            ) : (
              <ScrollView
              refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this._onRefresh(refetch)}
                      />
                    }>
              </ScrollView>
            )
          }
        </Query> */}
        </View>
    );
  }
}
 


const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  photo:{
    width:120,
    height:120,
    marginTop:40,
   borderRadius: 60,
   justifyContent:'center',
   alignSelf:'center'
  },
  username:{
    marginTop: 20,
    fontSize:18,
    alignSelf:'center'
  },
  imgBackground: {
    width: "100%",
    height: "100%"
  },
});