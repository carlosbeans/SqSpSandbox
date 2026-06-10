# Deploying to Appspace — Setup Guide

This guide walks you through connecting a project to Appspace and deploying it for the first time. No prior terminal experience needed.

---

## What is Appspace and how does deploying work?

Appspace is the hosting platform that makes your app accessible via a live URL. Deploying means sending your latest code to Appspace so it can build and publish an updated version of the site.

The way you send code to Appspace is with a single terminal command:

```
git push appspace main
```

Think of it like emailing a package to Appspace — they receive it, build it, and put it live. You do this from inside the project folder on your computer.

---

## Before you start

You'll need:
- **Cursor** installed (you're using it to edit the project)
- The project open in Cursor
- Access to [appspace.squarespace.net](https://appspace.squarespace.net)

---

## Step 1 — Make sure your work is saved and committed

Before deploying, check that all your changes are committed. In Cursor, open a terminal (**Terminal → New Terminal**) and run:

```
git status
```

If it says `nothing to commit, working tree clean`, you're good — skip to Step 2.

If it shows uncommitted changes, commit them first:

```
git add -A
git commit -m "your message here"
```

> **Why this matters:** Appspace deploys whatever is in your git history. Any uncommitted changes won't be included in the deployment.

---

## Step 2 — Create a project on Appspace (if you don't have one yet)

1. Go to [appspace.squarespace.net](https://appspace.squarespace.net)
2. Click **Host a Project**
3. Enter a **Site Name** — use the same name as your project folder so it's easy to find later (e.g. `my-project-name`). The slug autopopulates from this.
4. Leave **Collaborator Group** as None unless you need to share it with a team
5. Click **Create Project**

If you already have a project set up on Appspace for this work, skip to Step 3.

---

## Step 3 — Get your git URL and deploy token

Both live in the same place:

1. Open your project on [appspace.squarespace.net](https://appspace.squarespace.net)
2. Click the **Configuration** tab
3. Under **Git Remote URL**, click **Copy** — it looks like `https://appspace.squarespace.net/git/your-project-name.git`
4. Under **Deploy Token**, click **Generate Deploy Token** (if one already exists, click **Regenerate** to get a fresh one)
5. Copy the token — paste it somewhere safe temporarily, you'll need it in the next step

---

## Step 5 — Connect the project to Appspace

In the terminal, paste this command, replacing `<YOUR-GIT-URL>` with the URL you copied in Step 3:

```
git remote add appspace <YOUR-GIT-URL>
```

Press Enter. If nothing happens (no error), it worked.

---

## Step 6 — Save your credentials

This step means you won't have to enter your username and token every time you deploy.

Run this command, replacing `<TOKEN>` with your token from Step 3 and `<host/path>` with everything after `https://` in your git URL:

```
git remote set-url appspace https://<YOUR-USERNAME>:<TOKEN>@<host/path>
```

**Example:** if your git URL is `https://appspace.squarespace.net/git/my-project.git`, your username is `autang`, and your token is `abc123`, the command would be:

```
git remote set-url appspace https://autang:abc123@appspace.squarespace.net/git/my-project.git
```

---

## Step 7 — Deploy

Run:

```
git push appspace main
```

This sends your code to Appspace. It may take 30–60 seconds. When it finishes you'll see a message like `main -> main`.

---

## Step 8 — Make it live (Promote)

Pushing your code starts a **build** — Appspace compiles your project. To check progress:

1. Go to your project on Appspace
2. Click the **Deployments** tab
3. Wait for your new deployment to finish building (the action buttons will appear next to it)
4. Click **Promote** to make it the live Production version

---

## Deploying future updates

Once the setup above is done, deploying any future changes is two steps:

1. Commit your changes (if you haven't already):
```
git add -A
git commit -m "your message here"
```

2. Push to Appspace:
```
git push appspace main
```

Then go to Appspace → Deployments → Promote the new build.

---

## Troubleshooting

**"remote appspace already exists" error**
The project is already connected. Skip Steps 5–6 and just deploy with `git push appspace main`.

**"authentication failed" error**
Your token may have expired. Go to Appspace → your project → Configuration tab, click **Regenerate**, and redo Step 6 with the new token.

**No "Promote" button after pushing**
The build is probably still running. Wait a minute or two and refresh the Appspace page.

**Not sure if you're in the right folder**
In the terminal, type `ls` and press Enter. You should see files like `package.json` and `src`. If not, you may be in the wrong folder.

**Changes aren't showing up after Promote**
You may have forgotten to commit before pushing. Run `git status` to check, commit any missing changes, then push and promote again.

**"no running pod found for site-…" (repeating in the AppSpace UI)**
This comes from AppSpace's gateway, not your terminal. It means there is no healthy container to serve traffic right now. Common causes:

1. **Build still running or not Promoted yet** — wait for the deployment to finish in Deployments, then click **Promote**. The live URL and log stream will show this until a pod is running.
2. **Pod crashed on startup** — open **Deployments → your build → Server logs**. You should see `[appspace] serving prebuilt build`. If you see `missing prebuilt build/` or `serve spawn error`, redeploy with `npm run deploy "message"` (that rebuilds and commits `build/` before pushing).
3. **Checked the live URL too early** — after Promote, wait 30–60 seconds for the new pod to pass its health check.

For this project, always deploy with `npm run deploy "your message"` instead of `git push appspace main` alone, so the committed `build/` folder is included.

---

## Bonus — Let your Cursor agent handle this for you

Instead of running terminal commands manually, you can set up a personal Cursor skill that will ask you for the info in plain language and run everything for you automatically.

**To set it up, open a new chat in Cursor and paste this prompt:**

> I want to create a personal Cursor skill that helps me deploy projects to Appspace. The skill should be stored at `~/.cursor/skills/appspace-deploy/SKILL.md` so it works across all my projects.
>
> The skill should:
> - Know that my Squarespace username is `[your-username]` (baked in permanently — never ask for it)
> - When I say something like "set up Appspace" or "deploy to Appspace for the first time", first run `git status` and commit any uncommitted changes before proceeding
> - Then check whether the project already has an `appspace` git remote by running `git remote -v`
> - If not set up yet: ask me in plain language for the Appspace git URL (tell me to find it in Appspace → Configuration tab) and my token (tell me to find it in Appspace → Settings), then run `git remote add appspace <url>` and embed the token into the remote URL so credentials are saved
> - Then run `git push appspace main` and tell me to go to Appspace → Deployments and click Promote once the build finishes
> - Include a short troubleshooting table for common errors (auth failed, remote already exists, no Promote button)

Replace `[your-username]` with your actual Squarespace username before sending. The agent will create the skill file for you — after that, just say "set up Appspace" in any project and it will guide you through the whole thing.

---

*Questions? Ask in the Appspace project chat or ping the team.*
