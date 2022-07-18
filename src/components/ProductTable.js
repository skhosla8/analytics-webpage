import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortData } from '../redux/reducers/productsSlice';

function ProductTable() {
  const [order, setOrder] = useState(false);

  const data = useSelector(state => state.products.productsCopy[0]);
  const sales = data && data.sales;

  const dispatch = useDispatch();

  const formatDate = (date) => {
    let dateString = date;
    dateString = `${dateString.substr(5, 2)}-${dateString.substr(8, 2)}-${dateString.substr(0, 4)}`;

    return dateString;
  };

  const sort = (data, col) => {
    let sorted;

    if (col === 'weekEnding') {
      if (!order) {
        sorted = [...data].sort((a, b) => new Date(b[col]) - new Date(a[col]));
        setOrder(true)
      } else {
        sorted = [...data].sort((a, b) => new Date(a[col]) - new Date(b[col]));
        setOrder(false);
      }
    } else {
      if (!order) {
        sorted = [...data].sort((a, b) => a[col] - b[col]);
        setOrder(true);
      } else {
        sorted = [...data].sort((a, b) => b[col] - a[col]);
        setOrder(false)
      }
    }

    dispatch(sortData({ sorted }));
  };

  const renderedTableData = sales && sales.map((item, i) => (
    <tr key={i}>
      <td>{formatDate(item.weekEnding)}</td>
      <td>${item.retailSales}</td>
      <td>${item.wholesaleSales}</td>
      <td>{item.unitsSold}</td>
      <td>${item.retailerMargin}</td>
    </tr>
  ));

  return (
    <div className="product-table">
      <table>
        <thead>
          <tr>
            <th onClick={() => sort(sales, 'weekEnding')}>Week Ending <i className="fa-solid fa-angle-down fa-sm"></i></th>
            <th onClick={() => sort(sales, 'retailSales')}>Retail Sales <i className="fa-solid fa-angle-down fa-sm"></i></th>
            <th onClick={() => sort(sales, 'wholesaleSales')}>Wholesale Sales <i className="fa-solid fa-angle-down fa-sm"></i></th>
            <th onClick={() => sort(sales, 'unitsSold')}>Units Sold <i className="fa-solid fa-angle-down fa-sm"></i></th>
            <th onClick={() => sort(sales, 'retailerMargin')}>Retailer Margin <i className="fa-solid fa-angle-down fa-sm"></i></th>
          </tr>
        </thead>

        <tbody>
          {renderedTableData}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable;
