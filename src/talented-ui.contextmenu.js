(function(ui) {
    'use strict';
    var MenuItem = function(icon, name, callback) {

        var li = ui.CreateElement('li');
        var span = ui.CreateElement('span');
        var nameText = document.createTextNode(name);
        span.appendChild(nameText);
        ui.RegisterEvent(span, ui.Events.Click, callback);
        li.appendChild(span);

        this.Item = li;
        this.Name = name;
        this.Action = callback;
    };

    var MenuItemList = function() {

        var _self = this;
        var rootContainer = ui.CreateElement('div');
        rootContainer.setAttribute('id', 'rootContainer');
        var rootUl = ui.CreateElement('ul');
        rootContainer.appendChild(rootUl);

        this.Container = rootContainer;
        // this.Container = rootUl;

        this.Add = function(menuItem) {
            _self[menuItem.Name] = menuItem;
            rootUl.appendChild(menuItem.Item);
            // _self.Container = rootUl;
        };

        this.Styles = null;
        this.AddStyle = function(styleName, styleValue) {
            _self.Styles = _self.Styles || {};
            _self.Styles[styleName] = styleValue;
            var joinedString = '';
            for (var key in _self.Styles) {
                if (_self.Styles.hasOwnProperty(key)) {
                    joinedString += key.toString() + ':' + _self.Styles[key] + ';'
                }
            }

            ui.RemoveAttribute(_self.Container, 'style');
            ui.SetAttribute(_self.Container, 'style', joinedString);
        };

        this.RemoveStyle = function(styleName) {
            delete _self.Styles[styleName];
            var joinedString = '';
            for (var key in _self.Styles) {
                if (_self.Styles.hasOwnProperty(key)) {
                    joinedString += key.toString() + ':' + _self.Styles[key] + ';'
                }
            }

            ui.RemoveAttribute(_self.Container, 'style');
            ui.SetAttribute(_self.Container, 'style', joinedString);
        };
    };
    
    var contextMenu = function(areaElementIdOrSelector, options) {

        var _self = this;
        // DEFINITIONS START
        var _targetElement = null;
        var _startX = null;
        var _startY = null;
        var _isOpened = false;
        var _menuItems = null;
        // DEFINITIONS END

        var _setTargetElement = function(idOrObj) {
            if (ui.GetType(idOrObj) === ui.Types.String) {
                var target = document.getElementById(idOrObj);
                if (target) {
                    _targetElement = target;
                } else {
                    throw console.error(''); // böyle bir element yok
                }
            } else {
                if (ui.GetType(idOrObj) === ui.Types.HTMLDivElement) {
                    _targetElement = idOrObj;
                } else {
                    throw console.error('');
                }
            }
        };

        var _registerContextMenuEventOfTargetElement = function() {
            ui.RegisterEvent(_targetElement, ui.Events.ContextMenu, function(event) {
                event.preventDefault();

                var contexMenu = _menuItems.Container;
                // contexMenu.setAttribute('style', 'left: ' + event.pageX + 'px;top: ' + event.pageY + 'px');

                _menuItems.AddStyle('left', event.pageX + 'px');
                _menuItems.AddStyle('top', event.pageY + 'px');

                _showContextMenu();

                _targetElement.appendChild(contexMenu);
                // console.log('Click Location Clients->', event.clientX, event.clientY);
                // console.log('Click Location Layers->', event.layerX, event.layerY);
                // console.log('Click Location Movements ->', event.movementX, event.movementY);
                // console.log('Click Location Offsets ->', event.offsetX, event.offsetY);
                // console.log('Click Location Pages ->', event.pageX, event.pageY);
                // console.log('Click Location Screens->', event.screenX, event.screenY);
                // console.log('-----\n----');
            });

            ui.RegisterEvent(_targetElement, ui.Events.Click, function(event) {
                debugger;
                event.preventDefault();
                _hideContextMenu();
            })
        };

        var _showContextMenu = function() {
            _menuItems.AddStyle('display', 'block');

        };

        var _hideContextMenu = function() {
            _menuItems.AddStyle('display','none');
        };

        (function() {

            if (areaElementIdOrSelector) {
                _setTargetElement(areaElementIdOrSelector);
            }

            if (options) {
                _registerContextMenuEventOfTargetElement();
            }

        })();

        // PROPERTIES START
        // _self.ContextMenu = null;
        // PROPERTIES END

        // METHODS START

        _self.AddMenuItem = function(icon, name, options) {

            _menuItems = _menuItems || new MenuItemList();

            _menuItems.Add(new MenuItem(icon, name, options));

            return _self;
        };

        _self.AddSubMenuItem = function() {
            return _self;
        };

        _self.Attach = function(areaElementIdOrSelector) {
            if (areaElementIdOrSelector) {
                _setTargetElement(areaElementIdOrSelector);
            }

            _registerContextMenuEventOfTargetElement();
        };

        // _self
        // METHODS END
    };

    ui.ContextMenu = ui.ContextMenu || contextMenu;

})(window.TalentedUI);
