(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/layouts/MainLayout.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dashboard/layouts/MainLayout.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      drawer: false
    };
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/layouts/MainLayout.vue?vue&type=template&id=9a1afe62&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dashboard/layouts/MainLayout.vue?vue&type=template&id=9a1afe62& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-app",
    { staticClass: "mx-auto overflow-hidden" },
    [
      _c(
        "v-app-bar",
        { attrs: { color: "light-blue darken-4", dark: "" } },
        [
          _c("v-app-bar-nav-icon", {
            on: {
              click: function($event) {
                _vm.drawer = true
              }
            }
          }),
          _vm._v(" "),
          _c("v-toolbar-title", [_vm._v("Masaza Cup")]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            { attrs: { icon: "" } },
            [
              _c(
                "v-badge",
                { attrs: { color: "error", overlap: "" } },
                [
                  _c("template", { slot: "badge" }, [_vm._v("400")]),
                  _vm._v(" "),
                  _c("v-icon", { attrs: { color: "tertiary" } }, [
                    _vm._v("mdi-bell")
                  ])
                ],
                2
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("v-toolbar-title", [_vm._v("Username")]),
          _vm._v(" "),
          _c(
            "v-btn",
            { attrs: { icon: "" } },
            [_c("v-icon", [_vm._v("mdi-dots-vertical")])],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-navigation-drawer",
        {
          staticClass: "light-blue darken-4",
          attrs: { absolute: "", temporary: "", dark: "" },
          model: {
            value: _vm.drawer,
            callback: function($$v) {
              _vm.drawer = $$v
            },
            expression: "drawer"
          }
        },
        [
          _c(
            "v-list",
            { attrs: { nav: "", dense: "" } },
            [
              _c(
                "v-list-item-group",
                {
                  staticStyle: { color: "red" },
                  attrs: { "active-class": "light-blue--text text--lighten-4" }
                },
                [
                  _c(
                    "v-list-item",
                    { attrs: { router: "", to: "/" } },
                    [
                      _c(
                        "v-list-item-action",
                        [_c("v-icon", [_vm._v("mdi-home")])],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-content",
                        [_c("v-list-item-title", [_vm._v("Home")])],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item",
                    { attrs: { router: "", to: "/requests" } },
                    [
                      _c(
                        "v-list-item-action",
                        [
                          _c(
                            "v-badge",
                            { attrs: { color: "error", overlap: "" } },
                            [
                              _c("template", { slot: "badge" }, [
                                _vm._v("400")
                              ]),
                              _vm._v(" "),
                              _c("v-icon", { attrs: { color: "tertiary" } }, [
                                _vm._v("fas fa-clipboard-list")
                              ])
                            ],
                            2
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-content",
                        [_c("v-list-item-title", [_vm._v("Requests")])],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item",
                    { attrs: { router: "" } },
                    [
                      _c(
                        "v-list-item-action",
                        [
                          _c("v-icon", { attrs: { small: "" } }, [
                            _vm._v("fas fa-users")
                          ])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-content",
                        [_c("v-list-item-title", [_vm._v("Persons")])],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item",
                    { attrs: { router: "" } },
                    [
                      _c(
                        "v-list-item-action",
                        [
                          _c("v-icon", { attrs: { small: "" } }, [
                            _vm._v("fas fa-briefcase")
                          ])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-content",
                        [_c("v-list-item-title", [_vm._v("Roles")])],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item",
                    { attrs: { router: "" } },
                    [
                      _c(
                        "v-list-item-action",
                        [
                          _c("v-icon", { attrs: { medium: "", left: "" } }, [
                            _vm._v("mdi-soccer-field")
                          ])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-content",
                        [_c("v-list-item-title", [_vm._v("Pitches")])],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item",
                    { attrs: { router: "" } },
                    [
                      _c(
                        "v-list-item-action",
                        [
                          _c("v-icon", { attrs: { small: "" } }, [
                            _vm._v("fas fa-tachometer-alt")
                          ])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-content",
                        [_c("v-list-item-title", [_vm._v("Dashboard")])],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-list-item",
                    [
                      _c(
                        "v-list-item-icon",
                        [_c("v-icon", [_vm._v("mdi-account")])],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-list-item-title", [_vm._v("Account")])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-list-item", { staticStyle: { margin: "50px 0" } })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-layout",
            { attrs: { row: "" } },
            [
              _c(
                "v-flex",
                { attrs: { "md-10": "" } },
                [
                  _c(
                    "v-list",
                    [
                      _c(
                        "v-list-item",
                        { attrs: { dense: "" } },
                        [
                          _c(
                            "v-list-item-avatar",
                            { staticClass: "ml-2" },
                            [
                              _c("v-img", {
                                attrs: { src: "/images/AdminLTELogo.png" }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-list-item-action",
                            { staticClass: "ml-8" },
                            [
                              _c(
                                "v-badge",
                                { attrs: { color: "error", overlap: "" } },
                                [
                                  _c("template", { slot: "badge" }, [
                                    _vm._v("400")
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "v-icon",
                                    { attrs: { color: "tertiary" } },
                                    [_vm._v("mdi-bell")]
                                  )
                                ],
                                2
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { "md-2": "" } },
                [
                  _c(
                    "v-tooltip",
                    {
                      attrs: { top: "" },
                      scopedSlots: _vm._u([
                        {
                          key: "activator",
                          fn: function(ref) {
                            var on = ref.on
                            return [
                              _c(
                                "v-btn",
                                _vm._g(
                                  {
                                    staticClass: "mt-2",
                                    attrs: { text: "", icon: "" }
                                  },
                                  on
                                ),
                                [
                                  _c(
                                    "v-icon",
                                    { attrs: { dark: "", right: "" } },
                                    [_vm._v("fas fa-sign-out-alt")]
                                  )
                                ],
                                1
                              )
                            ]
                          }
                        }
                      ])
                    },
                    [_vm._v(" "), _c("span", [_vm._v("Exit")])]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { "md-12": "" } },
                [
                  _c(
                    "v-card",
                    { attrs: { color: "light-blue darken-4" } },
                    [
                      _c(
                        "v-list",
                        [
                          _c(
                            "v-list-item",
                            { attrs: { dense: "" } },
                            [
                              _c(
                                "v-list-item-action",
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      staticClass: "mx-2",
                                      attrs: {
                                        fab: "",
                                        dark: "",
                                        small: "",
                                        color: "red"
                                      }
                                    },
                                    [
                                      _c("v-icon", { attrs: { dark: "" } }, [
                                        _vm._v("mdi-soccer")
                                      ])
                                    ],
                                    1
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-list-item-content",
                                [
                                  _c(
                                    "v-list-item-title",
                                    { staticStyle: { "font-weight": "900" } },
                                    [_vm._v("LEEROSPORTS")]
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-icon",
                                { staticClass: "mr-2", attrs: { dark: "" } },
                                [_vm._v("fas fa-chevron-down")]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-content",
        { staticStyle: { "min-height": "100vh" } },
        [_c("router-view")],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/dashboard/layouts/MainLayout.vue":
/*!******************************************************************!*\
  !*** ./resources/js/components/dashboard/layouts/MainLayout.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MainLayout_vue_vue_type_template_id_9a1afe62___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MainLayout.vue?vue&type=template&id=9a1afe62& */ "./resources/js/components/dashboard/layouts/MainLayout.vue?vue&type=template&id=9a1afe62&");
/* harmony import */ var _MainLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainLayout.vue?vue&type=script&lang=js& */ "./resources/js/components/dashboard/layouts/MainLayout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MainLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MainLayout_vue_vue_type_template_id_9a1afe62___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MainLayout_vue_vue_type_template_id_9a1afe62___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dashboard/layouts/MainLayout.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dashboard/layouts/MainLayout.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/dashboard/layouts/MainLayout.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MainLayout.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/layouts/MainLayout.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/dashboard/layouts/MainLayout.vue?vue&type=template&id=9a1afe62&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/components/dashboard/layouts/MainLayout.vue?vue&type=template&id=9a1afe62& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_template_id_9a1afe62___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MainLayout.vue?vue&type=template&id=9a1afe62& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/layouts/MainLayout.vue?vue&type=template&id=9a1afe62&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_template_id_9a1afe62___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MainLayout_vue_vue_type_template_id_9a1afe62___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);