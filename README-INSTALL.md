# Install JUJ Marketplace on cPanel

Everything is in this folder: the built website, the installer and the database files.
You need a cPanel account with **Setup Node.js App** (Node 20 or newer) and **MySQL Databases**.

---

## 1. Create the database

cPanel → **MySQL® Databases**

1. *Create New Database* → e.g. `juj` (cPanel will name it `youruser_juj`).
2. *Add New User* → e.g. `juj` with a strong password. Write both down.
3. *Add User To Database* → pick the user and database → tick **ALL PRIVILEGES** → Make Changes.

## 2. Upload the files

cPanel → **File Manager**

1. Create a folder for the app, e.g. `/home/youruser/juj` (do **not** use `public_html`).
2. Upload `juj-cpanel.zip` into it and use **Extract**.
3. You should now see `app.js`, `server/`, `public/`, `install/`, `database/`, `package.json`.

## 3. Create the Node.js app

cPanel → **Setup Node.js App** → **Create Application**

| Field | Value |
|---|---|
| Node.js version | 20 or newer |
| Application mode | Production |
| Application root | `juj` (the folder from step 2) |
| Application URL | your domain or subdomain |
| Application startup file | `app.js` |

Click **Create**, then **Run NPM Install** (only needed if the `node_modules` folder is missing).

## 4. Run the installer

Open your domain in a browser. Because the app is not configured yet, you get the
**install wizard**. Fill in:

* the database name / user / password from step 1 (host stays `localhost`),
* the admin email and password you want to log in with,
* your site name, address and default colour,
* optionally the Emergent storage key (for image uploads) and your Stripe keys.

Tick *import the demo catalogue* only if you want the sample products.

Press **Install now**. It creates all tables, your admin account and writes the `.env` file.

## 5. Restart

cPanel → **Setup Node.js App** → **Restart**. Reload your domain: the marketplace is live.
Log in at `/auth` with the admin email and password, the panel is at `/admin`.

---

## After the install

* **Stripe webhook:** in your Stripe dashboard add the endpoint
  `https://yourdomain.com/api/stripe/webhook` and paste the signing secret into `.env`
  as `STRIPE_WEBHOOK_SECRET`, then restart the app.
* **Change any setting later:** edit `.env` in File Manager and press Restart.
* **Re-run the installer:** rename or delete `.env`, then reload the site.
* **Emails** (verification, password reset) need `EMERGENT_EMAIL_KEY` in `.env`.
* **Image uploads** need `EMERGENT_LLM_KEY` in `.env` (Emergent managed storage).

## Troubleshooting

| Problem | Fix |
|---|---|
| "The database user or password is wrong" | Re-check step 1.3 — the user must be added to the database with all privileges. |
| "That database does not exist" | Use the full cPanel name, e.g. `youruser_juj`. |
| Site shows the installer again | `.env` was not saved — set the app folder permissions to 0755 and re-run. |
| 503 / "We're sorry" page | Open Setup Node.js App, check the log file shown there; usually a wrong startup file or Node version. |
| Wrong email or password at login | Delete `.env`, reload the site and run the installer again with a fresh admin password. |

Keep `.env` private — it holds your database and payment keys.
