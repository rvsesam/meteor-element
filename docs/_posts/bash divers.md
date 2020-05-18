---
title: Divers Shell
date: 2020-04-30
tags:
- terminal
- zsh
author: PM
category: shell
top: 2
location: Kampot
---

### [Boucler sur les champs de ligne en awk](http://www.ixany.org/2014/11/01/Boucler-sur-les-champs-de-ligne-en-awk.html)

Étiquettes : shel, awk. Écrit le 01/11/2014.

Sous *awk*, si on veut effectuer une boucle sur un nombre variable de champs d’une ligne, il suffit de se rappeler que le nombre de champs d’une ligne est conservé dans la variable `NF`, et que la valeur d’un champ peut être lu en préfixant une variable numérique par `$` (donc, si la variable `i` vaut *3*, alors `$i` est équivalent à `$3` et donne la valeur du troisième champ de la ligne en cours).

Voici par exemple un fichier contenant une liste d’utilisateurs dont le nom est donné dans le premier champ de chaque ligne, suivi d’un nombre variable d’entiers (désignant par exemple des numéro de loto qu’il a reçu) :

```bash
$ cat loto.txt
# Prénom liste_des_numéros
Philip 2 65 12 96
Turanga 55 34 82
Hubert 23
Amy 44 12 9 24
Hermes 32 99 8
```

Le petit programme awk appelé d’un shell ci-dessous parcourt le fichier *loto.txt* et affiche une ligne par numéro attribué à une personne (les lignes commençant par `#` sont ignorées) :

```bash
$ awk '
  /^#/ { next }
  {
      for (i=2; i<=NF; i++) {
          printf "%s a reçu le numéro %d\n", $1, $i
      }
  }
  ' loto.txt
Philip a reçu le numéro 65
Philip a reçu le numéro 12
Philip a reçu le numéro 96
Turanga a reçu le numéro 55
Turanga a reçu le numéro 34
Turanga a reçu le numéro 82
Hubert a reçu le numéro 23
...
```

### [Parcourir les paramètres positionnels d'un script shell... dans les deux sens](http://www.ixany.org/2014/10/19/Parcourir-les-parametres-d-un-script-shell.html)

Étiquettes : shell, bash. Écrit le 19/10/2014.

Pour traiter un à un les paramètres positionnels passés à un script ou une fonction shell, on utilise simplement une boucle `for` de ce genre :

```
for arg
do
    # faire quelque chose avec $arg
    echo "argument $arg";
done
```

Utilisé sans clause « `in ...` », `for` effectue une boucle sur tous les paramètres positionnels, ce qui revient donc au même que d’utiliser « `for arg in $@` ».

Mais parcourir la liste de ces paramètres *à l’envers* n’est pas beaucoup plus difficile, grâce à une petite astuce :

```
for i in $(seq $# -1 1)
do
    arg=${!i}
    # faire quelque chose avec $arg
    echo "argument $arg";
done
```

`for` boucle ici sur les numéros de paramètres qu’on veut traiter, du dernier paramètre, donné par la variable `$#`, au premier, numéroté `1` (`$0` n’est pas un paramètre, mais le nom du script).

> *Note* : on a recours à la commande `seq` car le générateur de série interne à bash (du type `{10..1}`) utilise les accolades qui sont évaluées *avant* le remplacement des variables. On ne peut donc **pas** écrire quelque chose comme « `{$#..1}` ».

Ensuite, pour lire la valeur du paramètre positionnel (contenue dans `$4`, `$3`, …), on introduit un niveau d’imbrication de variable grâce au point d’exclamation : il indique qu’on veut lire la valeur d’une variable dont le nom est contenu dans une autre variable.

Ainsi, si `$i` contient `3`, `${!i}` sera remplacé par la valeur de la variable `$3`, donc le troisième argument positionnel du script ou de la fonction. Et ça tombe plutôt bien, c’est ce qu’on voulait !

> *Corolaire* : *le dernier paramètre* d’un script peut donc être lu directement grâce à l’expression « `${!#}` » dont l’explication ne peut plus vous échapper :)

Et si vous voulez boucler sur un sous-ensemble des paramètres positionnels, voir mon astuce « [Accéder facilement aux arguments d’un script shell](http://www.ixany.org/2014/10/16/Acceder-aux-arguments-du-script-shell.html) ».

### [Accéder facilement aux arguments d'un script shell](http://www.ixany.org/2014/10/16/Acceder-aux-arguments-du-script-shell.html)

Étiquettes : shell, bash. Écrit le 16/10/2014.

Dans un script ou une fonction shell, on a souvent besoin d’accéder aux arguments qui lui ont été passés. C’est simple quand on connaît précisément son indice dans la liste des arguments, grâce aux paramètres positionnels `$1`, `$2`, …, `$n`.

Mais il est également possible d’accéder à un paramètre dont on connaît la position depuis *la fin* de la liste des paramètres :

```
$ function f() {
    echo "mon avant-dernier paramètre est '${@: -2:1}'"
}
$ f un deux trois    
mon avant-dernier paramètre est 'deux'
```

> *Attention* : il ne faut pas oublier de placer une espace entre le deux-points et le tiret, pour éviter que bash ne confonde avec « `:-` » qui représente l’utilisation de valeur par défaut.

On peut également récupérer, par exemple, une liste de deux paramètres avec quelque chose comme `${@:2:2}` ou `${@: -4:2}`, les cinq derniers avec `${@: -5}`, ou encore le dernier argument avec `${@: -1}`.

Pour plus de détails sur les expressions du type `${paramètre:début:longueur}`, voir ma documentation sur la [manipulation des chaînes de caractères et des tableaux en bash](http://www.ixany.org/docs/Shell_Manipulation_chaines_et_tableaux_en_bash.html).

### [Limiter rsync à un répertoire](http://www.ixany.org/2014/10/14/Limiter-rsync-a-un-repertoire.html)

Étiquettes : rsync, shell, GNU. Écrit le 14/10/2014.

Lors de la mise en place de synchronisations automatisées des données à l’aide de [rsync](http://manpages.debian.org/cgi-bin/man.cgi?query=rsync&apropos=0&sektion=0&manpath=Debian+7.0+wheezy&format=ascii&locale=en), il est souvent souhaitable de limiter ses accès à un répertoire particulier, parfois même en lecture seule.

C’est possible lors de l’utilisation d’un daemon *rsyncd*, mais cette solution ne permet pas le chiffrement des données lors de leur transfert sur le réseau. L’utilisation de *rsync sur ssh* résoud ce problème, mais ne permet pas de bénéficier des fonctionnalités de *rsyncd*.

Le script perl « *rrsync* » fourni avec *rsync* permet heureusement de retrouver ces fonctionnalités avec rsync sur ssh.

Cette solution s’appuie sur la possibilité qu’offre *openssh* de forcer l’exécution d’un script lors de l’utilisation d’une clef ssh. Ce script ayant accès à la commande originale envoyée par le programe *rsync* distant, il peut la contrôler avant de l’exécuter ou non (voir [ma documentation sur les options associées à une clef ssh](http://www.ixany.org/docs/OpenSSH_limiter_une_clef_ssh.html#command)).

En pratique, il faut donc générer une clef ssh dédiée à ces synchronisations de données sur la machine qui initie le transfert *rsync* (ici *machine1*), et la copier sur la machine où se trouvent les données d’origine (*machine2*) :

```
machine1$ ssh-keygen -f ~/.ssh/id_sauvegardes
machine1$ ssh-copy-id -i ~/.ssh/id_sauvegardes monutilisateur@machine2
```

On configure ensuite *machine2* pour forcer l’utilisation de *rrsync* lors des connexions utilisant cette clef en modifiant la ligne ajoutée par *ssh-copy-id* dans le fichier *~/.ssh/config*, pour y préciser l’option « *command* » (sur la même ligne, juste avant le type de la clef) :

```
machine2$ editor ~/.ssh/authorized_keys
...
command="rrsync -ro /srv/results" ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEAmkHG1WCjC...
```

`/srv/results` est ici le répertoire contenant les données auxquelles *machine1* aura accès. L’option `-ro` est facultative et n’autorisera que les accès en lecture aux données (c’est à dire les transferts *rsync* dans lesquels *machine2* est l’expéditeur, donc où *rsync* y est invoquée à distance avec l’option interne `--sender`).

Le lancement du transfert *rsync* se fait comme d’habitude sur *machine1*, par exemple avec la commande :

```
machine1$ rsync -e 'ssh -i ~/.ssh/id_sauvegardes' /srv/results/job0/ /srv/jobs/job0
```

L’option `-e` n’est utile que pour fournir l’option `-i` au client *openssh* indiquant la clef à utiliser, mais cela peut aussi bien se faire à l’aide du fichier *~/.ssh/config*.

Sous Debian GNU/Linux, le script perl *rrsync* est fourni avec le paquet *rsync*, mais seulement à titre d’exemple. Vous devrez donc d’abord l’installer dans un répertoire des commandes du système. Par exemple, si */usr/local/bin* est bien contenu dans la variable *$PATH* :

```
gzip -c /usr/share/doc/rsync/scripts/rrsync.gz > /usr/local/bin/rrsync
chmod 755 /usr/local/bin/rrsync
```

Lisez les commentaires du script *rrsync* pour plus d’information sur son fonctionnement. Pour les détails sur les options associées aux clef ssh dans le fichier *~/.ssh/config*, voir [la page de manuel de sshd(8)](http://manpages.debian.org/cgi-bin/man.cgi?query=sshd&apropos=0&sektion=0&manpath=Debian+7.0+wheezy&format=ascii&locale=en), dans sa section « *AUTHORIZED_KEYS FILE FORMAT* », ou [ma documentation sur les options associées à une clef ssh](http://www.ixany.org/docs/OpenSSH_limiter_une_clef_ssh.html).

### [La commande GNU date](http://www.ixany.org/2014/10/04/La-commande-gnu-date.html)

Étiquettes : shell, GNU. Écrit le 04/10/2014.

Vous connaissez probablement déjà les nombreux formats de date et d’heure selon lesquels la commande [GNU](http://www.gnu.org/) date peut afficher ses informations. [La page de manuel de date(1)](http://manpages.debian.org/cgi-bin/man.cgi?query=date&apropos=0&sektion=0&manpath=Debian+7.0+wheezy&format=html&locale=fr) nous renseigne sur ces nombreux formats, désignés de façon similaire à ce que fait « printf » ([la fonction du langage C](http://manpages.debian.org/cgi-bin/man.cgi?query=printf&sektion=3&apropos=0&manpath=Debian+7.0+wheezy&locale=fr), ou [la commande du shell](http://manpages.debian.org/cgi-bin/man.cgi?query=printf&apropos=0&sektion=0&manpath=Debian+7.0+wheezy&format=html&locale=fr)), dans une chaîne de caractères commençant par « + ». En voici un exemple :

```
$ date +"Le %A %e %B %Y à %R (le %j ième jour de l'année)".
Le samedi  4 octobre 2014 à 18:15 (le 277 ième jour de l'année).
```

Mais une fonctionnalité beaucoup moins connue de *date* en fait une commande particulièrement puissante. Elle n’est pourtant évoquée que très discrètement dans [sa page de manuel](http://manpages.debian.org/cgi-bin/man.cgi?query=date&apropos=0&sektion=0&manpath=Debian+7.0+wheezy&format=html&locale=fr), on peut donc facilement passer à côté : il s’agit de l’option « -d », et plus précisément la façon dont on peut désigner la date à afficher.

On peut préciser cette date ou cette heure de façon absolue, comme « 1914-07-28 06:00 » ou « 28 July 1914 17:00 » (seuls les noms en anglais sont reconnus) :

```
$ date -d '1914-07-28 06:00'
mardi 28 juillet 1914, 06:00:00 (UTC+0200)
$ date -d '28 July 1914 06:00:00'
mardi 28 juillet 1914, 06:00:00 (UTC+0200)
```

Mais ce qui est particulièrement pratique, c’est de la désigner de façon relative à l’heure actuelle ou à une date fournie :

```
$ date -d 'yesterday'
vendredi 3 octobre 2014, 18:15:37 (UTC+0200)
$ date -d '2 days ago'
jeudi 2 octobre 2014, 18:15:42 (UTC+0200)
$ date -d 'last monday'
lundi 29 septembre 2014, 00:00:00 (UTC+0200)
$ date -d '1918-11-11 - 4 years'
mercredi 11 novembre 1914, 00:00:00 (UTC+0200)
$ date -d '2000-01-01 - 1 day'
vendredi 31 décembre 1999, 00:00:00 (UTC+0200)
```

Les formats d’entrée de date sont documentés dans la page *info* de date : lancez la commande *info date*, et suivez le lien « *Date input formats::* » (placer le curseur dessus et tapez « Entrée »). Cette page donne des liens vers tous les formats acceptés pour préciser la date à afficher; pour les informations sur les dates relatives, suivre le lien « *Relative items in date strings::* ».

Attention toutefois à quelques subtilités : comme le précise la documentation, le terme « last month » équivaut à « - 30 days ». Il faut donc prendre garde lorsqu’on l’utilise le dernier jour du mois :

```bash
~$ date -d "2014-10-31 last month"
mercredi 1 octobre 2014, 00:00:00 (UTC+0200)
```

Pour obtenir le nom du mois précédent, il faut préciser un jour du mois qui ne posera pas de problème :

```bash
$ date -d "2014-10-01 last month" +%B
septembre
```

En complément, pour obtenir l’heure dans un autre fuseau horaire, il suffit de changer la variable d’environnement *TZ*, soit pour tout le shell (via la commande *export TZ=…*), soit uniquement pour une commande.

Quelle heure est-il actuellement à Hong-Kong :

```
$ TZ="Asia/Hong_Kong" date
dimanche 5 octobre 2014, 00:37:00 (UTC+0800)
```

Mieux encore, comme le montre la documentation de la commande, on peut préciser le fuseau horaire de la date qu’on veut afficher, donc demander par exemple quelle heure il est à Hong-Kong quand il est 18h40 à Port-au-Prince :

```bash
$ TZ="Asia/Hong_Kong" date -d 'TZ="America/Port-au-Prince" 2014-10-04 18:45'
dimanche 5 octobre 2014, 06:45:00 (UTC+0800)
```

Ref: [Documentations informatiques](http://www.ixany.org/))
