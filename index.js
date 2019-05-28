/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Animated, View, PanResponder, Dimensions, TouchableOpacity, BackHandler, TouchableWithoutFeedback} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


type
  Props = {};
export default class App extends Component<Props> {

    _animatedValue4 = new Animated.Value(0);
    _animatedValue5 = new Animated.Value(height - 74);
    _animatedValue3 = new Animated.Value(0);
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
            if (moveY <= height - 74) {
                this._animatedValue5.setValue(-moveY + height - 74);
                this._animatedValue3.setValue((height - gestureState.moveY) / height )
            }
            // The most recent move distance is gestureState.move{X,Y}

            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
            const moveY = height - gestureState.moveY;
            const dy = gestureState.dy;

            if (dy <= 0) {
                this.expand();
            } else if (dy > 0) {
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
            Animated.spring(this._animatedValue5, {
                toValue: 24,
                duration: 200
            }),
            Animated.spring(this._animatedValue4, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.spring(this._animatedValue3, {
                toValue: 1,
                duration: 200
            })
        ]).start();
        if (this.props.handleBackPress) {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        }
    };
    collapse = () => {
        Animated.parallel([
            Animated.spring(this._animatedValue5, {
                toValue: height - 74,
                duration: 200,
            }),
            Animated.spring(this._animatedValue4, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.spring(this._animatedValue3, {
                toValue: 0,
                duration: 200
            })
        ]).start();
        if (this.props.handleBackPress) {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        }
    }

    componentWillUnmount() {
        if (this.props.handleBackPress) {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        }
    }

    handleBackPress = () => {
        this.collapse(); // works best when the goBack is async
        return true;
    }


    render() {
        const {marginHorizontal, backgroundColor, radius, elevation, onExpand, children, indicatorColor, showBackground} = this.props;

        return (
          <Animated.View style={{position: 'absolute', height: '100%', width: '100%'}}>
              {showBackground &&
              <Animated.View
                style={{
                    opacity: this._animatedValue3,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    position: 'absolute',
                    height: '100%',
                    width: '100%'
                }}>
                  <TouchableOpacity style={{height: '100%', width: '100%'}} onPress={()=>this.collapse()}/>
              </Animated.View>
              }
              <Animated.View style={{
                  position: 'absolute',
                  right: marginHorizontal ? marginHorizontal : 16,
                  left: marginHorizontal ? marginHorizontal : 16,
                  bottom: 0,
                  backgroundColor: this.props.backgroundColor,
                  minWidth: 56,
                  borderRadius: 0,
                  borderTopLeftRadius: radius ? radius : 16,
                  borderTopRightRadius: radius ? radius : 16,
                  width: marginHorizontal ? width - 2 * marginHorizontal : width - 32,
                  height: height - 32,
                  paddingBottom:32,
                  minHeight: 56,
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: elevation ? elevation : 16,
                  shadowColor: 'black',
                  shadowOffset: {
                      width: 0,
                      height: 16
                  },
                  shadowRadius: 16,
                  shadowOpacity: 0.24,
                  zIndex: 100,
                  paddingTop: 32,
                  transform: [{translateY: this._animatedValue5}]
              }}>
                  <Animated.View {...this._panResponder.panHandlers} style={{
                      backgroundColor: 'transparent',
                      height: 32,
                      width: '100%',
                      position: 'absolute',
                      top: 0,
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}>
                      <TouchableOpacity
                        onPress={() => {
                            if (this._collapsed) {
                                this.expand();
                                if (onExpand) {
                                    onExpand();
                                }
                            }
                        }}
                        style={{
                            width: '100%', height: 32,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                          <View style={{
                              height: 6,
                              borderRadius: 3,
                              width: 64,
                              backgroundColor: indicatorColor ? indicatorColor : '#424242'
                          }}/>
                      </TouchableOpacity>

                  </Animated.View>

                  <Animated.View style={{width: '100%', height: '100%', opacity: this._animatedValue4}}>
                      {children}
                  </Animated.View>
              </Animated.View>
          </Animated.View>
        );
    }
}
