// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { VerticalBar } from '../components/charts/VerticalBar';
import { PieChartGoogle } from '../components/charts/PieChartGoogle';
import { convertToUSD } from '../helpers/currencyConverter';
import { VerticalBarChart } from '../components/charts/BarChart';
import { BackIcon, NextIcon } from '../assets/svg';
import Loader from '../components/Loader';

export default function ReviewPortfolio() {
  const results = useSelector((state: RootState) => state.initialResults);
  const clients = useSelector((state: RootState) => state.clients);
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [result, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const volatility2 = [
    {
      type: 'US Large Cap Growth',
      value: 4.49
    },
    {
      type: 'Intl Developed ex-US Market',
      value: 3.897067
    },

    {
      type: 'Emerging Markets',
      value: 9.135833
    },
    {
      type: 'US Mid Cap Growth',
      value: 2.959733
    },
    {
      type: 'US Small Cap Growth',
      value: 3.5316
    },
    {
      type: 'US Small Cap Value',
      value: 3.206733
    },
    {
      type: 'Global Bonds (Unhedged)',
      value: 0.693733
    },
    {
      type: 'Total US Bond Market',
      value: 0.183333
    }
  ];

  useEffect(() => {
    setClient(clients.filter(client => client.id === parseInt(id))[0]);
  }, [id]);

  useEffect(() => {
    const currentResult = results.filter(
      r => r?.risk === client?.latestInvestment?.riskProfile
    )[0];

    setResults(currentResult);
  }, [client]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {isLoading && <Loader text="Building Standard Portfolio..." />}
      <Header />
      <div className="review-portfolio container" id="downloadAsPDF">
        <div className="ctas">
          <Link className="button auto" to={`/dashboard`}>
            <BackIcon />
            Back
          </Link>
        </div>
        <h1>
          Standard Portfolio of {client?.name} for{' '}
          <span className="font-gold-new">
            {convertToUSD(client?.latestInvestment?.amount)}
          </span>
        </h1>
        <div className="rows">
          <ul className="metrics">
            <li className="cards">
              <h3>Expected Returns</h3>
              <span>{result?.return}%</span>
            </li>
            <li className="cards">
              <h3>Volatility</h3>
              <span>{result?.volatility}%</span>
            </li>
            <li className="cards">
              <h3>Sharpe Ratio</h3>
              <span>{result?.sharpe}</span>
            </li>
            <li className="cards">
              <h3>Notional Gains</h3>
              <span>
                {convertToUSD(
                  (client?.latestInvestment?.amount * result?.return) / 100
                )}
              </span>
            </li>
            <li className="cards">
              <h3>Risk Tolerance</h3>
              <span style={{ textTransform: 'capitalize' }}>
                {client?.latestInvestment?.riskProfile}
              </span>
            </li>
          </ul>
          <div className="charts-wrapper mt-4">
            <div className="bar-chart chart">
              <div className="font-gold title">Equilibrium Returns</div>
              <VerticalBarChart dataset={result} initialResults />
            </div>
            <div className="view-result bar-chart chart">
              <div className="font-gold title">
                Distribution of investment amount by weights (%)
              </div>
              <Table
                striped
                borderless
                hover
                variant="dark"
                size="sm"
                className="mt-2"
              >
                <thead>
                  <tr style={{ color: '#c7ad77' }}>
                    <th>#</th>
                    <th>Product/Market</th>
                    <th style={{ textAlign: 'center' }}>Weights</th>
                    <th style={{ textAlign: 'center' }}>Amount</th>
                    {/* <th>Asset Weights</th> */}
                    <th style={{ textAlign: 'center' }}>Volitility</th>
                  </tr>
                </thead>
                <tbody>
                  {result?.weights?.map((weight, idx) => (
                    <tr key={weight?.type + idx}>
                      <td>{idx + 1}</td>
                      <td>{weight?.type}</td>
                      <td align="center">
                        {(weight?.value * 100).toFixed(1)}%
                      </td>
                      <td align="center">
                        {convertToUSD(
                          (client?.latestInvestment.amount *
                            (weight?.value * 100).toFixed(1)) /
                            100
                        )}
                      </td>
                      {/* <td align="center">
                        {(
                          volatility.filter(
                            (vol) => vol.type === weight?.type
                          )[0].value * 100
                        ).toFixed(2)}
                        %
                      </td> */}
                      <td align="center">
                        {volatility2
                          .filter(vol => vol.type === weight?.type)[0]
                          .value.toFixed(2)}
                        %
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="charts-wrapper mt-4">
            <div className="bar-chart chart">
              <div className="font-gold title">Distribution by Amount ($)</div>
              <VerticalBar dataset={result} client={client} />
            </div>
            <div className="pie-chart chart">
              <div className="font-gold title">Distribution by Weights (%)</div>
              <PieChartGoogle dataset={result} />
            </div>
          </div>
        </div>

        <div className="ctas footer">
          <Link to={`/build-portfolio/${id}`} className="button auto">
            Continue to customize portfolio <NextIcon />
          </Link>
        </div>
      </div>
    </>
  );
}
