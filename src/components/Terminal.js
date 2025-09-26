// src/components/Terminal.js
import React, { useState } from "react";
import Banner from "./Banner";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const commands = {
    about: "Hi! I'm Charles Menezes, a Linux expert with over 10 years of experience and a passionate developer.",
    projects: "Check out my GitHub for projects: https://github.com/charlesmenez",
    skills: "Linux, React, JavaScript, Python, Shell scripting",
    contact: "Email: charles@example.com",
    help: "Available commands: about, projects, skills, contact, help",
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const command = input.toLowerCase();
    const output = commands[command] || `Command not found: ${command}`;
    setHistory([...history, { command, output }]);
    setInput("");
  };

  return (
    <div className="terminal">
      <Banner />
      <div className="history">
        {history.map((h, index) => (
          <div key={index}>
            <div className="command">> {h.command}</div>
            <div className="output">{h.output}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleCommand}>
        <span>&gt; </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          className="terminal-input"
        />
      </form>
    </div>
  );
};

export default Terminal;

