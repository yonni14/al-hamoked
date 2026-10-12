# Waiting list + resale setup

This package is a complete copy of the site, not a patch. Restore the `.zip` extension, unzip, and copy the contents into the `al-hamoked` repository root. No GitHub or database changes have been made for you.

## 1. Choose Supabase

The existing Cinema DNA project could not be verified because the Supabase dashboard is signed out. Default: create a new Alhamoked project. If you already have access to Cinema DNA's project, you can use it instead. This build uses isolated `alhamoked_*` tables/functions and does not change Cinema DNA tables, auth policies, or settings. Check project capacity and billing in your own dashboard before choosing it.

## 2. Run the schema once

Open Supabase → SQL Editor. Paste the contents of `supabase/waitlist.sql` and run it once. It intentionally fails if these objects already exist, rather than silently changing a database from another version.

## 3. Configure the site

Edit `js/tickets-config.js` on your own machine:

- `supabaseUrl`: your project URL.
- `anonKey`: the project's public anon key or publishable key.

Never use the service_role/secret key in website files. The public key is expected to be visible in a static site. Personal data is protected by database permissions and RLS, not by hiding this key.

## 4. Create the administrator

Supabase → Authentication → Users → Add user. Create a confirmed email/password user for yourself, or use an existing confirmed user in this project. Do not put its password in any code file. Copy that user's UUID and run this in SQL Editor, replacing the placeholder:

```sql
insert into public.alhamoked_admins(user_id)
values ('PASTE_ADMIN_AUTH_USER_UUID');
```

Only UUIDs in this table can view the queue, create offers, or remove waiting entries. The admin page is public, but its data/actions require sign-in and this allowlist. Existing Cinema DNA users do not automatically become administrators. Check password/email Auth is enabled. The admin page uses Supabase Auth email/password, not your Supabase dashboard password. The session stays in memory, not localStorage; reload or an expired session requires sign-in again.

## 5. Open the waiting list for an event

All three language JSON files currently say the upcoming events open soon; they were migrated to `registrationState: "soon"`, not changed to sold out. When appropriate, change the same event ID to `"waitlist"` in **all** of:

- `data/events_he.json`
- `data/events_en.json`
- `data/events_ar.json`

In SQL Editor or Table Editor, also enable that ID:

```sql
update public.alhamoked_events
set enabled = true
where event_id = 'future_superate_gorenment';
```

For a new event, add its exact ID to `alhamoked_events` first. `enabled=false` prevents anonymous submissions even if the public HTML has not yet updated. The DB event toggle controls submissions; the static JSON controls CTA presentation. Keep them in sync manually.

States: `open` links to normal registration; `waitlist` opens the two-tab modal; `soon` and `closed` disable the registration CTAs. Missing/unknown state keeps the old link/text behavior. IDs must match across languages. The unused legacy `data/events.json` is left untouched.

## 6. Operate the system

Open `admin.html` on your deployed site and sign in:

1. See the listings and FIFO waiting queue. Each listing and queue entry belongs to an event.
2. Click "יצירת הצעה לראשון בתור". This **reserves immediately** and starts the 24-hour deadline.
3. Review the prepared recipient and text. Open the email draft or copy it into your mail app and **send it yourself immediately**. A mailto link does not send email or establish delivery.
4. You can reopen the same prepared offer if the mail app did not open. Do not create another offer for this reservation.
5. The buyer opens the offer link and confirms. Seller details are shown only after that explicit confirmation. No money changes hands on this site.
6. Refresh admin. Click "שליחת פרטי הקונה למוכר", review and manually send the seller's prepared email. It includes the buyer's contact and the seller's private confirmation link.
7. Both sides coordinate payment at the original price and the name transfer, with Knesset Museum approval. The website does not request museum approval or validate prices/payment.
8. Only after payment and approved transfer, the seller clicks the private link and confirms sold. Sold quantities leave the queue. If only some listed tickets were sold, the remaining quantity reopens for the next buyer; a fully sold listing closes.

FIFO is strict within each event. If the first buyer requests more tickets than the listing has, no offer is created and nobody is skipped. Resolve quantities directly with the parties, or use a listing large enough. Admin does not silently change quantities.

After 24 hours without confirmation, the offer becomes unusable. On the next admin refresh/offer or token operation, its listing reopens and the nonresponding buyer is removed from the active queue. The next waiting buyer is first. This prevents reoffering indefinitely to the same unresponsive person. They can sign up again at the end of the queue. Confirmation already made within 24 hours stays matched until seller completion, without an automatic payment deadline.

## Manual parts and limits

- No automatic email service or email-delivery tracking. All outgoing email is reviewed and sent in your email client.
- Refresh admin to discover confirmations and prepare the seller notification. Keep this operational check in your own routine; no background checker is installed.
- No museum integration, payment handling, original-price verification, refund logic, or registration-closure checker.
- Email/phone are stored only after the consent checkbox. There is no separate customer email verification, bot protection, or per-IP submission limit. Do not treat entries as verified identities. If spam is an issue, disable the affected event and add an Edge Function with CAPTCHA/rate limiting before reopening; RLS does not prevent spam inserts.
- Anonymous visitors cannot list/read personal-data tables or set status/timestamps. Token links intentionally permit narrow access to one matched counterparty after confirmation. Treat them as private bearer links and do not forward them publicly. Tokens are in the URL fragment, excluded from HTTP requests/referrer logs; the confirmation pages also use `no-referrer` and load no analytics.
- Public pages allow direct inserts only; confirmation/sold changes go through narrow database functions. There is no anonymous update/delete policy.
- Admin can remove waiting entries. For a matched cancellation, correction, or deletion request, handle it deliberately in SQL Editor; do not delete or cancel a reservation blindly. This version has no matched-cancellation UI.
- Retention: periodically delete old event data in SQL Editor after the event and completion of any open sales. Delete matches first, then waitlist/listings, then the event if needed. Retaining personal data indefinitely is not recommended.

## Verify after setup

Use a separate test event ID enabled in the database and added to test JSON. Submit a buyer and seller, send an offer to your own email, confirm, send the seller draft, and confirm sold. Check an ordinary anonymous visit cannot read `alhamoked_waitlist`, `alhamoked_listings`, or `alhamoked_matches`. Disable/remove the test event afterward. Supabase production configuration and real mail-client delivery were not exercised in this package's local tests.

`TEST_RESULTS.md` describes the local Chromium + PostgreSQL tests. There is no frontend build step: GitHub Pages serves the static files directly.
