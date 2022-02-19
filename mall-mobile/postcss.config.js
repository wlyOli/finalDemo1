//postcss是基于node.js处理css的工具，所以module.exports
module.exports = {
  plugins: {
    'postcss-pxtorem': {
	  //转换根元素基准值
	  //正常情况下，按照设计稿750、10=75，375、10=37.5
      //vant组件库是基于逻辑375设计的
	  rootValue: 37.5,
	  //需要转换的css属性，*所有，带单位的都转换
      propList: ['*'],
    },
  },
};