export const listSuccess = (list) => {
    return {
      type: 'LIST',
      payload:{
        list:list
      }
    };
  };