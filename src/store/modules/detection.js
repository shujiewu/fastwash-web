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
    currentAnnotation: null
  },
  mutations: {
    setSelectedItems: (state, selectedItems) => {
      state.selectedItems = selectedItems
    },
    setClassification: (state, classification) => {
      state.classification = classification
    },
    setClassificationFillColor: (state, payload) => {
      (state.classification.filter(item => item.value === payload.tag))[0].fillColor = payload.fillColor
    },
    setClassificationStrokeColor: (state, payload) => {
      (state.classification.filter(item => item.value === payload.tag))[0].strokeColor = payload.strokeColor
    },
    setProperty: (state, property) => {
      state.property = property
    },
    setOriginalAnnotation: (state, payload) => {
      state.originalAnnotation = payload
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
          prop: item.data.prop
        })
      }
      state.currentAnnotation = frameData
    },
    setState: (state, payload) => {
      state.state = payload
    }
  },
  actions: {
    setSelectedItems: ({ commit }, payload) => {
      commit('setSelectedItems', payload)
    },
    setClassification: ({ commit }, payload) => {
      commit('setClassification', payload)
    },
    setClassificationFillColor: ({ commit }, payload) => {
      commit('setClassificationFillColor', payload)
    },
    setClassificationStrokeColor: ({ commit }, payload) => {
      commit('setClassificationStrokeColor', payload)
    },
    setProperty: ({ commit }, payload) => {
      commit('setProperty', payload)
    },
    setOriginalAnnotation: ({ commit }, payload) => {
      commit('setOriginalAnnotation', payload)
    },
    saveAnnotation: ({ commit }) => {
      commit('saveAnnotation')
    },
    setState: ({ commit }, payload) => {
      commit('setState', payload)
    }
  }
}

export default detection
