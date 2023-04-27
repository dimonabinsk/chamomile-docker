import { useMemo } from "react";
import PropTypes from "prop-types";

const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;
  /*Создайте массив определенной длины и установите элементы
       внутри него из начальное значение к конечному значению
  */

  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({ totalCount, pageSize, siblingCount, currentPage }) => {
  const paginationRange = useMemo(() => {
    // Наша логика реализации будет идти здесь
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Количество страниц определяется как количество родственных страниц + первая страница + Последняя страница + Текущая страница + 2 * ТОЧКИ
    const totalPageNumbers = siblingCount + 5;
    /*
        Случай 1:
        Если количество страниц меньше, чем номера страниц, которые мы хотим показать в нашем
        компонент разбиения на страницы, мы возвращаем диапазон [1..totalPageCount]
*/
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
        Вычислите индекс левого и правого братьев и убедитесь, что они находятся в пределах диапазона 1 и totalPageCount
*/
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
        Мы не показываем точки только тогда, когда нужно вставить только один номер страницы между крайними значениями sibling и пределами страницы, то есть 1 и totalPageCount. Следовательно, мы используем индекс левого брата > 2 и индекс правого брата < общее количество страниц - 2
*/

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
        Случай 2: Не отображаются точки слева, но отображаются точки справа.
*/
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
    	Случай 3: правые точки не отображаются, но должны отображаться левые точки.
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
    	Случай 4: Должны быть показаны как левые, так и правые точки.
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

usePagination.propTypes = {
  totalCount: PropTypes.number,
  pageSize: PropTypes.number,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number,
};

usePagination.defaultProps = {
  siblingCount: 1,
};

export { usePagination, DOTS };
