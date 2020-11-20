mktoast.success('mktoast notifier is working', 'WOW!');
[
  { type: 'default', title: 'Echo Sample', message: 'Here is Default message' },
  { type: 'success', title: 'Success (ok) Sample', message: 'Here is Success/ok message' },
  { type: 'danger', title: 'Danger (error) Sample', message: 'Here is Danger/error message' },
  { type: 'info', title: 'Info Sample', message: 'Here is Info message' },
  { type: 'warning', title: 'Warning (Warn) Sample', message: 'Here is Warning/warn message' },
].forEach(function (msg, i) {
  setTimeout(function () {
    mktoast.print(msg);
  }, 1000 + (i + 1) * 500);
});

setTimeout(() => mktoast.info('Message with ONE argument "message"'), 4000);
setTimeout(() => mktoast.info('Message with TWO arguments', 'Second argument'), 4500);
setTimeout(() => mktoast.info('Message with THREE arguments', 'Second argument', { position: 'top right' }), 5000);

// setTimeout( function(){mktoast.echo('It can show different types of messages, with or without title');}, 1000);

function print(type) {
  if (!type) type = 'default';
  var options = {
    duration: durationEl.value || 3000,
    position: xposition.value + ' ' + yposition.value,
  };
  mktoast[type](getText(), type, options);
}

function getText() {
  var t = [
    [
      'This is a message',
      'It is a message',
      "It's a notification",
      'This is a kind of message',
      'Here is message',
      'You reading kind of notification',
    ],
    [
      'intended to <i>attract</i> users attention',
      'to attract attention',
      'used to show important information',
      'suitable to show some information',
      'with smooth css animation',
      'suitable for mobile devices',
    ],
  ];
  var i = random.int(1, 3);
  var res = '';
  while (i) {
    res +=
      t
        .map(function (texts) {
          return random.element(texts);
        })
        .join(' ') + '. ';
    i--;
  }
  return res;
}

// sform.onchange()
function changeSettings() {
  const demoBoard = document.querySelector('.demo-board');
  const theme = sform.theme.value;
  const corners = sform.corners.value;
  const cfg = { theme, corners };
  hideCustomInfo();

  switch (theme) {
    case 'default':
      byId('theme-is-default').style.display = 'block';
      removeLink('mk-toast-dark.css');
      removeLink('mk-toast-alt.css');
      demoBoard.style.backgroundColor = '';
      break;
    case 'dark':
      byId('theme-is-dark').style.display = 'block';
      removeLink('mk-toast-alt.css');
      addLink('mk-toast-dark.css');
      demoBoard.style.backgroundColor = '#000';
      break;
    case 'alt':
      byId('theme-is-alt').style.display = 'block';
      removeLink('mk-toast-dark.css');
      addLink('mk-toast-alt.css');
      demoBoard.style.backgroundColor = '';
      break;
  }

  switch (corners) {
    case 'default':
      removeLink('mk-toast-rounded.css');
      break;
    case 'rounded':
      byId('corner-is-rounded').style.display = 'block';
      addLink('mk-toast-rounded.css');
      break;
  }
  return cfg;
}

function hideCustomInfo() {
  const target = document.getElementById('customization-info');
  [].forEach.call(target.children, (e) => {
    e.style.display = 'none';
  });
}
function byId(id) {
  return document.getElementById(id);
}
function addLink(name) {
  link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '../dist/' + name;
  document.head.appendChild(link);
}
function removeLink(name) {
  const selector = `[href $= "${name}" ]`;
  const list = document.head.querySelectorAll(selector);
  [].forEach.call(list, (e) => {
    document.head.removeChild(e);
  });
}
