(() => {
    let session, state;
    const $ = id => document.getElementById(id), api = window.AlhamokedTickets;
    const rpc = (name, body = {}) => api.request('/rest/v1/rpc/alhamoked_' + name, body, session.access_token);
    const text = (tag, value) => { const el = document.createElement(tag); el.textContent = value; return el; };
    const tokenLink = (token, lang, mode) => { const url = new URL('ticket.html', location.href); url.hash = new URLSearchParams({token,lang,mode}).toString(); return url.href; };
    const langs = ['he', 'en', 'ar'];
    const normLang = lang => langs.includes(lang) ? lang : 'he';
    // Drafts show the event's public title/date/location from the language-matched events JSON,
    // not the raw event_id stored in the database. Cached per language.
    const eventsCache = {};
    async function eventInfo(id, lang) {
        lang = normLang(lang);
        if (!eventsCache[lang]) {
            try { eventsCache[lang] = await (await fetch('data/events_' + lang + '.json')).json(); } catch { eventsCache[lang] = []; }
        }
        const ev = (eventsCache[lang] || []).find(e => e.id === id);
        return ev ? `"${ev.title}" (${ev.date}, ${ev.locationName})` : `"${id}"`;
    }
    function qtyPhrase(qty, lang) {
        const n = Number(qty);
        if (lang === 'he') return n === 1 ? 'כרטיס אחד' : n === 2 ? 'שני כרטיסים' : `${n} כרטיסים`;
        if (lang === 'en') return n === 1 ? 'One ticket' : `${n} tickets`;
        return n === 1 ? 'تذكرة واحدة' : n === 2 ? 'تذكرتين' : `${n} تذاكر`;
    }
    const copy = {
        he: {
            offer: 'הצעת כרטיס - על המוקד',
            buyer: d => `שלום ${d.name},

התפנו עבורך ${d.qty} במחיר המקורי לעימות ${d.event} של על המוקד.

לאישור ההצעה בתוך 24 שעות (הקישור בתוקף עד ${d.expiry}):
${d.link}

לאחר האישור המוכר יקבל את פרטי הקשר שלך ויצור איתך קשר. הרכישה מתבצעת בין הצדדים; המוכר שולח לקונה את הכרטיס (ברקוד), והוא נסרק בכניסה. אין תשלום באתר.

יונתן, על המוקד
alhamoked.co.il`,
            seller: d => `שלום ${d.name},

הקונה אישר את ההצעה לעימות ${d.event} של על המוקד (${d.qty}).

פרטי הקונה:
שם: ${d.buyerName}
אימייל: ${d.buyerEmail}${d.buyerPhone ? `
טלפון: ${d.buyerPhone}` : ''}

השלימו את הרכישה ביניכם ושלחו לקונה את הכרטיס (ברקוד). לאחר מסירת הכרטיס, אשרו את המכירה כאן:
${d.link}

אין תשלום באתר.

יונתן, על המוקד
alhamoked.co.il`
        },
        en: {
            offer: 'Ticket offer - Alhamoked',
            buyer: d => `Hi ${d.name},

${d.qty} opened up for you at the original price for the Al-Hamoked debate ${d.event}.

To confirm the offer within 24 hours (the link is valid until ${d.expiry}):
${d.link}

After you confirm, the seller will receive your contact details and get in touch. The purchase is completed directly between the two of you; the seller sends the buyer the ticket (barcode), which is scanned at entry. No payment is taken on the site.

Yonatan, Al-Hamoked
alhamoked.co.il`,
            seller: d => `Hi ${d.name},

The buyer confirmed the offer for the Al-Hamoked debate ${d.event} (${d.qty}).

Buyer details:
Name: ${d.buyerName}
Email: ${d.buyerEmail}${d.buyerPhone ? `
Phone: ${d.buyerPhone}` : ''}

Complete the purchase between you and send the buyer the ticket (barcode). Once the ticket is handed over, confirm the sale here:
${d.link}

No payment is taken on the site.

Yonatan, Al-Hamoked
alhamoked.co.il`
        },
        ar: {
            offer: 'عرض تذاكر - على الموقد',
            buyer: d => `مرحبًا ${d.name}،

توفرت لك ${d.qty} بالسعر الأصلي لمناظرة ${d.event} من على الموقد.

لتأكيد العرض خلال 24 ساعة (الرابط صالح حتى ${d.expiry}):
${d.link}

بعد التأكيد سيتلقى البائع بيانات الاتصال بك ويتواصل معك. تتم عملية الشراء بين الطرفين؛ يرسل البائع التذكرة (الباركود) إلى المشتري ويتم مسحها عند الدخول. لا يتم الدفع في الموقع.

يونتان، على الموقد
alhamoked.co.il`,
            seller: d => `مرحبًا ${d.name}،

أكد المشتري العرض لمناظرة ${d.event} من على الموقد (${d.qty}).

بيانات المشتري:
الاسم: ${d.buyerName}
البريد الإلكتروني: ${d.buyerEmail}${d.buyerPhone ? `
الهاتف: ${d.buyerPhone}` : ''}

أكملا عملية الشراء بينكما وأرسل التذكرة (الباركود) إلى المشتري. بعد تسليم التذكرة، أكد البيع هنا:
${d.link}

لا يتم الدفع في الموقع.

يونتان، على الموقد
alhamoked.co.il`
        }
    };
    function draft(to, subject, body) {
        $('adminDraft').hidden = false; $('draftTo').textContent = to; $('draftSubject').textContent = subject; $('draftBody').value = body;
        const addr = to.replace(/[\s,;<>?&"]/g, '');
        // The address goes in raw: percent-encoding the "@" breaks mailto handling in some mobile mail apps.
        $('draftMailto').href = 'mailto:' + addr + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        // Gmail compose opens even when the phone has no default mail app - the common reason the mailto button does nothing.
        $('draftGmail').href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(addr) + '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        $('adminDraft').scrollIntoView({behavior:'smooth'});
    }
    async function offerDraft(l, w, m) { const lang = normLang(w.lang), c = copy[lang]; draft(w.email, c.offer, c.buyer({ name: w.name, qty: qtyPhrase(m.qty, lang), event: await eventInfo(l.event_id, lang), expiry: new Date(m.expires_at).toLocaleString(lang, { dateStyle: 'short', timeStyle: 'short' }), link: tokenLink(m.token, lang, 'buyer') })); }
    async function sellerDraft(l, w, m) { const lang = normLang(l.lang), c = copy[lang]; draft(l.seller_contact.email, c.offer, c.seller({ name: l.seller_name, qty: qtyPhrase(m.qty, lang).toLowerCase(), event: await eventInfo(l.event_id, lang), buyerName: w.name, buyerEmail: w.email, buyerPhone: w.phone || '', link: tokenLink(l.token, lang, 'seller') })); }
    function button(parent,label,action) { const b=text('button',label); b.className='btn'; b.onclick=async()=> { b.disabled=true; try {await action();} catch(err){$('adminMessage').textContent='הפעולה נכשלה. בדקו הרשאת מנהל, מצב ההצעה וכמות הכרטיסים. אין לדלג על הראשון בתור.';} finally{b.disabled=false;} }; parent.append(b); }
    async function refresh() {
        state=await rpc('admin_snapshot'); $('adminMessage').textContent='עודכן. אימיילים אינם נשלחים אוטומטית.';
        $('adminListings').replaceChildren(); $('adminQueue').replaceChildren();
        for(const l of state.listings) {
            const card=text('div','');card.className='tickets-card'; card.append(text('p',`${l.event_id} · ${l.seller_name} · ${l.qty} · ${l.status}`),text('p',l.seller_contact.email));
            const m=state.matches.find(m=>m.listing_id===l.id && ['offered','confirmed'].includes(m.status)), w=m && state.waitlist.find(w=>w.id===m.waitlist_id);
            if(l.status==='open') button(card,'יצירת הצעה לראשון בתור',async()=>{if(!confirm('ההצעה נשמרת ל־24 שעות מעכשיו. לשלוח את האימייל מיד לאחר מכן?'))return;const result=await rpc('offer',{p_listing:l.id}); await refresh(); offerDraft(result.listing,result.buyer,result.match);});
            if(m && w) {
                card.append(text('p',`${w.name} · ${w.email} · ${m.status} · ${new Date(m.expires_at).toLocaleString('he')}${m.confirmed_at?` · אושר ${new Date(m.confirmed_at).toLocaleString('he')}`:''}`));
                if(m.status==='offered') button(card,'פתיחת טיוטת הצעה קיימת',async()=>offerDraft(l,w,m));
                if(m.status==='confirmed') button(card,'שליחת פרטי הקונה למוכר',async()=>sellerDraft(l,w,m));
            }
            $('adminListings').append(card);
        }
        let qn=0;for(const w of state.waitlist.filter(w=>w.status!=='removed')) {qn++;const card=text('div','');card.className='tickets-card';card.append(text('p',`${qn}. ${w.event_id} · ${w.name} · ${w.email} · ${w.qty} · ${w.status} · ${new Date(w.created_at).toLocaleString('he')}`)); if(w.status==='waiting')button(card,'הסרה מהתור',async()=>{if(confirm('להסיר את הרשומה מהתור?')){await rpc('remove',{p_waitlist:w.id});await refresh();}});$('adminQueue').append(card);}
    }
    $('adminLogin').addEventListener('submit',async e=> {
        e.preventDefault();const b=e.currentTarget.querySelector('button');b.disabled=true;
        try {
            if(!api.configured()) throw new Error('config');
            session=await api.request('/auth/v1/token?grant_type=password',{email:$('adminEmail').value.trim(),password:$('adminPassword').value});
            $('adminLogin').reset(); await refresh();$('adminLogin').hidden=true;$('adminWorkspace').hidden=false;if(window.AlhamokedEvent)window.AlhamokedEvent.onSession(session);
        } catch {session=null;$('adminPassword').value='';$('adminMessage').textContent='הכניסה נכשלה. בדקו הגדרות, סיסמה והרשאת מנהל.';}
        finally{b.disabled=false;}
    });
    $('adminRefresh').onclick=()=>refresh().catch(()=>{$('adminMessage').textContent='הרענון נכשל. התחברו מחדש אם פג תוקף החיבור.';});
    $('adminLogout').onclick=()=>{session=null;state=null;$('adminListings').replaceChildren();$('adminQueue').replaceChildren();$('draftBody').value='';$('draftTo').textContent='';$('draftSubject').textContent='';$('draftMailto').removeAttribute('href');$('draftGmail').removeAttribute('href');$('adminDraft').hidden=true;$('adminWorkspace').hidden=true;$('adminLogin').hidden=false;if(window.AlhamokedEvent)window.AlhamokedEvent.onSession(null);};
    $('draftCopy').onclick=()=>navigator.clipboard.writeText($('draftBody').value).then(()=>{$('adminMessage').textContent='הועתק.';}).catch(()=>{$('adminMessage').textContent='סמנו והעתיקו את הטקסט ידנית.';});
})();

