import React, { Component } from "react";
import CrearEstudiante from "./CrearEstudiante";
import Cursos from "./Cursos";
import Estudiantes from "./Estudiantes";
import Bienvenido from "./Bienvenido";
import Container from "react-bootstrap/Container";
import CursosHooks from "./Hooks/CursosHooks";
import CrearEstudianteHooks from "./Hooks/CrearEstudianteHooks";

export default class Body extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container fluid className="body">
        {this.props.item === 0 && <Bienvenido />}
        {this.props.item === 1 && <CrearEstudiante />}
        {/* {this.props.item === 1 && <CrearEstudianteHooks />} */}
        {this.props.item === 2 && (
          <Estudiantes apellido={this.props.apellido} />
        )}
        {/* {this.props.item === 3 && <Cursos />} */}
        {this.props.item === 3 && <CursosHooks />}
      </Container>
    );
  }
}
