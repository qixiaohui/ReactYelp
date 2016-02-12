'use strict'

import React, {
  StyleSheet,
  View,
  Text,
    Image,
} from 'react-native';
    
var Detail = React.createClass ({
    getInitialState(){
        return{
            data: this.props.route.passProps.data,      
            };
    },
    render(){
    console.log(this.state.data.image_url);
    return(
        <View>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.mainImage} source={{uri: this.state.data.image_url.replace("ms.","o.")}} />
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{this.state.data.name}</Text>
                        <Image style={styles.rating} source={{uri: this.state.data.rating_img_url_small}} />
                    </View>
                    <View style={styles.des}>
                        <Text style={styles.desText}>{this.state.data.snippet_text}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
    }
});
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    imageContainer: {
        flex: 1,
        marginTop:20,
        alignItems: 'stretch',
        marginLeft: 10,
        marginRight: 10,
    },
    titleContainer: {
        margin:20,
        flex: 1,
        flexDirection: "row",
    },
    detailContainer: {
        flex: 2,
    },
    des: {
        flex: 2,
        margin: 10,
    },
    desText:{
        fontSize: 12,
        color: '#762393',
    },
    mainImage: {  
        height: 200,
    },
    rating: {
        marginTop: 7,
        flex: 1,
        height: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 2,
    }
});

module.exports = Detail;