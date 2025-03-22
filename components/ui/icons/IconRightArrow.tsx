import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
  <Svg width={7} height={12} fill="none" {...props}>
    <Path
      fill="#fff"
      stroke="#fff"
      strokeWidth={0.6}
      d="M1.099 10.713a.354.354 0 0 1 0-.49L5.293 5.91 1.1 1.591a.354.354 0 0 1 0-.49.33.33 0 0 1 .476 0l4.424 4.557a.344.344 0 0 1 .099.245.358.358 0 0 1-.099.245l-4.424 4.556a.323.323 0 0 1-.476.009Z"
      opacity={0.4}
    />
  </Svg>
);
export { SvgComponent as IconRightArrow };
