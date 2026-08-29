# terminal-log.md

This file should contain the terminal session log you used to complete the Week 3 tasks. Paste the commands you ran (and outputs you want to keep) below.

Example command sequence used to create the scaffold in this repo:

```bash
# create repo scaffold locally
mkdir -p my-portfolio/src/{css,js,images} docs tests
touch my-portfolio/src/index.html my-portfolio/src/css/styles.css my-portfolio/src/js/main.js my-portfolio/README.md

# initialize git and make first commit
git init
git add .
git commit -m "Initial commit: project scaffold"

# create feature branch and example commit
git checkout -b feature/add-homepage
# edit files...
git add src/index.html
git commit -m "feat: add homepage"

git checkout main
git merge feature/add-homepage

# push to GitHub (replace URL with your repo)
git remote add origin https://github.com/rhonexkilibwa001-dev/iyf-s11-week-03-rhonexkilibwa001-dev.git
git push -u origin main
```

Paste your real terminal log below this line:


