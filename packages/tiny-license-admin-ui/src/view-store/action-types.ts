export default function(viewName: string) {
  /** */
  const SET_STATE = `@view-state-${viewName}/set-state`;
  /** */
  return {
    SET_STATE
  };
}
