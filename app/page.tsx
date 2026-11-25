"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Aperture, Check, Clapperboard, UsersRound,
  Menu, Scissors, X, Layers3, Mail, MapPin, Instagram, Phone,
  Youtube, Linkedin
} from "lucide-react";

const projects = [
  {
    number: "01", title: "AI Film 01", category: "AI video", services: "Generative AI · Visual storytelling",
    video: "/videoav.mp4", previewAt: 4
  },
  {
    number: "02", title: "AI Film 02", category: "AI video", services: "Generative AI · Visual storytelling",
    video: "/videoav1.mp4", previewAt: 9
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const wordReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

function VideoPreview({ src, previewAt, title }: { src: string; previewAt: number; title: string }) {
  const [poster, setPoster] = useState<string>();

  useEffect(() => {
    let active = true;
    const frameVideo = document.createElement("video");
    frameVideo.preload = "auto";
    frameVideo.muted = true;
    frameVideo.playsInline = true;

    const cleanup = () => {
      frameVideo.removeEventListener("loadedmetadata", seekToPreview);
      frameVideo.removeEventListener("seeked", captureFrame);
      frameVideo.removeEventListener("error", cleanup);
      frameVideo.removeAttribute("src");
      frameVideo.load();
    };

    const captureFrame = () => {
      if (!frameVideo.videoWidth || !frameVideo.videoHeight) {
        cleanup();
        return;
      }

      const maxWidth = 540;
      const scale = Math.min(1, maxWidth / frameVideo.videoWidth);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(frameVideo.videoWidth * scale);
      canvas.height = Math.round(frameVideo.videoHeight * scale);
      const context = canvas.getContext("2d");

      if (context) {
        try {
          context.drawImage(frameVideo, 0, 0, canvas.width, canvas.height);
          const frame = canvas.toDataURL("image/jpeg", 0.86);
          if (active) setPoster(frame);
        } catch {
          // Keep the normal video controls usable if frame capture is unavailable.
        }
      }
      cleanup();
    };

    const seekToPreview = () => {
      const duration = frameVideo.duration;
      const target = Number.isFinite(duration) && duration > 0
        ? Math.min(previewAt, Math.max(0, duration - 0.05))
        : previewAt;
      frameVideo.currentTime = target;
    };

    frameVideo.addEventListener("loadedmetadata", seekToPreview);
    frameVideo.addEventListener("seeked", captureFrame);
    frameVideo.addEventListener("error", cleanup);
    frameVideo.src = src;
    frameVideo.load();

    return () => {
      active = false;
      cleanup();
    };
  }, [src, previewAt]);

  return (
    <video controls playsInline preload="metadata" poster={poster} src={src} aria-label={title}>
      Your browser does not support video playback.
    </video>
  );
}

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const reduceMotion = useReducedMotion();

  function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormSent(true);
  }

  return (
    <main>
      <header className="nav-shell">
        <a href="#home" className="brand" aria-label="Pramod Rajpurohit home">
          <span className="brand-name">PRAMOD</span><span className="brand-rule" />
          <span className="brand-sub">AI FILMMAKER<br />&amp; CREATIVE PRODUCTION</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">Work</a><a href="#about">About</a><a href="#services">Services</a><a href="#contact">Contact</a>
        </nav>
        <a className="nav-cta" href="#contact">Let&apos;s talk <ArrowUpRight size={13} /></a>
        <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label={mobileMenu ? "Close menu" : "Open menu"}>{mobileMenu ? <X /> : <Menu />}</button>
      </header>
      <AnimatePresence>
        {mobileMenu && <motion.nav className="mobile-nav" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}>
          {["Work","About","Services","Contact"].map((label)=><a key={label} href={"#"+label.toLowerCase()} onClick={()=>setMobileMenu(false)}>{label}<ArrowUpRight size={15}/></a>)}
        </motion.nav>}
      </AnimatePresence>

      <section className="hero dark portfolio-hero" id="home">
        <div className="portfolio-hero-top">
        </div>
        <motion.div
          className="portfolio-wordmark"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >PRAMOD</motion.div>
        <motion.div
          className="portfolio-hero-copy"
          initial={reduceMotion ? false : { opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <motion.p
            className="eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >GENERATIVE AI FILMMAKER</motion.p>
          <h1>
            <motion.span className="hero-word" variants={wordReveal} initial={reduceMotion ? false : "hidden"} animate="visible" transition={{ delay: 0.2 }}>Stories</motion.span>{" "}
            <motion.span className="hero-word" variants={wordReveal} initial={reduceMotion ? false : "hidden"} animate="visible" transition={{ delay: 0.34 }}>shaped</motion.span><br />
            <motion.span className="hero-word" variants={wordReveal} initial={reduceMotion ? false : "hidden"} animate="visible" transition={{ delay: 0.48 }}>through</motion.span>{" "}
            <em><motion.span className="hero-word" variants={wordReveal} initial={reduceMotion ? false : "hidden"} animate="visible" transition={{ delay: 0.62 }}>motion.</motion.span></em>
          </h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.82 }}
          >I create AI-powered films, commercial ads, UGC content, and AI agent experiences for brands and creators.</motion.p>
          <motion.a
            className="btn btn-paper"
            href="#work"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.05 }}
          >Explore selected work <ArrowRight size={14}/></motion.a>
        </motion.div>
        <div className="portfolio-portrait">
          <img
            src="/images/pramod-headshot.png"
            alt="Portrait of Pramod Rajpurohit"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
        </div>
        <motion.div
          className="portfolio-hero-side"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >AI FILMMAKING / COMMERCIALS / UGC</motion.div>
        <motion.div
          className="portfolio-hero-bottom"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        ><span>BASED IN MUMBAI, INDIA · AVAILABLE WORLDWIDE</span><a href="#work">SCROLL TO EXPLORE <ArrowDownRight size={13}/></a></motion.div>
      </section>

      <section className="work-section section-pad" id="work">
        <div className="wrap">
          <div className="work-layout">
            <motion.div className="section-intro" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true,amount:.2}}>
              <p className="eyebrow muted">A selection of recent work</p>
              <h2 className="section-title serif">Stories I&apos;ve<br />helped bring<br />to life<span className="period">.</span></h2>
              <span className="short-rule" />
              <p className="body-copy">A few selected projects for brands, artists, and people with a story to tell.</p>
              <a href="#contact" className="text-link">Have something in mind? <ArrowRight size={14}/></a>
            </motion.div>
            <div className="project-grid video-project-grid">
              {projects.map((project) => (
                <article className="project-card video-project-card" key={project.number}>
                  <span className="project-image-wrap video-project-player">
                    <VideoPreview src={project.video} previewAt={project.previewAt} title={project.title} />
                  </span>
                  <span className="project-meta"><span className="project-name">{project.title}</span><span className="project-number">{project.number}</span></span>
                  <span className="project-type">{project.category} <span>·</span> {project.services}</span>
                </article>
              ))}
            </div>
            <div className="more-work-links">
              <p className="eyebrow muted">More work · Google Drive</p>
              <a href="https://drive.google.com/drive/folders/1FhMHQ9o2X-rF_xX-snW7dnosL8DdSkoi" target="_blank" rel="noreferrer">Additional work 01 <ArrowUpRight size={14}/></a>
              <a href="https://drive.google.com/drive/folders/1nst6TjwDmUlAzXijmCoykf4rq8k3WtWv" target="_blank" rel="noreferrer">Additional work 02 <ArrowUpRight size={14}/></a>
              <a href="https://drive.google.com/drive/folders/1rwTMpDWSTgnWToox-sgUorVteweaFt-E" target="_blank" rel="noreferrer">Additional work 03 <ArrowUpRight size={14}/></a>
              <a href="https://drive.google.com/drive/folders/1ciDIhZFQc5V5TBkzcRv-9DzSm99_iPaN" target="_blank" rel="noreferrer">Additional work 04 <ArrowUpRight size={14}/></a>
              <a href="https://drive.google.com/drive/folders/1VQH6IfBTGMBaymnKoNJtXDAoBCBKTMQS" target="_blank" rel="noreferrer">Additional work 05 <ArrowUpRight size={14}/></a>
            </div>
          </div>
          <div className="work-footer"><span className="eyebrow muted">Selected projects / 2022—2026</span><a className="text-link" href="#contact">Discuss a project <ArrowUpRight size={14}/></a></div>
        </div>
      </section>

      <section className="showreel dark" id="showreel">
        <div className="showreel-image" role="img" aria-label="Atmospheric cinematic close-up" />
        <div className="showreel-overlay"/>
        <div className="wrap showreel-content">
          <p className="eyebrow bronze">The showreel · 2026</p>
          <h2 className="serif showreel-title">A thousand decisions.<br /><em>One seamless story.</em></h2>
          <p className="showreel-copy">A short journey through frames, moods, and moments.<br className="desktop-only"/> A little of everything I love to make.</p>
          <a className="reel-play" href="#work"><span className="round-play"><ArrowDownRight size={15}/></span><span className="eyebrow">View selected work</span><span className="reel-duration">02 VIDEOS</span></a>
        </div>
        <span className="reel-side-label">EDIT / COLOR / FEEL</span>
      </section>

      <section className="about-section" id="about">
        <div className="about-image"><img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1500&q=85" alt="Film editing suite with multiple screens" loading="lazy"/><span className="image-stamp"><Aperture size={18}/> FRAME NOTES / 01</span></div>
        <div className="about-copy">
          <p className="eyebrow muted">A little about me</p>
          <h2 className="section-title serif">Not just cutting clips.<br /><em>Finding the story.</em></h2>
          <p className="body-copy">I&apos;m Pramod Rajpurohit, a Generative AI creator focused on image and video production. For 2+ years, I&apos;ve been exploring how generative tools can turn creative ideas into cinematic visuals, branded films, and social-first content.</p>
          <p className="body-copy">My work spans AI filmmaking, commercial advertising, UGC-style content, visual storytelling, and creative production. I&apos;m based in Mumbai and open to working with teams and clients worldwide.</p>
          <a className="text-link" href="#contact">Let&apos;s get to know each other <ArrowRight size={14}/></a>
          <div className="about-stats"><div><strong>2<span>+</span></strong><small>Years in GenAI</small></div><div><strong>AI</strong><small>Image &amp; video</small></div><div><strong>Mumbai</strong><small>India</small></div></div>
          <div className="profile-details" style={{marginTop:"1.5rem"}}>
            <p className="eyebrow muted">Creative toolkit</p>
            <p className="body-copy"><strong>AI image &amp; video:</strong> Seedance 2.5, Midjourney, Higgsfield, Kling, and Runway.</p>
            <p className="body-copy"><strong>Core skills:</strong> Generative AI content creation, AI video production, image generation, visual concept development, and commercial creative content.</p>
            <p className="eyebrow muted" style={{marginTop:"1.5rem"}}>Experience &amp; education</p>
            <p className="body-copy"><strong>2+ years:</strong> Generative AI image and video creation.</p>
            <p className="body-copy"><strong>AIKONS:</strong> Listed in professional experience on LinkedIn.</p>
            <p className="body-copy"><strong>Education:</strong> Pillai College of Arts, Commerce and Science (2022–2025).</p>
          </div>
        </div>
      </section>

      <section className="services-section section-pad dark" id="services">
        <div className="wrap">
          <div className="services-heading">
            <div><p className="eyebrow bronze">What I can help with</p><h2 className="section-title serif">From raw footage<br />to <em>something you feel.</em></h2></div>
            <div className="services-aside"><p>Generative AI image and video creation for brands, creators, and digital campaigns.</p><a className="text-link light-link" href="#contact">Discuss your project <ArrowUpRight size={14}/></a></div>
          </div>
          <div className="service-grid">
            <article className="service-item"><Scissors size={21}/><span className="service-index">01</span><h3>AI filmmaking</h3><p>AI-generated films and cinematic video concepts built around strong visual storytelling.</p></article>
            <article className="service-item"><UsersRound size={21}/><span className="service-index">02</span><h3>AI commercial ads</h3><p>Scroll-stopping AI-powered advertisements and product visuals for brands.</p></article>
            <article className="service-item"><Layers3 size={21}/><span className="service-index">03</span><h3>UGC content</h3><p>AI-assisted creator-style content designed for social platforms and digital campaigns.</p></article>
            <article className="service-item"><Clapperboard size={21}/><span className="service-index">04</span><h3>Creative production</h3><p>Visual concept development and creative execution for digital-first campaigns.</p></article>
          </div>
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="wrap contact-layout">
          <div className="contact-intro">
            <p className="eyebrow muted">Have a project in mind?</p>
            <h2 className="section-title serif">Let&apos;s make something<br /><em>worth watching.</em></h2>
            <p className="body-copy">Tell me a little about what you&apos;re creating. I&apos;d love to hear the idea and how I can help bring it to the screen.</p>
            <a className="contact-detail" href="https://mail.google.com/mail/?view=cm&fs=1&to=pramod.s.works%40gmail.com" target="_blank" rel="noopener noreferrer"><Mail size={15}/> pramod.s.works@gmail.com <ArrowUpRight size={13}/></a>
            <a className="contact-detail" href="tel:+918591071150"><Phone size={15}/> +91 85910 71150 <ArrowUpRight size={13}/></a>
            <div className="contact-detail"><MapPin size={15}/> Mumbai, Maharashtra, India · Available worldwide</div>
            <div className="social-links contact-socials">
              <a href="https://www.linkedin.com/in/professionalpramod/" target="_blank" rel="noreferrer" aria-label="LinkedIn Pramod Rajpurohit"><Linkedin size={16}/><span>LinkedIn</span><ArrowUpRight size={12}/></a>
              <a href="https://www.instagram.com/meinpramod/" target="_blank" rel="noreferrer" aria-label="Instagram @meinpramod"><Instagram size={16}/><span>@meinpramod</span><ArrowUpRight size={12}/></a>
            </div>
          </div>
          <aside className="contact-visual" aria-label="Contact invitation">
            <span className="contact-visual-index">PRAMOD RAJPUROHIT <span>·</span> GENERATIVE AI FILMMAKER</span>
            <div className="contact-orbit" aria-hidden="true"><span /><span /><span /></div>
            <p className="contact-visual-kicker">GOOD STORIES START<br />WITH A CONVERSATION.</p>
            <a className="contact-visual-link" href="https://wa.me/918591071150" target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight size={18}/></a>
            <span className="contact-visual-foot">AVAILABLE WORLDWIDE · 2026</span>
          </aside>
        </div>
      </section>

      <footer className="site-footer">
        <a href="#home" className="brand footer-brand"><span className="brand-name">PRAMOD</span><span className="brand-rule"/><span className="brand-sub">AI FILMMAKING<br/>&amp; CREATIVE PRODUCTION</span></a>
        <nav className="footer-nav"><a href="#work">Work</a><a href="#about">About</a><a href="#services">Services</a><a href="#contact">Contact</a></nav>
        <span className="copyright">© {new Date().getFullYear()} PRAMOD RAJPUROHIT. ALL RIGHTS RESERVED.</span>
      </footer>

    </main>
  );
}
