import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { usePagination } from '../custom-hooks/usePagination'
import '../component-styles/pagination.css';


function Pagination({ pagination, onPageChange, onPageSizeChanged }) {
    const { total, per_page, sibling_count, page } = pagination;
    const paginationRange = usePagination({ total, per_page, sibling_count, page });
    const allowedPageSizes = [10, 20, 50, 100]
    const pageItems = paginationRange.map(
        (item) => {
            if (item !== '...') {
                return (
                    <li
                        className={item === page ? 'active' : ''}
                        key={item}
                        onClick={() => onPageChange(item)}
                    >{item}
                    </li>)
            }
            return <li className="dots" key={Math.random()}>{item}</li>
        }
    );
    const sizeOptions = allowedPageSizes.map(e => <option value={e}>{e}</option>)
    if (total <= 0) {
        return;
    }
    return (
        <>
            <div className='pagination-container'>
                <ul className="pagination">
                    <li key={'<'} onClick={() => onPageChange(page - 1)} className={page === 1 ? 'disabled' : ''}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </li>
                    {pageItems}
                    <li key={'>'} onClick={() => onPageChange(page + 1)} className={page === Math.ceil(total / per_page) ? 'disabled' : ''}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </li>
                </ul>
                <div className="page-size">
                    Size:
                    <select onChange={(e) => onPageSizeChanged(e.target.value)} value={per_page}>
                        <option value="">--select--</option>
                        {sizeOptions}
                    </select>
                </div>
            </div>
        </>
    );
}

export default Pagination;
