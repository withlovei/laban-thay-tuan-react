import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
  <Svg width={19} height={20} fill="none" {...props}>
    <Path
      fill={props.fill || "#fff"}
      d="M10 20v-3.075l5.525-5.5c.15-.15.317-.258.5-.325a1.6 1.6 0 0 1 .55-.1 1.504 1.504 0 0 1 1.075.45l.925.925c.133.15.238.317.313.5.074.183.112.367.112.55 0 .183-.033.37-.1.563a1.342 1.342 0 0 1-.325.512l-5.5 5.5H10Zm1.5-1.5h.95l3.025-3.05-.45-.475-.475-.45-3.05 3.025v.95ZM2 20c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 0 1 0 18V2C0 1.45.196.98.588.587A1.926 1.926 0 0 1 2 0h8l6 6v3h-2V7H9V2H2v16h6v2H2Zm13.025-5.025-.475-.45.925.925-.45-.475Z"
    />
  </Svg>
);

export { SvgComponent as IconEditDocument };
