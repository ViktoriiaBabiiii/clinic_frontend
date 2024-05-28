import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Doctors from './components/Doctors';
import Appointment from './components/Appointment';
import Contact from './components/Contact';

describe('App Routing', () => {
  test.each([
    ['/', Home, 'Home component text'],
    ['/about-us', AboutUs, 'About Us component text'],
    ['/services', Services, 'Services component text'],
    ['/doctors', Doctors, 'Doctors component text'],
    ['/appointment', Appointment, 'Appointment component text'],
    ['/contact', Contact, 'Contact component text']
  ])('navigating to %s renders the %p', async (path, Component, text) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MemoryRouter>
    );

    });
});
