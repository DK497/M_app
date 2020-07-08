import React from 'react'
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

const Contact = () => {
    return (
        <Card title="Contact Information" >
            <Text>
                121, Clear Water Bay Road<br/>
                Clear Water Bay, Kowloon<br/>
                HONG KONG<br/>
                Tel: +852 1234 5678<br/>
                Fax: +852 8765 4321<br/>
                Email:confusion@food.net<br/>
                    </Text>
        </Card>
    )
}

export default Contact;