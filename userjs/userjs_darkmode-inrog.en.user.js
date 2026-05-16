// ==UserScript==
// @name         Dark Mode v.2
// @version      1.5.9
// @author       drkm
// @description  Simple and effective network-wide eye protection mode (night mode, dark mode, black mode)
// @match        *://*/*
// @exclude      https://live.bilibili.com/*
// @icon         https://github.com/erichologist/SVGs/raw/refs/heads/main/Moon.Pink.svg
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @sandbox      JavaScript
// @noframes
// @license      GPL-3.0 License
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const i18n = {
        menu: {
            disableOn: '✅ Enabled (click to disable for this site)',
            disableOff: '❌ Disabled (click to enable for this site)',
            runDuringDay: 'Keep enabled during daytime (slightly brighter than night)',
            followSystem: 'Follow browser dark/light mode',
            autoExclude: 'Auto-exclude pages with built-in dark mode (beta)',
            forceOn: '✅ Forced dark mode on this site (👆)',
            forceOff: '❌ Not forced on this site (👆)',
            switchMode: 'Click to switch mode',
            customizeMode: 'Customize current mode',
            customizeTime: 'Customize day/night time',
            autoSwitch: 'Auto switch at night',
            feedback: '💬 Feedback & Suggestions',
            browserIsLight: '❌ Browser is in light mode (click to disable [Follow browser mode])',
            enable: 'Enabled',
            disable: 'Disabled',
        },
        prompt: {
            autoSwitch:
                'Use different modes for day/night. Takes effect immediately.\n' +
                'Format: dayMode|nightMode\n' +
                'Example: 1|3 (day mode 1, night mode 3)\n' +
                'Default: leave empty',

            mode1:
                'Customize [Mode 1], effective immediately (some pages may need refresh).\n' +
                'Format: brightness (day)|brightness (night)\n' +
                'Default: 60|50 (percent 1–100, no % sign)',

            mode2:
                'Customize [Mode 2], effective immediately (some pages may need refresh).\n' +
                'Format: brightness (day)|warmth (day)|brightness (night)|warmth (night)\n' +
                'Default: 60|40|50|50 (percent 1–100, no % sign)',

            mode3:
                'Customize [Mode 3], effective immediately (some pages may need refresh).\n' +
                'Format: invert amount\n' +
                'Default: 90 (percent 50–100, no % sign)',

            mode3Exclude:
                'Customize [Mode 3] exclusion targets, effective immediately (some pages may need refresh).\n' +
                'Format: CSS selectors\n' +
                'Default: img, .img, video, [style*="background"][style*="url"], svg',

            customTime:
                'Customize day/night times (refresh required).\n' +
                'Format: 6:00|18:30 (6:00–18:30 is daytime)\n' +
                'Reverse ranges supported.',

            formatError: 'Input format error...',
        },
        notify: {
            disabled: (tips) => `Disabled [${tips}] (click to refresh to take effect)`,
            enabled: (tips) => `Enabled [${tips}] (click to refresh to take effect)`,
        },
        log: {
            detectedDark: '[Dark Mode] This page has its own dark mode — disabling filter...',
            htmlBody: '[Dark Mode] html:',
        },
    };

    var menu_ALL = [
        ['menu_disable', i18n.menu.disableOn, i18n.menu.disableOff, []],
        ['menu_runDuringTheDay', i18n.menu.runDuringDay, i18n.menu.runDuringDay, true],
        ['menu_darkModeAuto', i18n.menu.followSystem, i18n.menu.followSystem, false],
        ['menu_autoRecognition', i18n.menu.autoExclude, i18n.menu.autoExclude, true],
        ['menu_forcedToEnable', i18n.menu.forceOn, i18n.menu.forceOff, []],
        ['menu_darkModeType', i18n.menu.switchMode, i18n.menu.switchMode, 2],
        ['menu_customMode', i18n.menu.customizeMode, i18n.menu.customizeMode, true],
        ['menu_customMode1',,, '60|50'],
        ['menu_customMode2',,, '60|40|50|50'],
        ['menu_customMode3',,, '90'],
        ['menu_customMode3_exclude',,, 'img, .img, video, [style*="background"][style*="url"], svg'],
        ['menu_customTime', i18n.menu.customizeTime, i18n.menu.customizeTime, '6:00|18:00'],
        ['menu_autoSwitch', i18n.menu.autoSwitch, i18n.menu.autoSwitch, ''],
    ], menu_ID = [];

    for (let i=0;i<menu_ALL.length;i++){
        if (GM_getValue(menu_ALL[i][0]) == null){GM_setValue(menu_ALL[i][0], menu_ALL[i][3])};
    }
    registerMenuCommand();

    // transitional: ensure time is in HH:MM format
    if (GM_getValue('menu_customTime', '').indexOf(':') === -1) {
        GM_setValue('menu_customTime', GM_getValue('menu_customTime', '6|18').replace('|',':00|') + ':00');
    }

    if (menu_ID.length > 1) {addStyle();}

    function registerMenuCommand() {
        if (menu_ID.length != []){
            for (let i=0;i<menu_ID.length;i++){
                GM_unregisterMenuCommand(menu_ID[i]);
            }
        }
        for (let i=0;i<menu_ALL.length;i++){
            menu_ALL[i][3] = GM_getValue(menu_ALL[i][0]);
            if (menu_ALL[i][0] === 'menu_disable') {
                if (menu_disable('check')) {
                    menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][2]}`, function(){menu_disable('del')});
                    return;
                } else {
                    if (GM_getValue('menu_darkModeAuto') && !window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        menu_ID[i] = GM_registerMenuCommand(
                            i18n.menu.browserIsLight,
                            function(){GM_setValue('menu_darkModeAuto', false);location.reload();}
                        );
                        return;
                    }
                    menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][1]}`, function(){menu_disable('add')});
                }
            }
            else if (menu_ALL[i][0] === 'menu_darkModeType') {
                if (menu_ALL[i][3] > 3) {
                    menu_ALL[i][3] = 1;
                    GM_setValue(menu_ALL[i][0], menu_ALL[i][3]);
                }
                let menu_newMode = getAutoSwitch();
                menu_ID[i] = GM_registerMenuCommand(`${menu_num(menu_newMode)} ${menu_ALL[i][1]}`, function(){menu_toggle(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`)});
            }
            else if (menu_ALL[i][0] === 'menu_customMode') {
                GM_setValue(menu_ALL[i][0], menu_ALL[i][3]);
                menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){menu_customMode()});
            }
            else if (menu_ALL[i][0] === 'menu_customTime') {
                GM_setValue(menu_ALL[i][0], menu_ALL[i][3]);
                menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){menu_customTime()});
            }
            else if (menu_ALL[i][0] === 'menu_customMode1' || menu_ALL[i][0] === 'menu_customMode2' || menu_ALL[i][0] === 'menu_customMode3' || menu_ALL[i][0] === 'menu_customMode3_exclude') {
                GM_setValue(menu_ALL[i][0], menu_ALL[i][3]);
            }
            else if (menu_ALL[i][0] === 'menu_autoSwitch') {
                menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){menu_customAutoSwitch()});
            }
            else if (menu_ALL[i][0] === 'menu_forcedToEnable') {
                if (menu_value('menu_autoRecognition')) {
                    if (menu_forcedToEnable('check')) {
                        menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][1]}`, function(){menu_forcedToEnable('del')});
                    } else {
                        menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][2]}`, function(){menu_forcedToEnable('add')});
                    }
                }
            }
            else {
                menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][3]?'✅':'❌'} ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
            }
        }
        menu_ID[menu_ID.length] = GM_registerMenuCommand(i18n.menu.feedback, function () {
            window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});
        });
    }

    function menu_num(num) {
        return ['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'][num];
    }

    function menu_customAutoSwitch() {
        let newAutoSwitch = prompt(i18n.prompt.autoSwitch);
        if (newAutoSwitch === '') {
            GM_setValue('menu_autoSwitch', '');
        } else if (newAutoSwitch != null) {
            if (newAutoSwitch.split('|').length == 2) {
                GM_setValue('menu_autoSwitch', newAutoSwitch);
            } else {
                alert(i18n.prompt.formatError);
            }
        }
        registerMenuCommand();
        if (document.getElementById('XIU2DarkMode')) {
            document.getElementById('XIU2DarkMode').remove();
            addStyle();
        }
    }

    function getAutoSwitch() {
        let darkModeType = GM_getValue('menu_darkModeType');
        if (GM_getValue('menu_autoSwitch') != '') {
            if (isDaytime()) {
                darkModeType = GM_getValue('menu_autoSwitch').split('|')[0];
            } else {
                darkModeType = GM_getValue('menu_autoSwitch').split('|')[1];
            }
        }
        return parseInt(darkModeType);
    }

    function menu_customMode() {
        let newMods, tip, defaults, name;
        switch(getAutoSwitch()) {
            case 1:
                tip = i18n.prompt.mode1;
                defaults = '60|50';
                name = 'menu_customMode1';
                break;
            case 2:
                tip = i18n.prompt.mode2;
                defaults = '60|40|50|50';
                name = 'menu_customMode2';
                break;
            case 3:
                tip = i18n.prompt.mode3;
                defaults = '90';
                name = 'menu_customMode3';
                break;
        }
        newMods = prompt(tip, GM_getValue(`${name}`));
        if (newMods === '') {
            GM_setValue(`${name}`, defaults);
            registerMenuCommand();
        } else if (newMods != null) {
            GM_setValue(`${name}`, newMods);
            registerMenuCommand();
        }
        if (getAutoSwitch() == 3) {
            tip = i18n.prompt.mode3Exclude;
            defaults = 'img, .img, video, [style*="background"][style*="url"], svg';
            name = 'menu_customMode3_exclude';
            newMods = prompt(tip, GM_getValue(`${name}`));
            if (newMods === '') {
                GM_setValue(`${name}`, defaults);
                registerMenuCommand();
            } else if (newMods != null) {
                GM_setValue(`${name}`, newMods);
                registerMenuCommand();
            }
        }
        if (document.getElementById('XIU2DarkMode')) {
            document.getElementById('XIU2DarkMode').remove();
            addStyle();
        }
    }

    function menu_customTime() {
        let newMods = prompt(i18n.prompt.customTime);
        if (newMods === '') {
            GM_setValue('menu_customTime', '6:00|18:00');
            registerMenuCommand();
        } else if (newMods != null) {
            GM_setValue('menu_customTime', newMods);
            registerMenuCommand();
        }
    }

    function menu_forcedToEnable(type) {
        switch(type) {
            case 'check':
                if(check()) return true;
                return false;
            case 'add':
                add(); break;
            case 'del':
                del(); break;
        }
        function check() {
            let websiteList = menu_value('menu_forcedToEnable');
            if (websiteList.indexOf(location.host) === -1) return false;
            return true;
        }
        function add() {
            if (check()) return;
            let websiteList = menu_value('menu_forcedToEnable');
            websiteList.push(location.host);
            GM_setValue('menu_forcedToEnable', websiteList);
            location.reload();
        }
        function del() {
            if (!check()) return;
            let websiteList = menu_value('menu_forcedToEnable'),
            index = websiteList.indexOf(location.host);
            websiteList.splice(index, 1);
            GM_setValue('menu_forcedToEnable', websiteList);
            location.reload();
        }
    }

    function menu_disable(type) {
        switch(type) {
            case 'check':
                if(check()) return true;
                return false;
            case 'add':
                add(); break;
            case 'del':
                del(); break;
        }
        function check() {
            let websiteList = menu_value('menu_disable');
            if (websiteList.indexOf(location.host) === -1) return false;
            return true;
        }
        function add() {
            if (check()) return;
            let websiteList = menu_value('menu_disable');
            websiteList.push(location.host);
            GM_setValue('menu_disable', websiteList);
            location.reload();
        }
        function del() {
            if (!check()) return;
            let websiteList = menu_value('menu_disable'),
            index = websiteList.indexOf(location.host);
            websiteList.splice(index, 1);
            GM_setValue('menu_disable', websiteList);
            location.reload();
        }
    }

    function menu_toggle(menu_status, Name) {
        menu_status = parseInt(menu_status);
        if (menu_status >= 3){
            menu_status = 1;
        } else {
            menu_status += 1;
        }
        GM_setValue(`${Name}`, menu_status);
        registerMenuCommand();
        if (document.getElementById('XIU2DarkMode')) {
            document.getElementById('XIU2DarkMode').remove();
            addStyle();
        }
    }

    function menu_switch(menu_status, Name, Tips) {
        if (menu_status == 'true'){
            GM_setValue(`${Name}`, false);
            GM_notification({text: i18n.notify.disabled(Tips), timeout: 3500, onclick: function(){location.reload();}});
        } else {
            GM_setValue(`${Name}`, true);
            GM_notification({text: i18n.notify.enabled(Tips), timeout: 3500, onclick: function(){location.reload();}});
        }
        if (Name === 'menu_autoRecognition') {
            location.reload();
        }
        registerMenuCommand();
    }

    function menu_value(menuName) {
        for (let menu of menu_ALL) {
            if (menu[0] == menuName) return menu[3];
        }
    }

    function addStyle() {
        let remove = false, style_Add = document.createElement('style'),
            style_10 = menu_value('menu_customMode1').split('|'),
            style_20 = menu_value('menu_customMode2').split('|'),
            style_30 = menu_value('menu_customMode3').split('|'),
            style = ``,
            style_00 = `html, body {background-color: #ffffff !important;}`,
            style_11 = `html {filter: brightness(${style_10[0]}%) !important;}`,
            style_11_firefox = `html {filter: brightness(${style_10[0]}%) !important; background-image: url();}`,
            style_12 = `html {filter: brightness(${style_10[1]}%) !important;}`,
            style_12_firefox = `html {filter: brightness(${style_10[1]}%) !important; background-image: url();}`,
            style_21 = `html {filter: brightness(${style_20[0]}%) sepia(${style_20[1]}%) !important;}`,
            style_21_firefox = `html {filter: brightness(${style_20[0]}%) sepia(${style_20[1]}%) !important; background-image: url();}`,
            style_22 = `html {filter: brightness(${style_20[2]}%) sepia(${style_20[3]}%) !important;}`,
            style_22_firefox = `html {filter: brightness(${style_20[2]}%) sepia(${style_20[3]}%) !important; background-image: url();}`,
            style_31 = `html {filter: invert(${style_30[0]}%) !important; text-shadow: 0 0 0 !important;}
            ${menu_value('menu_customMode3_exclude')} {filter: invert(1) !important;}
            img[alt="[公式]"] {filter: none !important;}`,
            style_31_firefox = `html {filter: invert(${style_30[0]}%) !important; background-image: url(); text-shadow: 0 0 0 !important;}
            ${menu_value('menu_customMode3_exclude')} {filter: invert(1) !important;}
            img[alt="[公式]"] {filter: none !important;}`,
            style_31_scrollbar = `::-webkit-scrollbar {height: 12px !important;}
::-webkit-scrollbar-thumb {border-radius: 0;border-color: transparent;border-style: dashed;background-color: #3f4752 !important;background-clip: padding-box;transition: background-color .32s ease-in-out;}
::-webkit-scrollbar-corner {background: #202020 !important;}
::-webkit-scrollbar-track {background-color: #22272e !important;}
::-webkit-scrollbar-thumb:hover {background: #3f4752 !important;}`;

        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            style_11 = style_11_firefox;
            style_12 = style_12_firefox;
            style_21 = style_21_firefox;
            style_22 = style_22_firefox;
            style_31 = style_31_firefox;
        }

        if (isDaytime()) {
            if (menu_value('menu_runDuringTheDay')) {
                style_12 = style_11;
                style_22 = style_21;
            } else {
                style_12 = style_22 = '';
            }
        }

        let darkModeType = getAutoSwitch();

        switch(darkModeType) {
            case 1:
                style += style_12;
                break;
            case 2:
                style += style_22;
                break;
            case 3:
                style += style_31 + style_31_scrollbar;
                if (location.hostname.indexOf('search.bilibili.com') > -1) {
                    style += `ul.video-list img, ul.video-list .video-item .img .mask-video, ul.video-list .video-item .img .van-danmu, ul.video-list .video-item .img .van-framepreview {filter: none !important;}`;
                } else if (location.hostname.indexOf('.bilibili.com') > -1) {
                    style += `
.bpx-player-container[data-screen="full"] .bpx-player-video-wrap {filter: invert(1) !important;}
.bpx-player-container[data-screen="web"] {filter: invert(1) !important;}
.bpx-player-container[data-screen="web"] video {filter: none !important;}
* {font-weight: bold !important;}`;
                } else if (location.hostname.indexOf('.huya.com') > -1) {
                    style += `#player-wrap[style="height: 100%;"], .player-loading, .sidebar-show, #player-ctrl-wrap {filter: invert(1) !important;}`;
                }
                break;
        }

        style_Add.id = 'XIU2DarkMode';
        style_Add.type = 'text/css';

        if (document.lastElementChild) {
            document.lastElementChild.appendChild(style_Add).textContent = style;
        } else {
            let timer1 = setInterval(function(){
                if (document.lastElementChild) {
                    clearInterval(timer1);
                    document.lastElementChild.appendChild(style_Add).textContent = style;
                }
            });
        }

        let websiteList = [];
        if (menu_value('menu_autoRecognition')) {
            websiteList = menu_value('menu_forcedToEnable');
        }

        let timer = setInterval(function(){
            if (document.body) {
                clearInterval(timer);
                setTimeout(function(){
                    console.log(i18n.log.htmlBody, window.getComputedStyle(document.lastElementChild).backgroundColor, 'body:', window.getComputedStyle(document.body).backgroundColor);
                    if (!(checkChallenge()) && window.getComputedStyle(document.body).backgroundColor === 'rgba(0, 0, 0, 0)' && window.getComputedStyle(document.lastElementChild).backgroundColor === 'rgba(0, 0, 0, 0)') {
                        let style_Add2 = document.createElement('style');
                        style_Add2.id = 'XIU2DarkMode2';
                        document.lastElementChild.appendChild(style_Add2).textContent = style_00;
                    } else if (checkChallenge() || (document.querySelector('head>meta[name="color-scheme"],head>link[href^="resource:"]') && window.matchMedia('(prefers-color-scheme: dark)').matches) || (document.documentElement.classList.contains('dark') || document.body.classList.contains('dark')) || (getColorValue(document.documentElement) <= 101010 || getColorValue(document.body) <= 101010)) {
                        if (menu_value('menu_autoRecognition')) {
                            for (let i=0;i<websiteList.length;i++){
                                if (websiteList[i] === location.host) return;
                            }
                            console.log(i18n.log.detectedDark);
                            document.getElementById('XIU2DarkMode').remove();
                            remove = true;
                        }
                    }
                }, 150);

                setTimeout(function(){
                    console.log(i18n.log.htmlBody, window.getComputedStyle(document.lastElementChild).backgroundColor, 'body:', window.getComputedStyle(document.body).backgroundColor);
                    if (checkChallenge() || (document.querySelector('head>meta[name="color-scheme"],head>link[href^="resource:"]') && window.matchMedia('(prefers-color-scheme: dark)').matches) || (document.documentElement.classList.contains('dark') || document.body.classList.contains('dark')) || (getColorValue(document.documentElement) <= 101010 || getColorValue(document.body) <= 101010)) {
                        if (menu_value('menu_autoRecognition')) {
                            for (let i=0;i<websiteList.length;i++){
                                if (websiteList[i] === location.host) return;
                            }
                            if (remove) return;
                            console.log(i18n.log.detectedDark);
                            if (document.getElementById('XIU2DarkMode')) document.getElementById('XIU2DarkMode').remove();
                            if (document.getElementById('XIU2DarkMode2')) document.getElementById('XIU2DarkMode2').remove();
                        }
                    }
                }, 1500);
            }
        });

        if (location.hostname === 'bbs.pcbeta.com') {
            let timer1 = setInterval(function(){
                if (!document.getElementById('XIU2DarkMode')) {
                    document.lastElementChild.appendChild(style_Add).textContent = style;
                    clearInterval(timer1);
                }
            });
        }
    }

    function checkChallenge() {
        return (window.matchMedia('(prefers-color-scheme: dark)').matches &&
            document.querySelector('head>meta[content*="https://challenges.cloudflare.com"]') &&
            document.querySelector('body>script[nonce]'));
    }

    function getColorValue(e) {
        let rgbValueArry = window.getComputedStyle(e).backgroundColor.replace(/rgba|rgb|\(|\)| /g, '').split(',');
        return parseInt(rgbValueArry[0] + rgbValueArry[1] + rgbValueArry[2]);
    }

    function isDaytime() {
        let nowTime = new Date('2022/03/07 ' + new Date().getHours() + ':' + new Date().getMinutes() + ':00').getTime()/1000,
            time = GM_getValue('menu_customTime').split('|');
        time[0] = new Date('2022/03/07 ' + time[0] + ':00').getTime()/1000;
        time[1] = new Date('2022/03/07 ' + time[1] + ':00').getTime()/1000;
        if (time[0] < time[1]){
            if (nowTime > time[0] && nowTime < time[1]) return true;
            return false;
        } else {
            if (nowTime > time[0] || nowTime < time[1]) return true;
            return false;
        }
    }
})();