// @ts-nocheck
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Trash } from '../assets/svg';

export default function ViewList({
  viewList,
  clientData,
  handleShowView,
  toggleClientConfidence
}) {
  const [views, setViews] = useState([]);

  useEffect(() => {
    setViews(
      viewList?.filter(
        view =>
          (view?.risk).toLowerCase() ===
            clientData?.latestInvestment?.riskProfile &&
          view?.isConfidence ===
            ((clientData?.isConfidence &&
              clientData?.latestInvestment?.riskProfile === 'balanced') ||
              false)
      )
    );
  }, [
    viewList,
    clientData?.latestInvestment?.riskProfile,
    clientData?.isConfidence
  ]);
  return (
    <>
      <Table className="views-table" striped borderless hover variant="dark">
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th style={{ textAlign: 'center', width: 180 }}>
              {clientData.id === 1 &&
                clientData.latestInvestment.riskProfile === 'balanced' && (
                  <input
                    type="checkbox"
                    checked={clientData.isConfidence}
                    onChange={toggleClientConfidence}
                    style={{ marginRight: 4 }}
                  />
                )}
              Confidence Level
            </th>
            <th style={{ textAlign: 'center', width: 120 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {views.map((view, index) => (
            <tr key={view.type + index}>
              <td>{view.type}</td>
              <td>{view.description}</td>
              <td align="center">{view.confidenceLevel}%</td>
              <td align="center">
                <Trash color="#000" />
              </td>
            </tr>
          ))}
          {views.length === 0 ? (
            <tr>
              <td colSpan={5} align="center" style={{ padding: 36 }}>
                <button type="button" className="auto" onClick={handleShowView}>
                  Add View
                </button>
              </td>
            </tr>
          ) : null}
        </tbody>
      </Table>
    </>
  );
}
