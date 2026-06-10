/**
 * navbar.js — ExpertFlow Global Navbar Component
 * Include once in every page: <script src="navbar.js"></script>
 * Provides: navTo, toggleDark, state-dropdown, agent profile panel, live timer.
 * Each page keeps its own <nav> HTML; this file injects the shared panels + CSS.
 */
(function () {
  'use strict';

  /* ─── CSS ─────────────────────────────────────────────────────────────── */
  var CSS = [
    /* NOTIFICATION PANEL */
    '.notif-panel{position:fixed;width:360px;max-width:calc(100vw - 16px);background:var(--color-bg);border:1px solid var(--color-border);border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.14);z-index:600;display:none;flex-direction:column;overflow:hidden;max-height:480px;}',
    '.notif-panel.open{display:flex;animation:ddSlide .13s ease;}',
    '.notif-hdr{display:flex;align-items:center;justify-content:space-between;padding:14px 16px 10px;border-bottom:1px solid var(--color-border);flex-shrink:0;}',
    '.notif-hdr-title{font-size:14px;font-weight:600;color:var(--color-text);display:flex;align-items:center;gap:8px;}',
    '.notif-count-badge{background:var(--color-primary);color:#fff;font-size:10px;font-weight:700;border-radius:9999px;padding:1px 6px;min-width:18px;text-align:center;}',
    '.notif-mark-all{font-size:12px;color:var(--color-primary);background:none;border:none;cursor:pointer;padding:0;font-weight:500;}',
    '.notif-mark-all:hover{text-decoration:underline;}',
    '.notif-list{overflow-y:auto;flex:1;}',
    '.notif-item{display:flex;align-items:flex-start;gap:10px;padding:12px 16px;border-bottom:1px solid var(--color-border);cursor:pointer;transition:background .1s;}',
    '.notif-item:last-child{border-bottom:none;}',
    '.notif-item:hover{background:var(--color-canvas);}',
    '.notif-item.unread{background:var(--color-primary-lt);}',
    '.notif-item.unread:hover{background:#dce9ff;}',
    '.notif-ico{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
    '.notif-ico.info{background:#eff6ff;color:#3b82f6;}',
    '.notif-ico.warn{background:#fff7ed;color:#f59e0b;}',
    '.notif-ico.success{background:#f0fdf4;color:#22c55e;}',
    '.notif-ico.error{background:#fef2f2;color:#ef4444;}',
    '.notif-body{flex:1;min-width:0;}',
    '.notif-title{font-size:13px;font-weight:600;color:var(--color-text);margin-bottom:2px;}',
    '.notif-desc{font-size:12px;color:var(--color-muted);line-height:1.4;}',
    '.notif-time{font-size:11px;color:var(--color-muted);margin-top:4px;}',
    '.notif-unread-dot{width:7px;height:7px;border-radius:50%;background:var(--color-primary);flex-shrink:0;margin-top:6px;}',
    '.notif-footer{padding:10px 16px;border-top:1px solid var(--color-border);text-align:center;flex-shrink:0;}',
    '.notif-footer button{font-size:12px;color:var(--color-primary);background:none;border:none;cursor:pointer;font-weight:500;}',
    '.notif-footer button:hover{text-decoration:underline;}',
    /* STATE DROPDOWN */
    '.state-dd{position:fixed;min-width:236px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.14);z-index:600;padding:6px 0;display:none;}',
    '.state-dd.open{display:block;animation:ddSlide .13s ease;}',
    '@keyframes ddSlide{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}',
    '.sdd-item{display:flex;align-items:center;gap:10px;padding:10px 16px;cursor:pointer;font-size:13px;color:var(--color-text);transition:background .1s;}',
    '.sdd-item:hover{background:var(--color-canvas);}',
    '.sdd-item.sdd-logout{color:var(--color-error);}',
    '.sdd-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}',
    '.sdd-tick{margin-left:auto;color:var(--color-success);display:flex;align-items:center;}',
    '.sdd-sep{height:1px;background:var(--color-border);margin:6px 0;}',
    '.sdd-section{padding:6px 16px 3px;font-size:10px;font-weight:700;color:var(--color-muted);text-transform:uppercase;letter-spacing:.6px;}',
    '.sdd-tog-row{display:flex;align-items:center;justify-content:space-between;padding:8px 16px;}',
    '.sdd-tog-label{font-size:13px;color:var(--color-text);}',
    '.sdd-tog-label em{font-style:normal;font-size:11px;margin-left:4px;}',
    '.sdd-toggle{width:38px;height:22px;border-radius:11px;background:#ccc;position:relative;transition:background .2s;cursor:pointer;flex-shrink:0;}',
    '.sdd-toggle.on{background:var(--color-primary);}',
    '.sdd-toggle::after{content:"";position:absolute;width:16px;height:16px;border-radius:50%;background:#fff;top:3px;left:3px;transition:left .2s;}',
    '.sdd-toggle.on::after{left:19px;}',
    /* PROFILE PANEL */
    '.profile-panel{position:fixed;width:280px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.14);z-index:600;overflow:hidden;display:none;}',
    '.profile-panel.open{display:block;animation:ddSlide .13s ease;}',
    '.pp-top{background:var(--color-primary-lt);padding:14px 16px;display:flex;align-items:center;gap:12px;}',
    '.pp-av-lg{width:52px;height:52px;border-radius:50%;background:var(--color-bg);color:var(--color-primary);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;flex-shrink:0;}',
    '.pp-name{font-size:15px;font-weight:600;color:var(--color-text);}',
    '.pp-status{font-size:12px;color:var(--color-success);display:flex;align-items:center;gap:5px;margin-top:3px;}',
    '.pp-menu{padding:4px 0;}',
    '.pp-item{display:flex;align-items:center;justify-content:space-between;padding:11px 16px;cursor:pointer;transition:background .1s;}',
    '.pp-item:hover{background:var(--color-canvas);}',
    '.pp-item-l{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--color-text);}',
    '.pp-item-r{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--color-muted);}',
    '.pp-toggle{width:38px;height:22px;border-radius:11px;background:#ccc;position:relative;transition:background .2s;cursor:pointer;flex-shrink:0;}',
    '.pp-toggle.on{background:var(--color-primary);}',
    '.pp-toggle::after{content:"";position:absolute;width:16px;height:16px;border-radius:50%;background:#fff;top:3px;left:3px;transition:left .2s;}',
    '.pp-toggle.on::after{left:19px;}',
    /* QUICK LINKS PANEL */
    '.ql-panel{position:fixed;width:380px;max-width:calc(100vw - 16px);background:var(--color-bg);border:1px solid var(--color-border);border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.14);z-index:600;display:none;flex-direction:column;overflow:hidden;max-height:520px;}',
    '.ql-panel.open{display:flex;animation:ddSlide .13s ease;}',
    '.ql-hdr{display:flex;align-items:center;gap:10px;padding:14px 16px 12px;border-bottom:1px solid var(--color-border);flex-shrink:0;}',
    '.ql-hdr-title{flex:1;font-size:15px;font-weight:700;color:var(--color-text);}',
    '.ql-close-btn{background:none;border:none;cursor:pointer;padding:4px;color:var(--color-muted);display:flex;align-items:center;border-radius:6px;transition:background .1s;}',
    '.ql-close-btn:hover{background:var(--color-canvas);color:var(--color-text);}',
    '.ql-search-wrap{padding:10px 14px;border-bottom:1px solid var(--color-border);flex-shrink:0;}',
    '.ql-search-inp{width:100%;box-sizing:border-box;border:1px solid var(--color-border);border-radius:8px;padding:8px 12px;font-size:13px;color:var(--color-text);background:var(--color-canvas);outline:none;}',
    '.ql-search-inp:focus{border-color:var(--color-primary);}',
    '.ql-search-inp::placeholder{color:var(--color-muted);}',
    '.ql-list{overflow-y:auto;flex:1;}',
    '.ql-section-hdr{display:flex;align-items:center;gap:6px;padding:10px 16px 4px;font-size:11px;font-weight:700;color:var(--color-muted);text-transform:uppercase;letter-spacing:.6px;}',
    '.ql-item{display:flex;align-items:center;padding:11px 16px;cursor:pointer;transition:background .1s;gap:8px;border-bottom:1px solid var(--color-border);}',
    '.ql-item:last-child{border-bottom:none;}',
    '.ql-item:hover{background:var(--color-canvas);}',
    '.ql-item-label{flex:1;font-size:13px;color:var(--color-text);display:flex;align-items:center;gap:6px;}',
    '.ql-item-label.pinned{font-weight:600;}',
    '.ql-ext-ico{color:var(--color-muted);display:flex;align-items:center;flex-shrink:0;}',
    '.ql-pin-btn{background:none;border:none;cursor:pointer;padding:4px;color:var(--color-muted);display:flex;align-items:center;border-radius:4px;transition:color .15s;flex-shrink:0;}',
    '.ql-pin-btn:hover{color:var(--color-primary);}',
    '.ql-pin-btn.pinned{color:var(--color-primary);}',
    '.ql-empty{padding:24px 16px;text-align:center;font-size:13px;color:var(--color-muted);}',
    /* HAM MENU */
    '.ham-panel{position:fixed;width:300px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:10px;box-shadow:0 8px 32px rgba(0,0,0,.16);z-index:600;display:none;flex-direction:column;overflow:hidden;padding:6px 0;}',
    '.ham-panel.open{display:flex;animation:ddSlide .13s ease;}',
    '.ham-item{display:flex;align-items:center;justify-content:space-between;padding:13px 20px;cursor:pointer;font-size:15px;color:var(--color-text);transition:background .1s;gap:8px;border:none;background:none;width:100%;text-align:left;font-family:inherit;}',
    '.ham-item:hover{background:var(--color-canvas);}',
    '.ham-item.active{background:var(--color-primary-lt);font-weight:700;}',
    '.ham-item.active:hover{background:var(--color-primary-lt);}',
    '.ham-arrow{color:var(--color-muted);display:flex;align-items:center;flex-shrink:0;}',
    '.ham-sub{position:fixed;width:270px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:10px;box-shadow:0 8px 32px rgba(0,0,0,.16);z-index:601;display:none;flex-direction:column;padding:6px 0;}',
    '.ham-sub.open{display:flex;}',
    '.ham-sub-item{display:block;padding:13px 24px;cursor:pointer;font-size:15px;color:var(--color-muted);transition:background .1s;border:none;background:none;width:100%;text-align:left;font-family:inherit;}',
    '.ham-sub-item:hover{background:var(--color-canvas);color:var(--color-text);}',
    /* OUTBOUND MODAL */
    '.outbound-modal{position:fixed;top:0;right:0;width:396px;height:100vh;background:var(--color-bg);border-left:1px solid var(--color-border);z-index:400;transform:translateX(100%);transition:transform 0.3s ease;box-shadow:-4px 0 20px rgba(0,0,0,.12);display:flex;flex-direction:column;}',
    '.outbound-modal.open{transform:translateX(0);}',
    '.outbound-header{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid var(--color-border);flex-shrink:0;}',
    '.outbound-header h3{font-size:16px;font-weight:600;color:var(--color-text);margin:0;}',
    '.ob-close-btn{background:none;border:none;cursor:pointer;color:var(--color-muted);width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:6px;}',
    '.ob-close-btn:hover{background:var(--color-canvas);}',
    '.ob-search-row{padding:10px 12px 6px;flex-shrink:0;display:flex;align-items:center;gap:10px;}',
    '.ob-search-wrap{flex:1;display:flex;align-items:center;border:1px solid var(--color-border);border-radius:8px;background:var(--color-canvas);overflow:hidden;height:38px;}',
    '.ob-search-ic{padding:0 8px;flex-shrink:0;display:flex;align-items:center;color:var(--color-muted);}',
    '.ob-search-inp{flex:1;border:none;background:transparent;padding:0 4px;font-size:13px;color:var(--color-text);outline:none;min-width:0;height:100%;}',
    '.ob-search-inp::placeholder{color:var(--color-muted);}',
    '.ob-dialpad-tog{border:1px solid var(--color-border);background:var(--color-canvas);border-radius:8px;cursor:pointer;padding:0 12px;color:var(--color-muted);display:flex;align-items:center;justify-content:center;height:38px;min-width:44px;transition:all .15s;flex-shrink:0;}',
    '.ob-dialpad-tog:hover,.ob-dialpad-tog.active{color:var(--color-primary);background:var(--color-primary-lt);border-color:var(--color-primary);}',
    '.ob-anon-bar{display:none;margin:0 12px 6px;padding:10px 12px;background:var(--color-canvas);border:1px solid var(--color-border);border-radius:8px;flex-direction:column;gap:8px;}',
    '.ob-anon-bar.show{display:flex;}',
    '.ob-anon-top{display:flex;align-items:center;justify-content:space-between;}',
    '.ob-anon-info{display:flex;flex-direction:column;gap:1px;}',
    '.ob-anon-lbl{font-size:10px;font-weight:700;color:var(--color-muted);text-transform:uppercase;letter-spacing:.5px;}',
    '.ob-anon-num{font-size:14px;font-weight:600;color:var(--color-text);}',
    '.ob-anon-add{font-size:11px;color:var(--color-primary);background:none;border:none;cursor:pointer;padding:0;display:flex;align-items:center;gap:3px;font-weight:500;}',
    '.ob-anon-add:hover{text-decoration:underline;}',
    '.ob-anon-btns{display:flex;gap:6px;}',
    '.ob-anon-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;padding:12px 6px;background:var(--color-bg);border:1px solid var(--color-border);border-radius:8px;cursor:pointer;font-size:11px;font-weight:500;transition:all .15s;}',
    '.ob-anon-btn.call{color:#26c98c;}.ob-anon-btn.call:hover{background:#f0fdf4;border-color:#26c98c;}',
    '.ob-anon-btn.sms{color:var(--color-primary);}.ob-anon-btn.sms:hover{background:var(--color-primary-lt);border-color:var(--color-primary);}',
    '.ob-anon-btn.wa{color:#25D366;}.ob-anon-btn.wa:hover{background:#f0fdf7;border-color:#25D366;}',
    '.ob-anon-btn.email{color:#f59e0b;}.ob-anon-btn.email:hover{background:#fffbeb;border-color:#f59e0b;}',
    '.ob-dialpad{display:none;flex-direction:column;gap:6px;padding:8px 12px 10px;border-bottom:1px solid var(--color-border);flex-shrink:0;}',
    '.ob-dialpad.show{display:flex;}',
    '.ob-dialpad-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;}',
    '.dial-btn{padding:14px 8px;background:var(--color-canvas);border:1px solid var(--color-border);border-radius:8px;cursor:pointer;font-size:16px;font-weight:600;color:var(--color-text);transition:all .15s;}',
    '.dial-btn:hover{background:var(--color-primary);color:#fff;border-color:var(--color-primary);}',
    '.ob-dialpad-foot{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:6px 0 2px;}',
    '.ob-call-btn{width:56px;height:56px;border-radius:50%;background:var(--color-success);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s;flex-shrink:0;}',
    '.ob-call-btn:hover{background:#1fa876;}',
    '.ob-del-btn{width:34px;height:34px;border-radius:8px;background:var(--color-canvas);border:1px solid var(--color-border);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--color-text-medium);transition:all .15s;margin-left:auto;}',
    '.ob-del-btn:hover{background:var(--color-error);color:#fff;border-color:var(--color-error);}',
    '.ob-contacts{flex:1;overflow-y:auto;}',
    '.ob-group-hdr{padding:8px 12px 4px;font-size:10px;font-weight:700;color:var(--color-muted);text-transform:uppercase;letter-spacing:.5px;background:var(--color-canvas);position:sticky;top:0;}',
    '.ob-contact{display:flex;align-items:center;padding:9px 12px;cursor:pointer;transition:background .12s;gap:10px;border-bottom:1px solid var(--color-canvas);}',
    '.ob-contact:hover{background:var(--color-canvas);}',
    '.ob-av{width:32px;height:32px;border-radius:50%;background:var(--color-primary-lt);color:var(--color-primary);font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
    '.ob-info{flex:1;min-width:0;}',
    '.ob-name{font-size:13px;font-weight:500;color:var(--color-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.ob-sub{font-size:11px;color:var(--color-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.ob-actions{display:none;gap:2px;flex-shrink:0;}',
    '.ob-contact:hover .ob-actions{display:flex;}',
    '.ob-act-btn{background:none;border:none;cursor:pointer;padding:4px;border-radius:4px;color:var(--color-muted);}',
    '.ob-act-btn:hover{color:var(--color-primary);background:var(--color-primary-lt);}',
    '.ob-act-btn.wa svg{fill:currentColor;width:16px;height:16px;}',
    '.ob-sms-gap{display:none;height:50px;flex-shrink:0;}',
    '.ob-sms-gap.show{display:block;}',
    '.ob-sms-composer{display:none;flex:0 0 40%;flex-direction:column;border-top:2px solid var(--color-border);min-height:0;}',
    '.ob-sms-composer.open{display:flex;}',
    '.ob-email-composer,.ob-wa-composer{display:none;flex:0 0 40%;flex-direction:column;border-top:2px solid var(--color-border);min-height:0;}',
    '.ob-email-composer.open,.ob-wa-composer.open{display:flex;}',
    '.sms-cmp-body{padding:12px 14px 8px;display:flex;flex-direction:column;gap:8px;flex:1;min-height:0;}',
    '.sms-to-lbl{font-size:13px;font-weight:600;color:var(--color-text);}',
    '.sms-to-inp{padding:10px 12px;border:1px solid var(--color-border);border-radius:10px;font-size:13px;background:var(--color-canvas);color:var(--color-text);outline:none;font-family:inherit;width:100%;box-sizing:border-box;flex-shrink:0;}',
    '.sms-to-inp:focus{border-color:var(--color-primary);}',
    '.sms-msg-inp{padding:12px;border:1px solid var(--color-border);border-radius:10px;font-size:13px;resize:none;background:var(--color-canvas);color:var(--color-text);font-family:inherit;outline:none;flex:1;min-height:0;width:100%;box-sizing:border-box;}',
    '.sms-msg-inp:focus{border-color:var(--color-primary);}',
    '.sms-counter{font-size:12px;color:var(--color-muted);text-align:right;flex-shrink:0;}',
    '.sms-cmp-footer{display:flex;gap:10px;padding:8px 14px 14px;flex-shrink:0;}',
    '.sms-cancel-btn{flex:1;padding:11px 0;background:var(--color-bg);color:var(--color-text);border:1px solid var(--color-border);border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;}',
    '.sms-cancel-btn:hover{background:var(--color-canvas);}',
    '.sms-send-btn{flex:1;padding:11px 0;background:#1a50a3;color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;}',
    '.sms-send-btn:hover{opacity:.9;}',
    '.email-send-btn{flex:1;padding:11px 0;background:#1a50a3;color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;}',
    '.email-send-btn:hover{opacity:.9;}',
    '.wa-send-btn{flex:1;padding:11px 0;background:#25d366;color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;}',
    '.wa-send-btn:hover{opacity:.9;}',
    '.call-ctrl{position:fixed;bottom:24px;right:24px;width:268px;background:#111827;border-radius:20px;padding:20px 16px 16px;z-index:700;display:none;flex-direction:column;gap:14px;box-shadow:0 16px 48px rgba(0,0,0,.55);border:1px solid #1e2a42;}',
    '.call-ctrl.active{display:flex;}',
    '.cc-top{display:flex;flex-direction:column;align-items:center;gap:6px;}',
    '.cc-av{width:54px;height:54px;border-radius:50%;background:#1c2540;color:#7b9cde;font-size:17px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #2a3a60;}',
    '.cc-name{font-size:14px;font-weight:600;color:#dce6f5;letter-spacing:.2px;}',
    '.cc-status{font-size:11px;color:#5a78b0;letter-spacing:.4px;text-transform:uppercase;}',
    '.cc-timer{font-size:28px;font-weight:700;color:#fff;text-align:center;letter-spacing:4px;font-variant-numeric:tabular-nums;}',
    '.cc-btns{display:flex;justify-content:center;gap:10px;}',
    '.cc-btn{display:flex;flex-direction:column;align-items:center;gap:5px;background:none;border:none;cursor:pointer;padding:0;}',
    '.cc-ic{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#1c2540;border:1px solid #2a3050;transition:background .15s,border-color .15s;color:#c5d3eb;}',
    '.cc-lbl{font-size:10px;color:#4a6090;letter-spacing:.3px;}',
    '.cc-btn:hover .cc-ic{background:#243060;}',
    '.cc-btn.cc-on .cc-ic{background:#1d3370;border-color:#3d5fbb;color:#7baaf0;}',
    '.cc-end .cc-ic{background:#b91c1c;border-color:#b91c1c;color:#fff;}',
    '.cc-end:hover .cc-ic{background:#dc2626;}',
    '.ob-footer{display:flex;gap:8px;padding:10px 12px;border-top:1px solid var(--color-border);flex-shrink:0;}',
    '.ob-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:5px;padding:10px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;transition:all .15s;}',
    '.ob-btn.primary{background:var(--color-primary);color:#fff;border:none;}',
    '.ob-btn.primary:hover{opacity:.9;}',
    '.ob-btn.secondary{background:var(--color-canvas);color:var(--color-text);border:1px solid var(--color-border);}',
    '.ob-btn.secondary:hover{background:#e8edf3;}',
    /* Toast */
    '.ef-toast{position:fixed;bottom:24px;right:24px;z-index:99999;display:flex;align-items:center;gap:10px;padding:12px 16px;background:#fff;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.15);border-left:4px solid #26c98c;font-size:13px;color:#212121;pointer-events:none;transform:translateY(16px);opacity:0;transition:opacity .25s ease,transform .25s ease;}',
    '.ef-toast.show{transform:translateY(0);opacity:1;}',
    '.ef-toast-ico{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
    /* Toast dark mode */
    '#app.dark .ef-toast,html.ef-dark .ef-toast{background:#1e2022;color:#e5e7eb;box-shadow:0 4px 20px rgba(0,0,0,0.45);}'
  ].join('\n');

  /* ─── HTML ────────────────────────────────────────────────────────────── */
  var DROPDOWN_HTML = '<div class="state-dd" id="stateDropdown">' +
    '<div class="sdd-section">Agent State</div>' +
    '<div class="sdd-item" id="sdd-ready" onclick="selectState(\'Ready\',\'#26c98c\')">' +
      '<span class="sdd-dot" style="background:#26c98c"></span><span>Ready</span>' +
      '<span class="sdd-tick" id="sdd-tick-ready"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span>' +
    '</div>' +
    '<div class="sdd-item" id="sdd-lunch" onclick="selectState(\'Lunch Break\',\'#f59e0b\')">' +
      '<span class="sdd-dot" style="background:#f59e0b"></span><span>Lunch Break</span>' +
      '<span class="sdd-tick" id="sdd-tick-lunch" style="display:none"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span>' +
    '</div>' +
    '<div class="sdd-item" id="sdd-ooo" onclick="selectState(\'Out of Office\',\'#929292\')">' +
      '<span class="sdd-dot" style="background:#929292"></span><span>Out of Office</span>' +
      '<span class="sdd-tick" id="sdd-tick-ooo" style="display:none"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span>' +
    '</div>' +
    '<div class="sdd-sep"></div>' +
    '<div class="sdd-section">Channels</div>' +
    '<div class="sdd-tog-row">' +
      '<span class="sdd-tog-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:-2px;margin-right:6px"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>Voice <em id="ch-voice-lbl">On</em></span>' +
      '<div class="sdd-toggle on" id="ch-voice-toggle" onclick="toggleChannel(\'voice\')"></div>' +
    '</div>' +
    '<div class="sdd-tog-row">' +
      '<span class="sdd-tog-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:-2px;margin-right:6px"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Chat <em id="ch-chat-lbl">On</em></span>' +
      '<div class="sdd-toggle on" id="ch-chat-toggle" onclick="toggleChannel(\'chat\')"></div>' +
    '</div>' +
    '<div class="sdd-tog-row">' +
      '<span class="sdd-tog-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="vertical-align:-2px;margin-right:6px"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>Email <em id="ch-email-lbl">On</em></span>' +
      '<div class="sdd-toggle on" id="ch-email-toggle" onclick="toggleChannel(\'email\')"></div>' +
    '</div>' +
    '<div class="sdd-sep"></div>' +
    '<div class="sdd-item sdd-logout" onclick="doSignOut()">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>' +
      '<span>Logout</span>' +
    '</div>' +
  '</div>';

  var PROFILE_HTML = '<div class="profile-panel" id="profilePanel">' +
    '<div class="pp-top">' +
      '<div class="pp-av-lg">AJ</div>' +
      '<div><div class="pp-name">Agent Jordan</div>' +
      '<div class="pp-status"><span style="width:8px;height:8px;border-radius:50%;background:var(--color-success);display:inline-block"></span>Ready</div></div>' +
    '</div>' +
    '<div class="pp-menu">' +
      _ppItem('<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>', 'My Profile', true) +
      _ppItem('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>', 'My Statistics', true) +
      _ppItem('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/>', 'Supervisor View', true) +
      _ppItem('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>', 'Activity Log', true) +
      _ppItem('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>', 'Settings', true) +
      '<div class="pp-item">' +
        '<div class="pp-item-l"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>Dark Mode</div>' +
        '<div class="pp-toggle" id="ppDarkToggle" onclick="toggleDark();updatePpDarkToggle()"></div>' +
      '</div>' +
      '<div class="pp-item" style="color:var(--color-error)" onclick="doSignOut()">' +
        '<div class="pp-item-l" style="color:var(--color-error)">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>' +
          'Sign Out' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';

  var NOTIF_HTML = '<div class="notif-panel" id="notifPanel">' +
    '<div class="notif-hdr">' +
      '<div class="notif-hdr-title">Notifications <span class="notif-count-badge" id="notifBadgeCount">3</span></div>' +
      '<button class="notif-mark-all" onclick="markAllNotifRead()">Mark all as read</button>' +
    '</div>' +
    '<div class="notif-list" id="notifList">' +
      '<div class="notif-item unread" onclick="readNotif(this)">' +
        '<div class="notif-ico warn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>' +
        '<div class="notif-body">' +
          '<div class="notif-title">SLA Breach Warning</div>' +
          '<div class="notif-desc">Conversation with John Tylor is approaching SLA limit (2 min left)</div>' +
          '<div class="notif-time">2 minutes ago</div>' +
        '</div>' +
        '<div class="notif-unread-dot"></div>' +
      '</div>' +
      '<div class="notif-item unread" onclick="readNotif(this)">' +
        '<div class="notif-ico info"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>' +
        '<div class="notif-body">' +
          '<div class="notif-title">New Conversation Assigned</div>' +
          '<div class="notif-desc">Sarah Mitchell has been assigned to your queue via WhatsApp</div>' +
          '<div class="notif-time">8 minutes ago</div>' +
        '</div>' +
        '<div class="notif-unread-dot"></div>' +
      '</div>' +
      '<div class="notif-item unread" onclick="readNotif(this)">' +
        '<div class="notif-ico success"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div>' +
        '<div class="notif-body">' +
          '<div class="notif-title">Transfer Accepted</div>' +
          '<div class="notif-desc">Agent Kim accepted the transfer of conversation #4821</div>' +
          '<div class="notif-time">15 minutes ago</div>' +
        '</div>' +
        '<div class="notif-unread-dot"></div>' +
      '</div>' +
      '<div class="notif-item" onclick="readNotif(this)">' +
        '<div class="notif-ico error"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>' +
        '<div class="notif-body">' +
          '<div class="notif-title">Call Failed</div>' +
          '<div class="notif-desc">Outbound call to +1 (743) 500-3536 could not be connected</div>' +
          '<div class="notif-time">1 hour ago</div>' +
        '</div>' +
      '</div>' +
      '<div class="notif-item" onclick="readNotif(this)">' +
        '<div class="notif-ico info"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>' +
        '<div class="notif-body">' +
          '<div class="notif-title">Supervisor Message</div>' +
          '<div class="notif-desc">Team lead: Please update your availability status before 5pm</div>' +
          '<div class="notif-time">2 hours ago</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="notif-footer"><button onclick="closeNotifDD()">View all notifications</button></div>' +
  '</div>';

  var HAM_HTML =
    '<div class="ham-panel" id="hamPanel">' +
      '<button class="ham-item has-sub" id="hamDashItem" onmouseenter="hamShowSub(this)" onmouseleave="hamMaybeHideSub(event)">' +
        'Dashboard' +
        '<span class="ham-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></span>' +
      '</button>' +
      '<button class="ham-item" onclick="closeHamMenu()">Subscribed Lists</button>' +
      '<button class="ham-item active" onclick="closeHamMenu()">Customer Interactions</button>' +
      '<button class="ham-item" onclick="navTo(\'list-view-template.html\')">Customers</button>' +
      '<button class="ham-item" onclick="closeHamMenu()">Customer Labels</button>' +
    '</div>' +
    '<div class="ham-sub" id="hamSub" onmouseenter="hamCancelHide()" onmouseleave="hamMaybeHideSub(event)">' +
      '<button class="ham-sub-item" onclick="closeHamMenu()">Summary Dashboard</button>' +
      '<button class="ham-sub-item" onclick="closeHamMenu()">Agent Performance Dashboard</button>' +
      '<button class="ham-sub-item" onclick="closeHamMenu()">Available Agents Detail</button>' +
      '<button class="ham-sub-item" onclick="closeHamMenu()">My Past Conversations</button>' +
    '</div>';

  var QL_LINKS = [
    {id:1,label:'Start New Interaction',url:'#',pinned:true,external:false},
    {id:2,label:'Compliance Check',url:'#',pinned:true,external:false},
    {id:3,label:'Outbound sales agents',url:'#',pinned:true,external:true},
    {id:4,label:'SaaS customer success',url:'#',pinned:true,external:false},
    {id:5,label:'CRM Portal',url:'#',pinned:false,external:false},
    {id:6,label:'Live Chat Console',url:'#',pinned:false,external:false},
    {id:7,label:'Email Templates',url:'#',pinned:false,external:false},
    {id:8,label:'Script Library',url:'#',pinned:false,external:false},
    {id:9,label:'Knowledge Base',url:'#',pinned:false,external:false}
  ];

  var QL_HTML = '<div class="ql-panel" id="qlPanel">' +
    '<div class="ql-hdr">' +
      '<div class="ql-hdr-title">Quick Links</div>' +
      '<button class="ql-close-btn" onclick="closeQuickLinks()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>' +
    '</div>' +
    '<div class="ql-search-wrap"><input class="ql-search-inp" id="qlSearchInp" type="text" placeholder="Search" oninput="qlSearch(this.value)"></div>' +
    '<div class="ql-list" id="qlList"></div>' +
  '</div>';

  function _ppItem(svgPath, label, hasArrow) {
    return '<div class="pp-item" onclick="closePP()">' +
      '<div class="pp-item-l"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">' + svgPath + '</svg>' + label + '</div>' +
      (hasArrow ? '<div class="pp-item-r"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div>' : '') +
    '</div>';
  }

  /* ─── SHARED STATE ────────────────────────────────────────────────────── */
  var sddOpen = false, ppOpen = false, notifOpen = false, qlOpen = false, hamOpen = false;
  var _hamSubTimer = null;
  var stateKeys = { Ready: 'ready', 'Lunch Break': 'lunch', 'Out of Office': 'ooo' };

  /* ─── FUNCTIONS (on window so inline onclick handlers can reach them) ── */
  window.setNavActive = function(btn) {
    document.querySelectorAll('.nav-btn').forEach(function(b){ b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
  };

  window.navTo = function (url) {
    var a = document.getElementById('app');
    if (a) { a.style.transition = 'opacity .12s'; a.style.opacity = '0'; }
    setTimeout(function () { location.href = url; }, 120);
  };

  window.toggleDark = function () {
    var a = document.getElementById('app');
    if (!a) return;
    a.classList.toggle('dark');
    var isDark = a.classList.contains('dark');
    document.documentElement.classList.toggle('ef-dark', isDark);
    document.body.style.background = isDark ? '#151515' : '';
    try { sessionStorage.setItem('ef-dark', isDark ? '1' : '0'); } catch (e) {}
  };

  window.toggleNotifDD = function (e) {
    e.stopPropagation();
    if (sddOpen) window.closeSDD();
    if (ppOpen) window.closePP();
    notifOpen = !notifOpen;
    var btn = e.currentTarget;
    btn.classList.toggle('active', notifOpen);
    var panel = document.getElementById('notifPanel');
    if (notifOpen) {
      var r = btn.getBoundingClientRect();
      panel.style.right = (window.innerWidth - r.right) + 'px';
      panel.style.top = (r.bottom + 6) + 'px';
    }
    panel.classList.toggle('open', notifOpen);
  };

  window.closeNotifDD = function () {
    notifOpen = false;
    var panel = document.getElementById('notifPanel');
    if (panel) panel.classList.remove('open');
    var btn = document.querySelector('[aria-label="Notifications"]');
    if (btn) btn.classList.remove('active');
  };

  window.readNotif = function (item) {
    if (!item.classList.contains('unread')) return;
    item.classList.remove('unread');
    var dot = item.querySelector('.notif-unread-dot');
    if (dot) dot.remove();
    _updateNotifCount();
  };

  window.markAllNotifRead = function () {
    document.querySelectorAll('#notifList .notif-item.unread').forEach(function (item) {
      item.classList.remove('unread');
      var dot = item.querySelector('.notif-unread-dot');
      if (dot) dot.remove();
    });
    _updateNotifCount();
  };

  function _updateNotifCount() {
    var count = document.querySelectorAll('#notifList .notif-item.unread').length;
    var badge = document.getElementById('notifBadgeCount');
    if (badge) { badge.textContent = count; badge.style.display = count ? '' : 'none'; }
    /* also update the nav-badge on the bell icon */
    var navBadge = document.querySelector('[aria-label="Notifications"] .nav-badge');
    if (navBadge) { navBadge.textContent = count; navBadge.style.display = count ? '' : 'none'; }
  }

  /* ─── HAM MENU ───────────────────────────────────────────────────────── */
  window.toggleHamMenu = function(e) {
    e.stopPropagation();
    if (sddOpen) window.closeSDD();
    if (ppOpen) window.closePP();
    if (notifOpen) window.closeNotifDD();
    if (qlOpen) window.closeQuickLinks();
    hamOpen = !hamOpen;
    var panel = document.getElementById('hamPanel');
    if (hamOpen) {
      var btn = e.currentTarget;
      var r = btn.getBoundingClientRect();
      panel.style.left = r.left + 'px';
      panel.style.top = (r.bottom + 6) + 'px';
      window.hamHideSub();
    }
    panel.classList.toggle('open', hamOpen);
  };

  window.closeHamMenu = function() {
    hamOpen = false;
    var panel = document.getElementById('hamPanel');
    if (panel) panel.classList.remove('open');
    window.hamHideSub();
  };

  window.hamShowSub = function(item) {
    clearTimeout(_hamSubTimer);
    var sub = document.getElementById('hamSub');
    var panel = document.getElementById('hamPanel');
    if (!sub || !panel) return;
    var pr = panel.getBoundingClientRect();
    var ir = item.getBoundingClientRect();
    var subLeft = pr.right + 6;
    if (subLeft + 270 > window.innerWidth - 8) subLeft = pr.left - 276;
    sub.style.left = subLeft + 'px';
    sub.style.top = ir.top + 'px';
    sub.classList.add('open');
    sub.style.display = 'flex';
  };

  window.hamHideSub = function() {
    clearTimeout(_hamSubTimer);
    var sub = document.getElementById('hamSub');
    if (sub) { sub.classList.remove('open'); sub.style.display = ''; }
  };

  window.hamMaybeHideSub = function(e) {
    var sub = document.getElementById('hamSub');
    var toEl = e && e.relatedTarget;
    if (toEl && sub && (sub.contains(toEl) || toEl === sub)) return;
    _hamSubTimer = setTimeout(window.hamHideSub, 120);
  };

  window.hamCancelHide = function() {
    clearTimeout(_hamSubTimer);
  };

  /* ─── QUICK LINKS ────────────────────────────────────────────────────── */
  var _QL_PIN_ON  = '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>';
  var _QL_PIN_OFF = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>';
  var _QL_EXT     = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

  function _qlRender(q) {
    var list = document.getElementById('qlList');
    if (!list) return;
    var filter = (q || '').toLowerCase();
    var items = filter ? QL_LINKS.filter(function(l){ return l.label.toLowerCase().indexOf(filter) !== -1; }) : QL_LINKS;
    var pinned = items.filter(function(l){ return l.pinned; });
    var unpinned = items.filter(function(l){ return !l.pinned; });
    var html = '';
    if (pinned.length) {
      html += '<div class="ql-section-hdr">' + _QL_PIN_ON + '&nbsp;Pinned</div>';
      pinned.forEach(function(l, i) {
        var lastPinned = (i === pinned.length - 1) && unpinned.length > 0;
        html += '<div class="ql-item"' + (lastPinned ? ' style="border-bottom:none"' : '') + ' onclick="qlNavigate(' + l.id + ')">' +
          '<div class="ql-item-label pinned">' + l.label + (l.external ? '<span class="ql-ext-ico">' + _QL_EXT + '</span>' : '') + '</div>' +
          '<button class="ql-pin-btn pinned" onclick="event.stopPropagation();qlTogglePin(' + l.id + ')" data-tip="Unpin">' + _QL_PIN_ON + '</button>' +
        '</div>';
      });
    }
    if (pinned.length && unpinned.length) html += '<div style="height:1px;background:var(--color-border);margin:14px 0"></div>';
    unpinned.forEach(function(l) {
      html += '<div class="ql-item" onclick="qlNavigate(' + l.id + ')">' +
        '<div class="ql-item-label">' + l.label + (l.external ? '<span class="ql-ext-ico">' + _QL_EXT + '</span>' : '') + '</div>' +
        '<button class="ql-pin-btn" onclick="event.stopPropagation();qlTogglePin(' + l.id + ')" data-tip="Pin">' + _QL_PIN_OFF + '</button>' +
      '</div>';
    });
    if (!items.length) html = '<div class="ql-empty">No links found</div>';
    list.innerHTML = html;
  }

  window.toggleQuickLinks = function(e) {
    e.stopPropagation();
    if (sddOpen) window.closeSDD();
    if (ppOpen) window.closePP();
    if (notifOpen) window.closeNotifDD();
    qlOpen = !qlOpen;
    var btn = e.currentTarget;
    btn.classList.toggle('active', qlOpen);
    var panel = document.getElementById('qlPanel');
    if (qlOpen) {
      var r = btn.getBoundingClientRect();
      panel.style.right = (window.innerWidth - r.right) + 'px';
      panel.style.top = (r.bottom + 6) + 'px';
      var inp = document.getElementById('qlSearchInp');
      if (inp) inp.value = '';
      _qlRender('');
    }
    panel.classList.toggle('open', qlOpen);
  };

  window.closeQuickLinks = function() {
    qlOpen = false;
    var panel = document.getElementById('qlPanel');
    if (panel) panel.classList.remove('open');
    var btn = document.querySelector('[aria-label="Quick Links"]');
    if (btn) btn.classList.remove('active');
  };

  window.qlTogglePin = function(id) {
    var link = QL_LINKS.find(function(l){ return l.id === id; });
    if (link) link.pinned = !link.pinned;
    var inp = document.getElementById('qlSearchInp');
    _qlRender(inp ? inp.value : '');
  };

  window.qlSearch = function(q) { _qlRender(q); };

  window.qlNavigate = function(id) {
    var link = QL_LINKS.find(function(l){ return l.id === id; });
    if (!link) return;
    if (link.external) window.open(link.url, '_blank');
    else window.location.href = link.url;
    window.closeQuickLinks();
  };

  window.toggleStateDD = function (e) {
    e.stopPropagation();
    if (ppOpen) window.closePP();
    sddOpen = !sddOpen;
    var dd = document.getElementById('stateDropdown');
    if (sddOpen) {
      var pill = document.querySelector('.state-pill');
      var r = pill.getBoundingClientRect();
      dd.style.left = 'auto';
      dd.style.right = (window.innerWidth - r.right) + 'px';
      dd.style.top = (r.bottom + 6) + 'px';
    }
    dd.classList.toggle('open', sddOpen);
  };

  window.closeSDD = function () {
    sddOpen = false;
    var dd = document.getElementById('stateDropdown');
    if (dd) dd.classList.remove('open');
  };

  window.selectState = function (name, color) {
    var check = document.querySelector('.state-pill .state-check');
    if (check) { check.style.background = 'transparent'; check.style.setProperty('--sp-c', color); }
    var pillSpan = document.querySelector('.state-pill .state-name');
    if (pillSpan) pillSpan.textContent = name;
    Object.keys(stateKeys).forEach(function (k) {
      var el = document.getElementById('sdd-tick-' + stateKeys[k]);
      if (el) el.style.display = (k === name) ? '' : 'none';
    });
    window.closeSDD();
  };

  window.toggleChannel = function (ch) {
    var tog = document.getElementById('ch-' + ch + '-toggle');
    var lbl = document.getElementById('ch-' + ch + '-lbl');
    var on = tog.classList.toggle('on');
    if (lbl) lbl.textContent = on ? 'On' : 'Off';
  };

  window.togglePP = function (e) {
    e.stopPropagation();
    if (sddOpen) window.closeSDD();
    ppOpen = !ppOpen;
    var pp = document.getElementById('profilePanel');
    if (ppOpen) {
      var av = document.querySelector('.agent-av');
      var r = av.getBoundingClientRect();
      pp.style.right = (window.innerWidth - r.right) + 'px';
      pp.style.top = (r.bottom + 6) + 'px';
      window.updatePpDarkToggle();
    }
    pp.classList.toggle('open', ppOpen);
  };

  window.closePP = function () {
    ppOpen = false;
    var pp = document.getElementById('profilePanel');
    if (pp) pp.classList.remove('open');
  };

  window.updatePpDarkToggle = function () {
    var tog = document.getElementById('ppDarkToggle');
    if (tog) tog.classList.toggle('on', document.getElementById('app').classList.contains('dark'));
  };

  /* ─── OUTBOUND SVGs ─────────────────────────────────────────────────── */
  var _OB_CALL_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>';
  var _OB_SMS_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';
  var _OB_WA_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  var _OB_EMAIL_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>';
  var _OB_WA_SM = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  /* SVGs for call controller buttons */
  var _CC_MIC_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>';
  var _CC_MIC_OFF_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/></svg>';
  var _CC_PAUSE_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
  var _CC_PLAY_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  var _CC_KP_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2S7.1 1 6 1zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-2 2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6-12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6-12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>';
  var _CC_END_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/></svg>';

  /* ─── OUTBOUND HTML ──────────────────────────────────────────────────── */
  var OUTBOUND_HTML = '<div class="outbound-modal" id="outboundModal">' +
    '<div class="outbound-header"><h3>Outbound</h3>' +
    '<button class="ob-close-btn" data-tip="Close" onclick="closeOutbound()">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
    '</button></div>' +
    '<div class="ob-search-row">' +
      '<div class="ob-search-wrap">' +
        '<span class="ob-search-ic"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>' +
        '<input type="text" id="callSearch" class="ob-search-inp" placeholder="Search or enter number…" oninput="obCallSearch(this.value)">' +
      '</div>' +
      '<button class="ob-dialpad-tog" id="dialpadTogBtn" onclick="toggleDialpad()" data-tip="Dialpad">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="4" r="2"/><circle cx="12" cy="4" r="2"/><circle cx="18" cy="4" r="2"/><circle cx="6" cy="10" r="2"/><circle cx="12" cy="10" r="2"/><circle cx="18" cy="10" r="2"/><circle cx="6" cy="16" r="2"/><circle cx="12" cy="16" r="2"/><circle cx="18" cy="16" r="2"/><circle cx="12" cy="22" r="2"/></svg>' +
      '</button>' +
    '</div>' +
    '<div class="ob-anon-bar" id="anonBar">' +
      '<div class="ob-anon-top">' +
        '<div class="ob-anon-info"><span class="ob-anon-lbl">Unknown number</span><span class="ob-anon-num" id="anonNumDisplay"></span></div>' +
        '<button class="ob-anon-add" onclick="addContactFromDialpad()" title="Add to contacts">' +
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>' +
          'Add to contacts' +
        '</button>' +
      '</div>' +
      '<div class="ob-anon-btns">' +
        '<button class="ob-anon-btn call" onclick="anonInitiate(\'call\')" title="Call">' + _OB_CALL_SVG + 'Call</button>' +
        '<button class="ob-anon-btn sms" onclick="anonInitiate(\'sms\')" title="SMS">' + _OB_SMS_SVG + 'SMS</button>' +
        '<button class="ob-anon-btn wa" onclick="anonInitiate(\'wa\')" title="WhatsApp">' + _OB_WA_SVG + 'WhatsApp</button>' +
        '<button class="ob-anon-btn email" onclick="anonInitiate(\'email\')" title="Email">' + _OB_EMAIL_SVG + 'Email</button>' +
      '</div>' +
    '</div>' +
    '<div class="ob-dialpad" id="dialpadSection">' +
      '<div class="ob-dialpad-grid">' +
        '<button class="dial-btn" onclick="dialpadDigit(\'1\')">1</button>' +
        '<button class="dial-btn" onclick="dialpadDigit(\'2\')">2</button>' +
        '<button class="dial-btn" onclick="dialpadDigit(\'3\')">3</button>' +
        '<button class="dial-btn" onclick="dialpadDigit(\'4\')">4</button>' +
        '<button class="dial-btn" onclick="dialpadDigit(\'5\')">5</button>' +
        '<button class="dial-btn" onclick="dialpadDigit(\'6\')">6</button>' +
        '<button class="dial-btn" onclick="dialpadDigit(\'7\')">7</button>' +
        '<button class="dial-btn" onclick="dialpadDigit(\'8\')">8</button>' +
        '<button class="dial-btn" onclick="dialpadDigit(\'9\')">9</button>' +
        '<button class="dial-btn" onclick="dialpadDigit(\'*\')">*</button>' +
        '<button class="dial-btn" onclick="dialpadDigit(\'0\')">0</button>' +
        '<button class="dial-btn" onclick="dialpadDigit(\'#\')">#</button>' +
      '</div>' +
      '<div class="ob-dialpad-foot">' +
        '<div></div>' +
        '<button class="ob-call-btn" onclick="initiateCall()" aria-label="Call" title="Call">' +
          '<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>' +
        '</button>' +
        '<div style="display:flex;justify-content:flex-end">' +
          '<button class="ob-del-btn" onclick="dialpadBackspace()" aria-label="Delete digit" title="Delete">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="ob-contacts" id="callContactList"></div>' +
    '<div class="ob-sms-gap" id="obSmsGap"></div>' +
    '<div class="ob-sms-composer" id="obSmsComposer">' +
      '<div class="sms-cmp-body"><div class="sms-to-lbl">To:</div>' +
      '<input class="sms-to-inp" id="smsToInp" type="tel" placeholder="Phone number">' +
      '<textarea class="sms-msg-inp" id="smsMsgInp" placeholder="Type your SMS message…" oninput="smsCount()"></textarea>' +
      '<div class="sms-counter"><span id="smsCntSpan">0</span>/160</div></div>' +
      '<div class="sms-cmp-footer"><button class="sms-cancel-btn" onclick="closeSmsComposer()">Cancel</button><button class="sms-send-btn" onclick="sendSmsMsg()">Send SMS</button></div>' +
    '</div>' +
    '<div class="ob-email-composer" id="obEmailComposer">' +
      '<div class="sms-cmp-body"><div class="sms-to-lbl">To:</div>' +
      '<input class="sms-to-inp" id="emailToInp" type="email" placeholder="Email address">' +
      '<input class="sms-to-inp" id="emailSubjInp" type="text" placeholder="Subject">' +
      '<textarea class="sms-msg-inp" id="emailMsgInp" placeholder="Type your email…"></textarea></div>' +
      '<div class="sms-cmp-footer"><button class="sms-cancel-btn" onclick="closeEmailComposer()">Cancel</button><button class="email-send-btn" onclick="sendEmailMsg()">Send Email</button></div>' +
    '</div>' +
    '<div class="ob-wa-composer" id="obWaComposer">' +
      '<div class="sms-cmp-body"><div class="sms-to-lbl">To:</div>' +
      '<input class="sms-to-inp" id="waToInp" type="tel" placeholder="Phone number">' +
      '<textarea class="sms-msg-inp" id="waMsgInp" placeholder="Type your WhatsApp message…" oninput="waCount()"></textarea>' +
      '<div class="sms-counter"><span id="waCntSpan">0</span> characters</div></div>' +
      '<div class="sms-cmp-footer"><button class="sms-cancel-btn" onclick="closeWaComposer()">Cancel</button><button class="wa-send-btn" onclick="sendWaMsg()">Send WhatsApp</button></div>' +
    '</div>' +
  '</div>';

  var CALLCTRL_HTML = '<div class="call-ctrl" id="callCtrl">' +
    '<div class="cc-top">' +
      '<div class="cc-av" id="ccAv">--</div>' +
      '<div class="cc-name" id="ccName">–</div>' +
      '<div class="cc-status" id="ccStatus">Connecting…</div>' +
    '</div>' +
    '<div class="cc-timer" id="ccTimer">00:00</div>' +
    '<div class="cc-btns">' +
      '<button class="cc-btn" id="ccMuteBtn" onclick="ccMute()" data-tip="Mute">' +
        '<div class="cc-ic" id="ccMuteIc">' + _CC_MIC_SVG + '</div><span class="cc-lbl" id="ccMuteLbl">Mute</span>' +
      '</button>' +
      '<button class="cc-btn" id="ccHoldBtn" onclick="ccHold()" data-tip="Hold">' +
        '<div class="cc-ic" id="ccHoldIc">' + _CC_PAUSE_SVG + '</div><span class="cc-lbl" id="ccHoldLbl">Hold</span>' +
      '</button>' +
      '<button class="cc-btn" id="ccKpBtn" onclick="ccKeypad()" data-tip="Keypad">' +
        '<div class="cc-ic">' + _CC_KP_SVG + '</div><span class="cc-lbl">Keypad</span>' +
      '</button>' +
      '<button class="cc-btn cc-end" onclick="endCall()" data-tip="End Call">' +
        '<div class="cc-ic">' + _CC_END_SVG + '</div><span class="cc-lbl" style="color:#f87171;">End</span>' +
      '</button>' +
    '</div>' +
  '</div>';

  /* ─── OUTBOUND DATA ──────────────────────────────────────────────────── */
  var OB_CONTACTS = {
    recent: [
      {name:'James Carter',    phone:'+1 (415) 882-3041', email:'james.carter@example.com',    channels:['call','sms','whatsapp']},
      {name:'Emily Turner',    phone:'+1 (310) 445-7823', email:'emily.turner@mail.com',        channels:['call','email']},
      {name:'Noah Williams',   phone:'+1 (762) 533-5936', email:'noah.williams@corp.com',       channels:['call','sms','email','whatsapp']},
      {name:'Sophia Bennett',  phone:'+1 (743) 500-3536', email:'sophia.bennett@example.com',   channels:['sms','whatsapp']},
      {name:'Oliver Hughes',   phone:'+44 20 7946 0012',  email:'oliver.hughes@uk.com',         channels:['call']},
      {name:'Mia Robinson',    phone:'+1 (555) 012-5000', email:'mia.robinson@email.com',       channels:['call','sms','email']}
    ],
    all: [
      {name:'Ethan Murphy',    phone:'+1 (212) 334-5678', email:'ethan.murphy@corp.com',        channels:['call','sms','email','whatsapp']},
      {name:'Charlotte Davis', phone:'+1 (617) 290-4412', email:'charlotte.davis@mail.com',     channels:['call','email']},
      {name:'Liam Anderson',   phone:'+44 20 1234 5678',  email:'liam.anderson@uk.org',         channels:['call','sms']},
      {name:'Ava Thompson',    phone:'+1 (702) 881-2200', email:'ava.thompson@example.com',     channels:['call','sms','email','whatsapp']},
      {name:'William Scott',   phone:'+1 (404) 556-9900', email:'william.scott@biz.com',        channels:['call']},
      {name:'Isabella Martin', phone:'+61 2 9876 5432',   email:'isabella.martin@aus.com',      channels:['sms','email','whatsapp']},
      {name:'Benjamin Clark',  phone:'+1 (786) 300-1122', email:'ben.clark@example.com',        channels:['call','sms']},
      {name:'Harper Lewis',    phone:'+1 (303) 770-8899', email:'harper.lewis@mail.com',        channels:['call','sms','email']}
    ]
  };

  var _obDialpadVisible = false;
  var _ccTimer = null, _ccSec = 0, _ccMuted = false, _ccHeld = false;

  window.openOutbound = function() {
    var m = document.getElementById('outboundModal');
    if (m) { m.classList.add('open'); window.obRenderContacts('callContactList', ''); }
  };
  window.closeOutbound = function() {
    var m = document.getElementById('outboundModal');
    if (m) m.classList.remove('open');
  };
  window.obInitials = function(name) {
    return name.split(' ').map(function(w){ return w[0]; }).join('').slice(0,2).toUpperCase();
  };
  window.obChannelBtn = function(ch, phone, email, name) {
    var n = name || '';
    if (ch === 'call')     return '<button class="ob-act-btn" data-tip="Call" onclick="event.stopPropagation();startCall(\'' + phone + '\',\'' + n + '\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></button>';
    if (ch === 'sms')      return '<button class="ob-act-btn" data-tip="SMS" onclick="event.stopPropagation();openSmsComposer(\'' + phone + '\',\'' + n + '\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg></button>';
    if (ch === 'email')    return '<button class="ob-act-btn" data-tip="Email" onclick="event.stopPropagation();openEmailComposer(\'' + email + '\',\'' + n + '\')"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></button>';
    if (ch === 'whatsapp') return '<button class="ob-act-btn wa" data-tip="WhatsApp" onclick="event.stopPropagation();openWaComposer(\'' + phone + '\',\'' + n + '\')">' + _OB_WA_SM + '</button>';
    return '';
  };
  window.obContactRow = function(c) {
    var btns = c.channels.map(function(ch){ return window.obChannelBtn(ch, c.phone, c.email, c.name); }).join('');
    return '<div class="ob-contact" onclick="obSelectCall(\'' + c.phone + '\',\'' + c.name + '\')">' +
      '<div class="ob-av">' + window.obInitials(c.name) + '</div>' +
      '<div class="ob-info"><div class="ob-name">' + c.name + '</div><div class="ob-sub">' + c.phone + '</div></div>' +
      '<div class="ob-actions">' + btns + '</div></div>';
  };
  window.obRenderContacts = function(listId, query) {
    var el = document.getElementById(listId);
    if (!el) return;
    var q = query.toLowerCase().trim();
    var filter = function(list){ return q ? list.filter(function(c){ return c.name.toLowerCase().indexOf(q) !== -1 || c.phone.indexOf(q) !== -1; }) : list; };
    var recent = filter(OB_CONTACTS.recent);
    var all = filter(OB_CONTACTS.all);
    if (!recent.length && !all.length) { el.innerHTML = '<div style="padding:16px 12px;font-size:13px;color:var(--color-muted);text-align:center;">No contacts found</div>'; return; }
    var html = '';
    if (recent.length) html += '<div class="ob-group-hdr">Recent Contacts</div>' + recent.map(window.obContactRow).join('');
    if (all.length)    html += '<div class="ob-group-hdr">All Contacts</div>'    + all.map(window.obContactRow).join('');
    el.innerHTML = html;
  };
  window.toggleDialpad = function() {
    _obDialpadVisible = !_obDialpadVisible;
    var d = document.getElementById('dialpadSection');
    var t = document.getElementById('dialpadTogBtn');
    if (d) d.classList.toggle('show', _obDialpadVisible);
    if (t) t.classList.toggle('active', _obDialpadVisible);
  };
  window.dialpadDigit = function(d) {
    var inp = document.getElementById('callSearch');
    if (inp) { inp.value += d; window.obCallSearch(inp.value); }
  };
  window.dialpadBackspace = function() {
    var inp = document.getElementById('callSearch');
    if (inp) { inp.value = inp.value.slice(0, -1); window.obCallSearch(inp.value); }
  };
  window.obCallSearch = function(val) {
    window.obRenderContacts('callContactList', val);
    var allContacts = OB_CONTACTS.recent.concat(OB_CONTACTS.all);
    var isNumber = /[\d\+\(\)\-\s]{4,}/.test(val.trim());
    var found = val.trim() && allContacts.some(function(c){ return c.phone.replace(/\D/g,'').indexOf(val.replace(/\D/g,'')) !== -1; });
    var showAnon = isNumber && !found && val.trim().length > 3;
    var bar = document.getElementById('anonBar');
    if (bar) { bar.classList.toggle('show', showAnon); if (showAnon) { var nd = document.getElementById('anonNumDisplay'); if (nd) nd.textContent = val.trim(); } }
  };
  window.obCallClear = function() {
    var inp = document.getElementById('callSearch');
    if (inp) inp.value = '';
    window.obCallSearch('');
    var bar = document.getElementById('anonBar');
    if (bar) bar.classList.remove('show');
  };
  window.anonInitiate = function(type) {
    var inp = document.getElementById('callSearch');
    if (!inp) return;
    var num = inp.value.trim();
    if (!num) return;
    var already = OB_CONTACTS.recent.concat(OB_CONTACTS.all).some(function(c){ return c.phone.replace(/\D/g,'') === num.replace(/\D/g,''); });
    if (!already) OB_CONTACTS.recent.unshift({name:'Anonymous', phone:num, email:'', channels:['call','sms','whatsapp','email']});
    var bar = document.getElementById('anonBar');
    if (bar) bar.classList.remove('show');
    window.obCallSearch(num);
    if (type === 'call')  window.startCall(num, 'Anonymous');
    else if (type === 'sms')   window.openSmsComposer(num, 'Anonymous');
    else if (type === 'wa')    window.openWaComposer(num, 'Anonymous');
    else if (type === 'email') window.openEmailComposer(num, 'Anonymous');
  };
  window.obSelectCall = function(phone, name) {
    var inp = document.getElementById('callSearch');
    if (inp) { inp.value = phone; window.obCallSearch(phone); }
  };
  window.initiateCall = function() {
    var inp = document.getElementById('callSearch');
    var p = inp ? inp.value.trim() : '';
    if (p) window.startCall(p, p); else alert('Enter or select a number');
  };
  window.addContactFromDialpad = function() {
    var inp = document.getElementById('callSearch');
    var p = inp ? inp.value.trim() : '';
    if (!p) { alert('Enter a number first'); return; }
    if (typeof showNewContactModal === 'function') showNewContactModal(p);
    else alert('Add contact: ' + p);
  };
  window.startCall = function(phone, name) {
    window.closeOutbound();
    var ctrl = document.getElementById('callCtrl');
    if (!ctrl) return;
    var dispName = (name && name !== phone) ? name : phone;
    document.getElementById('ccAv').textContent = window.obInitials(dispName);
    document.getElementById('ccName').textContent = dispName;
    document.getElementById('ccStatus').textContent = 'Connecting…';
    document.getElementById('ccTimer').textContent = '00:00';
    _ccMuted = false; _ccHeld = false; _ccSec = 0;
    var muteBtn = document.getElementById('ccMuteBtn');
    if (muteBtn) { muteBtn.classList.remove('cc-on'); document.getElementById('ccMuteIc').innerHTML = _CC_MIC_SVG; document.getElementById('ccMuteLbl').textContent = 'Mute'; }
    var holdBtn = document.getElementById('ccHoldBtn');
    if (holdBtn) { holdBtn.classList.remove('cc-on'); document.getElementById('ccHoldIc').innerHTML = _CC_PAUSE_SVG; document.getElementById('ccHoldLbl').textContent = 'Hold'; }
    clearInterval(_ccTimer);
    ctrl.classList.add('active');
    setTimeout(function() {
      document.getElementById('ccStatus').textContent = 'Connected';
      _ccTimer = setInterval(function() {
        _ccSec++;
        var m = String(Math.floor(_ccSec / 60)).padStart(2, '0');
        var s = String(_ccSec % 60).padStart(2, '0');
        document.getElementById('ccTimer').textContent = m + ':' + s;
      }, 1000);
    }, 1400);
  };
  window.endCall = function() {
    clearInterval(_ccTimer);
    var ctrl = document.getElementById('callCtrl');
    if (ctrl) ctrl.classList.remove('active');
    if (typeof openWrapup === 'function') openWrapup();
  };
  window.ccMute = function() {
    _ccMuted = !_ccMuted;
    var btn = document.getElementById('ccMuteBtn');
    if (!btn) return;
    btn.classList.toggle('cc-on', _ccMuted);
    document.getElementById('ccMuteIc').innerHTML = _ccMuted ? _CC_MIC_OFF_SVG : _CC_MIC_SVG;
    document.getElementById('ccMuteLbl').textContent = _ccMuted ? 'Unmute' : 'Mute';
  };
  window.ccHold = function() {
    _ccHeld = !_ccHeld;
    var btn = document.getElementById('ccHoldBtn');
    if (!btn) return;
    btn.classList.toggle('cc-on', _ccHeld);
    document.getElementById('ccHoldIc').innerHTML = _ccHeld ? _CC_PLAY_SVG : _CC_PAUSE_SVG;
    document.getElementById('ccHoldLbl').textContent = _ccHeld ? 'Resume' : 'Hold';
    document.getElementById('ccStatus').textContent = _ccHeld ? 'On Hold' : 'Connected';
    if (_ccHeld) clearInterval(_ccTimer);
    else {
      _ccTimer = setInterval(function() {
        _ccSec++;
        var m = String(Math.floor(_ccSec / 60)).padStart(2, '0');
        var s = String(_ccSec % 60).padStart(2, '0');
        document.getElementById('ccTimer').textContent = m + ':' + s;
      }, 1000);
    }
  };
  window.ccKeypad = function() {
    var btn = document.getElementById('ccKpBtn');
    if (btn) btn.classList.toggle('cc-on');
  };
  window._closeAllComposers = function() {
    ['obSmsComposer','obEmailComposer','obWaComposer'].forEach(function(id){ var el = document.getElementById(id); if (el) el.classList.remove('open'); });
    var gap = document.getElementById('obSmsGap');
    if (gap) gap.classList.remove('show');
  };
  window._openComposer = function(id, focusId) {
    window._closeAllComposers();
    var gap = document.getElementById('obSmsGap');
    if (gap) gap.classList.add('show');
    var el = document.getElementById(id);
    if (el) el.classList.add('open');
    setTimeout(function(){ var f = document.getElementById(focusId); if (f) f.focus(); }, 50);
  };
  window.openSmsComposer = function(phone, name) {
    var m = document.getElementById('outboundModal');
    if (m && !m.classList.contains('open')) window.openOutbound();
    document.getElementById('smsToInp').value = phone || '';
    document.getElementById('smsMsgInp').value = '';
    document.getElementById('smsCntSpan').textContent = '0';
    window._openComposer('obSmsComposer', 'smsMsgInp');
  };
  window.closeSmsComposer = function() { window._closeAllComposers(); };
  window.openEmailComposer = function(email, name) {
    var m = document.getElementById('outboundModal');
    if (m && !m.classList.contains('open')) window.openOutbound();
    document.getElementById('emailToInp').value = email || '';
    document.getElementById('emailSubjInp').value = '';
    document.getElementById('emailMsgInp').value = '';
    window._openComposer('obEmailComposer', 'emailSubjInp');
  };
  window.closeEmailComposer = function() { window._closeAllComposers(); };
  window.sendEmailMsg = function() {
    var to = document.getElementById('emailToInp').value.trim();
    var sub = document.getElementById('emailSubjInp').value.trim();
    var msg = document.getElementById('emailMsgInp').value.trim();
    if (!to) { alert('Enter an email address'); return; }
    if (!sub) { alert('Enter a subject'); return; }
    if (!msg) { alert('Type a message'); return; }
    window._closeAllComposers();
    window._showToast('Email sent to ' + to, 'email');
  };
  window.openWaComposer = function(phone, name) {
    var m = document.getElementById('outboundModal');
    if (m && !m.classList.contains('open')) window.openOutbound();
    document.getElementById('waToInp').value = phone || '';
    document.getElementById('waMsgInp').value = '';
    document.getElementById('waCntSpan').textContent = '0';
    window._openComposer('obWaComposer', 'waMsgInp');
  };
  window.closeWaComposer = function() { window._closeAllComposers(); };
  window.waCount = function() { var el = document.getElementById('waMsgInp'); var c = document.getElementById('waCntSpan'); if (el && c) c.textContent = el.value.length; };
  window.sendWaMsg = function() {
    var to = document.getElementById('waToInp').value.trim();
    var msg = document.getElementById('waMsgInp').value.trim();
    if (!to) { alert('Enter a phone number'); return; }
    if (!msg) { alert('Type a message'); return; }
    window._closeAllComposers();
    window._showToast('WhatsApp sent to ' + to, 'whatsapp');
  };
  window.smsCount = function() { var el = document.getElementById('smsMsgInp'); var c = document.getElementById('smsCntSpan'); if (el && c) c.textContent = el.value.length; };
  window.sendSmsMsg = function() {
    var to = document.getElementById('smsToInp').value.trim();
    var msg = document.getElementById('smsMsgInp').value.trim();
    if (!to) { alert('Enter a phone number'); return; }
    if (!msg) { alert('Type a message'); return; }
    window.closeSmsComposer();
    window._showToast('SMS sent to ' + to, 'sms');
  };

  /* ─── DOM INIT ────────────────────────────────────────────────────────── */
  function init() {
    /* Inject CSS */
    var style = document.createElement('style');
    style.id = 'ef-navbar-css';
    if (!document.getElementById('ef-navbar-css')) {
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    /* Remove any panels already in the markup to avoid duplicates */
    var old = document.getElementById('stateDropdown');
    if (old) old.remove();
    old = document.getElementById('profilePanel');
    if (old) old.remove();
    old = document.getElementById('notifPanel');
    if (old) old.remove();
    old = document.getElementById('qlPanel');
    if (old) old.remove();
    old = document.getElementById('hamPanel');
    if (old) old.remove();
    old = document.getElementById('hamSub');
    if (old) old.remove();

    /* Inject panels into #app (or body fallback) */
    var app = document.getElementById('app') || document.body;
    app.insertAdjacentHTML('beforeend', DROPDOWN_HTML + PROFILE_HTML + NOTIF_HTML + QL_HTML + HAM_HTML);

    /* Remove existing outbound panels to avoid duplicates */
    ['outboundModal','callCtrl'].forEach(function(id){ var el = document.getElementById(id); if (el) el.remove(); });

    /* Inject outbound panels */
    app.insertAdjacentHTML('beforeend', OUTBOUND_HTML + CALLCTRL_HTML);

    /* Outside-click closes both panels */
    document.addEventListener('mousedown', function (e) {
      var dd = document.getElementById('stateDropdown');
      var pp = document.getElementById('profilePanel');
      if (sddOpen && dd && !dd.contains(e.target) && !e.target.closest('.state-pill')) window.closeSDD();
      if (ppOpen && pp && !pp.contains(e.target) && !e.target.closest('.agent-av')) window.closePP();
      var np = document.getElementById('notifPanel');
      if (notifOpen && np && !np.contains(e.target) && !e.target.closest('[aria-label="Notifications"]')) window.closeNotifDD();
      var qp = document.getElementById('qlPanel');
      if (qlOpen && qp && !qp.contains(e.target) && !e.target.closest('[aria-label="Quick Links"]')) window.closeQuickLinks();
      var hp = document.getElementById('hamPanel'); var hs = document.getElementById('hamSub');
      if (hamOpen && hp && !hp.contains(e.target) && !(hs && hs.contains(e.target)) && !e.target.closest('.nav-ham')) window.closeHamMenu();
    });

    /* Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { window.closeSDD(); window.closePP(); window.closeNotifDD(); window.closeQuickLinks(); window.closeHamMenu(); }
    });

    /* Live timer in state pill */
    var secs = 0;
    function fmt(s) {
      var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
      return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(ss).padStart(2, '0');
    }
    setInterval(function () {
      secs++;
      var el = document.querySelector('.state-pill span[style*="tabular"]');
      if (el) el.textContent = fmt(secs);
    }, 1000);
  }

  window.doSignOut = function () {
    sessionStorage.clear();
    window.location.href = 'login.html';
  };

  window._showToast = function(msg, type) {
    var t = document.getElementById('efGlobalToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'efGlobalToast';
      t.className = 'ef-toast';
      document.body.appendChild(t);
    }
    var icons = {
      email:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a50a3" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
      whatsapp:  '<svg width="14" height="14" viewBox="0 0 32 32" fill="#25D366"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.444.644 4.74 1.768 6.74L2 30l7.448-1.952A13.927 13.927 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm7.2 19.4c-.3.84-1.74 1.62-2.4 1.72-.62.09-1.4.13-2.26-.14-.52-.17-1.18-.39-2.04-.76-3.58-1.55-5.92-5.16-6.1-5.4-.18-.24-1.46-1.94-1.46-3.7 0-1.76.92-2.63 1.25-2.98.33-.35.72-.44.96-.44l.69.01c.22.01.52-.08.81.62.3.72 1.02 2.5 1.11 2.68.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.37.38-.16.74.21.36.94 1.55 2.02 2.51 1.39 1.24 2.56 1.62 2.92 1.8.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.81-.18.33.12 2.1.99 2.46 1.17.36.18.6.27.69.42.09.15.09.87-.21 1.71z"/></svg>',
      sms:       '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a50a3" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'
    };
    var borders = { email: '#1a50a3', whatsapp: '#25D366', sms: '#1a50a3' };
    var bgs     = { email: '#ECF3FF',  whatsapp: '#e8faf2',   sms: '#ECF3FF'  };
    t.style.borderLeftColor = borders[type] || '#26c98c';
    t.innerHTML =
      '<div class="ef-toast-ico" style="background:' + (bgs[type] || '#ECF3FF') + '">' + (icons[type] || '') + '</div>' +
      '<span>' + msg + '</span>';
    clearTimeout(t._tid);
    t.classList.add('show');
    t._tid = setTimeout(function() { t.classList.remove('show'); }, 3200);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
