<h1 align="center">
<br>
 React Native Draggable Backdrop
 </br>
 <br>

</h1>
<p align="center">

 <img  src="https://raw.githubusercontent.com/lvlrSajjad/react-native-draggable-backdrop/master/shot.gif" width="30%">
</p>
<p align="center">
It's something like sliding up panel in android.
Written in pure js.
</p>
<h2 align="center">Usage</h2>

installation :  
 ```
 npm install react-native-draggable-backdrop --save
```
import :
```jsx harmony
import DraggableBackdrop from 'react-native-draggable-backdrop';
```
usage :
```jsx harmony
import React, {Component} from 'react';
import {Platform, StyleSheet, View, Dimensions, Text} from 'react-native';
import DraggableBackdrop from 'react-native-draggable-backdrop';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={styles.container} >
                <Text>
                    {instructions}
                </Text>
		  <DraggableBackdrop
           	    showBackground
           	    ref={ref=>this.backdrop = ref}
           	    backgroundColor='white'
          	    handleBackPress
       		  >
         	    <Text> hello </Text>
      	         </DraggableBackdrop>
            </View>
        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

```

props :

```
 marginHorizontal: numeric
 backgroundColor: string
 radius: numeric
 elevation: numeric
 onExpand: function
 indicatorColor: string
 showBackground: boolean // shows background
 handleBackPress: boolean // collapse on backpress
```

functions:

```
 expand()
 collapse()
```