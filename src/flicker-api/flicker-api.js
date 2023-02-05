import axios from "axios";
const baseURL = "https://api.flickr.com/services/rest/?api_key=2227650d7f2930b631ceea94e3dc4ca6&nojsoncallback=1";

export const getRecentPhotos = (params) => {
    const per_page = params.per_page || localStorage.getItem('per_page') || 20;
    const page = params.page || 1;
    const method = 'flickr.photos.getRecent';
    const url = `${baseURL}&method=${method}&format=json&per_page=${per_page}&page=${page}`;
    return axios.get(url, { headers: { 'Content-Type': 'application/json' } });
}
export const getTaggedPhotos = (params) => {
    const per_page = params.per_page || localStorage.getItem('per_page') || 20;
    const page = params.page || 1;
    const tags = params.tags || undefined;
    const method = tags?.trim().length > 0 ? 'flickr.photos.search' : 'flickr.photos.getRecent';
    const url = `${baseURL}&method=${method}&tags=${tags}&format=json&per_page=${per_page}&page=${page}`;
    return axios.get(url, { headers: { 'Content-Type': 'application/json' } });
}