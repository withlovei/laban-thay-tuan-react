import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={20}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#7B5C26"
      d="M18 0H2C.9 0 .01.9.01 2L0 14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2Zm0 14H2V4l8 5 8-5v10Zm-8-7L2 2h16l-8 5Z"
    />
  </Svg>
)
export { SvgComponent as IconEmail }
