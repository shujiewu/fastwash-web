import Mock from 'mockjs'

export default {
  config: () => {
    const items = Mock.mock({
      'projectID': '1',
      'projectName': 'test',
      'classification': [{
        value: 'vehicle',
        fillColor: 'rgba(19, 206, 102, 0.2)',
        strokeColor: 'rgba(19, 206, 102, 1)'
      }, {
        value: 'vehicle2',
        fillColor: 'rgba(30, 195, 201, 0.2)',
        strokeColor: 'rgba(30, 195, 201, 1)'
      }, {
        value: 'vehicle3',
        fillColor: 'rgba(221, 221, 42, 0.2)',
        strokeColor: 'rgba(221, 221, 42, 1)'
      }],
      'property': [{
        id: '1',
        name: '输入',
        type: 'Input',
        default: 'default value'
      }, {
        id: '2',
        name: '二分类1',
        type: 'Binary Classification',
        options: ['True', 'False'],
        default: 'True'
      }, {
        id: '3',
        name: '多分类',
        type: 'Multiple Classification',
        options: ['1', '2', '3', '4'],
        default: '1'
      }, {
        id: '4',
        name: '多项选择',
        type: 'Multiple Choice',
        options: ['One', 'Two', 'Three', 'Four', 'Five'],
        default: ['One', 'Two']
      }, {
        id: '5',
        name: '二分类2',
        type: 'Binary Classification',
        options: ['0', '1'],
        default: '0'
      }]
    })
    return {
      code: 200,
      data: items
    }
  }
}
