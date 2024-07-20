import * as React from "react"
import Svg, { Path } from "react-native-svg"
const BalanceIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={30}
    height={30}
    stroke="#000"
    viewBox="0 0 48 48"
    {...props}
  >
    
    <Path
      fill="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      strokeWidth={4}
      d="M35 25a32.234 32.234 0 0 0-22 0l-1-11c7-3 17-3 24 0l-1 11Z"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      strokeWidth={4}
      d="m24 23-3-5"
    />
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      strokeWidth={4}
      d="M42 39a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h30a3 3 0 0 1 3 3v30Z"
    />
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      strokeWidth={4}
      d="M29 23.455a32.222 32.222 0 0 0-10 0"
    />
  </Svg>
)
export default BalanceIcon