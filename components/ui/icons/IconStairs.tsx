import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={20}
    height={14}
    fill="none"
    {...props}
  >
    <Path fill="#FEC41F" d="M0 14v-2h6V6h6V0h8v2h-6v6H8v6H0Z" />
  </Svg>
)
export { SvgComponent as IconStairs }
