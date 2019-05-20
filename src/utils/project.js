var jsonData = '{ "projectName": "test", "projectType": "Detection",' +
  '"classification":[{ "value": "target","fillColor": "rgba(19, 206, 102, 0.2)", "strokeColor": "rgba(19, 206, 102, 1)"},' +
  '{ "value": "ignore","fillColor": "rgba(30, 195, 201, 0.2)", "strokeColor": "rgba(30, 195, 201, 1)"}],' +
  '"properties": [{ "id": 1,"name": "是否跌倒", "type": "Binary Classification","options": ["是", "否"],"default": "否"},' +
  '{ "id": 2,"name": "输入属性", "type": "Input","default": "Input default value"},' +
  '{ "id": 3,"name": "多分类", "type": "Multiple Classification","options": ["1", "2","3"], "default": "1"},' +
  '{ "id": 4,"name": "多项选择", "type": "Multiple Choice","options": ["One", "Two", "Three", "Four", "Five"], "default": ["One", "Two"]}]}'

export default jsonData
