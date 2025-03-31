import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={22}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#7B5C26"
      d="M14.215 2.66h-4.72L11.855.3l2.36 2.36Zm-4.69 14.71h4.66l-2.33 2.33-2.33-2.33Zm-4.15-13.1-4.5 11.46h1.84l.92-2.45h5.11l.92 2.45h1.84L7.015 4.27h-1.64Zm-1.13 7.37 1.94-5.18 1.94 5.18h-3.88Zm10.76 2.5h6.12v1.59h-8.53v-1.29l5.92-8.56h-5.88v-1.6h8.3v1.26l-5.93 8.6Z"
    />
  </Svg>
)
export { SvgComponent as IconAZ }
