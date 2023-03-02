import { LoaderIcon } from '../assets/svg';

export default function Loader({
  text = 'Optimizing Portfolio with Analyst Views & Investor Preference...'
}) {
  return (
    <div className="loader-wrapper">
      <LoaderIcon />
      <div className="loader-text">
        {text} <br />
        Please wait!
      </div>
    </div>
  );
}
