const detection = {
  namespaced: true,
  state: {
    activeLayer: 0,
    selectedItems: [],
    classification: [],
    property: [],
    projectID: '',
    projectName: ''
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
    }
  }
}

export default detection
