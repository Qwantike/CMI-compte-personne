# CMI-compte-personne

Vous trouverez ici le code utilisé pour la conception d'un compte personne, le dossier arduino contient le code a téléversé dans le arduino et le dossier raspberry pi contient le code présent dans celle-ci. 
Il est également nécessaire d'ajouter l'executable websocketd sur la RaspberryPi.
Les étapes de première mise en route :
Côté Arduino, téléverser le code.
Côté Raspberry : 
dans un terminal :

sudo bluetoothctl
agent on
pair <MAC ADDRESS HC-06>
ctrl+z pour quitter bluetoothctl
sudo rfcomm bind 1 <MAC ADDRESS HC-06>

Puis dans le bon répertoire : 

./websocketd --port=8080 --staticdir="/" ./reception-bluetooth.py

navigateur http://localhost/8080
accéder au bon dossier

Pour les prochaines mise en route : 

sudo rfcomm bind 1 <MAC ADDRESS HC-06>
./websocketd --port=8080 --staticdir="/" ./reception-bluetooth.py

navigateur http://localhost/8080
accéder au bon dossier



