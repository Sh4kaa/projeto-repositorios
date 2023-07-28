import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    background: #0D2636;
    font-size: 14px ;
  }
  #root {
    min-height: 100vh;
  }
  body, input, button{
   color: #222;
   font-size: 14px;
   font-family: Arial, Helvetica, sans-serif;
 }

 button{
   cursor: pointer;
 }
`
