(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/lib/semantic-ui/definitions/modules/checkbox.js              //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/*                                                                     //
  DO NOT MODIFY - This file has been generated and will be regenerated
  Semantic UI v2.1.4                                                   //
*/                                                                     //
/*!                                                                    //
 * # Semantic UI - Checkbox                                            //
 * http://github.com/semantic-org/semantic-ui/                         //
 *                                                                     //
 *                                                                     //
 * Copyright 2015 Contributors                                         //
 * Released under the MIT license                                      //
 * http://opensource.org/licenses/MIT                                  //
 *                                                                     //
 */                                                                    //
                                                                       //
;(function ($, window, document, undefined) {                          // 16
                                                                       //
  "use strict";                                                        // 18
                                                                       //
  $.fn.checkbox = function (parameters) {                              // 20
    var $allModules = $(this),                                         // 21
        moduleSelector = $allModules.selector || '',                   //
        time = new Date().getTime(),                                   //
        performance = [],                                              //
        query = arguments[0],                                          //
        methodInvoked = typeof query == 'string',                      //
        queryArguments = [].slice.call(arguments, 1),                  //
        returnedValue;                                                 //
                                                                       //
    $allModules.each(function () {                                     // 34
      var settings = $.extend(true, {}, $.fn.checkbox.settings, parameters),
          className = settings.className,                              //
          namespace = settings.namespace,                              //
          selector = settings.selector,                                //
          error = settings.error,                                      //
          eventNamespace = '.' + namespace,                            //
          moduleNamespace = 'module-' + namespace,                     //
          $module = $(this),                                           //
          $label = $(this).children(selector.label),                   //
          $input = $(this).children(selector.input),                   //
          input = $input[0],                                           //
          initialLoad = false,                                         //
          shortcutPressed = false,                                     //
          instance = $module.data(moduleNamespace),                    //
          observer,                                                    //
          element = this,                                              //
          module;                                                      //
                                                                       //
      module = {                                                       // 61
                                                                       //
        initialize: function () {                                      // 63
          module.verbose('Initializing checkbox', settings);           // 64
                                                                       //
          module.create.label();                                       // 66
          module.bind.events();                                        // 67
                                                                       //
          module.set.tabbable();                                       // 69
          module.hide.input();                                         // 70
                                                                       //
          module.observeChanges();                                     // 72
          module.instantiate();                                        // 73
          module.setup();                                              // 74
        },                                                             //
                                                                       //
        instantiate: function () {                                     // 77
          module.verbose('Storing instance of module', module);        // 78
          instance = module;                                           // 79
          $module.data(moduleNamespace, module);                       // 80
        },                                                             //
                                                                       //
        destroy: function () {                                         // 85
          module.verbose('Destroying module');                         // 86
          module.unbind.events();                                      // 87
          module.show.input();                                         // 88
          $module.removeData(moduleNamespace);                         // 89
        },                                                             //
                                                                       //
        fix: {                                                         // 92
          reference: function () {                                     // 93
            if ($module.is(selector.input)) {                          // 94
              module.debug('Behavior called on <input> adjusting invoked element');
              $module = $module.closest(selector.checkbox);            // 96
              module.refresh();                                        // 97
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        setup: function () {                                           // 102
          module.set.initialLoad();                                    // 103
          if (module.is.indeterminate()) {                             // 104
            module.debug('Initial value is indeterminate');            // 105
            module.indeterminate();                                    // 106
          } else if (module.is.checked()) {                            //
            module.debug('Initial value is checked');                  // 109
            module.check();                                            // 110
          } else {                                                     //
            module.debug('Initial value is unchecked');                // 113
            module.uncheck();                                          // 114
          }                                                            //
          module.remove.initialLoad();                                 // 116
        },                                                             //
                                                                       //
        refresh: function () {                                         // 119
          $label = $module.children(selector.label);                   // 120
          $input = $module.children(selector.input);                   // 121
          input = $input[0];                                           // 122
        },                                                             //
                                                                       //
        hide: {                                                        // 125
          input: function () {                                         // 126
            module.verbose('Modfying <input> z-index to be unselectable');
            $input.addClass(className.hidden);                         // 128
          }                                                            //
        },                                                             //
        show: {                                                        // 131
          input: function () {                                         // 132
            module.verbose('Modfying <input> z-index to be selectable');
            $input.removeClass(className.hidden);                      // 134
          }                                                            //
        },                                                             //
                                                                       //
        observeChanges: function () {                                  // 138
          if ('MutationObserver' in window) {                          // 139
            observer = new MutationObserver(function (mutations) {     // 140
              module.debug('DOM tree modified, updating selector cache');
              module.refresh();                                        // 142
            });                                                        //
            observer.observe(element, {                                // 144
              childList: true,                                         // 145
              subtree: true                                            // 146
            });                                                        //
            module.debug('Setting up mutation observer', observer);    // 148
          }                                                            //
        },                                                             //
                                                                       //
        attachEvents: function (selector, event) {                     // 152
          var $element = $(selector);                                  // 153
          event = $.isFunction(module[event]) ? module[event] : module.toggle;
          if ($element.length > 0) {                                   // 160
            module.debug('Attaching checkbox events to element', selector, event);
            $element.on('click' + eventNamespace, event);              // 162
          } else {                                                     //
            module.error(error.notFound);                              // 167
          }                                                            //
        },                                                             //
                                                                       //
        event: {                                                       // 171
          click: function (event) {                                    // 172
            var $target = $(event.target);                             // 173
            if ($target.is(selector.input)) {                          // 176
              module.verbose('Using default check action on initialized checkbox');
              return;                                                  // 178
            }                                                          //
            if ($target.is(selector.link)) {                           // 180
              module.debug('Clicking link inside checkbox, skipping toggle');
              return;                                                  // 182
            }                                                          //
            module.toggle();                                           // 184
            $input.focus();                                            // 185
            event.preventDefault();                                    // 186
          },                                                           //
          keydown: function (event) {                                  // 188
            var key = event.which,                                     // 189
                keyCode = {                                            //
              enter: 13,                                               // 192
              space: 32,                                               // 193
              escape: 27                                               // 194
            };                                                         //
            if (key == keyCode.escape) {                               // 197
              module.verbose('Escape key pressed blurring field');     // 198
              $input.blur();                                           // 199
              shortcutPressed = true;                                  // 200
            } else if (!event.ctrlKey && (key == keyCode.space || key == keyCode.enter)) {
              module.verbose('Enter/space key pressed, toggling checkbox');
              module.toggle();                                         // 204
              shortcutPressed = true;                                  // 205
            } else {                                                   //
              shortcutPressed = false;                                 // 208
            }                                                          //
          },                                                           //
          keyup: function (event) {                                    // 211
            if (shortcutPressed) {                                     // 212
              event.preventDefault();                                  // 213
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        check: function () {                                           // 218
          if (!module.should.allowCheck()) {                           // 219
            return;                                                    // 220
          }                                                            //
          module.debug('Checking checkbox', $input);                   // 222
          module.set.checked();                                        // 223
          if (!module.should.ignoreCallbacks()) {                      // 224
            settings.onChecked.call(input);                            // 225
            settings.onChange.call(input);                             // 226
          }                                                            //
        },                                                             //
                                                                       //
        uncheck: function () {                                         // 230
          if (!module.should.allowUncheck()) {                         // 231
            return;                                                    // 232
          }                                                            //
          module.debug('Unchecking checkbox');                         // 234
          module.set.unchecked();                                      // 235
          if (!module.should.ignoreCallbacks()) {                      // 236
            settings.onUnchecked.call(input);                          // 237
            settings.onChange.call(input);                             // 238
          }                                                            //
        },                                                             //
                                                                       //
        indeterminate: function () {                                   // 242
          if (module.should.allowIndeterminate()) {                    // 243
            module.debug('Checkbox is already indeterminate');         // 244
            return;                                                    // 245
          }                                                            //
          module.debug('Making checkbox indeterminate');               // 247
          module.set.indeterminate();                                  // 248
          if (!module.should.ignoreCallbacks()) {                      // 249
            settings.onIndeterminate.call(input);                      // 250
            settings.onChange.call(input);                             // 251
          }                                                            //
        },                                                             //
                                                                       //
        determinate: function () {                                     // 255
          if (module.should.allowDeterminate()) {                      // 256
            module.debug('Checkbox is already determinate');           // 257
            return;                                                    // 258
          }                                                            //
          module.debug('Making checkbox determinate');                 // 260
          module.set.determinate();                                    // 261
          if (!module.should.ignoreCallbacks()) {                      // 262
            settings.onDeterminate.call(input);                        // 263
            settings.onChange.call(input);                             // 264
          }                                                            //
        },                                                             //
                                                                       //
        enable: function () {                                          // 268
          if (module.is.enabled()) {                                   // 269
            module.debug('Checkbox is already enabled');               // 270
            return;                                                    // 271
          }                                                            //
          module.debug('Enabling checkbox');                           // 273
          module.set.enabled();                                        // 274
          settings.onEnable.call(input);                               // 275
        },                                                             //
                                                                       //
        disable: function () {                                         // 278
          if (module.is.disabled()) {                                  // 279
            module.debug('Checkbox is already disabled');              // 280
            return;                                                    // 281
          }                                                            //
          module.debug('Disabling checkbox');                          // 283
          module.set.disabled();                                       // 284
          settings.onDisable.call(input);                              // 285
        },                                                             //
                                                                       //
        get: {                                                         // 288
          radios: function () {                                        // 289
            var name = module.get.name();                              // 290
            return $('input[name="' + name + '"]').closest(selector.checkbox);
          },                                                           //
          otherRadios: function () {                                   // 295
            return module.get.radios().not($module);                   // 296
          },                                                           //
          name: function () {                                          // 298
            return $input.attr('name');                                // 299
          }                                                            //
        },                                                             //
                                                                       //
        is: {                                                          // 303
          initialLoad: function () {                                   // 304
            return initialLoad;                                        // 305
          },                                                           //
          radio: function () {                                         // 307
            return $input.hasClass(className.radio) || $input.attr('type') == 'radio';
          },                                                           //
          indeterminate: function () {                                 // 310
            return $input.prop('indeterminate') !== undefined && $input.prop('indeterminate');
          },                                                           //
          checked: function () {                                       // 313
            return $input.prop('checked') !== undefined && $input.prop('checked');
          },                                                           //
          disabled: function () {                                      // 316
            return $input.prop('disabled') !== undefined && $input.prop('disabled');
          },                                                           //
          enabled: function () {                                       // 319
            return !module.is.disabled();                              // 320
          },                                                           //
          determinate: function () {                                   // 322
            return !module.is.indeterminate();                         // 323
          },                                                           //
          unchecked: function () {                                     // 325
            return !module.is.checked();                               // 326
          }                                                            //
        },                                                             //
                                                                       //
        should: {                                                      // 330
          allowCheck: function () {                                    // 331
            if (module.is.determinate() && module.is.checked() && !module.should.forceCallbacks()) {
              module.debug('Should not allow check, checkbox is already checked');
              return false;                                            // 334
            }                                                          //
            if (settings.beforeChecked.apply(input) === false) {       // 336
              module.debug('Should not allow check, beforeChecked cancelled');
              return false;                                            // 338
            }                                                          //
            return true;                                               // 340
          },                                                           //
          allowUncheck: function () {                                  // 342
            if (module.is.determinate() && module.is.unchecked() && !module.should.forceCallbacks()) {
              module.debug('Should not allow uncheck, checkbox is already unchecked');
              return false;                                            // 345
            }                                                          //
            if (settings.beforeUnchecked.apply(input) === false) {     // 347
              module.debug('Should not allow uncheck, beforeUnchecked cancelled');
              return false;                                            // 349
            }                                                          //
            return true;                                               // 351
          },                                                           //
          allowIndeterminate: function () {                            // 353
            if (module.is.indeterminate() && !module.should.forceCallbacks()) {
              module.debug('Should not allow indeterminate, checkbox is already indeterminate');
              return false;                                            // 356
            }                                                          //
            if (settings.beforeIndeterminate.apply(input) === false) {
              module.debug('Should not allow indeterminate, beforeIndeterminate cancelled');
              return false;                                            // 360
            }                                                          //
            return true;                                               // 362
          },                                                           //
          allowDeterminate: function () {                              // 364
            if (module.is.determinate() && !module.should.forceCallbacks()) {
              module.debug('Should not allow determinate, checkbox is already determinate');
              return false;                                            // 367
            }                                                          //
            if (settings.beforeDeterminate.apply(input) === false) {   // 369
              module.debug('Should not allow determinate, beforeDeterminate cancelled');
              return false;                                            // 371
            }                                                          //
            return true;                                               // 373
          },                                                           //
          forceCallbacks: function () {                                // 375
            return module.is.initialLoad() && settings.fireOnInit;     // 376
          },                                                           //
          ignoreCallbacks: function () {                               // 378
            return initialLoad && !settings.fireOnInit;                // 379
          }                                                            //
        },                                                             //
                                                                       //
        can: {                                                         // 383
          change: function () {                                        // 384
            return !($module.hasClass(className.disabled) || $module.hasClass(className.readOnly) || $input.prop('disabled') || $input.prop('readonly'));
          },                                                           //
          uncheck: function () {                                       // 387
            return typeof settings.uncheckable === 'boolean' ? settings.uncheckable : !module.is.radio();
          }                                                            //
        },                                                             //
                                                                       //
        set: {                                                         // 395
          initialLoad: function () {                                   // 396
            initialLoad = true;                                        // 397
          },                                                           //
          checked: function () {                                       // 399
            module.verbose('Setting class to checked');                // 400
            $module.removeClass(className.indeterminate).addClass(className.checked);
            if (module.is.radio()) {                                   // 405
              module.uncheckOthers();                                  // 406
            }                                                          //
            if (!module.is.indeterminate() && module.is.checked()) {   // 408
              module.debug('Input is already checked, skipping input property change');
              return;                                                  // 410
            }                                                          //
            module.verbose('Setting state to checked', input);         // 412
            $input.prop('indeterminate', false).prop('checked', true);
            module.trigger.change();                                   // 417
          },                                                           //
          unchecked: function () {                                     // 419
            module.verbose('Removing checked class');                  // 420
            $module.removeClass(className.indeterminate).removeClass(className.checked);
            if (!module.is.indeterminate() && module.is.unchecked()) {
              module.debug('Input is already unchecked');              // 426
              return;                                                  // 427
            }                                                          //
            module.debug('Setting state to unchecked');                // 429
            $input.prop('indeterminate', false).prop('checked', false);
            module.trigger.change();                                   // 434
          },                                                           //
          indeterminate: function () {                                 // 436
            module.verbose('Setting class to indeterminate');          // 437
            $module.addClass(className.indeterminate);                 // 438
            if (module.is.indeterminate()) {                           // 441
              module.debug('Input is already indeterminate, skipping input property change');
              return;                                                  // 443
            }                                                          //
            module.debug('Setting state to indeterminate');            // 445
            $input.prop('indeterminate', true);                        // 446
            module.trigger.change();                                   // 449
          },                                                           //
          determinate: function () {                                   // 451
            module.verbose('Removing indeterminate class');            // 452
            $module.removeClass(className.indeterminate);              // 453
            if (module.is.determinate()) {                             // 456
              module.debug('Input is already determinate, skipping input property change');
              return;                                                  // 458
            }                                                          //
            module.debug('Setting state to determinate');              // 460
            $input.prop('indeterminate', false);                       // 461
          },                                                           //
          disabled: function () {                                      // 465
            module.verbose('Setting class to disabled');               // 466
            $module.addClass(className.disabled);                      // 467
            if (module.is.disabled()) {                                // 470
              module.debug('Input is already disabled, skipping input property change');
              return;                                                  // 472
            }                                                          //
            module.debug('Setting state to disabled');                 // 474
            $input.prop('disabled', 'disabled');                       // 475
            module.trigger.change();                                   // 478
          },                                                           //
          enabled: function () {                                       // 480
            module.verbose('Removing disabled class');                 // 481
            $module.removeClass(className.disabled);                   // 482
            if (module.is.enabled()) {                                 // 483
              module.debug('Input is already enabled, skipping input property change');
              return;                                                  // 485
            }                                                          //
            module.debug('Setting state to enabled');                  // 487
            $input.prop('disabled', false);                            // 488
            module.trigger.change();                                   // 491
          },                                                           //
          tabbable: function () {                                      // 493
            module.verbose('Adding tabindex to checkbox');             // 494
            if ($input.attr('tabindex') === undefined) {               // 495
              $input.attr('tabindex', 0);                              // 496
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        remove: {                                                      // 501
          initialLoad: function () {                                   // 502
            initialLoad = false;                                       // 503
          }                                                            //
        },                                                             //
                                                                       //
        trigger: {                                                     // 507
          change: function () {                                        // 508
            module.verbose('Triggering change event from programmatic change');
            $input.trigger('change');                                  // 510
          }                                                            //
        },                                                             //
                                                                       //
        create: {                                                      // 517
          label: function () {                                         // 518
            if ($input.prevAll(selector.label).length > 0) {           // 519
              $input.prev(selector.label).detach().insertAfter($input);
              module.debug('Moving existing label', $label);           // 521
            } else if (!module.has.label()) {                          //
              $label = $('<label>').insertAfter($input);               // 524
              module.debug('Creating label', $label);                  // 525
            }                                                          //
          }                                                            //
        },                                                             //
                                                                       //
        has: {                                                         // 530
          label: function () {                                         // 531
            return $label.length > 0;                                  // 532
          }                                                            //
        },                                                             //
                                                                       //
        bind: {                                                        // 536
          events: function () {                                        // 537
            module.verbose('Attaching checkbox events');               // 538
            $module.on('click' + eventNamespace, module.event.click).on('keydown' + eventNamespace, selector.input, module.event.keydown).on('keyup' + eventNamespace, selector.input, module.event.keyup);
          }                                                            //
        },                                                             //
                                                                       //
        unbind: {                                                      // 547
          events: function () {                                        // 548
            module.debug('Removing events');                           // 549
            $module.off(eventNamespace);                               // 550
          }                                                            //
        },                                                             //
                                                                       //
        uncheckOthers: function () {                                   // 556
          var $radios = module.get.otherRadios();                      // 557
          module.debug('Unchecking other radios', $radios);            // 560
          $radios.removeClass(className.checked);                      // 561
        },                                                             //
                                                                       //
        toggle: function () {                                          // 564
          if (!module.can.change()) {                                  // 565
            if (!module.is.radio()) {                                  // 566
              module.debug('Checkbox is read-only or disabled, ignoring toggle');
            }                                                          //
            return;                                                    // 569
          }                                                            //
          if (module.is.indeterminate() || module.is.unchecked()) {    // 571
            module.debug('Currently unchecked');                       // 572
            module.check();                                            // 573
          } else if (module.is.checked() && module.can.uncheck()) {    //
            module.debug('Currently checked');                         // 576
            module.uncheck();                                          // 577
          }                                                            //
        },                                                             //
        setting: function (name, value) {                              // 580
          module.debug('Changing setting', name, value);               // 581
          if ($.isPlainObject(name)) {                                 // 582
            $.extend(true, settings, name);                            // 583
          } else if (value !== undefined) {                            //
            settings[name] = value;                                    // 586
          } else {                                                     //
            return settings[name];                                     // 589
          }                                                            //
        },                                                             //
        internal: function (name, value) {                             // 592
          if ($.isPlainObject(name)) {                                 // 593
            $.extend(true, module, name);                              // 594
          } else if (value !== undefined) {                            //
            module[name] = value;                                      // 597
          } else {                                                     //
            return module[name];                                       // 600
          }                                                            //
        },                                                             //
        debug: function () {                                           // 603
          if (settings.debug) {                                        // 604
            if (settings.performance) {                                // 605
              module.performance.log(arguments);                       // 606
            } else {                                                   //
              module.debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.debug.apply(console, arguments);                  // 610
            }                                                          //
          }                                                            //
        },                                                             //
        verbose: function () {                                         // 614
          if (settings.verbose && settings.debug) {                    // 615
            if (settings.performance) {                                // 616
              module.performance.log(arguments);                       // 617
            } else {                                                   //
              module.verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
              module.verbose.apply(console, arguments);                // 621
            }                                                          //
          }                                                            //
        },                                                             //
        error: function () {                                           // 625
          module.error = Function.prototype.bind.call(console.error, console, settings.name + ':');
          module.error.apply(console, arguments);                      // 627
        },                                                             //
        performance: {                                                 // 629
          log: function (message) {                                    // 630
            var currentTime, executionTime, previousTime;              // 631
            if (settings.performance) {                                // 636
              currentTime = new Date().getTime();                      // 637
              previousTime = time || currentTime;                      // 638
              executionTime = currentTime - previousTime;              // 639
              time = currentTime;                                      // 640
              performance.push({                                       // 641
                'Name': message[0],                                    // 642
                'Arguments': [].slice.call(message, 1) || '',          // 643
                'Element': element,                                    // 644
                'Execution Time': executionTime                        // 645
              });                                                      //
            }                                                          //
            clearTimeout(module.performance.timer);                    // 648
            module.performance.timer = setTimeout(module.performance.display, 500);
          },                                                           //
          display: function () {                                       // 651
            var title = settings.name + ':',                           // 652
                totalTime = 0;                                         //
            time = false;                                              // 656
            clearTimeout(module.performance.timer);                    // 657
            $.each(performance, function (index, data) {               // 658
              totalTime += data['Execution Time'];                     // 659
            });                                                        //
            title += ' ' + totalTime + 'ms';                           // 661
            if (moduleSelector) {                                      // 662
              title += ' \'' + moduleSelector + '\'';                  // 663
            }                                                          //
            if ((console.group !== undefined || console.table !== undefined) && performance.length > 0) {
              console.groupCollapsed(title);                           // 666
              if (console.table) {                                     // 667
                console.table(performance);                            // 668
              } else {                                                 //
                $.each(performance, function (index, data) {           // 671
                  console.log(data['Name'] + ': ' + data['Execution Time'] + 'ms');
                });                                                    //
              }                                                        //
              console.groupEnd();                                      // 675
            }                                                          //
            performance = [];                                          // 677
          }                                                            //
        },                                                             //
        invoke: function (query, passedArguments, context) {           // 680
          var object = instance,                                       // 681
              maxDepth,                                                //
              found,                                                   //
              response;                                                //
          passedArguments = passedArguments || queryArguments;         // 687
          context = element || context;                                // 688
          if (typeof query == 'string' && object !== undefined) {      // 689
            query = query.split(/[\. ]/);                              // 690
            maxDepth = query.length - 1;                               // 691
            $.each(query, function (depth, value) {                    // 692
              var camelCaseValue = depth != maxDepth ? value + query[depth + 1].charAt(0).toUpperCase() + query[depth + 1].slice(1) : query;
              if ($.isPlainObject(object[camelCaseValue]) && depth != maxDepth) {
                object = object[camelCaseValue];                       // 698
              } else if (object[camelCaseValue] !== undefined) {       //
                found = object[camelCaseValue];                        // 701
                return false;                                          // 702
              } else if ($.isPlainObject(object[value]) && depth != maxDepth) {
                object = object[value];                                // 705
              } else if (object[value] !== undefined) {                //
                found = object[value];                                 // 708
                return false;                                          // 709
              } else {                                                 //
                module.error(error.method, query);                     // 712
                return false;                                          // 713
              }                                                        //
            });                                                        //
          }                                                            //
          if ($.isFunction(found)) {                                   // 717
            response = found.apply(context, passedArguments);          // 718
          } else if (found !== undefined) {                            //
            response = found;                                          // 721
          }                                                            //
          if ($.isArray(returnedValue)) {                              // 723
            returnedValue.push(response);                              // 724
          } else if (returnedValue !== undefined) {                    //
            returnedValue = [returnedValue, response];                 // 727
          } else if (response !== undefined) {                         //
            returnedValue = response;                                  // 730
          }                                                            //
          return found;                                                // 732
        }                                                              //
      };                                                               //
                                                                       //
      if (methodInvoked) {                                             // 736
        if (instance === undefined) {                                  // 737
          module.initialize();                                         // 738
        }                                                              //
        module.invoke(query);                                          // 740
      } else {                                                         //
        if (instance !== undefined) {                                  // 743
          instance.invoke('destroy');                                  // 744
        }                                                              //
        module.initialize();                                           // 746
      }                                                                //
    });                                                                //
                                                                       //
    return returnedValue !== undefined ? returnedValue : this;         // 751
  };                                                                   //
                                                                       //
  $.fn.checkbox.settings = {                                           // 757
                                                                       //
    name: 'Checkbox',                                                  // 759
    namespace: 'checkbox',                                             // 760
                                                                       //
    debug: false,                                                      // 762
    verbose: true,                                                     // 763
    performance: true,                                                 // 764
                                                                       //
    // delegated event context                                         //
    uncheckable: 'auto',                                               // 767
    fireOnInit: false,                                                 // 768
                                                                       //
    onChange: function () {},                                          // 770
                                                                       //
    beforeChecked: function () {},                                     // 772
    beforeUnchecked: function () {},                                   // 773
    beforeDeterminate: function () {},                                 // 774
    beforeIndeterminate: function () {},                               // 775
                                                                       //
    onChecked: function () {},                                         // 777
    onUnchecked: function () {},                                       // 778
                                                                       //
    onDeterminate: function () {},                                     // 780
    onIndeterminate: function () {},                                   // 781
                                                                       //
    onEnabled: function () {},                                         // 783
    onDisabled: function () {},                                        // 784
                                                                       //
    className: {                                                       // 786
      checked: 'checked',                                              // 787
      indeterminate: 'indeterminate',                                  // 788
      disabled: 'disabled',                                            // 789
      hidden: 'hidden',                                                // 790
      radio: 'radio',                                                  // 791
      readOnly: 'read-only'                                            // 792
    },                                                                 //
                                                                       //
    error: {                                                           // 795
      method: 'The method you called is not defined'                   // 796
    },                                                                 //
                                                                       //
    selector: {                                                        // 799
      checkbox: '.ui.checkbox',                                        // 800
      label: 'label, .box',                                            // 801
      input: 'input[type="checkbox"], input[type="radio"]',            // 802
      link: 'a[href]'                                                  // 803
    }                                                                  //
                                                                       //
  };                                                                   //
})(jQuery, window, document);                                          //
/////////////////////////////////////////////////////////////////////////

}).call(this);
