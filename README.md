# jQuery awesomeClouds

jQuery awesomeClouds est un plugin génial qui permet de gérérer tout plein de petits nuages (ou autres...) sur votre page HTML avec pein de paramètres.

![alt tag](https://raw.githubusercontent.com/AkibaTech/jQuery.awesomeClouds/master/example/screenshot.png)

## Installation & utilisation type

On insére le script dans son HTML,

```html
<script src="/path/to/jquery.awesomeClouds.min.js"></script>
```

On ajoute un petit peu de CSS pour notre bôoo nuage,

```css
.cloud {
	display: block;
	position: absolute;
	width: 73px;
	height: 36px;
	background-image: url('cloud.png');
	background-repeat: no-repeat;
	z-index: 1000;
}
```

Et on initialise le script !

```javascript
$('body').awesomeClouds({
	frequency: 5, // 5% de chance d'apparition à chaque 'tick'
	ticks: 5, // Nombre de tick par seconde, ici toutes les 200ms
	html: '<div class="cloud" />' // Le HTML à insérer pour former le nuage
});
```

## Utilisation avancée

```javascript
var $clouds = $('body').awesomeClouds({
	autoInit: false,
	frequency: 10, // 10% de chance d'apparition à chaque 'tick'
	ticks: 10, // Nombre de tick par seconde, ici toutes les 200ms
	html: '<div class="cloud" />', // Le HTML à insérer pour former le nuage
	afterAdd: function(parent, cloud) {
		cloud.css('background-color': 'red');
	}
});

// Lance le plugin
$clouds.start();
```


## Paramètres

### autoInit (bool)
Le plugin doit-il démarrer automatiquement
> Par défaut : true

### verbose (bool)
Le plugin doit-il afficher son debug dans la console ?
> Par défaut : false

### frequency (int)
Fréquence ou "chance" d'apparition d'un nuage
> Par défaut : 5

### ticks (int), 
Nombre de ticks par seconde. Nombre de fois par seconde ou le plugin va tenter d'afficher un nuage
> Par défaut : 5

### html (string)
Le HTML à utiliser pour la gération du nuage
> Par défaut : '\<div class\=\"cloud\" \/\>'

### paddingTop (int)
Padding haut ou aucun nuage n'apparaitra. Sorte d'offset.
> Par défaut : 20

### paddingBottom (int)
Padding bas ou aucun nuage n'apparaitra. Sorte d'offset.
> Par défaut : 20

### minScale (float|int), 
Coef maximum de réduction du nuage
> Par défaut : 0.8

### maxScale (float|int) 
Coef maximum d'agrandissement du nuage
> Par défaut : 1.2

### minDuration (int)
Durée minimale de transition
> Par défaut : 6000

### maxDuration (int) 
Durée maximale de transition
> Par défaut : 12000

### easingOpacity (string) 
Easing pour le fondu d'opacité
> Par défaut : 'linear'

### easingLeft (string)
Easing pour le déplacement
> Par défaut : 'swing'

### disableMobile (bool)
Désactive le plugin pour les navigateurs mobiles
> Par défaut : false

## Callbacks

### beforeAdd (callable),
CALLBACK : Appelé lors de la création d'un nouveau nuage.
> Signature : parent, cloud (l'élement html nouvellement créé)

### afterAdd (callable)
CALLBACK : Appelé après l'insertion d'un nuage dans le parent
> Signature : parent, cloud (l'élément html nouvellement inséré dans le DOM)

### afterAnimated (callable)
CALLBACK : Appelé à la fin de l'animation d'un nuage
> Signature : parent, cloud (l'élément html dont l'animation vient de se terminer et qui sera supprimé du DOM)

## Méthodes

### start (void)
Lance la boucle.

### stop (void)
Arrête le script.

## A propos

Un script vraiment fait à la va-vite pour le fun.
Attention niveau performance, cela reste de l'animation via jQuery et ça peut vite devenir lourd...

Réalisé par [Marceau Casals].

## Licence

WTFPL - Do What The Fuck You Want To Public License.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE Version 2, December 2004

Copyright (C) 2004 Sam Hocevar sam@hocevar.net

Everyone is permitted to copy and distribute verbatim or modified copies of this license document, and changing it is allowed as long as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

You just DO WHAT THE FUCK YOU WANT TO.

[Marceau Casals]: <https://marceau.casals.fr>