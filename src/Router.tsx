import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';


type Props = {}

type RootStackParamList = {
    Home: undefined;
};

const Router = (props: Props) => {
    const RootStack = createStackNavigator<RootStackParamList>();

    return (
        <RootStack.Navigator initialRouteName="Home">
            <RootStack.Screen name="Home" component={
                () => <View><Text>Home</Text></View>
            } />

        </RootStack.Navigator>
    )
}

export default Router