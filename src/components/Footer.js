import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 Dragon Age Characters</p>
    </footer>
  );
};

const footerStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
};

export default Footer;
