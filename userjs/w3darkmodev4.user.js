// ==UserScript==
// @name         W3S Darkmode v4
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Making W3School's darkmode button, a real darkmode button.
// @author       👾
// @icon         https://raw.githubusercontent.com/erichologist/SVGs/refs/heads/main/w3s.svg
// @include      https://w3schools.com/*
// @include      https://*.w3schools.com/*
// @match        *://*.w3schools.com/*
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/420677/W3Schools%20real%20darkmode.user.js
// ==/UserScript==

(function() {
    'use strict';
    var stylesheet = `
/*Logo and login button*/
.darktheme .top{background-color:#052134!important;color:#E6DFD6!important;}
.darktheme .w3schools-logo{color:#DACFD2!important;}
.darktheme .w3schools-logo:hover{color:#00D1C9!important;}
.darktheme .login{color:#052134!important;}
/*NavBar and dropdown*/
.darktheme .w3-bar{color:#052134!important;}
.darktheme .w3-hover-white:hover{background-color:#052134!important;color:#DACFD2!important;}
.darktheme nav.w3-light-grey{background-color:#052134!important;color:#E6DFD6!important;}
.darktheme nav.w3-light-grey h3{color:#DACFD2!important;}
.darktheme nav.w3-light-grey .w3-button:hover{background-color:#062D43!important;color:#DACFD2!important;}
/*sidebar*/
.darktheme .w3-sidebar{background-color:#052134!important;color:#E6DFD6!important;}
.darktheme .w3-sidebar h4{color:#DACFD2!important;}
.darktheme .w3-sidebar .w3-button:hover{background-color:#062D43!important;color:#DACFD2!important;}
/*main*/
.darktheme #main{background-color:#052134!important;color:#E6DFD6!important;}
.darktheme #main .w3-row, .darktheme #main .w3-row .w3-text-dark-grey{color:#E6DFD6!important;}
.darktheme #main .w3-row h1, .darktheme #main .w3-row h2, .darktheme #main .w3-row h3, .darktheme #main .w3-row h4, .darktheme #main .w3-row h5, .darktheme #main .w3-row h6{color:#DACFD2!important;}
.darktheme #main .w3-row p{color:#E6DFD6!important;}
.darktheme #main div.w3-light-grey{background-color:#062D43!important;color:#E6DFD6!important;}
.darktheme #main .w3-button:not(.w3-theme){background-color:#234254!important;color:#E6DFD6!important;}
.darktheme #main .w3-button:not(.w3-theme):hover{background-color:#000!important;color:#DACFD2!important;}
.darktheme #main .w3-dark-grey{background-color:#052134!important;}
.darktheme #main .w3-dark-grey .w3-white{background-color:#062D43!important;}
.darktheme #main .w3-white{background-color:#062D43!important;}
.darktheme #main .w3-btn.w3-green{color:#052134!important;}
.darktheme .w3-button.w3-theme{color:#062D43!important;}
.darktheme #main .w3-text-dark-grey{color:#E6DFD6!important;}
/*topnav*/
.darktheme .topnav .w3-bar-item{background-color:#062D43!important;color:#E6DFD6!important;}
.darktheme .topnav .w3-bar-item:hover{background-color:#052134!important;color:#DACFD2!important;}
.darktheme .topnav .w3-bar-item:focus{background-color:#052134!important;color:#DACFD2!important;}
.darktheme .topnav .w3-bar{background-color:#062D43!important;}
/*topnav dropdown*/
.darktheme .topnav{background-color:#052134!important;}
.darktheme .topnav .w3-row-padding .w3-bar-item{background-color:#052134!important;color:#E6DFD6!important;}
.darktheme .topnav .w3-row-padding .w3-bar-item:hover{background-color:#062D43!important;color:#DACFD2!important;}
.darktheme .topnav .w3-row-padding .w3-bar-item:focus{background-color:#062D43!important;color:#DACFD2!important;}
/*Info panel*/
.darktheme .w3-info{background-color:#373d48!important;}
/*Other*/
.darktheme .w3-btn{color:#052134!important;}
.darktheme .w3-example{background-color:#062D43!important;color:#E6DFD6!important;}
.darktheme #w3-exerciseform{background-color:#062D43!important;}
.darktheme .exercisewindow{background-color:#052134!important; color:#E6DFD6!important;}
.darktheme .exerciseprecontainer{background-color:#062D43!important;color:#E6DFD6!important;}
.darktheme input{background-color:#052134!important;color:#E6DFD6!important;}
.darktheme .bigbtn{background-color:#234254!important;color:#E6DFD6!important;border-width:0px!important;}
.darktheme .bigbtn:hover{background-color:#000!important;color:#DACFD2!important;}
.darktheme #leftmenuinnerinner{background-color:#052134!important; color:#E6DFD6!important;}
.darktheme #leftmenuinnerinner h2{color:#DACFD2!important;}
.darktheme #leftmenuinnerinner a:hover{background-color:#062D43; color:#DACFD2;}
.darktheme #sidenav a.active {background-color:#073b4c!important;color: #DACFD2!important;}
.darktheme .w3-main > .w3-white{background-color:#052134!important;}
.darktheme .sidesection{background-color:#062D43!important;color:#E6DFD6!important;}
.darktheme .w3-border .w3-button{background-color:#062D43!important;color:#E6DFD6!important;border-width:0px}
.darktheme .w3-border .w3-button:hover{background-color:#234254!important;color:#DACFD2!important;border-width:0px}
.darktheme .w3-border {border:0px!important;}
.darktheme #footer{color:#E6DFD6!important;}
.darktheme .w3-button.w3-light-grey{background-color:#243040!important;color:#E6DFD6!important;}
.darktheme .w3-button.w3-light-grey:hover{background-color:#234254!important;color:#DACFD2!important;}
/*hr and borders*/
.darktheme *{border-color:#062D43!important;}
/*scrollbar*/
.darktheme ::-webkit-scrollbar{background-color:#052134;}
.darktheme ::-webkit-scrollbar-button{background-color:#062D43;}
.darktheme ::-webkit-scrollbar-thumb{background-color:#00D1C980;}
.darktheme nav.w3-light-grey,nav.w3-light-grey{background-color:#052134!important;color:#E6DFD6!important;}
.darktheme nav.w3-light-grey h3,nav.w3-light-grey h3{color:#DACFD2!important;}
.darktheme nav.w3-light-grey .w3-button:hover,nav.w3-light-grey .w3-button:hover{background-color:#062D43!important;color:#DACFD2!important;}
.darktheme input,input{background-color:#052134!important;color:#E6DFD6!important;}
.darktheme #w3-exerciseform,#w3-exerciseform{background-color:#062D43!important;}
.darktheme #sidenav a.active,#sidenav a.active{background-color:#073b4c!important;color:#DACFD2!important;}
.darktheme #main, #main{background-color:#2C313A!important;color:#E6DFD6!important;}
.darktheme #main div.w3-light-grey, #main div.w3-light-grey{background-color:#062D43!important;color:#E6DFD6!important;}
.darktheme #main .w3-white, #main .w3-white{background-color:#062D43!important;}
.darktheme #main .w3-text-dark-grey, .darktheme #main .w3-text-dark-grey, #main .w3-row, #main .w3-row .w3-text-dark-grey{color:#E6DFD6!important;}
.darktheme #main .w3-row, .darktheme #main .w3-row p, #main .w3-row, #main .w3-row p{color:#E6DFD6!important;}
.darktheme #main .w3-row h1, .darktheme #main .w3-row h2, .darktheme #main .w3-row h3, .darktheme #main .w3-row h4, .darktheme #main .w3-row h5, .darktheme #main .w3-row h6, #main .w3-row h5, #main .w3-row h4, #main .w3-row h3, #main .w3-row h2, #main .w3-row h1, #main .w3-row h6{color:#DACFD2!important;}
.darktheme #main .w3-row h1, .darktheme #main .w3-row .w3-text-dark-grey, #main .w3-row h1, #main .w3-row .w3-text-dark-grey{color:#E6DFD6!important;}
.darktheme #main .w3-dark-grey, #main .w3-dark-grey{background-color:#052134!important;}
.darktheme #main .w3-dark-grey .w3-white, #main .w3-dark-grey .w3-white{background-color:#062D43!important;}
.darktheme #main .w3-button:not(.w3-theme), #main .w3-button:not(.w3-theme){background-color:#234254!important;color:#E6DFD6!important;}
.darktheme #main .w3-button:not(.w3-theme):hover, #main .w3-button:not(.w3-theme):hover{background-color:#000!important;color:#DACFD2!important;}
.darktheme #main .w3-btn.w3-green, #main .w3-btn.w3-green{color:#052134!important;}
.darktheme #leftmenuinnerinner,#leftmenuinnerinner{background-color:#052134!important;color:#E6DFD6!important;}
.darktheme #leftmenuinnerinner h2,#leftmenuinnerinner h2{color:#DACFD2!important;}
.darktheme #leftmenuinnerinner a:hover,#leftmenuinnerinner a:hover{background-color:#062D43;color:#DACFD2;}
.darktheme #footer,#footer{color:#E6DFD6!important;}
.darktheme *,*{border-color:#062D43;}
.darktheme .w3schools-logo, .w3schools-logo{color:#DACFD2!important;}
.darktheme .w3schools-logo:hover, .w3schools-logo:hover{color:#00D1C9!important;}
.darktheme .w3-sidebar, .w3-sidebar{background-color:#052134!important;color:#E6DFD6!important;}
.darktheme .w3-sidebar, .w3-sidebar h4{color:#DACFD2!important;}
.darktheme .w3-sidebar .w3-button:hover, .w3-sidebar .w3-button:hover{background-color:#062D43!important;color:#DACFD2!important;}
.darktheme .w3-note, .w3-note{background-color:#062D43!important;}
.darktheme .w3-main > .w3-white, .w3-main > .w3-white{background-color:#052134!important;}
.darktheme .w3-info, .w3-info{background-color:#373d48!important;}
.darktheme .w3-hover-white:hover, .w3-hover-white:hover{background-color:#052134!important;color:#DACFD2!important;}
.darktheme .w3-example, .w3-example{background-color:#062D43!important;color:#E6DFD6!important;}
.darktheme .w3-codespan, .w3-codespan{background-color:#062D43!important;color:#f2998c!important;}
.darktheme .w3-codespan, .w3-codespan{border-radius:10px!important;box-shadow:0px 0px 10px rgba(0,0,0,.1)!important;}
.darktheme .w3-code, .darktheme .w3-section, .darktheme .w3-example, .w3-code, .w3-section, .w3-example{border-right-color:#001B29!important;border-radius:20px!important;border-top-left-radius:20px!important;border-bottom-left-radius:20px!important;border-top-right-radius:20px!important;border-bottom-right-radius:20px!important;box-shadow:0px 0px 15px rgba(0,0,0,.3),inset 1.5px 1px 15px #001B2940,-2px -2px 8px rgba(0,0,0,0.12)!important;border-color:#052134!important;}
.darktheme .w3-button.w3-theme, .w3-button.w3-theme{color:#062D43!important;}
.darktheme .w3-button.w3-light-grey, .w3-button.w3-light-grey{background-color:#243040!important;color:#E6DFD6!important;}
.darktheme .w3-border, .w3-border{border:0px!important;}
.darktheme .w3-button.w3-light-grey:hover, .w3-button.w3-light-grey:hover{background-color:#234254!important;color:#DACFD2!important;}
.darktheme .w3-bar, .w3-bar{color:#052134!important;}
.darktheme .tut_overview,
.tut_overview{background-color:#062D43!important;}
.darktheme .topnav,
.topnav{background-color:#052134!important;}
.darktheme .topnav .w3-row-padding .w3-bar-item,
.topnav .w3-row-padding .w3-bar-item{background-color:#052134!important;color:#E6DFD6!important;}
.darktheme .topnav .w3-row-padding .w3-bar-item:hover,
.topnav .w3-row-padding .w3-bar-item:hover{background-color:#062D43!important;color:#DACFD2!important;}
.darktheme .topnav .w3-row-padding .w3-bar-item:focus{background-color:#062D43!important;color:#DACFD2!important;}
.topnav .w3-row-padding .w3-bar-item:focus{background-color:#062D43!important;color:#DACFD2!important;}
.darktheme .topnav .w3-bar,
.topnav .w3-bar{background-color:#062D43!important;}
.darktheme .topnav .w3-bar-item,
.topnav .w3-bar-item{background-color:#062D43!important;color:#E6DFD6!important;}
.darktheme .topnav .w3-bar-item:hover,
.topnav .w3-bar-item:hover{background-color:#052134!important;color:#DACFD2!important;}
.darktheme .topnav .w3-bar-item:focus,
.topnav .w3-bar-item:focus{background-color:#052134!important;color:#DACFD2!important;}
.darktheme .top,
.top{background-color:#052134!important;color:#E6DFD6!important;}
.darktheme .sidesection,
.sidesection{background-color:#062D43!important;color:#E6DFD6!important;}
.darktheme .login,
.login{color:#052134!important;}
.darktheme .exercisewindow,
.exercisewindow{background-color:#052134!important;color:#E6DFD6!important;}
.darktheme .exerciseprecontainer,
.exerciseprecontainer{background-color:#062D43!important;color:#E6DFD6!important;}
.darktheme .bigbtn,
.bigbtn{background-color:#234254!important;color:#E6DFD6!important;border-width:0px!important;}
.darktheme .bigbtn:hover,
.bigbtn:hover{background-color:#000!important;color:#DACFD2!important;}
.darktheme .active_overview,
.active_overview{background-color:#062D43!important;color:#E6DFD6!important;}
.darktheme ::-webkit-scrollbar,::-webkit-scrollbar{background-color:#052134;}
.darktheme ::-webkit-scrollbar-thumb,::-webkit-scrollbar-thumb{background-color:#00D1C980;}
.darktheme ::-webkit-scrollbar-button,::-webkit-scrollbar-button{background-color:#062D43;box-shadow:0px 0px 10px rgba(0,0,0,.14),-1.5px -2px 1px rgba(160,160,160,0.2),2px 1px 8px rgba(0,0,0,0.12)!important;}
body.darkpagetheme #main,body.darkpagetheme{background-color:#20242c!important;}
.w3-panel > .ws-note, .w3-panel .ws-note,div.w3-panel.ws-note,body.darkpagetheme .ws-note,* .ws-note,
.ws-note{color:#E6DFD6!important;background-color:#003358!important;box-shadow:0px 0px 10px rgba(0,0,0,.14),inset 1.5px 1px 15px rgba(160,160,160,0.08),-2px -2px 8px rgba(0,0,0,0.12),inset -1.5px -1px 15px #00000020!important;}
.darktheme .w3-border .w3-button, .w3-border .w3-button, .darktheme .w3-btn, .darktheme .ws-btn,
.ws-btn, .w3-btn, .nextprev a.w3-right, .nextprev a.w3-left, .nextprev a.w3-right, .nextprev a.w3-left .w3-btn{background-color:#00375E!important;color:#e2e0e0!important;border-color:#0000!important;box-shadow:0px 0px 12px rgba(0,0,0,.1),-1.5px -.9px 5px rgba(160,160,160,0.09),2px 1px 8px rgba(0,0,0,0.09)!important;}
.darktheme .w3-border .w3-button:hover, .w3-border .w3-button:hover{background-color:#062D43!important;color:#DACFD2!important;border-width:0px}
.darktheme .ws-btn:visited,
.ws-btn:visited, .darktheme .ws-btn:link,
.ws-btn:link, .darktheme .w3-btn:visited, .w3-btn:visited, .darktheme .w3-btn:link, .w3-btn:link{background-color:#004973!important;color:#E6DFD6!important;border-width:0px;}
.darktheme .ws-btn:hover,
.ws-btn:hover, .darktheme .ws-btn:active,
.ws-btn:active, .darktheme .w3-btn:hover, .w3-btn:hover, .darktheme .w3-btn:active, .w3-btn:active{background-color:#062D43!important;color:#eeeeee!important;border-width:0px;box-shadow:inset -1.5px -.9px 10px rgba(160,160,160,0.09),inset 2px 1px 10px rgba(0,0,0,0.1)!important;}
.darktheme .mainLeaderboard,
.mainLeaderboard, #mainLeaderboard, .darktheme #mainLeaderboard {background-color:#001B29!important;}
.darktheme .w3-codespan{background-color:#062D43!important;color:#f2998c!important;}
.darktheme .w3-note{background-color:#062D43!important;}
.darktheme .tut_overview{background-color:#062D43!important;}
.darktheme .active_overview{background-color:#062D43!important;color:#E6DFD6!important;}
/* Other2 */
.darktheme nav.w3-light-grey {background-color: #052134 !important;color: #E6DFD6 !important;}
.darktheme nav.w3-light-grey h3 {color: #DACFD2 !important;}
.darktheme nav.w3-light-grey .w3-button:hover {background-color: #062D43 !important;color: #DACFD2 !important;}
.darktheme input {background-color: #052134 !important;color: #E6DFD6 !important;}
.darktheme #w3-exerciseform {background-color: #062D43 !important;}
.darktheme #sidenav a.active {background-color: #073b4c !important;color: #DACFD2 !important;}
.darktheme #main {background-color: #052134 !important;color: #E6DFD6 !important;}
.darktheme #main div.w3-light-grey {background-color: #062D43 !important;color: #E6DFD6 !important;}
.darktheme #main .w3-white {background-color: #062D43 !important;}
.darktheme #main .w3-text-dark-grey, .darktheme #main .w3-text-dark-grey, #main .w3-row .w3-text-dark-grey  {color: #E6DFD6 !important;}
.darktheme #main .w3-row, .darktheme #main .w3-row p {color: #E6DFD6 !important;}
.darktheme #main .w3-row h1, .darktheme #main .w3-row h2, .darktheme #main .w3-row h3, .darktheme #main .w3-row h4, .darktheme #main .w3-row h5, .darktheme #main .w3-row h6 {color: #DACFD2 !important;}
.darktheme #main .w3-row h1, .darktheme #main .w3-row .w3-text-dark-grey {color: #E6DFD6 !important;}
.darktheme #main .w3-dark-grey {background-color: #052134 !important;}
.darktheme #main .w3-dark-grey .w3-white {background-color: #062D43 !important;}
.darktheme #main .w3-button:not(.w3-theme) {background-color: #234254 !important;color: #E6DFD6 !important;}
.darktheme #main .w3-button:not(.w3-theme):hover {background-color: #000 !important;color: #DACFD2 !important;}
.darktheme #main .w3-btn.w3-green {color: #052134 !important;}
.darktheme #leftmenuinnerinner {background-color: #052134 !important;color: #E6DFD6 !important;}
.darktheme #leftmenuinnerinner h2 {color: #DACFD2 !important;}
.darktheme #leftmenuinnerinner a:hover {background-color: #062D43;color: #DACFD2;}
.darktheme #footer {color: #E6DFD6 !important;}
.darktheme * {border-color: #062D43;}
.darktheme .w3schools-logo {color: #DACFD2 !important;}
.darktheme .w3schools-logo:hover {color: #00D1C9 !important;}
.darktheme .w3-sidebar {background-color: #052134 !important;color: #E6DFD6 !important;}
.darktheme .w3-sidebar {color: #DACFD2 !important;}
.darktheme .w3-sidebar .w3-button:hover {background-color: #062D43 !important;color: #DACFD2 !important;}
.darktheme .w3-note {background-color: #062D43 !important;}
.darktheme .w3-main>.w3-white {background-color: #052134 !important;}
.darktheme .w3-info {background-color: #373d48 !important;}
.darktheme .w3-hover-white:hover {background-color: #052134 !important;color: #DACFD2 !important;}
.darktheme .w3-example {background-color: #062D43 !important;color: #E6DFD6 !important;}
.darktheme .w3-codespan {background-color: #062D43 !important;color: #f2998c !important;}
.darktheme .w3-codespan {border-radius: 10px !important;box-shadow: 0px 0px 10px rgba(0, 0, 0, .1) !important;}
.darktheme .w3-button.w3-theme {color: #062D43 !important;}
.darktheme .w3-code, .darktheme .w3-section, .darktheme .w3-example {border-right-color: #001B29 !important;border-radius: 20px !important;border-top-left-radius: 20px !important;border-bottom-left-radius: 20px !important;border-top-right-radius: 20px !important;border-bottom-right-radius: 20px !important;box-shadow: 0px 0px 15px rgba(0, 0, 0, .3), inset 1.5px 1px 15px #001B2940, -2px -2px 8px rgba(0, 0, 0, 0.12) !important;border-color: #052134 !important;}
.darktheme .w3-button.w3-light-grey {background-color: #243040 !important;color: #E6DFD6 !important;}
.darktheme .w3-button.w3-light-grey:hover {background-color: #234254 !important;color: #DACFD2 !important;}
.darktheme .w3-border {border: 0px !important;}
.darktheme .w3-border .w3-button {background-color: #062D43 !important;color: #E6DFD6 !important;border-width: 0px}
.darktheme .w3-border .w3-button:hover {background-color: #234254 !important;color: #DACFD2 !important;border-width: 0px}
.darktheme .w3-bar {color: #052134 !important;}
.darktheme .tut_overview {background-color: #062D43 !important;}
.darktheme .topnav {background-color: #052134 !important;}
.darktheme .topnav .w3-row-padding .w3-bar-item {background-color: #052134 !important;color: #E6DFD6 !important;}
.darktheme .topnav .w3-row-padding .w3-bar-item:hover{background-color: #062D43 !important;color: #DACFD2 !important;}
.darktheme .topnav .w3-row-padding .w3-bar-item:focus{background-color: #062D43 !important;color: #DACFD2 !important;} {background-color: #062D43 !important;color: #DACFD2 !important;}
.darktheme .topnav .w3-bar {background-color: #062D43 !important;}
.darktheme .topnav .w3-bar-item {background-color: #062D43 !important;color: #E6DFD6 !important;}
.darktheme .topnav .w3-bar-item:hover {background-color: #052134 !important;color: #DACFD2 !important;}
.darktheme .topnav .w3-bar-item:focus {background-color: #052134 !important;color: #DACFD2 !important;}
.darktheme .top {background-color: #052134 !important;color: #E6DFD6 !important;}
.darktheme .sidesection {background-color: #062D43 !important;color: #E6DFD6 !important;}
.darktheme .login {color: #052134 !important;}
.darktheme .exercisewindow {background-color: #052134 !important;color: #E6DFD6 !important;}
.darktheme .exerciseprecontainer {background-color: #062D43 !important;color: #E6DFD6 !important;}
.darktheme .bigbtn {background-color: #234254 !important;color: #E6DFD6 !important;border-width: 0px !important;}
.darktheme .bigbtn:hover {background-color: #000 !important;color: #DACFD2 !important;}
.darktheme .active_overview {background-color: #062D43 !important;color: #E6DFD6 !important;}
.darktheme ::-webkit-scrollbar {background-color: #052134;}
.darktheme ::-webkit-scrollbar-thumb {background-color: #00D1C980;}
.darktheme ::-webkit-scrollbar-button {background-color: #062D43;box-shadow:0px 0px 10px rgba(0, 0, 0, .14), -1.5px -2px 1px rgba(160, 160, 160, 0.2), 2px 1px 8px rgba(0, 0, 0, 0.12) !important;}
.darktheme body #main{background-color: #20242c !important;}
.darktheme .nextprev a.w3-left, .darktheme .nextprev a.w3-right, .darktheme .nextprev a.w3-left .w3-btn, .darktheme .w3-btn:link, 
.darktheme .w3-btn:visited {background-color: #073b4c !important;color: #e2e0e0 !important;border-color: #0000 !important;box-shadow: 0px 0px 12px rgba(0, 0, 0, .1), -1.5px -.9px 5px rgba(160, 160, 160, 0.09), 2px 1px 8px rgba(0, 0, 0, 0.09) !important;}
.darktheme .w3-panel>.ws-note, .darktheme .w3-panel .ws-note, .darktheme div.w3-panel.ws-note, .darktheme body .ws-note, .darktheme * .ws-note, .darktheme .ws-note {color: #E6DFD6 !important;background-color: #003358 !important;box-shadow: 0px 0px 10px rgba(0, 0, 0, .14), inset 1.5px 1px 15px rgba(160, 160, 160, 0.08), -2px -2px 8px rgba(0, 0, 0, 0.12), inset -1.5px -1px 15px #00000020 !important;}
/*tables*/
/*.darktheme table thead, .darktheme table tbody tr th {background:#777 !important;background-color:#777 !important;color:#000 !important;}*/
.darktheme table, .darktheme table.ws-table-all, .darktheme div.w3-responsive table, .darktheme div.w3-responsive table.ws-table-all{border-radius:20px !important;box-shadow:0px 0px 20px rgba(0, 0, 0, .14),inset 1.5px 1px 15px rgba(160,160,160,0.08),0 0 10px rgba(0,0,0,0.14), 0 0 25px #00000066 !important;border-collapse: collapse; !important;}
.darktheme th, .darktheme td{background-color:#052134 !important;color:#E6DFD6 !important;}
.darktheme table tbody tr th:first-child{border-top-left-radius:20px !important;border-bottom: 1px solid #0000;border-top: 1px solid #0000;border-left: 1px solid #0000;border-right: 1px solid #0000;}
.darktheme table tbody tr th:last-child{border-top-right-radius:20px !important;border-bottom: 1px solid #0000;border-top: 1px solid #0000;border-left: 1px solid #0000;border-right: 1px solid #0000;}
.darktheme table tbody tr:last-child td:first-child, body.darktheme .ws-table-all tr:last-child td:first-child{border-bottom-left-radius:20px !important;border-bottom: 1px solid #0000;border-top: 1px solid #0000;border-left: 1px solid #0000;border-right: 1px solid #0000;}
.darktheme table tbody tr:last-child td:last-child, body.darktheme .ws-table-all table tbody tr:last-child td:first-child{border-bottom-right-radius:20px !important;border-bottom: 1px solid #0000;border-top: 1px solid #0000;border-left: 1px solid #0000;border-right: 1px solid #0000;}
.darktheme div.w3-responsive table.ws-table-all, .darktheme div.w3-responsive table, .darktheme table.ws-table-all, .darktheme table { background-color: #052134 !important; color: #E6DFD6 !important; border-radius:.25em !important; }
.darktheme table tbody tr:last-child td:first-child, body.darktheme .ws-table-all tr:last-child td:first-child {border-bottom-left-radius:.25em !important;}
.darktheme table tbody tr:last-child td:last-child, body.darktheme .ws-table-all table tbody tr:last-child td:first-child { border-bottom-right-radius:.25em !important; }
.darktheme tr { background-color: #052134 !important; color: #E6DFD6 !important; }
.darktheme nav.w3-light-grey { background-color: #052134 !important; color: #E6DFD6 !important; }
.darktheme nav.w3-light-grey h3 { color: #DACFD2 !important;}
.darktheme nav.w3-light-grey .w3-button:hover { background-color: #062D43 !important; color: #DACFD2 !important; }
.darktheme input { background-color: #052134 !important; color: #E6DFD6 !important; }
.darktheme #w3-exerciseform { background-color: #062D43 !important;}
.darktheme #sidenav a.active { background-color: #073b4c !important; color: #DACFD2 !important;}
.darktheme #main { background-color: #052134 !important; color: #E6DFD6 !important;}
.darktheme #main div.w3-light-grey { background-color: #062D43 !important; color: #E6DFD6 !important;}
.darktheme #main .w3-white { background-color: #062D43 !important; }
.darktheme #main .w3-text-dark-grey, .darktheme #main .w3-text-dark-grey, #main .w3-row .w3-text-dark-grey  { color: #E6DFD6 !important;}
.darktheme #main .w3-row, .darktheme #main .w3-row p { color: #E6DFD6 !important; }
.darktheme #main .w3-row h1, .darktheme #main .w3-row h2, .darktheme #main .w3-row h3, .darktheme #main .w3-row h4, .darktheme #main .w3-row h5, .darktheme #main .w3-row h6 { color: #DACFD2 !important;}
.darktheme #main .w3-row h1, .darktheme #main .w3-row .w3-text-dark-grey { color: #E6DFD6 !important;}
.darktheme #main .w3-dark-grey {background-color: #052134 !important;}
.darktheme #main .w3-dark-grey .w3-white {background-color: #062D43 !important;}
.darktheme #main .w3-button:not(.w3-theme) { background-color: #234254 !important; color: #E6DFD6 !important;}
.darktheme #main .w3-button:not(.w3-theme):hover {background-color: #000 !important; color: #DACFD2 !important;}
.darktheme #main .w3-btn.w3-green { color: #052134 !important;}
.darktheme #leftmenuinnerinner { background-color: #052134 !important; color: #E6DFD6 !important;}
.darktheme #leftmenuinnerinner h2 {color: #DACFD2 !important;}
.darktheme #leftmenuinnerinner a:hover { background-color: #062D43; color: #DACFD2;}
.darktheme #footer { color: #E6DFD6 !important;}
.darktheme * { border-color: #062D43; }
.darktheme .w3schools-logo { color: #DACFD2 !important;}
.darktheme .w3schools-logo:hover {color: #00D1C9 !important;}
.darktheme .w3-sidebar { background-color: #052134 !important; color: #E6DFD6 !important; }
.darktheme .w3-sidebar {color: #DACFD2 !important;}
.darktheme .w3-sidebar .w3-button:hover { background-color: #062D43 !important; color: #DACFD2 !important; }
.darktheme .w3-note {background-color: #062D43 !important;}
.darktheme .w3-main>.w3-white {background-color: #052134 !important;}
.darktheme .w3-info { background-color: #373d48 !important; }
.darktheme .w3-hover-white:hover { background-color: #052134 !important; color: #DACFD2 !important; }
.darktheme .w3-example {background-color: #062D43 !important;color: #E6DFD6 !important;}
.darktheme .w3-codespan { background-color: #062D43 !important; color: #f2998c !important; }
.darktheme .w3-codespan { border-radius: 10px !important; box-shadow: 0px 0px 10px rgba(0, 0, 0, .1) !important; }
.darktheme .w3-button.w3-theme {color: #062D43 !important;}
.darktheme mark.rh-1767713930591, .darktheme .w3-code, .darktheme .w3-section, .darktheme .w3-example { border-right-color: #001B29 !important; border-radius: 10px !important; border-top-left-radius: 10px !important; border-bottom-left-radius: 10px !important; border-top-right-radius: 10px !important; border-bottom-right-radius: 10px !important; box-shadow: 0px 0px 15px rgba(0, 0, 0, .15), inset 1.5px 1px 15px #001B2940, -2px -2px 8px rgba(0, 0, 0, 0.12) !important; border-color: #052134 !important; }
.darktheme .w3-button.w3-light-grey { background-color: #243040 !important; color: #E6DFD6 !important;}
.darktheme .w3-button.w3-light-grey:hover { background-color: #234254 !important; color: #DACFD2 !important; }
.darktheme .w3-btn {color: #052134 !important;}
.darktheme .w3-border { border: 0 !important;}
.darktheme .w3-border .w3-button { background-color: #062D43 !important; color: #E6DFD6 !important; border-width: 0 !important;}
.darktheme .w3-border .w3-button:hover { background-color: #234254 !important; color: #DACFD2 !important; border-width: 0 !important;}
.darktheme .w3-bar { color: #052134 !important;}
.darktheme .tut_overview { background-color: #062D43 !important;}
.darktheme .topnav {background-color: #052134 !important;}
.darktheme .topnav .w3-row-padding .w3-bar-item { background-color: #052134 !important; color: #E6DFD6 !important;}
.darktheme .topnav .w3-row-padding .w3-bar-item:hover { background-color: #062D43 !important; color: #DACFD2 !important;}
.darktheme .topnav .w3-row-padding .w3-bar-item:focus { background-color: #062D43 !important; color: #DACFD2 !important;} { background-color: #062D43 !important; color: #DACFD2 !important;}
.darktheme .topnav .w3-bar { background-color: #062D43 !important;}
.darktheme .topnav .w3-bar-item {background-color: #062D43 !important;color: #E6DFD6 !important;}
.darktheme .topnav .w3-bar-item:hover { background-color: #052134 !important; color: #DACFD2 !important;}
.darktheme .topnav .w3-bar-item:focus { background-color: #052134 !important; color: #DACFD2 !important; }
.darktheme .top {background-color: #052134 !important;color: #E6DFD6 !important;}
.darktheme .sidesection { background-color: #062D43 !important; color: #E6DFD6 !important; }
.darktheme .login {color: #052134 !important;}
.darktheme .exercisewindow { background-color: #052134 !important; color: #E6DFD6 !important;}
.darktheme .exerciseprecontainer { background-color: #062D43 !important; color: #E6DFD6 !important; }
.darktheme .bigbtn { background-color: #234254 !important;color: #E6DFD6 !important; border-width: 0px !important;}
.darktheme .bigbtn:hover { background-color: #000 !important; color: #DACFD2 !important;}
.darktheme .active_overview { background-color: #062D43 !important; color: #E6DFD6 !important;}
.darktheme ::-webkit-scrollbar { background-color: #052134;}
.darktheme ::-webkit-scrollbar-thumb { background-color: #00D1C980;}
.darktheme ::-webkit-scrollbar-button { background-color: #062D43;box-shadow: 0px 0px 10px rgba(0, 0, 0, .14), -1.5px -2px 1px rgba(160, 160, 160, 0.2), 2px 1px 8px rgba(0, 0, 0, 0.12) !important;}
.darktheme body #main {background-color: #20242c !important;}
.darktheme .nextprev a.w3-left, .darktheme .nextprev a.w3-right, .darktheme .nextprev a.w3-left .w3-btn, .darktheme .w3-btn:link, .darktheme .w3-btn:visited { background-color: #073b4c !important; color: #e2e0e0 !important; border-color: #0000 !important; box-shadow: 0px 0px 12px rgba(0, 0, 0, .1), -1.5px -.9px 5px rgba(160, 160, 160, 0.09), 2px 1px 8px rgba(0, 0, 0, 0.09) !important;}
.darktheme .w3-button.w3-margin-bottom, .darktheme .w3-btn.w3-margin-bottom, .darktheme .w3-button, .darktheme .w3-btn {background-color: #4977FF !important;color: #e2e0e0 !important;}
.darktheme .w3-btn:link, .darktheme .w3-btn:visited {background-color: #0095A4 !important;}
.darktheme .w3-button.w3-margin-bottom, .darktheme .w3-btn.w3-margin-bottom, .darktheme .w3-button, .darktheme .w3-btn {background-color: #4977FF !important;color: #e2e0e0 !important;}
.darktheme .w3-button.w3-margin-bottom:link, .darktheme .w3-btn.w3-margin-bottom:link, .darktheme .w3-button:link, .darktheme .w3-btn:link, .darktheme .w3-button.w3-margin-bottom:visited, .darktheme .w3-btn.w3-margin-bottom:visited, .darktheme .w3-button:visited, .darktheme .w3-btn:visited {background-color: #0095A4 !important;}
.darktheme .w3-panel>.ws-note, .darktheme .w3-panel .ws-note, .darktheme div.w3-panel.ws-note, .darktheme body .ws-note, .darktheme * .ws-note, .darktheme .ws-note { color: #E6DFD6 !important; background-color: #003358 !important; box-shadow: 0px 0px 10px rgba(0, 0, 0, .14), inset 1.5px 1px 15px rgba(160, 160, 160, 0.08), -2px -2px 8px rgba(0, 0, 0, 0.12), inset -1.5px -1px 15px #00000020 !important;}
.darktheme div.w3-code .notranslate .cssHigh, .darktheme .w3-code .notranslate .cssHigh {font-family:Menlo, Monoflow, Monotalic-NarrowLight, Monotalic-Narrow, monospace !important;box-shadow:0 0 14px rgba(0, 0, 0, 0.24), 0 0 10px rgba(0, 0, 0, 0.04), 0 0 24px rgba(0, 0, 0, 0.25) !important;background:none !important;background-image:none !important; background-image:linear-gradient(0deg,#181818, #000);}
.darktheme mark.rh-1767713930591 { background: #001B29 !important; background-color: #001B29 !important; color: #00DDFF !important; padding:1em !important; white-space:pre-line !important;}
.darktheme #main{ background-color:#282c34 !important;}
.darktheme span.cssselectorcolor{ color: #FF0080 !important;}
.darktheme span.csspropertycolor{ color: #fffc !important; }
.darktheme span.cssselectorcolor{color:#FF005EA1 !important;text-shadow:0 0 0 #FF058BA1, 0 0 1.3px #FF005E66, 0 0 1.5px #00197A, 0 0 1.7px #FF057B, 0 0 2px #000 !important;}
.darktheme span.cssdelimitercolor, .darktheme .cssdelimitercolor, .cssdelimitercolor{color:#FE0C !important;text-shadow:0 0 0 #FFFC, 0 0 2px #FFBF0066, 0 -.1px 3px #C5D02566, 0 0 4px #E62E2E44, 0 -1px 5px #E0CB5266, 0 1px 6px #DDFF0544, 0 0 7px #00D9E066 !important;}
.darktheme span.csspropertyvaluecolor, .darktheme .csspropertyvaluecolor,
.csspropertyvaluecolor {color:#0EDDFF !important;text-shadow:none !important;}
.darktheme span.csspropertycolor{color:#CCCC !important;text-shadow:0 0 0 #FFF, 0 0 .14081em #FFF4, 0 0 .24121em #FFF6, 0 1px .362em #FFF4 !important;}
.darktheme div.w3-code.notranslate.cssHigh, .darktheme div.w3-code .notranslate .cssHigh, .darktheme .w3-code .notranslate .cssHigh {font-family:Menlo, Monoflow, Monotalic-NarrowLight, Monotalic-Narrow, monospace  !important;box-shadow:0 0 14px rgba(0, 0, 0, 0.24), 0 0 10px rgba(0, 0, 0, 0.04), 0 0 24px rgba(0, 0, 0, 0.25),inset 0 -14px 60px rgba(0, 0, 0, 0.5) !important;background:none !important;background-color:none !important;background-image:linear-gradient(0deg,#202020, #000) !important;padding:2em 0 2em 2em !important;}
.darktheme .w3-col.l6.w3-center>:is(h1,h2,h3,h4,h5,h6), .w3-col.l6.w3-center>:is(h1,h2,h3,h4,h5,h6) {color:yellow !important; mix-blend-mode:exclusion !important;}
.darktheme mark.rh-1770216987789[data-id="65ca91e6cb27d578e8345095"],mark.rh-1770216987789[data-id="65ca91e6cb27d578e8345095"] {color:rgb(230,223,214) !important; background:none !important;}
.darktheme table tbody tr:first-child:is(td:first-child, td:first-child), .darktheme table>tbody>tr:first-child:is(td:first-child,>td:first-child), .darktheme table>tbody>tr:first-child>:is(td:first-child), .darktheme table tbody tr:first-child>:is(td:first-child), .darktheme table tbody tr:first-child:is(td:first-child), .darktheme table>tbody>tr:first-child td:first-child, .darktheme table>tbody>tr:first-child>td:first-child, .darktheme table tbody tr:first-child td:first-child, table>tbody>tr:first-child:is(td:first-child,>td:first-child), table>tbody>tr:first-child>:is(td:first-child), table tbody tr:first-child:is(td:first-child), table>tbody>tr:first-child>td:first-child, table>tbody>tr:first-child td:first-child, table tbody tr:first-child td:first-child{border-top-left-radius:1rem !important;}
.darktheme table>tbody>tr:first-child:is(td:last-child,>td:last-child), .darktheme table tbody tr:first-child:is(td:last-child, td:last-child), .darktheme table>tbody>tr:first-child>:is(td:last-child), .darktheme table tbody tr:first-child:is(td:last-child), .darktheme table>tbody>tr:first-child td:last-child, .darktheme table>tbody>tr:first-child>td:last-child, .darktheme table tbody tr:first-child td:last-child, table>tbody>tr:first-child:is(td:last-child,>td:last-child), table>tbody>tr:first-child>:is(td:last-child), table tbody tr:first-child:is(td:last-child), table>tbody>tr:first-child td:last-child, table>tbody>tr:first-child>td:last-child, table tbody tr:first-child td:last-child{border-top-right-radius:1rem !important;}
`


/*
green: #00D1C9
dark: #052134
darkdark: #001B29
lightdark: #002B4A
lightlight: #eeeeee
lightlightgrey: #757576
grey: #3e4451
red: #ff0362
*/

function changepagetheme(){
    var cc = document.body.className;
    if (cc.indexOf("darktheme") > -1) {
        document.body.className = cc.replace("darktheme", "");
        localStorage.setItem("preferredmode", "light");
    } else {
        document.body.className += " darktheme";
        localStorage.setItem("preferredmode", "dark");
    }
}
    var styleelement = document.createElement("style");
    styleelement.type = "text/css";
    styleelement.innerHTML = stylesheet;
    document.body.appendChild(styleelement);
})();