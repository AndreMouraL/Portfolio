import { me, skills, projects, timeline, edu, espec, pubs } from './data.js'
const L = s => String(s).replace(/[–—]/g, '-').replace(/[“”]/g, '"').replace(/’/g, "'")
export async function montarCV() {
  const { jsPDF } = await import('jspdf')
  const d = new jsPDF({ unit: 'mm', format: 'a4' }), W = 210, M = 16, MW = W - 2 * M
  let y = 0
  const need = h => { if (y + h > 284) { d.addPage(); y = 18 } }
  const T = (t, { b = false, s = 9.5, c = [40, 40, 40], x = M } = {}) => {
    d.setFont('helvetica', b ? 'bold' : 'normal'); d.setFontSize(s); d.setTextColor(...c)
    for (const ln of d.splitTextToSize(L(t), MW - (x - M))) { need(5); d.text(ln, x, y); y += s * 0.5 }
  }
  const H = t => { y += 4; need(14); T(t.toUpperCase(), { b: true, s: 11, c: [230, 98, 0] }); d.setDrawColor(255, 122, 26); d.line(M, y - 3, W - M, y - 3); y += 1 }
  d.setFillColor(7, 7, 10); d.rect(0, 0, W, 40, 'F'); d.setFillColor(255, 122, 26); d.rect(0, 40, W, 1.2, 'F')
  y = 17; T(me.name.toUpperCase(), { b: true, s: 22, c: [255, 122, 26] })
  T(me.roles.slice(0, 2).join('  |  '), { s: 10, c: [232, 228, 223] })
  T(`${me.email}  |  ${me.github.replace('https://', '')}  |  ${me.place}`, { s: 8.5, c: [200, 196, 190] })
  y = 50
  H('Perfil'); me.about.forEach(t => { T(t); y += 1.5 })
  H('Especialização'); espec.forEach(e => T('- ' + e))
  H('Experiência'); timeline.forEach(([a, t, ds]) => { need(12); T(`${t}  (${a})`, { b: true }); T(ds, { x: M + 3 }); y += 1.5 })
  H('Formação e certificações'); edu.forEach(([h, l]) => { T(h, { b: true }); l.forEach(i => T('- ' + i, { x: M + 3 })); y += 1.5 })
  H('Habilidades'); Object.entries(skills).forEach(([k, v]) => { T(k, { b: true }); T(v.join(', '), { x: M + 3 }); y += 1.5 })
  H('Projetos'); projects.forEach(p => { need(12); T(`${p.t}  (${p.k}${p.y ? ', ' + p.y : ''})`, { b: true }); T(p.d, { x: M + 3 }); y += 1.5 })
  H('Publicações e eventos'); pubs.forEach(([k, t, s]) => { T(`${k}: ${t}${s ? ' (' + s + ')' : ''}`); y += 1 })
  return d
}
export const baixarCV = async () => (await montarCV()).save('Curriculo-Andre-Moura.pdf')
