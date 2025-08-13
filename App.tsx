import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Section } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Home);

  const sectionRefs = {
    [Section.Home]: useRef<HTMLDivElement>(null),
    [Section.About]: useRef<HTMLDivElement>(null),
    [Section.Projects]: useRef<HTMLDivElement>(null),
    [Section.Contact]: useRef<HTMLDivElement>(null),
  };

  const navigateToSection = (section: Section) => {
    setActiveSection(section);
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as Section);
        }
      });
    };

    // Activates when the section is centered in the viewport
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    });

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) {
              observer.unobserve(ref.current);
            }
        });
    };
  }, []);

  return (
    <>
      <Header activeSection={activeSection} setActiveSection={navigateToSection} />
      <main>
        <div ref={sectionRefs[Section.Home]} id={Section.Home}>
          <Home setActiveSection={navigateToSection} />
        </div>
        <div ref={sectionRefs[Section.About]} id={Section.About}>
          <About />
        </div>
        <div ref={sectionRefs[Section.Projects]} id={Section.Projects}>
          <Projects />
        </div>
        <div ref={sectionRefs[Section.Contact]} id={Section.Contact}>
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
