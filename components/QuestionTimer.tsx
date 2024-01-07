import { View, Dimensions, Animated } from "react-native";
import { useState, useEffect, useRef } from "react";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";
import { Colors } from "../utils/colors";

interface QuestionTimerProps {
  timeout: number;
  onTimeout: () => void;
}

const width = Dimensions.get("window").width;

const QuestionTimer: React.FC<QuestionTimerProps> = ({
  timeout,
  onTimeout,
}) => {
  const animation = useRef<LottieView | null>(null);
  const flamePosition = useRef(new Animated.Value(0)).current;
  const [remainingTime, setRemainingTime] = useState(timeout);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newRemainingTime = Math.max(timeout - elapsed, 0);
      setRemainingTime(newRemainingTime);

      const position = (newRemainingTime / timeout) * (width - 64);
      Animated.timing(flamePosition, {
        toValue: position,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [startTime, timeout, flamePosition]);

  return (
    <View>
      <Progress.Bar
        progress={remainingTime / timeout}
        width={width - 64}
        height={40}
        color= {Colors.pressed}
        style={{ zIndex: -1 }}
      />
      <Animated.View
        style={{
          position: "absolute",
          top: 1,
          left: -12,
          transform: [{ translateX: flamePosition }],
        }}
      >
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 40,
            height: 40,
          }}
          source={require("../assets/lottie/flame.json")}
        />
      </Animated.View>
    </View>
  );
};

export default QuestionTimer;
