# Resume Source Notes

This document extracts resume-ready material that is directly supported by this portfolio repo and its content. It is intentionally limited to what can be verified here.

## Verified Skills

### Security

- Binary exploitation / pwn
- Heap exploitation
- Memory corruption analysis
- Exploit stabilization
- Leak-driven exploitation
- Out-of-bounds access analysis
- Reverse engineering
- Debugging and exploit triage
- Smart contract security
- Reentrancy analysis
- Contract logic review
- Web exploitation research
- Browser security research
- CSP and browser-behavior analysis
- Cloud and infrastructure security
- Kubernetes enumeration and secret extraction
- Forensics
- CTF problem solving
- Security research
- Technical security writing

### Software and Systems

- Kotlin
- Jetpack Compose
- Android development
- CameraX
- ML Kit face detection / tracking
- WebSocket-based streaming
- Real-time systems design
- Computer vision integration
- Accessibility-first product design
- Multimodal interface design
- State-driven architecture
- Performance and stability tuning
- Graceful degradation and recovery design
- Room
- DataStore
- MediaPipe-based gesture infrastructure

### AI / Automation

- Multi-agent system design
- Category-aware workflow orchestration
- Challenge normalization pipelines
- Capability detection and preflight analysis
- Solver generation
- Benchmark harness design
- Replay and reporting pipelines
- Memory / RAG concepts
- Live platform automation
- Validation and submission workflows
- Docker-network-aware execution design

### Web / Portfolio Engineering

- HTML
- CSS
- JavaScript
- Three.js integration
- Static site architecture
- Content architecture for technical portfolios
- Responsive UI work
- Vercel deployment
- Git-based iteration

## Verified Projects and Work

### bubbl!

- Built `bubbl!`, an accessibility-focused native Android communication app for deaf and hard-of-hearing users.
- Designed a real-time captioning interface that anchors speech bubbles near the speaker instead of using a static transcript bar.
- Combined speech streaming, face tracking, dynamic overlays, contextual cues, history, and settings into one multimodal mobile system.
- Worked across Kotlin, Jetpack Compose, CameraX, ML Kit, Deepgram streaming, Room, DataStore, custom audio analysis, Hume emotion streaming experiments, and MediaPipe-based gesture infrastructure.
- Designed for low latency, visual stability, graceful degradation, and accessibility customization.
- Framed the product as a stepping stone toward AR-glasses and wearable captioning workflows.

### Leaf Litter

- Built `Leaf Litter`, a category-aware CTF automation system.
- Designed challenge intake and normalization flows for messy challenge artifacts, raw files, and platform downloads.
- Built fast-path solving plus category-specific escalation workflows for rev, pwn, crypto, web, forensics, and misc challenges.
- Designed generated multi-agent runtimes with role-specific tools, model routing, validation hooks, cost controls, and watchdog-style recovery behavior.
- Added reporting, snapshots, replay, memory, benchmarking, and live platform-solving concepts to move the project beyond a simple prompt wrapper.
- Treated the system as an operator-oriented control plane rather than a one-shot script.

### Security Research and CTF Writing

- Wrote a long-form five-case security credibility piece plus five standalone case-study pages.
- Documented work across web exploitation, binary exploitation, heap internals, blockchain, and cloud infrastructure.
- Emphasized method, reasoning, source reading, exploit modeling, and repeatable workflows in public writeups.

### CTF / Security Accomplishments Shown Here

- Investigated a locked-down browser challenge by modeling CSP, bot constraints, one-shot secrets, CSS behavior, and oracle-style recovery paths.
- Solved a heap exploitation challenge by turning leaked text-interface output and bad indices into a repeatable exploit path.
- Solved a glibc tcache challenge by reconstructing free-list traversal and allocator state instead of guessing corruption.
- Solved a smart-contract challenge by identifying a reentrancy window and building a minimal receiver contract to drain the vault cleanly.
- Solved a Kubernetes challenge by using provided cluster credentials, enumerating secrets, and decoding control-plane data.

### Portfolio / Presentation Work

- Built and iterated on a public-facing security portfolio site with dedicated pages for profile, projects, CTF case studies, and systems writing.
- Added a profile page, employer-facing contact section, projects tab, archive structure, and a dedicated `bubbl!` engineering page.
- Restored and reorganized long-form `Leaf Litter` content inside the portfolio theme.
- Configured the site for static deployment on Vercel.
- Built a custom visual theme with animated reveals, custom cursor behavior, location/time UI, and a Three.js background layer.

## Resume-Ready Bullet Options

- Built `bubbl!`, a native Android accessibility app for deaf and hard-of-hearing users that combines streaming speech recognition, face tracking, and anchored real-time caption overlays to keep captions visually attached to the speaker.
- Engineered multimodal mobile pipelines across Kotlin, Jetpack Compose, CameraX, ML Kit, WebSocket-based speech streaming, Room, and DataStore, with a focus on low latency, visual stability, and accessibility-first UX.
- Built `Leaf Litter`, a category-aware CTF automation platform that normalizes messy challenge inputs, routes problems into specialized solve workflows, and supports reporting, replay, benchmarking, and live-platform automation.
- Designed multi-agent security automation workflows with category-specific roles, curated tool access, fast-path solving, escalation logic, validation hooks, and recovery-oriented runtime behavior.
- Authored long-form technical security writing across web exploitation, binary exploitation, blockchain, and cloud infrastructure, turning complex challenge work into clear case studies and method-driven analysis.
- Solved heap and memory-corruption challenges by modeling allocator state, interpreting leaks, and converting unstable behavior into repeatable exploit paths.
- Audited and exploited smart-contract logic flaws, including reentrancy vulnerabilities caused by external calls occurring before state updates.
- Performed cloud-security enumeration against Kubernetes environments by authenticating with provided control-plane credentials, enumerating secrets, and extracting sensitive data through standard platform mechanics.
- Investigated hardened browser-exploitation scenarios involving CSP, URL restrictions, and one-shot secrets by reducing the problem into smaller measurable browser primitives.
- Built and deployed a custom static portfolio site using HTML, CSS, JavaScript, Three.js, and Vercel to present security research, case studies, and active engineering projects.

## Condensed Skills Section Option

Binary Exploitation, Heap Exploitation, Reverse Engineering, Smart Contract Security, Web Exploitation Research, Kubernetes Security, Forensics, Security Research, Technical Writing, Kotlin, Jetpack Compose, Android, CameraX, ML Kit, WebSockets, Real-Time Systems, Accessibility Design, Computer Vision, Multi-Agent Systems, CTF Automation, HTML, CSS, JavaScript, Three.js, Vercel, Git

## Scope Note

These notes are derived from:

- `/Users/achyut/Documents/Code/leaf-portfolio/me.html`
- `/Users/achyut/Documents/Code/leaf-portfolio/projects.html`
- `/Users/achyut/Documents/Code/leaf-portfolio/bubbl.html`
- `/Users/achyut/Documents/Code/leaf-portfolio/leaf-litter.html`
- `/Users/achyut/Documents/Code/leaf-portfolio/ctf-writeups.html`
- `/Users/achyut/Documents/Code/leaf-portfolio/writeup-01.html`
- `/Users/achyut/Documents/Code/leaf-portfolio/writeup-02.html`
- `/Users/achyut/Documents/Code/leaf-portfolio/writeup-03.html`
- `/Users/achyut/Documents/Code/leaf-portfolio/writeup-04.html`
- `/Users/achyut/Documents/Code/leaf-portfolio/writeup-05.html`
- `/Users/achyut/Documents/Code/leaf-portfolio/leaf-theme.js`
- `/Users/achyut/Documents/Code/leaf-portfolio/leaf-theme.css`
- `/Users/achyut/Documents/Code/leaf-portfolio/vercel.json`
- recent git history in this repository
