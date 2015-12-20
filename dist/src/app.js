(function() {Trio.Module.export('/Users/jacky.chan/Projects/chikei.io/client/src/modules/theme/factory/themeFactory.js',function() {
	var ThemeFactory = Trio.Factory.extend({
		initialize: function() {
			this.sync('ViewConfig', function(d) {
				if (d && d.attributes) {
					var theme = d.attributes.theme;
					this.theme = theme;
					this.updateCSSVariables(theme);
				}
			}.bind(this))
		},
		updateCSSVariables: function(theme) {
			Trio.Stylizer.registerVariable('base-color', theme.baseColor);
			Trio.Stylizer.registerVariable('layout-color', theme.layoutColor);
			Trio.Stylizer.registerVariable('theme-color', theme.themeColor);
			this.broadcast('theme:update');
		}
	});

	return ThemeFactory;
});})();
(function() {Trio.Module.export('/Users/jacky.chan/Projects/chikei.io/client/src/modules/canvas/component/canvasComponent.js',function(ret) {
    var style = Trio.Stylizer.create();
        style.select(':host')
                .css({
                    'display': 'flex',
                    'flex': '1 0 auto',
                    'cursor': 'default'
                });

    var tmpl = Trio.Renderer.createTemplate();
        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .each(function(d) {return d.icons;})
                .open('ck-icon')
                    .attr('data-module-id', function(icon) { return icon.moduleId; })
                    .data(function(icon) { return icon; })
                .close()
            .xeach();

    return Trio.Component.register({
        tagName: 'ck-canvas',
        template: tmpl,
        onCreate: function() {
            this.on('render', function(evt) {
                this.patch(evt.detail);
            }.bind(this));

            this.on('addModuleToCanvas', function(e) {
                this.shadowRoot.appendChild(e.detail.module);
            }.bind(this))
        }
    });
});
})();
(function() {var viewConfig = {
    icons: [
        {
            iconUrl: './src/assets/images/icons/icon-blog-48.png',
            iconName: 'Blog Reader',
            position: {
                x: 4,
                y: 4
            },
            moduleId: 'Y2hpa2VpLmlvIEJsb2dz'
        },
        // {
        //     iconUrl: '/src/assets/images/icons/icon-blog-48.png',
        //     iconName: 'Demo',
        //     position: {
        //         x: 4,
        //         y: 104
        //     }
        // }
    ]
}

var modulesInfo = {
    'Y2hpa2VpLmlvIEJsb2dz': {
        moduleName: 'Blog Reader',
        moduleId: 'Y2hpa2VpLmlvIEJsb2dz',
        moduleType: 'application',
        size: {
            minWidth: 800,
            minHeight: 600,
            width: null,
            height: null,
            maxWidth: null,
            maxHeight: null
        },
        context: {
            appType: 'blog'
        }
    }
}

Trio.Module.export('/Users/jacky.chan/Projects/chikei.io/client/src/modules/canvas/factory/canvasFactory.js',function() {
    var CanvasFactory = Trio.Factory.extend({
        initialize: function() {
            this.attributes = viewConfig;
        }

        // fetchViewConfig: function() {
        //     this.set(viewConfig);
        //     return viewConfig;
        // },

        // fetchModule: function(id) {
        //     return modulesInfo[id];
        // }
    });

    return CanvasFactory;
});})();
(function() {Trio.Module.export('/Users/jacky.chan/Projects/chikei.io/client/src/modules/layout/component/layoutComponent.js',function() {
    var style = Trio.Stylizer.create();
        style.select(':host')
                .css({
                    'display': 'flex',
                    'flex': '1 1 auto',
                    'width': '100%',
                    'height': '100%',
                    'flex-flow': 'column nowrap'
               })
            .select('#header')
                .css({
                    'display': 'flex',
                    'background-color': 'rgba($base-color, 0.9)',
                    'width': '100%',
                    'height': '50px',
                    'flex-shrink': '0'
                })
            .select('#canvas')
                .css({
                    'display': 'flex',
                    'width': '100%',
                    'overflow': 'auto',
                    'flex': '1 0 auto'
                })
            .select('#main')
                .css({
                    'display': 'flex',
                    'flex': '0 1 auto',
                    'flex-flow': 'column nowrap',
                    'height': '100%'
                });

    var tmpl = Trio.Renderer.createTemplate();
        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .open('div#main')
                .doNotPatch()
                .open('div#canvas')
                    .style('background-image', function(d) { return 'url(' + d.backgroundUrl + ')';})
                .close()
                .open('div#header').close()
            .close();

    var LayoutComponent = Trio.Component.register({
        tagName: 'ck-layout',
        template: tmpl,
        onCreate: function() {
            this.header   = this.shadowRoot.querySelector('#header');
            this.canvas   = this.shadowRoot.querySelector('#canvas');
            this.main     = this.shadowRoot.querySelector('#main');

            this.on('header:started', function(d) {
                this.header.innerHTML = '';
                this.header.appendChild(d.detail.header);
            }.bind(this));

            this.on('canvas:started', function(d) {
                this.canvas.innerHTML = '';
                this.canvas.appendChild(d.detail.canvas);
            }.bind(this));

            this.on('update:background', function(evt) {
                this.canvas.style['background-image'] = 'url(' + evt.detail + ')';
            }.bind(this));

            this.on('theme:update', function(evt) {
                this.patch();
            }.bind(this));
        },

        changeBackground: function(url) {
            this.main.style['background-image'] = 'url(' + url + ')';
        }
    });

    return LayoutComponent;

});

})();
(function() {Trio.Module.export('/Users/jacky.chan/Projects/chikei.io/client/src/modules/header/component/headerComponent.js',function(ret) {
    var style = Trio.Stylizer.create();
        style.select(':host')
                .css({
                    'display': 'flex',
                    'flex': '1 0 auto',
                    'flex-flow': 'row nowrap',
                    'height': '100%',
                    'background-color': 'rgba($base-color, 0.9)'
                })
            .select('.header-content')
                .css({
                    'color': 'white',
                    'display': 'inline-flex',
                    'align-items': 'center',
                    'height': '100%',
                    'flex': '1 0 auto',
                    'border': '1px solid rgba($layout-color, 0.1)',
                    'border-top': 'none',
                    'border-bottom': 'none',
                });

    var tmpl = Trio.Renderer.createTemplate();

        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .open('ck-logo').close()
            .open('span.header-content').close()
            .open('ck-clock').close();

    return Trio.Component.register({
        tagName: 'ck-header',
        template: tmpl
    });
});
})();
(function() {Trio.Module.export('/Users/jacky.chan/Projects/chikei.io/client/src/modules/layout/factory/layoutFactory.js',function() {
    var LayoutFactory = Trio.Factory.extend({
        initialize: function() {
            this.sync('ViewConfig', function(d) {
            	if (d && d.attributes) {
	            	this.attributes.backgroundUrl = d.attributes.backgroundUrl;
	            	this.emit('update:background', this.attributes.backgroundUrl);
            	}
            }.bind(this));
        }
    });

    return LayoutFactory;
});})();
(function() {Trio.Module.export('/Users/jacky.chan/Projects/chikei.io/client/src/modules/header/factory/headerFactory.js',function() {
    var HeaderFactory = Trio.Factory.extend({});

    return HeaderFactory;
});})();
(function() {Trio.Module.export('/Users/jacky.chan/Projects/chikei.io/client/src/common/components/icon/icon.js',function() {
    var style = Trio.Stylizer.create();
        style.select(':host')
            .css({
                'position': 'absolute',
                'display': 'flex',
                'flex-flow': 'column nowrap',
                'align-items': 'center',
                'margin': '4px'
            })
            .select('.icon-pic')
                .css({
                    'width': '48px',
                    'height': '48px',
                    'padding': '12px 12px 4px 12px',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center center',
                    'background-size': '48px',
                    'cursor': 'default',
                    'border-top-left-radius': '2px',
                    'border-top-right-radius': '2px'
                })
        .select('.icon-name')
            .css({
                'font-size': '0.6em',
                'color': 'white',
                'text-align': 'center',
                '-webkit-user-select': 'none',
                'width': '72px',
                'overflow': 'hidden',
                'text-overflow': 'ellipsis',
                'white-space': 'nowrap',
                'text-shadow': '0px 1px 3px black',
                'padding-bottom': '4px',
                'font-weight': '600',
                'border-bottom-left-radius': '2px',
                'border-bottom-right-radius': '2px'
            });

    var tmpl = Trio.Renderer.createTemplate();
        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .open('div.icon-pic')
                .style('background-image', function(d) { 
                    return 'url(' + d.iconUrl + ')';
                })
            .close()
            .open('div.icon-name').text(function(d) { return d.iconName; }).close();

    return Trio.Component.register({
        tagName: 'ck-icon',

        template: tmpl,
        
        origin: {
            x: null,
            y: null
        },
        
        start: {
            x: null,
            y: null
        },
        
        onCreate: function() {
            this.moduleId = this.getAttribute('data-module-id');
            this.onDragStart = this.onDragStart.bind(this);
            this.onDragging = this.onDragging.bind(this);
            this.onDragEnd = this.onDragEnd.bind(this);
            this.openModule = this.openModule.bind(this);
            this.name = this.shadowRoot.querySelector('.icon-name');
            this.pic = this.shadowRoot.querySelector('.icon-pic');
            this.addEventListener('mousedown', this.onDragStart);
            this.addEventListener('dblclick', this.openModule);
        },

        setPosition: function(opt) {
            this.style.top = opt.y + 'px';
            this.style.left = opt.x + 'px';
        },

        onDragStart: function(e) {
            if (e.which !== 1) {
                return;
            }
            this.origin.x = this.offsetLeft;
            this.origin.y = this.offsetTop;
            this.start.x = e.pageX;
            this.start.y = e.pageY;
            this.name.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            this.pic.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            this.style.opacity = '0.5';
            window.addEventListener('mouseup', this.onDragEnd);
            window.addEventListener('mousemove', this.onDragging);
        },

        onDragging: function(e) {
            this.style.top = (this.origin.y + (e.pageY - this.start.y)) + 'px';
            this.style.left = (this.origin.x + (e.pageX - this.start.x)) + 'px';
        },

        onDragEnd: function() {
            this.name.style.backgroundColor = '';
            this.pic.style.backgroundColor = '';
            this.style.opacity = '1';
            window.removeEventListener('mouseup', this.onDragEnd);
            window.removeEventListener('mousemove', this.onDragging);
        },

        openModule: function() {
            this.broadcast('module:open', { moduleId: this.moduleId });
        }
    });
});})();
(function() {Trio.Module.export('/Users/jacky.chan/Projects/chikei.io/client/src/common/components/module/module.js',function() {
    var style = Trio.Stylizer.create();
        style.select(':host')
                .css({
                    'position': 'absolute',
                    'display': 'flex',
                    'flex-flow': 'column nowrap',
                    'height': '400px',
                    'width': '600px',
                    'background-color': 'rgba($base-color, 0.9)',
                    'border-radius': '2px',
                    "box-shadow": '0px 0px 3px $shadow-color'
                })
            .select('.module-header')
                .css({
                    'display': 'flex',
                    'flex-flow': 'row nowrap',
                    'flex': '0 0 auto',
                    'height': '30px',
                    'background-color': '$base-color',
                    'border-top-right-radius': '2px',
                    'border-top-left-radius': '2px',
                    'cursor': 'move'
                })
            .select('.module-title')
                .css({
                    'color': '$layout-color',
                    'font-size': '0.8em',
                    'flex': '1 0 auto',
                    'display': 'flex',
                    'align-items': 'center',
                    '-webkit-user-select': 'none',
                    'margin': '4px 8px',
                    'font-weight': '600'
                })
            .select('.module-button')
                .css({
                    'display': 'flex',
                    'align-items': 'center',
                    '-webkit-user-select': 'none',
                    'margin': '4px 8px',
                    'width': '48px',
                    'justify-content': 'flex-end'
                })
            .select('.module-content')
                .css({
                    'display': 'flex',
                    'flex': '1 0 auto',
                    'border-bottom-right-radius': '2px',
                    'border-bottom-left-radius': '2px',
                    'height': 'calc(100% - 30px)',
                    'overflow': 'hidden'
                })
            .select('.button')
                .css({
                    'width': '12px',
                    'height': '12px',
                    'border-radius': '50%',
                    'cursor': 'pointer',
                    'opacity': '0.9'
                })
            .select('.button:hover')
                .css({
                    'opacity': '1'
                })
            .select('.button:active')
                .css({
                    'opacity': '0.8'
                })
            .select('.button.close-module')
                .css({
                    'background-color': '#FF3B3B',
                })
            .select('iframe')
                .css({
                    'flex': '1 1 auto',
                    'border': 'none'
                });

    var tmpl = Trio.Renderer.createTemplate();
        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .open('div.module-header')
                .open('div.module-title').text(function(d) { return d.moduleName; }).close()
                .open('div.module-button')
                    .open('div.button').addClass('close-module').close()
                .close()
            .close()
            .open('div.module-content').close();

    return Trio.Component.register({
        tagName: 'ck-module',

        template: tmpl,
        
        origin: {
            x: null,
            y: null
        },
        
        start: {
            x: null,
            y: null
        },
        
        events: {
            'mousedown .close-module': 'stopPropagation',
            'click .close-module': 'destroy'
        },

        onCreate: function() {
            this.onDragStart = this.onDragStart.bind(this);
            this.onDragging = this.onDragging.bind(this);
            this.onDragEnd = this.onDragEnd.bind(this);
            this.header = this.shadowRoot.querySelector('.module-header');
            this.moduleContent = this.shadowRoot.querySelector('.module-content');
            this.moduleName = this.shadowRoot.querySelector('.module-title');
            this.header.addEventListener('mousedown', this.onDragStart);
            // ret.resizable.initResizable.call(this, ['south', 'north', 'east', 'west', 'north-west', 'north-east', 'south-west', 'south-east']);
        },

        addModuleContent: function(el) {
            this.moduleContent.appendChild(el);
        },

        setTitle: function(title) {
            this.moduleName.textContent = title;
        },

        setPosition: function(opt) {
            this.style.top = opt.y + 'px';
            this.style.left = opt.x + 'px';
        },

        setSize: function(opts) {
            this.style.height = opts.height + 'px';
            this.style.width = opts.width + 'px';
        },

        onDragStart: function(e) {
            if (e.which !== 1) {
                return;
            }
            this.origin.x = this.offsetLeft;
            this.origin.y = this.offsetTop;
            this.start.x = e.pageX;
            this.start.y = e.pageY;
            this.style.opacity = '0.5';
            window.addEventListener('mouseup', this.onDragEnd);
            window.addEventListener('mousemove', this.onDragging);
        },

        onDragging: function(e) {
            this.style.top = (this.origin.y + (e.pageY - this.start.y)) + 'px';
            this.style.left = (this.origin.x + (e.pageX - this.start.x)) + 'px';
        },

        onDragEnd: function() {
            this.style.opacity = '1';
            window.removeEventListener('mouseup', this.onDragEnd);
            window.removeEventListener('mousemove', this.onDragging);
        },

        stopPropagation: function(e) {
            e.stopImmediatePropagation();
        },

        destroy: function(e) {
            this.dispatchEvent(new Event('destroy'));
            this.remove();
        }
    });
});})();
(function() {Trio.Module.export('/Users/jacky.chan/Projects/chikei.io/client/src/common/components/logo/logo.js',function() {
    var style = Trio.Stylizer.create();
        style.select(':host')
                .css({
                    'color': '$layout-color',
                    'display': 'inline-flex',
                    'align-items': 'center',
                    'height': '100%',
                    'padding': '0 12px',
                    'cursor': 'default'
                 })
            .select('.logo-first')
                .css({
                    'color': '$theme-color',
                    'font-weight': '700',
                    'font-size': '1.7em',
                    'letter-spacing': '-2px'
                 })
            .select('.logo-last')
                .css({
                    'font-weight': '100',
                    'font-size': '1.5em'
                });

    var tmpl = Trio.Renderer.createTemplate();
        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .open('span.logo-first').text('CHIKEI').close()
            .open('span.logo-last').text('CHAN').close();


    return Trio.Component.register({
        tagName: 'ck-logo',
        template: tmpl,
    });
});})();
(function() {Trio.Module.export('/Users/jacky.chan/Projects/chikei.io/client/src/common/components/clock/clock.js',function() {
    var style = Trio.Stylizer.create();
        style.select(':host')
                .css({
                   'color': '$layout-color',
                   'display': 'inline-flex',
                   'align-items': 'center',
                   'height': '100%',
                   'padding': '0 12px',
                   'cursor': 'pointer'
                })
            .select(':host(:hover)')
                .css({
                   'background-color': 'rgba($layout-color, 0.1)'
                })
            .select(':host(:active)')
                .css({
                   'background-color': 'rgba($base-color, 0.1)'
                })
            .select('span')
                .css({
                   '-webkit-user-select': 'none'
                })
            .select('.clock-day')
                .css({
                   'margin-right': '0.2em',
                   'color': '$theme-color',
                   'font-weight': '700'
                })
            .select('.clock-minute')
                .css({
                   'margin-right': '0.1em'
                });

    var tmpl = Trio.Renderer.createTemplate();
        tmpl.open('style').text(style.toCSS.bind(style)).close()
            .open('span.clock-day').text(function(d) {return d.day}).close()
            .open('span.clock-hour').text(function(d) {return d.hour}).close()
            .open('span.clock-colon').text(':').close()
            .open('span.clock-minute').text(function(d) {return d.minute}).close()
            .open('span.clock-meridiem').text(function(d) {return d.meridiem}).close();

    var dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return Trio.Component.register({
        tagName: 'ck-clock',
        template: tmpl,

        onAttach: function() {
            this.updateTime();
        },

        getUpdatedTime: function() {
            var timeNow = new Date();
            var min = timeNow.getMinutes();

            return {
                day: dayMap[timeNow.getDay()],
                hour: timeNow.getHours(),
                minute: min < 10 ? '0' + min : '' + min,
                meridiem: timeNow.getHours() < 12 ? 'AM' : 'PM'
            };
        },

        updateTime: function() {
            this.patch(this.getUpdatedTime());
            setTimeout(this.updateTime.bind(this), 60000);
        }
    });
});})();
(function() {Trio.Module.export('/Users/jacky.chan/Projects/chikei.io/client/src/resources/ViewConfig/ViewConfig.js',function() {
	Trio.Resource.register({
		name: 'ViewConfig',
		initialize: function() {
			this.getConfig();
		},
		interceptRequest: function(req) {
			req.setHeader('X-Parse-Application-Id', 'CQkkRpffa1guYEB1AprsuLXerAsROUZhBQaaEQQ2');
			req.setHeader('X-Parse-REST-API-Key', 'wvcaXvTiKobyawiwOCcgcYYSKEqrvplyOsq8QpNc');
		},
		interceptResponse: function(res) {
			return JSON.parse(res.responseText).results[0];
		},
		setConfig: function(config, cb) {
			this.sendRequest({
				type: 'post',
				url: 'https://api.parse.com/1/classes/viewConfig',
				payload: JSON.stringify(config)
			}, cb);
		},
		getConfig: function() {
			this.sendRequest({
				type: 'get',
				url: 'https://api.parse.com/1/classes/viewConfig'
			}, function(d) {
				this.attributes = d;
				this.hasBeenUpdated();
			}.bind(this));
		}
	})
});
})();
(function() {Trio.Module.import([
	'/Users/jacky.chan/Projects/chikei.io/client/src/modules/theme/factory/themeFactory.js'
]).and.export('/Users/jacky.chan/Projects/chikei.io/client/src/modules/theme/theme.js',function(ThemeFactory) {
	var ThemeService = Trio.Service.extend({
		onStart: function() {
			this.factory = new ThemeFactory();
		}
	});

	new ThemeService().start();
});})();
(function() {Trio.Module.import([
    '/Users/jacky.chan/Projects/chikei.io/client/src/modules/canvas/factory/canvasFactory.js',
    '/Users/jacky.chan/Projects/chikei.io/client/src/modules/canvas/component/canvasComponent.js'
]).and.export('/Users/jacky.chan/Projects/chikei.io/client/src/modules/canvas/canvas.js',function(canvasFactory, canvasComponent) {
    var CanvasService = Trio.Service.extend({
        onStart: function(opts) {
            var factory   = new canvasFactory({});
            var component = canvasComponent.createElement();
            this.implement(factory);
            this.implement(component);
            this.broadcast('canvas:started', {canvas:component});
            this.emit('render', factory.attributes);

            this.on('module:open', function(e) {
                this.openModule(e.detail);
            }.bind(this))
        },

        openModule: function(iconOpts) {
            // if (this.factory.activeModules[iconOpts.moduleId]) {
            //     return;
            // }

            var module = document.createElement('ck-module');
            // var data = this.factory.fetchModule(iconOpts.moduleId);

            // this.setActiveModule(iconOpts.moduleId, module);
            // module.addEventListener('destroy', this.clearActiveModule.bind(this, iconOpts.moduleId));

            // module.setTitle(data.moduleName);
            // setModuleSize.call(this);
            // module.setPosition({
            //     x: this.component.clientWidth/8,
            //     y: this.component.clientHeight/8
            // });

            // this.component.addToCanvas(module);
            this.emit('addModuleToCanvas', { module: module});
            // module.addModuleContent(blogReaderModule.create().component);

            // function setModuleSize() {
            //     if (data.size.height && data.size.width) {
            //         module.setSize({
            //             width: data.size.width,
            //             height: data.size.height
            //         });
            //     } else if (data.size.minHeight && data.size.minWidth) {
            //         module.setSize({
            //             width: data.size.minWidth,
            //             height: data.size.minHeight
            //         });
            //     } else {
            //         module.setSize({
            //             width: this.component.clientWidth/2,
            //             height: this.component.clientHeight/2
            //         });
            //     }
            // }
        },

        // setActiveModule: function(id, element) {
        //     this.factory.activeModules[id] = element;
        //     window.el = element
        // },

        // clearActiveModule: function(id) {
        //     delete this.factory.activeModules[id];
        // }
    });

    return new CanvasService();
});
})();
(function() {Trio.Module.import([
    '/Users/jacky.chan/Projects/chikei.io/client/src/modules/layout/factory/layoutFactory.js',
    '/Users/jacky.chan/Projects/chikei.io/client/src/modules/layout/component/layoutComponent.js'
]).and.export('/Users/jacky.chan/Projects/chikei.io/client/src/modules/layout/layout.js',function(layoutFactory, layoutComponent) {
    var LayoutService = Trio.Service.extend({
        onStart: function() {
            var component = layoutComponent.createElement();
            var factory   = new layoutFactory();
            document.body.appendChild(component);
            this.implement(factory);
            this.implement(component);
            this.emit('update:background', factory.attributes.backgroundUrl);
        }
    });

    var layout = new LayoutService();
    return layout;
});
})();
(function() {Trio.Module.import([
    '/Users/jacky.chan/Projects/chikei.io/client/src/modules/header/factory/headerFactory.js',
    '/Users/jacky.chan/Projects/chikei.io/client/src/modules/header/component/headerComponent.js'
]).and.export('/Users/jacky.chan/Projects/chikei.io/client/src/modules/header/header.js',function(headerFactory, headerComponent) {
    var HeaderService = Trio.Service.extend({
        onStart: function() {
            var component = headerComponent.createElement();
            this.implement(new headerFactory({}));
            this.implement(component);
            this.broadcast('header:started', { header: component });
        }
    });

    var header = new HeaderService();
    return header;
});
})();
(function() {Trio.Module.import([
    '/Users/jacky.chan/Projects/chikei.io/client/src/common/components/clock/clock.js',
    '/Users/jacky.chan/Projects/chikei.io/client/src/common/components/logo/logo.js',
    '/Users/jacky.chan/Projects/chikei.io/client/src/common/components/icon/icon.js',
    '/Users/jacky.chan/Projects/chikei.io/client/src/common/components/module/module.js'
])

.and.export('/Users/jacky.chan/Projects/chikei.io/client/src/common/components/index.js',function() {
    return ;
});})();
(function() {Trio.Module.import([
	'/Users/jacky.chan/Projects/chikei.io/client/src/resources/ViewConfig/ViewConfig.js'
]).and.export('/Users/jacky.chan/Projects/chikei.io/client/src/resources/index.js',function(ViewConfig) {
	return {
		ViewConfig: ViewConfig
	};
});})();
(function() {Trio.Module.export('/Users/jacky.chan/Projects/chikei.io/client/src/style/variables.js',function() {
    var baseColor = '#000000';
    var layoutColor = '#FFFFFF';
    var themeColor = '#00B8FF';

    // var baseColor = '#FFFFFF';
    // var layoutColor = '#000000';
    // var themeColor = '#FF0081';
    var shadowColor = 'rgba(0, 0, 0, 0.4)';

    Trio.Stylizer.registerVariable('base-color', baseColor);
    Trio.Stylizer.registerVariable('layout-color', layoutColor);
    Trio.Stylizer.registerVariable('theme-color', themeColor);
    Trio.Stylizer.registerVariable('shadow-color', shadowColor);

});})();
(function() {Trio.Module.import([
    '/Users/jacky.chan/Projects/chikei.io/client/src/style/variables.js',
    '/Users/jacky.chan/Projects/chikei.io/client/src/resources/index.js',
    '/Users/jacky.chan/Projects/chikei.io/client/src/common/components/index.js',
    '/Users/jacky.chan/Projects/chikei.io/client/src/modules/layout/layout.js',
    '/Users/jacky.chan/Projects/chikei.io/client/src/modules/header/header.js',
    '/Users/jacky.chan/Projects/chikei.io/client/src/modules/canvas/canvas.js',
    '/Users/jacky.chan/Projects/chikei.io/client/src/modules/theme/theme.js'
]).and.then('/Users/jacky.chan/Projects/chikei.io/client/src/app.js',function(variables, resources, components, layoutModule, headerModule, canvasModule) {
    var layout = layoutModule.start();
    var header = headerModule.start();
    var canvas = canvasModule.start();

});
})();
