/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var React = require("react-native");

var {
  AppRegistry,
  StyleSheet,
    Component,
  Navigator,
    View,
    Text
} = React;
    
var Main = require("./app/components/main");
var MenuList = require("./app/components/MenuList");

class App extends Component{
  render() {
    return (
    <Navigator initialRoute={{name: 'Scene', index: 0}} 
    renderScene={this.renderScene.bind(this)}
    configureScene={(route) => {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    return Navigator.SceneConfigs.FloatFromRight;
    }} />
    );
  }
    renderScene(route, navigator){
        var routeIndex = route.index;
        if(routeIndex === 0){
            return(
                <Main navigator={navigator}></Main>
            );
        }else if(routeIndex === 1){
            return(
                <MenuList navigator={navigator}></MenuList>
            );
        }
    }
  
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  },
});

AppRegistry.registerComponent('ReactYelp', () => App);
