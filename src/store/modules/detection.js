const detection = {
  namespaced: true,
  state: {
    activeLayer: 0,
    selectedItems: [],
    classification: [{
      value: 'vehicle',
      label: 'vehicle',
      fillColor: '',
      strokeColor: ''
    }, {
      value: 'vehicle2',
      label: 'vehicle2',
      fillColor: '',
      strokeColor: ''
    }, {
      value: 'vehicle3',
      label: 'vehicle3',
      fillColor: '',
      strokeColor: ''
    }],
    property: []
  },
  mutations: {
    setSelectedItems: (state, selectedItems) => {
      state.selectedItems = selectedItems
    }
  },
  actions: {
    setSelectedItems: ({ commit }, payload) => {
      commit('setSelectedItems', payload)
    }
  }
}

export default detection
