import React from "react";

import services from "../../services/auth";

const Settings = ({ token, user }) => {
  return (
    <div>
      <p>Estos son los ajustes.</p>

      <p>
        Puede crear nuevo projecto y añadir compañeros con su nombre de usuario.
      </p>
      <p>Muestra los projectos que tiene y su rol en cada uno</p>
      <p>Muestra su nombre de usuario, y su id </p>
    </div>
  );
};

export default Settings;
