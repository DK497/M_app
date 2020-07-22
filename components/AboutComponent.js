import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import {connect} from 'react-redux'
import {baseUrl} from '../shared/baseUrl'
import Loading from './LoadingComponent'
import * as Animatable from 'react-native-animatable'

const mapStateToProps=(state)=>{
    return {
        leaders: state.leaders
    }
}

class About extends Component {

    render() {
        const {navigate}=this.props.navigation
        const renderMenuItem = ({ item, index }) => {

            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    leftAvatar={{ source: {uri:baseUrl+item.image} }}
                />
            )
        }
    if(this.props.leaders.isLoading){
        return(
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History />
                    <Card
                        title='Corporate Leadership'>
                        <Loading />
                    </Card>
                    </Animatable.View>
                </ScrollView>
        )
    }
    else if (this.props.leaders.errMess) {
        return(
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <History />
                <Card
                    title='Corporate Leadership'>
                    <Text>{this.props.leaders.errMess}</Text>
                </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
    else{
        return(
            <ScrollView>
               <Card style={{marginBottom:4}} title="Our History" >
                  <Text>
                   Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                   
                   The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
                   </Text>
               </Card>
       <Card title="Corporate Leadeship">
       <FlatList
                data={this.props.leaders.leaders}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
            />
       </Card>
           
            </ScrollView >   
           )
        
    }
        

    }
    
}

export default connect(mapStateToProps)(About);