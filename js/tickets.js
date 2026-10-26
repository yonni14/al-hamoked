/* No SDK, no personal data in localStorage, and no public queue reads. */
(() => {
    let event, lang = 'he', tab = 'buyer', previousFocus, previousOverflow, busy = false, widgetId;
    const $ = id => document.getElementById(id);
    const t = key => (typeof staticTranslations !== 'undefined' ? staticTranslations : window.TICKET_TRANSLATIONS)?.[lang]?.[key] || key;
    // Defaults keep signup working if a browser still has an older cached tickets-config.js
    const DEFAULTS = { turnstileSiteKey: '0x4AAAAAAFmWxYnPW6os1n8a', signupUrl: 'https://fhwrnscmpojwjnigzjch.supabase.co/functions/v1/signup' };
    const cfg = () => ({ ...DEFAULTS, ...(window.ALHAMOKED_TICKETS_CONFIG || {}) });
    const configured = () => /^https:\/\//.test(cfg().supabaseUrl) && cfg().anonKey && !cfg().anonKey.startsWith('PASTE_');
    async function request(path, body, accessToken) {
        if (!configured()) throw new Error('unconfigured');
        const res = await fetch(cfg().supabaseUrl.replace(/\/$/, '') + path, {
            method: 'POST', headers: { apikey: cfg().anonKey, Authorization: 'Bearer ' + (accessToken || cfg().anonKey), 'Content-Type': 'application/json' }, body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error('request_failed');
        return res.status === 204 ? null : res.json();
    }
    function setLanguage(value) {
        lang = ['he', 'en', 'ar'].includes(value) ? value : 'he';
        document.querySelectorAll('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
        if ($('ticketEventTitle')) $('ticketEventTitle').textContent = event?.title || '';
    }
    function selectTab(value) {
        tab = value;
        $('ticketSellerIntro').hidden = tab !== 'seller';
        $('ticketSwitch').dataset.i18n = tab === 'buyer' ? 'wl_cant' : 'wl_back';
        $('ticketSwitch').textContent = t(tab === 'buyer' ? 'wl_cant' : 'wl_back');
        $('ticketSwitch').hidden = false;
        $('ticketMessage').textContent = '';
        $('ticketForm').hidden = false;
    }
    function open() {
        if (!event || event.registrationState !== 'waitlist') return;
        previousFocus = document.activeElement; previousOverflow = document.body.style.overflow;
        $('ticketModal').hidden = false; $('ticketModal').classList.add('active'); document.body.style.overflow = 'hidden';
        selectTab('buyer'); $('ticketName').focus();
        if (!$('ticketTurnstile')) { const box = document.createElement('div'); box.id = 'ticketTurnstile'; $('ticketForm').querySelector('[type=submit]').before(box); }
        if (widgetId === undefined && window.turnstile && cfg().turnstileSiteKey) widgetId = window.turnstile.render('#ticketTurnstile', { sitekey: cfg().turnstileSiteKey, size: 'flexible', 'error-callback': () => { $('ticketMessage').textContent = t('wl_captcha'); }, 'expired-callback': () => window.turnstile.reset(widgetId) });
    }
    function close() {
        $('ticketModal').hidden = true; $('ticketModal').classList.remove('active'); document.body.style.overflow = previousOverflow || ''; previousFocus?.focus();
    }
    function clearCTA(el) {
        if (!el) return;
        el.classList.remove('open-ticket-btn'); el.removeAttribute('aria-disabled'); el.removeAttribute('data-ticket-disabled');
        if (el.dataset.ticketOriginalText !== undefined) { el.textContent = el.dataset.ticketOriginalText; delete el.dataset.ticketOriginalText; }
    }
    function applyCTA(ev, language, els) {
        setLanguage(language);
        [els.mainBtn, els.headerBtn, els.cardRegisterBtn].forEach(el => {
            clearCTA(el); if (!el) return;
            if (!['open', 'waitlist', 'soon', 'closed'].includes(ev.registrationState)) return;
            el.dataset.ticketOriginalText = el.textContent;
            if (ev.registrationState === 'waitlist') { el.textContent = t('wl_title'); el.href = '#'; el.classList.add('open-ticket-btn'); }
            else if (ev.registrationState !== 'open') { el.textContent = t('reg_' + ev.registrationState); el.removeAttribute('href'); el.setAttribute('aria-disabled', 'true'); el.dataset.ticketDisabled = 'true'; }
        });
    }
    document.addEventListener('DOMContentLoaded', () => {
        if (!$('ticketModal')) return;
        if (!window.turnstile && !document.querySelector('script[src*="turnstile/v0/api.js"]')) { const sc = document.createElement('script'); sc.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; sc.async = true; document.head.appendChild(sc); }
        setLanguage(document.documentElement.lang);
        document.addEventListener('click', e => {
            if (e.target.closest('[data-ticket-disabled]')) { e.preventDefault(); return; }
            if (e.target.closest('.open-ticket-btn')) { e.preventDefault(); open(); }
            if (e.target.closest('[data-ticket-close]')) close();
            if (e.target.closest('[data-ticket-switch]') && !busy) selectTab(tab === 'buyer' ? 'seller' : 'buyer');
        });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('ticketModal').hidden) close(); });
        $('ticketModal').addEventListener('keydown', e => {
            if (e.key === 'Escape') close();
            if (e.key === 'Tab') {
                const all = [...$('ticketModal').querySelectorAll('button,input,a[href]')].filter(el => !el.disabled && el.offsetParent !== null && el.tabIndex !== -1);
                if (e.shiftKey && e.target === all[0]) { e.preventDefault(); all.at(-1).focus(); }
                if (!e.shiftKey && e.target === all.at(-1)) { e.preventDefault(); all[0].focus(); }
            }
        });
        $('ticketForm').addEventListener('submit', async e => {
            e.preventDefault(); if (busy) return;
            const form = e.currentTarget, fields = new FormData(form), kind = tab;
            if (!form.reportValidity() || !event) return;
            const button = form.querySelector('[type=submit]'); busy = button.disabled = true;
            $('ticketMessage').textContent = '';
            try {
                const name = fields.get('name').trim(), email = fields.get('email').trim().toLowerCase(), phone = fields.get('phone').trim();
                const cf_token = window.turnstile && widgetId !== undefined ? window.turnstile.getResponse(widgetId) : '';
                if (!configured() || !cfg().signupUrl) throw new Error('unconfigured');
                if (!cf_token) { $('ticketMessage').textContent = t('wl_captcha'); return; }
                const res = await fetch(cfg().signupUrl, {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ kind, event_id: event.id, qty: Number(fields.get('qty')), lang, name, email, phone, cf_token })
                });
                if (!res.ok) throw new Error('request_failed');
                form.reset(); form.hidden = true; $('ticketSwitch').hidden = true; $('ticketMessage').textContent = t('wl_success_' + kind);
            } catch (err) { $('ticketMessage').textContent = t(!configured() ? 'wl_unconfigured' : 'wl_error'); }
            finally { busy = button.disabled = false; if (window.turnstile && widgetId !== undefined) window.turnstile.reset(widgetId); }
        });
    });
    window.AlhamokedTickets = { configureEvent: (value, language) => { ['heroMainBtn','headerRegisterBtn','launchCardRegisterBtn'].forEach(id => clearCTA($(id))); event = value; setLanguage(language); }, setLanguage, applyCTA, clearCTA, request, configured, t };
})();
