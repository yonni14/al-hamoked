(async () => {
    const api = window.AlhamokedTickets, params = new URLSearchParams(location.hash.slice(1)), token = params.get('token'), seller = params.get('mode') === 'seller';
    const lang = ['he','en','ar'].includes(params.get('lang')) ? params.get('lang') : 'he';
    document.documentElement.lang = lang; document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl'; api.setLanguage(lang);
    document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = api.t(el.dataset.i18n));
    const title = document.getElementById('actionTitle'), details = document.getElementById('actionDetails'), button = document.getElementById('actionButton'), message = document.getElementById('actionMessage');
    title.textContent = api.t(seller ? 'wl_sold_title' : 'wl_offer_title');
    function contact(data) {
        const box = document.getElementById('actionContact'); box.replaceChildren();
        if (!data) return;
        const name = document.createElement('p'); name.textContent = data.name; box.append(name);
        ['email','phone'].forEach(field => { if (!data[field]) return; const p = document.createElement('p'); p.textContent = api.t('wl_' + field + '_caption') + ' ' + data[field]; p.dir='auto'; box.append(p); });
    }
    let state;
    try {
        if (!token || !/^[0-9a-f-]{36}$/i.test(token)) throw new Error('invalid');
        state = await api.request('/rest/v1/rpc/alhamoked_' + (seller ? 'seller_view' : 'offer_view'), {p_token:token});
        if (!state) throw new Error('invalid');
        details.textContent = state.event_id + ' · ' + (state.matched_qty || state.qty) + ' ' + api.t('wl_tickets');
        if (seller) { contact(state.buyer); button.hidden = !state.match_id; button.textContent = api.t('wl_sold'); }
        else { contact(state.seller); button.hidden = state.status !== 'offered'; button.textContent = api.t('wl_confirm'); message.textContent = api.t(state.status === 'confirmed' ? 'wl_confirmed' : 'wl_offer_note') + (state.status === 'offered' ? ' ' + new Date(state.expires_at).toLocaleString(lang) : ''); }
        button.addEventListener('click', async () => {
            button.disabled = true;
            try {
                const result = await api.request('/rest/v1/rpc/alhamoked_' + (seller ? 'sold' : 'confirm'), seller ? {p_token:token,p_match:state.match_id} : {p_token:token});
                if (!seller) contact(result.seller);
                button.hidden = true; message.textContent = api.t(seller ? 'wl_sold_success' : 'wl_confirmed');
            } catch { message.textContent = api.t('wl_invalid'); button.disabled = false; }
        });
    } catch { message.textContent = api.t(api.configured() ? 'wl_invalid' : 'wl_unconfigured'); }
})();
