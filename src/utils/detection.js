import paper from 'paper'
import { colorToRGBA } from '@/utils/color'
import store from '@/store'
export function addBox(downPoint, point, classification, prop, status, strokeWidth) {
  const items = paper.project.getItems({
    data: {
      type: 'box'
    }
  })
  if (prop === undefined) {
    var propertyList = store.state.detection.property
    // console.log(propertyList)
    if (propertyList.length > 0) {
      var form = {}
      propertyList.forEach(item => {
        form[item.id] = item.default
      })
      prop = form
    }
  }

  const newRect = new paper.Path.Rectangle(downPoint, point)
  newRect.strokeColor = colorToRGBA(classification.strokeColor)
  newRect.fillColor = colorToRGBA(classification.fillColor)
  newRect.strokeWidth = strokeWidth
  newRect.data.status = status
  newRect.data.class = classification.value
  newRect.data.id = items.length + 1
  newRect.data.type = 'box'
  newRect.data.prop = prop

  const leftTopPoint = new paper.Point(newRect.bounds.topLeft.x + 2, newRect.bounds.topLeft.y + 2)

  const text = new paper.PointText({
    point: [leftTopPoint.x + 2, leftTopPoint.y + 10],
    content: newRect.data.id,
    fillColor: 'black',
    // strokeColor: newRect.strokeColor,
    fontFamily: 'Normal',
    fontSize: 14
  })
  text.locked = true

  const textRect = new paper.Path.Rectangle(leftTopPoint, new paper.Point(text.bounds.bottomRight.x + 4, text.bounds.bottomRight.y))
  textRect.strokeColor = colorToRGBA(classification.strokeColor)
  textRect.fillColor = textRect.strokeColor
  textRect.strokeWidth = strokeWidth
  textRect.data.status = 'newAnnotation'
  textRect.data.class = classification
  textRect.data.id = items.length + 1
  textRect.data.type = 'background'
  textRect.locked = true

  // paper.project.deselectAll()
  // newRect.selected = true
  new paper.Group({
    children: [newRect, textRect, text]
  })
}

