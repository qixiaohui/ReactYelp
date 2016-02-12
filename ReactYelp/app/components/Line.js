'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
} = React;

var Line = React.createClass ({
    render(){
        return(
            <View style={styles.line}></View>
        );
    }
});

var styles = StyleSheet.create({
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#000000',
        paddingLeft: 10,
        paddingRight: 10,
    }
});

module.exports = Line;