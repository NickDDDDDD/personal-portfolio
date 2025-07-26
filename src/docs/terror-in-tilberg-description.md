## Overview

**Terror in Tilberg** is a digital version of a **matrix game** designed for classroom use. The project was commissioned by the **School of Social and Political Sciences** at the University of Melbourne, specifically for the _Terrorism and Insurgency_ course tutorials. Its purpose was to transform an offline strategy game into an **online multiplayer game**, enabling students to participate remotely or in-person while preserving the game’s negotiation-driven dynamics.

### What is a Matrix Game?

A **matrix game** is a structured role-playing exercise used in political science and military education. Players take on specific roles (e.g., government, insurgents, media) and propose actions supported by arguments. Outcomes are resolved through **facilitator adjudication** and dice rolls, encouraging creativity, negotiation, and critical thinking rather than fixed win conditions.

## Key Features

### Player Features

- **Real-time multiplayer gameplay** allowing students to role-play as different actors in the scenario.
- **In-game chat system** with both **public channels** and **private team-to-team channels** for negotiation and coordination.
- **Dice rolling and voting mechanics** to resolve actions and decisions during the game.
- **Automated score counting** and state updates after each round.

### Facilitator (Teacher) Features

- **Game session control**: create rooms, manage participants, and oversee game flow.
- **Adjudication tools**: review player arguments, approve actions, trigger dice rolls,and initiate and close votes.
- **Real-time oversight**: monitor all chat channels and actions to guide learning discussions.

## My Contributions

- Acted as **Product Owner**, liaising between the client (course coordinator) and the development team to translate client's needs into product requirements.
- Designed and implemented the **frontend user interface** using React and MUI, focusing on usability and responsiveness for tutorial environments.
- Collaborated on **real-time interaction logic** via WebSocket (STOMP) to support chat, dice rolls, and voting systems.

## Tech Stack

- **Frontend:** React, Material-UI, Tailwind
- **Backend:** Spring Boot with WebSocket (STOMP protocol)
