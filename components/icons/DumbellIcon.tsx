import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DumbellIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="none"
    viewBox={props.viewBox ?? "3 3 18 18"}
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M8.091 8h1.273c.36.009.645.307.636.667v6.666a.652.652 0 0 1-.636.667H8.091a.652.652 0 0 1-.636-.667V14H5.636A.652.652 0 0 1 5 13.333v-2.666A.652.652 0 0 1 5.636 10h1.82V8.667A.652.652 0 0 1 8.09 8ZM15.91 16h-1.274a.652.652 0 0 1-.636-.667V8.667A.652.652 0 0 1 14.636 8h1.273c.36.009.645.307.636.667V10h1.818a.652.652 0 0 1 .637.667v2.666a.652.652 0 0 1-.636.667h-1.819v1.333a.652.652 0 0 1-.636.667Z"
      clipRule="evenodd"
    />
    <Path
      fill="#000"
      d="M6.705 14a.75.75 0 0 0 1.5 0h-1.5Zm1.5-4a.75.75 0 0 0-1.5 0h1.5Zm9.091 0a.75.75 0 0 0-1.5 0h1.5Zm-1.5 4a.75.75 0 0 0 1.5 0h-1.5ZM10 11.25a.75.75 0 0 0 0 1.5v-1.5Zm4 1.5a.75.75 0 0 0 0-1.5v1.5ZM8.205 14v-4h-1.5v4h1.5Zm7.591-4v4h1.5v-4h-1.5ZM10 12.75h4v-1.5h-4v1.5Z"
    />
  </Svg>
)
export default DumbellIcon
