/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/points/route";
exports.ids = ["app/api/points/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpoints%2Froute&page=%2Fapi%2Fpoints%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpoints%2Froute.ts&appDir=C%3A%5CPrive%5Cai%20projects%5CLIA_CPSR%5CLIA_CPSR%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CPrive%5Cai%20projects%5CLIA_CPSR%5CLIA_CPSR&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpoints%2Froute&page=%2Fapi%2Fpoints%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpoints%2Froute.ts&appDir=C%3A%5CPrive%5Cai%20projects%5CLIA_CPSR%5CLIA_CPSR%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CPrive%5Cai%20projects%5CLIA_CPSR%5CLIA_CPSR&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Prive_ai_projects_LIA_CPSR_LIA_CPSR_app_api_points_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/points/route.ts */ \"(rsc)/./app/api/points/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"export\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/points/route\",\n        pathname: \"/api/points\",\n        filename: \"route\",\n        bundlePath: \"app/api/points/route\"\n    },\n    resolvedPagePath: \"C:\\\\Prive\\\\ai projects\\\\LIA_CPSR\\\\LIA_CPSR\\\\app\\\\api\\\\points\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Prive_ai_projects_LIA_CPSR_LIA_CPSR_app_api_points_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwb2ludHMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnBvaW50cyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnBvaW50cyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDUHJpdmUlNUNhaSUyMHByb2plY3RzJTVDTElBX0NQU1IlNUNMSUFfQ1BTUiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1ByaXZlJTVDYWklMjBwcm9qZWN0cyU1Q0xJQV9DUFNSJTVDTElBX0NQU1ImaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9ZXhwb3J0JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3NCO0FBQ25HO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxQcml2ZVxcXFxhaSBwcm9qZWN0c1xcXFxMSUFfQ1BTUlxcXFxMSUFfQ1BTUlxcXFxhcHBcXFxcYXBpXFxcXHBvaW50c1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJleHBvcnRcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcG9pbnRzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcG9pbnRzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9wb2ludHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxQcml2ZVxcXFxhaSBwcm9qZWN0c1xcXFxMSUFfQ1BTUlxcXFxMSUFfQ1BTUlxcXFxhcHBcXFxcYXBpXFxcXHBvaW50c1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpoints%2Froute&page=%2Fapi%2Fpoints%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpoints%2Froute.ts&appDir=C%3A%5CPrive%5Cai%20projects%5CLIA_CPSR%5CLIA_CPSR%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CPrive%5Cai%20projects%5CLIA_CPSR%5CLIA_CPSR&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/points/route.ts":
/*!*********************************!*\
  !*** ./app/api/points/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic),\n/* harmony export */   revalidate: () => (/* binding */ revalidate)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\nconst dynamic = 'force-static';\nconst revalidate = 0;\nasync function POST(req) {\n    try {\n        const { playerId, amount, item } = await req.json();\n        // Maak een nieuwe point record\n        const point = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.point.create({\n            data: {\n                playerId,\n                amount,\n                item,\n                reason: amount > 0 ? \"Punten toegevoegd\" : \"Punten afgetrokken\"\n            }\n        });\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(JSON.stringify({\n            message: \"Punten succesvol bijgewerkt\",\n            point\n        }), {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Points error:\", error);\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(JSON.stringify({\n            error: error.message\n        }), {\n            status: 500\n        });\n    }\n}\nasync function GET(req) {\n    try {\n        // Haal alle punten op\n        const points = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.point.findMany({\n            orderBy: {\n                createdAt: \"desc\"\n            }\n        });\n        // Groepeer punten per speler en item\n        const pointsByPlayer = points.reduce((acc, point)=>{\n            if (!acc[point.playerId]) {\n                acc[point.playerId] = {\n                    totalPoints: 0,\n                    items: {}\n                };\n            }\n            if (!acc[point.playerId].items[point.item]) {\n                acc[point.playerId].items[point.item] = 0;\n            }\n            acc[point.playerId].items[point.item] += point.amount;\n            acc[point.playerId].totalPoints += point.amount;\n            return acc;\n        }, {});\n        // Haal speler informatie op\n        const players = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.player.findMany({\n            where: {\n                id: {\n                    in: Object.keys(pointsByPlayer)\n                }\n            }\n        });\n        // Combineer speler informatie met punten\n        const result = players.map((player)=>({\n                playerId: player.id,\n                playerName: player.name,\n                totalPoints: pointsByPlayer[player.id].totalPoints,\n                items: Object.entries(pointsByPlayer[player.id].items).map(([item, points])=>({\n                        item,\n                        points\n                    }))\n            }));\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(JSON.stringify(result), {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Points error:\", error);\n        return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(JSON.stringify({\n            error: error.message\n        }), {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3NCLFNBQ2Y7WUFBRXBCLFFBQVE7UUFBSTtJQUdsQixFQUFFLE9BQU9DLE9BQVk7UUFDbkJDLFFBQVFELEtBQUssQ0FBQyxpQkFBaUJBO1FBQy9CLE9BQU8sSUFBSWxCLHFEQUFZQSxDQUNyQmMsS0FBS0MsU0FBUyxDQUFDO1lBQUVHLE9BQU9BLE1BQU1GLE9BQU87UUFBQyxJQUN0QztZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFByaXZlXFxhaSBwcm9qZWN0c1xcTElBX0NQU1JcXExJQV9DUFNSXFxhcHBcXGFwaVxccG9pbnRzXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGR5bmFtaWMgPSAnZm9yY2Utc3RhdGljJ1xyXG5leHBvcnQgY29uc3QgcmV2YWxpZGF0ZSA9IDBcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHBsYXllcklkLCBhbW91bnQsIGl0ZW0gfSA9IGF3YWl0IHJlcS5qc29uKCk7XHJcblxyXG4gICAgLy8gTWFhayBlZW4gbmlldXdlIHBvaW50IHJlY29yZFxyXG4gICAgY29uc3QgcG9pbnQgPSBhd2FpdCBwcmlzbWEucG9pbnQuY3JlYXRlKHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHBsYXllcklkLFxyXG4gICAgICAgIGFtb3VudCxcclxuICAgICAgICBpdGVtLFxyXG4gICAgICAgIHJlYXNvbjogYW1vdW50ID4gMCA/IFwiUHVudGVuIHRvZWdldm9lZ2RcIiA6IFwiUHVudGVuIGFmZ2V0cm9ra2VuXCJcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBOZXh0UmVzcG9uc2UoXHJcbiAgICAgIEpTT04uc3RyaW5naWZ5KHsgXHJcbiAgICAgICAgbWVzc2FnZTogXCJQdW50ZW4gc3VjY2Vzdm9sIGJpamdld2Vya3RcIixcclxuICAgICAgICBwb2ludCBcclxuICAgICAgfSksXHJcbiAgICAgIHsgc3RhdHVzOiAyMDAgfVxyXG4gICAgKTtcclxuXHJcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgY29uc29sZS5lcnJvcihcIlBvaW50cyBlcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIG5ldyBOZXh0UmVzcG9uc2UoXHJcbiAgICAgIEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSksXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxOiBSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIEhhYWwgYWxsZSBwdW50ZW4gb3BcclxuICAgIGNvbnN0IHBvaW50cyA9IGF3YWl0IHByaXNtYS5wb2ludC5maW5kTWFueSh7XHJcbiAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICBjcmVhdGVkQXQ6IFwiZGVzY1wiXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEdyb2VwZWVyIHB1bnRlbiBwZXIgc3BlbGVyIGVuIGl0ZW1cclxuICAgIGNvbnN0IHBvaW50c0J5UGxheWVyID0gcG9pbnRzLnJlZHVjZSgoYWNjLCBwb2ludCkgPT4ge1xyXG4gICAgICBpZiAoIWFjY1twb2ludC5wbGF5ZXJJZF0pIHtcclxuICAgICAgICBhY2NbcG9pbnQucGxheWVySWRdID0ge1xyXG4gICAgICAgICAgdG90YWxQb2ludHM6IDAsXHJcbiAgICAgICAgICBpdGVtczoge31cclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBpZiAoIWFjY1twb2ludC5wbGF5ZXJJZF0uaXRlbXNbcG9pbnQuaXRlbV0pIHtcclxuICAgICAgICBhY2NbcG9pbnQucGxheWVySWRdLml0ZW1zW3BvaW50Lml0ZW1dID0gMDtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgYWNjW3BvaW50LnBsYXllcklkXS5pdGVtc1twb2ludC5pdGVtXSArPSBwb2ludC5hbW91bnQ7XHJcbiAgICAgIGFjY1twb2ludC5wbGF5ZXJJZF0udG90YWxQb2ludHMgKz0gcG9pbnQuYW1vdW50O1xyXG4gICAgICBcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9IGFzIFJlY29yZDxzdHJpbmcsIHsgdG90YWxQb2ludHM6IG51bWJlciwgaXRlbXM6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gfT4pO1xyXG5cclxuICAgIC8vIEhhYWwgc3BlbGVyIGluZm9ybWF0aWUgb3BcclxuICAgIGNvbnN0IHBsYXllcnMgPSBhd2FpdCBwcmlzbWEucGxheWVyLmZpbmRNYW55KHtcclxuICAgICAgd2hlcmU6IHtcclxuICAgICAgICBpZDoge1xyXG4gICAgICAgICAgaW46IE9iamVjdC5rZXlzKHBvaW50c0J5UGxheWVyKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ29tYmluZWVyIHNwZWxlciBpbmZvcm1hdGllIG1ldCBwdW50ZW5cclxuICAgIGNvbnN0IHJlc3VsdCA9IHBsYXllcnMubWFwKHBsYXllciA9PiAoe1xyXG4gICAgICBwbGF5ZXJJZDogcGxheWVyLmlkLFxyXG4gICAgICBwbGF5ZXJOYW1lOiBwbGF5ZXIubmFtZSxcclxuICAgICAgdG90YWxQb2ludHM6IHBvaW50c0J5UGxheWVyW3BsYXllci5pZF0udG90YWxQb2ludHMsXHJcbiAgICAgIGl0ZW1zOiBPYmplY3QuZW50cmllcyhwb2ludHNCeVBsYXllcltwbGF5ZXIuaWRdLml0ZW1zKS5tYXAoKFtpdGVtLCBwb2ludHNdKSA9PiAoe1xyXG4gICAgICAgIGl0ZW0sXHJcbiAgICAgICAgcG9pbnRzXHJcbiAgICAgIH0pKVxyXG4gICAgfSkpO1xyXG5cclxuICAgIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKFxyXG4gICAgICBKU09OLnN0cmluZ2lmeShyZXN1bHQpLFxyXG4gICAgICB7IHN0YXR1czogMjAwIH1cclxuICAgICk7XHJcblxyXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJQb2ludHMgZXJyb3I6XCIsIGVycm9yKTtcclxuICAgIHJldHVybiBuZXcgTmV4dFJlc3BvbnNlKFxyXG4gICAgICBKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0pLFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59ICJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJkeW5hbWljIiwicmV2YWxpZGF0ZSIsIlBPU1QiLCJyZXEiLCJwbGF5ZXJJZCIsImFtb3VudCIsIml0ZW0iLCJqc29uIiwicG9pbnQiLCJjcmVhdGUiLCJkYXRhIiwicmVhc29uIiwiSlNPTiIsInN0cmluZ2lmeSIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJlcnJvciIsImNvbnNvbGUiLCJHRVQiLCJwb2ludHMiLCJmaW5kTWFueSIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJwb2ludHNCeVBsYXllciIsInJlZHVjZSIsImFjYyIsInRvdGFsUG9pbnRzIiwiaXRlbXMiLCJwbGF5ZXJzIiwicGxheWVyIiwid2hlcmUiLCJpZCIsImluIiwiT2JqZWN0Iiwia2V5cyIsInJlc3VsdCIsIm1hcCIsInBsYXllck5hbWUiLCJuYW1lIiwiZW50cmllcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/points/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUFLO1FBQUM7S0FBUTtBQUNoQixHQUFFO0FBRUosSUFBSUMsSUFBcUMsRUFBRUosZ0JBQWdCRSxNQUFNLEdBQUdBIiwic291cmNlcyI6WyJDOlxcUHJpdmVcXGFpIHByb2plY3RzXFxMSUFfQ1BTUlxcTElBX0NQU1JcXGxpYlxccHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiXHJcblxyXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWwgYXMgdW5rbm93biBhcyB7XHJcbiAgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWRcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHByaXNtYSA9XHJcbiAgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA/P1xyXG4gIG5ldyBQcmlzbWFDbGllbnQoe1xyXG4gICAgbG9nOiBbXCJxdWVyeVwiXSxcclxuICB9KVxyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYSAiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsIiwicHJpc21hIiwibG9nIiwicHJvY2VzcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpoints%2Froute&page=%2Fapi%2Fpoints%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpoints%2Froute.ts&appDir=C%3A%5CPrive%5Cai%20projects%5CLIA_CPSR%5CLIA_CPSR%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CPrive%5Cai%20projects%5CLIA_CPSR%5CLIA_CPSR&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=export&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();