import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import * as TYPES from "./NavBarTypes.js";
import {
  BiLogIn,
  BiReceipt,
  BiLogOut,
  BiUser,
  BiGroup,
  BiEdit,
  BiHomeAlt,
} from "react-icons/bi";

function NavBar({ type, name, onLogout, isLight }) {
  const visibleName = name?.length > 15 ? name?.substr(0, 15) + "..." : name;
  return (
    <Navbar
      style={{ backgroundColor: isLight ? "lightblue" : "#1b1e21" }}
      expand="lg"
    >
      <Container style={{ filter: isLight ? "invert(0%)" : "invert(100%)" }}>
        <Navbar.Brand className="fw-bold">
          <Nav.Link as={NavLink} to="/">
            Кампусные курсы
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {type !== TYPES.GUEST && (
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/groups">
                <BiGroup /> Группы курсов
              </Nav.Link>
              {(type === TYPES.BOTH || type === TYPES.STUDENT) && (
                <Nav.Link as={NavLink} to="/courses/my">
                  <BiHomeAlt /> Мои курсы
                </Nav.Link>
              )}
              {type > TYPES.STUDENT && (
                <Nav.Link as={NavLink} to="/courses/teaching">
                  <BiEdit /> Преподаваемые курсы
                </Nav.Link>
              )}
            </Nav>
          )}
          <Nav className="ms-auto d-flex">
            {type === TYPES.GUEST && (
              <>
                <Nav.Link as={NavLink} to="/login">
                  <BiLogIn /> Вход
                </Nav.Link>
                <Nav.Link as={NavLink} to="/registration">
                  <BiReceipt /> Регистрация
                </Nav.Link>
              </>
            )}
            {type > TYPES.GUEST && (
              <>
                <Nav.Link as={NavLink} to="/logout" onClick={onLogout}>
                  <BiLogOut /> Выход
                </Nav.Link>
                <Nav.Link as={NavLink} to="/profile">
                  <BiUser /> {visibleName}
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
