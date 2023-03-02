import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { convertToUSD } from '../helpers/currencyConverter';
import content from './content.json';

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="dashboard container">
        <h1 className="font-gold">Financial Adviser Dashboard</h1>
        <ul className="metrics">
          <li className="cards">
            <h3>Asset Under Management</h3>
            <span>{convertToUSD(1650000)}</span>
          </li>
          <li className="cards">
            <h3>Number of Investors</h3>
            <span>3</span>
          </li>
          <li className="cards">
            <h3>Average Time Horizon</h3>
            <span>5 Years</span>
          </li>
          <li className="cards">
            <h3>Average Customer Rating</h3>
            <span>4.5/5</span>
          </li>
          {/* <li className="cards">
            <h3>Notional Gains</h3>
            <span>-</span>
          </li>
          <li className="cards">
            <h3>Risk Tolerance</h3>
            <span style={{ textTransform: "capitalize" }}>-</span>
          </li> */}
        </ul>
        <h4 className="font-gold">Here are the list of investors</h4>
        <ul>
          {content.clients.map((client, index) => {
            return (
              <li className="cards" key={client?.name}>
                {/* {index === 0 && (
                  <div className="badge badge-secondary">NEW</div>
                )} */}
                <div className="peronal-info">
                  <img
                    alt={`client ${index}`}
                    src={client.image}
                    style={{ borderRadius: '50%' }}
                    height={150}
                    width={150}
                  />
                  <span className="client-name">{client.name}</span>
                  <span className="client-email">{client.email}</span>
                  <span className="client-phone">{client.phone}</span>
                </div>
                <div className="investments">
                  <span className="feature-title">Total Invested Amount</span>
                  <span className="feature-value">
                    {convertToUSD(client.totalInvestedAmount)}
                  </span>
                </div>
                <div>
                  {/* <div className="feature-title">Latest Investment</div> */}
                  <div className="investment-profile">
                    <div className="feature-field">
                      <span className="feature-title">Proposed Investment</span>
                      <span className="feature-value">
                        {convertToUSD(client?.latestInvestment?.amount)}
                      </span>
                    </div>
                    <div className="feature-field">
                      <span className="feature-title">Time Horizon</span>
                      <span className="feature-value">
                        {client?.latestInvestment?.timeHorizon} Years
                      </span>
                    </div>
                    <div className="feature-field">
                      <span className="feature-title">Risk Tolerance</span>
                      <span
                        className="feature-value"
                        style={{ textTransform: 'capitalize' }}
                      >
                        {client?.latestInvestment?.riskProfile}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="cta">
                  <button>View Details</button>
                  <Link
                    to={`/initial-portfolio/${client?.id}`}
                    className="button"
                  >
                    Build Portfolio
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
