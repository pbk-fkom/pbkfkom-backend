$("#summernote").summernote({
  tabsize: 2,
  height: 500,
  toolbar: [
    ["style", ["style"]],
    [
      "font",
      [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "superscript",
        "subscript",
        "clear",
      ],
    ],
    ["fontname", ["fontname"]],
    ["fontsize", ["fontsize"]],
    ["color", ["color"]],
    ["para", ["ol", "ul", "paragraph", "height"]],
    ["table", ["table"]],
    ["insert", ["link"]],
    ["view", ["undo", "redo", "fullscreen", "codeview", "help"]],
  ],
});
$("#hint").summernote({
  height: 100,
  toolbar: false,
  placeholder: "type with apple, orange, watermelon and lemon",
  hint: {
    words: ["apple", "orange", "watermelon", "lemon"],
    match: /\b(\w{1,})$/,
    search: function (keyword, callback) {
      callback(
        $.grep(this.words, function (item) {
          return item.indexOf(keyword) === 0;
        })
      );
    },
  },
});
