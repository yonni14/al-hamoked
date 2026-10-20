/* Event-management tab for admin.html: door check-in + waitlist by real arrival.
   Self-contained module; receives the admin session from tickets-admin.js via onSession. */
(() => {
    const $ = id => document.getElementById(id), api = window.AlhamokedTickets;
    let session = null, eventId = null, checkins = [], queue = [], capacity = null, initialized = false;
    const rpc = (name, body = {}) => api.request('/rest/v1/rpc/alhamoked_' + name, body, session.access_token);
    const text = (tag, value) => { const el = document.createElement(tag); el.textContent = value; return el; };
    const fmtTime = iso => new Date(iso).toLocaleTimeString('he', { hour: '2-digit', minute: '2-digit' });
    const qtyPhrase = q => Number(q) === 1 ? 'כרטיס אחד' : q + ' כרטיסים';

    async function findEvent() {
        try {
            const events = await (await fetch('data/events_he.json')).json();
            const ev = events.find(e => e.status === 'next');
            return ev ? ev.id : null;
        } catch { return null; }
    }

    function render() {
        $('evArrived').textContent = checkins.length;
        $('evFromQueue').textContent = checkins.filter(c => c.source === 'waitlist').length;
        $('evFreeWrap').hidden = capacity == null;
        if (capacity != null) $('evFree').textContent = Math.max(0, capacity - checkins.length);
        if (document.activeElement !== $('evCapacity')) $('evCapacity').value = capacity == null ? '' : capacity;

        const q = ($('evSearch').value || '').trim();
        const box = $('evArrivals'); box.replaceChildren();
        let shown = 0;
        for (const c of checkins) {
            if (q && !c.name.includes(q)) continue;
            shown++;
            const card = text('div', ''); card.className = 'tickets-card ev-arrival';
            card.append(text('p', c.name + ' · ' + fmtTime(c.created_at) + ' · ' + (c.source === 'waitlist' ? 'מהתור' : 'דלת')));
            const x = text('button', '✕'); x.className = 'btn ev-remove'; x.setAttribute('aria-label', 'הסרת רשומה');
            x.onclick = async () => {
                if (!confirm('להסיר את הרשומה של ' + c.name + '?')) return;
                x.disabled = true;
                try { await rpc('checkin_remove', { p_id: c.id }); await load(); }
                catch { $('adminMessage').textContent = 'ההסרה נכשלה. נסו שוב.'; x.disabled = false; }
            };
            card.append(x); box.append(card);
        }
        if (!shown) box.append(text('p', q ? 'אין תוצאות לחיפוש.' : 'עוד לא נרשמו הגעות.'));

        const arrivedIds = new Set(checkins.filter(c => c.waitlist_id).map(c => c.waitlist_id));
        const arrivedQ = queue.filter(w => arrivedIds.has(w.id))
            .map(w => ({ w, at: checkins.find(c => c.waitlist_id === w.id).created_at }))
            .sort((a, b) => new Date(a.at) - new Date(b.at));
        const waitingQ = queue.filter(w => !arrivedIds.has(w.id));
        const qbox = $('evQueue'); qbox.replaceChildren();
        if (arrivedQ.length) qbox.append(text('h3', 'הגיעו - לפי סדר ההגעה'));
        let an = 0;
        for (const { w, at } of arrivedQ) {
            an++;
            const card = text('div', ''); card.className = 'tickets-card ev-arrived-q';
            card.append(text('p', an + '. ' + w.name + ' · ' + qtyPhrase(w.qty) + ' · הגיע/ה ' + fmtTime(at)));
            qbox.append(card);
        }
        if (arrivedQ.length && waitingQ.length) qbox.append(text('h3', 'עדיין לא הגיעו'));
        let qn = 0;
        for (const w of waitingQ) {
            qn++;
            const card = text('div', ''); card.className = 'tickets-card';
            card.append(text('p', qn + '. ' + w.name + ' · ' + qtyPhrase(w.qty) + ' · נרשם/ה ' + new Date(w.created_at).toLocaleString('he', { dateStyle: 'short', timeStyle: 'short' })));
            const b = text('button', 'הגיע'); b.className = 'btn ev-arrived-btn';
            b.onclick = async () => {
                b.disabled = true;
                try { await rpc('checkin_add', { p_event: eventId, p_name: w.name, p_source: 'waitlist', p_waitlist: w.id }); await load(); }
                catch { $('adminMessage').textContent = 'רישום ההגעה נכשל. נסו שוב.'; b.disabled = false; }
            };
            card.append(b); qbox.append(card);
        }
        if (!queue.length) qbox.append(text('p', 'תור ההמתנה ריק.'));
    }

    async function load() {
        const [snap, ev] = await Promise.all([rpc('admin_snapshot'), rpc('event_snapshot', { p_event: eventId })]);
        queue = (snap.waitlist || []).filter(w => w.status === 'waiting');
        checkins = ev.checkins || [];
        capacity = ev.capacity;
        render();
    }

    function showTab(which) {
        $('tabTickets').hidden = which !== 'tickets';
        $('tabEvent').hidden = which !== 'event';
        $('tabBtnTickets').classList.toggle('active', which === 'tickets');
        $('tabBtnEvent').classList.toggle('active', which === 'event');
        if (which === 'event' && eventId) load().catch(() => { $('adminMessage').textContent = 'הטעינה נכשלה. רעננו.'; });
    }

    async function init() {
        $('tabBtnTickets').onclick = () => showTab('tickets');
        $('tabBtnEvent').onclick = () => showTab('event');
        eventId = await findEvent();
        if (!eventId) {
            $('tabEvent').replaceChildren(text('p', 'לא נמצא אירוע קרוב (status: next).'));
            return;
        }
        $('evDoorForm').addEventListener('submit', async e => {
            e.preventDefault();
            const name = $('evDoorName').value.trim(); if (!name) return;
            const b = e.target.querySelector('button'); b.disabled = true;
            try { await rpc('checkin_add', { p_event: eventId, p_name: name, p_source: 'door' }); $('evDoorName').value = ''; await load(); }
            catch { $('adminMessage').textContent = 'רישום ההגעה נכשל. נסו שוב.'; }
            finally { b.disabled = false; $('evDoorName').focus(); }
        });
        $('evSearch').addEventListener('input', render);
        let capTimer;
        $('evCapacity').addEventListener('input', () => {
            clearTimeout(capTimer);
            capTimer = setTimeout(async () => {
                const raw = $('evCapacity').value.trim();
                const val = raw === '' ? null : Math.max(0, parseInt(raw, 10) || 0);
                try { await rpc('capacity_set', { p_event: eventId, p_capacity: val }); capacity = val; render(); }
                catch { $('adminMessage').textContent = 'שמירת הקיבולת נכשלה.'; }
            }, 600);
        });
        load().catch(() => { $('adminMessage').textContent = 'טעינת ניהול האירוע נכשלה. רעננו.'; });
    }

    window.AlhamokedEvent = {
        async onSession(s) {
            session = s;
            if (s && !initialized) { initialized = true; try { await init(); } catch (e) { /* tab stays on tickets */ } }
        }
    };
})();
