
declare module "electron-redux" {
  const content: {
    forwardToRenderer: function;
    forwardToMain: function;
    triggerAlias: function;
    replayActionMain: function;
    replayActionRenderer: function;
    getInitialStateRenderer: function;
  }
  export = content;
}

declare module 'react-ui-tree' {
  const content: any;
  export = content;
}