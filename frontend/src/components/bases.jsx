import React from 'react';
import { Link } from "react-router-dom";
import * as navbars from "./navbars"
import * as footers from "./footers"

export function Base1({children}) {
  return (
    <main className="custom_body_1">
      <navbars.Navbar1 />
      <main className="custom_main_1">{children}</main>
      <footers.Footer1 />
    </main>
  )
}
