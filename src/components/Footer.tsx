import React from "react";
import classes from "../css-modules/Layout.module.css"

export default function Footer(): React.ReactElement {
  return (
    <footer>
      <div className={classes.copyrightText}>2024 #VANLIFE</div>
    </footer>
  );
}
