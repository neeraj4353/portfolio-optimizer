// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { BackIcon, DownloadIcon, TickIcon } from '../assets/svg';
import { VerticalBar } from '../components/charts/VerticalBar';
import { PieChartGoogle } from '../components/charts/PieChartGoogle';
import { convertToUSD } from '../helpers/currencyConverter';
import html2pdf from 'html2pdf.js';

import { VerticalBarChart } from '../components/charts/BarChart';
import Loader from '../components/Loader';

export default function ReviewPortfolio() {
  const views = useSelector((state: RootState) => state.views);
  const results = useSelector((state: RootState) => state.results);
  const clients = useSelector((state: RootState) => state.clients);
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [result, setResults] = useState({});
  const [currentViews, setCurrentViews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDownloadPDF = () => {
    var element = document.getElementById('downloadAsPDF');
    element.style.width = '100%';
    element.style.height = '100%';
    var opt = {
      margin: 0,
      filename: `${client.name}.pdf`,
      image: { type: 'png', quality: 1 },
      html2canvas: { scale: 1, backgroundColor: '#000000' },
      jsPDF: {
        unit: 'mm',
        format: 'b4',
        orientation: 'landscape'
        // precision: 5,
      }
    };
    // choose the element and pass it to html2pdf() function and call the save() on it to save as pdf.
    html2pdf().set(opt).from(element).save();
  };

  useEffect(() => {
    setClient(clients.filter(client => client.id === parseInt(id))[0]);
  }, [id]);

  useEffect(() => {
    let currentResult = [];

    currentResult = results.filter(
      r =>
        r?.risk === client?.latestInvestment?.riskProfile &&
        r.isConstraint === (client?.isContraint || false) &&
        r.isConfidence ===
          ((client?.isConfidence &&
            client?.latestInvestment?.riskProfile === 'balanced') ||
            false)
    )[0];

    setResults(currentResult);
  }, [client]);

  useEffect(() => {
    setCurrentViews(
      views?.filter(
        v => v?.risk === result.risk && v?.isConfidence === result?.isConfidence
      )
    );
  }, [result?.risk]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {isLoading && <Loader text="Building Optimized Portfolio..." />}

      <Header />
      <div className="review-portfolio container">
        <div className="ctas">
          <Link className="button auto" to={`/build-portfolio/${id}`}>
            <BackIcon />
            Back
          </Link>
        </div>
        <div id="downloadAsPDF" style={{ backgroundColor: '#efefef' }}>
          <h1>
            Customized Portfolio of {client?.name} for{' '}
            <span className="font-gold-new">
              {convertToUSD(client?.latestInvestment?.amount)}
            </span>
          </h1>
          <div className="rows">
            <ul className="metrics">
              <li className="cards" style={{ padding: '24px 16px' }}>
                <h3>Expected Returns</h3>
                <span>{result?.return}%</span>
              </li>
              <li className="cards" style={{ padding: '24px 16px' }}>
                <h3>Volatility</h3>
                <span>{result?.volatility}%</span>
              </li>
              <li className="cards" style={{ padding: '24px 16px' }}>
                <h3>Sharpe Ratio</h3>
                <span>{result?.sharpe}</span>
              </li>
              <li className="cards" style={{ padding: '24px 16px' }}>
                <h3>Notional Gains</h3>
                <span>
                  {convertToUSD(
                    (client?.latestInvestment?.amount * result?.return) / 100
                  )}
                </span>
              </li>
              <li className="cards" style={{ padding: '24px 16px' }}>
                <h3>Risk Tolerance</h3>
                <span style={{ textTransform: 'capitalize' }}>
                  {client?.latestInvestment?.riskProfile}
                </span>
              </li>
            </ul>
            <div className="charts-wrapper mt-4">
              <div className="bar-chart chart">
                <div className="font-gold title">
                  <span className="legend equilibrium">
                    Equilibrium Returns
                  </span>
                  Vs
                  <span className="legend optimized">Optimized Returns</span>
                </div>
                <VerticalBarChart dataset={result} />
                {/* <StackedBarChart dataset={result} /> */}
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
                      <th>Weights</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result?.weights?.map(
                      (weight, idx) =>
                        weight?.value !== 0 && (
                          <tr key={weight?.type + idx}>
                            <td>{idx + 1}</td>
                            <td>{weight?.type}</td>
                            <td>{(weight?.value * 100).toFixed(1)}%</td>
                            <td>
                              {convertToUSD(
                                (client?.latestInvestment.amount *
                                  (weight?.value * 100).toFixed(1)) /
                                  100
                              )}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="cards mt-4" style={{ padding: '24px 16px' }}>
              <h4 className="font-gold">Financial Adviser's view</h4>
              <Table striped borderless hover variant="dark">
                <tbody>
                  {currentViews?.map((cView, idx) => (
                    <tr key={cView.type + idx}>
                      <td>{idx + 1}.</td>
                      <td>{cView.type}</td>
                      <td>{cView.description}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="charts-wrapper mt-4">
              <div className="bar-chart chart">
                <div className="font-gold title">
                  Distribution by Amount ($)
                </div>
                <VerticalBar dataset={result} client={client} />
              </div>
              <div className="pie-chart chart">
                <div className="font-gold title">
                  Distribution by Weights (%)
                </div>
                <PieChartGoogle dataset={result} />
              </div>
            </div>
          </div>
        </div>
        <div className="ctas footer">
          <Link to={`/review-portfolio/${id}`} className="button auto">
            <TickIcon /> Confirm & build portfolio
          </Link>
          <button type="button" className=" auto" onClick={handleDownloadPDF}>
            <DownloadIcon /> Download as PDF
          </button>
          {/* <a
            className="button auto"
            href={`/downloads/${client?.name
              ?.toLowerCase()
              ?.replace(" ", "-")}-${result?.risk}${
              client?.isContraint ? "-ip" : ""
            }.pdf`}
            download
          >
            <DownloadIcon /> Download as PDF
          </a> */}
        </div>
      </div>
    </>
  );
}
