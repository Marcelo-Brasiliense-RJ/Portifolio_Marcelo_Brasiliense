import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/portfolio';
import { useWordReveal, SplitWords } from '../../hooks/useWordReveal';
import ProjectModal from './ProjectModal';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const h2Ref = useWordReveal();
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const matchMedia = gsap.matchMedia();
        matchMedia.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.from('.proj-card-v2', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.projects-grid-v2',
                    start: 'top 80%',
                    once: true,
                },
            });
        });
        return () => matchMedia.revert();
    }, []);

    const openProject = (proj) => {
        setSelectedProject(proj);
    };

    const closeProject = () => {
        setSelectedProject(null);
    };

    return (
        <section id="projects" aria-labelledby="projects-heading">
            <div className="container">
                <div className="section-header">
                    <div>
                        <span className="eyebrow">07 / PROJETOS</span>
                        <h2 className="section-h2" id="projects-heading" ref={h2Ref}>
                            <SplitWords text="Trabalhos Selecionados" />
                        </h2>
                    </div>
                    <a href="#contact" className="section-link" aria-label="Ver todos os projetos">Ver todos →</a>
                </div>

                <div className="projects-grid-v2" role="list">
                    {projects.map((proj, index) => (
                        <article 
                            key={proj.id} 
                            className="proj-card-v2 group cursor-pointer" 
                            role="listitem" 
                            tabIndex={0} 
                            aria-label={`Projeto ${proj.title}`}
                            onClick={() => openProject(proj)}
                            onKeyDown={(e) => e.key === 'Enter' && openProject(proj)}
                        >
                            <div className="proj-media-v2" aria-hidden="true">
                                <div className="proj-media-inner">
                                    {proj.image ? (
                                        <img src={proj.image} alt={proj.alt || proj.title} loading="lazy" />
                                    ) : (
                                        <div className="proj-media-placeholder">
                                            <span className="proj-media-emoji">{proj.emoji}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="proj-media-glow"></div>
                            </div>

                            <div className="proj-content-v2">
                                <span className="proj-number-v2">0{index + 1}</span>
                                <h3 className="proj-title-v2">{proj.title}</h3>
                                <p className="proj-desc-v2">{proj.desc}</p>

                                <div className="proj-footer-v2">
                                    <div className="proj-footer-left">
                                        <button 
                                            className="proj-explore-link-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openProject(proj);
                                            }}
                                        >
                                            Explorar Projeto
                                            <span className="material-symbols-outlined proj-explore-arrow">arrow_outward</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {selectedProject && (
                <ProjectModal 
                    project={selectedProject} 
                    onClose={closeProject} 
                />
            )}
        </section>
    );
}

