'use strict'

import React, {
    StyleSheet,
    View,
    Text,
      Image,
    MapView,
    ScrollView,
    TouchableOpacity,
    LinkingIOS,
} from 'react-native';

var Line = require('./Line');
var urls = require('../util/urls');
var NavigationBar = require('react-native-navbar');
var Communications = require('react-native-communications');
    
var Detail = React.createClass ({
    getInitialState(){
        console.log(parseFloat(this.props.route.passProps.data.location.coordinate.latitude));
        console.log(parseFloat(this.props.route.passProps.data.location.coordinate.longitude));
        this.fetchBusiness(this.props.route.passProps.data.id);
        return{
            review: {reviews:[{excerpt:"",user:{image_url:""}}]},
            data: this.props.route.passProps.data,
            region: {latitude:
                     parseFloat(this.props.route.passProps.data.location.coordinate.latitude),
                    longitude: 
                     parseFloat(this.props.route.passProps.data.location.coordinate.longitude),
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0021,}
            };
    },
    fetchBusiness(id) {
        fetch(urls.url.business+id)
          .then((response) => response.json())
          .then((responseData) => {
            console.log(JSON.stringify(responseData));
            this.setState({review: responseData});
          })
          .done();
    },
    goToMap(){
       var url = 'http://maps.apple.com/?ll='+this.state.region.latitude+','+this.state.region.longitude;
        LinkingIOS.openURL(url);
    },
    render(){
    console.log(this.state.data.image_url);   
      var leftButtonConfig = {
        title: 'Back',
        handler: function() {
            this.props.navigator.pop();
        }.bind(this),
      };
    return(
            <View style={{flex:1}}>
            <NavigationBar statusBar={{style: 'default', hidden: false,}} tintColor='#19a97a' style={{marginBottom:2,}} title={{title:"Detail",tintColor: '#ffffff'}} leftButton={leftButtonConfig} />
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.mainImage} source={{uri: this.state.data.image_url.replace("ms.","o.")}} />
                    </View>
                    <View style={styles.detailContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{this.state.data.name}</Text>
                            <Image style={styles.rating} source={{uri: this.state.data.rating_img_url}} />
                        </View>
                        <View style={styles.des}>
                            <Text style={styles.desText}>{this.state.data.snippet_text}</Text>
                        </View>
                    </View>
                    <Line></Line>
                    <View style={styles.mapContainer}>
                        <MapView style={styles.map} region={this.state.region} />
                    </View>
                    <View style={styles.infoContainer}>
                        <Line></Line>
                        <TouchableOpacity onPress={() => Communications.phonecall(this.state.data.phone, false)}>
                        <View style={styles.info}>
                              <Text style={styles.infoTitle}>Call</Text> 
                              <Text style={styles.infoDetail}>{this.state.data.phone}</Text>
                        </View>
                        </TouchableOpacity>
                        <Line></Line>
                       <TouchableOpacity onPress={() => Communications.phonecall(this.state.data.phone, false)}>
                        <View style={styles.info}>
                              <Text style={styles.infoTitle}>Message the business</Text> 
                              <Text style={styles.infoDetail}>{this.state.data.phone}</Text>
                        </View>
                        </TouchableOpacity>
                        <Line></Line>
                        <TouchableOpacity onPress={this.goToMap}>
                        <View style={styles.info}>
                              <Text style={styles.infoTitle}>Get direction</Text> 
                              <Text style={styles.infoDetail}>{this.state.data.location.address[0]}</Text>
                        </View>
                        </TouchableOpacity>
                        <Line></Line>
                        <View style={styles.info}>
                              <Text style={styles.infoTitle}>Still Open</Text> 
                              <Text style={styles.infoDetail}>{this.state.data.is_closed?'Yes':'No'}</Text>
                        </View>
                        <Line></Line>
                        <TouchableOpacity onPress={() => Communications.web(this.state.data.mobile_url)}>
                         <View style={styles.info}>
                              <Text style={styles.infoTitle}>Go to website</Text>                   
                        </View>
                        </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#EFEFEF', height: 50,}}>
                    <Text style={styles.reviewTitle}>Review highlights</Text>
                </View>
                <Line></Line>
                <View style={styles.reviewContainer}>
                    <Image style={styles.userIcon} source={{uri: this.state.review.reviews[0].user.image_url}} />
                    <Text style={styles.reviewSnip}>{this.state.review.reviews[0].excerpt}</Text>
                </View>
                </View>
            </ScrollView>
            </View>
    );
    }
});
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fefefe',
    },
    imageContainer: {
        flex: 1,
        marginTop:5,
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
    mapContainer: {
        flex: 2,
        marginTop: 10,
        marginBottom: 10,
    },
    infoContainer: {
        flex: 3,
        flexDirection: 'column',
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
    },
    info: {
        flex: 1,
        flexDirection: 'column',
        marginBottom:10,
    },
    infoTitle: {
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft:30,
        color: '#000000',
        flex: 2,
    },
    reviewTitle: {
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 16,
        marginLeft: 10,
    },
    infoDetail: {
        fontSize: 13,
        color: '#797979',
        marginLeft: 30,
        flex: 1,
    },
    map: {
        height: 120,
        borderWidth: 1,
        borderColor: '#EFEFEF',
    },
    reviewContainer: {
        flex: 2,
        flexDirection: 'row',
    },
    userIcon: {
        flex: 1,
        marginTop:5,
        height: 50,
        borderRadius: 10,
        marginLeft:5,
    },
    reviewSnip: {
        margin: 5,
        fontSize: 10,
        color: '#121212',
        marginLeft: 5,
        flex: 5,  
        marginBottom: 20,
    }
});

module.exports = Detail;