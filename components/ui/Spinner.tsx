// components/Spinner.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, View, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type SpinnerProps = {
  size?: number;
  strokeWidth?: number;
};

const Spinner = ({ size = 80, strokeWidth = 6 }: SpinnerProps) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spin.start();
    return () => spin.stop();
  }, [rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FFFFFF"
            strokeOpacity={0.3}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FFFFFF"
            strokeOpacity={0.9}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference * 0.88}, ${circumference}`}
            strokeDashoffset={circumference * 0.75}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default Spinner;
