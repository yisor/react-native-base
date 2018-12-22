/**
 * @desc [创建redux辅助函数]
 * @param {String} type action Type
 * @param {Object} extraParams extra params
 */
const createAction = (type) => {
  return (payload, extraParams = {}) => {
    return {
      type,
      payload,
      ...extraParams
    };
  };
};

export default createAction;