import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={16}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#7B5C26"
      d="M2 0C.9 0 .01.9.01 2L0 18c0 1.1.89 2 1.99 2H14c1.1 0 2-.9 2-2V6l-6-6H2Zm7 7V1.5L14.5 7H9Z"
    />
  </Svg>
)
export { SvgComponent as IconFile }
