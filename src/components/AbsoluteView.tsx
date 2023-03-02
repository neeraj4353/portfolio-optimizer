// @ts-nocheck
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addViewValidation } from '../helpers/validationSchemas';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function AbsoluteView({ client }) {
  const views = useSelector(state => state.views);
  const [absoluteView, setAbsoluteView] = useState(null);
  const [viewNumber, setViewNumber] = useState(0);
  const [view, setView] = useState([]);

  useEffect(() => {
    setView(
      views?.filter(
        view =>
          (view?.risk).toLowerCase() ===
            client?.latestInvestment?.riskProfile &&
          view?.isConfidence ===
            ((client?.isConfidence &&
              client?.latestInvestment?.riskProfile === 'balanced') ||
              false) &&
          (view?.type).toLowerCase() === 'absolute'
      )
    );
  }, [views, client?.latestInvestment?.riskProfile, client?.isConfidence]);

  const handleSetView = (view, idx) => {
    setAbsoluteView({
      product: view.product,
      movement: view.movement,
      percentage: view.percentage,
      confidenceLevel: view.confidenceLevel
    });
    setViewNumber(idx);
  };
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          product: absoluteView?.product || '',
          movement: absoluteView?.movement || '',
          percentage: absoluteView?.percentage || '',
          confidence: absoluteView?.confidenceLevel || ''
        }}
        validationSchema={addViewValidation}
        onSubmit={values => {
          handleSaveView(values);
        }}
      >
        <Form>
          <div className="views-btn-wrapper">
            {view?.map((v, i) => (
              <button
                key={`view${i + 1}`}
                type="button"
                className="small"
                onClick={() => handleSetView(v, i + 1)}
                disabled={viewNumber === i + 1}
              >
                View {i + 1}
              </button>
            ))}
          </div>
          <label>
            Products
            <div className="select">
              <Field as="select" name="product">
                <option value="">-- Select --</option>
                <option value="US Large Cap Value">US Large Cap Value</option>
                <option value="US Large Cap Growth">US Large Cap Growth</option>
                <option value="US Small Cap Value">US Small Cap Value</option>
                <option value="US Small Cap Growth">US Small Cap Growth</option>
                <option value="Emerging Markets">Emerging Markets</option>
                <option value="Intl Developed ex-US Market">
                  Intl Developed ex-US Market
                </option>
                <option value="Total US Bond Market">
                  Total US Bond Market
                </option>
                <option value="Global Bonds (Unhedged)">
                  Global Bonds (Unhedged)
                </option>
              </Field>
            </div>
            <ErrorMessage
              className="error-message"
              name="product"
              component="div"
            />
          </label>
          <label>
            Movement
            <div className="select">
              <Field as="select" name="movement">
                <option value="">-- Select --</option>
                <option value="up">Up</option>
                <option value="down">Down</option>
                <option value="same">Same</option>
              </Field>
            </div>
            <ErrorMessage
              className="error-message"
              name="movement"
              component="div"
            />
          </label>
          <label>
            Percentage
            <Field
              type="number"
              name="percentage"
              placeholder="Percentage"
              style={{ width: '100%' }}
            />
            <ErrorMessage
              className="error-message"
              name="percentage"
              component="div"
            />
          </label>
          <label>
            Confidence Level
            <Field
              type="number"
              name="confidence"
              placeholder="Confidence Level"
              style={{ width: '100%' }}
            />
            <ErrorMessage
              className="error-message"
              name="confidence"
              component="div"
            />
          </label>
          {absoluteView && (
            <div className="views-statement">
              {`${absoluteView.product} will have an absolute excess return of ${absoluteView.percentage}%`}
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
}
