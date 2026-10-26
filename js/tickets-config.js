// Public Supabase URL + anon (or publishable) key only. NEVER put a service_role key here.
window.ALHAMOKED_TICKETS_CONFIG = Object.freeze({
    supabaseUrl: 'https://fhwrnscmpojwjnigzjch.supabase.co',
    anonKey: 'sb_publishable_jRww9AQNE0T0J334o_ztMg_JUnaFNes',
    // Public Cloudflare Turnstile site key and the signup intake function (the secret key lives only in Supabase)
    turnstileSiteKey: '0x4AAAAAAFmWxYnPW6os1n8a',
    signupUrl: 'https://fhwrnscmpojwjnigzjch.supabase.co/functions/v1/signup'
});
