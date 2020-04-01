import React from 'react';
import {Text} from 'react-native';
export const CText = props => (
    <Text style={[{
        opacity: props.opacity ? props.opacity : 1,
        color: props.color ? props.color : '#000000',
        fontFamily: props.fontFamily ? props.fontFamily : 'Rubik',
        fontSize: props.fontSize ? props.fontSize : 12,
        fontWeight: props.fontWeight ? props.fontWeight : '400',
        marginLeft: props.marginLeft ? props.marginLeft : 0,
        marginRight: props.marginRight ? props.marginRight : 0,
        marginTop: props.marginTop ? props.marginTop : 0,
        marginBottom: props.marginBottom ? props.marginBottom : 0,
    }, props.lineHeight && { lineHeight: props.lineHeight}]}>
      {props.title}
    </Text>
  );