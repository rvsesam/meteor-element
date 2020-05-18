---
title: Utilisation de Git avec Github
date: 2020-04-30
updatedAt: 2020-05-13
author: PM
tags:
- Github
category: Langages
top: 2
location: Kampot
links:
- key: "utilisation de Git:" 
  texte: "Pushing a new initial project to github"
  lien: "https://stackoverflow.com/questions/46877667/how-to-push-a-new-initial-project-to-github-using-vs-code#47060891"
---

## Creating a new project:

1. GitHub -> repositories -> new repo

2. clone or download -> clone with HTTPS -> copy address

3. vsCode -> new window (Cmd-Shift-N)

4. onglet Explorer -> Clone Repository

5. paste the link, select local repo folder, open cloned repo

## Pushing existing project to GitHub:

1) Navigate to the local project directory in vsCode and create a local git repository:

```markdown
 git init
```

2) Once that is successful, click on the 'Source Control' icon on the left navbar in VS-Code to see files ready to be commit-ed. Press on 'Commit' button if needed, provide comments, stage the changes and commit the files. Alternatively you can run from CLI

```markdown
git commit -m "PM"
```

3) Now you need to visit your GitHub account and create a new Repository. Exclude creating 'README.md', '.gitIgnore' files, or adding any License to the repo. Sometimes these settings cause issue while pushing in.

4) Copy the link to this newly created GitHub Repository. For ex. `https://github.com/rvsesam/vueP_Blog.git`

5) Come back to the terminal in VS-CODE and type these commands in succession:

```markdown
git remote add origin <Link to GitHub Repo>     //maps the remote repo link to local git repo

git remote -v                                  //this is to verify the link to the remote repo 

git push -u origin master                      // pushes the commit-ed changes into the remote repo
```

6) You can see the success message in the Terminal. You can also verify by refreshing the GitHub repo online.

## Supprimer un repo sur GitHub:

Dans le repo -> onglet Settings, défiler vers le bas -> Danger Zone -> Delete this repo

## Download repo

### download a repository on GitHub.com to our machine
git clone https://github.com/me/repo.git

### change into the `repo` directory

cd repo

### create a new branch and switch to that branch

git branch -b my-branch

-b <new_branch>
Create a new branch named <new_branch> and start it at <start_point>; équivalent à `git branch my-branch + git checkout my-branch`

### make changes on `file1.md` and `file2.md` and stage the changed files

git add file1.md file2.md

### take a snapshot of the staging area (anything that's been added)
git commit -m "my snapshot"

### push changes to github
git push --set-upstream origin my-branch

### create a new directory, and initialize it with git-specific functions
git init my-repo

### change into the `my-repo` directory
cd my-repo

### create the first file in the project
touch README.md

### git isn't aware of the file, stage it
git add README.md

### take a snapshot of the staging area
git commit -m "add README to initial commit"

### provide the path for the repository you created on github
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git

### push changes to github
git push --set-upstream origin master

## Example: contribute to an existing branch on GitHub

assumption: a project called `repo` already exists on the machine, and a new branch has been pushed to GitHub.com since the last time changes were made locally

### change into the `repo` directory
cd repo

### update all remote tracking branches, and the currently checked out branch
git pull

### update all remote tracking branches, and the currently checked out branch
git pull

### change into the existing branch called `feature-a`
git checkout my-branch

### git stash
Use git stash when you want to record the current state of the working directory and the index, but want to go back to a clean working directory. The command saves your local modifications away and reverts the working directory to match the HEAD commit.

## Suppression de branche

Faire commit et push depuis my-branch,

`git checkout master` -> Switched to branch 'master'

`git merge my-branch` -> Merge made by the 'recursive' strategy.

synchroniser les changements: clic sur git dans status bar.

`git branch -d my-branch` -> suppression de my-branch -d = --delete

`git branch -dr  origin/Modif-liste-Notes-Court/Long`  -> Deleted remote-tracking branch origin/Modif-liste-Notes-Court/Long (was 8e65c76).

````bash
Start a new feature
git checkout -b new-feature master
# Edit some files
git add <file>
git commit -m "Start a feature"
# Edit some files
git add <file>
git commit -m "Finish a feature"
# Develop the master branch
git checkout master
# Edit some files
git add <file>
git commit -m "Make some super-stable changes to master"
# Merge in the new-feature branch
git merge new-feature
git branch -d new-feature
```