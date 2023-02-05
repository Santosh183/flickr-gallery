import { useMemo } from "react";
export const usePagination = ({
    total,
    per_page,
    sibling_count = 1,
    page
}) => {
    const range = (start, end) => {
        const range = [];
        for (var i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };
    const paginationRange = useMemo(() => {
        const totalPages = Math.ceil(total / per_page);
        if (totalPages < sibling_count + 3) // we need 1 for first page , 1 for current page and 1 for last page
        {
            return range(1, totalPages);
        }
        const left = range(2, page - 1); // 1 is reseved hence 2
        const right = range(page + 1, totalPages - 1); // totalPages - 1 as last one is reserved
        const leftSiblings = range(Math.max(page - sibling_count, 2), page - 1);
        const rightSiblings = range(page + 1, Math.min(page + sibling_count, totalPages - 1));
        const showLeftDots = (left.length - leftSiblings.length) > 2;
        const showRightDots = (right.length - rightSiblings.length) > 2;
        const finalRange = [];
        finalRange.push(1);
        if (showLeftDots) {
            finalRange.push('...')
        }
        if (leftSiblings.length > 0) {
            finalRange.push(...leftSiblings)
        }
        if (![1, totalPages].includes(page)) {
            finalRange.push(page)
        }
        if (rightSiblings.length > 0) {
            finalRange.push(...rightSiblings)
        }
        if (showRightDots) {
            finalRange.push('...')
        }
        finalRange.push(totalPages);

        return finalRange;

    }, [total, per_page, sibling_count, page]);

    return paginationRange;
};