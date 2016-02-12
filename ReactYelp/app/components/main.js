'use strict';

var React = require('react-native');
var urls = require('../util/urls');

var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
    ActivityIndicatorIOS
} = React;

var Main = React.createClass ({
  getInitialState() {
    return{
      term: "",
      location: "",
      animating: false
    }
  },
    fetchSearch(term, location) {
        this.setState({term: term, location: location});
        fetch(urls.url.search+term+'/'+location+'/0')
          .then((response) => response.json())
          .then((responseData) => {
            this.goToNext(responseData.businesses);
          })
          .done();
    },
   buttonPressed() {
      this.setState({animating: true});
      this.fetchSearch(this.state.term, this.state.location);
   },
    goToNext(data){
        this.state.animating = false;
        this.props.navigator.push({
            name: 'menu page',
            index: 2,
            passProps: {data: data, term: this.state.term, location: this.state.location},
            
        });
    },
  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.text}>
              Term:
            </Text>
            <TextInput style={styles.inputBox} onChangeText={(text) => this.setState({term: text})} value={this.state.term} />
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Location:
            </Text>
            <TextInput style={styles.inputBox} onChangeText={(text) => this.setState({location: text})} valu={this.state.location} />
          </View>
          <View style={styles.emptyRow} >
              <ActivityIndicatorIOS
                animating={this.state.animating}
                style={[styles.centering]}
                size="large"
              />
          </View>
          <View style={styles.rowButton}>
              <TouchableHighlight style={styles.button} onPress={this.buttonPressed.bind(this)}>
                  <View>
                    <Text style={styles.text}>Search</Text>
                  </View>
              </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    paddingTop:40,
    flex:1,
    backgroundColor: '#F5FCFF',
    flexDirection: 'column'
  },
  row: {
    paddingTop: 10,
    paddingBottom: 10,
    flex:1,
    backgroundColor: '#FF3366',
    flexDirection: 'row'
  },
   emptyRow: {
       margin: 50,
   },
   rowButton: {
       marginLeft: 40,
       marginRight: 40,
       flex: 1,
       alignItems: 'center'
   },
  text: {
    fontSize: 20,
    flex:1,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10
  },
  inputBox: {
    flex: 2,
    height: 40,
    marginRight: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff'
  },
   button:{
       paddingLeft:50,
       paddingRight:50,
       backgroundColor: '#FF3366'
   },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

module.exports = Main;