import paper from 'paper'
const detection = {
  namespaced: true,
  state: {
    activeLayer: 0,
    selectedItems: [],
    classification: [],
    property: [],
    projectID: '',
    projectName: '',
    originalAnnotation: null,
    state: 'edit',
    currentAnnotation: null,
    annotationEditsFlag: false,
    shape: []
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
    saveAnnotation: (state) => {
      const items = paper.project.getItems({
        className: function(className) {
          return (className === 'Path')
        }
      })
      const frameData = []
      const shape = state.originalAnnotation.shape
      // console.log(shape)
      // console.log(shape[1])
      // console.log(paper.view.viewSize.width)
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
          itemTextUtf8: item.data.class,
          prop: item.data.prop,
          status: item.data.status
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
