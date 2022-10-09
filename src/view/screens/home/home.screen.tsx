import React, {useCallback, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '@assets/theme/color';
import {CButton} from '@shared/c-button';
import {ButtonType} from '@shared/c-button';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {BottomSheet, BottomSheetRefProps} from '@shared/bottom-sheet';
import {CInput} from '@shared/c-input';

export const Home = () => {
  const ref = useRef<BottomSheetRefProps>(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({x: 0, y: 0});

  const onPress = useCallback(() => {
    ref?.current?.scrollTo(-500);
  }, []);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {x: translateX.value, y: translateY.value};
    })
    .onUpdate(event => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    });

  const followX = useDerivedValue(() => {
    return withSpring(translateX.value);
  });

  const followY = useDerivedValue(() => {
    return withSpring(translateY.value);
  });

  const cStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: followX.value}, {translateY: followY.value}],
    };
  });

  return (
    <View>
      <View style={styles.animatedCircle}>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.circle, cStyle]}>
            <Animated.View style={[styles.subCircle]} />
          </Animated.View>
        </GestureDetector>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>
            The{'\n'}smartest{'\n'}way to share{'\n'}Resume
          </Text>
          <Text style={styles.subHeading}>
            Start a journey as a recruiter{'\n'}and find talent who is looking
            {'\n'}for opportunity.
          </Text>
        </View>
        <View style={styles.bottomSection}>
          <View style={styles.authCtaContainer}>
            <CButton
              type={ButtonType.primary}
              label={'Login'}
              onPress={onPress}
              style={styles.loginCta}
              textStyle={styles.loginCtaText}
            />
            <CButton
              type={ButtonType.secondary}
              label={'Register'}
              onPress={() => {}}
              style={styles.registerCta}
            />
          </View>
          <View>
            <CButton
              type={ButtonType.transparent}
              label={'Why Us?'}
              onPress={() => {}}
              style={styles.appDetailCta}
              textStyle={styles.infoCtaText}
            />
            <CButton
              type={ButtonType.transparent}
              label={'Terms & Conditions'}
              onPress={() => {}}
              style={styles.tAndCCta}
              textStyle={styles.infoCtaText}
            />
          </View>
        </View>
      </View>
      <BottomSheet ref={ref}>
        <View style={styles.loginContainer}>
          <CInput placeholder="Email Id" />
          <View style={styles.margin} />
          <CInput placeholder="Password" />
          <View style={styles.margin} />
          <CButton
            type={ButtonType.primary}
            label={'Login'}
            onPress={() => {}}
            style={styles.loginCta}
            textStyle={styles.loginCtaText}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: colors.white,
  },
  heading: {
    fontFamily: 'Roboto-Medium',
    textAlign: 'right',
    fontSize: 53,
    padding: 20,
    letterSpacing: 1.5,
    color: colors.primary,
  },
  subHeading: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'right',
    fontSize: 20,
    padding: 20,
    letterSpacing: 1.5,
    color: colors.grey,
  },
  bottomSection: {
    margin: 20,
  },
  authCtaContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  loginCta: {
    loginCtaTmarginRight: 15,
    width: 100,
  },
  loginCtaText: {
    color: colors.white,
  },
  registerCta: {
    marginLeft: 15,
    width: 100,
  },
  infoCtaText: {
    fontWeight: '400',
    fontSize: 12,
  },
  tAndCCta: {
    padding: 3,
    marginTop: 5,
  },
  appDetailCta: {
    padding: 3,
  },
  circle: {
    height: 80,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subCircle: {
    height: 74,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  animatedCircle: {
    position: 'absolute',
    left: 200,
    top: 0,
    zIndex: 1,
  },
  loginContainer: {
    padding: 20,
  },
  margin: {
    marginTop: 20,
  },
});
