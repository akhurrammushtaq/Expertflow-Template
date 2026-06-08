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
    '.ham-sub-item:hover{background:var(--color-canvas);color:var(--color-text);}'
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
    '<div class="sdd-item sdd-logout" onclick="closeSDD()">' +
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
      '<div class="pp-item" style="color:var(--color-error)" onclick="closePP()">' +
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
    try { sessionStorage.setItem('ef-dark', a.classList.contains('dark') ? '1' : '0'); } catch (e) {}
  };

  window.toggleNotifDD = function (e) {
    e.stopPropagation();
    if (sddOpen) window.closeSDD();
    if (ppOpen) window.closePP();
    notifOpen = !notifOpen;
    var panel = document.getElementById('notifPanel');
    if (notifOpen) {
      var btn = e.currentTarget;
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
    var panel = document.getElementById('qlPanel');
    if (qlOpen) {
      var btn = e.currentTarget;
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
    if (check) check.style.background = color;
    var pillSpan = document.querySelector('.state-pill span');
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
