import path from 'path';

export default {
  getRootPath: () => {
    const developmentRoot = path.resolve(__dirname, '../../test')
    const productionRoot = path.resolve(__dirname, '../../../../')
    return process.env.CAPBOX_STAGE === 'development' ? developmentRoot : productionRoot
  }
};
