import React, { useState, useRef, useEffect } from "react";
import Banner from "./Banner";

const TerminalWindow = () => {
  const [history, setHistory] = useState([]);
  const [language, setLanguage] = useState("pt");
  const [showCursor, setShowCursor] = useState(true);
  const terminalEndRef = useRef(null);

  const content = {
    pt: {
      about: "Sou Charles Menezes, entusiasta Linux há mais de 10 anos, com 3 anos de experiência em distribuições BSD (OpenBSD e FreeBSD). Tenho experiência em administração de redes e servidores, além de conhecimento em Docker e desenvolvimento web.",
      projects: "Meus repositórios no GitHub:",
      projectList: [
        { name: "Dmenu-Streaming", url: "https://github.com/charlesmenez/Dmenu-Streaming" },
        { name: "FindPlacesGUI", url: "https://github.com/charlesmenez/FindPlacesGUI" },
        { name: "FindPlacesCLI", url: "https://github.com/charlesmenez/FindPlacesCLI" },
        { name: "shellscript", url: "https://github.com/charlesmenez/shellscript" },
        { name: "awesome", url: "https://github.com/charlesmenez/awesome" },
        { name: "dwm", url: "https://github.com/charlesmenez/dwm" },
        { name: "dwmblocks", url: "https://github.com/charlesmenez/dwmblocks" },
        { name: "st", url: "https://github.com/charlesmenez/st" },
      ],
      skills: "Linux, BSD (OpenBSD/FreeBSD), Administração de redes e servidores, Docker, HTML, CSS, JavaScript, Shell Script, Python, C, Java, Lua, React, WordPress",
      contact: "Email: charlesmenezesss@gmail.com | Instagram: @_menezescomz | WhatsApp: +55 21 96588‑8765 | GitHub: https://github.com/charlesmenez",
      translate: "en_US",
      clear: "Limpar",
    },
    en: {
      about: "I'm Charles Menezes, a Linux enthusiast for over 10 years, with 3 years of experience in BSD distributions (OpenBSD and FreeBSD). I have experience in network and server administration, as well as knowledge in Docker and web development.",
      projects: "My GitHub repos:",
      projectList: [
        { name: "Dmenu-Streaming", url: "https://github.com/charlesmenez/Dmenu-Streaming" },
        { name: "FindPlacesGUI", url: "https://github.com/charlesmenez/FindPlacesGUI" },
        { name: "FindPlacesCLI", url: "https://github.com/charlesmenez/FindPlacesCLI" },
        { name: "shellscript", url: "https://github.com/charlesmenez/shellscript" },
        { name: "awesome", url: "https://github.com/charlesmenez/awesome" },
        { name: "dwm", url: "https://github.com/charlesmenez/dwm" },
        { name: "dwmblocks", url: "https://github.com/charlesmenez/dwmblocks" },
        { name: "st", url: "https://github.com/charlesmenez/st" },
      ],
      skills: "Linux, BSD (OpenBSD/FreeBSD), Network and server administration, Docker (knowledge), HTML, CSS, JavaScript, Shell Script, Python, C, Java, Lua, React, WordPress",
      contact: "Email: charlesmenezesss@gmail.com | Instagram: @_menezescomz | WhatsApp: +55 21 96588‑8765 | GitHub: https://github.com/charlesmenez",
      translate: "pt_BR",
      clear: "Clear",
    },
  };

  // Scroll automático
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Digitação animada
  const typeText = (text, cmd, links = []) => {
    setHistory((prev) => [...prev, { command: cmd, output: "", links }]);
    let i = 0;

    const interval = setInterval(() => {
      setHistory((prev) => {
        const newHistory = [...prev];
        const lastItem = newHistory[newHistory.length - 1];

        if (i < text.length) {
          lastItem.output += text[i];
          i++;
        } else {
          clearInterval(interval);
        }

        return newHistory;
      });
    }, 30);
  };

  const handleCommand = (cmd) => {
    if (cmd === "clear") {
      setHistory([]);
    } else if (cmd === "projects") {
      // adiciona o título e depois cada link como uma linha separada
      const title = content[language].projects;
      const links = content[language].projectList;
      typeText(title, cmd, links);
    } else {
      typeText(content[language][cmd], cmd);
    }

    setShowCursor(true);
    setTimeout(() => setShowCursor(false), 4000);
  };

  const toggleLanguage = () => setLanguage(language === "pt" ? "en" : "pt");

  return (
    <div className="window" style={{ width: "98%" }}>
      <div className="window-header">
        <div className="buttons">
          <span className="close"></span>
          <span className="minimize"></span>
          <span className="maximize"></span>
        </div>
        <span className="title">Portfólio Terminal - Charles Menezes</span>
        <div className="header-buttons">
          <button className="translate-btn" onClick={toggleLanguage}>
            {language === "pt" ? content.pt.translate : content.en.translate}
          </button>
          <button className="clear-btn" onClick={() => handleCommand("clear")}>
            {language === "pt" ? content.pt.clear : content.en.clear}
          </button>
        </div>
      </div>

      <div className="terminal-content">
        <Banner />
        <div className="history">
          {history.map((h, i) => (
            <div key={i} className="fade-in">
              <div className="command">
                &gt; {h.command} {showCursor && <span className="cursor">█</span>}
              </div>
              <div className="output">
                {/* Linha do título */}
                {h.links ? (
                  <>
                    <div>{h.output.split("\n")[0]}</div>
                    {h.links.map((link, idx) => (
                      <div key={idx}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#0f0", textDecoration: "none" }}
                        >
                          {link.name}
                        </a>
                      </div>
                    ))}
                  </>
                ) : (
                  <div>{h.output}</div>
                )}
              </div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        <div className="buttons-panel">
          <button onClick={() => handleCommand("about")}>{language === "pt" ? "Sobre" : "About"}</button>
          <button onClick={() => handleCommand("projects")}>{language === "pt" ? "Projetos" : "Projects"}</button>
          <button onClick={() => handleCommand("skills")}>{language === "pt" ? "Habilidades" : "Skills"}</button>
          <button onClick={() => handleCommand("contact")}>{language === "pt" ? "Contato" : "Contact"}</button>
        </div>
      </div>
    </div>
  );
};

export default TerminalWindow;

