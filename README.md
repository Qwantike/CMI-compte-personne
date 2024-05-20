# CMI-compte-personne

Vous trouverez ici le code utilisé pour la conception d'un compte personne, le dossier arduino contient le code a téléversé dans le arduino et le dossier raspberry pi contient le code présent dans celle-ci.   
Il est également nécessaire d'ajouter l'executable websocketd sur la RaspberryPi.  
Les étapes de première mise en route :  
Côté Arduino, téléverser le code.  
Côté Raspberry :   
dans un terminal :  
```bash
sudo bluetoothctl  
agent on  
pair "MAC ADDRESS HC-06"
```
ctrl+z pour quitter bluetoothctl  
```bash
sudo rfcomm bind 0 "MAC ADDRESS HC-06"
```
  ```bash
cd /répertoire content les fichiers
./websocketd --port=8080 --staticdir="/" ./reception-bluetooth.py  
```
navigateur http://localhost/8080  
accéder au bon dossier  
  
Pour les prochaines mise en route :   

```bash
sudo rfcomm bind 0 "MAC ADDRESS HC-06"  
./websocketd --port=8080 --staticdir="/" ./reception-bluetooth.py
```
  
navigateur http://localhost/8080  
accéder au bon dossier  

Auteurs :   
BARTIER Nathan  
MOINEREAU Paul  

