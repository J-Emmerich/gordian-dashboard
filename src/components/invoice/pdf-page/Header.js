import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="img-container">
        <img
          src={window.location.origin + "/todo.png"}
          alt="todo Logo"
        ></img>
      </div>
      <div className="header-container">
        <ul className="header-list">
          {/* <li>Fastenrath 64 1-2</li> */}
          <li>08035 Barcelona</li>
          <li>España</li>
          {/* <li>CIF/NIF: Y5473135T</li> */}
          {/* <li>+34 692 264 697</li> */}
          {/* <li>admin@furmidablefamily.com</li> */}
        </ul>
      </div>
    </header>
  );
};

export default Header;
