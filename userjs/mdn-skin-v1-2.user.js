// ==UserScript==
// @name         MDN Skin v1.2
// @downloadURL  https://github.com/erichologist/userscripts/raw/refs/heads/main/userjs/mdn-skin-v1.2.user.js
// @version      1.2
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
@import url("https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap");
@import url("https://github.com/erichologist/erichology-ssd_textastic/raw/refs/heads/main/assets/fonts/newastro/newastro-ff.css");
@font-face{font-family:"New Astro";
	src:local("New Astro Regular"),local("NewAstro-Regular"),url(https://github.com/erichologist/erichology-ssd_textastic/raw/refs/heads/main/assets/fonts/newastro/newastro-regular.woff2) format("woff2");
	font-weight:normal;
	font-style:normal;
	font-feature-settings:"ss02","ss04","ss08";
	-moz-font-feature-settings:"ss02","ss04","ss08";
	-webkit-font-feature-settings:"ss02","ss04","ss08";
	font-display:swap;}
@font-face{font-family:"New Astro";
	src:local("New Astro SemiBold"),local("NewAstro-SemiBold"),url(https://github.com/erichologist/erichology-ssd_textastic/raw/refs/heads/main/assets/fonts/newastro/newastrosoft-semibold.woff2) format("woff2");
	font-weight:600;
	font-style:normal;
	font-feature-settings:"ss02","ss04","ss08";
	-moz-font-feature-settings:"ss02","ss04","ss08";
	-webkit-font-feature-settings:"ss02","ss04","ss08";
	font-display:swap;}
@font-face {
  font-family: "Nova Mono";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/novamono/v23/Cn-0JtiGWQ5Ajb--MRKvZGZZj9AtS06w.woff2) format("woff2");
  unicode-range: U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF;}
@font-face {
  font-family: "Nova Mono";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/novamono/v23/Cn-0JtiGWQ5Ajb--MRKvaWZZj9AtS06w.woff2) format("woff2");
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;}
@font-face {
  font-family: "Nova Mono";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/novamono/v23/Cn-0JtiGWQ5Ajb--MRKvZ2ZZj9AtSw.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}
:root{--css-text-orange:#B5D100 !important;--css-text-red:#FF008B !important;--css-text-yellow:#EBD567 !important;--css-text-green:#00FFAA !important;--css-text-orange:#98E342 !important;--css-text-purple:#AE81FF !important;--css-text-pink:#FF02BE !important;--css-text-blue:#00FAED !important;}
html, body{font-family:"New Astro", sans-serif !important;
	font-weight:normal;
	font-style:normal;
	font-feature-settings:"ss02","ss04","ss08";
	-moz-font-feature-settings:"ss02","ss04","ss08";
	-webkit-font-feature-settings:"ss02","ss04","ss08";}
 :is(b,bold,strong){font-family:"New Astro" !important;
	font-weight:600 !important;
	font-style:normal;
	font-feature-settings:"ss02","ss04","ss08";
	-moz-font-feature-settings:"ss02","ss04","ss08";
	-webkit-font-feature-settings:"ss02","ss04","ss08";}
code, pre, :is(.ͼr,.ͼq,.ͼu,.ͼv,.ͼs), code-block-element-view, .flex.h-svh.w-screen.flex-col{font-family:"Nova Mono", NovaMono, monospace !important; color:#03e9f4F1 !important; text-shadow:0 0 0 #FFF;}
 :not(pre)>code{color:#03e9f4F1 !important; text-shadow:0 0 0 #FFF, 0 0 5px #0F07FF66, 0 -0.1px 3.5px #00E95266, 0 0 8px #5E60CE66, 0 -1px 9px #0F07FF66, 0 1px 8px #3457D566, 0 0 4px #00D9E066 !important; background:none !important; outline:none !important; border:none !important;}
code-block-element-view, .flex.h-svh.w-screen.flex-col, pre{padding:2vh 2vw !important; color:#03e9f4;
	font-size:80%; border-radius:0 !important; background:linear-gradient(180deg, #000000, #262626) !important; box-shadow:0 0 9px #0006,0 0 18px #0006 !important; overflow-x:auto !important;}
 :is(.ͼr,.ͼq,.ͼu,.ͼv,.ͼs){background:linear-gradient(180deg, #11111100,#39393900) !important; box-shadow: 0 0 9px #0006, 0 0 18px #0006 !important; overflow-x:auto !important;}
.navigation, .navigation__popup,#navigation__popup, .navigation__menu, #navigation__menu,.menu{max-height:90px !important; overflow:auto !important;}
mdn-placement-sidebar, .page-layout__banner, #page-layout__banner, mdn-placement-top{top: -9999px !important;}
.left-sidebar__content{max-width:100px !important;
	font-size:.47rem !important; margin-right:0 !important;}
.reference-layout__header{margin-top:20em;}
.reference-toc{max-width:200px !important; max-height:500px !important; overflow:scroll !important;
	font-size:.7rem !important;}
main, main#content, main.reference-layout__header, #content, .reference-layout__header, .content-section{width:770px !important;
	font-size:96% !important; margin-left:0 !important; margin-right:1em !important; float:left !important;}
/*.mdn-live-sample, .mdn-live-sample-result{filter: invert(97%) hue-rotate(180deg) !important;}section.content-section>p{font-size:146% !important;}*//*display: none !important; visibility: hidden !important; position: absolute !important;*/
.mdn-live-sample, .mdn-live-sample-result{visibility:visible !important;}
header.page-layout__header{max-width:100vw !important; width:98vw !important;}
div.sidebar, mdn-placement-sidebar{display:none !important; position:relative !important; max-width:20vw !important;
top:300% !important;margin-left:auto !important;margin-right:0 !important;}
[hidden]{visibility:visible !important;}
mdn-language-switcher,.mdn-language-switcher{visibility:hidden !important;}
.token{text-shadow:none;}
.token.atrule{text-shadow:0 0 2px #061338, 0 0 8px #2F079975, 0 0 2px #AE81FF75 !important;color:#AE81FF !important;}
.token.attr-name{text-shadow:0 0 0 #FFF, 0 0 5px #0F07FF60, 0 -.1px 3.5px #00E95260, 0 0 8px #5E60CE60, 0 -1px 9px #0F07FF60, 0 1px 8px #3457D560, 0 0 4px #00D9E060 !important;color:#00D9E0CC !important;}
.token.attr-value{color:#F87C32CC !important;text-shadow:0 0 #FA0C, .31px 0 2px #FF058B80, -.31px 0 2.2px #FF058B80, 0 0 3px #FFBF0066, 0 0 .6em #F0A,0 0 .6em #400 !important;}
.lang-html .token.attr-value, .language-html .token.attr-value{color:var(--html-attr-value) !important;text-shadow:var(--sh-html-attr-value) !important;}
.token.block-comment {color:#777;background-color:#0006;padding-top:2px;padding-bottom:2px;border-radius:7px;}
.token.boolean{text-shadow:0 0 2px #001716, 0 0 3px #03EDF975, 0 0 5px #03EDF975, 0 0 8px #03EDF975 !important;color:#FDFDFD !important;}
.token.builtin{text-shadow:0 0 2px #393A33, 0 0 8px #F39F0575, 0 0 2px #F39F0575 !important;color:#0F0 !important;}
.token.cdata{color:#999 !important;}
.token.char{color:#F87C32 !important;}
.token.comment {display:inline-block !important;color:#797979 !important; background:linear-gradient(90deg, #0000, #0001, #0001, #0000, #0000) !important;margin:0 !important;padding:2px 0 2px 0 !important;border-radius:7px !important;white-space:pre-line !important;word-spacing:-.1ch !important;letter-spacing:0ch !important;}
.token.comment:hover{color:#BBB !important;background:linear-gradient(90deg, #0004, #0008, #0008, #0004) !important;}
.token.constant{text-shadow:0 0 2px #100C0F, 0 0 5px #DC078E33, 0 0 8px #FFF3 !important;color:#F92AAD !important;}
.token.deleted{color:#E2777A !important;}
.token.doctype{color:#999 !important;}
.token.entity{color:#B5E108 !important;cursor:help !important;}
.token.function{color:#FDFDFD !important;text-shadow:0 0 2px #001716, 0 0 3px #03EDF975,0 0 5px #03EDF975, 0 0 8px #03EDF975 !important;}
.token.function-name{color:#6196CC !important;}
.token.hexcode{color:#00FBD0 !important;}
.token.important{text-shadow:0 0 0 #FFFC, 0 0 2px #FFBF0066, 0 -.1px 3px #C5D02566, 0 0 4px #E62E2E44, 0 -1px 5px #E0CB5266, 0 1px 6px #DDFF0544, 0 0 7px #00D9E066 !important;color:#FE0C !important;}
.token.inserted{color:#B5E108 !important;}
.token.keyword{color:#FE0C !important;text-shadow:0 0 0 #FFFC, 0 0 2px #FFBF0044, 0 -.1px 3px #C5D02544, 0 0 4px #E62E2E44, 0 -1px 5px #E0CB5244, 0 1px 6px #DDFF0566, 0 0 7px #00D9E044 !important;}
.token.namespace{color:#92577EB3 !important;}
.token.number{color:#0EDDFF !important;}
.token.operator{color:#67CDCC !important;}
.token.pseudo-class{text-shadow:0 0 0 #FFF,0 0 5px #0F07FF66,0 -.1px 3.5px #00E95266,0 0 8px #5E60CE66,0 -1px 9px #0F07FF66,0 1px 8px #3457D566,0 0 4px #00D9E066 !important;color:#00D9E0CC !important;}
.token.pseudo-element{text-shadow:0 0 0 #00FF0080, 0 0 2px #00D9E044, 0 0 2.5px #3D4DFF80, 0 -.1px 3px #00E95244, 0 0 3.5px #5E60CE44, 0 -1px 4px #0F07FF44, 0 1px 4.5px #3457D544, 0 0 5px #00D9E044, 0 0 0 #00FF00 !important;color:#01FBAECC !important;}
.token.punctuation2{color:#DDFF05 !important;}
.token.combinator, .token.punctuation{text-shadow:0 0 0 #FFFC, 0 0 2px #FFBF0066, 0 -.1px 3px #C5D02566, 0 0 4px #E62E2E44, 0 -1px 5px #E0CB5266, 0 1px 6px #DDFF0544, 0 0 7px #00D9E066 !important;color:#FE0C !important;}
.token.prolog{color:#999 !important;}
.token.property{text-shadow:0 0 0 #FFF, 0 0 .12081em #FFF6, 0 0 .16121em #FFF6, 0 1px .342em #FFF6, 0 0 .342em #0006 !important;color:#CCCC !important;}
.token.regex{color:#B5E108 !important;}
.token.selector{text-shadow:0 0 0 #FFFFFFCC, 0 0 .26em #0F07FF80, 0 0 .45em #4530FF66, 0 -.1px .3em #DC078E66, 0 0 .26em #5546DB44, 0 0 .36em #DE00FF66, 0 0 .2em #DE00FF66 !important;color:#FF33A0 !important;}
.token.selector .token.id{color:#FF02BEEE !important;text-shadow:0 0 #FA0C, .31px 0 2px #FF058B80, -.31px 0 2.2px #FF058B80, 0 0 3px #FFBF0066, 0 0 .6em #F0A,0 0 .6em #400 !important;}
.token.selector .token.class{text-shadow:0 0 0 #FF058BA1, 0 0 1.3px #FF005E66, 0 0 1.5px #00197A, 0 0 1.7px #FF057B, 0 0 2px #000 !important;color:#FF005EA1 !important;}
.token.string{color:#EBD567 !important;}
.token.symbol{text-shadow:0 0 2px #100C0F, 0 0 5px #DC078E33, 0 0 8px #FFF3 !important;color:#F92AAD !important;}
.token.tag{text-shadow:0 -2px 2px #C408BB22, 0 1px 2px #FF008044 !important;color:#FF0080 !important;}
.token.unit{text-shadow:0 0 0 #FFF8, 0 0 2px #00171680, 0 0 3px #00FF1180, 0 0 4.5px #00FC !important;color:#B5E108CC !important;}
.token.url{color:#00CCFF !important;}
.token.variable{color:#B5E108 !important;}
.lang-css .token.string, .language-css .token.string{color:#EBD567 !important;}
.lang-css .token.string .language-css .token.string, .language-css .token.string, .lang-css .token.string{color:#EBD567 !important;}
.lang-json .token.string, .lang-JSON .token.string, .language-json .token.string, .language-JSON .token.string{color:#00D1C9 !important;}
.lang-JS .token.string, .language-JS .token.string, .lang-js .token.string, .language-js .token.string, .lang-javascript .token.string, .language-javascript .token.string, .lang-JavaScript .token.string, .language-JavaScript .token.string{color:#0FA !important;}
.token.string.url{text-shadow:0 0 0 #E0CB52, 0 0 4.5px #FFBF0044, 0 1px 3px #EE04, 0 0 3.1px #FFBF0044, 0 -1px 3.5px #E0CB5244, 0 0 2.7px #EE04, 0 0 5px #E62E2E44 !important;color::#FFFFFFA1 !important;}
.token.bold{color:#5972FF !important;}
.white{color:#AAAC !important;text-shadow:0 0 0 #FFF, 0 0 1px #FFF2, 0 -2px 2px #FFF2, 0 1px 2px #FFF2 !important;}
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


