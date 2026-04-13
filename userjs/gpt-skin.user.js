// ==UserScript==
// @name         GPT Skin v2
// @version      v2.1
// @license      MIT
// @description  Fully customize the chat UI of ChatGPT and Gemini. Automatically applies themes based on chat names.
// @icon         https://github.com/erichologist/SVGs/raw/refs/heads/main/paint-palette.svg
// @author       p65536
// @include      https://chat.openai.com/*
// @include      https://chatgpt.com/*
// @match    *://*chatgpt.com/*
// @match    *://*gemini.google.com/*
// @match    *://*aistudio.google.com/*
// @match    *://*notebooklm.google.com/*
// @match    *://*google.com/*
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      raw.githubusercontent.com
// @connect      fonts.googleapis.com
// @connect      fonts.gstatic.com
// @connect      *
// @run-at       document-start
// @noframes
// @downloadURL  https://github.com/erichologist/userscripts.git
// ==/UserScript==

(() => {
    'use strict';

    // --- Common Script Definitions ---
    const OWNERID = 'p65536';
    const APPID = 'aiuxc';
    const APPNAME = 'AI UX Customizer';
    const LOG_PREFIX = `[${APPID.toUpperCase()}]`;

    // ================================================================
    // SECTION: Global Constants & Base Configuration
    // ================================================================
    const PLATFORM_DEFS = {
        CHATGPT: { NAME: 'ChatGPT', HOST: 'chatgpt.com' },
        GEMINI: { NAME: 'Gemini', HOST: 'gemini.google.com' },
    };

    function identifyPlatform() {
        const hostname = window.location.hostname;
        if (hostname.endsWith(PLATFORM_DEFS.CHATGPT.HOST)) return PLATFORM_DEFS.CHATGPT.NAME;
        if (hostname.endsWith(PLATFORM_DEFS.GEMINI.HOST)) return PLATFORM_DEFS.GEMINI.NAME;
        return null;
    }

    const PLATFORM = identifyPlatform();
    if (!PLATFORM) {
        console.warn(`${APPID} Unsupported platform. Script execution stopped.`);
        return;
    }

    const CSS_VARS = {
        USER_NAME: `--${APPID}-user-name`,
        USER_NAME_DISPLAY: `--${APPID}-user-name-display`,
        USER_ICON: `--${APPID}-user-icon`,
        USER_ICON_DISPLAY: `--${APPID}-user-icon-display`,
        USER_STANDING_IMAGE: `--${APPID}-user-standing-image`,
        USER_TEXT_COLOR: `--${APPID}-user-text-color`,
        USER_FONT: `--${APPID}-user-font`,
        USER_BUBBLE_BG: `--${APPID}-user-bubble-bg`,
        USER_BUBBLE_BOXSHADOW: `--${APPID}-user-bubble-boxshadow`,
        USER_BUBBLE_BDFILTER: `--${APPID}-user-bubble-backdropfilter`,
        USER_BUBBLE_PADDING: `--${APPID}-user-bubble-padding`,
        USER_BUBBLE_RADIUS: `--${APPID}-user-bubble-radius`,
        USER_BUBBLE_MAXWIDTH: `--${APPID}-user-bubble-maxwidth`,
        ASSISTANT_NAME: `--${APPID}-assistant-name`,
        ASSISTANT_NAME_DISPLAY: `--${APPID}-assistant-name-display`,
        ASSISTANT_ICON: `--${APPID}-assistant-icon`,
        ASSISTANT_ICON_DISPLAY: `--${APPID}-assistant-icon-display`,
        ASSISTANT_STANDING_IMAGE: `--${APPID}-assistant-standing-image`,
        ASSISTANT_TEXT_COLOR: `--${APPID}-assistant-text-color`,
        ASSISTANT_FONT: `--${APPID}-assistant-font`,
        ASSISTANT_BUBBLE_BG: `--${APPID}-assistant-bubble-bg`,
        ASSISTANT_BUBBLE_BOXSHADOW: `--${APPID}-assistant-bubble-boxshadow`,
        ASSISTANT_BUBBLE_PADDING: `--${APPID}-assistant-bubble-padding`,
        ASSISTANT_BUBBLE_RADIUS: `--${APPID}-assistant-bubble-radius`,
        ASSISTANT_BUBBLE_MAXWIDTH: `--${APPID}-assistant-bubble-maxwidth`,
        WINDOW_BG_COLOR: `--${APPID}-window-bg-color`,
        WINDOW_BG_IMAGE: `--${APPID}-window-bg-image`,
        WINDOW_BG_SIZE: `--${APPID}-window-bg-size`,
        WINDOW_BG_POS: `--${APPID}-window-bg-pos`,
        WINDOW_BG_REPEAT: `--${APPID}-window-bg-repeat`,
        WINDOW_OVERLAY: `--${APPID}-window-overlay`,
        INPUT_BG: `--${APPID}-input-bg`,
        INPUT_BOXSHADOW: `--${APPID}-input-boxshadow`,
        INPUT_BDFILTER: `--${APPID}-input-backdropfilter`,
        INPUT_FIELD_BG: `--${APPID}-input-field-bg`,
        INPUT_COLOR: `--${APPID}-input-color`,
        CHAT_CONTENT_MAX_WIDTH: `--${APPID}-chat-content-max-width`,
        MESSAGE_MARGIN_TOP: `--${APPID}-message-margin-top`,
        ICON_SIZE: `--${APPID}-icon-size`,
        ICON_MARGIN: `--${APPID}-icon-margin`,
        STANDING_IMG_USER_WIDTH: `--${APPID}-standing-image-user-width`,
        STANDING_IMG_ASST_WIDTH: `--${APPID}-standing-image-assistant-width`,
        STANDING_IMG_ASST_LEFT: `--${APPID}-standing-image-assistant-left`,
        STANDING_IMG_USER_MASK: `--${APPID}-standing-image-user-mask`,
        STANDING_IMG_ASST_MASK: `--${APPID}-standing-image-assistant-mask`,
        RIGHT_SIDEBAR_WIDTH: `--${APPID}-right-sidebar-width`,
    };

    const SHARED_CONSTANTS = {
        STORAGE_SETTINGS: {
            ROOT_KEY: `${APPID}-manifest`,
            THEME_PREFIX: `${APPID}-theme-`,
            CONFIG_SIZE_RECOMMENDED_LIMIT_BYTES: 5 * 1024 * 1024,
            CONFIG_SIZE_LIMIT_BYTES: 10 * 1024 * 1024,
            CACHE_SIZE_LIMIT_BYTES: 10 * 1024 * 1024,
        },
        PROCESSING: { BATCH_SIZE: 50 },
        RETRY: { SCROLL_OFFSET_FOR_NAV: 40, AVATAR_INJECTION_LIMIT: 5, POLLING_SCAN_LIMIT: 7 },
        IMAGE_PROCESSING: { QUALITY: 0.85, MAX_WIDTH_BG: 1920, MAX_HEIGHT_STANDING: 1080 },
        TIMING: {
            DEBOUNCE_DELAYS: {
                VISIBILITY_CHECK: 250,
                CACHE_UPDATE: 250,
                LAYOUT_RECALCULATION: 150,
                NAVIGATION_UPDATE: 100,
                UI_REPOSITION: 100,
                THEME_UPDATE: 150,
                SETTINGS_SAVE: 300,
                THEME_PREVIEW: 50,
                AVATAR_INJECTION: 25,
                JUMP_LIST_PREVIEW_HOVER: 50,
                JUMP_LIST_PREVIEW_KEY_NAV: 150,
                JUMP_LIST_PREVIEW_RESET: 200,
                FILTER_INPUT_DEBOUNCE: 150,
                SIZE_CALCULATION: 300,
            },
            TIMEOUTS: {
                POST_NAVIGATION_DOM_SETTLE: 200,
                SCROLL_OFFSET_CLEANUP: 1500,
                PANEL_TRANSITION_DURATION: 350,
                ZERO_MESSAGE_GRACE_PERIOD: 2000,
                WAIT_FOR_MAIN_CONTENT: 10000,
                BLOB_URL_REVOKE_DELAY: 10000,
                SELF_HEAL_IDLE_TIMEOUT_MS: 1000,
            },
            THRESHOLDS: { SUSPEND_LIMIT_MS: 5 * 60 * 1000 },
            ANIMATIONS: { TOAST_ENTER_DELAY: 10, TOAST_LEAVE_DURATION: 300, LAYOUT_STABILIZATION_MS: 500 },
            POLLING: { MESSAGE_DISCOVERY_MS: 750, STREAM_COMPLETION_CHECK_MS: 2000, IDLE_INDEXING_MS: 1000, HEARTBEAT_INTERVAL_MS: 2000 },
            PERF_MONITOR_THROTTLE: 1000,
            KEYBOARD_THROTTLE: 120,
        },
        UI_SPECS: {
            STANDING_IMAGE_MASK_THRESHOLD_PX: 32,
            PREVIEW_BUBBLE_MAX_WIDTH: { USER: '50%', ASSISTANT: '90%' },
            MODAL_MARGIN: 8, PANEL_MARGIN: 8, ANCHOR_OFFSET: 4,
            THEME_MODAL_HEADER_PADDING: '12px', THEME_MODAL_FOOTER_PADDING: '16px',
            AVATAR: { DEFAULT_SIZE: 64, SIZE_OPTIONS: [64, 96, 128, 160, 192], MARGIN: 20 },
            COLLAPSIBLE: { HEIGHT_THRESHOLD: 128 },
        },
        OBSERVED_ELEMENT_TYPES: { BODY: 'body', INPUT_AREA: 'inputArea', SIDE_PANEL: 'sidePanel' },
        Z_INDICES: { SETTINGS_BUTTON: 10000, SETTINGS_PANEL: 11000, JUMP_LIST_PREVIEW: 12000, THEME_MODAL: 13000, COLOR_PICKER: 14000, JSON_MODAL: 15000, TOAST: 20000 },
        INTERNAL_ROLES: { USER: 'user', ASSISTANT: 'assistant' },
        THEME_IDS: { DEFAULT: 'defaultSet' },
        NAV_ROLES: { USER: 'user', ASSISTANT: 'asst', TOTAL: 'total' },
        UI_STATES: { EXPANDED: 'expanded', COLLAPSED: 'collapsed' },
        INPUT_MODES: { NORMAL: 'normal', SHIFT: 'shift' },
        CONSOLE_POSITIONS: { INPUT_TOP: 'input_top', HEADER: 'header' },
        DATA_KEYS: { ORIGINAL_TITLE: 'originalTitle', STATE: 'state', FILTERED_INDEX: 'filteredIndex', MESSAGE_INDEX: 'messageIndex', PREVIEW_FOR: 'previewFor', ICON_TYPE: 'iconType' },
        STORE_KEYS: { SYSTEM_ROOT: '_system', SYSTEM_WARNING: 'warning', SYSTEM_ERRORS: 'errors', SYSTEM_SIZE_EXCEEDED: 'isSizeExceeded', WARNING_PATH: '_system.warning', WARNING_MSG_PATH: '_system.warning.message', WARNING_SHOW_PATH: '_system.warning.show', ERRORS_PATH: '_system.errors', SIZE_EXCEEDED_PATH: '_system.isSizeExceeded' },
        RESOURCE_KEYS: { SETTINGS_BUTTON: 'settingsButton', SETTINGS_PANEL: 'settingsPanel', JSON_MODAL: 'jsonModal', THEME_MODAL: 'themeModal', WIDGET_CONTROLLER: 'widgetController', MODAL_COORDINATOR: 'modalCoordinator', THEME_MANAGER: 'themeManager', MESSAGE_CACHE_MANAGER: 'messageCacheManager', SYNC_MANAGER: 'syncManager', OBSERVER_MANAGER: 'observerManager', UI_MANAGER: 'uiManager', AVATAR_MANAGER: 'avatarManager', STANDING_IMAGE_MANAGER: 'standingImageManager', BUBBLE_UI_MANAGER: 'bubbleUIManager', MESSAGE_LIFECYCLE_MANAGER: 'messageLifecycleManager', TOAST_MANAGER: 'toastManager', TIMESTAMP_MANAGER: 'timestampManager', FIXED_NAV_MANAGER: 'fixedNavManager', MESSAGE_NUMBER_MANAGER: 'messageNumberManager', AUTO_SCROLL_MANAGER: 'autoScrollManager', MAIN_OBSERVER: 'mainObserver', LAYOUT_RESIZE_OBSERVER: 'layoutResizeObserver', INTEGRITY_SCAN: 'integrityScan', BATCH_TASK: 'batchTask', BATCH_TASK_SINGLE: 'batchTaskSingle', BATCH_TASK_TURN: 'batchTaskTurn', STREAM_CHECK: 'streamCheck', ZERO_MSG_TIMER: 'zeroMsgTimer', BUTTON_STATE_TASK: 'buttonStateTask', NAVIGATION_MONITOR: 'navigationMonitor', APP_CONTROLLER: 'appController', ANCHOR_LISTENER: 'anchorListener', JUMP_LIST: 'jumpList', HEARTBEAT_TIMER: 'heartbeatTimer' },
    };

    const DEFAULT_THEME_CONFIG = {
        developer: { logger_level: 'log' },
        platforms: {
            ChatGPT: {
                options: { icon_size: 64, chat_content_max_width: null, respect_avatar_space: true },
                features: { load_full_history_on_chat_load: { enabled: true }, timestamp: { enabled: true }, collapsible_button: { enabled: true, auto_collapse_user_message: { enabled: false } }, bubble_nav_buttons: { enabled: true }, fixed_nav_console: { enabled: false, position: SHARED_CONSTANTS.CONSOLE_POSITIONS.INPUT_TOP, keyboard_shortcuts: { enabled: false } } },
                defaultSet: { assistant: { name: 'Assistant', icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3"><path d="M19.94,9.06C19.5,5.73,16.57,3,13,3C9.47,3,6.57,5.61,6.08,9l-1.93,3.48C3.74,13.14,4.22,14,5,14h1l0,2c0,1.1,0.9,2,2,2h1 v3h7l0-4.68C18.62,15.07,20.35,12.24,19.94,9.06z"/></svg>', textColor: null, font: 'Nova Mona', bubbleBackgroundColor: 'rgb(13 13 13 / 0.85)', bubblePadding: 21, bubbleBorderRadius: 10, bubbleMaxWidth: 97, standingImageUrl: null }, user: { name: 'You', icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3"><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2"/></svg>', textColor: 'rgb(0 0 0)', font: null, bubbleBackgroundColor: 'rgb(255 255 255 / 0.4)', bubblePadding: 8, bubbleBorderRadius: 10, bubbleMaxWidth: null, standingImageUrl: null }, window: { backgroundColor: null, backgroundImageUrl: null, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }, inputArea: { backgroundColor: null, textColor: null } },
            },
            Gemini: {
                options: { icon_size: 64, chat_content_max_width: null, respect_avatar_space: true },
                features: { load_full_history_on_chat_load: { enabled: true }, timestamp: { enabled: true }, collapsible_button: { enabled: true, auto_collapse_user_message: { enabled: false } }, bubble_nav_buttons: { enabled: true }, fixed_nav_console: { enabled: true, position: SHARED_CONSTANTS.CONSOLE_POSITIONS.INPUT_TOP, keyboard_shortcuts: { enabled: true } } },
                defaultSet: { assistant: { name: 'Assistant', icon: null, textColor: null, font: null, bubbleBackgroundColor: null, bubblePadding: 8, bubbleBorderRadius: 10, bubbleMaxWidth: null, standingImageUrl: null }, user: { name: 'You', icon: null, textColor: null, font: null, bubbleBackgroundColor: null, bubblePadding: 8, bubbleBorderRadius: 10, bubbleMaxWidth: null, standingImageUrl: null }, window: { backgroundColor: null, backgroundImageUrl: null, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }, inputArea: { backgroundColor: null, textColor: null } },
            }
        },
        themeSets: []
    };

    const EVENTS = {
        TITLE_CHANGED: `${APPID}:titleChanged`, THEME_UPDATE: `${APPID}:themeUpdate`, THEME_APPLIED: `${APPID}:themeApplied`, WIDTH_PREVIEW: `${APPID}:widthPreview`, CHAT_CONTENT_WIDTH_UPDATED: `${APPID}:chatContentWidthUpdated`, WINDOW_RESIZED: `${APPID}:windowResized`, SIDEBAR_LAYOUT_CHANGED: `${APPID}:sidebarLayoutChanged`, VISIBILITY_RECHECK: `${APPID}:visibilityRecheck`, UI_REPOSITION: `${APPID}:uiReposition`, INPUT_AREA_RESIZED: `${APPID}:inputAreaResized`, NAVIGATION_START: `${APPID}:navigationStart`, NAVIGATION_END: `${APPID}:navigationEnd`, NAVIGATION: `${APPID}:navigation`, CACHE_UPDATE_REQUEST: `${APPID}:cacheUpdateRequest`, CACHE_UPDATED: `${APPID}:cacheUpdated`, NAV_HIGHLIGHT_MESSAGE: `${APPID}:nav:highlightMessage`, RAW_MESSAGE_ADDED: `${APPID}:rawMessageAdded`, AVATAR_INJECT: `${APPID}:avatarInject`, MESSAGE_COMPLETE: `${APPID}:messageComplete`, TURN_COMPLETE: `${APPID}:turnComplete`, STREAMING_START: `${APPID}:streamingStart`, STREAMING_END: `${APPID}:streamingEnd`, DEFERRED_LAYOUT_UPDATE: `${APPID}:deferredLayoutUpdate`, TIMESTAMPS_LOADED: `${APPID}:timestampsLoaded`, TIMESTAMP_ADDED: `${APPID}:timestampAdded`, REMOTE_CONFIG_CHANGED: `${APPID}:remoteConfigChanged`, SUSPEND_OBSERVERS: `${APPID}:suspendObservers`, RESUME_OBSERVERS_AND_REFRESH: `${APPID}:resumeObserversAndRefresh`, CONFIG_SIZE_EXCEEDED: `${APPID}:configSizeExceeded`, CONFIG_WARNING_UPDATE: `${APPID}:configWarningUpdate`, CONFIG_SAVE_SUCCESS: `${APPID}:configSaveSuccess`, CONFIG_UPDATED: `${APPID}:configUpdated`, INTEGRITY_SCAN_MESSAGES_FOUND: `${APPID}:integrityScanMessagesFound`, AUTO_SCROLL_REQUEST: `${APPID}:autoScrollRequest`, AUTO_SCROLL_CANCEL_REQUEST: `${APPID}:autoScrollCancelRequest`, AUTO_SCROLL_START: `${APPID}:autoScrollStart`, AUTO_SCROLL_COMPLETE: `${APPID}:autoScrollComplete`,
    };

    const CONFIG_SCHEMA = {
        theme: {
            'assistant.bubblePadding': { type: 'numeric', def: { unit: 'px', nullable: true }, validators: { min: -1, max: 50, step: 1 }, ui: { label: 'Padding:' } },
            'user.bubblePadding': { type: 'numeric', def: { unit: 'px', nullable: true }, validators: { min: -1, max: 50, step: 1 }, ui: { label: 'Padding:' } },
            'assistant.bubbleBorderRadius': { type: 'numeric', def: { unit: 'px', nullable: true }, validators: { min: -1, max: 50, step: 1 }, ui: { label: 'Radius:' } },
            'user.bubbleBorderRadius': { type: 'numeric', def: { unit: 'px', nullable: true }, validators: { min: -1, max: 50, step: 1 }, ui: { label: 'Radius:' } },
            'assistant.bubbleMaxWidth': { type: 'numeric', def: { unit: '%', nullable: true }, validators: { min: 29, max: 100, step: 1 }, ui: { label: 'max Width:' } },
            'user.bubbleMaxWidth': { type: 'numeric', def: { unit: '%', nullable: true }, validators: { min: 29, max: 100, step: 1 }, ui: { label: 'max Width:' } },
            'assistant.bubbleBackgroundColor': { type: 'color', ui: { label: 'Bubble bg color:' } },
            'user.bubbleBackgroundColor': { type: 'color', ui: { label: 'Bubble bg color:' } },
            'assistant.textColor': { type: 'color', ui: { label: 'Text color:' } },
            'user.textColor': { type: 'color', ui: { label: 'Text color:' } },
            'window.backgroundColor': { type: 'color', ui: { label: 'Window bg color:' } },
            'inputArea.backgroundColor': { type: 'color', ui: { label: 'Input bg color:' } },
            'inputArea.textColor': { type: 'color', ui: { label: 'Input text color:' } },
            'assistant.icon': { type: 'image', def: { imageType: 'icon' }, ui: { label: 'Icon:' } },
            'user.icon': { type: 'image', def: { imageType: 'icon' }, ui: { label: 'Icon:' } },
            'assistant.standingImageUrl': { type: 'image', def: { imageType: 'image' }, ui: { label: 'Standing image:' } },
            'user.standingImageUrl': { type: 'image', def: { imageType: 'image' }, ui: { label: 'Standing image:' } },
            'window.backgroundImageUrl': { type: 'image', def: { imageType: 'image' }, ui: { label: 'Background image:' } },
            'assistant.name': { type: 'text', ui: { label: 'Name:' } },
            'user.name': { type: 'text', ui: { label: 'Name:' } },
            'assistant.font': { type: 'text', ui: { label: 'Font:' } },
            'user.font': { type: 'text', ui: { label: 'Font:' } },
            'metadata.matchPatterns': { type: 'regexArray', ui: { label: 'Title Patterns:' } },
            'metadata.urlPatterns': { type: 'regexArray', ui: { label: 'URL Patterns:' } },
            'window.backgroundSize': { type: 'select', def: { options: [{ value: '', label: '(Default)' }, 'auto', 'cover', 'contain'] }, ui: { label: 'Size:' } },
            'window.backgroundPosition': { type: 'select', def: { options: [{ value: '', label: '(Default)' }, 'top left', 'top center', 'top right', 'center left', 'center center', 'center right', 'bottom left', 'bottom center', 'bottom right'] }, ui: { label: 'Position:' } },
            'window.backgroundRepeat': { type: 'select', def: { options: [{ value: '', label: '(Default)' }, 'no-repeat', 'repeat'] }, ui: { label: 'Repeat:' } },
        },
        platform: {
            'options.icon_size': { type: 'numeric', def: { unit: 'px' }, validators: { allowedValues: SHARED_CONSTANTS.UI_SPECS.AVATAR.SIZE_OPTIONS, step: 1 }, ui: { label: 'Icon size:' } },
            'options.chat_content_max_width': { type: 'numeric', def: { unit: 'vw', nullable: true }, validators: { min: 30, max: 80, step: 1 }, ui: { label: 'Chat content max width:' } },
            'options.respect_avatar_space': { type: 'toggle', ui: { label: 'Prevent image/avatar overlap' } },
            'features.timestamp.enabled': { type: 'toggle', ui: { label: 'Show timestamp' } },
            'features.collapsible_button.enabled': { type: 'toggle', ui: { label: 'Collapsible button' } },
            'features.collapsible_button.auto_collapse_user_message.enabled': { type: 'toggle', ui: { label: 'Auto collapse user message', dependencies: ['features.collapsible_button.enabled'], disabledIf: (pConfig) => !getPropertyByPath(pConfig, 'features.collapsible_button.enabled') } },
            'features.bubble_nav_buttons.enabled': { type: 'toggle', ui: { label: 'Bubble nav buttons' } },
            'features.fixed_nav_console.enabled': { type: 'toggle', ui: { label: 'Navigation console' } },
            'features.fixed_nav_console.keyboard_shortcuts.enabled': { type: 'toggle', ui: { label: 'Keyboard shortcuts', dependencies: ['features.fixed_nav_console.enabled'], disabledIf: (pConfig) => !getPropertyByPath(pConfig, 'features.fixed_nav_console.enabled') } },
            'features.fixed_nav_console.position': { type: 'select', def: { options: [{ value: SHARED_CONSTANTS.CONSOLE_POSITIONS.INPUT_TOP, label: 'Input Top' }, { value: SHARED_CONSTANTS.CONSOLE_POSITIONS.HEADER, label: 'Header' }] }, ui: { label: 'Console Position', dependencies: ['features.fixed_nav_console.enabled'], disabledIf: (pConfig) => !getPropertyByPath(pConfig, 'features.fixed_nav_console.enabled') } },
            'features.load_full_history_on_chat_load.enabled': { type: 'toggle', ui: { label: PLATFORM === 'ChatGPT' ? 'Scan layout on chat load' : 'Load full history on chat load' } },
        },
    };

    // =================================================================================
    // SECTION: Style System Helpers
    // =================================================================================

    class StyleDefinitions {
        static ICONS = (() => {
            const COMMON_PROPS = { xmlns: 'http://www.w3.org/2000/svg', height: '24px', viewBox: '0 -960 960 960', width: '24px', fill: 'currentColor' };
            const def = (d, options = {}) => ({ tag: 'svg', props: { ...COMMON_PROPS, ...options.props }, children: [{ tag: 'path', props: { d, ...options.pathProps } }] });
            return {
                folder: def('M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z'),
                arrowUp: def('M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z'),
                arrowDown: def('M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z'),
                scrollToTop: def('M440-160v-480L280-480l-56-56 256-256 256 256-56 56-160-160v480h-80Zm-200-640v-80h400v80H240Z'),
                scrollToFirst: def('m280-280 200-200 200 200-56 56-144-144-144 144-56-56Zm-40-360v-80h480v80H240Z'),
                scrollToLast: def('M240-200v-80h480v80H240Zm240-160L280-560l56-56 144 144 144-144 56 56-200 200Z'),
                bulkCollapse: def('M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z', { props: { className: 'icon-collapse' } }),
                bulkExpand: def('M200-200v-240h80v160h160v80H200Zm480-320v-160H520v-80h240v240h-80Z', { props: { className: 'icon-expand' } }),
                list: def('M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z'),
                chatLeft: def('M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z'),
                chatRight: def('M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z', { pathProps: { transform: 'translate(960, 0) scale(-1, 1)' } }),
                settings: def('M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z'),
            };
        })();

        static getGlowFlair() {
            const key = 'glow-flair';
            const generator = () => `
                @import url("https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap");
                
                /* Unified font application */
                ${CONSTANTS.SELECTORS.MAIN_APP_CONTAINER}, 
                .ProseMirror, 
                .ql-editor {
                    font-family: "Nova Mono", monospace !important;
                }

                /* Syntax Highlighting Glow Effects */
                .ͼn { color:#FFF !important; text-shadow: 0 0 2px #FFF6, 0 0 .5em #00F !important; }
                .ͼt { color:#BC80FF !important; text-shadow: 0 0 2px #FFF6, 0 0 .5em #00F !important; }
                .ͼv { color:#FF0080 !important; text-shadow: 0 0 2px #0F07FF55, 0 0 .5em #00F !important; }
                .ͼq, code { color:#03e9f4 !important; text-shadow: 0 0 5px #0F07FF60, 0 0 4px #00D9E060 !important; }
                
                /* Glassmorphism for the Composer */
                ${CONSTANTS.SELECTORS.INPUT_AREA_BG_TARGET} {
                    background-color: rgba(255,255,255,.07) !important;
                    box-shadow: inset 0 0 1px .4px rgba(255,255,255,.1), 0 5px 20px rgba(0,0,0,0.1) !important;
                    backdrop-filter: blur(12px) !important;
                    -webkit-backdrop-filter: blur(12px) !important;
                }
            `;
            return { key, rootId: null, classes: {}, vars: {}, generator };
        }

        static getCommonStyle() {
            const key = 'common-style';
            const generator = (cls) => StyleTemplates.getSharedCommonCss(cls);
            return { key, rootId: null, classes: StyleDefinitions.COMMON_CLASSES, vars: {}, generator };
        }

        static getModalStyle() {
            const key = 'modal-style';
            const generator = (cls) => StyleTemplates.getSharedModalCss(cls);
            return { key, rootId: null, classes: StyleDefinitions.MODAL_CLASSES, vars: {}, generator };
        }

        static getStaticBase() {
            const key = 'static-base';
            const prefix = `${APPID}-${key}`;
            const classes = { maxWidthActive: `${prefix}-max-width-active` };
            const vars = { chatContentMaxWidth: CSS_VARS.CHAT_CONTENT_MAX_WIDTH, messageMarginTop: CSS_VARS.MESSAGE_MARGIN_TOP };
            const cssGenerator = (cls) => PlatformAdapters.StyleManager.getStaticCss(cls);
            return { key, rootId: null, classes, vars, generator: cssGenerator };
        }

        static getDynamicRules() {
            const key = 'dynamic-rules';
            const cssGenerator = (cls, activeVars) => StyleTemplates.getThemeBaseCss(cls, activeVars);
            return { key, rootId: null, classes: {}, vars: {}, generator: cssGenerator };
        }

        static getSettingsButton() {
            const key = 'settings-button';
            const rootId = SHARED_CONSTANTS.ROOT_IDS.SETTINGS_BUTTON;
            const prefix = `${APPID}-${key}`;
            const classes = { buttonId: rootId };
            const generator = () => StyleTemplates.getSettingsButtonCss(rootId, classes, prefix);
            return { key, rootId, classes, vars: {}, generator };
        }

        static getSettingsPanel() {
            const key = 'settings-panel';
            const rootId = SHARED_CONSTANTS.ROOT_IDS.SETTINGS_PANEL;
            const prefix = `${APPID}-${key}`;
            const classes = { panel: rootId, appliedThemeName: `${prefix}-theme-name`, topRow: `${prefix}-top-row` };
            const generator = () => StyleTemplates.getSettingsPanelCss(rootId, classes);
            return { key, rootId, classes, vars: {}, generator };
        }

        static getJsonModal() {
            const key = 'json-modal';
            const rootId = SHARED_CONSTANTS.ROOT_IDS.JSON_MODAL;
            const prefix = `${APPID}-${key}`;
            const modalId = StyleDefinitions.MODAL_CLASSES.dialog;
            const classes = { dialogId: modalId, jsonEditor: `${prefix}-editor`, statusContainer: `${prefix}-status-container`, exportBtn: `${prefix}-export-btn`, importBtn: `${prefix}-import-btn`, cancelBtn: `${prefix}-cancel-btn`, saveBtn: `${prefix}-save-btn` };
            const generator = () => StyleTemplates.getJsonModalCss(rootId, classes, prefix);
            return { key, rootId, classes, vars: {}, generator };
        }

        static getThemeModal() {
            const key = 'theme-modal';
            const rootId = SHARED_CONSTANTS.ROOT_IDS.THEME_MODAL;
            const prefix = `${APPID}-${key}`;
            const classes = { dialogId: `${prefix}-dialog`, headerControls: `${prefix}-header-controls`, headerRow: `${prefix}-header-row`, renameArea: `${prefix}-rename-area`, actionArea: `${prefix}-action-area`, content: `${prefix}-content`, generalSettings: `${prefix}-general-settings`, scrollableArea: `${prefix}-scrollable-area`, grid: `${prefix}-grid`, separator: `${prefix}-separator`, moveBtn: `${prefix}-move-btn`, deleteConfirmGroup: `${prefix}-delete-confirm-group`, deleteConfirmLabel: `${prefix}-delete-confirm-label`, renameInput: `${prefix}-rename-input`, themeSelect: `${prefix}-select`, renameBtn: `${prefix}-rename-btn`, upBtn: `${prefix}-up-btn`, downBtn: `${prefix}-down-btn`, newBtn: `${prefix}-new-btn`, copyBtn: `${prefix}-copy-btn`, deleteBtn: `${prefix}-delete-btn`, renameOkBtn: `${prefix}-rename-ok-btn`, renameCancelBtn: `${prefix}-rename-cancel-btn`, deleteConfirmBtn: `${prefix}-delete-confirm-btn`, deleteCancelBtn: `${prefix}-delete-cancel-btn`, saveBtn: `${prefix}-save-btn`, applyBtn: `${prefix}-apply-btn`, cancelBtn: `${prefix}-cancel-btn`, mainActionsId: `${prefix}-actions-main`, renameActionsId: `${prefix}-actions-rename` };
            const generator = () => StyleTemplates.getThemeModalCss(rootId, classes);
            return { key, rootId, classes, vars: {}, generator };
        }

        static getColorPicker() {
            const key = 'color-picker';
            const rootId = SHARED_CONSTANTS.ROOT_IDS.COLOR_PICKER;
            const prefix = `${APPID}-${key}`;
            const classes = { picker: `${prefix}-container`, svPlane: `${prefix}-sv-plane`, svThumb: `${prefix}-sv-thumb`, sliderGroup: `${prefix}-slider-group`, sliderTrack: `${prefix}-slider-track`, hueTrack: `${prefix}-hue-track`, alphaCheckerboard: `${prefix}-alpha-checkerboard`, gradientWhite: `${prefix}-gradient-white`, gradientBlack: `${prefix}-gradient-black`, colorPickerPopup: `${prefix}-popup` };
            const generator = () => StyleTemplates.getColorPickerCss(rootId, classes);
            return { key, rootId, classes, vars: {}, generator };
        }

        static getToast() {
            const key = 'toast';
            const rootId = SHARED_CONSTANTS.ROOT_IDS.TOAST;
            const prefix = `${APPID}-${key}`;
            const classes = { container: rootId, visible: 'is-visible', cancelBtn: `${prefix}-cancel-btn` };
            const generator = () => StyleTemplates.getToastCss(rootId, classes);
            return { key, rootId, classes, vars: {}, generator };
        }

        static getFixedNav() {
            const key = 'fixed-nav';
            const rootId = SHARED_CONSTANTS.ROOT_IDS.FIXED_NAV;
            const prefix = `${APPID}-${key}`;
            const classes = { consoleId: rootId, bulkCollapseBtnId: `${prefix}-bulk-collapse-btn`, autoscrollBtnId: `${prefix}-autoscroll-btn`, console: `${prefix}-console`, unpositioned: `${prefix}-unpositioned`, hidden: `${prefix}-hidden`, group: `${prefix}-group`, separator: `${prefix}-separator`, counter: `${prefix}-counter`, counterCurrent: `${prefix}-counter-current`, counterTotal: `${prefix}-counter-total`, btn: `${prefix}-btn`, btnAccent: `${prefix}-btn-accent`, btnDanger: `${prefix}-btn-danger`, roleBtn: `${prefix}-role-btn`, jumpInput: `${prefix}-jump-input`, highlightMessage: `${prefix}-highlight-message`, highlightTurn: `${prefix}-highlight-turn`, roleTotal: `${prefix}-role-total`, roleUser: `${prefix}-role-user`, roleAssistant: `${prefix}-role-assistant`, isHidden: 'is-hidden' };
            const generator = () => StyleTemplates.getFixedNavCss(rootId, classes);
            return { key, rootId, classes, vars: {}, generator };
        }

        static getJumpList() {
            const key = 'jump-list';
            const rootId = SHARED_CONSTANTS.ROOT_IDS.JUMP_LIST;
            const prefix = `${APPID}-${key}`;
            const classes = { containerId: rootId, listId: `${prefix}-list`, previewId: `${prefix}-preview`, scrollbox: `${prefix}-scrollbox`, filterContainer: `${prefix}-filter-container`, filter: `${prefix}-filter`, filterRegexValid: 'is-regex-valid', modeLabel: `${prefix}-mode-label`, modeString: 'is-string', modeRegex: 'is-regex', modeInvalid: 'is-regex-invalid', current: 'is-current', focused: 'is-focused', userItem: 'user-item', asstItem: 'assistant-item', visible: 'is-visible', expandDown: 'expand-down' };
            const generator = () => StyleTemplates.getJumpListCss(rootId, classes);
            return { key, rootId, classes, vars: {}, generator };
        }

        static getTimestamp() {
            const key = 'timestamp';
            const prefix = `${APPID}-${key}`;
            const classes = { container: `${prefix}-container`, assistant: `${prefix}-assistant`, user: `${prefix}-user`, text: `${prefix}-text`, hidden: `${prefix}-hidden` };
            const cssGenerator = (cls) => StyleTemplates.getTimestampCss(cls);
            return { key, rootId: null, classes, vars: {}, generator: cssGenerator };
        }

        static getMessageNumber() {
            const key = 'message-number';
            const prefix = `${APPID}-${key}`;
            const classes = { parent: `${prefix}-parent`, number: `${prefix}-text`, assistant: `${prefix}-assistant`, user: `${prefix}-user`, hidden: `${prefix}-hidden` };
            const cssGenerator = (cls) => StyleTemplates.getMessageNumberCss(cls);
            return { key, rootId: null, classes, vars: {}, generator: cssGenerator };
        }

        static getStandingImage() {
            const key = 'standing-image';
            const prefix = `${APPID}-${key}`;
            const classes = { userImageId: `${prefix}-user`, assistantImageId: `${prefix}-assistant` };
            const vars = { userImage: CSS_VARS.USER_STANDING_IMAGE, assistantImage: CSS_VARS.ASSISTANT_STANDING_IMAGE, userWidth: CSS_VARS.STANDING_IMG_USER_WIDTH, assistantWidth: CSS_VARS.STANDING_IMG_ASST_WIDTH, assistantLeft: CSS_VARS.STANDING_IMG_ASST_LEFT, userMask: CSS_VARS.STANDING_IMG_USER_MASK, assistantMask: CSS_VARS.STANDING_IMG_ASST_MASK, rightSidebarWidth: CSS_VARS.RIGHT_SIDEBAR_WIDTH };
            const cssGenerator = (cls) => `
                ${StyleTemplates.getStandingImageCss(cls)}
                /* Recommendation: Mobile safety kill-switch */
                @media (max-width: 1024px) {
                    #${cls.userImageId}, #${cls.assistantImageId} {
                        display: none !important;
                    }
                }
            `;
            return { key, rootId: null, classes, vars, generator: cssGenerator };
        }

        static getBubbleUI() {
            const key = 'bubble-ui';
            const prefix = `${APPID}-${key}`;
            const classes = { collapsibleParent: `${prefix}-collapsible`, collapsibleContent: `${prefix}-content`, collapsibleBtn: `${prefix}-toggle-btn`, navContainer: `${prefix}-nav-container`, navButtons: `${prefix}-nav-buttons`, navGroupTop: `${prefix}-nav-group-top`, navGroupBottom: `${prefix}-nav-group-bottom`, navBtn: `${prefix}-nav-btn`, navPrev: `${prefix}-nav-prev`, navNext: `${prefix}-nav-next`, navTop: `${prefix}-nav-top`, hidden: `${prefix}-hidden`, collapsed: `${prefix}-collapsed`, navParent: `${prefix}-nav-parent`, imageOnlyAnchor: `${prefix}-image-only-anchor` };
            const cssGenerator = (cls) => PlatformAdapters.StyleManager.getBubbleCss(cls);
            return { key, rootId: null, classes, vars, generator: cssGenerator };
        }

        static getAvatar() {
            const key = 'avatar';
            const prefix = `${APPID}-${key}`;
            const vars = { iconSize: CSS_VARS.ICON_SIZE, iconMargin: CSS_VARS.ICON_MARGIN };
            const classes = { processed: `${prefix}-processed` };
            const cssGenerator = () => PlatformAdapters.Avatar.getCss();
            return { key, rootId: null, classes, vars, generator: cssGenerator };
        }

        static COMMON_CLASSES = (() => {
            const prefix = `${APPID}-common`;
            return { modalButton: `${prefix}-btn`, primaryBtn: `${prefix}-btn-primary`, pushRightBtn: `${prefix}-btn-push-right`, dangerBtn: `${prefix}-btn-danger`, sliderSubgroupControl: `${prefix}-slider-control`, sliderDisplay: `${prefix}-slider-display`, sliderDefault: 'is-default', sliderContainer: `${prefix}-slider-container`, compoundSliderContainer: `${prefix}-compound-slider-container`, sliderSubgroup: `${prefix}-slider-subgroup`, toggleSwitch: `${prefix}-toggle`, toggleSlider: `${prefix}-toggle-slider`, formField: `${prefix}-form-field`, inputWrapper: `${prefix}-input-wrapper`, formErrorMsg: `${prefix}-error-msg`, compoundFormFieldContainer: `${prefix}-compound-form-container`, localFileBtn: `${prefix}-local-file-btn`, invalidInput: 'is-invalid', commonInput: `${prefix}-input`, labelRow: `${prefix}-label-row`, statusText: `${prefix}-status-text`, colorFieldWrapper: `${prefix}-color-wrapper`, colorSwatch: `${prefix}-color-swatch`, colorSwatchChecker: `${prefix}-color-checker`, colorSwatchValue: `${prefix}-color-value`, colorPickerPopup: `${prefix}-color-popup`, previewContainer: `${prefix}-preview-container`, previewBubbleWrapper: `${prefix}-preview-bubble-wrapper`, previewBubble: `${prefix}-preview-bubble`, previewInputArea: `${prefix}-preview-input`, previewBackground: `${prefix}-preview-bg`, userPreview: `${prefix}-user-preview`, submenuRow: `${prefix}-row`, submenuFieldset: `${prefix}-fieldset`, submenuSeparator: `${prefix}-separator`, featureGroup: `${prefix}-feature-group`, warningBanner: `${prefix}-warning-banner`, conflictText: `${prefix}-conflict-text`, conflictReloadBtnId: `${prefix}-conflict-reload-btn` };
        })();

        static MODAL_CLASSES = (() => {
            const prefix = `${APPID}-modal`;
            return { dialog: `${prefix}-dialog`, box: `${prefix}-box`, header: `${prefix}-header`, content: `${prefix}-content`, footer: `${prefix}-footer`, footerMessage: `${prefix}-footer-message`, buttonGroup: `${prefix}-button-group` };
        })();
    }

    // Set Root IDs properly
    SHARED_CONSTANTS.ROOT_IDS = {
        SETTINGS_PANEL: `${APPID}-settings-panel`,
        THEME_MODAL: `${APPID}-theme-modal`,
        JSON_MODAL: `${APPID}-json-modal`,
        FIXED_NAV: `${APPID}-fixed-nav-console`,
        JUMP_LIST: `${APPID}-jump-list-container`,
        TOAST: `${APPID}-toast-container`,
        COLOR_PICKER: `${APPID}-color-picker-popup`,
        SETTINGS_BUTTON: `${APPID}-settings-button`,
    };

    const StyleTemplates = {
        getSharedCommonCss(cls) {
            const palette = SITE_STYLES.PALETTE;
            const root = `[data-${APPID}-scope]`;
            return `
                ${root} .${cls.modalButton} { background: ${palette.btn_bg}; border: 1px solid ${palette.btn_border}; border-radius: 5px; color: ${palette.btn_text}; cursor: pointer; font-size: 13px; padding: 5px 16px; transition: background 0.12s; min-width: 80px; }
                ${root} .${cls.modalButton}:hover:not(:disabled) { background: ${palette.btn_hover_bg}; }
                ${root} .${cls.primaryBtn} { background-color: #1a73e8; color: #fff; }
                ${root} .${cls.dangerBtn} { background-color: ${palette.delete_confirm_btn_bg}; color: ${palette.delete_confirm_btn_text}; }
                ${root} .${cls.toggleSwitch} { position: relative; display: inline-block; width: 40px; height: 22px; }
                ${root} .${cls.toggleSlider} { position: absolute; cursor: pointer; inset: 0; background-color: ${palette.toggle_bg_off}; transition: .3s; border-radius: 22px; }
                ${root} .${cls.toggleSlider}:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: ${palette.toggle_knob}; transition: .3s; border-radius: 50%; }
                ${root} .${cls.toggleSwitch} input:checked + .${cls.toggleSlider} { background-color: ${palette.toggle_bg_on}; }
                ${root} .${cls.toggleSwitch} input:checked + .${cls.toggleSlider}:before { transform: translateX(18px); }
                ${root} .${cls.formField} { display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px; }
                ${root} .${cls.commonInput} { background: ${palette.input_bg}; border: 1px solid ${palette.border}; color: ${palette.text_primary}; padding: 6px; border-radius: 4px; }
            `;
        },
        getSharedModalCss(cls) {
            const palette = SITE_STYLES.PALETTE;
            const root = `[data-${APPID}-scope]`;
            return `
                .${cls.dialog} { background: transparent; border: none; padding: 0; }
                .${cls.box} { background: ${palette.bg}; border: 1px solid ${palette.border}; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); color: ${palette.text_primary}; display: flex; flex-direction: column; }
                .${cls.header} { padding: 12px 16px; border-bottom: 1px solid ${palette.border}; font-weight: bold; }
                .${cls.footer} { padding: 12px 16px; border-top: 1px solid ${palette.border}; display: flex; justify-content: flex-end; gap: 8px; }
            `;
        },
        getSettingsPanelCss(rootId, cls) {
            const palette = SITE_STYLES.PALETTE;
            return `#${rootId} { position: fixed; background: ${palette.bg}; border: 1px solid ${palette.border}; border-radius: 8px; padding: 12px; z-index: ${SHARED_CONSTANTS.Z_INDICES.SETTINGS_PANEL}; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }`;
        },
        getJsonModalCss(rootId, cls, prefix) {
            const palette = SITE_STYLES.PALETTE;
            return `
                #${rootId} .${cls.jsonEditor} { width: 100%; height: 300px; font-family: monospace; background: ${palette.input_bg}; color: ${palette.text_primary}; border: 1px solid ${palette.border}; border-radius: 4px; padding: 8px; resize: none; }
                #${rootId} .status-container { display: flex; justify-content: space-between; font-size: 11px; margin-top: 5px; }
            `;
        },
        getThemeModalCss(rootId, cls) {
            return `#${rootId} .${cls.content} { display: flex; flex-direction: column; height: 70vh; } #${rootId} .${cls.scrollableArea} { overflow-y: auto; padding: 16px; }`;
        },
        getColorPickerCss(rootId, cls) {
            const palette = SITE_STYLES.PALETTE;
            return `#${rootId} { background: ${palette.bg}; border: 1px solid ${palette.border}; padding: 10px; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.2); }`;
        },
        getFixedNavCss(rootId, cls) {
            const palette = SITE_STYLES.PALETTE;
            return `
                #${rootId} { display: flex; gap: 5px; background: ${palette.fixed_nav_bg}; border: 1px solid ${palette.fixed_nav_border}; border-radius: 20px; padding: 5px 10px; }
                .${cls.highlightMessage} { outline: 2px solid ${palette.fixed_nav_highlight_outline} !important; }
            `;
        },
        getJumpListCss(rootId, cls) {
            const palette = SITE_STYLES.PALETTE;
            return `#${rootId} { background: ${palette.jump_list_bg}; border: 1px solid ${palette.jump_list_border}; border-radius: 8px; width: 300px; max-height: 400px; overflow: hidden; display: flex; flex-direction: column; }`;
        },
        getSettingsButtonCss(rootId, cls, prefix) {
            return `#${rootId} { cursor: pointer; transition: transform 0.2s; } #${rootId}:hover { transform: rotate(30deg); }`;
        },
        getToastCss(rootId, cls) {
            return `#${rootId} { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: orange; color: white; padding: 10px 20px; border-radius: 5px; z-index: 99999; }`;
        },
        getTimestampCss(cls) {
            return `.${cls.container} { font-size: 0.7rem; color: #888; margin: 4px 0; }`;
        },
        getMessageNumberCss(cls) {
            return `.${cls.number} { font-size: 0.6rem; color: #aaa; margin-right: 5px; }`;
        },
        getStandingImageCss(cls) {
            return `
                #${cls.userImageId}, #${cls.assistantImageId} { position: fixed; bottom: 0; pointer-events: none; z-index: 1; transition: opacity 0.5s; background-size: contain; background-repeat: no-repeat; background-position: bottom; }
                #${cls.userImageId} { right: 0; }
                #${cls.assistantImageId} { left: 0; }
            `;
        },
        getBubbleUiCss(cls, options) {
            return `.${cls.collapsibleBtn} { cursor: pointer; border: none; background: transparent; } .${cls.collapsed} { max-height: 100px; overflow: hidden; }`;
        },
        getThemeBaseCss(cls, activeVars) {
            const selectors = CONSTANTS.SELECTORS;
            // Recommendation: Legibility Layer
            return `
                ${selectors.MAIN_APP_CONTAINER} { 
                    background-color: var(${CSS_VARS.WINDOW_BG_COLOR});
                    background-image: var(${CSS_VARS.WINDOW_BG_IMAGE});
                    position: relative;
                }
                ${selectors.MAIN_APP_CONTAINER}::before {
                    content: ''; position: fixed; inset: 0; background: var(${CSS_VARS.WINDOW_OVERLAY}, transparent); z-index: -1; pointer-events: none;
                }
                ${selectors.USER_MESSAGE} ${selectors.RAW_USER_BUBBLE} { background-color: var(${CSS_VARS.USER_BUBBLE_BG}); border-radius: var(${CSS_VARS.USER_BUBBLE_RADIUS}); }
                ${selectors.ASSISTANT_MESSAGE} ${selectors.RAW_ASSISTANT_BUBBLE} { background-color: var(${CSS_VARS.ASSISTANT_BUBBLE_BG}); border-radius: var(${CSS_VARS.ASSISTANT_BUBBLE_RADIUS}); }
            `;
        }
    };

    // =================================================================================
    // SECTION: Core Managers & Components
    // =================================================================================

    /**
     * Optimized Jump List Filter
     */
    class JumpListComponent extends UIComponentBase {
        // ... (rest of constructor same)
        _filterMessages(searchTerm, inputElement) {
            const cls = this.styleHandle.classes;
            const parsed = this._parseSearchInput(searchTerm);
            inputElement.classList.toggle(cls.filterRegexValid, parsed.isValid);
            if (!searchTerm.trim()) return this.searchableMessages;

            const lowerTerm = searchTerm.toLowerCase();
            let regex = null;
            if (parsed.mode === 'RegExp' && parsed.isValid) {
                try { regex = new RegExp(parsed.source, parsed.flags); } catch(e) { return []; }
            }

            const results = [];
            const messages = this.searchableMessages;
            const len = messages.length;
            for (let i = 0; i < len; i++) {
                const msg = messages[i];
                if (regex) {
                    if (regex.test(msg.displayText)) results.push(msg);
                } else {
                    if (msg.lowerText.indexOf(lowerTerm) !== -1) results.push(msg);
                }
            }
            return results;
        }
    }

    /**
     * Updated JsonModal with Storage Health
     */
    class JsonModalComponent extends UIComponentBase {
        _calculateAndSetSize(text) {
            if (!this.store) return;
            let sizeInBytes = 0;
            try {
                const obj = JSON.parse(text);
                sizeInBytes = new Blob([JSON.stringify(obj)]).size;
            } catch {
                sizeInBytes = new Blob([text]).size;
            }

            const limit = SHARED_CONSTANTS.STORAGE_SETTINGS.CONFIG_SIZE_LIMIT_BYTES;
            const percent = Math.round((sizeInBytes / limit) * 100);
            const displayStr = `${(sizeInBytes / 1024).toFixed(1)} KB / ${(limit / 1024).toFixed(1)} KB`;
            
            const healthColor = percent > 85 ? SITE_STYLES.PALETTE.danger_text : (percent > 60 ? 'orange' : SITE_STYLES.PALETTE.accent_text);

            this.store.set('sizeInfo', {
                text: `${displayStr} (${percent}% Used)`,
                color: healthColor,
                bold: percent > 85,
            });
        }
    }

    // =================================================================================
    // SECTION: ChatGPT Specific Adapters (Refined for 2025)
    // =================================================================================

    function defineChatGPTValues() {
        const CONSTANTS = {
            ...SHARED_CONSTANTS,
            SELECTORS: {
                MAIN_APP_CONTAINER: 'div[data-scroll-root], div:has(> main#main), #__next',
                MESSAGES_ROOT: 'main',
                CONVERSATION_UNIT: 'article[data-testid^="conversation-turn-"]',
                MESSAGE_ID_HOLDER: '[data-message-id]',
                USER_MESSAGE: 'div[data-message-author-role="user"]',
                ASSISTANT_MESSAGE: 'div[data-message-author-role="assistant"]',
                RAW_USER_BUBBLE: 'div.user-message-bubble-color, [class*="user-message-bubble"]',
                RAW_ASSISTANT_BUBBLE: 'div:has(> .markdown), [class*="assistant-message-bubble"]',
                INPUT_AREA_BG_TARGET: 'form div[class*="shadow-short-composer"], form div:has(> #prompt-textarea)',
                INPUT_TEXT_FIELD_TARGET: '#prompt-textarea, [contenteditable="true"].ProseMirror',
                INSERTION_ANCHOR: 'form [class*="trailing"], div:has(> button[data-testid="send-button"])',
                CHAT_CONTENT_MAX_WIDTH: '.group\\/turn-messages, [class*="--thread-content-max-width"]',
                STANDING_IMAGE_ANCHOR: 'main article',
                TURN_COMPLETE_SELECTOR: 'button[data-testid="copy-turn-action-button"], [class*="assistant-actions"]',
                DEEP_RESEARCH_RESULT: '.deep-research-result, [class*="research-result"]',
            },
            URL_PATTERNS: { EXCLUDED: [/^\/library/, /^\/codex/, /^\/gpts/, /^\/images/, /^\/apps/] }
        };

        const UI_PALETTE = { ...SHARED_CONSTANTS.SITE_STYLES?.PALETTE, bg: 'var(--main-surface-primary)', text_primary: 'var(--text-primary)', border: 'var(--border-default)', accent_text: 'var(--text-accent)', delete_confirm_btn_bg: '#ef4444', delete_confirm_btn_text: '#fff' };
        const SITE_STYLES = { PALETTE: UI_PALETTE, Z_INDICES: SHARED_CONSTANTS.Z_INDICES };

        class ChatGPTGeneralAdapter extends BaseGeneralAdapter {
            isDeepResearch() { return window.location.pathname.includes('/search'); }
            isExcludedPage() { return this.isDeepResearch() ? false : CONSTANTS.URL_PATTERNS.EXCLUDED.some(p => p.test(window.location.pathname)); }
            isChatPage() { return window.location.pathname.includes('/c/'); }
            getMessagesRoot() { return document.querySelector('main') || document.body; }
            getMessageRole(el) { return el?.getAttribute('data-message-author-role') || el?.getAttribute('data-turn'); }
            getMessageId(el) { return el?.getAttribute('data-message-id'); }
            findMessageElement(content) { return content.closest('div[data-message-author-role]'); }
            initializeSentinel(cb) {
                const sel = `${CONSTANTS.SELECTORS.USER_MESSAGE}, ${CONSTANTS.SELECTORS.ASSISTANT_MESSAGE}`;
                sentinel.on(sel, cb);
                return () => sentinel.off(sel, cb);
            }
        }

        class ChatGPTStandingImageAdapter extends BaseStandingImageAdapter {
            updateVisibility(instance) {
                const isSearch = PlatformAdapters.General.isDeepResearch();
                const cls = instance.style.classes;
                [cls.userImageId, cls.assistantImageId].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.style.opacity = isSearch ? '0' : '1';
                });
            }
        }

        const PlatformAdapters = {
            General: new ChatGPTGeneralAdapter(),
            StyleManager: new BaseStyleManagerAdapter(), // Simplified for brevity
            StandingImage: new ChatGPTStandingImageAdapter(),
            // ... (rest of adapters inherit from base)
        };

        return { CONSTANTS, SITE_STYLES, PlatformAdapters };
    }

    // =================================================================================
    // SECTION: Final Main Controller Initialization
    // =================================================================================

    class AppController extends BaseManager {
        async _onInit() {
            // ... (config load logic)
            
            // Global ESC handler
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
                    this.uiManager?.modalCoordinator?.jsonModal?.close();
                    this.uiManager?.modalCoordinator?.themeModal?.close();
                    this.fixedNavManager?.hideJumpList();
                    this.uiManager?.widgetController?.settingsPanel?.hide();
                }
            });

            // Request Glow Flair on startup
            StyleManager.request(StyleDefinitions.getGlowFlair);
            
            // ... (rest of existing manager init)
        }
    }

    // Initialize logic
    const sentinel = new Sentinel(OWNERID);
    const defs = PLATFORM === 'ChatGPT' ? defineChatGPTValues() : defineGeminiValues();
    const { CONSTANTS, SITE_STYLES, PlatformAdapters } = defs;
    
    const lifecycleManager = new LifecycleManager();
    lifecycleManager.init();

})();
