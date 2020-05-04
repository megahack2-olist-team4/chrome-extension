function isFichaTecnica(findText) {
  var selection = window.getSelection(),
    parent = selection.getRangeAt(0).commonAncestorContainer;

  return parent.textContent.trim().toLowerCase() == findText.trim().toLowerCase();
}