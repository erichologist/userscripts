// ==UserScript==
// @name         ChatGPT Skin v1
// @version      1.0
// @description  Making darkmode button, a real darkmode button.
// @author       👾
// @icon         https://raw.githubusercontent.com/erichologist/SVGs/refs/heads/main/Chat.Bump.Light.Animated.Loop.svg
// @include      https://chat.openai.com/*
// @include      https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var stylesheet = `
@import url("https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap");
html,body {font-family: NovaMono, monospace !important; }
.flex.h-svh.w-screen.flex-col {font-family: NovaMono, monospace !important; padding:1vh 3vw 5vh 1vw !important; width:80% !important; font-size:80%; max-height:100dvh !important;}

:is(.ͼn,.ͼr,.ͼq,.ͼu,.ͼv,.ͼs){font-family: NovaMono, monospace !important;}

:is(.ͼn){color:#FFF !important; text-shadow:0 0 0.1em #FFF4, 0 0 2px #FFF6, 0 -.1px 3px #FFF4, 0 0 4px #FFF6, 0 -1px 4px #FFF6, 0 1px 4px #FFF4, 0 0 .5em #00F !important;}

:is(.ͼv){color:#FF0080 !important; text-shadow:0 0 0.1em #FFF4, 0 0 2px #0F07FF55, 0 -.1px 3px #DC078E44, 0 0 4px #FF057B55, 0 -1px 4px #FF214E60, 0 1px 4px #FF005E44, 0 0 .5em #00F !important;}

:is(.ͼs){color:#FB5D40 !important; text-shadow:0 0 0.1em #FFF4, 0 0 2px #0F07FF44, 0 -.1px 3px #DC078E44, 0 0 4px #FF057B44, 0 -1px 4px #FF214E44, 0 1px 4px #FF005E44, 0 0 .5em #00F !important;}

:is(.ͼq) {color:#03e9f4 !important; text-shadow:0 0 0 #FFF, 0 0 5px #0F07FF60, 0 -0.1px 3.5px #00E95260, 0 0 8px #5E60CE60, 0 -1px 9px #0F07FF60, 0 1px 8px #3457D560, 0 0 4px #00D9E060 !important;}

:is(.ͼr){ color: #00FFAACC  !important; text-shadow:0 0 0 #FFF, 0 0 5px #0F07FF60, 0 -0.1px 3.5px #00E95260, 0 0 6px #5E60CE60, 0 -1px 5px #0F07FF60, 0 1px 7px #3457D560, 0 0 11px #00D9E060 !important;}
 
:is(.ͼu) {color:#FFFF7DCC !important;text-shadow:0 0 0 #FFF, 0 0 5px #FFBF0060, 0 -0.1px 3.5px #C5D02560, 0 0 6px #E62E2E60, 0 -1px 5px #e0cb5260, 0 1px 7px #DDFF0560, 0 0 11px #00D9E060 !important;}
`


/*
green:#00D1C9
dark:#052134
darkdark:#001B29
lightdark:#002B4A
lightlight:#eeeeee
lightlightgrey:#757576
grey:#3e4451
red:#ff0362
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