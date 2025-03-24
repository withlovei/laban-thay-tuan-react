import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M14 0H2C.9 0 0 .9 0 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 14H2V2h12v12Z"
    />
  </Svg>
)
export { SvgComponent as IconSquare }
