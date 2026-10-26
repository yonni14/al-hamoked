// The existing Brevo form enforces Turnstile on its server, including direct POSTs.
(() => {
    const form = document.getElementById('newsletterForm');
    const modal = document.getElementById('newsletterModal');
    if (!form || !modal) return;
    const button = document.getElementById('newsletterSubmitBtn');
    const success = document.getElementById('newsletterSuccessMsg');
    const error = document.getElementById('newsletterErrorMsg');
    let widget, busy = false, renderTimer;
    const text = () => ({
        he: { captcha: 'אנא המתינו לסיום בדיקת האבטחה ונסו שוב.', error: 'חלה שגיאה בהרשמה, אנא נסו שוב.', success: 'תודה שנרשמת! פרטיך נקלטו בהצלחה.' },
        en: { captcha: 'Please wait for the security check to finish, then try again.', error: 'Your subscription could not be saved. Please try again.', success: 'Thank you! Your subscription was saved.' },
        ar: { captcha: 'يرجى انتظار اكتمال الفحص الأمني ثم المحاولة مجدداً.', error: 'تعذر حفظ الاشتراك. يرجى المحاولة مجدداً.', success: 'شكراً! تم حفظ اشتراكك بنجاح.' }
    }[document.documentElement.lang] || { captcha: 'Please complete the security check.', error: 'Please try again.', success: 'Thank you!' });
    function showError(message) { error.textContent = message; error.style.display = 'block'; }
    function render() {
        if (widget !== undefined || !modal.classList.contains('active')) return;
        if (!window.turnstile) {
            if (!renderTimer) renderTimer = setTimeout(() => { renderTimer = undefined; render(); }, 250);
            return;
        }
        widget = window.turnstile.render('#newsletterTurnstile', {
            sitekey: '0x4AAAAAAFm5vuqA1TH_xZyd', size: 'flexible',
            language: document.documentElement.lang || 'auto',
            'error-callback': () => showError(text().captcha),
            'expired-callback': () => { window.turnstile.reset(widget); }
        });
    }
    new MutationObserver(() => {
        if (modal.classList.contains('active')) render();
        else if (widget !== undefined && !busy) window.turnstile.reset(widget);
    }).observe(modal, { attributes: true, attributeFilter: ['class'] });
    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (busy) return;
        const token = widget !== undefined && window.turnstile ? window.turnstile.getResponse(widget) : '';
        if (!token) { showError(text().captcha); render(); return; }
        busy = true; button.disabled = true; button.style.opacity = '0.6'; error.style.display = 'none';
        try {
            const data = new FormData(form);
            data.set('cf-turnstile-response', token);
            data.set('locale', document.documentElement.lang || 'he');
            data.set('email_address_check', '');
            const url = new URL(form.action); url.searchParams.set('isAjax', '1');
            const response = await fetch(url, { method: 'POST', body: data });
            const result = await response.json();
            if (!response.ok || result.success !== true) throw new Error('Signup rejected');
            form.style.display = 'none'; success.textContent = text().success; success.style.display = 'block';
            setTimeout(() => {
                document.getElementById('newsletterModalClose').click();
                form.reset(); form.style.display = 'block'; success.style.display = 'none';
            }, 2000);
        } catch (_) { showError(text().error); }
        finally {
            busy = false; button.disabled = false; button.style.opacity = '1';
            if (widget !== undefined && window.turnstile) window.turnstile.reset(widget);
        }
    });
    render();
})();
