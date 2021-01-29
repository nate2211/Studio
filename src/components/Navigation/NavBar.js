import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import Nav from 'react-bootstrap/cjs/Nav'
import Navbar from 'react-bootstrap/cjs/Navbar'
import Container from "react-bootstrap/cjs/Container";


const Navigation = () => (
    <Container>
        <Navbar variant='light' className='mr-auto' expand='false' collapseOnSelect>
            <Navbar.Brand>Berzerk-Music</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav fill variant="pills">
                    <Nav.Item>
                        <Nav.Link as={Link} to={ROUTES.LANDING} className='Nav-Link'>Upload</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={ROUTES.VIDEOS} id='RouterNavLink' className='Nav-Link'>Videos</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={ROUTES.ACCOUNT} id='RouterNavLink' className='Nav-Link'>Account</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Container>
);

export default Navigation
