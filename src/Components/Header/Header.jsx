import React, { useState, useEffect } from 'react'
import './header.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [counters, setCounters] = useState({
    projects: 0,
    years: 0,
    internships: 0
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Counter animation
    const animateCounters = () => {
      const targets = { projects: 25, years: 4, internships: 3 }
      const duration = 2000
      const steps = 60
      const stepTime = duration / steps

      Object.keys(targets).forEach(key => {
        let current = 0
        const increment = targets[key] / steps
        const timer = setInterval(() => {
          current += increment
          if (current >= targets[key]) {
            current = targets[key]
            clearInterval(timer)
          }
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }))
        }, stepTime)
      })
    }

    // Start counter animation when component mounts
    const timer = setTimeout(animateCounters, 1000)

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timer)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const openWhatsApp = () => {
    const phoneNumber = '918179000000'
    const message = encodeURIComponent('Hi! I found your portfolio and would like to connect with you.')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <>
      {/* Cursor Follower */}
      <div 
        className="cursor-follower"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      ></div>

      {/* Animated Background */}
      <div className="animated-bg">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
        <div className="bg-shape bg-shape-4"></div>
        <div className="bg-shape bg-shape-5"></div>
      </div>

      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="logo" data-aos="fade-right">
            <div className="logo-icon">
              <div className="logo-shape"></div>
              <div className="logo-pulse"></div>
            </div>
            <h1 className="logo-text">
              <span className="logo-gradient">Alex</span>
              <span className="logo-accent">Tech</span>
            </h1>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><a href="#home" className="nav-link magic-hover" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>Home</a></li>
              <li><a href="#about" className="nav-link magic-hover" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>About</a></li>
              <li><a href="#skills" className="nav-link magic-hover" onClick={(e) => { e.preventDefault(); scrollToSection('skills') }}>Skills</a></li>
              <li><a href="#projects" className="nav-link magic-hover" onClick={(e) => { e.preventDefault(); scrollToSection('projects') }}>Projects</a></li>
              <li><a href="#experience" className="nav-link magic-hover" onClick={(e) => { e.preventDefault(); scrollToSection('experience') }}>Experience</a></li>
              <li><a href="#contact" className="nav-link magic-hover" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Contact</a></li>
            </ul>
          </nav>
          
          <div 
            className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-particles">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}></div>
            ))}
          </div>
          
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <div className="hero-badge">
                  <span className="badge-pulse"></span>
                  Available for Work
                </div>
                
                <h1 className="hero-title">
                  <span className="title-line animate-slide-up">Hello, I'm</span>
                  <span className="title-line animate-slide-up gradient-text-hero">Alexander Johnson</span>
                  <span className="title-line animate-slide-up">Full Stack Developer</span>
                </h1>
                
                <p className="hero-subtitle animate-fade-in">
                  BTech Computer Science Graduate specializing in modern web technologies.
                  <br />
                  <span className="typing-text">Creating innovative solutions that make a difference</span>
                </p>
                
                <div className="hero-buttons animate-fade-in-up">
                  <button className="cta-button primary glow-button" onClick={() => scrollToSection('projects')}>
                    <span className="button-text">View My Work</span>
                    <div className="button-shine"></div>
                    <div className="button-particles">
                      <span></span><span></span><span></span>
                    </div>
                  </button>
                  <button className="cta-button secondary glass-button" onClick={openWhatsApp}>
                    <span className="button-text">Let's Connect</span>
                    <div className="button-ripple"></div>
                  </button>
                </div>
                
                <div className="hero-stats animate-counter">
                  <div className="stat floating-card">
                    <div className="stat-icon">📊</div>
                    <span className="stat-number">{counters.projects}+</span>
                    <span className="stat-label">Projects</span>
                  </div>
                  <div className="stat floating-card">
                    <div className="stat-icon">🎓</div>
                    <span className="stat-number">{counters.years}</span>
                    <span className="stat-label">Years Study</span>
                  </div>
                  <div className="stat floating-card">
                    <div className="stat-icon">💼</div>
                    <span className="stat-number">{counters.internships}</span>
                    <span className="stat-label">Internships</span>
                  </div>
                </div>
              </div>
              
              <div className="hero-image animate-float">
                <div className="image-container">
                  <div className="image-frame">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Alexander Johnson - Full Stack Developer"
                    />
                    <div className="image-glow"></div>
                  </div>
                  
                  <div className="floating-elements">
                    <div className="tech-orb orb-1">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                    </div>
                    <div className="tech-orb orb-2">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
                    </div>
                    <div className="tech-orb orb-3">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                    </div>
                    <div className="tech-orb orb-4">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="scroll-indicator bounce-animation">
            <div className="scroll-mouse">
              <div className="scroll-wheel"></div>
            </div>
            <p>Scroll to explore</p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <div className="section-bg">
            <div className="gradient-orb orb-left"></div>
            <div className="gradient-orb orb-right"></div>
          </div>
          
          <div className="container">
            <div className="section-header">
              <span className="section-tag pulse-tag">About Me</span>
              <h2 className="section-title gradient-title">Passionate Developer & Problem Solver</h2>
              <p className="section-subtitle">Transforming ideas into digital reality with cutting-edge technology</p>
            </div>
            
            <div className="about-content">
              <div className="about-text">
                <div className="text-block slide-in-left">
                  <h3 className="accent-title">🚀 My Journey</h3>
                  <p>I'm a recent BTech Computer Science graduate with a passion for creating innovative digital solutions. My journey in technology began with curiosity and has evolved into expertise across multiple domains.</p>
                </div>
                
                <div className="education-timeline slide-in-left">
                  <h3 className="accent-title">🎓 Education</h3>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4>BTech Computer Science Engineering</h4>
                      <p>Stanford University | 2020-2024 | CGPA: 3.9/4.0</p>
                      <span className="timeline-badge">Magna Cum Laude</span>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <h4>Higher Secondary (Science)</h4>
                      <p>Cambridge International School | 2018-2020 | 95%</p>
                      <span className="timeline-badge">Valedictorian</span>
                    </div>
                  </div>
                </div>

                <div className="achievements-grid slide-in-left">
                  <h3 className="accent-title">🏆 Achievements</h3>
                  <div className="achievement-cards">
                    <div className="achievement-card">
                      <div className="achievement-icon">🥇</div>
                      <h4>Google Code Jam Winner</h4>
                      <p>First place in university category</p>
                    </div>
                    <div className="achievement-card">
                      <div className="achievement-icon">🚀</div>
                      <h4>Startup Founder</h4>
                      <p>Founded TechSolutions Inc.</p>
                    </div>
                    <div className="achievement-card">
                      <div className="achievement-icon">📚</div>
                      <h4>Published Research</h4>
                      <p>3 papers in AI/ML conferences</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="about-visual slide-in-right">
                <div className="profile-card">
                  <div className="card-glow"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Alexander Johnson"
                  />
                  <div className="card-overlay">
                    <div className="card-stats">
                      <div className="stat-item">
                        <span className="stat-value">500+</span>
                        <span className="stat-label">GitHub Commits</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">50K+</span>
                        <span className="stat-label">Lines of Code</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills">
          <div className="container">
            <div className="section-header">
              <span className="section-tag pulse-tag">Technical Expertise</span>
              <h2 className="section-title gradient-title">Skills & Technologies</h2>
              <p className="section-subtitle">Mastering the tools that power modern applications</p>
            </div>
            
            <div className="skills-showcase">
              <div className="skill-category floating-card">
                <div className="category-header">
                  <div className="category-icon">💻</div>
                  <h3>Frontend Development</h3>
                </div>
                <div className="skill-items">
                  <div className="skill-orb">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                    <span className="skill-name">React</span>
                    <div className="skill-level" data-level="95"></div>
                  </div>
                  <div className="skill-orb">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" />
                    <span className="skill-name">TypeScript</span>
                    <div className="skill-level" data-level="90"></div>
                  </div>
                  <div className="skill-orb">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" />
                    <span className="skill-name">Next.js</span>
                    <div className="skill-level" data-level="88"></div>
                  </div>
                  <div className="skill-orb">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind" />
                    <span className="skill-name">Tailwind CSS</span>
                    <div className="skill-level" data-level="92"></div>
                  </div>
                </div>
              </div>

              <div className="skill-category floating-card">
                <div className="category-header">
                  <div className="category-icon">⚙️</div>
                  <h3>Backend Development</h3>
                </div>
                <div className="skill-items">
                  <div className="skill-orb">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
                    <span className="skill-name">Node.js</span>
                    <div className="skill-level" data-level="93"></div>
                  </div>
                  <div className="skill-orb">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                    <span className="skill-name">Python</span>
                    <div className="skill-level" data-level="89"></div>
                  </div>
                  <div className="skill-orb">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" />
                    <span className="skill-name">Express.js</span>
                    <div className="skill-level" data-level="91"></div>
                  </div>
                  <div className="skill-orb">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" alt="GraphQL" />
                    <span className="skill-name">GraphQL</span>
                    <div className="skill-level" data-level="85"></div>
                  </div>
                </div>
              </div>

              <div className="skill-category floating-card">
                <div className="category-header">
                  <div className="category-icon">🗄️</div>
                  <h3>Database & Cloud</h3>
                </div>
                <div className="skill-items">
                  <div className="skill-orb">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
                    <span className="skill-name">MongoDB</span>
                    <div className="skill-level" data-level="87"></div>
                  </div>
                  <div className="skill-orb">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" />
                    <span className="skill-name">PostgreSQL</span>
                    <div className="skill-level" data-level="84"></div>
                  </div>
                  <div className="skill-orb">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" alt="AWS" />
                    <span className="skill-name">AWS</span>
                    <div className="skill-level" data-level="82"></div>
                  </div>
                  <div className="skill-orb">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" />
                    <span className="skill-name">Docker</span>
                    <div className="skill-level" data-level="86"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects">
          <div className="section-bg">
            <div className="gradient-mesh"></div>
          </div>
          
          <div className="container">
            <div className="section-header">
              <span className="section-tag pulse-tag">Portfolio</span>
              <h2 className="section-title gradient-title">Featured Projects</h2>
              <p className="section-subtitle">Showcasing innovation through code</p>
            </div>
            
            <div className="projects-grid">
              <div className="project-card featured-project magnetic-hover">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80" alt="AI-Powered E-Commerce Platform" />
                  <div className="project-overlay">
                    <div className="project-actions">
                      <button className="project-btn primary" onClick={openWhatsApp}>
                        <span>Connect</span>
                        <div className="btn-glow"></div>
                      </button>
                    </div>
                  </div>
                  <div className="project-badge">Featured</div>
                </div>
                <div className="project-info">
                  <div className="project-tags">
                    <span className="tag-react">React</span>
                    <span className="tag-node">Node.js</span>
                    <span className="tag-ai">AI/ML</span>
                    <span className="tag-aws">AWS</span>
                  </div>
                  <h3 className="project-title">AI-Powered E-Commerce Platform</h3>
                  <p className="project-description">Full-stack e-commerce solution with AI-driven product recommendations, real-time analytics, and advanced payment processing. Built for scalability and performance.</p>
                  <div className="project-stats">
                    <div className="stat">
                      <span className="stat-icon">⭐</span>
                      <span>156 Stars</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">🍴</span>
                      <span>42 Forks</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">👁️</span>
                      <span>2.3k Views</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="project-card magnetic-hover">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Smart Campus Management" />
                  <div className="project-overlay">
                    <div className="project-actions">
                      <button className="project-btn primary" onClick={openWhatsApp}>Connect</button>
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-tags">
                    <span className="tag-react">React Native</span>
                    <span className="tag-firebase">Firebase</span>
                    <span className="tag-ml">Machine Learning</span>
                  </div>
                  <h3 className="project-title">Smart Campus Management</h3>
                  <p className="project-description">Comprehensive mobile app for university management with attendance tracking, grade management, and AI-powered study recommendations.</p>
                </div>
              </div>

              <div className="project-card magnetic-hover">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Blockchain Voting System" />
                  <div className="project-overlay">
                    <div className="project-actions">
                      <button className="project-btn primary" onClick={openWhatsApp}>Connect</button>
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-tags">
                    <span className="tag-blockchain">Blockchain</span>
                    <span className="tag-solidity">Solidity</span>
                    <span className="tag-web3">Web3</span>
                  </div>
                  <h3 className="project-title">Decentralized Voting System</h3>
                  <p className="project-description">Secure blockchain-based voting platform ensuring transparency and immutability in democratic processes.</p>
                </div>
              </div>

              <div className="project-card magnetic-hover">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80" alt="Real-time Collaboration Tool" />
                  <div className="project-overlay">
                    <div className="project-actions">
                      <button className="project-btn primary" onClick={openWhatsApp}>Connect</button>
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-tags">
                    <span className="tag-nextjs">Next.js</span>
                    <span className="tag-socket">Socket.io</span>
                    <span className="tag-redis">Redis</span>
                  </div>
                  <h3 className="project-title">Real-time Collaboration Tool</h3>
                  <p className="project-description">Advanced collaboration platform with real-time editing, video conferencing, and project management features.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience">
          <div className="container">
            <div className="section-header">
              <span className="section-tag pulse-tag">Experience</span>
              <h2 className="section-title gradient-title">Internships & Work Experience</h2>
              <p className="section-subtitle">Building expertise through real-world projects</p>
            </div>
            
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-date">Jun 2024 - Aug 2024</div>
                  <h3>Software Development Intern</h3>
                  <h4>Google Inc.</h4>
                  <p>Worked on machine learning algorithms for search optimization. Developed features used by millions of users daily and collaborated with senior engineers on critical infrastructure projects.</p>
                  <div className="timeline-skills">
                    <span>Python</span>
                    <span>TensorFlow</span>
                    <span>Google Cloud</span>
                    <span>Kubernetes</span>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-date">Dec 2023 - Feb 2024</div>
                  <h3>Full Stack Developer Intern</h3>
                  <h4>Microsoft Corporation</h4>
                  <p>Built responsive web applications using React and .NET Core. Implemented authentication systems and worked on Azure cloud services integration.</p>
                  <div className="timeline-skills">
                    <span>React</span>
                    <span>.NET Core</span>
                    <span>Azure</span>
                    <span>SQL Server</span>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-date">Jun 2023 - Aug 2023</div>
                  <h3>Mobile App Developer Intern</h3>
                  <h4>Meta (Facebook)</h4>
                  <p>Developed React Native applications for iOS and Android platforms. Worked on performance optimization and user experience improvements for social media features.</p>
                  <div className="timeline-skills">
                    <span>React Native</span>
                    <span>JavaScript</span>
                    <span>GraphQL</span>
                    <span>Firebase</span>
                  </div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-date">2022 - Present</div>
                  <h3>Freelance Developer</h3>
                  <h4>Self-Employed</h4>
                  <p>Completed 25+ freelance projects including e-commerce websites, mobile applications, and custom software solutions for startups and small businesses.</p>
                  <div className="timeline-skills">
                    <span>Full Stack Development</span>
                    <span>Client Management</span>
                    <span>Project Planning</span>
                    <span>UI/UX Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact">
          <div className="section-bg">
            <div className="contact-particles">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="contact-particle" style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`
                }}></div>
              ))}
            </div>
          </div>
          
          <div className="container">
            <div className="section-header">
              <span className="section-tag pulse-tag">Get In Touch</span>
              <h2 className="section-title gradient-title">Let's Build Something Amazing</h2>
              <p className="section-subtitle">Ready to bring your ideas to life? Let's connect!</p>
            </div>
            
            <div className="contact-content">
              <div className="contact-info">
                <div className="contact-card floating-card">
                  <div className="contact-icon">
                    <div className="icon-bg">📧</div>
                  </div>
                  <div className="contact-details">
                    <h4>Email Me</h4>
                    <p>alex.johnson@techmail.com</p>
                    <span className="response-time">Response within 2 hours</span>
                  </div>
                </div>

                <div className="contact-card floating-card" onClick={openWhatsApp} style={{cursor: 'pointer'}}>
                  <div className="contact-icon">
                    <div className="icon-bg">📱</div>
                  </div>
                  <div className="contact-details">
                    <h4>WhatsApp</h4>
                    <p>+91 8179000000</p>
                                    <span className="response-time">Available 24/7</span>
                  </div>
                </div>

                <div className="contact-card floating-card">
                  <div className="contact-icon">
                    <div className="icon-bg">📍</div>
                  </div>
                  <div className="contact-details">
                    <h4>Location</h4>
                    <p>San Francisco, CA</p>
                    <span className="response-time">Open to remote work</span>
                  </div>
                </div>

                <div className="social-connect">
                  <h4>Connect With Me</h4>
                  <div className="social-links">
                    <a href="#" className="social-link github">
                      <div className="social-icon">🐙</div>
                      <span>GitHub</span>
                    </a>
                    <a href="#" className="social-link linkedin">
                      <div className="social-icon">💼</div>
                      <span>LinkedIn</span>
                    </a>
                    <div className="social-link whatsapp" onClick={openWhatsApp} style={{cursor: 'pointer'}}>
                      <div className="social-icon">💬</div>
                      <span>WhatsApp</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <form className="contact-form glass-form">
                <div className="form-header">
                  <h3>Send me a message</h3>
                  <p>Let's discuss your project</p>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" required />
                    <div className="input-glow"></div>
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Your Email" required />
                    <div className="input-glow"></div>
                  </div>
                </div>
                
                <div className="form-group">
                  <select required>
                    <option value="">Project Type</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="fullstack">Full Stack Solution</option>
                    <option value="consulting">Technical Consulting</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="input-glow"></div>
                </div>
                
                <div className="form-group">
                  <textarea placeholder="Tell me about your project..." rows="6" required></textarea>
                  <div className="input-glow"></div>
                </div>
                
                <button type="submit" className="submit-btn premium-btn">
                  <span className="btn-text">Send Message</span>
                  <div className="btn-shine"></div>
                  <div className="btn-particles">
                    <span></span><span></span><span></span>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
     {/* Footer */}
<footer className="footer">
  <div className="footer-bg">
    <div className="footer-gradient"></div>
  </div>
  
  <div className="container">
    <div className="footer-content">
      <div className="footer-brand">
        <div className="footer-logo">
          <div className="logo-icon">
            <div className="logo-shape"></div>
            <div className="logo-pulse"></div>
          </div>
          <h3>
            <span className="logo-gradient">Alex</span>
            <span className="logo-accent">Tech</span>
          </h3>
        </div>
        <p>Crafting digital experiences that inspire innovation and drive success. Let's build the future together.</p>
        <div className="footer-social">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn">🐙</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn">💼</a>
          <div className="social-btn" onClick={openWhatsApp} style={{cursor: 'pointer'}}>💬</div>
          <a href="mailto:alex.johnson@techmail.com" className="social-btn">📧</a>
        </div>
      </div>
      
      <div className="footer-links">
        <div className="link-group">
          <h4>Navigation</h4>
          <ul>
            <li>
              <a 
                href="#home" 
                onClick={(e) => { e.preventDefault(); scrollToSection('home') }}
                style={{cursor: 'pointer'}}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); scrollToSection('about') }}
                style={{cursor: 'pointer'}}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                onClick={(e) => { e.preventDefault(); scrollToSection('skills') }}
                style={{cursor: 'pointer'}}
              >
                Skills
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                onClick={(e) => { e.preventDefault(); scrollToSection('projects') }}
                style={{cursor: 'pointer'}}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#experience" 
                onClick={(e) => { e.preventDefault(); scrollToSection('experience') }}
                style={{cursor: 'pointer'}}
              >
                Experience
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}
                style={{cursor: 'pointer'}}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        
        <div className="link-group">
          <h4>Technologies</h4>
          <ul>
            <li>
              <a 
                href="#skills" 
                onClick={(e) => { e.preventDefault(); scrollToSection('skills') }}
                style={{cursor: 'pointer'}}
              >
                React & Next.js
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                onClick={(e) => { e.preventDefault(); scrollToSection('skills') }}
                style={{cursor: 'pointer'}}
              >
                Node.js & Python
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                onClick={(e) => { e.preventDefault(); scrollToSection('skills') }}
                style={{cursor: 'pointer'}}
              >
                Cloud & DevOps
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                onClick={(e) => { e.preventDefault(); scrollToSection('skills') }}
                style={{cursor: 'pointer'}}
              >
                AI & Machine Learning
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                onClick={(e) => { e.preventDefault(); scrollToSection('skills') }}
                style={{cursor: 'pointer'}}
              >
                Blockchain
              </a>
            </li>
          </ul>
        </div>
        
        <div className="link-group">
          <h4>Quick Actions</h4>
          <ul>
            <li>
              <div 
                onClick={openWhatsApp} 
                style={{cursor: 'pointer', color: 'var(--text-secondary)', transition: 'color 0.3s ease'}}
                onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                WhatsApp Chat
              </div>
            </li>
            <li>
              <a 
                href="mailto:alex.johnson@techmail.com"
                style={{color: 'var(--text-secondary)'}}
              >
                Send Email
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                onClick={(e) => { e.preventDefault(); scrollToSection('projects') }}
                style={{cursor: 'pointer', color: 'var(--text-secondary)'}}
              >
                View Portfolio
              </a>
            </li>
            <li>
              <a 
                href="#experience" 
                onClick={(e) => { e.preventDefault(); scrollToSection('experience') }}
                style={{cursor: 'pointer', color: 'var(--text-secondary)'}}
              >
                See Experience
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); scrollToSection('about') }}
                style={{cursor: 'pointer', color: 'var(--text-secondary)'}}
              >
                About Me
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div className="footer-bottom">
      <div className="footer-divider"></div>
      <div className="footer-credits">
        <p>&copy; 2025 Alexander Johnson. All rights reserved.</p>
        <p>Designed & Developed with <span className="heart">❤️</span> and lots of ☕</p>
      </div>
    </div>
  </div>
</footer>

    </>
  )
}

export default Header

