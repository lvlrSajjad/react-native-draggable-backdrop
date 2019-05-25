/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Animated, View, PanResponder, Dimensions, TouchableOpacity} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


type Props = {};
export default class App extends Component<Props> {

    _animatedValue = new Animated.Value(0);
    _animatedValue2 = new Animated.Value(32);
    _animatedValue3 = new Animated.Value(0);
    _animatedValue4 = new Animated.Value(0);
    _animatedValue5 = new Animated.Value(height-98);
    _collapsed = true;
    _expanded = false;

    _panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {

            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
        },
        onPanResponderMove: (evt, gestureState) => {
            const moveY = Math.round(height - gestureState.moveY);
            if (moveY <= height-98) {
                this._animatedValue5.setValue(-moveY+height-98);
            }
            // The most recent move distance is gestureState.move{X,Y}

            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
            const moveY = height - gestureState.moveY;

            if (moveY > height / 2) {
                this.expand();
            } else {
                this.collapse();
            }
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
        },
        onPanResponderTerminate: (evt, gestureState) => {

            // Another component has become the responder, so this gesture
            // should be cancelled
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {

            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
        },
    });

    expand = () => {
        Animated.parallel([
            Animated.spring(this._animatedValue, {
                toValue: width,
                duration: 200,
            }),
            Animated.spring(this._animatedValue5, {
                toValue: 0,
                duration: 200,
            }),
            Animated.spring(this._animatedValue2, {
                toValue: 4,
                duration: 200,

            }),
            Animated.spring(this._animatedValue3, {
                toValue: height,
                duration: 200,

            }),
            Animated.spring(this._animatedValue4, {
                toValue: 1,
                duration: 200,

            })
        ]).start()
    };
    collapse = () => {

        Animated.parallel([
            Animated.spring(this._animatedValue, {
                toValue: 0,
                duration: 200,

            }),
            Animated.spring(this._animatedValue5, {
                toValue: height-98,
                duration: 200,
            }),
            Animated.spring(this._animatedValue2, {
                toValue: 32,
                duration: 200,

            }),
            Animated.spring(this._animatedValue3, {
                toValue: 0,
                duration: 200,

            }),
            Animated.spring(this._animatedValue4, {
                toValue: 0,
                duration: 200,

            })
        ]).start()
    };


    render() {
        return (
                <Animated.View   style={{
                    position: 'absolute',
                    right: 16,
                    left:16,
                    bottom: 0,
                    backgroundColor: this.props.backgroundColor,
                    minWidth: 56,
                    borderRadius: 0,
                    borderTopLeftRadius:16,
                    borderTopRightRadius:16,
                    width: width - 32,
                    maxWidth: width - 32,
                    maxHeight: height - 56,
                    //  height: this._animatedValue5,
                    height:height - 56,
                    minHeight: 56,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation:16,
                    //  backgroundColor:'white',
                    shadowColor:'black',
                    shadowOffset: {
                        width: 0,
                        height: 16
                    },
                    shadowRadius: 16,
                    shadowOpacity: 0.24,
                    zIndex:100,
                    paddingTop:32,
                    transform:[{ translateY: this._animatedValue5 }]
                }}>
                    <Animated.View {...this._panResponder.panHandlers} style = {{backgroundColor:'transparent',height: 32,width:'100%', position: 'absolute', top: 0,alignItems:'center',justifyContent:'center'}}>
                        <View style={{height:6,borderRadius:3,width:64,backgroundColor:'#424242'}}/>
                    </Animated.View>
                    <TouchableOpacity
                        onPress={() => {
                            if (this._collapsed) {
                                this.expand();
                                if (this.props.onExpand) {
                                    this.props.onExpand();
                                }
                            }
                        }}
                        style={{width: '100%', height: '100%'}}>
                        <Animated.View style={{width: '100%', height: '100%', opacity: this._animatedValue4}}>
                            {this._collapsed && this.props.icon}
                            {this.props.children}
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
        );
    }
}
