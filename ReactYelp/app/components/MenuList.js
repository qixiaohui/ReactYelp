'use strict'
var React = require('react-native');

var {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;
    
var Line = require('./Line');


var MenuList = React.createClass({
    getInitialState(){
        return{
            data: this.props.route.passProps.data,
            dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,        
            }),
        }
    },
  componentDidMount() {
      console.log(JSON.stringify(this.state.data));
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.data),
    });
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMenu}
        style={styles.listView}
      />
    );
  },
    
  renderMenu(menu) {
    return (
        <TouchableHighlight onPress={()=>this.loadDetail(menu)}>
          <View style={styles.container}>
            <Image
              source={{uri: menu.image_url}}
              style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{menu.name}</Text>
              <Image source={{uri: menu.rating_img_url}} style={styles.rating} />
            </View>
          </View>
        </TouchableHighlight>
    );
  },
  
  loadDetail(menu){
     this.props.navigator.push({
        name: 'detail page',
        index: 2,
        passProps: {data: menu}
    });        
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
      flex: 3,
  },
    rating: {
        flex: 1,
        width: 35,
        height: 10,
    },
  thumbnail: {
    width: 53,
    height: 81,
      margin: 3,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = MenuList;