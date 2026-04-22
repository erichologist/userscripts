// ==UserScript==
// @name         MDN Skin v1
// @version      1.0
// @description  Making a new look.
// @author       👾
// @icon         https://github.com/erichologist/SVGs/raw/refs/heads/main/mdn-sq.svg
// @include      *://*developer.mozilla.org/*
// @include      https://developer.mozilla.org/*
// @match        *://*developer.mozilla.org/*
// @match        https://developer.mozilla.org/*
// @grant        GM_addStyle
// ==/UserScript==
(function () {
    'use strict';
    const stylesheet = `
@font-face{font-family:"New Astro";src:local("New Astro Regular"),local("NewAstro-Regular"),url(https://github.com/erichologist/erichology-ssd_textastic/raw/refs/heads/main/assets/fonts/newastro/newastro-regular.woff2) format("woff2");font-weight:normal;font-style:normal;font-feature-settings:"ss02","ss04","ss08";-moz-font-feature-settings:"ss02","ss04","ss08";-webkit-font-feature-settings:"ss02","ss04","ss08";font-display:swap;}
@font-face{font-family:"New Astro";src:local("New Astro SemiBold"),local("NewAstro-SemiBold"),url(https://github.com/erichologist/erichology-ssd_textastic/raw/refs/heads/main/assets/fonts/newastro/newastrosoft-semibold.woff2) format("woff2");font-weight:600;font-style:normal;font-feature-settings:"ss02","ss04","ss08";-moz-font-feature-settings:"ss02","ss04","ss08";-webkit-font-feature-settings:"ss02","ss04","ss08";font-display:swap;}
@font-face{font-family:"Nova Mono"; src:local("NovaMono"),local("Nova Mono"),url(https://fonts.gstatic.com/s/novamono/v23/Cn-0JtiGWQ5Ajb--MRKvZGZZj9AtS06w.woff2) format("woff2"); unicode-range:U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;font-style:normal;font-weight:400;font-display:swap;}
@font-face{font-family:"Nova Mono"; src:local("NovaMono"),local("Nova Mono"),url(https://fonts.gstatic.com water/s/novamono/v23/Cn-0JtiGWQ5Ajb--MRKvaWZZj9AtS06w.woff2) format("woff2"); unicode-range:U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;font-display:swap;font-style:normal;font-weight:400;font-display:swap;}
@font-face{font-family:"Nova Mono"; src:local("NovaMono"),local("Nova Mono"),url(https://fonts.gstatic.com/s/novamono/v23/Cn-0JtiGWQ5Ajb--MRKvZ2ZZj9AtSw.woff2) format("woff2"); unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;font-style:normal;font-weight:400;font-display:swap;}
:root{--css-text-orange:#B5D100 !important;--css-text-red:#FF008B !important;--css-text-yellow:#EBD567 !important;--css-text-green:#00FFAA !important;--css-text-orange:#98E342 !important;--css-text-purple:#AE81FF !important;--css-text-pink:#FF02BE !important;--css-text-blue:#00FAED !important;}
html, body{font-family:"New Astro", sans-serif !important;font-weight:normal;font-style:normal;font-feature-settings:"ss02","ss04","ss08";-moz-font-feature-settings:"ss02","ss04","ss08";-webkit-font-feature-settings:"ss02","ss04","ss08";}
 :is(b,bold,strong){font-family:"New Astro" !important;font-weight:600 !important;font-style:normal;font-feature-settings:"ss02","ss04","ss08";-moz-font-feature-settings:"ss02","ss04","ss08";-webkit-font-feature-settings:"ss02","ss04","ss08";}
code, pre, :is(.ͼr,.ͼq,.ͼu,.ͼv,.ͼs), code-block-element-view, .flex.h-svh.w-screen.flex-col{font-family:"Nova Mono", NovaMono, monospace !important; color:#03e9f4F1 !important; text-shadow:0 0 0 #FFF;}
 :not(pre)>code{color:#03e9f4F1 !important; text-shadow:0 0 0 #FFF, 0 0 5px #0F07FF66, 0 -0.1px 3.5px #00E95266, 0 0 8px #5E60CE66, 0 -1px 9px #0F07FF66, 0 1px 8px #3457D566, 0 0 4px #00D9E066 !important; background:none !important; outline:none !important; border:none !important;}
code-block-element-view, .flex.h-svh.w-screen.flex-col, pre{padding:2vh 2vw !important; color:#03e9f4;font-size:80%; border-radius:0 !important; background:linear-gradient(180deg, #000000, #262626) !important; box-shadow:0 0 9px #0006,0 0 18px #0006 !important; overflow-x:auto !important;}
 :is(.ͼr,.ͼq,.ͼu,.ͼv,.ͼs){background:linear-gradient(180deg, #11111100,#39393900) !important; box-shadow: 0 0 9px #0006, 0 0 18px #0006 !important; overflow-x:auto !important;}
.navigation, .navigation__popup,#navigation__popup, .navigation__menu, #navigation__menu,.menu{max-height:90px !important; overflow:auto !important;}
mdn-placement-sidebar, .page-layout__banner, #page-layout__banner, mdn-placement-top{top: -9999px !important;}
.left-sidebar__content{max-width:100px !important;font-size:.47rem !important; margin-right:0 !important;}
.reference-layout__header{margin-top:20em;}
.reference-toc{max-width:200px !important; max-height:500px !important; overflow:scroll !important;font-size:.7rem !important;}
main, main#content, main.reference-layout__header, #content, .reference-layout__header, .content-section{width:770px !important;font-size:96% !important; margin-left:0 !important; margin-right:1em !important; float:left !important;}
/*.mdn-live-sample, .mdn-live-sample-result{filter: invert(97%) hue-rotate(180deg) !important;}section.content-section>p{font-size:146% !important;}*//*display: none !important; visibility: hidden !important; position: absolute !important;*/
.mdn-live-sample, .mdn-live-sample-result{visibility:visible !important;}
header.page-layout__header{max-width:100vw !important; width:98vw !important;}
div.sidebar, mdn-placement-sidebar{display:none !important; position:relative !important; max-width:20vw !important;
top:300% !important;margin-left:auto !important;margin-right:0 !important;}
[hidden]{visibility:visible !important;}
mdn-language-switcher,.mdn-language-switcher{visibility:hidden !important;}
`;

    // Apply styles
    const styleElement = document.createElement("style");
    styleElement.type = "text/css";
    styleElement.innerHTML = stylesheet;
    document.body.appendChild(styleElement);

    // Theme change function
    function changePageTheme() {
        const cc = document.body.className;
        if (cc.indexOf("darktheme") > -1) {
            document.body.className = cc.replace("darktheme", "");
            localStorage.setItem("preferredmode", "light");
        } else {
            document.body.className += " darktheme";
            localStorage.setItem("preferredmode", "dark");
        }
    }
    // Uncomment to call the theme function if needed
    // changePageTheme();
})();


