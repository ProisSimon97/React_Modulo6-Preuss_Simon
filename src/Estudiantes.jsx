import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Estudiantes extends Component {
  constructor(props) {
    super(props);

    this.listarEstudiantes = this.listarEstudiantes.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.listarCursos = this.listarCursos.bind(this);

    this.state = {
      estudiantes: [],
      cursos: [],
      curso: "",
      ultimoModificado: {},
      resultado: "",
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

  listarEstudiantes(apellido) {
    fetch("http://localhost:1234/estudiantes?apellido=" + apellido)
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          estudiantes: json.estudiantes,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.apellido !== this.props.apellido) {
      this.listarEstudiantes(this.props.apellido);
    }
  }

  componentDidMount() {
    this.listarEstudiantes(this.props.apellido);
    this.listarCursos();
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    let est = this.state.estudiantes[0];

    let cur = { nombre: this.state.curso };

    est.cursos = [...est.cursos, cur];

    fetch("http://localhost:1234/estudiantes?apellido=" + this.props.apellido, {
      method: "POST",
      body: JSON.stringify({
        nombre: est.nombre,
        apellido: est.apellido,
        cursos: est.cursos,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.result === "error") {
          this.setState({
            resultado: json.message,
          });
          return;
        }

        this.setState({
          resultado: "Estudiante modificado con exito",
        });
      });
  }

  render() {
    return (
      <div>
        <div>
          {" "}
          <Table>
            <thead>
              <tr>
                <th>Nombre </th>
                <th>Apellido</th>
                <th>Cursos Actuales</th>
                {this.props.apellido && <th>Cursos Disponibles</th>}
              </tr>
            </thead>

            <tbody>
              {this.state.estudiantes.map((r) => {
                return (
                  <tr key={r.nombre}>
                    <td>{r.nombre}</td>
                    <td>{r.apellido}</td>

                    <td>
                      {r.cursos.map((c) => {
                        return <li>{c.nombre}</li>;
                      })}
                    </td>

                    {this.props.apellido && (
                      <td>
                        <Form.Group>
                          <Form.Control
                            name="curso"
                            style={{ width: "200px" }}
                            onChange={this.handleChange}
                            as="select"
                          >
                            {this.state.cursos.map((x) => {
                              return <option> {x.nombre} </option>;
                            })}
                          </Form.Control>
                        </Form.Group>
                        <p></p>
                        <Button onClick={this.handleSubmit} type="submit">
                          Inscribirse
                        </Button>
                      </td>
                    )}
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
