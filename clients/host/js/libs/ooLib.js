(function (global) {
    
	var ooLib = {
		/**
		 * creates recursively nested object to define a namespace
		 * @param {String} ns - the desired namespace
		 * @returns {Object} - the deepest level of ns namespace 
		 */
		createNamespace: function (ns, root) {
			var names = ns.split('.');
			var parent = root || window;
			for (var i=0, len=names.length; i<len; i++) {
				if ('object' != typeof(parent[names[i]]) ) {
					parent[names[i]] = {};
				}
				
				parent = parent[names[i]];
			}
			return parent[names[i]];
		},
		/**
		 * create a class that extends the given one
		 * @param {Function} parentClass the parent class to extend
		 * @returns {Function} - the child class
		 */
        extend: function(parentClass) {
			var fn, fnConstructor = fn = function () {};
			fn.prototype = new parentClass;

			fn.prototype.constructor = fnConstructor;
			
			fn.superClass = parentClass.prototype;
			fn.prototype.superClass = function () { return parentClass.prototype; };
			
			return fn;
		},
		/**
		 * creates a delegate of the given function with the desired scope
		 * @param {Function} fn
		 * @param {Object} scope
		 * @returns {Function}
		 */
		createDelegate: function (fn, scope) {
			return function () {
				return fn.apply(scope, arguments);
			};
		},
		
		delay: function (fn, delay, scope) {
		    
		    scope = scope || global;
		    
		    if (typeof delay != 'Number') {
		        scope = delay;
		        delay = 10;
		    }
		    
	        var args = arguments;
	        
	        setTimeout(function () {
	            fn.apply(scope, args);
	        }, delay);
		    
		},
		
		isObjectEmpty: function (obj) {
		    var count = 0;
		    for (var p in obj) {
		        count++;
		        if (count !== 0) {
		            break;
		        }
		    }
		    
		    if (count !== 0) {
		        return false;
		    } else {
		        return true;
		    }
		}
	};
    
    global['ooLib'] = ooLib;
    
})(window);