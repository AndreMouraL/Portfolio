import { useEffect, useRef, useState } from 'react'
import { me, stats, skills, projects, timeline, edu, espec, pubs, quotes } from './data.js'
import { baixarCV } from './cv.js'

const NAV = [['inicio', 'Início'], ['sobre', 'Sobre'], ['skills', 'Skills'], ['projetos', 'Projetos'], ['trajetoria', 'Trajetória'], ['publicacoes', 'Publicações'], ['depoimentos', 'Depoimentos'], ['contato', 'Contato']]

const IC = {
  GitHub: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.500 1 .1-.8.4-1.300.8-1.600-2.700-.3-5.500-1.300-5.500-5.900 0-1.300.5-2.400 1.200-3.200-.1-.3-.5-1.500.1-3.200 0 0 1-.3 3.300 1.200a11.500 11.500 0 0 1 6 0C17.300 4.700 18.300 5 18.300 5c.7 1.700.2 2.900.1 3.200.8.800 1.200 1.900 1.200 3.200 0 4.600-2.800 5.600-5.500 5.900.4.400.8 1.100.8 2.200v3.300c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>,
  LinkedIn: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.400 20.500h-3.600v-5.600c0-1.300 0-3-1.900-3s-2.100 1.400-2.100 2.900v5.700H9.400V9h3.400v1.600c.5-.9 1.600-1.900 3.400-1.900 3.600 0 4.300 2.400 4.300 5.500v6.300zM5.300 7.400a2.100 2.100 0 1 1 0-4.100 2.100 2.100 0 0 1 0 4.100zM7.100 20.500H3.600V9h3.500v11.500zM22.200 0H1.800C.8 0 0 .8 0 1.700v20.600c0 .9.8 1.700 1.800 1.700h20.400c1 0 1.800-.8 1.800-1.700V1.700C24 .8 23.200 0 22.200 0z"/></svg>,
  Instagram: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.500" cy="6.500" r="1.200" fill="currentColor" stroke="none"/></svg>,
  Lattes: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4 2 9l10 5 10-5-10-5zM6 12v4c0 1.500 3 3 6 3s6-1.500 6-3v-4"/></svg>,
  'E-mail': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>,
}
function Social() {
  const items = [['GitHub', me.github], ['LinkedIn', me.linkedin], ['Instagram', me.instagram], ['Lattes', me.lattes], ['E-mail', me.email && 'mailto:' + me.email]]
  return <div className="icons">{items.map(([n, h]) => <a key={n} className={'ico' + (h ? '' : ' off')} href={h || undefined} target={h && !h.startsWith('mailto') ? '_blank' : undefined} rel="noopener" title={n} aria-label={n}>{IC[n]}</a>)}</div>
}
function Music() {
  const [open, setOpen] = useState(false)
  const q = 'Pirates of the Caribbean theme'
  const links = [['Spotify', 'https://open.spotify.com/search/' + encodeURIComponent(q)], ['YouTube Music', 'https://music.youtube.com/search?q=' + encodeURIComponent(q)], ['Deezer', 'https://www.deezer.com/search/' + encodeURIComponent(q)]]
  return <>
    {open && <div className="music-pop card"><p>Para sentir o clima da página, ouça <b>“Pirates of the Caribbean”</b> no seu app de música. Dê o play e volte aqui: a trilha combina com o visual e vai te fazer bem enquanto você navega.</p><div className="btns">{links.map(([n, h]) => <a key={n} className="btn ghost" href={h} target="_blank" rel="noopener">{n}</a>)}</div></div>}
    <button className={'music' + (open ? ' on' : '')} onClick={() => setOpen(!open)} title="Música" aria-label="Música"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 3v11.600A3.500 3.500 0 1 0 11 18V8h6V3H9z"/><path d="M17 11v4.600A3.500 3.500 0 1 0 19 19v-8h-2z" opacity=".55"/></svg></button>
  </>
}

function useTyper(words) {
  const [s, set] = useState('')
  useEffect(() => {
    let w = 0, i = 0, del = false, t
    const tick = () => {
      const full = words[w]
      i += del ? -1 : 1
      set(full.slice(0, i))
      let d = del ? 35 : 80
      if (!del && i === full.length) { del = true; d = 1400 }
      else if (del && i === 0) { del = false; w = (w + 1) % words.length; d = 300 }
      t = setTimeout(tick, d)
    }
    tick()
    return () => clearTimeout(t)
  }, [])
  return s
}

function Bg() {
  const ref = useRef()
  useEffect(() => {
    const c = ref.current, x = c.getContext('2d'), m = { x: -999, y: -999 }
    let W, H, raf, P = []
    const fit = () => { W = c.width = innerWidth; H = c.height = innerHeight; P = Array.from({ length: Math.min(90, W / 14) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 })) }
    const mv = e => { m.x = e.clientX; m.y = e.clientY }
    const loop = () => {
      x.clearRect(0, 0, W, H)
      for (const p of P) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        const dx = m.x - p.x, dy = m.y - p.y, d = Math.hypot(dx, dy)
        if (d < 160) { p.x += dx * .006; p.y += dy * .006 }
        x.fillStyle = '#ff7a1a'; x.fillRect(p.x, p.y, 2, 2)
      }
      for (let a = 0; a < P.length; a++) for (let b = a + 1; b < P.length; b++) {
        const d = Math.hypot(P[a].x - P[b].x, P[a].y - P[b].y)
        if (d < 130) { x.strokeStyle = `rgba(255,122,26,${.22 * (1 - d / 130)})`; x.beginPath(); x.moveTo(P[a].x, P[a].y); x.lineTo(P[b].x, P[b].y); x.stroke() }
      }
      raf = requestAnimationFrame(loop)
    }
    fit(); addEventListener('resize', fit); addEventListener('mousemove', mv)
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) loop()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', fit); removeEventListener('mousemove', mv) }
  }, [])
  return <canvas ref={ref} className="bg" />
}

function Section({ id, n, title, children }) {
  const r = useRef()
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && r.current.classList.add('in'), { threshold: .12 })
    o.observe(r.current); return () => o.disconnect()
  }, [])
  return (
    <section id={id} ref={r} className="sec reveal">
      <h2><span>{n}</span>{title}</h2>
      {children}
    </section>
  )
}

function Tilt({ className = '', children }) {
  const move = e => {
    const b = e.currentTarget.getBoundingClientRect(), px = (e.clientX - b.left) / b.width, py = (e.clientY - b.top) / b.height
    const s = e.currentTarget.style
    s.setProperty('--ry', `${(px - .5) * 10}deg`); s.setProperty('--rx', `${(.5 - py) * 10}deg`)
    s.setProperty('--mx', `${px * 100}%`); s.setProperty('--my', `${py * 100}%`)
  }
  const leave = e => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg') }
  return <div className={`tilt ${className}`} onMouseMove={move} onMouseLeave={leave}>{children}</div>
}

export default function App() {
  const role = useTyper(me.roles)
  const [active, setActive] = useState('inicio')
  const [prog, setProg] = useState(0)
  const [filter, setFilter] = useState('Todos')
  const [tab, setTab] = useState(Object.keys(skills)[0])
  const [q, setQ] = useState(0)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setProg(scrollY / (document.documentElement.scrollHeight - innerHeight) * 100)
      let cur = 'inicio'
      for (const [id] of NAV) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < innerHeight * .4) cur = id }
      setActive(cur)
    }
    addEventListener('scroll', onScroll); onScroll()
    return () => removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { const t = setInterval(() => setQ(v => (v + 1) % quotes.length), 6000); return () => clearInterval(t) }, [])

  const send = e => {
    e.preventDefault()
    const f = new FormData(e.target)
    location.href = `mailto:${me.email}?subject=${encodeURIComponent('Contato via portfólio: ' + f.get('nome'))}&body=${encodeURIComponent(f.get('msg') + '\n\n' + f.get('email'))}`
  }
  const kinds = ['Todos', ...new Set(projects.map(p => p.k))]
  const list = projects.filter(p => filter === 'Todos' || p.k === filter)
  const go = id => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <>
      <Bg /><div className="grid" /><div className="progress" style={{ width: prog + '%' }} />
      <header className="nav">
        <a className="logo" onClick={() => go('inicio')} aria-label="Início"><svg viewBox="0 0 100 100" height="42"><polygon fill="#b84300" points="14,22 22,10 34,12 38,24 26,32"/><polygon fill="#7a2a00" points="20,22 25,16 31,18 33,25 25,29"/><polygon fill="#ff7a1a" points="50,14 36,21 24,31 12,42 5,58 12,65 7,78 19,82 25,92 40,95 50,96"/><polygon fill="#e0600a" points="50,14 36,21 40,32 50,38"/><polygon fill="#c24f08" points="19,82 25,92 40,95 50,96 50,88 36,85 28,80"/><polygon fill="#ffa24d" points="50,48 36,57 30,71 36,84 50,89"/><polygon fill="#8f3300" points="23,41 44,50 42,53 25,46"/><polygon fill="#1a0a02" points="28,47 41,50 38,56 30,53"/><polygon fill="#ffb347" points="34,50 39,51 36,54"/><polygon fill="#5c2000" points="50,57 42,59 40,65 46,69 50,69"/><polygon fill="#ff9a3d" points="46,60 41,61 42,63"/><polygon fill="#2a0d00" points="50,72 38,75 40,81 50,83"/><polygon fill="#ffe2c2" points="50,76 42,76 41,94 50,94"/><polygon fill="#b84300" points="86,22 78,10 66,12 62,24 74,32"/><polygon fill="#7a2a00" points="80,22 75,16 69,18 67,25 75,29"/><polygon fill="#ff7a1a" points="50,14 64,21 76,31 88,42 95,58 88,65 93,78 81,82 75,92 60,95 50,96"/><polygon fill="#e0600a" points="50,14 64,21 60,32 50,38"/><polygon fill="#c24f08" points="81,82 75,92 60,95 50,96 50,88 64,85 72,80"/><polygon fill="#ffa24d" points="50,48 64,57 70,71 64,84 50,89"/><polygon fill="#8f3300" points="77,41 56,50 58,53 75,46"/><polygon fill="#1a0a02" points="72,47 59,50 62,56 70,53"/><polygon fill="#ffb347" points="66,50 61,51 64,54"/><polygon fill="#5c2000" points="50,57 58,59 60,65 54,69 50,69"/><polygon fill="#ff9a3d" points="54,60 59,61 58,63"/><polygon fill="#2a0d00" points="50,72 62,75 60,81 50,83"/><polygon fill="#ffe2c2" points="50,76 58,76 59,94 50,94"/><polygon fill="#c9885a" points="49.400,76 50.600,76 50.600,94 49.400,94"/></svg><span>AM<i>_</i></span></a>
        <button className="burger" onClick={() => setMenu(!menu)} aria-label="Menu">☰</button>
        <nav className={menu ? 'open' : ''}>
          {NAV.map(([id, l]) => <a key={id} className={active === id ? 'on' : ''} onClick={() => go(id)}>{l}</a>)}
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-txt">
            <p className="mono tag">&gt; sistema online · {me.place}</p>
            <h1>Olá, eu sou<br /><b className="glow">{me.name}</b></h1>
            <p className="role mono">{role}<span className="caret" /></p>
            <p className="lead">Transformo dados em decisões: pipelines ETL, dashboards, machine learning e IA aplicada.</p>
            <div className="btns">
              <button className="btn" onClick={() => go('projetos')}>Ver projetos</button>
              <button className="btn ghost" onClick={() => go('contato')}>Fale comigo</button>
              <button className="btn ghost" onClick={baixarCV}>Baixar CV</button>
            </div>
            <Social />
          </div>
          <div className="avatar"><div className="ring" /><div className="ring r2" /><img src="img/andre.png" alt="André Moura" /></div>
        </section>

        <Section id="sobre" n="01" title="Sobre">
          <div className="two">
            <div>{me.about.map(t => <p key={t} className="txt">{t}</p>)}<div className="chips" style={{ marginTop: 18 }}>{espec.map(e => <span key={e} className="chip">{e}</span>)}</div></div>
            <div className="stats">{stats.map(([v, l]) => <Tilt key={l} className="card stat"><b className="glow">{v}</b><span>{l}</span></Tilt>)}</div>
          </div>
        </Section>

        <Section id="skills" n="02" title="Skills">
          <div className="tabs">{Object.keys(skills).map(k => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{k}</button>)}</div>
          <div className="chips" key={tab}>{skills[tab].map((s, i) => <span key={s} className="chip" style={{ animationDelay: i * 70 + 'ms' }}>{s}</span>)}</div>
        </Section>

        <Section id="projetos" n="03" title="Projetos">
          <div className="tabs">{kinds.map(k => <button key={k} className={filter === k ? 'on' : ''} onClick={() => setFilter(k)}>{k}</button>)}</div>
          <div className="cards">
            {list.map(p => (
              <Tilt key={p.t} className="card proj">
                <span className="mono k">{p.k}{p.y && ' · ' + p.y}</span>
                <h3>{p.t}</h3><p>{p.d}</p>
                {p.link && <a href={p.link} target="_blank" className="mono more">abrir →</a>}
              </Tilt>
            ))}
          </div>
        </Section>

        <Section id="trajetoria" n="04" title="Trajetória">
          <ol className="tl">{timeline.map(([y, t, d]) => <li key={t}><span className="mono y">{y}</span><div><h3>{t}</h3><p>{d}</p></div></li>)}</ol>
          <div className="cards edu">{edu.map(([h, l]) => <div className="card" key={h}><h3>{h}</h3><ul>{l.map(i => <li key={i}>{i}</li>)}</ul></div>)}</div>
        </Section>

        <Section id="publicacoes" n="05" title="Publicações & Eventos">
          <div className="cards">{pubs.map(([k, t, s, l]) => (
            <Tilt key={t} className="card proj"><span className="mono k">{k}</span><h3>{t}</h3><p>{s}</p>{l && <a href={l} target="_blank" className="mono more">acessar →</a>}</Tilt>
          ))}</div>
        </Section>

        <Section id="depoimentos" n="06" title="Depoimentos">
          <div className="card quote" key={q}>
            <img src={'img/' + quotes[q][2]} alt="" />
            <div><p>“{quotes[q][3]}”</p><b>{quotes[q][0]}</b><span className="mono"> {quotes[q][1]}</span></div>
          </div>
          <div className="dots">{quotes.map((_, i) => <button key={i} className={i === q ? 'on' : ''} onClick={() => setQ(i)} aria-label={'Depoimento ' + (i + 1)} />)}</div>
        </Section>

        <Section id="contato" n="07" title="Contato">
          <form className="card form" onSubmit={send}>
            <input name="nome" placeholder="Seu nome" required />
            <input name="email" type="email" placeholder="Seu e-mail" required />
            <textarea name="msg" rows="4" placeholder="Mensagem" required />
            <button className="btn">Enviar mensagem</button>
          </form>
        </Section>
      </main>
      <footer className="mono"><Social />© {new Date().getFullYear()} André Moura</footer>
      <Music />
    </>
  )
}
