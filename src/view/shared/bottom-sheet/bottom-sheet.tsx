import {colors} from '@assets/theme/color';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface BottomSheetProps {
  children: ReactElement;
}

export interface BottomSheetRefProps {
  scrollTo: (destination: number) => void;
}

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

export const BottomSheet = React.forwardRef<
  BottomSheetRefProps,
  BottomSheetProps
>(({children}, ref) => {
  const translateY = useSharedValue(0);

  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, {damping: 50});
  }, []);
  useImperativeHandle(ref, () => ({scrollTo}), [scrollTo]);

  const context = useSharedValue({y: 0});

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      translateY.value = Math.min(translateY.value, -SCREEN_HEIGHT / 8);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(-SCREEN_HEIGHT / 17);
      } else if (translateY.value < -SCREEN_HEIGHT / 3) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  useEffect(() => {
    scrollTo(-SCREEN_HEIGHT / 17 );
  }, []);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP,
    );
    return {
      borderRadius,
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: colors.white,
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.primary,
    zIndex: 2,
  },
  line: {
    width: 75,
    height: 5,
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    marginVertical: 5,
    borderRadius: 2,
  },
});
