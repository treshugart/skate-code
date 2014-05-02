(function (skate, hjs) {
  skate('skate-code', {
    type: skate.types.ANY,
    ready: function (element) {
      var html = element.innerHTML;
      var lines = html.split("\n");
      var isTextarea = element.tagName === 'TEXTAREA';

      // Textareas allow tags like <script> and <link> to not get executed.
      if (isTextarea) {
        var replacement = document.createElement('div');
        replacement.className = element.className;
        element = replacement;
      }

      // Trim leading empty lines.
      if (!trim(lines[0])) {
        lines.splice(0, 1);
      }

      // Trim trailing empty lines
      if (!trim(lines[lines.length - 1])) {
        lines.splice(lines.length - 1, 1);
      }

      var baseIndent = getIndentLength(lines[0]);
      var pre = document.createElement('pre');

      element.innerHTML = '';
      element.appendChild(pre);

      lines.forEach(function (line, index) {
        var indent = getIndentLength(line) - baseIndent;
        var num = document.createElement('code');
        var code = document.createElement('code');
        var nl = document.createTextNode("\n");

        line = trim(line);
        line = line.replace('&gt;', '>');
        line = line.replace('&lt;', '<');

        num.className = 'code-line-number';
        num.innerHTML = index + 1;

        code.className = 'code-line-content';
        code.innerHTML = setIndentLength(indent) + hjs.highlight(element.getAttribute('lang') || 'html', line).value;

        pre.appendChild(num);
        pre.appendChild(code);
        pre.appendChild(nl);
      });

      if (isTextarea) {
        return element;
      }
    }
  });

  function getIndentLength (str) {
    if (str) {
      return str.match(/^\s*/)[0].length;
    }
  }

  function setIndentLength (len) {
    return len > 0 ? new Array(len + 1).join(' ') : '';
  }

  function trim (str) {
    if (str) {
      return str.replace(/^\s+/, '').replace(/\s+$/, '');
    }
  };
}(window.skate, window.hljs));
