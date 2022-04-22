import React, { Component } from "react";
import Table from "react-bootstrap/Table";

export default class Cursos extends Component {
  constructor(props) {
    super(props);

    this.listarCursos = this.listarCursos.bind(this);

    this.state = {
      cursos: [],
    };
  }

  listarCursos() {
    fetch("http://localhost:1234/cursos")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          cursos: json.cursos,
        });
      });
  }

  componentDidMount() {
    this.listarCursos();
  }

  render() {
    return (
      <div>
        <div>
          <Table>
            <thead>
              <tr>
                <th>Nombre del Curso </th>
              </tr>
            </thead>
            <tbody>
              {this.state.cursos.map((r) => {
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
    );
  }
}
