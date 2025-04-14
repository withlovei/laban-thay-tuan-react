import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={16} height={14} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M.222 1.556V0h15.556v1.556H.222ZM6.833 14V1.556h2.334V14H6.833Z"
    />
  </Svg>
);
export { SvgComponent as IconFlexStart };
