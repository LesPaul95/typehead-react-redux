export const createSearchImagesStartAction = () => ({
    type: 'SEARCH_IMAGES_START'
})

export const createSearchImagesSuccessAction = (images) => ({
    type: 'SEARCH_IMAGES_SUCCESS',
    payload: images
})

export const createSearchImagesFailureAction = () => ({
    type: 'SEARCH_IMAGES_FAILURE'
})
