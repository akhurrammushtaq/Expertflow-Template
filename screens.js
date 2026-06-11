/**
 * screens.js — ExpertFlow shared screen components
 * Same IIFE pattern as navbar.js.
 * Provides: voicemail screen HTML + list/table CSS + setVmFilter + togglePlay
 *
 * Each template must define --screen-left in :root:
 *   agent-desk-v2-template.html  → --screen-left: 0px
 *   agentdesk-new.html           → --screen-left: var(--sidenav-w)
 */
(function () {

  /* ─── CSS ────────────────────────────────────────────────────────────────── */
  var CSS = [
    /* List / Table shared */
    '.page-title-wrap{display:flex;align-items:baseline;gap:6px;flex-shrink:0;}',
    '.page-title{font-size:20px;font-weight:600;color:var(--color-text);}',
    '.page-title-count{font-size:14px;font-weight:400;color:var(--color-muted);}',
    '.list-toolbar{background:var(--color-bg);border:1px solid var(--color-border);padding:10px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;}',
    '.list-search{display:flex;align-items:center;gap:6px;border:1px solid var(--color-border-i);border-radius:4px;padding:6px 10px;background:var(--color-bg);min-width:220px;}',
    '.list-search:focus-within{border-color:var(--color-primary);box-shadow:var(--shadow-focus,0 0 0 3px rgba(26,80,163,0.2));}',
    '.list-search input,.vm-search-inp{border:none;background:transparent;font-size:13px;color:var(--color-body);width:100%;outline:none;font-family:Inter,sans-serif;}',
    '.list-search input::placeholder,.vm-search-inp::placeholder{color:var(--color-ph);}',
    '.toolbar-space{flex:1;}',
    '.tb-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:4px;font-size:13px;font-weight:500;border:1px solid var(--color-border-i);color:var(--color-medium);background:var(--color-bg);transition:all 0.15s;cursor:pointer;white-space:nowrap;flex-shrink:0;}',
    '.tb-btn:hover{border-color:var(--color-primary);color:var(--color-primary);background:var(--color-primary-lt);}',
    '.tb-btn.active{border-color:var(--color-primary);color:var(--color-primary);background:var(--color-primary-lt);}',
    '.list-card{flex:1;overflow:hidden;background:var(--color-bg);border:1px solid var(--color-border);display:flex;flex-direction:column;}',
    '.table-wrap{flex:1;overflow:auto;}',
    '.data-table{width:100%;border-collapse:collapse;background:var(--color-bg);table-layout:fixed;}',
    '.data-table thead{position:sticky;top:0;z-index:20;}',
    '.data-table th{background:var(--color-sec-bg);font-size:12px;font-weight:500;color:var(--color-medium);text-align:left;padding:0;border-bottom:2px solid var(--color-border);border-right:1px solid var(--color-border);white-space:nowrap;position:relative;user-select:none;}',
    '.data-table th:last-child{border-right:none;}',
    '.data-table td{padding:10px 14px;border-bottom:1px solid var(--color-border);border-right:1px solid var(--color-border);vertical-align:middle;font-size:12px;color:var(--color-body);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
    '.data-table td:last-child{border-right:none;}',
    '.data-table tbody tr:hover td{background:var(--color-primary-lt);}',
    '.data-table tbody tr:last-child td{border-bottom:none;}',
    '.th-inner{display:flex;align-items:center;gap:4px;padding:10px 6px 10px 8px;min-height:40px;}',
    '.col-drag{width:14px;height:20px;display:flex;align-items:center;justify-content:center;cursor:grab;opacity:0.35;flex-shrink:0;border-radius:2px;transition:opacity 0.1s;}',
    '.col-drag:hover{opacity:0.75;background:rgba(0,0,0,0.06);}',
    '.col-sort-trigger{display:flex;align-items:center;gap:4px;flex:1;cursor:pointer;min-width:0;padding:2px 0;}',
    '.col-label{font-size:12px;font-weight:500;color:var(--color-medium);white-space:nowrap;}',
    '.col-ch-icon{display:flex;align-items:center;flex-shrink:0;margin-left:2px;}',
    '.sort-icon{display:flex;flex-direction:column;gap:1px;flex-shrink:0;opacity:0.35;transition:opacity 0.15s;margin-left:2px;}',
    '.col-sort-trigger:hover .sort-icon{opacity:0.65;}',
    '.col-resizer{position:absolute;right:0;top:0;bottom:0;width:5px;cursor:col-resize;background:transparent;z-index:5;}',
    '.col-resizer:hover{background:rgba(26,80,163,0.35);}',
    '.cust-cell{display:flex;align-items:center;gap:8px;}',
    '.cust-av-sm{width:30px;height:30px;min-width:30px;border-radius:50%;background:var(--color-primary-lt);color:var(--color-primary);font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}',
    '.data-table tbody tr:hover .cust-av-sm{background:var(--color-primary);color:#fff;}',
    '.cell-val{font-size:12px;color:var(--color-body);}',
    '.cell-empty{color:var(--color-muted);font-size:12px;}',
    '.row-action{width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;border:none;background:none;color:var(--color-medium);cursor:pointer;transition:all 0.15s;opacity:0;}',
    'tr:hover .row-action{opacity:1;}',
    '.row-action:hover{background:var(--color-primary-lt);color:var(--color-primary);}',
    '.paginator{display:flex;align-items:center;gap:6px;padding:10px 16px;border-top:1px solid var(--color-border);background:var(--color-bg);flex-shrink:0;}',
    '.pag-info{font-size:12px;color:var(--color-muted);flex-shrink:0;}',
    '.pag-space{flex:1;}',
    '.pag-btn{width:30px;height:30px;display:flex;align-items:center;justify-content:center;border:1px solid var(--color-border);border-radius:4px;background:var(--color-bg);color:var(--color-medium);cursor:pointer;font-size:12px;font-weight:500;transition:all 0.15s;flex-shrink:0;}',
    '.pag-btn:hover:not(:disabled){border-color:var(--color-primary);color:var(--color-primary);background:var(--color-primary-lt);}',
    '.pag-btn:disabled{opacity:0.35;cursor:not-allowed;}',
    '.pag-btn.active{background:var(--color-primary);color:#fff;border-color:var(--color-primary);}',
    '.pag-gap{font-size:12px;color:var(--color-muted);padding:0 4px;display:flex;align-items:center;}',
    '.pag-rpp{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--color-muted);flex-shrink:0;margin-left:8px;}',
    '.pag-rpp select{border:1px solid var(--color-border-i);border-radius:4px;padding:4px 6px;font-size:12px;background:var(--color-bg);color:var(--color-body);cursor:pointer;}',
    /* VM screen */
    '.vm-screen{display:none;position:fixed;top:var(--navbar-h);left:var(--screen-left,0);right:0;bottom:0;z-index:20;flex-direction:column;overflow:hidden;background:var(--color-canvas);padding:12px;gap:8px;}',
    '.vm-screen.open{display:flex;}',
    '.vm-unread-badge{background:var(--color-error);color:#fff;font-size:12px;font-weight:700;border-radius:9999px;padding:1px 8px;min-width:22px;height:20px;display:inline-flex;align-items:center;justify-content:center;}',
    '.vm-row-unread td:first-child{border-left:3px solid var(--color-primary);}',
    '.vm-row-unread td{font-weight:500;}',
    '.vm-cust-cell{display:flex;flex-direction:column;gap:2px;}',
    '.vm-cust-name{font-size:13px;font-weight:500;color:var(--color-text);}',
    '.vm-cust-phone{font-size:11px;color:var(--color-ts);}',
    '.vm-date{font-size:12px;color:var(--color-body);}',
    '.vm-time-sub{font-size:11px;color:var(--color-ts);margin-top:1px;}',
    '.vm-player-sm{display:flex;align-items:center;gap:6px;background:var(--color-canvas);border-radius:4px;padding:4px 8px;min-width:200px;max-width:280px;}',
    '.vm-play-sm{width:24px;height:24px;border-radius:50%;background:var(--color-primary);display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;border:none;}',
    '.vm-play-sm:hover{background:var(--color-primary-h,#1e5bb9);}',
    '.vm-wf-sm{flex:1;height:22px;display:flex;align-items:center;gap:1.5px;overflow:hidden;}',
    '.vm-bar-sm{flex-shrink:0;width:2.5px;border-radius:2px;background:#c8d3e0;}',
    '.vm-bar-sm.p{background:var(--color-primary);}',
    '.vm-dur-sm{font-size:11px;color:var(--color-ts);font-variant-numeric:tabular-nums;white-space:nowrap;flex-shrink:0;}',
    '.vm-status{display:inline-flex;align-items:center;gap:4px;border-radius:9999px;padding:2px 10px;font-size:12px;font-weight:500;white-space:nowrap;}',
    '.vm-status.unread{background:rgba(26,80,163,0.08);color:var(--color-primary);}',
    '.vm-status.read{background:var(--color-canvas);color:var(--color-muted);}',
    '.vm-status-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}',
    '.vm-status.unread .vm-status-dot{background:var(--color-primary);}',
    '.vm-status.read .vm-status-dot{background:var(--color-muted);}',
    /* Dark mode */
    '#app.dark .vm-screen,html.ef-dark .vm-screen{background:var(--color-canvas);}',
    '#app.dark .list-toolbar,html.ef-dark .list-toolbar,#app.dark .list-card,html.ef-dark .list-card{background:var(--color-bg);border-color:var(--color-border);}',
    '#app.dark .list-search,html.ef-dark .list-search{background:var(--color-sec-bg);border-color:var(--color-border);}',
    '#app.dark .tb-btn,html.ef-dark .tb-btn{background:var(--color-sec-bg);border-color:var(--color-border);color:var(--color-medium);}',
    '#app.dark .tb-btn:hover,html.ef-dark .tb-btn:hover,#app.dark .tb-btn.active,html.ef-dark .tb-btn.active{background:#1a2d4a;border-color:var(--color-primary);color:var(--color-primary);}',
    '#app.dark .data-table,html.ef-dark .data-table{background:var(--color-bg);}',
    '#app.dark .data-table th,html.ef-dark .data-table th{background:var(--color-sec-bg);}',
    '#app.dark .data-table tbody tr:hover td,html.ef-dark .data-table tbody tr:hover td{background:#1a2d4a;}',
    '#app.dark .paginator,html.ef-dark .paginator{background:var(--color-bg);border-color:var(--color-border);}',
    '#app.dark .pag-btn,html.ef-dark .pag-btn{background:var(--color-bg);border-color:var(--color-border);}',
    '#app.dark .pag-rpp select,html.ef-dark .pag-rpp select{background:var(--color-sec-bg);border-color:var(--color-border);color:var(--color-body);}',
    '#app.dark .vm-player-sm,html.ef-dark .vm-player-sm{background:var(--color-sec-bg);}',
    '#app.dark .vm-bar-sm,html.ef-dark .vm-bar-sm{background:#3a3f48;}',
    /* Labels dropdown */
    '.labels-dropdown{position:relative;flex-shrink:0;}',
    '.labels-trigger{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:4px;font-size:13px;font-weight:500;border:1px solid var(--color-border-i);color:var(--color-medium);background:var(--color-bg);cursor:pointer;white-space:nowrap;transition:all 0.15s;}',
    '.labels-trigger:hover,.labels-trigger.open{border-color:var(--color-primary);color:var(--color-primary);background:var(--color-primary-lt);}',
    '.labels-menu{display:none;position:absolute;top:calc(100% + 4px);right:0;background:var(--color-bg);border:1px solid var(--color-border);border-radius:6px;min-width:200px;z-index:300;box-shadow:0 4px 16px rgba(0,0,0,0.12);}',
    '.labels-menu.open{display:block;}',
    '.labels-menu-hdr{padding:10px 14px 6px;font-size:11px;font-weight:600;color:var(--color-muted);text-transform:uppercase;letter-spacing:0.04em;}',
    '.label-option{display:flex;align-items:center;gap:8px;padding:8px 14px;cursor:pointer;font-size:13px;color:var(--color-body);}',
    '.label-option:hover{background:var(--color-canvas);}',
    '.label-option input[type=checkbox]{width:14px;height:14px;accent-color:var(--color-primary);cursor:pointer;flex-shrink:0;}',
    '.label-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}',
    '.labels-menu-footer{padding:8px 14px;border-top:1px solid var(--color-border);display:flex;justify-content:flex-end;gap:8px;align-items:center;}',
    '.labels-clear{font-size:12px;color:var(--color-muted);cursor:pointer;padding:4px 8px;background:none;border:none;}',
    '.labels-clear:hover{color:var(--color-primary);}',
    '.labels-apply{font-size:12px;color:#fff;background:var(--color-primary);border-radius:4px;padding:5px 12px;cursor:pointer;border:none;font-weight:500;}',
    '.labels-apply:hover{background:var(--color-primary-h,#1e5bb9);}',
    /* Dark mode — labels */
    '#app.dark .labels-trigger,html.ef-dark .labels-trigger{background:var(--color-sec-bg);border-color:var(--color-border);}',
    '#app.dark .labels-menu,html.ef-dark .labels-menu{background:var(--color-sec-bg);border-color:var(--color-border);}',
    '#app.dark .label-option:hover,html.ef-dark .label-option:hover{background:#2c2f35;}'
  ].join('\n');

  /* ─── VM SCREEN HTML ────────────────────────────────────────────────────── */
  var _b = function(h) { /* waveform bar helper */
    return '<div class="vm-bar-sm' + (h.p ? ' p' : '') + '" style="height:' + h.v + '%"></div>';
  };
  var _wf = function(bars) { return bars.map(_b).join(''); };
  var _pl = '<svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
  var _player = function(bars, dur) {
    return '<div class="vm-player-sm"><button class="vm-play-sm" onclick="togglePlay(this)" aria-label="Play voicemail" title="Play">' + _pl + '</button><div class="vm-wf-sm">' + _wf(bars) + '</div><span class="vm-dur-sm">' + dur + '</span></div>';
  };
  var _th = function(label, w) {
    var style = w ? ' style="width:' + w + '"' : '';
    var colId = label.toLowerCase().replace(/\s+/g, '-');
    var dots = '<svg width="10" height="14" viewBox="0 0 10 14" fill="none"><circle cx="3" cy="2.5" r="1.2" fill="#a3b9da"/><circle cx="7" cy="2.5" r="1.2" fill="#a3b9da"/><circle cx="3" cy="7" r="1.2" fill="#a3b9da"/><circle cx="7" cy="7" r="1.2" fill="#a3b9da"/><circle cx="3" cy="11.5" r="1.2" fill="#a3b9da"/><circle cx="7" cy="11.5" r="1.2" fill="#a3b9da"/></svg>';
    var arrows = '<span class="sort-icon"><svg width="8" height="6" viewBox="0 0 8 6"><path d="M4 0L8 6H0z" fill="currentColor"/></svg><svg width="8" height="6" viewBox="0 0 8 6"><path d="M4 6L0 0h8z" fill="currentColor"/></svg></span>';
    return '<th' + style + ' data-col="' + colId + '"><div class="th-inner"><span class="col-drag" title="Drag to reorder">' + dots + '</span><span class="col-sort-trigger"><span class="col-label">' + label + '</span>' + arrows + '</span></div><div class="col-resizer"></div></th>';
  };
  var _cust = function(initials, name, phone, isRead) {
    var avStyle = isRead ? ' style="background:#e8edf3;color:#555"' : '';
    var nameStyle = isRead ? ' style="font-weight:400"' : '';
    return '<div class="cust-cell"><span class="cust-av-sm"' + avStyle + '>' + initials + '</span><div class="vm-cust-cell"><span class="vm-cust-name"' + nameStyle + '>' + name + '</span><span class="vm-cust-phone">' + phone + '</span></div></div>';
  };
  var _dt = function(date, time) {
    return '<div class="vm-date">' + date + '</div><div class="vm-time-sub">' + time + '</div>';
  };
  var _status = function(type) {
    var label = type === 'unread' ? 'Unread' : 'Read';
    return '<span class="vm-status ' + type + '"><span class="vm-status-dot"></span>' + label + '</span>';
  };

  /* Waveform data */
  var WF = {
    SM: [{v:55,p:1},{v:80,p:1},{v:45,p:1},{v:90,p:1},{v:60,p:1},{v:70,p:1},{v:50,p:1},{v:85,p:1},{v:65},{v:40},{v:75},{v:55},{v:90},{v:45},{v:70},{v:60},{v:80},{v:50},{v:65},{v:40},{v:75},{v:55},{v:85},{v:45},{v:70},{v:60},{v:50},{v:80}],
    DO: [{v:70},{v:50},{v:85},{v:40},{v:65},{v:90},{v:55},{v:75},{v:45},{v:80},{v:60},{v:50},{v:70},{v:85},{v:40},{v:65},{v:90},{v:55},{v:75},{v:45},{v:80},{v:60},{v:50},{v:70},{v:85},{v:40},{v:65},{v:55}],
    PN: [{v:60},{v:80},{v:45},{v:70},{v:55},{v:90},{v:40},{v:75},{v:65},{v:50},{v:85},{v:60},{v:70},{v:45},{v:80},{v:55},{v:90},{v:40},{v:75},{v:65},{v:50},{v:85},{v:60},{v:70},{v:45},{v:80},{v:55},{v:90}],
    JT: [{v:65,p:1},{v:80,p:1},{v:50,p:1},{v:90,p:1},{v:55,p:1},{v:75,p:1},{v:45,p:1},{v:85,p:1},{v:60,p:1},{v:70,p:1},{v:50,p:1},{v:80,p:1},{v:55,p:1},{v:90,p:1},{v:45,p:1},{v:75,p:1},{v:65,p:1},{v:50,p:1},{v:85,p:1},{v:60,p:1},{v:70,p:1},{v:50,p:1},{v:80,p:1},{v:55,p:1},{v:90,p:1},{v:45,p:1},{v:75,p:1},{v:65,p:1}],
    RK: [{v:70,p:1},{v:55,p:1},{v:85,p:1},{v:40,p:1},{v:75,p:1},{v:60,p:1},{v:90,p:1},{v:50,p:1},{v:65,p:1},{v:80,p:1},{v:45,p:1},{v:70,p:1},{v:55,p:1},{v:85,p:1},{v:40,p:1},{v:75,p:1},{v:60,p:1},{v:90,p:1},{v:50,p:1},{v:65,p:1},{v:80,p:1},{v:45,p:1},{v:70,p:1},{v:55,p:1},{v:85,p:1},{v:40,p:1},{v:75,p:1},{v:60,p:1}]
  };

  var VM_HTML =
    '<div class="vm-screen" id="vmScreen" role="main" aria-label="Voicemail inbox">' +
    /* Toolbar */
    '<div class="list-toolbar">' +
      '<div class="page-title-wrap"><span class="page-title">Voicemail</span><span class="vm-unread-badge">3 unread</span></div>' +
      '<div class="toolbar-space"></div>' +
      '<div class="list-search"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaaaaa" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input class="vm-search-inp" type="text" placeholder="Search voicemails…" aria-label="Search voicemails"></div>' +
      '<button class="tb-btn vm-filter-btn active" onclick="setVmFilter(this,\'all\')" aria-pressed="true">All</button>' +
      '<button class="tb-btn vm-filter-btn" onclick="setVmFilter(this,\'unread\')" aria-pressed="false">Unread</button>' +
      '<button class="tb-btn vm-filter-btn" onclick="setVmFilter(this,\'read\')" aria-pressed="false">Read</button>' +
    '</div>' +
    /* Table card */
    '<div class="list-card"><div class="table-wrap"><table class="data-table"><thead><tr>' +
      _th('Customer','230px') + _th('Received On','160px') + _th('Recording') + _th('Status','120px') +
    '</tr></thead><tbody>' +
    /* Row: Sarah Mitchell — unread */
    '<tr class="vm-row vm-row-unread" data-status="unread">' +
      '<td>' + _cust('SM','Sarah Mitchell','+1 (415) 882-3041',false) + '</td>' +
      '<td>' + _dt('May 20, 2025','09:14 AM') + '</td>' +
      '<td>' + _player(WF.SM,'1:24') + '</td>' +
      '<td>' + _status('unread') + '</td>' +
    '</tr>' +
    /* Row: David Okonkwo — unread */
    '<tr class="vm-row vm-row-unread" data-status="unread">' +
      '<td>' + _cust('DO','David Okonkwo','+44 20 7946 0012',false) + '</td>' +
      '<td>' + _dt('May 20, 2025','10:52 AM') + '</td>' +
      '<td>' + _player(WF.DO,'0:47') + '</td>' +
      '<td>' + _status('unread') + '</td>' +
    '</tr>' +
    /* Row: Priya Nambiar — unread */
    '<tr class="vm-row vm-row-unread" data-status="unread">' +
      '<td>' + _cust('PN','Priya Nambiar','+91 98204 51033',false) + '</td>' +
      '<td>' + _dt('May 19, 2025','03:38 PM') + '</td>' +
      '<td>' + _player(WF.PN,'2:08') + '</td>' +
      '<td>' + _status('unread') + '</td>' +
    '</tr>' +
    /* Row: John Tylor — read */
    '<tr class="vm-row" data-status="read">' +
      '<td>' + _cust('JT','John Tylor','+1 (762) 533-5936',true) + '</td>' +
      '<td>' + _dt('May 18, 2025','11:05 AM') + '</td>' +
      '<td>' + _player(WF.JT,'1:52') + '</td>' +
      '<td>' + _status('read') + '</td>' +
    '</tr>' +
    /* Row: Rob Kelsey — read */
    '<tr class="vm-row" data-status="read">' +
      '<td>' + _cust('RK','Rob Kelsey','+1 (743) 500-3536',true) + '</td>' +
      '<td>' + _dt('May 17, 2025','02:21 PM') + '</td>' +
      '<td>' + _player(WF.RK,'0:33') + '</td>' +
      '<td>' + _status('read') + '</td>' +
    '</tr>' +
    '</tbody></table></div>' +
    /* Paginator */
    '<div class="paginator">' +
      '<span class="pag-info">Showing 1–5 of 5</span><div class="pag-space"></div>' +
      '<button class="pag-btn" disabled aria-label="Previous page"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>' +
      '<button class="pag-btn active">1</button>' +
      '<button class="pag-btn" disabled aria-label="Next page"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></button>' +
      '<div class="pag-rpp"><span>Rows per page</span><select aria-label="Rows per page"><option value="10">10</option><option value="25">25</option><option value="50">50</option></select></div>' +
    '</div></div>' +
    '</div><!-- /vmScreen -->';

  /* ─── INIT ───────────────────────────────────────────────────────────────── */
  function init() {
    /* Inject CSS */
    var s = document.createElement('style');
    s.id = 'ef-screens-css';
    s.textContent = CSS;
    document.head.appendChild(s);

    /* Inject VM screen HTML into mount point */
    var mount = document.getElementById('vmScreenMount');
    if (mount) {
      mount.outerHTML = VM_HTML;
    }

    /* VM search listener — delegated so it works after injection */
    document.addEventListener('input', function(e) {
      if (!e.target.classList.contains('vm-search-inp')) return;
      var q = e.target.value.toLowerCase();
      document.querySelectorAll('.vm-row').forEach(function(row) {
        row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  /* ─── GLOBAL FUNCTIONS ───────────────────────────────────────────────────── */
  window.setVmFilter = function(btn, filter) {
    document.querySelectorAll('.vm-filter-btn').forEach(function(p) {
      p.classList.remove('active');
      p.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    document.querySelectorAll('.vm-row').forEach(function(row) {
      row.style.display = (filter === 'all' || row.dataset.status === filter) ? '' : 'none';
    });
  };

  var _activeBtn = null;
  var _playIco  = '<svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
  var _pauseIco = '<svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';

  window.togglePlay = function(btn) {
    if (_activeBtn && _activeBtn !== btn) _activeBtn.innerHTML = _playIco;
    var playing = btn.innerHTML.includes('rect');
    btn.innerHTML = playing ? _playIco : _pauseIco;
    _activeBtn = playing ? null : btn;
  };

  /* Always inject synchronously — script is always loaded before </body>
     so #vmScreenMount is already in the DOM when this runs. */
  init();

})();
