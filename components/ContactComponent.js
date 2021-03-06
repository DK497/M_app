import React from 'react'
import { ScrollView, Text } from 'react-native';
import { Card,Button,Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable'
import * as MailComposer from 'expo-mail-composer';


const Contact = () => {

    const sendMail=()=>{
        MailComposer.composeAsync({
            recipients: ['imt_2017033@iiitm.ac.in'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    return (
        <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}> 
        <Card title="Contact Information" >
            
            <Text>
                121, Clear Water Bay Road   {'\n'}
                Clear Water Bay, Kowloon   {'\n'}
                HONG KONG   {'\n'}
                Tel: +852 1234 5678   {'\n'}
                Fax: +852 8765 4321   {'\n'}
                Email:confusion@food.net
                    </Text>

          <Button title="Send Email" buttonStyle={{backgroundColor: "#512DA8"}}
             icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                onPress={()=>sendMail()}
                        />        
        </Card>
        </Animatable.View>  
        </ScrollView>
    )
}

export default Contact;