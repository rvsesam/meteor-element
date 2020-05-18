---
title: Oh My ZSH!
tags:
- zsh
- terminal
category: shell
top: 1
date: 2020-05-02
createdAt: 2020-05-01
updatedAt: 2020-05-13
location: Kampot
links:
- key: "install - config:" 
  texte: Configure your macOs Terminal with Zsh
  lien: "https://www.freecodecamp.org/news/how-to-configure-your-macos-terminal-with-zsh-like-a-pro-c0ab3f3c1156/)"

- key: "Sitepoint:" 
  texte: 75 Zsh Commands
  lien: "https://www.sitepoint.com/zsh-commands-plugins-aliases-tools/"

- key: "Github:"
  texte: Installing zsh
  lien: "https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH#macos"
---

## Syntaxe

- !!  brings up the last command: sudo !!.
- && to chain multiple commands.
- || for conditional execution: git commit -m "whatever..." || echo "Commit failed".
- mkdir -p allows you to create parent directories as needed: mkdir -p articles/jim/sitepoint/article{1,2,3}.
- Set environment variables on a per-command basis like so: NODE_DEBUG=myapp node index.js. Or, on a per-session basis like so: export NODE_DEBUG=myapp. You can check it was set by typing `echo $<variable-name>`.
- history | grep Pipe the output of one command into a second command: history | grep recherche

## Navigation sur la ligne de commande

- Ctrl + L will clear the screen
- Ctrl + a will take you to the beginning of a line.
- Ctrl + e will take you to the end.
- Ctrl + w to delete one word (backw­ards).
- Ctrl + u will remove the line.
- Ctrl + k will clear everything from the cursor to the end of the line. 
- These last three can be undone with Ctrl + y.

## Configuration


- Dossier d'installation: `\$ZSH`

- Check version: `zsh --version`. 

- Set default shell: `chsh -s $(which zsh)`  `chsh -s $(which bash)`.

- bbz ouvrir le fichier de config: `~/.zshrc` avec BBEdit.

## Alias

| Alias | Command      | Description                                           |
| ----- | ------------ | ----------------------------------------------------- |
| vcr   | vuecreate    | `/Users/pm/Dev/_\*aGarder\*/Shell/Vuetify_Install.sh` |
| cdd   | cd Dev       | `cd ~/Dev`                                            |
| bbz   | bbedit zshrc | `cd ~/Dev`                                            |
| hg    | history grep | `/Users/pm/Dev/_\*aGarder\*/Shell/Vuetify_Install.sh` |

### BBEdit

| Alias | Command     | Description                                        |
| ----- | ----------- | -------------------------------------------------- |
| bb    | `bb <file>` | launch BBEdit                                      |
| bb    | `bb <dir>`  | cd dir and open it in BBEdit                       |
| bbpb  | `bbpd`      | create a BBEdit document with content of clipboard |
| bbd   | `bbd`       | BBEdit diff tool                                   |

### Yarn

| Alias | Command                                   | Description                                                 |
| ----- | ----------------------------------------- | ----------------------------------------------------------- |
| y     | `yarn`                                    | The Yarn command                                            |
| ya    | `yarn add`                                | Install a package in dependencies (`package.json`)          |
| yad   | `yarn add --dev`                          | Install a package in devDependencies (`package.json`)       |
| yap   | `yarn add --peer`                         | Install a package in peerDependencies (`package.json`)      |
| yb    | `yarn build`                              | Run the build script defined in `package.json`              |
| ycc   | `yarn cache clean`                        | Clean yarn's global cache of packages                       |
| yd    | `yarn dev`                                | Run the dev script defined in `package.json`                |
| yga   | `yarn global add`                         | Install packages globally on your operating system          |
| ygls  | `yarn global list`                        | Lists global installed packages                             |
| ygrm  | `yarn global remove`                      | Remove global installed packages from your OS               |
| ygu   | `yarn global upgrade`                     | Upgrade packages installed globally to their latest version |
| yh    | `yarn help`                               | Show help for a yarn command                                |
| yi    | `yarn init`                               | Interactively creates or updates a package.json file        |
| yin   | `yarn install`                            | Install dependencies defined in `package.json`              |
| yln   | `yarn lint`                               | Run the lint script defined in `package.json`               |
| yls   | `yarn list`                               | List installed packages                                     |
| yout  | `yarn outdated`                           | Check for outdated package dependencies                     |
| yp    | `yarn pack`                               | Create a compressed gzip archive of package dependencies    |
| yrm   | `yarn remove`                             | Remove installed packages                                   |
| yrun  | `yarn run`                                | Run a defined package script                                |
| ys    | `yarn serve`                              | Start the dev server                                        |
| yst   | `yarn start`                              | Run the start script defined in `package.json`              |
| yt    | `yarn test`                               | Run the test script defined in `package.json`               |
| ytc   | `yarn test --coverage`                    | Run the test script defined in `package.json` with coverage |
| yuc   | `yarn global upgrade && yarn cache clean` | Upgrade global packages and clean yarn's global cache       |
| yui   | `yarn upgrade-interactive`                | Prompt for which outdated packages to upgrade               |
| yup   | `yarn upgrade`                            | Upgrade packages to their latest version                    |
| yv    | `yarn version`                            | Update the version of your package                          |
| yw    | `yarn workspace`                          | Run a command within a single workspace.                    |
| yws   | `yarn workspaces`                         | Run a command within all defined workspaces.                |

### RSync

| Alias               | Command                                          |
| ------------------- | ------------------------------------------------ |
| *rsync-copy*        | `rsync -avz --progress -h`                       |
| *rsync-move*        | `rsync -avz --progress -h --remove-source-files` |
| *rsync-update*      | `rsync -avzu --progress -h`                      |
| *rsync-synchronize* | `rsync -avzu --delete --progress -h`             |
