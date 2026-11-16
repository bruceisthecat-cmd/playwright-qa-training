// SharedWorker: one shared settings state per session, broadcast to every connected tab.
const sessions = {};
onconnect = (e) => {
  const port = e.ports[0];
  let sid = null;
  port.onmessage = (m) => {
    const d = m.data;
    if (d.type === 'join') {
      sid = d.session;
      if (!sessions[sid]) sessions[sid] = { ports: new Set(), state: { compact: false } };
      sessions[sid].ports.add(port);
      port.postMessage({ type: 'state', state: sessions[sid].state });
    } else if (d.type === 'set' && sid) {
      const s = sessions[sid];
      s.state = Object.assign({}, s.state, d.patch);
      s.ports.forEach((p) => p.postMessage({ type: 'state', state: s.state }));
    }
  };
};
