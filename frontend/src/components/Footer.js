import React from "react";

// текущая дата
const date = new Date();

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© {date.getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
