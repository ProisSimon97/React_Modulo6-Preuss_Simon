import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function CrearEstudianteHooks() {
  const [resultado, setResultado] = useState({ resultado: "" });
  const [errors, setErrors] = useState({ errors: {} });
  const [cursos, setCursos] = useState({ cursos: [] });
  const [mostrar, setMostrar] = useState({ mostrar: false });
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cursos: "",
  });

  useEffect(() => {
    fetch("http://localhost:1234/cursos")
      .then((resp) => resp.json())
      .then((json) => {
        setCursos({
          cursos: json.cursos,
        });
      });
  }, []);

  function handleClose() {
    setErrors({ errors: {} });
    setMostrar({ mostrar: false });
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:1234/estudiantes", {
      method: "POST",
      body: JSON.stringify({
        nombre: form.nombre,
        apellido: form.apellido,
        cursos: [form.cursos],
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.result === "error") {
          setResultado({ resultado: json.message });
          setErrors({ errors: json.errors });
          setMostrar({ mostrar: false });

          return;
        }

        setResultado({ resultado: "Estudiante creado con exito" });
        setErrors({ errors: {} });
        setMostrar({ mostrar: true });
      });
  }

  return (
    console.log(form),
    (
      <div>
        {mostrar.mostrar && (
          <Alert variant="success" onClose={handleClose} dismissible>
            <Alert.Heading>{resultado.resultado}</Alert.Heading>
          </Alert>
        )}
        <Form>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              style={{ width: "1000px" }}
              onChange={handleChange}
              value={form.nombre}
              isInvalid={errors.errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errors.errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              style={{ width: "1000px" }}
              onChange={handleChange}
              value={form.apellido}
              isInvalid={errors.errors.apellido}
            />
            <Form.Control.Feedback type="invalid">
              {errors.errors.apellido}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Cursos</Form.Label>
            <Form.Control
              name="cursos"
              style={{ width: "1000px" }}
              onChange={handleChange}
              as="select"
            >
              {cursos.cursos.map((r) => {
                return <option> {r.nombre} </option>;
              })}
            </Form.Control>
          </Form.Group>

          <p></p>
          <Button onClick={handleSubmit} type="submit">
            Enviar
          </Button>
        </Form>
      </div>
    )
  );
}
