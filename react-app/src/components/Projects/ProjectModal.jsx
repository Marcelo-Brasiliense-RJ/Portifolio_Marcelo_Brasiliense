import React, { useEffect } from 'react';
import { gsap } from 'gsap';

export default function ProjectModal({ project, onClose }) {
    useEffect(() => {
        // Prevent scrolling on body
        document.body.style.overflow = 'hidden';

        // Animate modal in
        const tl = gsap.timeline();
        tl.fromTo('.modal-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.3 })
          .fromTo('.modal-container', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.1');

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleClose = () => {
        const tl = gsap.timeline({
            onComplete: onClose
        });
        tl.to('.modal-container', { y: 30, opacity: 0, duration: 0.3, ease: 'power3.in' })
          .to('.modal-backdrop', { opacity: 0, duration: 0.2 }, '-=0.1');
    };

    if (!project) return null;

    return (
        <div className="modal-backdrop" onClick={handleClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={handleClose} aria-label="Fechar modal">
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className="modal-content">
                    <div className="modal-left">
                        {project.image ? (
                            <img src={project.image} alt={project.title} className="modal-main-img" />
                        ) : (
                            <div className="modal-placeholder">
                                <span className="modal-emoji">{project.emoji}</span>
                            </div>
                        )}
                        
                        {project.gallery && project.gallery.length > 0 && (
                            <div className="modal-gallery">
                                {project.gallery.map((img, index) => (
                                    <img 
                                        key={index} 
                                        src={img} 
                                        alt={`${project.title} screenshot ${index + 1}`} 
                                        className="modal-gallery-img"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="modal-right">
                        <div className="modal-scroll-area">
                            <h2 className="modal-title">{project.fullTitle || project.title}</h2>
                            
                            <div className="modal-date">
                                <span>{project.date || project.year}</span>
                            </div>

                            <div className="modal-section">
                                <p className="modal-desc">{project.detailedDesc || project.desc}</p>
                            </div>

                            {project.deliverables && (
                                <div className="modal-section">
                                    <h4 className="modal-subtitle">Principais Entregas:</h4>
                                    <ul className="modal-list">
                                        {project.deliverables.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {project.outcomes && (
                                <div className="modal-section">
                                    <h4 className="modal-subtitle">Resultados & Impacto:</h4>
                                    {Array.isArray(project.outcomes) ? (
                                        <ul className="modal-list outcomes">
                                            {project.outcomes.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="modal-desc">{project.outcomes}</p>
                                    )}
                                </div>
                            )}

                            <div className="modal-section">
                                <h4 className="modal-subtitle">Ferramentas Utilizadas:</h4>
                                <div className="modal-tags">
                                    {(project.tools || project.tags).map((tool, i) => (
                                        <span key={i} className="modal-tag">{tool}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <span className="modal-footer-date">Trabalhado em {project.date || project.year}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
