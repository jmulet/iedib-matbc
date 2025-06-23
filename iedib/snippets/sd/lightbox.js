(function () {

    'use strict';

    var leftArrow = '<span>&#10094;</span>';
    var rightArrow = '<span>&#10095;</span>';
 
    var COMPONENT_NAME = 'lightbox';
    if(window.IB.sd[COMPONENT_NAME]) {
        // Already loaded in page
        // Bind any remaining component
        console.error("Warning: "+COMPONENT_NAME+" loaded twice.");
        window.IB.sd[COMPONENT_NAME].bind && window.IB.sd[COMPONENT_NAME].bind();
        return;
    } 
     
    var Lightbox = function(container) {
        // Find all galleries
        this.$gallery = $('[role="snptd_lightbox"]');
        // currentIndex in gallery
        this.currentIndex = -1;
        $.each(this.$gallery, function(i, ele) { 
             if(ele.id ==container.id) {
                 self.currentIndex = i;
                 return false;
             }
        });
        this._setup(container);
    }

    Lightbox.prototype._setup = function(container) {
        var self = this;
        this.id = "snptModal_lightbox";
        this.$container = $(container);
        this.$container.css("cursor", "pointer");
        this.$container.attr("data-toggle", "modal");
        this.$container.attr("data-target", '#'+this.id);
 
        
        //Only one modal per page
        this.$modal = $("#"+this.id);
        if(!this.$modal.length) {
            this.createModal();
        } else {
            this.$img = this.$modal.find('img');
        }

        this.$container.off();
        this.$container.on("click", function(evt) {
            //change src of image in modal
            if(self.$img.length) { 
                // Create image dynamically
                var imgObj = new Image();  
                var src = self.$container.attr("data-src") || self.$container.attr("src");
                imgObj.onload = function() {
                    self._resize(imgObj.width, imgObj.height);
                    // Can provide a highres in data-src
                    self.$img.attr("src", src);
                };
                imgObj.onerror = function(err) {
                    console.error("Cannot load image ", err);
                    self.$img.attr("src", "");
                }
                imgObj.src = src;
            }
        });
    };

    Lightbox.prototype.createModal = function() {
        var self = this;
        var hasGallery = this.$gallery.length > 1;
        var leftArrowHTML = '<a class="left-arrow" href="#">'+leftArrow+'</a>';
        var rightArrowHTML = '<a class="right-arrow" href="#">'+rightArrow+'</a>';
        var modalHTML = $('<div class="modal fade modal-fullscreen-xl" id="'+this.id+'" tabindex="-1" role="dialog">'+
        '<div class="modal-dialog" role="document">'+
            '<div class="modal-content">'+
                '<div class="modal-header bg-dark border-dark"><button type="button" class="close text-white" data-dismiss="modal">&times;</button>'+
                '</div>'+
                '<div class="modal-body p-0" style="text-align:center;">'+
                    (hasGallery? leftArrowHTML : '') +
                    '<img src="">'+
                    (hasGallery? rightArrowHTML : '') +
                '</div>'+
            '</div>'+
        '</div>'+
        '</div>');
        this.$modal = $(modalHTML);
        this.$img = this.$modal.find('img');
        this.$close = this.$modal.find('button');
        $('body').append(this.$modal);

        this.$modal.on("hide.bs.modal", function() { 
            self.$img.attr("src", "");
        });

        $("#modalCloseBtn").on("click", function() {
            self.$img.attr("src", "");
        });

        if(hasGallery) {

            this.$modal.find('.left-arrow').on("click", function(evt) {
                evt.preventDefault();
                self._navigateLeft();
            });

            this.$modal.find('.right-arrow').on("click", function(evt) {
                evt.preventDefault();
                self._navigateRight();
            });

        }
    };

    Lightbox.prototype._resize = function(img_width, img_height) {
        // Resize accordingly to the image
        // Size of browser viewport.
        var img_ratio = 1;
        if(img_height > 0) {
            img_ratio = img_width/img_height;
        }
        var win_width = $(window).height();
        var win_height = $(window).width();
        var win_ratio = 1;
        if(win_height > 0) {
            win_ratio = win_width/win_height;
        }
        if(img_ratio > win_ratio) {
            this.$img.css("width", "initial");
            this.$img.css("height", "100%"); 
        } else {
            this.$img.css("height", "initial");
            this.$img.css("width", "100%"); 
        }
    };

    Lightbox.prototype._navigateLeft = function() {
       if(this.currentIndex==0) {
           this.currentIndex = this.$gallery.length-1;
       } else {
           this.currentIndex -= 1;
       } 
       this._setup(this.$gallery[this.currentIndex]);
    };

    Lightbox.prototype._navigateRight = function() {
        if(this.currentIndex==this.$gallery.length-1) {
            this.currentIndex = 0;
        } else {
         this.currentIndex += 1;
        } 
        this._setup(this.$gallery[this.currentIndex]);
    };

    Lightbox.prototype.dispose = function() {
        this.$container.off();
    };

    var alias = {author: "Josep Mulet", version: "1.0", inst: {}};
    window.IB.sd[COMPONENT_NAME] = alias;
  
     var bind = function() {
        // Cerca tots els contenidors dels components d'aquest tipus
        var componentContainers = document.querySelectorAll('[role="snptd_' + COMPONENT_NAME + '"]');
        // Crea una instància de la classe anterior per a cadascun dels components trobats en la pàgina
        for(var i=0, len=componentContainers.length; i<len; i++) {
            var container = componentContainers[i];
            // Evita que un contenidor pugui ésser tractat més d'una vegada degut a múltiples insercions de la llibreria
            if(container.dataset.active) {
                continue;
            }
            container.dataset.active = "1";

            var instancia = new Lightbox(container);
            // Exposa l'objecte a window per si es volgués emprar la seva API
            // Aquesta seria la forma d'utilitzar comunicació entre components (si fos necessari)
            // s'assegura que el contenidor del component té id, sinó l'assigna
            var id = container.getAttribute("id");
            if(!id) {
                id = "dynamic_"+Math.random().toString(32).substring(2);
                container.id = id;
            }
            window.IB.sd[COMPONENT_NAME].inst[id] = instancia;
        }
    }; 
    alias.bind = bind;
    alias.unbind = function() {
        var lInst = Object.values(alias.inst);
        for(var i=0, l=lInst.length; i<l; i++) {
            lInst[i].dispose(); 
        }
        alias.inst = {};
     };
        
    bind();   

})();
 