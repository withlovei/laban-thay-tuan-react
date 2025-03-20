import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={16}
    height={14}
    fill="none"
    {...props}
  >
    <Path fill="#fff" d="M0 1.556V0h16v1.556H0ZM6.8 14V3.111h2.4V14H6.8Z" />
  </Svg>
)
export { SvgComponent as IconFlexStart }
