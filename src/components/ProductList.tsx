// @ts-nocheck
import Table from 'react-bootstrap/Table';
import { PRODUCT_LIST } from '../helpers/constants';
import { Link } from 'react-router-dom';

export default function ProductList() {
  return (
    <div className="product-list">
      <Table striped borderless hover variant="dark" size="sm">
        {/* <thead>
          <tr>
            <th colSpan={3}>
              <h4
                className="font-gold"
                style={{ paddingLeft: "16px", margin: 0 }}
              >
                Product list
              </h4>
            </th>
          </tr>
        </thead> */}
        <tbody>
          {PRODUCT_LIST.map((product, idx) => (
            <tr key={product}>
              <td>{idx + 1}</td>
              <td>
                <Link style={{ color: '#6c6c6c' }} to={'#'}>
                  {product}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
