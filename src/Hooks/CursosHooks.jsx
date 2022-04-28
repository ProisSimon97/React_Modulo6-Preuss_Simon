import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

export default function CursosHooks() {
  const [cursos, setCursos] = useState({ cursos: [] });

  useEffect(() => {
    listarCursos();
  }, []);

  function listarCursos() {
    fetch("http://localhost:1234/cursos")
      .then((resp) => resp.json())
      .then((json) => {
        setCursos({ cursos: json.cursos });
      });
  }

  return (
    <div>
      <div>
        <div>
          <Table>
            <thead>
              <tr>
                <th>Nombre del Curso </th>
              </tr>
            </thead>
            <tbody>
              {cursos.cursos.map((r) => {
                return (
                  <tr key={r.nombre}>
                    <td>{r.nombre}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
