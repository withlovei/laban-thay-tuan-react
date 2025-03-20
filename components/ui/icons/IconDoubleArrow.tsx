import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={15}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="m.8 14 5-7-5-7h2.45l5 7-5 7H.8Zm5.95 0 5-7-5-7H9.2l5 7-5 7H6.75Z"
    />
  </Svg>
)
export { SvgComponent as IconDoubleArrow }
