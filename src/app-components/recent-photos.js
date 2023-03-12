import { useState, useEffect, useMemo } from "react";

import { getRecentPhotos } from '../flicker-api/flicker-api';
import useGetPhotos from "../custom-hooks/useGetPhotos";
import {
    useSearchParams
} from "react-router-dom";
import Loader from "../generic-components/loader";
import Photo from "./photo";
import Pagination from '../generic-components/pagination';

import '../component-styles/photos.css';

function RecentPhotos() {
    const [photos, setPhotos] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const per_page = searchParams.get('per_page') || localStorage.getItem('per_page') || 20;
    const sibling_count = 1;
    const page = 1;
    const defaultPagination = { total: 0, per_page, sibling_count, page };
    const [pagination, setPagination] = useState(defaultPagination);

    const url = useMemo(() => {
        const params = { page: searchParams.get('page'), per_page: searchParams.get('per_page') };
        return getRecentPhotos(params);
    }, [searchParams]);
    const { loading, data, error } = useGetPhotos(url);
    console.log(error);

    useEffect(() => {
        if (data) {
            setPhotos(data.photos.photo);
            setSearchParams({ page: data.photos.page, per_page: data.photos.perpage });
            const tempPagination = {
                per_page: data.photos.perpage,
                page: data.photos.page,
                total: data.photos.total,
                sibling_count: pagination.sibling_count
            }
            setPagination(tempPagination);
        }
        return () => {
            console.log('unmounted');
        }
    }, [data, pagination.sibling_count, setSearchParams])

    const pageChanged = (page) => {
        const tempPagination = {
            per_page: pagination.per_page,
            page: page,
            total: pagination.total,
            sibling_count: pagination.sibling_count
        }
        setSearchParams({ page: page, per_page: pagination.per_page });
        setPagination(tempPagination);
    };
    const onPageSizeChanged = (size) => {
        const tempPagination = {
            per_page: size,
            page: 1,
            total: pagination.total,
            sibling_count: pagination.sibling_count
        }
        setSearchParams({ per_page: size, page: 1 });
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
        );
    } else {
        return (
            <>
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

export default RecentPhotos;
