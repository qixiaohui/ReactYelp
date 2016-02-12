'use strict';

var React = require('react-native');
var {
  Component,
  View,
  Text,
  Image,
} = React;

class Splash extends Component {
  componentWillMount() {
    var navigator = this.props.navigator;
    setTimeout(() => {
      navigator.push({
        name: 'Search',
        index: 1,
      });
    }, 2000);
  }
  render() {
    return (
        <View style={{flex: 1}}>
            <Image style={{flex: 1}} source={require('../images/splash.png')} />
        </View>
    );
  }
}

module.exports = Splash;