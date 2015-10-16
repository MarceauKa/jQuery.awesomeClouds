/*
 *
 * @package jQuery awesomeClouds
 * @author 	Marceau Casals <marceau@casals.fr>
 * @doc 	https://github.com/AkibaTech/jQuery.awesomeClouds
 * @url 	https://marceau.casals.fr
 * @version 0.1.0
 *
 */
;(function($) {

	$.fn.awesomeClouds = function( options ) {

		// Options par défaut
		var settings = $.extend({
			// Le plugin doit-il démarrer automatiquement
			autoInit: true,
			// Le plugin doit-il afficher son debug dans la console ?
			verbose: false,
			// Fréquence ou "chance" d'apparition d'un nuage
			frequency : 5,
			// Nombre de ticks par seconde. Nombre de fois par seconde ou le plugin va tenter d'afficher un nuage
			ticks : 5, 
			// Le HTML à utiliser pour la gération du nuage
			html: '<div class="cloud" />', 
			// Padding haut ou aucun nuage n'apparaitra, en nombre
			paddingTop: 20,
			// Padding bas ou aucun nuage n'apparaitra, en nombre
			paddingBottom: 20,
			// Coef maximum de réduction du nuage
			minScale: 0.8, 
			// Coef maximum d'agrandissement du nuage
			maxScale: 1.2, 
			// Durée minimale de transition
			minDuration: 6000, 
			// Durée maximale de transition
			maxDuration: 12000, 
			// Easing pour le fondu d'opacité
			easingOpacity: 'linear', 
			// Easing pour le déplacement
			easingLeft: 'swing', 
			// Désactive le plugin pour les navigateurs mobiles
			disableMobile: false,
			// CALLBACK : Appelé lors de la création d'un nouveau nuage
			beforeAdd: function(parent, cloud) { },
			// CALLBACK : Appelé après l'insertion d'un nuage dans le parent
			afterAdd: function(parent, cloud) { },
			// CALLBACK : Appelé à la fin de l'animation d'un nuage
			afterAnimated: function(parent, cloud) { }
		}, options);

			// Stocke "this" en privée
		var that = this, 
			// Stocke l'élément HTML parent
			el = $(this),
			// Détecte si le client est un mobile
			isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
			// Hauteur de la vue
			vHeight = el.height(),
			// Largeur de la vue 
			vWidth  = el.width(),
			// Durée de rafraîchissement
			vDuration = 100,
			// Stocke le ticker
			vTicker = false;


		/**
		 * Affiche un debug
		 *
		 * @param	string 	message
		 * @return	void
		 */
		this.debug = function(message) {
			if (settings.verbose === true) {
				console.log('awesomeClouds : ' + message);
			}
		}

		/**
		 * Initialise le calcul du viewport
		 * 
		 * @param	void
		 * @return	void
		 */
		this.initViewport = function() {
			vHeight = el.height();
			vWidth  = el.width();

			this.debug('View height setted to "'+vHeight+'px" and View width setted to "'+vWidth+'px"');
		}

		/**
		 * Initialise le ticker
		 * 
		 * @param	void
		 * @return	void
		 */
		this.initTicker = function() {
			vDuration = Math.round(1000 / settings.ticks);

			if (settings.disableMobile && isMobile) {
				this.debug('Disabled for mobile');
				return;
			}

			vTicker = setInterval(function() {

				var chance = that.randomBetween(1, 100);

				if (settings.frequency > 100 && settings.frequency < 0) {
					settings.frequency = 10;
				}

				if (settings.frequency >= chance) {
					that.addCloud();
				}

			}, vDuration);

			this.debug('Ticker setted to "'+vDuration+'"');
		}

		/**
		 * Met à jour la fréquence d'apparition
		 *
		 * @param 	int 	newFrequency
		 * @return 	void
		 */
		this.updateFrequency = function(newFrequency) {
			if (newFrequency >= 0 && newFrequency <= 100) {
				settings.frequency = newFrequency;
				this.debug('Frequency setted to '+newFrequency);
			} else {
				this.debug('Invalid new frequency');
			}
		};

		/**
		 * Met à jour les ticks
		 *
		 * @param 	int 	newTicks
		 * @return 	void
		 */
		this.updateTicks = function(newTicks) {
			if (newTicks >= 0 && newTicks <= 100) {
				settings.ticks = newTicks;
				this.stop();
				this.start();
				this.debug('Ticks setted to '+newTicks);
			} else {
				this.debug('Invalid new ticks');
			}
		};

		/**
		 * Génère un nombre aléatoirement entre deux nombres
		 * 
		 * @param	int 	min
		 * @param	int 	max
		 * @return	int
		 */
		this.randomBetween = function(min, max) {
			var random = Math.random() * (max - min) + min;
			return random;
		}

		/**
		 * Ajoute un nuage à la vue
		 *
		 * @param	void
		 * @return	void
		 */
		this.addCloud = function() {
			$cloud = $(settings.html);
			settings.beforeAdd(that, $cloud);
			
			$cloud.appendTo(el);
			this.debug('Cloud added...');
			
			settings.afterAdd(that, $cloud);

			that.setRandomPosition($cloud);
			that.setRandomScale($cloud);
			that.animateCloud($cloud);
		}

		/**
		 * Ajoute un facteur de position aléatoire au nuage
		 *
		 * @param	HTMLNode	cloud
		 * @return	void
		 */
		this.setRandomPosition = function(cloud) {
			var elWidth = that.randomBetween((vWidth / 2), vWidth),
				elHeight = that.randomBetween(0+settings.paddingTop, vHeight-settings.paddingBottom);

			this.debug('...at position : '+elWidth+'/'+elHeight);
			cloud.css({'top': elHeight + 'px', 'left': elWidth + 'px'});
		};

		/**
		 * Ajoute un facteur de taille aléatoire au nuage
		 *
		 * @param	HTMLNode	cloud
		 * @return	void
		 */
		this.setRandomScale = function(cloud) {
			var elScale = that.randomBetween(settings.minScale, settings.maxScale);

			this.debug('...at scale : '+elScale);
			cloud.css({
				'-webkit-transform': 'scale('+elScale+')',
				'-moz-transform': 'scale('+elScale+')',
				'transform': 'scale('+elScale+')'
			});
		};

		/**
		 * Stoppe le plugin
		 *
		 * @param	void
		 * @return	void
		 */
		this.stop = function() {
			that.debug('Stop!');
			clearInterval(vTicker);
		}

		/**
		 * Démarre le plugin
		 *
		 * @param	void
		 * @return	void
		 */
		this.start = function() {
			that.debug('Start!');
			that.initViewport();
			that.initTicker();
		}

		/**
		 * Applique une animation au nuage
		 *
		 * @param	HTMLNode	cloud
		 * @return	void
		 */
		this.animateCloud = function(cloud) {

				// Durée aléatoire pour l'animation
			var longDuration  = this.randomBetween(settings.minDuration, settings.maxDuration),
				// Durée courte (pour l'opacité)
				shortDuration = Math.round(longDuration / 2),
				// Nouvelle position "left" de l'élément
				newLeft		  = this.randomBetween(0, vWidth / 2);
			
			this.debug('...with duration : '+longDuration);

			cloud
				.css('opacity', 0)
				.animate(
					{ 'opacity': 1 },
					{
						duration: shortDuration,
						queue: false,
						easing: settings.easingOpacity,
						done: function() {
							$(this).animate(
								{ 'opacity': 0 },
								{
									duration: shortDuration,
									easing: settings.easingOpacity
								}
							);
						}
					}
				)
				.animate(
					{ 'left': newLeft + 'px' },
					{ 
						duration: longDuration, 
						queue: false,
						easing: settings.easingLeft,
						start: function() {
							that.debug('...start animation from '+Math.round(cloud.offset().left)+'px to '+newLeft+'px');
						},
						done: function() {
							settings.afterAnimated(that, $(this));
							$(this).remove();
						}
					}
				);
		};

		// Démarre le plugin si la config le veut
		if (settings.autoInit) {
			that.start();
		}

		// Prend en charge le redimenssionnement
		$(window).on('resize', function(){
			that.debug('New viewport!');
			that.initViewport();
		});

		return that;

	};

}(jQuery));