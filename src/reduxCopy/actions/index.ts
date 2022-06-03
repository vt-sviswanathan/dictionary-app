export const getDefinitions = () => {
    return {
        type: 'GET_DEFINITIONS_REQUESTED',
    }
}

export const setDefinitionWord = (defWord: string) =>
    ({
        type: 'SET_WORD',
        defWord,
    } as const)

export const getDefinitionWord = () => {
    return {
        type: 'GET_WORD',
    }
}

