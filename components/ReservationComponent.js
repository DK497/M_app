import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button,Modal,Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DtPicker from './DtPicker'

import * as Animatable from 'react-native-animatable'
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo';



class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date:'',
            showModal: false
        }

        this.obtainNotificationPermission = this.obtainNotificationPermission.bind(this);
        this.presentLocalNotification = this.presentLocalNotification.bind(this);
    }
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }
   handleAlert=()=>{
       const {guests,smoking,date}=this.state
    Alert.alert(
        'Your Reservation OK?',
        `No of guests:${guests}\nSmoking:${smoking}\nDAte and Time:${date}`,
        [
            { 
                text: 'Cancel', 
                onPress: () => this.resetForm(),
                style: ' cancel'
            },
            {
                text: 'OK',
           
                onPress: () => {
                    this.presentLocalNotification(this.state.date) 
                    console.log("noti")
                    this.resetForm()}
            }
        ],
        { cancelable: false }
        // cancellable ensures that user presses a button to remove alert
    )

}

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    
    datevalue=(value)=>{
        this.setState({ date:value })
    }
   
    async obtainNotificationPermission(){

       let permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (permission.granted !==true) {
            permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (permission.granted !== true) {
                Alert.alert('Permission not granted to show notifications');
            }
        }
   
        return (permission.granted)
    }

    async presentLocalNotification(date){
       const k= await this.obtainNotificationPermission();
    if(k){
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        }).then((id)=>console.log("id:",id))
        .catch((err)=>console.log(err))
      
    }  
    }

    render() {
        
        return(
            <ScrollView>
                {/* dont mind I used a different animation */}
                <Animatable.View animation="flipInX" duration={2000} delay={1000}>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    trackColor='#512DA8'
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <DtPicker k={(v)=>{this.datevalue(v)}}/> 
                
                </View>
                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleAlert()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                </Animatable.View>
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time:{this.state.date.toString()} </Text>
                        
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Close" 
                            />
                    </View>
                </Modal>

            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
     
});

export default Reservation;