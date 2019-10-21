import paper from 'paper'
/** 存储目标检测相关的信息 **/
const detection = {
  namespaced: true,
  state: {
    activeLayer: 0,
    // 记录选中的box
    selectedItems: [],
    // 记录分类配置
    classification: [],
    // 记录属性配置
    property: [],
    projectID: '',
    projectName: '',
    // 保存原始标注
    originalAnnotation: null,
    // 标识当前状态
    state: 'edit',
    // 保存当前标注
    currentAnnotation: null,
    // 标记当前是否修改
    annotationEditsFlag: false,
    // 图片shape
    shape: [],
    // 记录当前框数量
    boxCount: 0,
    tableSelect: true
  },
  mutations: {
    setSelectedItems: (state, selectedItems) => {
      state.selectedItems = selectedItems
    },
    setClassification: (state, classification) => {
      state.classification = classification
    },
    setClassificationFillColor: (state, playload) => {
      (state.classification.filter(item => item.value === playload.tag))[0].fillColor = playload.fillColor
    },
    setClassificationStrokeColor: (state, playload) => {
      (state.classification.filter(item => item.value === playload.tag))[0].strokeColor = playload.strokeColor
    },
    setProperty: (state, property) => {
      state.property = property
    },
    setOriginalAnnotation: (state, playload) => {
      state.originalAnnotation = playload
    },
    // 保存当前标注
    saveAnnotation: (state) => {
      const items = paper.project.getItems({
        data: {
          type: 'box'
        }
      })
      const frameData = []
      const shape = state.shape
      for (const item of items) {
        const re_tl = {
          x: Math.round(shape[1] * item.bounds.x / paper.view.viewSize.width),
          y: Math.round(shape[0] * item.bounds.y / paper.view.viewSize.height)
        }
        const re_wh = {
          x: Math.round(shape[1] * item.bounds.width / paper.view.viewSize.width),
          y: Math.round(shape[0] * item.bounds.height / paper.view.viewSize.height)
        }
        frameData.push({
          box: { x: re_tl.x, y: re_tl.y, w: re_wh.x, h: re_wh.y },
          labeled: 'GT',
          id: item.data.id,
          classId: item.data.classId,
          class: item.data.class,
          prop: item.data.prop,
          status: item.data.status,
          type: 'box'
        })
      }
      state.currentAnnotation = frameData
    },
    setState: (state, playload) => {
      state.selectedItems = []
      paper.project.deselectAll()
      state.state = playload
    },
    setAnnotationEditsFlag: (state, playload) => {
      const items = paper.project.getItems({
        data: {
          type: 'box'
        }
      })
      state.boxCount = items.length
      state.annotationEditsFlag = playload
    },
    setShape: (state, playload) => {
      state.shape = playload
    }
  },
  actions: {
    setSelectedItems: ({ commit }, playload) => {
      commit('setSelectedItems', playload)
    },
    setClassification: ({ commit }, playload) => {
      commit('setClassification', playload)
    },
    setClassificationFillColor: ({ commit }, playload) => {
      commit('setClassificationFillColor', playload)
    },
    setClassificationStrokeColor: ({ commit }, playload) => {
      commit('setClassificationStrokeColor', playload)
    },
    setProperty: ({ commit }, playload) => {
      commit('setProperty', playload)
    },
    setOriginalAnnotation: ({ commit }, playload) => {
      commit('setOriginalAnnotation', playload)
    },
    saveAnnotation: ({ commit }) => {
      commit('saveAnnotation')
    },
    setState: ({ commit }, playload) => {
      commit('setState', playload)
    },
    setAnnotationEditsFlag: ({ commit }, playload) => {
      commit('setAnnotationEditsFlag', playload)
    },
    setShape: ({ commit }, playload) => {
      commit('setShape', playload)
    }
  }
}

export default detection
