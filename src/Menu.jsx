import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      apellido: "",
    };
  }

  handleClick(e, item) {
    this.props.handler(item);
  }

  handleSearch() {
    this.props.search(this.state.apellido);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#" onClick={(e) => this.handleClick(e, 0)}>
              Curso React
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="#" onClick={(e) => this.handleClick(e, 1)}>
                  Crear Estudiante
                </Nav.Link>
                <Nav.Link href="#" onClick={(e) => this.handleClick(e, 2)}>
                  Estudiantes
                </Nav.Link>

                <Nav.Link href="#" onClick={(e) => this.handleClick(e, 3)}>
                  Cursos
                </Nav.Link>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  name="apellido"
                  type="search"
                  placeholder="Apellido..."
                  className="me-2"
                  aria-label="Search"
                  onChange={this.handleChange}
                />
                <Button variant="outline-success" onClick={this.handleSearch}>
                  Buscar
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
