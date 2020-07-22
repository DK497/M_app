import React, { Component } from 'react';
import { Text, View,FlatList,Modal,StyleSheet,Button, Alert, PanResponder,Share} from 'react-native';
import { Card, Icon ,Rating, Input} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux'
import {baseUrl} from '../shared/baseUrl'
import { postFavorite,postcomment } from '../redux/ActionCreators';
import { set } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable'

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }
  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postcomment: (id,rating,author,comment)=>dispatch(postcomment(id,rating,author,comment))
})

function RenderDish(props) {
  let view
   const handleViewRef = ref => view = ref

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -30 )
            return true;
        else
            return false;
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => 
        {
           view.rubberBand(1000).
                then(endState => console.log(endState.finished ? 'finished' : 'cancelled'))
            },

        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
            {console.log("right",recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                )}
             if (recognizeDrag(gestureState)===false){ 
            
                 props.tM()
             }

            return true;
        }
    })

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Animatable.View useNativeDriver={false} animation="fadeInDown" duration={2000} delay={1000}  
                ref={handleViewRef}
                {...panResponder.panHandlers}>
                <Card
                featuredTitle={dish.name}
                image={{uri:baseUrl+dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                    <Icon raised reverse name={ props.favourite ? 'heart' : 'heart-o'}
                        type='font-awesome' color='#f50'
                    onPress={() => props.favourite ? console.log('Already favorite') : props.onPress()}
                      />
                    <Icon raised reverse name='pencil' type='font-awesome' color='#4b40ef'
                    onPress={props.tM} />
                       <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                        
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} />
                    </View>

                </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {
    const comments = props.comments;

     const renderCommentItem = ({item, index}) => {
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        )
    }
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
        </Animatable.View>
    );
}


class  Dishdetail extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
             showModal:false,author:'',comment:'',r:0
        }
    }
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }   
// .concat add dishId to favourites array
    static navigationOptions = {
        title: 'Dish Details'
    }
    handlesubmit(){
        const dishId = this.props.navigation.getParam('did','')
        const {author,comment,r}=this.state
        this.props.postcomment(dishId,r,author,comment)
        this.toggleModal()
     
    }

    render(){
        console.log("renderefe")
        const dishId = this.props.navigation.getParam('did','')
        return(
            <ScrollView>
                <RenderDish tM={()=>this.toggleModal()} dish={this.props.dishes.dishes[+dishId]} 
                favourite={this.props.favorites.some(el=>el===dishId)}
                onPress={() => this.markFavorite(dishId)}/>
                <RenderComments 
                comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            
             <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>

                      <Rating showRating  
                      onFinishRating={(k)=>this.setState({r:k})} />

                       <Input value={this.state.author} placeholder='Author' autoCapitalize="none" autoCorrect={false}
                       leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                       onChangeText={(au)=>this.setState({author:au})}/>

                       <Input value={this.state.comment} placeholder='Comment' autoCapitalize="none" autoCorrect={false}
                       leftIcon={{ type: 'font-awesome', name: 'comment-o'}}
                       onChangeText={(cm)=>this.setState({comment:cm})}/>
                    
                      <Button color="#512DA8" title="Submit" 
                      onPress={()=>this.handlesubmit()} />

                      <Button color="#512DA8" title="Cancel" 
                      onPress={()=>this.toggleModal()} />

                    </View>
                </Modal>

            </ScrollView>
            )

    }
    
}
const styles = StyleSheet.create({
    modal:{
        justifyContent: 'center',
        margin: 20
     }
   
})

export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);