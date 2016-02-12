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
var Splash = require("./app/components/Splash");
var MenuList = require("./app/components/MenuList");
var Detail = require("./app/components/Detail");

class App extends Component{
  render() {
    return (
    <Navigator initialRoute={{name: 'Splash', index: 0, component: Splash,}} 
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
                <Splash navigator={navigator} route={route}></Splash>
            );
        }else if(routeIndex === 1){
            return(
                <Main navigator={navigator} route={route}></Main>
            );
        }else if(routeIndex === 2){
            return(
                <MenuList navigator={navigator} route={route}></MenuList>
            );
        }else if(routeIndex === 3){
            return(
                <Detail navigator={navigator} route={route}></Detail>
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
