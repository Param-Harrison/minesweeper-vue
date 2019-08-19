const state = {
    bombIcon: require('../../assets/bomb.png'),
    flagIcon: require('../../assets/flag.png')
}
const getters = {
    bombIcon(state) {
        return state.bombIcon
    },
    flagIcon(state) {
        return state.flagIcon
    },
    pattern(state, getters, { gridPattern }) {
        return gridPattern.minesPattern;
    }
}
const actions = {
    openSquare({ getters, commit, rootState }, { row, col }) {
        let squareTarget = getters.pattern[row][col];
        commit("changeSquareShow", squareTarget);

        if (squareTarget.bomb) {
            commit("endGame", rootState)
        }
    },
    flagSquare({ getters, commit }, { row, col }) {
        let squareTarget = getters.pattern[row][col];
        commit("changeSquareFlagged", squareTarget);
    }
};
const mutations =  {
    changeSquareShow(_, squareTarget) {
        squareTarget.show = true; 
    },
    changeSquareFlagged(_, squareTarget) {
        squareTarget.flagged = !squareTarget.flagged;
    },
    endGame(_, rootState) {
        rootState.mainGame.lose = true
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};