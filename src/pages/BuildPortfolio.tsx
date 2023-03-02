// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AbsoluteView from '../components/AbsoluteView';
import { BackIcon, NextIcon } from '../assets/svg';
import RelativeView from '../components/RelativeView';
import ViewList from '../components/ViewList';

import type { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../features/views';
import {
  update,
  addConstraint,
  removeConstraint,
  toggleConfidence
} from '../features/clients';
import ProductList from '../components/ProductList';
import { PRODUCT_LIST } from '../helpers/constants';

export default function BuildPortfolio() {
  const { id } = useParams();
  const views = useSelector((state: RootState) => state.views);
  const constraints = useSelector((state: RootState) => state.constraints);
  const clients = useSelector((state: RootState) => state.clients);
  const dispatch = useDispatch();
  const [client, setClient] = useState({});
  const [clientConstraint, setClientConstraint] = useState({});
  const [show, setShow] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showProductList, setShowProductList] = useState(false);
  const [customRisk, setCustomRisk] = useState(null);
  const [view, setView] = useState('absolute');
  const [showPreference, setShowPreference] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const currentClient = clients.filter(client => client.id === parseInt(id))[0];

  const handleAddPreference = () => {
    setShowPreference(true);
    const filteredConstraints = constraints.filter(
      constraint =>
        constraint?.risk === currentClient?.latestInvestment?.riskProfile
    )[0];

    setClientConstraint(filteredConstraints);
    dispatch(addConstraint(id));
  };

  const handleRemovePreference = () => {
    setShowPreference(false);
    setClientConstraint({});
    dispatch(removeConstraint(id));
  };

  const toggleClientConfidence = () => {
    dispatch(toggleConfidence(id));
  };

  useEffect(() => {
    dispatch(reset());
    const client = clients.filter(client => client.id === parseInt(id))[0];
    setClient(client);
    if (currentClient.isContraint) {
      handleAddPreference();
    }
  }, [id]);

  return (
    <>
      <Header />
      <div className="build-portfolio container">
        <div className="ctas">
          <Link className="button auto" to={`/initial-portfolio/${id}`}>
            <BackIcon />
            Back
          </Link>
        </div>
        <h1>Build Portfolio for {client?.name}</h1>
        <div className="top-section">
          <div className="investment-details cards">
            <h4 className="font-gold">Investment Details</h4>

            <Formik
              enableReinitialize
              initialValues={{
                amount: client?.latestInvestment?.amount || 0,
                time: client?.latestInvestment?.timeHorizon || 0,
                risk: client?.latestInvestment?.riskProfile || ''
              }}
              onSubmit={values => {
                handleLogin(values);
              }}
            >
              {({ handleChange }) => (
                <Form>
                  <label>
                    <span> Investment Amount (in $)</span>
                    <Field
                      type="number"
                      name="amount"
                      placeholder="Investment Amount"
                    />
                    <ErrorMessage
                      className="error-message"
                      name="amount"
                      component="div"
                    />
                  </label>
                  <label>
                    <span>Time Horizon (in Years)</span>
                    <Field
                      type="number"
                      name="time"
                      placeholder="Time Horizon"
                    />
                    <ErrorMessage
                      className="error-message"
                      name="time"
                      component="div"
                    />
                  </label>
                  <label>
                    <span>Risk Tolerance</span>
                    <div className="select" style={{ marginTop: 4 }}>
                      <Field
                        as="select"
                        name="risk"
                        onChange={e => {
                          setCustomRisk(e.target.value);
                          setShowWarning(true);
                          handleChange(e);
                        }}
                      >
                        <option value="balanced">Balanced</option>
                        <option value="aggressive">Aggressive</option>
                        <option value="conservative">Conservative</option>
                      </Field>
                    </div>
                    <ErrorMessage
                      className="error-message"
                      name="risk"
                      component="div"
                    />
                  </label>
                </Form>
              )}
            </Formik>
          </div>
          <div className="investor-preference cards">
            <div className="heading-cta">
              <h4 className="font-gold">Investor Preference</h4>
              <div className="ctas">
                {!showPreference ? (
                  <button className="auto small" onClick={handleAddPreference}>
                    Add Preference
                  </button>
                ) : (
                  <button
                    className="auto small"
                    onClick={handleRemovePreference}
                  >
                    Remove Preference
                  </button>
                )}
              </div>
            </div>
            <div className="content">
              {!showPreference && (
                <div className="preference">
                  <span>1. </span>
                  <span>Invest</span>
                  <span className="percentage-value">
                    <input
                      type="number"
                      name="percentage"
                      placeholder="%"
                      defaultValue={0}
                    />
                    <span className="font-gold">%</span>
                  </span>
                  <span>in</span>
                  <div className="select">
                    <select name="product">
                      <option value="">-- Select Product --</option>
                      {PRODUCT_LIST.map(product => (
                        <option key={product} value={product}>
                          {product}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              {clientConstraint?.constraints?.map((con, index) => (
                <div className="preference" key={index}>
                  <span>{index + 1}. </span>
                  <span>Invest</span>
                  <span className="percentage-value">
                    <input
                      type="number"
                      name="percentage"
                      placeholder="%"
                      defaultValue={con.percentage * 100}
                    />
                    <span className="font-gold">%</span>
                  </span>
                  <span>in</span>
                  <div className="select">
                    <select name="product" defaultValue={con.product}>
                      <option value="">-- Select --</option>
                      {PRODUCT_LIST.map(product => (
                        <option key={product} value={product}>
                          {product}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mid-section">
          <div className="cards rm-view-table">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20
              }}
            >
              <h4 className="font-gold">Financial Adviser's View</h4>
              <div className="ctas">
                <button
                  type="button"
                  className="auto"
                  onClick={() => {
                    setShowProductList(true);
                  }}
                >
                  View Product list
                </button>
                {views.length !== 0 && (
                  <button type="button" className="auto" onClick={handleShow}>
                    Add View
                  </button>
                )}
              </div>
            </div>
            <ViewList
              viewList={views}
              clientData={currentClient}
              handleShowView={handleShow}
              toggleClientConfidence={toggleClientConfidence}
            />
          </div>
        </div>
        <div className="ctas footer">
          <Link to={`/review-portfolio/${id}`} className="button auto">
            Continue & Review Portfolio <NextIcon />
          </Link>
        </div>

        <Modal isOpen={show} toggle={handleClose}>
          <ModalHeader toggle={handleClose}>Add New View</ModalHeader>
          <ModalBody>
            <ul className="pills">
              <li
                onClick={() => setView('absolute')}
                className={view === 'absolute' ? 'active' : ''}
              >
                Absolute
              </li>
              <li
                onClick={() => setView('relative')}
                className={view === 'relative' ? 'active' : ''}
              >
                Relative
              </li>
            </ul>
            <div className="view-wrapper">
              {view === 'absolute' ? (
                <AbsoluteView client={currentClient} />
              ) : (
                <RelativeView client={currentClient} />
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" onClick={handleClose}>
              Add
            </button>
            <button className="secondary" onClick={handleClose}>
              Close
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={showWarning}>
          <ModalHeader>Message</ModalHeader>
          <ModalBody>
            <div>
              Are you sure you want to change the Risk Tolerence for this
              client?
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              onClick={() => {
                dispatch(update({ id, risk: customRisk }));
                setShowWarning(false);
                handleRemovePreference();
                dispatch(removeConstraint(id));
              }}
            >
              Yes
            </button>
            <button className="secondary" onClick={() => setShowWarning(false)}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={showProductList}>
          <ModalHeader className="font-gold">Product List</ModalHeader>
          <ModalBody>
            <ProductList />
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              onClick={() => {
                setShowProductList(false);
              }}
            >
              Close
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
