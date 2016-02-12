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
    
var OFFSET = 20;
var Line = require('./Line');
var urls = require('../util/urls');
var NavigationBar = require('react-native-navbar');


var MenuList = React.createClass({
    getInitialState(){
        return{
            term: this.props.route.passProps.term,
            location: this.props.route.passProps.location,
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
    fetchMore() {
        fetch(urls.url.search+this.state.term+'/'+this.state.location+'/'+OFFSET)
          .then((response) => response.json())
          .then((responseData) => {
            OFFSET+=20;
            var data = this.state.dataSource._dataBlob.s1.concat(responseData.businesses);
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(data),
            });
          })
          .done();
    },
  render() {
      var leftButtonConfig = {
        title: 'Back',
        handler: function() {
            this.props.navigator.pop();
        }.bind(this),
      };
    return (
    <View style={{flex: 1}}>
    <NavigationBar statusBar={{style: 'default', hidden: false,}} tintColor='#19a97a' style={{marginBottom:2,}} title={{title:"Detail",tintColor: '#ffffff'}} leftButton={leftButtonConfig} />
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMenu}
        style={styles.listView}
        onEndReached={this.fetchMore}
      />
    </View>
    );
  },
    
  renderMenu(menu) {
    return (
        <View style={{flex: 1}}>
            <Line></Line>
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
        </View>
    );
  },
  
  loadDetail(menu){
     this.props.navigator.push({
        name: 'detail page',
        index: 3,
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
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'center',
      flex: 3,
  },
    rating: {
        flex: 1,
        height: 10,
        marginRight:10,
    },
  thumbnail: {
    width: 53,
    height: 60,
      margin: 3,
      marginLeft: 5,
  },
  listView: {
    paddingTop: 5,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = MenuList;