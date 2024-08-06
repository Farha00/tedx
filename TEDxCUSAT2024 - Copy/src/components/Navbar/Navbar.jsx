'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    gsap.fromTo('.logo', {
      opacity: 0,
      yPercent: 50,
    }, {
      yPercent: -50,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    });

    // Scroll-based animation for the logo and other elements
    let logoTl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: () => window.innerHeight * 1,
        scrub: 0.6,
        markers: true,
      }
    });

    logoTl.fromTo('.logo', {
      top: '50vh',
      yPercent: -50,
      transformOrigin: 'center center',
      scale: isMobile ? 1.5 : 2,
      textShadow: '0 0 2px rgba(0,0,0,0.3)',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }, {
      top: 0,
      yPercent: 0,
      scale: 1,
      textShadow: '0 0 2px rgba(0,0,0,0)',
      duration: 0.8,
      left: isMobile ? '8%' : '50%',
      transform: isMobile ? 'translate(0%, 0%)' : 'translate(-50%, 0%)',
    });

    // Animation for date-time and menu button to fade in
    logoTl.fromTo('.date-time, .menu', {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.3,
    }, "-=0.8"); // Start animation just before the logo animation ends

    // Toggle the header box-shadow
    logoTl.fromTo('header', {
      boxShadow: '0px 0px 10px rgba(0,0,0,0)',
    }, {
      boxShadow: '0px 0px 10px rgba(0,0,0,0.15)',
      duration: 0.2,
    }, 0.8);
  }, []);

  const toggleMenu = () => {
    setExpanded(!expanded);
    if (!expanded) {
      gsap.fromTo('.left-menu', {
        opacity: 0,
        x: -50,
      }, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.fromTo('.right-menu', {
        opacity: 0,
        x: 50,
      }, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: 'power3.out',
      });
    }
  };

  return (
    <>
      <header>
        <div className="logo"></div>
        <div className="date-time">07-06-2024 06:55 PM</div>
        <button className="menu" onClick={toggleMenu} aria-expanded={expanded ? 'true' : 'false'}>
          {expanded ? (
            <svg className="close-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5.636 4.223L19.778 18.365l-1.414 1.414L4.222 5.637z" />
              <path d="M4.222 18.363L18.364 4.22l1.414 1.414L5.636 19.777z" />
            </svg>
          ) : (
            <span></span>
          )}
        </button>
      </header>
      {expanded && (
        <div className="menu-panel">
          <nav>
            <ul>
              <li className="left-menu"><a href="/events">Events</a></li>
              <li className="left-menu"><a href="/workshop">Workshop</a></li>
              <li className="right-menu"><a href="/contact">Contact</a></li>
              <li className="right-menu"><a href="https://www.google.com/maps/d/u/0/edit?mid=1NEV2b72eeJaskro_FazhplLTLhJgKHU&usp=sharing">Event Map</a></li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;