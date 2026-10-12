(() => {
    let session, state;
    const $ = id => document.getElementById(id), api = window.AlhamokedTickets;
    const rpc = (name, body = {}) => api.request('/rest/v1/rpc/alhamoked_' + name, body, session.access_token);
    const text = (tag, value) => { const el = document.createElement(tag); el.textContent = value; return el; };
    const tokenLink = (token, lang, mode) => { const url = new URL('ticket.html', location.href); url.hash = new URLSearchParams({token,lang,mode}).toString(); return url.href; };
    const copy = {
        he:{offer:'הצעת כרטיס - על המוקד', intro:'התפנו עבורך כרטיסים במחיר המקורי.', confirm:'לאישור בתוך 24 שעות:', contact:'הקונה אישר. פרטי הקשר:', sold:'לאישור המכירה לאחר תשלום והעברת שם:', note:'הכרטיסים אישיים. תיאום התשלום והעברת השם ישירות בין הצדדים. אין תשלום באתר.'},
        en:{offer:'Ticket offer - Alhamoked',intro:'Tickets are available for you at the original price.',confirm:'Confirm within 24 hours:',contact:'The buyer confirmed. Contact details:',sold:'Confirm the sale after payment and name transfer:',note:'Tickets are name-bound. Coordinate payment and the name transfer directly. No payment is taken on the site.'},
        ar:{offer:'عرض تذاكر - على الموقد',intro:'توفرت لك تذاكر بالسعر الأصلي.',confirm:'للتأكيد خلال 24 ساعة:',contact:'أكد المشتري. بيانات الاتصال:',sold:'لتأكيد البيع بعد الدفع ونقل الاسم:',note:'التذاكر شخصية. نسق الدفع ونقل الاسم مباشرة. لا يتم الدفع في الموقع.'}
    };
    function draft(to, subject, body) {
        $('adminDraft').hidden = false; $('draftTo').textContent = to; $('draftSubject').textContent = subject; $('draftBody').value = body;
        // The address goes in raw: percent-encoding the "@" breaks mailto handling in some mobile mail apps.
        $('draftMailto').href = 'mailto:' + to.replace(/[\s,;<>?&"]/g, '') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        $('adminDraft').scrollIntoView({behavior:'smooth'});
    }
    function offerDraft(l,w,m) { const c = copy[w.lang]; draft(w.email,c.offer,[w.name,c.intro,l.event_id,`${m.qty} ${api.t('wl_tickets')}`,c.confirm,tokenLink(m.token,w.lang,'buyer'),new Date(m.expires_at).toLocaleString(w.lang),c.note].join('\n\n')); }
    function sellerDraft(l,w,m) { const c=copy[l.lang]; draft(l.seller_contact.email,c.offer,[l.seller_name,c.contact,w.name,w.email,w.phone || '',`${m.qty}`,c.sold,tokenLink(l.token,l.lang,'seller'),c.note].join('\n\n')); }
    function button(parent,label,action) { const b=text('button',label); b.className='btn'; b.onclick=async()=> { b.disabled=true; try {await action();} catch(err){$('adminMessage').textContent='הפעולה נכשלה. בדקו הרשאת מנהל, מצב ההצעה וכמות הכרטיסים. אין לדלג על הראשון בתור.';} finally{b.disabled=false;} }; parent.append(b); }
    async function refresh() {
        state=await rpc('admin_snapshot'); $('adminMessage').textContent='עודכן. אימיילים אינם נשלחים אוטומטית.';
        $('adminListings').replaceChildren(); $('adminQueue').replaceChildren();
        for(const l of state.listings) {
            const card=text('div','');card.className='tickets-card'; card.append(text('p',`${l.event_id} · ${l.seller_name} · ${l.qty} · ${l.status}`),text('p',l.seller_contact.email));
            const m=state.matches.find(m=>m.listing_id===l.id && ['offered','confirmed'].includes(m.status)), w=m && state.waitlist.find(w=>w.id===m.waitlist_id);
            if(l.status==='open') button(card,'יצירת הצעה לראשון בתור',async()=>{if(!confirm('ההצעה נשמרת ל־24 שעות מעכשיו. לשלוח את האימייל מיד לאחר מכן?'))return;const result=await rpc('offer',{p_listing:l.id}); await refresh(); offerDraft(result.listing,result.buyer,result.match);});
            if(m && w) {
                card.append(text('p',`${w.name} · ${w.email} · ${m.status} · ${new Date(m.expires_at).toLocaleString('he')}`));
                if(m.status==='offered') button(card,'פתיחת טיוטת הצעה קיימת',async()=>offerDraft(l,w,m));
                if(m.status==='confirmed') button(card,'שליחת פרטי הקונה למוכר',async()=>sellerDraft(l,w,m));
            }
            $('adminListings').append(card);
        }
        for(const w of state.waitlist.filter(w=>w.status!=='removed')) {const card=text('div','');card.className='tickets-card';card.append(text('p',`${w.event_id} · ${w.name} · ${w.email} · ${w.qty} · ${w.status} · ${new Date(w.created_at).toLocaleString('he')}`)); if(w.status==='waiting')button(card,'הסרה מהתור',async()=>{if(confirm('להסיר את הרשומה מהתור?')){await rpc('remove',{p_waitlist:w.id});await refresh();}});$('adminQueue').append(card);}
    }
    $('adminLogin').addEventListener('submit',async e=> {
        e.preventDefault();const b=e.currentTarget.querySelector('button');b.disabled=true;
        try {
            if(!api.configured()) throw new Error('config');
            session=await api.request('/auth/v1/token?grant_type=password',{email:$('adminEmail').value.trim(),password:$('adminPassword').value});
            $('adminLogin').reset(); await refresh();$('adminLogin').hidden=true;$('adminWorkspace').hidden=false;
        } catch {session=null;$('adminPassword').value='';$('adminMessage').textContent='הכניסה נכשלה. בדקו הגדרות, סיסמה והרשאת מנהל.';}
        finally{b.disabled=false;}
    });
    $('adminRefresh').onclick=()=>refresh().catch(()=>{$('adminMessage').textContent='הרענון נכשל. התחברו מחדש אם פג תוקף החיבור.';});
    $('adminLogout').onclick=()=>{session=null;state=null;$('adminListings').replaceChildren();$('adminQueue').replaceChildren();$('draftBody').value='';$('draftTo').textContent='';$('draftSubject').textContent='';$('draftMailto').removeAttribute('href');$('adminDraft').hidden=true;$('adminWorkspace').hidden=true;$('adminLogin').hidden=false;};
    $('draftCopy').onclick=()=>navigator.clipboard.writeText($('draftBody').value).then(()=>{$('adminMessage').textContent='הועתק.';}).catch(()=>{$('adminMessage').textContent='סמנו והעתיקו את הטקסט ידנית.';});
})();
