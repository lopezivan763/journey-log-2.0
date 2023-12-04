export const getSavedPlacesIds = () => {
    const savedPlaceIds = localStorage.getItem('saved_places')
    ? JSON.parse(localStorage.getItem('saved_books'))
    :[];

    return savedPlaceIds;
};

export const savePlaceIds = (placeIdArr) => {
    if (placeIdArr.length) {
        localStorage.setItem('saved_places', JSON.stringify(placeIdArr));
    } else {
        localStorage.removeItem('saved_places');
    }
};

export const removePlaceId = (placeId) => {
    const savedPlaceIds = localStorage.getItem('saved_places')
    ? JSON.parse(localStorage.getItem('saved_places'))
    : null;

    if(!savedPlaceIds) {
        return false;
    }

    const updatedSavedPlaceIds = savedPlaceIds?.filter((savedPlaceId) => savedPlaceId !== placeId);
    localStorage.setItem('saved_places', JSON.stringify(updatedSavedPlaceIds));

    return true;
};