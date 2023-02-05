import { useState, useEffect } from "react";
import { getTaggedPhotos } from '../flicker-api/flicker-api';
import {
    useSearchParams
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Loader from "../generic-components/loader";
import Photo from "./photo";
import Pagination from "../generic-components/pagination";



function TaggedPhotos() {
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const per_page = searchParams.get('per_page') || localStorage.getItem('per_page') || 20;
    const sibling_count = 1;
    const page = 1;
    const defaultPagination = { total: 0, per_page, sibling_count, page };
    const [pagination, setPagination] = useState(defaultPagination);
    const [searchText, setSearchText] = useState('');


    useEffect(
        () => {
            const params = {
                page: searchParams.get('page'),
                per_page: searchParams.get('per_page'),
                tags: searchParams.get('tags') || ''
            }
            getTaggedPhotos(params).then(
                (res) => {
                    setPhotos(res.data.photos.photo);
                    setSearchParams({ tags: params.tags, page: res.data.photos.page, per_page: res.data.photos.perpage });
                    const tempPagination = {
                        per_page: res.data.photos.perpage,
                        page: res.data.photos.page,
                        total: res.data.photos.total,
                        sibling_count: pagination.sibling_count
                    }
                    setPagination(tempPagination);
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            ).finally(
                () => {
                    setLoading(false);
                }
            )
        },
        [searchParams, pagination.sibling_count, setSearchParams]
    )
    const onSearch = (e) => {
        e.preventDefault();

        const tempPagination = {
            per_page: pagination.per_page,
            page: 1,
            total: pagination.total,
            sibling_count: pagination.sibling_count
        }
        const tags = searchText.trim();
        setSearchParams({ per_page, page: 1, tags });
        setPagination(tempPagination);
    };
    const pageChanged = (page) => {
        const tempPagination = {
            per_page: pagination.per_page,
            page: page,
            total: pagination.total,
            sibling_count: pagination.sibling_count
        }
        setSearchParams({ page: page, per_page: pagination.per_page, tags: searchParams.get('tags') });
        setPagination(tempPagination);
    };
    const onPageSizeChanged = (size) => {
        const tempPagination = {
            per_page: size,
            page: 1,
            total: pagination.total,
            sibling_count: pagination.sibling_count
        }
        setSearchParams({ per_page: size, page: 1, tags: searchParams.get('tags') });
        setPagination(tempPagination);
        localStorage.setItem('per_page', size);
    }
    const images = photos.map(
        (photo) => <Photo key={photo.id} photo={photo} />
    );

    if (loading) {
        return (
            <div className="loader-container">
                <Loader />
            </div>
        )
    } else {
        return (
            <>
                <form onSubmit={(e) => onSearch(e)}>
                    <div className="search-container">
                        <input placeholder="Search by tags" onInput={e => setSearchText(e.target.value)} type={'text'} />
                        <button type="submit" disabled={searchText.trim() === '' ? 'disabled' : ''}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>

                </form>
                <div className="photos">
                    {images}
                </div>
                <Pagination
                    pagination={pagination}
                    onPageChange={page => pageChanged(page)}
                    onPageSizeChanged={size => onPageSizeChanged(size)}
                />
            </>
        )
    }
}

export default TaggedPhotos;
