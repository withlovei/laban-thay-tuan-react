import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#7B5C26"
      d="M12.43 8 10 0 7.57 8H0l6.18 4.41L3.83 20 10 15.31 16.18 20l-2.35-7.59L20 8h-7.57Z"
    />
  </Svg>
)
export { SvgComponent as IconStar }
