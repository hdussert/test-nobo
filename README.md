# Test technique Nobo
```
.
├── app.js
├── errors.js
├── p1.js
├── p2.js
├── package-lock.json
├── package.json
└── test
    └── unit_tests.js
 ```
 
 ## Start
 
 ```npm install && npm start```
 
 ## Unit tests
 
 `npm test` ou `npm run mocha`

## P1 
P1 est accessible à `localhost:4242/api/p1`, prends 2 paramètres en url: une string`str` et un nombre `n`.  
Et retourne la taille de la string divisée par le nombre, précision à 3 digits.

>Exemple: `localhost:4242/api/p1?str=ex&n=6`  
Retourne `0.333`

## P2
P1 est accessible à `localhost:4242/api/p2`, prends 2 dates en paramètres url: `date_start` et `date_end`.  
Et retourne le nombre de jours entre date_start, et le premier jour de son mois.  
Plus le nombre d'heures entre date_end et le dernier jour de son mois.

>Exemple: `localhost:4242/api/p1?sdate_start=2020-06-10&date_end=2020-07-25%2020:00`  
Retourne `14 jours, 4 heures`
