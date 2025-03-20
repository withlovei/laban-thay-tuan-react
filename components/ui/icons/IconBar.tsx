import React from "react"
import Svg, { Rect, Path, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Rect width={32} height={32} fill="#FEC41F" rx={16} />
    <Path
      fill="#7B5C26"
      fillRule="evenodd"
      d="M8.286 10.857c0-.473.383-.857.857-.857h13.714a.857.857 0 0 1 0 1.714H9.143a.857.857 0 0 1-.857-.857ZM8.286 16c0-.473.383-.857.857-.857h13.714a.857.857 0 1 1 0 1.714H9.143A.857.857 0 0 1 8.286 16ZM8.286 21.143c0-.474.383-.857.857-.857h13.714a.857.857 0 0 1 0 1.714H9.143a.857.857 0 0 1-.857-.857Z"
      clipRule="evenodd"
    />
  </Svg>
)
export { SvgComponent as IconBar }
