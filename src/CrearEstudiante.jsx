import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default class CrearEstudiante extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      form: {
        nombre: "",
        apellido: "",
        cursos: "",
      },

      resultado: "",
      errors: {},
      cursos: [],
      mostrar: false,
    };
  }

  handleClose() {
    this.setState({
      mostrar: false,
      errors: {},
    });
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState((state) => ({
      form: {
        ...state.form,
        [name]: value,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:1234/estudiantes", {
      method: "POST",
      body: JSON.stringify({
        nombre: this.state.form.nombre,
        apellido: this.state.form.apellido,
        cursos: [this.state.form.cursos],
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.result === "error") {
          this.setState({
            resultado: json.message,
            errors: json.errors,
            mostrar: false,
          });
          return;
        }

        this.setState({
          resultado: "Estudiante creado con exito",
          errors: {},
          mostrar: true,
        });
      });
  }

  componentDidMount() {
    fetch("http://localhost:1234/cursos")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          cursos: json.cursos,
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.mostrar && (
          <Alert variant="success" onClose={this.handleClose} dismissible>
            <Alert.Heading>{this.state.resultado}</Alert.Heading>
          </Alert>
        )}
        <Form>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              style={{ width: "1000px" }}
              onChange={this.handleChange}
              value={this.state.form.nombre}
              isInvalid={this.state.errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              style={{ width: "1000px" }}
              onChange={this.handleChange}
              value={this.state.form.apellido}
              isInvalid={this.state.errors.apellido}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.errors.apellido}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Cursos</Form.Label>
            <Form.Control
              name="cursos"
              style={{ width: "1000px" }}
              onChange={this.handleChange}
              as="select"
            >
              {this.state.cursos.map((r) => {
                return <option> {r.nombre} </option>;
              })}
            </Form.Control>
          </Form.Group>

          <p></p>
          <Button onClick={this.handleSubmit} type="submit">
            Enviar
          </Button>
        </Form>
      </div>
    );
  }
}
