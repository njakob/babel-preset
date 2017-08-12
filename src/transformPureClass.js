export default function transformPureClass() {
  return {
    visitor: {
      ClassExpression: function ClassExpression(path) {
        path.addComment('leading', '#__PURE__');
      }
    }
  };
}
