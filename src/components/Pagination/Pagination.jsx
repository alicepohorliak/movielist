import React from 'react';
import './Paginagion.scss'

class Pagination extends React.Component {
    render() {
        const {currentPage, total_pages, onChangePage} = this.props;
        console.log('total_pages',total_pages);
        const getClassName = value => {
            return `page-item ${
                    currentPage === value ? "active" : ""
            }`
        }
        const handleClick = value => () => {
            onChangePage(value)
        };

        const pageNumbers = Array.from(Array(total_pages), (x, index) => index + 1);

        const showPageNumbers = pageNumbers.map((item, index) => {
            if (item === 1 ||
                    item === total_pages ||
                    (item >= currentPage - 2 && item <= currentPage + 2)
            ) {
                return (<li className={getClassName(item)} key={index}>
                    <span className="page-link" onClick={handleClick(item)}>{item}</span>
                </li>)
            }
        });

        // const showPageNumbers = page => {
        //     console.log('total_pages',total_pages);
        //     // for (let i = 1; i <= total_pages; i++) {
        //     //     if(page === i){
        //     //         return (
        //     //                 <li className={getClassName(page)}>
        //     //                     <span className="page-link" onClick={handleClick(page)}>{page}</span>
        //     //                 </li>
        //     //         )
        //     //     }
        //     // }
        //
        //     // const pageNumbers = [];
        //     //
        //     // for (let i = 1; i <= total_pages; i++) {
        //     //     pageNumbers.push(
        //     //             <li className={getClassName(i)}>
        //     //                 <span className="page-link" onClick={handleClick(i)}>{i}</span>
        //     //             </li>);
        //     // }
        // }

        return (
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-end">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <span className="page-link"
                                  onClick={handleClick(currentPage >= 1 ? currentPage - 1 : currentPage)}>
                                Previous
                            </span>
                        </li>

                        {showPageNumbers}
                        {/*{total_pages.map((n, i) => (*/}
                        {/*        <li className={getClassName(n)} key={i}>*/}
                        {/*            <span className="page-link" onClick={handleClick(n)}>*/}
                        {/*                {n}*/}
                        {/*            </span>*/}
                        {/*        </li>*/}
                        {/*    )*/}
                        {/*)}*/}

                        {/*<li className={getClassName(currentPage)}>*/}
                        {/*    <span className="page-link" onClick={handleClick(currentPage)}>{currentPage}</span>*/}
                        {/*</li>*/}

                        <li className={`page-item ${currentPage === total_pages ? 'disabled' : ''}`}>
                            <span className="page-link"
                                  onClick={handleClick(currentPage !== total_pages ? currentPage + 1 : currentPage)}>
                                Next
                            </span>
                        </li>
                    </ul>
                </nav>
        )
    }
}

export default Pagination;
