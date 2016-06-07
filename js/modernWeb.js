var ModernWeb;
(function (ModernWeb) {
    'use strict';
    /*  ==========================================================================
        Enum
        ========================================================================== */
    (function (PlayState) {
        PlayState[PlayState["Play"] = 0] = "Play";
        PlayState[PlayState["Pause"] = 1] = "Pause";
        PlayState[PlayState["Stop"] = 2] = "Stop";
    })(ModernWeb.PlayState || (ModernWeb.PlayState = {}));
    var PlayState = ModernWeb.PlayState;
    (function (PlayType) {
        PlayType[PlayType["Automatic"] = 0] = "Automatic";
        PlayType[PlayType["Manual"] = 1] = "Manual";
    })(ModernWeb.PlayType || (ModernWeb.PlayType = {}));
    var PlayType = ModernWeb.PlayType;
    (function (PlayDirection) {
        PlayDirection[PlayDirection["Ascending"] = 0] = "Ascending";
        PlayDirection[PlayDirection["Descending"] = 1] = "Descending";
    })(ModernWeb.PlayDirection || (ModernWeb.PlayDirection = {}));
    var PlayDirection = ModernWeb.PlayDirection;
})(ModernWeb || (ModernWeb = {}));
/// <reference path="../../ModernWeb.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Services;
    (function (Services) {
        'use strict';
        /* ==========================================================================
            ServiceBase
            ========================================================================== */
        var ServiceBase = (function () {
            function ServiceBase() {
            }
            return ServiceBase;
        })();
        Services.ServiceBase = ServiceBase;
    })(Services = ModernWeb.Services || (ModernWeb.Services = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/ServiceBase.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ModernWeb;
(function (ModernWeb) {
    var Services;
    (function (Services) {
        'use strict';
        /* ==========================================================================
           DialogService
           ========================================================================== */
        var DialogService = (function (_super) {
            __extends(DialogService, _super);
            function DialogService() {
                _super.call(this);
                this.dialogs = new Utilities.Dictionary();
            }
            DialogService.prototype.AddDialog = function (dialog) {
                this.dialogs.Add(dialog.id, dialog);
            };
            DialogService.prototype.RemoveDialog = function (id) {
                this.dialogs.Remove(id);
            };
            DialogService.prototype.RetrieveDialog = function (id) {
                if (!this.dialogs.ContainsKey(id)) {
                    throw new Error("DialogService Fault: can't retrieve the dialog [id='" + id + "'] !");
                }
                return this.dialogs[id];
            };
            DialogService.$inject = [];
            return DialogService;
        })(Services.ServiceBase);
        Services.DialogService = DialogService;
    })(Services = ModernWeb.Services || (ModernWeb.Services = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="../../ModernWeb.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Directives;
    (function (Directives) {
        'use strict';
        /* ==========================================================================
            BaseDirective
            ========================================================================== */
        var BaseDirective = (function () {
            function BaseDirective() {
            }
            return BaseDirective;
        })();
        Directives.BaseDirective = BaseDirective;
    })(Directives = ModernWeb.Directives || (ModernWeb.Directives = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="../../ModernWeb.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        /* ==========================================================================
           BaseController
           ========================================================================== */
        var BaseController = (function () {
            function BaseController($scope) {
                this.scope = $scope;
            }
            BaseController.prototype.HandleServerErrorsResponse = function (dataResponse, form) {
                if (dataResponse.status == 1) {
                    if (typeof dataResponse.errors == "undefined") {
                        return;
                    }
                    for (var i = 0; i < dataResponse.errors.length; i++) {
                        var dataResponseErrors = dataResponse.errors[i];
                        var fieldName = dataResponseErrors.Key;
                        var errors = dataResponseErrors.Value;
                        var errorsMessage = [];
                        for (var j = 0; j < errors.length; j++) {
                            errorsMessage.push(errors[j]);
                        }
                        if (typeof form[fieldName] == "undefined") {
                            form[fieldName] = new Object();
                        }
                        form[fieldName].valid = false;
                        form[fieldName].invalid = !form[fieldName].valid;
                        form[fieldName][BaseController.SERVER_ERRORS] = errorsMessage;
                    }
                    form[BaseController.SERVER_ERRORS] = dataResponse.errors;
                }
            };
            BaseController.SERVER_ERRORS = "errorsServer";
            return BaseController;
        })();
        Controllers.BaseController = BaseController;
    })(Controllers = ModernWeb.Controllers || (ModernWeb.Controllers = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="../../ModernWeb.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Business;
    (function (Business) {
        'use strict';
        /* ==========================================================================
            BaseBO
            ========================================================================== */
        var BaseBO = (function () {
            function BaseBO(scope) {
                this.scope = scope;
            }
            return BaseBO;
        })();
        Business.BaseBO = BaseBO;
    })(Business = ModernWeb.Business || (ModernWeb.Business = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseBO.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Business;
    (function (Business) {
        'use strict';
        /* ==========================================================================
            AnimateNumberBO
            ========================================================================== */
        var AnimateNumberBO = (function (_super) {
            __extends(AnimateNumberBO, _super);
            function AnimateNumberBO(model, intervalService) {
                _super.call(this, model);
                this.intervalService = intervalService;
                this.model = model;
                this.model.numberAnimated = 0;
            }
            AnimateNumberBO.prototype.Animate = function () {
                var _this = this;
                this.Reset();
                var intervalTime = (this.model.number > 0) ? this.model.delay / this.model.number : 0;
                var handler = this.intervalService(function () {
                    _this.model.numberAnimated++;
                    if (_this.model.numberAnimated >= _this.model.number) {
                        _this.intervalService.cancel(handler);
                    }
                }, intervalTime);
            };
            AnimateNumberBO.prototype.Reset = function () {
                this.model.numberAnimated = 0;
            };
            return AnimateNumberBO;
        })(Business.BaseBO);
        Business.AnimateNumberBO = AnimateNumberBO;
    })(Business = ModernWeb.Business || (ModernWeb.Business = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseController.ts" />
/// <reference path="../Business/AnimateNumberBO.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        /*  DefaultConfig
            ========================================================================== */
        var animateNumberConfig = {
            delay: 2500,
            number: 100
        };
        /* ==========================================================================
            AnimateNumberController
            ========================================================================== */
        var AnimateNumberController = (function (_super) {
            __extends(AnimateNumberController, _super);
            function AnimateNumberController($scope, $window, $interval) {
                _super.call(this, $scope);
                this.windowService = $window;
                this.animateNumberBO = new ModernWeb.Business.AnimateNumberBO($scope, $interval);
                this.SetDefaultValue();
            }
            AnimateNumberController.prototype.SetDefaultValue = function () {
                if (!angular.isDefined(this.scope.delay)) {
                    this.scope.delay = animateNumberConfig.delay;
                }
                if (!angular.isDefined(this.scope.number)) {
                    this.scope.number = animateNumberConfig.number;
                }
            };
            AnimateNumberController.prototype.AttachEventOnWindowScroll = function (element) {
                var _this = this;
                var isAnimationPlayed = false;
                this.windowService.addEventListener("scroll", function (event) {
                    var scrollHeightWindow = jQuery(window).scrollTop();
                    var heightWindow = jQuery(window).height();
                    var offsetNumbers = jQuery(element).offset().top;
                    var heightNumbers = jQuery(element).outerHeight();
                    // Trigger animation
                    if (!isAnimationPlayed &&
                        scrollHeightWindow >= (offsetNumbers - heightWindow + heightNumbers) &&
                        scrollHeightWindow <= offsetNumbers) {
                        _this.animateNumberBO.Animate();
                        isAnimationPlayed = true;
                    }
                    // Reset animation
                    if (isAnimationPlayed &&
                        scrollHeightWindow > (offsetNumbers + heightNumbers)) {
                        _this.animateNumberBO.Reset();
                        isAnimationPlayed = false;
                    }
                });
            };
            AnimateNumberController.prototype.Animate = function () {
                this.animateNumberBO.Animate();
            };
            AnimateNumberController.prototype.Reset = function () {
                this.animateNumberBO.Reset();
            };
            AnimateNumberController.$inject = ['$scope', '$window', '$interval'];
            return AnimateNumberController;
        })(Controllers.BaseController);
        Controllers.AnimateNumberController = AnimateNumberController;
    })(Controllers = ModernWeb.Controllers || (ModernWeb.Controllers = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseDirective.ts" />
/// <reference path="../Controllers/AnimateNumberController.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Directives;
    (function (Directives) {
        'use strict';
        /* ==========================================================================
            Interface
            ========================================================================== */
        /* ==========================================================================
            AnimateNumberDirective
            ========================================================================== */
        var AnimateNumberDirective = (function (_super) {
            __extends(AnimateNumberDirective, _super);
            function AnimateNumberDirective() {
                _super.call(this);
                this.transclude = false;
                this.replace = true;
                this.templateUrl = function (element, attributs) {
                    return attributs.templateUrl || '/lib/modernWeb/templates/Animate/Number.html';
                };
            }
            AnimateNumberDirective.Factory = function () {
                var directive = function () {
                    return new AnimateNumberDirective();
                };
                directive["$inject"] = [];
                return directive;
            };
            return AnimateNumberDirective;
        })(Directives.BaseDirective);
        Directives.AnimateNumberDirective = AnimateNumberDirective;
    })(Directives = ModernWeb.Directives || (ModernWeb.Directives = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseController.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        /* ==========================================================================
            ProgressController
            ========================================================================== */
        var ProgressController = (function (_super) {
            __extends(ProgressController, _super);
            function ProgressController($scope) {
                _super.call(this, $scope);
            }
            ProgressController.$inject = ['$scope'];
            return ProgressController;
        })(Controllers.BaseController);
        Controllers.ProgressController = ProgressController;
    })(Controllers = ModernWeb.Controllers || (ModernWeb.Controllers = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseDirective.ts" />
/// <reference path="../Controllers/ProgressController.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Directives;
    (function (Directives) {
        'use strict';
        /* ==========================================================================
            ProgressDirective
            ========================================================================== */
        var ProgressDirective = (function (_super) {
            __extends(ProgressDirective, _super);
            function ProgressDirective() {
                _super.call(this);
                this.transclude = true;
                this.replace = true;
                this.templateUrl = function (element, attributs) {
                    return attributs.templateUrl || '/lib/modernWeb/templates/ProgressBar/Progress.html';
                };
                this.controller = "ProgressController";
                this.controllerAs = "ProgressCtrl";
            }
            ProgressDirective.Factory = function () {
                var directive = function () {
                    return new ProgressDirective();
                };
                directive["$inject"] = [];
                return directive;
            };
            return ProgressDirective;
        })(Directives.BaseDirective);
        Directives.ProgressDirective = ProgressDirective;
    })(Directives = ModernWeb.Directives || (ModernWeb.Directives = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseBO.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Business;
    (function (Business) {
        'use strict';
        /* ==========================================================================
            ProgressBarBO
            ========================================================================== */
        var ProgressBarBO = (function (_super) {
            __extends(ProgressBarBO, _super);
            function ProgressBarBO(model) {
                _super.call(this, model);
                this.model = model;
                this.SetPercentage();
            }
            ProgressBarBO.prototype.SetPercentage = function () {
                var ratio = 100 / (this.model.max - this.model.min);
                var percentage = Math.round((this.model.value - this.model.min) * ratio);
                if (percentage < 0) {
                    this.model.percentage = 0;
                }
                else if (percentage > 100) {
                    this.model.percentage = 100;
                }
                else {
                    this.model.percentage = percentage;
                }
            };
            return ProgressBarBO;
        })(Business.BaseBO);
        Business.ProgressBarBO = ProgressBarBO;
    })(Business = ModernWeb.Business || (ModernWeb.Business = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseController.ts" />
/// <reference path="../Business/ProgressBarBO.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        /*  DefaultConfig
            ========================================================================== */
        var progressBarConfig = {
            min: 0,
            max: 100,
            value: 0
        };
        /*  ==========================================================================
            ProgressBarController
            ========================================================================== */
        var ProgressBarController = (function (_super) {
            __extends(ProgressBarController, _super);
            function ProgressBarController($scope) {
                _super.call(this, $scope);
                this.SetDefaultValue();
                this.progressBarBO = new ModernWeb.Business.ProgressBarBO(this.scope);
                this.SetWatches();
            }
            ProgressBarController.prototype.SetDefaultValue = function () {
                if (!angular.isDefined(this.scope.min)) {
                    this.scope.min = progressBarConfig.min;
                }
                if (!angular.isDefined(this.scope.max)) {
                    this.scope.max = progressBarConfig.max;
                }
                if (!angular.isDefined(this.scope.value)) {
                    this.scope.value = progressBarConfig.value;
                    var ratio = 100 / (this.scope.max - this.scope.min);
                    var percentage = Math.round((this.scope.value - this.scope.min) * ratio);
                    this.scope.percentage = percentage;
                }
            };
            ProgressBarController.prototype.SetWatches = function () {
                var _this = this;
                this.scope.$watch(function () { return _this.scope.value; }, function (newValue, oldValue) {
                    _this.progressBarBO.SetPercentage();
                });
                this.scope.$watch(function () { return _this.scope.min; }, function (newValue, oldValue) {
                    _this.progressBarBO.SetPercentage();
                });
                this.scope.$watch(function () { return _this.scope.max; }, function (newValue, oldValue) {
                    _this.progressBarBO.SetPercentage();
                });
            };
            ProgressBarController.prototype.SetPercentage = function () {
                this.progressBarBO.SetPercentage();
            };
            ProgressBarController.$inject = ['$scope'];
            return ProgressBarController;
        })(Controllers.BaseController);
        Controllers.ProgressBarController = ProgressBarController;
    })(Controllers = ModernWeb.Controllers || (ModernWeb.Controllers = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseDirective.ts" />
/// <reference path="../Controllers/ProgressBarController.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Directives;
    (function (Directives) {
        'use strict';
        /* ==========================================================================
            ProgressBarDirective
            ========================================================================== */
        var ProgressBarDirective = (function (_super) {
            __extends(ProgressBarDirective, _super);
            function ProgressBarDirective() {
                _super.call(this);
                this.require = '^mwProgress';
                this.transclude = true;
                this.replace = true;
                this.templateUrl = function (element, attributs) {
                    return attributs.templateUrl || '/lib/modernWeb/templates/ProgressBar/ProgressBar.html';
                };
            }
            ProgressBarDirective.Factory = function () {
                var directive = function () {
                    return new ProgressBarDirective();
                };
                directive["$inject"] = [];
                return directive;
            };
            return ProgressBarDirective;
        })(Directives.BaseDirective);
        Directives.ProgressBarDirective = ProgressBarDirective;
    })(Directives = ModernWeb.Directives || (ModernWeb.Directives = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseBO.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Business;
    (function (Business) {
        'use strict';
        /* ==========================================================================
            ProgressBarAnimatedBO
            ========================================================================== */
        var ProgressBarAnimatedBO = (function (_super) {
            __extends(ProgressBarAnimatedBO, _super);
            function ProgressBarAnimatedBO(model) {
                _super.call(this, model);
                this.model = model;
                this.model.isRunning = false;
                this.model.isPaused = false;
            }
            ProgressBarAnimatedBO.prototype.Play = function () {
                this.model.isRunning = true;
                this.model.isPaused = false;
            };
            ProgressBarAnimatedBO.prototype.Pause = function () {
                this.model.isPaused = true;
            };
            ProgressBarAnimatedBO.prototype.Stop = function () {
                this.model.isRunning = false;
                this.model.isPaused = false;
            };
            return ProgressBarAnimatedBO;
        })(Business.BaseBO);
        Business.ProgressBarAnimatedBO = ProgressBarAnimatedBO;
    })(Business = ModernWeb.Business || (ModernWeb.Business = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseController.ts" />
/// <reference path="../Business/ProgressBarAnimatedBO.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        /*  Default config
            ========================================================================== */
        var progressCssConfig = {
            delay: 3500
        };
        /*  ==========================================================================
            ProgressBarAnimatedController
            ========================================================================== */
        var ProgressBarAnimatedController = (function (_super) {
            __extends(ProgressBarAnimatedController, _super);
            function ProgressBarAnimatedController($scope) {
                _super.call(this, $scope);
                this.SetDefaultValue();
                this.progressBO = new ModernWeb.Business.ProgressBarAnimatedBO(this.scope);
            }
            ProgressBarAnimatedController.prototype.SetDefaultValue = function () {
                if (!angular.isDefined(this.scope.delay)) {
                    this.scope.delay = progressCssConfig.delay;
                }
            };
            ProgressBarAnimatedController.prototype.Play = function () {
                this.progressBO.Play();
            };
            ProgressBarAnimatedController.prototype.Pause = function () {
                this.progressBO.Pause();
            };
            ProgressBarAnimatedController.prototype.Stop = function () {
                this.progressBO.Stop();
            };
            ProgressBarAnimatedController.$inject = ['$scope'];
            return ProgressBarAnimatedController;
        })(Controllers.BaseController);
        Controllers.ProgressBarAnimatedController = ProgressBarAnimatedController;
    })(Controllers = ModernWeb.Controllers || (ModernWeb.Controllers = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseDirective.ts" />
/// <reference path="../Controllers/ProgressBarAnimatedController.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Directives;
    (function (Directives) {
        'use strict';
        /* ==========================================================================
            ProgressBarAnimatedDirective
            ========================================================================== */
        var ProgressBarAnimatedDirective = (function (_super) {
            __extends(ProgressBarAnimatedDirective, _super);
            function ProgressBarAnimatedDirective() {
                _super.call(this);
                this.require = '^mwProgress';
                this.transclude = true;
                this.replace = true;
                this.templateUrl = function (element, attributs) {
                    return attributs.templateUrl || '/lib/modernWeb/templates/ProgressBar/ProgressBarAnimated.html';
                };
                this.scope = false;
            }
            ProgressBarAnimatedDirective.Factory = function () {
                var directive = function () {
                    return new ProgressBarAnimatedDirective();
                };
                directive["$inject"] = [];
                return directive;
            };
            return ProgressBarAnimatedDirective;
        })(Directives.BaseDirective);
        Directives.ProgressBarAnimatedDirective = ProgressBarAnimatedDirective;
    })(Directives = ModernWeb.Directives || (ModernWeb.Directives = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseBO.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Business;
    (function (Business) {
        'use strict';
        /* ==========================================================================
            TimerBO
            ========================================================================== */
        var TimerBO = (function (_super) {
            __extends(TimerBO, _super);
            function TimerBO(model, timeoutService, callback) {
                _super.call(this, model);
                this.model = model;
                this.model.isRunning = false;
                this.model.timeLeft = this.model.delay;
                this.timeoutService = timeoutService;
                this.callback = callback;
            }
            Object.defineProperty(TimerBO.prototype, "Model", {
                get: function () { return this.model; },
                enumerable: true,
                configurable: true
            });
            TimerBO.prototype.ClearTimer = function () {
                if (this.timeoutHandler == null) {
                    return;
                }
                var success = this.timeoutService.cancel(this.timeoutHandler);
                if (success) {
                    this.timeoutHandler = null;
                }
            };
            TimerBO.prototype.Start = function () {
                var _this = this;
                if (this.model.delay <= 0) {
                    return;
                }
                //Prevent to have collateral timeout
                this.ClearTimer();
                this.model.isRunning = true;
                this.model.startDate = new Date();
                this.timeoutHandler = this.timeoutService(function () {
                    _this.callback();
                    _this.ResetTimeLeft();
                }, this.model.timeLeft);
            };
            TimerBO.prototype.Pause = function () {
                if (!this.model.isRunning) {
                    return;
                }
                this.model.isRunning = false;
                var timeLeft = this.model.timeLeft - this.TimeElapsed;
                this.model.timeLeft = (timeLeft < 0) ? 0 : timeLeft;
                this.ClearTimer();
            };
            TimerBO.prototype.Clear = function () {
                this.model.isRunning = false;
                this.ResetTimeLeft();
                this.ClearTimer();
            };
            TimerBO.prototype.ResetTimeLeft = function () {
                this.model.timeLeft = this.model.delay;
            };
            Object.defineProperty(TimerBO.prototype, "TimeElapsed", {
                get: function () {
                    return new Date().getTime() - this.model.startDate.getTime();
                },
                enumerable: true,
                configurable: true
            });
            return TimerBO;
        })(Business.BaseBO);
        Business.TimerBO = TimerBO;
    })(Business = ModernWeb.Business || (ModernWeb.Business = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseBO.ts" />
/// <reference path="TimerBO.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Business;
    (function (Business) {
        'use strict';
        /* ==========================================================================
            CarouselBO
            ========================================================================== */
        var CarouselBO = (function (_super) {
            __extends(CarouselBO, _super);
            function CarouselBO(model, progressBarManager) {
                _super.call(this, model);
                this.model = model;
                this.model.slides = new Array();
                this.model.currentIndex = 0;
                this.model.nextIndex = 0;
                this.model.currentPlayType = this.model.playType;
                this.model.playState = ModernWeb.PlayState.Stop;
                this.model.isAnimating = false;
                this.model.isReverseAnimating = false;
                this.model.isPending = true;
                this.model.isTransitionFinished = false;
                // Initialize
                this.progressBarManager = progressBarManager;
            }
            Object.defineProperty(CarouselBO.prototype, "IsAutomatic", {
                get: function () { return this.model.playType == ModernWeb.PlayType.Automatic; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CarouselBO.prototype, "IsAnimating", {
                get: function () { return this.model.isAnimating; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CarouselBO.prototype, "IsPending", {
                get: function () { return this.model.isPending; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CarouselBO.prototype, "IsPaused", {
                get: function () { return this.model.playState == ModernWeb.PlayState.Pause; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CarouselBO.prototype, "IsSlidable", {
                get: function () { return this.model.slides.length >= 1; },
                enumerable: true,
                configurable: true
            });
            CarouselBO.prototype.IncrementIndex = function (index) {
                return (index + 1) % this.model.slides.length;
            };
            CarouselBO.prototype.DecrementIndex = function (index) {
                return ((index - 1) >= 0) ? index - 1 : this.model.slides.length - 1;
            };
            CarouselBO.prototype.IsCurrent = function (index) {
                return this.model.currentIndex === index;
            };
            CarouselBO.prototype.IsNext = function (index) {
                return this.model.nextIndex === index;
            };
            CarouselBO.prototype.IsActive = function (index) {
                return this.IsCurrent(index);
            };
            CarouselBO.prototype.IsShowed = function (index) {
                return (this.IsActive(index) || (this.model.isAnimating && this.IsNext(index)));
            };
            CarouselBO.prototype.IsIn = function (index) {
                return (this.model.isAnimating && this.IsNext(index));
            };
            CarouselBO.prototype.IsOut = function (index) {
                return (this.model.isAnimating && this.IsCurrent(index));
            };
            CarouselBO.prototype.GoTo = function (index, trigerredType) {
                // Break
                // if index is lower than 0
                // if index is greater than number of slides
                // if an animation is running 
                // if the next slide is the same than previously
                if (index < 0 ||
                    index > this.model.slides.length ||
                    this.model.isAnimating ||
                    this.model.nextIndex == index) {
                    return;
                }
                this.model.currentPlayType = trigerredType;
                // Set the mode to manual if previous/next/goTo is trigerred
                if (this.model.currentPlayType == ModernWeb.PlayType.Manual) {
                    this.Stop();
                }
                this.StartTransition(index);
                // Handle transition manually 
                // WARNING: the transition is handled automatically via handleAnimationEnd
                if (!this.model.isAnimated) {
                    this.HandleTransition();
                }
            };
            CarouselBO.prototype.SetReverseAnimating = function () {
                if (!this.model.isReverseAnimated) {
                    return;
                }
                var currentIsFirst = this.model.currentIndex == 0;
                var currentIsLast = this.model.currentIndex == this.model.slides.length - 1;
                var nextIsFirst = this.model.nextIndex == 0;
                var nextIsLast = this.model.nextIndex == this.model.slides.length - 1;
                if ((this.model.nextIndex > this.model.currentIndex && !(currentIsFirst && nextIsLast)) ||
                    (currentIsLast && nextIsFirst)) {
                    this.model.isReverseAnimating = false;
                }
                else {
                    this.model.isReverseAnimating = true;
                }
            };
            CarouselBO.prototype.StartTimer = function () {
                // Break
                // if the mode is not automatic
                // if the current state is not play
                // if is not pending state
                if (this.model.playType != ModernWeb.PlayType.Automatic ||
                    this.model.playState != ModernWeb.PlayState.Play ||
                    !this.model.isPending) {
                    return;
                }
                this.timerManager.Start();
                this.progressBarManager.Play();
            };
            CarouselBO.prototype.StartTransition = function (index) {
                // Clear timer
                this.timerManager.Clear();
                this.progressBarManager.Stop();
                // Set state
                this.model.isAnimating = true;
                this.model.isPending = false;
                this.model.isTransitionFinished = false;
                // Update next index
                this.model.nextIndex = index;
                // Update direction
                this.SetReverseAnimating();
                // Update slides states
                this.UpdateSlides();
            };
            CarouselBO.prototype.UpdateSlides = function () {
                for (var i = 0, count = this.model.slides.length; i < count; i++) {
                    var slide = this.model.slides[i];
                    // update active state
                    slide.isActive = this.IsActive(i);
                    // update showed state
                    slide.isShowed = this.IsShowed(i);
                    // update in state
                    slide.isIn = this.IsIn(i);
                    // update out state
                    slide.isOut = this.IsOut(i);
                }
            };
            CarouselBO.prototype.HandleTransition = function () {
                // Prevent to start parallele transition 
                if (!this.model.isTransitionFinished) {
                    this.model.isTransitionFinished = true;
                    // Finish the transition
                    this.FinishTransition();
                }
            };
            CarouselBO.prototype.FinishTransition = function () {
                // Set state 
                this.model.isAnimating = false;
                this.model.isPending = true;
                // Update current index
                this.model.currentIndex = this.model.nextIndex;
                // Update slides
                this.UpdateSlides();
                // Restart timer
                this.StartTimer();
            };
            CarouselBO.prototype.SetTimerManager = function (timeoutService) {
                var _this = this;
                if (typeof this.timerManager == "undefined") {
                    if (this.model.delay > 0) {
                        this.timerModel = {
                            delay: this.model.delay
                        };
                        this.timerManager = new Business.TimerBO(this.timerModel, timeoutService, function () { return _this.GoToNext(ModernWeb.PlayType.Automatic); });
                    }
                }
                else {
                    this.timerManager.Model.delay = this.model.delay;
                    this.timerManager.Clear();
                    this.progressBarManager.Stop();
                    this.StartTimer();
                }
            };
            CarouselBO.prototype.HandleNgAnimationEnd = function (event) {
                var _this = this;
                this.scope.$apply(function () {
                    _this.HandleAnimationEnd(event);
                });
            };
            CarouselBO.prototype.HandleAnimationEnd = function (event) {
                var target = event.target || event.srcElement;
                // WARNING Handle only animation event on slide element
                if (!target.hasAttribute("slide")) {
                    return;
                }
                event.stopPropagation();
                this.HandleTransition();
            };
            CarouselBO.prototype.AddSlide = function (slide) {
                this.model.slides.push({
                    id: CarouselBO.counter++,
                    isActive: false,
                    isShowed: false,
                    isIn: false,
                    isOut: false,
                    carousel: this.model
                });
                if (this.model.slides.length === 1 || (angular.isDefined(slide.isActive) && slide.isActive)) {
                    var indexLastSlide = this.model.slides.length - 1;
                    this.model.slides[indexLastSlide].isActive = true;
                    this.model.slides[indexLastSlide].isShowed = true;
                }
            };
            CarouselBO.prototype.RemoveSlide = function (slide) {
                for (var i = 0, count = this.model.slides.length; i < count; i++) {
                    var item = this.model.slides[i];
                    if (item.id === slide.id) {
                        this.model.slides.splice(i, 1);
                        return;
                    }
                }
            };
            CarouselBO.prototype.Play = function () {
                if (!this.IsSlidable ||
                    this.model.delay <= 0 ||
                    this.model.playType != ModernWeb.PlayType.Automatic ||
                    this.model.playState == ModernWeb.PlayState.Play) {
                    return;
                }
                this.model.playState = ModernWeb.PlayState.Play;
                this.model.currentPlayType = ModernWeb.PlayType.Automatic;
                if (!this.model.isAnimating) {
                    this.model.isPending = true;
                    this.StartTimer();
                }
            };
            CarouselBO.prototype.Pause = function () {
                this.model.playState = ModernWeb.PlayState.Pause;
                this.timerManager.Pause();
                this.progressBarManager.Pause();
            };
            CarouselBO.prototype.Stop = function () {
                this.model.playState = ModernWeb.PlayState.Stop;
                this.timerManager.Clear();
                this.progressBarManager.Stop();
                // Reset
                if (this.IsAnimating) {
                    // Reset index if an animation is running
                    this.model.nextIndex = this.model.currentIndex;
                }
                this.model.isAnimating = false;
                this.model.isPending = false;
                this.model.isTransitionFinished = false;
                this.UpdateSlides();
            };
            CarouselBO.prototype.GoToNext = function (trigerredType) {
                var nextIndex = (this.model.playDirection == ModernWeb.PlayDirection.Descending) ? this.DecrementIndex(this.model.currentIndex) : this.IncrementIndex(this.model.currentIndex);
                this.GoTo(nextIndex, trigerredType);
            };
            CarouselBO.prototype.GoToPrev = function (trigerredType) {
                var nextIndex = (this.model.playDirection == ModernWeb.PlayDirection.Descending) ? this.IncrementIndex(this.model.currentIndex) : this.DecrementIndex(this.model.currentIndex);
                this.GoTo(nextIndex, trigerredType);
            };
            CarouselBO.prototype.GoToElementAt = function (index, trigerredType) {
                this.GoTo(index, trigerredType);
            };
            CarouselBO.counter = 0;
            return CarouselBO;
        })(Business.BaseBO);
        Business.CarouselBO = CarouselBO;
    })(Business = ModernWeb.Business || (ModernWeb.Business = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseController.ts" />
/// <reference path="../Business/CarouselBO.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        /*  Default config
            ========================================================================== */
        var carouselConfig = {
            delay: 4500,
            playType: ModernWeb.PlayType.Automatic,
            playDirection: ModernWeb.PlayDirection.Ascending,
            isAnimated: true,
            isReverseAnimated: true
        };
        /* ==========================================================================
            CarouselController
            ========================================================================== */
        var CarouselController = (function (_super) {
            __extends(CarouselController, _super);
            function CarouselController($scope, $element, $timeout) {
                _super.call(this, $scope);
                this.progressBarBO = new ModernWeb.Business.ProgressBarAnimatedBO(this.scope);
                this.carouselBO = new ModernWeb.Business.CarouselBO(this.scope, this.progressBarBO);
                this.SetDefaultValue();
                this.SetWatches($element, $timeout);
            }
            CarouselController.prototype.SetDefaultValue = function () {
                if (!angular.isDefined(this.scope.delay)) {
                    this.scope.delay = carouselConfig.delay;
                }
                if (!angular.isDefined(this.scope.playType)) {
                    this.scope.playType = carouselConfig.playType;
                }
                if (!angular.isDefined(this.scope.playDirection)) {
                    this.scope.playDirection = carouselConfig.playDirection;
                }
                if (!angular.isDefined(this.scope.isAnimated)) {
                    this.scope.isAnimated = carouselConfig.isAnimated;
                }
                if (!angular.isDefined(this.scope.isReverseAnimated)) {
                    this.scope.isReverseAnimated = carouselConfig.isReverseAnimated;
                }
            };
            CarouselController.prototype.SetWatches = function (element, timeoutService) {
                var _this = this;
                // Watch IsAnimated
                this.scope.$watch(function () { return _this.scope.isAnimated; }, function (newValue, oldValue) {
                    _this.AttachAnimationHandler(element);
                });
                // Watch Delay (timer)
                this.scope.$watch(function () { return _this.scope.delay; }, function (newValue, oldValue) {
                    _this.carouselBO.SetTimerManager(timeoutService);
                });
                // Watch PlayType
                this.scope.$watch(function () { return _this.scope.playType; }, function (newValue, oldValue) {
                    if (newValue == ModernWeb.PlayType.Manual) {
                        _this.Stop();
                    }
                    else if (newValue == ModernWeb.PlayType.Automatic) {
                        // Start the carousel
                        _this.Play();
                    }
                });
            };
            CarouselController.prototype.AttachAnimationHandler = function (element) {
                var _this = this;
                if (this.scope.isAnimated && !this.hasAnimationHandlerAttached) {
                    this.hasAnimationHandlerAttached = true;
                    // Add listener on the animation end
                    element.on("animationend", function (event) {
                        _this.carouselBO.HandleNgAnimationEnd(event);
                    });
                    element.on("webkitAnimationEnd", function (event) {
                        _this.carouselBO.HandleNgAnimationEnd(event);
                    });
                    element.on("MSAnimationEnd", function (event) {
                        _this.carouselBO.HandleNgAnimationEnd(event);
                    });
                }
            };
            CarouselController.prototype.AddSlide = function (slide) {
                this.carouselBO.AddSlide(slide);
            };
            CarouselController.prototype.RemoveSlide = function (slide) {
                this.carouselBO.RemoveSlide(slide);
            };
            CarouselController.prototype.IsSlideActive = function (index) {
                return this.carouselBO.IsActive(index);
            };
            CarouselController.prototype.Play = function () {
                this.carouselBO.Play();
            };
            CarouselController.prototype.Pause = function () {
                this.carouselBO.Pause();
            };
            CarouselController.prototype.Stop = function () {
                this.carouselBO.Stop();
            };
            CarouselController.prototype.Next = function () {
                this.carouselBO.GoToNext(ModernWeb.PlayType.Manual);
            };
            CarouselController.prototype.Prev = function () {
                this.carouselBO.GoToPrev(ModernWeb.PlayType.Manual);
            };
            CarouselController.prototype.Select = function (index) {
                this.carouselBO.GoToElementAt(index, ModernWeb.PlayType.Manual);
            };
            Object.defineProperty(CarouselController.prototype, "IsPending", {
                get: function () { return this.carouselBO.IsPending; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CarouselController.prototype, "IsPaused", {
                get: function () { return this.carouselBO.IsPaused; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CarouselController.prototype, "HasProgressBar", {
                get: function () { return this.carouselBO.IsAutomatic; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CarouselController.prototype, "HasNavigation", {
                get: function () { return this.carouselBO.IsSlidable; },
                enumerable: true,
                configurable: true
            });
            CarouselController.$inject = ['$scope', '$element', '$timeout'];
            return CarouselController;
        })(Controllers.BaseController);
        Controllers.CarouselController = CarouselController;
    })(Controllers = ModernWeb.Controllers || (ModernWeb.Controllers = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseDirective.ts" />
/// <reference path="../Controllers/CarouselController.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Directives;
    (function (Directives) {
        'use strict';
        /* ==========================================================================
            Interface
            ========================================================================= */
        /* ==========================================================================
            CarouselDirective
            ========================================================================== */
        var CarouselDirective = (function (_super) {
            __extends(CarouselDirective, _super);
            function CarouselDirective() {
                _super.call(this);
                this.transclude = true;
                this.replace = true;
                this.templateUrl = function (element, attributs) {
                    return attributs.templateUrl || '/lib/modernWeb/templates/Carousel/Carousel.html';
                };
                this.controller = "CarouselController";
                this.controllerAs = "CarouselCtrl";
            }
            CarouselDirective.Factory = function () {
                var directive = function () {
                    return new CarouselDirective();
                };
                directive["$inject"] = [];
                return directive;
            };
            return CarouselDirective;
        })(Directives.BaseDirective);
        Directives.CarouselDirective = CarouselDirective;
    })(Directives = ModernWeb.Directives || (ModernWeb.Directives = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseDirective.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Directives;
    (function (Directives) {
        'use strict';
        /* ==========================================================================
            Interface
            ========================================================================= */
        /* ==========================================================================
            SlideDirective
            ========================================================================== */
        var SlideDirective = (function (_super) {
            __extends(SlideDirective, _super);
            function SlideDirective() {
                _super.call(this);
                this.require = '^mwCarousel';
                this.transclude = true;
                this.replace = true;
                this.templateUrl = function (element, attributs) {
                    return attributs.templateUrl || '/lib/modernWeb/templates/Carousel/Slide.html';
                };
                this.scope = {
                    slide: "="
                };
                this.link = function (scope, element, attributs, carouselCtrl) {
                    carouselCtrl.AddSlide(scope);
                    scope.$on('$destroy', function () {
                        carouselCtrl.RemoveSlide(scope);
                    });
                };
            }
            SlideDirective.Factory = function () {
                var directive = function () {
                    return new SlideDirective();
                };
                directive["$inject"] = [];
                return directive;
            };
            return SlideDirective;
        })(Directives.BaseDirective);
        Directives.SlideDirective = SlideDirective;
    })(Directives = ModernWeb.Directives || (ModernWeb.Directives = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseBO.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Business;
    (function (Business) {
        'use strict';
        /* ==========================================================================
            DialogBO
            ========================================================================== */
        var DialogBO = (function (_super) {
            __extends(DialogBO, _super);
            function DialogBO(model, dialogService) {
                _super.call(this, model);
                this.model = model;
                this.model.isOpen = false;
                this.dialogService = dialogService;
            }
            Object.defineProperty(DialogBO.prototype, "IsOpen", {
                get: function () { return this.Dialog.isOpen; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DialogBO.prototype, "IsCollapse", {
                get: function () { return !this.Dialog.isOpen; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DialogBO.prototype, "Dialog", {
                get: function () {
                    return this.dialogService.RetrieveDialog(this.model.id);
                },
                enumerable: true,
                configurable: true
            });
            DialogBO.prototype.Open = function () {
                this.Dialog.isOpen = true;
                this.model.isOpen = true;
            };
            DialogBO.prototype.Close = function () {
                this.Dialog.isOpen = false;
                this.model.isOpen = false;
            };
            return DialogBO;
        })(Business.BaseBO);
        Business.DialogBO = DialogBO;
    })(Business = ModernWeb.Business || (ModernWeb.Business = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseController.ts" />
/// <reference path="../Business/DialogBO.ts" />
/// <reference path="../Services/DialogService.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        /* ==========================================================================
            DialogController
            ========================================================================== */
        var DialogController = (function (_super) {
            __extends(DialogController, _super);
            function DialogController($scope, dialogService) {
                _super.call(this, $scope);
                this.dialogBO = new ModernWeb.Business.DialogBO(this.scope, dialogService);
            }
            Object.defineProperty(DialogController.prototype, "IsOpen", {
                get: function () { return this.dialogBO.IsOpen; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DialogController.prototype, "IsCollapse", {
                get: function () { return this.dialogBO.IsCollapse; },
                enumerable: true,
                configurable: true
            });
            DialogController.prototype.Open = function () {
                if (this.dialogBO.IsOpen) {
                    return;
                }
                this.dialogBO.Open();
            };
            DialogController.prototype.Close = function () {
                if (!this.dialogBO.IsOpen) {
                    return;
                }
                this.dialogBO.Close();
            };
            DialogController.$inject = ['$scope', 'dialogService'];
            return DialogController;
        })(Controllers.BaseController);
        Controllers.DialogController = DialogController;
    })(Controllers = ModernWeb.Controllers || (ModernWeb.Controllers = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseDirective.ts" />
/// <reference path="../Controllers/DialogController.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Directives;
    (function (Directives) {
        'use strict';
        /* ==========================================================================
            DialogDirective
            ========================================================================== */
        var DialogDirective = (function (_super) {
            __extends(DialogDirective, _super);
            function DialogDirective(dialogService) {
                _super.call(this);
                this.transclude = true;
                this.replace = true;
                this.templateUrl = function (element, attributs) {
                    return attributs.templateUrl || '/lib/modernWeb/templates/Dialog/Dialog.html';
                };
                this.link = function ($scope, element, attributes) {
                    $scope.id = attributes.id;
                    DialogDirective.dialogService.AddDialog($scope);
                };
                DialogDirective.dialogService = dialogService;
            }
            DialogDirective.Factory = function () {
                var directive = function (dialogService) {
                    return new DialogDirective(dialogService);
                };
                directive["$inject"] = ['dialogService'];
                return directive;
            };
            return DialogDirective;
        })(Directives.BaseDirective);
        Directives.DialogDirective = DialogDirective;
    })(Directives = ModernWeb.Directives || (ModernWeb.Directives = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseDirective.ts" />
///// <reference path="../Controllers/WizardController.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Directives;
    (function (Directives) {
        'use strict';
        /* ==========================================================================
            Interface
            ========================================================================= */
        /* ==========================================================================
            WizardDirective
            ========================================================================== */
        var WizardDirective = (function (_super) {
            __extends(WizardDirective, _super);
            function WizardDirective() {
                _super.call(this);
                this.transclude = true;
                this.replace = true;
                this.templateUrl = function (element, attributs) {
                    return attributs.templateUrl || '/lib/modernWeb/templates/Wizard/Wizard.html';
                };
                this.controller = "WizardController";
                this.controllerAs = "WizardCtrl";
                this.link = function (scope, element, attributs) {
                };
            }
            WizardDirective.Factory = function () {
                var directive = function () {
                    return new WizardDirective();
                };
                directive["$inject"] = [];
                return directive;
            };
            return WizardDirective;
        })(Directives.BaseDirective);
        Directives.WizardDirective = WizardDirective;
    })(Directives = ModernWeb.Directives || (ModernWeb.Directives = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseDirective.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Directives;
    (function (Directives) {
        'use strict';
        /* ==========================================================================
            StepDirective
            ========================================================================== */
        var StepDirective = (function (_super) {
            __extends(StepDirective, _super);
            function StepDirective() {
                _super.call(this);
                this.require = '^mwWizard';
                this.transclude = true;
                this.replace = true;
                this.templateUrl = function (element, attributs) {
                    return attributs.templateUrl || '/lib/modernWeb/templates/Wizard/Step.html';
                };
                this.scope = {
                    step: "=",
                    Valid: "&valid",
                    Validate: "&validate"
                };
                this.link = function (scope, element, attributs, wizardCtrl) {
                    // Default Value
                    if (!angular.isDefined(scope.Valid)) {
                        scope.Valid = function () {
                            return true;
                        };
                    }
                    if (!angular.isDefined(scope.Validate)) {
                        scope.Validate = function () {
                            return;
                        };
                    }
                    // Step methods
                    scope.Next = function () {
                        wizardCtrl.Next();
                    };
                    scope.Previous = function () {
                        wizardCtrl.Previous();
                    };
                    scope.Select = function () {
                        wizardCtrl.Select(scope.step.id);
                    };
                    scope.Finish = function (event) {
                        wizardCtrl.Finish(event);
                    };
                    // Destroy
                    scope.$on('$destroy', function () {
                        wizardCtrl.RemoveStep(scope);
                    });
                    // Add step in Wizard
                    wizardCtrl.AddStep(scope);
                };
            }
            StepDirective.Factory = function () {
                var directive = function () {
                    return new StepDirective();
                };
                directive["$inject"] = [];
                return directive;
            };
            return StepDirective;
        })(Directives.BaseDirective);
        Directives.StepDirective = StepDirective;
    })(Directives = ModernWeb.Directives || (ModernWeb.Directives = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseController.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        /*  ==========================================================================
            InsertController
            ========================================================================== */
        var InsertController = (function (_super) {
            __extends(InsertController, _super);
            function InsertController($scope, $element, $templateRequest, $compile) {
                _super.call(this, $scope);
                this.element = $element;
                this.templateRequestService = $templateRequest;
                this.compileService = $compile;
            }
            InsertController.prototype.After = function () {
                var _this = this;
                this.templateRequestService(this.scope.templateUrl).then(function (html) {
                    var template = angular.element(html);
                    _this.scope.elementTarget.after(template);
                    _this.compileService(template)(_this.scope);
                });
            };
            InsertController.prototype.Before = function () {
                var _this = this;
                this.templateRequestService(this.scope.templateUrl).then(function (html) {
                    var template = angular.element(html);
                    _this.scope.elementTarget.before(template);
                    _this.compileService(template)(_this.scope);
                });
            };
            InsertController.$inject = ['$scope', '$element', '$templateRequest', '$compile'];
            return InsertController;
        })(Controllers.BaseController);
        Controllers.InsertController = InsertController;
    })(Controllers = ModernWeb.Controllers || (ModernWeb.Controllers = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseController.ts" />
/// <reference path="DialogController.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        /* ==========================================================================
            RemoteDialogController
            ========================================================================== */
        var RemoteDialogController = (function (_super) {
            __extends(RemoteDialogController, _super);
            function RemoteDialogController($scope, $element, dialogService, $templateRequest, $compile) {
                var _this = this;
                _super.call(this, $scope, dialogService);
                this.scope.close = function () { return _this.Close(); };
                this.dialogService = dialogService;
                this.templateRequestService = $templateRequest;
                this.compileService = $compile;
                this.isInstanciated = false;
            }
            RemoteDialogController.prototype.Open = function () {
                if (!this.isInstanciated) {
                    this.dialogService.AddDialog({ id: this.scope.id, isOpen: (typeof this.scope.isOpen != "undefined") ? this.scope.isOpen : false });
                    this.isInstanciated = true;
                }
                _super.prototype.Open.call(this);
            };
            RemoteDialogController.prototype.Close = function () {
                if (!this.isInstanciated) {
                    return;
                }
                _super.prototype.Close.call(this);
                this.scope.elementTarget.parent().find("#" + this.scope.id).remove();
            };
            RemoteDialogController.prototype.After = function () {
                var _this = this;
                if (this.isInstanciated && this.IsOpen) {
                    return;
                }
                this.Open();
                this.templateRequestService(this.scope.templateUrl).then(function (html) {
                    var template = angular.element(html);
                    var content = _this.compileService(template)(_this.scope);
                    _this.scope.elementTarget.after(content);
                });
            };
            RemoteDialogController.prototype.Before = function () {
                var _this = this;
                if (this.isInstanciated && this.IsOpen) {
                    return;
                }
                this.Open();
                this.templateRequestService(this.scope.templateUrl).then(function (html) {
                    var template = angular.element(html);
                    var content = _this.compileService(template)(_this.scope);
                    _this.scope.elementTarget.before(content);
                });
            };
            RemoteDialogController.$inject = ['$scope', '$element', 'dialogService', '$templateRequest', '$compile'];
            return RemoteDialogController;
        })(Controllers.DialogController);
        Controllers.RemoteDialogController = RemoteDialogController;
    })(Controllers = ModernWeb.Controllers || (ModernWeb.Controllers = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseBO.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Business;
    (function (Business) {
        'use strict';
        /* ==========================================================================
            WizardBO
            ========================================================================== */
        var WizardBO = (function (_super) {
            __extends(WizardBO, _super);
            function WizardBO(model) {
                _super.call(this, model);
                this.model = model;
                this.model.steps = new Array();
                this.model.currentIndex = 0;
            }
            WizardBO.prototype.UpdateSteps = function () {
                for (var i = 0, count = this.model.steps.length; i < count; i++) {
                    var step = this.model.steps[i];
                    // Update active state
                    step.isActive = this.IsActive(i);
                }
            };
            WizardBO.prototype.IsActive = function (index) {
                return index == this.model.currentIndex;
            };
            WizardBO.prototype.IncrementIndex = function (index) {
                return ((index + 1) <= this.model.steps.length) ? index + 1 : index;
            };
            WizardBO.prototype.DecrementIndex = function (index) {
                return ((index - 1) >= 0) ? index - 1 : 0;
            };
            WizardBO.prototype.AreIntermediateStepsValid = function (startIndex, endIndex) {
                for (var i = startIndex; i < endIndex; i++) {
                    if (!this.model.steps[i].Valid()) {
                        return false;
                    }
                }
                return true;
            };
            WizardBO.prototype.RetrieveStepIndex = function (id) {
                for (var i = 0, count = this.model.steps.length; i < count; i++) {
                    var step = this.model.steps[i];
                    if (step.id === id) {
                        return i;
                    }
                }
                return null;
            };
            WizardBO.prototype.AddStep = function (step) {
                this.model.steps.push({
                    id: WizardBO.counter++,
                    Valid: step.Valid,
                    Validate: step.Validate,
                    isActive: false,
                    isSubmitted: false,
                    hasPreviousControl: false,
                    hasNextControl: false,
                    hasFinishControl: false
                });
                if (this.model.steps.length === 1) {
                    this.model.steps[0].isActive = true;
                }
                // Set Controls (previous, next, finish) for each step
                for (var i = 0, count = this.model.steps.length; i < count; i++) {
                    var item = this.model.steps[i];
                    item.hasNextControl = false;
                    item.hasPreviousControl = false;
                    item.hasFinishControl = false;
                    if (i < (count - 1)) {
                        item.hasNextControl = true;
                    }
                    if (i > 0) {
                        item.hasPreviousControl = true;
                    }
                    if (i === (count - 1)) {
                        item.hasFinishControl = true;
                    }
                }
            };
            WizardBO.prototype.RemoveStep = function (step) {
                for (var i = 0, count = this.model.steps.length; i < count; i++) {
                    var item = this.model.steps[i];
                    if (item.id === step.id) {
                        this.model.steps.splice(i, 1);
                        return;
                    }
                }
            };
            WizardBO.prototype.TriggerIntermediateStepsValidation = function (startIndex, endIndex) {
                for (var i = startIndex; i < endIndex; i++) {
                    var item = this.model.steps[i];
                    // Update submit state
                    item.isSubmitted = true;
                    // Trigger Validate function
                    item.Validate();
                }
            };
            WizardBO.prototype.GoTo = function (index) {
                this.TriggerIntermediateStepsValidation(this.model.currentIndex, index);
                if (index == this.model.currentIndex ||
                    (index > this.model.currentIndex && !this.AreIntermediateStepsValid(this.model.currentIndex, index))) {
                    return;
                }
                if (index >= 0 && index <= this.model.steps.length - 1) {
                    this.model.currentIndex = index;
                    this.UpdateSteps();
                }
            };
            WizardBO.prototype.GoToNext = function () {
                this.GoTo(this.IncrementIndex(this.model.currentIndex));
            };
            WizardBO.prototype.GoToPrevious = function () {
                this.GoTo(this.DecrementIndex(this.model.currentIndex));
            };
            WizardBO.prototype.GoToId = function (id) {
                this.GoTo(this.RetrieveStepIndex(id));
            };
            WizardBO.prototype.Finish = function ($event) {
                this.TriggerIntermediateStepsValidation(0, this.model.steps.length);
                if (!this.AreIntermediateStepsValid(0, this.model.steps.length)) {
                    event.preventDefault();
                    return;
                }
                this.model.currentIndex = 0;
            };
            WizardBO.prototype.Cancel = function () {
                this.model.currentIndex = 0;
            };
            WizardBO.counter = 0;
            return WizardBO;
        })(Business.BaseBO);
        Business.WizardBO = WizardBO;
    })(Business = ModernWeb.Business || (ModernWeb.Business = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseController.ts" />
/// <reference path="../Business/WizardBO.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        /* ==========================================================================
            WizardController
            ========================================================================== */
        var WizardController = (function (_super) {
            __extends(WizardController, _super);
            function WizardController($scope) {
                _super.call(this, $scope);
                this.wizardBO = new ModernWeb.Business.WizardBO(this.scope);
            }
            WizardController.prototype.AddStep = function (step) {
                this.wizardBO.AddStep(step);
            };
            WizardController.prototype.RemoveStep = function (scope) {
                this.wizardBO.RemoveStep(scope.step);
            };
            WizardController.prototype.Next = function () {
                this.wizardBO.GoToNext();
            };
            WizardController.prototype.Previous = function () {
                this.wizardBO.GoToPrevious();
            };
            WizardController.prototype.Select = function (id) {
                this.wizardBO.GoToId(id);
            };
            WizardController.prototype.Finish = function (event) {
                this.wizardBO.Finish(event);
            };
            WizardController.prototype.Cancel = function () {
                this.wizardBO.Cancel();
            };
            WizardController.$inject = ['$scope'];
            return WizardController;
        })(Controllers.BaseController);
        Controllers.WizardController = WizardController;
    })(Controllers = ModernWeb.Controllers || (ModernWeb.Controllers = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseController.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Controllers;
    (function (Controllers) {
        'use strict';
        /* ==========================================================================
            GridController
            ========================================================================== */
        var GridController = (function (_super) {
            __extends(GridController, _super);
            function GridController($scope) {
                _super.call(this, $scope);
            }
            GridController.prototype.SynchronizeScroll = function () {
            };
            return GridController;
        })(Controllers.BaseController);
        Controllers.GridController = GridController;
    })(Controllers = ModernWeb.Controllers || (ModernWeb.Controllers = {}));
})(ModernWeb || (ModernWeb = {}));
/// <reference path="ModernWeb.ts" />
/// <reference path="Services/DialogService.ts" />
/// <reference path="Directives/AnimateNumberDirective.ts" />
/// <reference path="Directives/ProgressDirective.ts" />
/// <reference path="Directives/ProgressBarDirective.ts" />
/// <reference path="Directives/ProgressBarAnimatedDirective.ts" />
/// <reference path="Directives/CarouselDirective.ts" />
/// <reference path="Directives/SlideDirective.ts" />
/// <reference path="Directives/DialogDirective.ts" />
/// <reference path="Directives/WizardDirective.ts" />
/// <reference path="Directives/StepDirective.ts" />
/// <reference path="Controllers/AnimateNumberController.ts" />
/// <reference path="Controllers/InsertController.ts" />
/// <reference path="Controllers/ProgressController.ts" />
/// <reference path="Controllers/ProgressBarController.ts" />
/// <reference path="Controllers/ProgressBarAnimatedController.ts" />
/// <reference path="Controllers/CarouselController.ts" />
/// <reference path="Controllers/DialogController.ts" />
/// <reference path="Controllers/RemoteDialogController.ts" />
/// <reference path="Controllers/WizardController.ts" />
/// <reference path="Controllers/GridController.ts" />
var ModernWeb;
(function (ModernWeb) {
    'use strict';
    /*  ==========================================================================
        Module
        ========================================================================== */
    angular
        .module('ModernWeb', [])
        .run(['$rootScope', function ($rootScope) {
            $rootScope.PlayState = ModernWeb.PlayState;
            $rootScope.PlayType = ModernWeb.PlayType;
            $rootScope.PlayDirection = ModernWeb.PlayDirection;
        }])
        .service('dialogService', ModernWeb.Services.DialogService)
        .directive('mwAnimateNumber', ModernWeb.Directives.AnimateNumberDirective.Factory())
        .directive('mwProgress', ModernWeb.Directives.ProgressDirective.Factory())
        .directive('mwProgressBar', ModernWeb.Directives.ProgressBarDirective.Factory())
        .directive('mwProgressBarAnimated', ModernWeb.Directives.ProgressBarAnimatedDirective.Factory())
        .directive('mwDialog', ModernWeb.Directives.DialogDirective.Factory())
        .directive('mwCarousel', ModernWeb.Directives.CarouselDirective.Factory())
        .directive('mwSlide', ModernWeb.Directives.SlideDirective.Factory())
        .directive('mwWizard', ModernWeb.Directives.WizardDirective.Factory())
        .directive('mwStep', ModernWeb.Directives.StepDirective.Factory())
        .directive('mwGrid', ModernWeb.Directives.GridDirective.Factory())
        .controller('AnimateNumberController', ModernWeb.Controllers.AnimateNumberController)
        .controller('InsertController', ModernWeb.Controllers.InsertController)
        .controller('ProgressController', ModernWeb.Controllers.ProgressController)
        .controller('ProgressBarController', ModernWeb.Controllers.ProgressBarController)
        .controller('ProgressBarAnimatedController', ModernWeb.Controllers.ProgressBarAnimatedController)
        .controller('DialogController', ModernWeb.Controllers.DialogController)
        .controller('RemoteDialogController', ModernWeb.Controllers.RemoteDialogController)
        .controller('CarouselController', ModernWeb.Controllers.CarouselController)
        .controller('WizardController', ModernWeb.Controllers.WizardController)
        .controller('GridController', ModernWeb.Controllers.GridController);
})(ModernWeb || (ModernWeb = {}));
/// <reference path="Base/BaseDirective.ts" />
/// <reference path="../Controllers/GridController.ts" />
var ModernWeb;
(function (ModernWeb) {
    var Directives;
    (function (Directives) {
        'use strict';
        /* ==========================================================================
            Interface
            ========================================================================= */
        /* ==========================================================================
            GridDirective
            ========================================================================== */
        var GridDirective = (function (_super) {
            __extends(GridDirective, _super);
            function GridDirective() {
                _super.call(this);
                this.transclude = true;
                this.replace = true;
                this.templateUrl = function (element, attributs) {
                    return attributs.templateUrl || '/lib/modernWeb/templates/Grid/Grid.html';
                };
            }
            GridDirective.Factory = function () {
                var directive = function () {
                    return new GridDirective();
                };
                directive["$inject"] = [];
                return directive;
            };
            return GridDirective;
        })(Directives.BaseDirective);
        Directives.GridDirective = GridDirective;
    })(Directives = ModernWeb.Directives || (ModernWeb.Directives = {}));
})(ModernWeb || (ModernWeb = {}));
//# sourceMappingURL=modernWeb.js.map