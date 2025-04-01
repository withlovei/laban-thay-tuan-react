import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={21} height={20} fill="none" {...props}>
    <Path
      fill={props.fill || "#FEC41F"}
      d="m6.85 15.825 3.15-1.9 3.15 1.925-.825-3.6 2.775-2.4-3.65-.325-1.45-3.4L8.55 9.5l-3.65.325 2.775 2.425-.825 3.575ZM3.825 20l1.625-7.025L0 8.25l7.2-.625L10 1l2.8 6.625 7.2.625-5.45 4.725L16.175 20 10 16.275 3.825 20ZM15.25 6l.525-2.225L14 2.3l2.35-.2.9-2.1.9 2.1 2.35.2-1.775 1.475L19.25 6l-2-1.175-2 1.175Z"
    />
  </Svg>
);
export { SvgComponent as IconStar };
