import Mock from 'mockjs'

export default {
  config: () => {
    const items = Mock.mock({
      'projectID': '1',
      'projectName': 'test',
      'classification': [{
        value: 'target',
        fillColor: 'rgba(19, 206, 102, 0.2)',
        strokeColor: 'rgba(19, 206, 102, 1)'
      }, {
        value: 'ignore',
        fillColor: 'rgba(30, 195, 201, 0.2)',
        strokeColor: 'rgba(30, 195, 201, 1)'
      }],
      'property': [{
        id: '1',
        name: '是否跌倒',
        type: 'Binary Classification',
        options: ['是', '否'],
        default: '否'
      }]
      // , {
      //   id: '2',
      //   name: '输入',
      //   type: 'Input',
      //   default: 'default value'
      // }, {
      //   id: '3',
      //   name: '多分类',
      //   type: 'Multiple Classification',
      //   options: ['1', '2', '3', '4'],
      //   default: '1'
      // }, {
      //   id: '4',
      //   name: '多项选择',
      //   type: 'Multiple Choice',
      //   options: ['One', 'Two', 'Three', 'Four', 'Five'],
      //   default: ['One', 'Two']
      // }, {
      //   id: '5',
      //   name: '二分类2',
      //   type: 'Binary Classification',
      //   options: ['0', '1'],
      //   default: '0'
      // }
    })
    return {
      code: 200,
      data: items
    }
  }
}
