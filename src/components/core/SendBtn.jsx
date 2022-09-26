import React, { Fragment } from 'react';

// ICONS
import { Send as SendIcon } from '@mui/icons-material';

const SendBtn = ({ handleOnClick, loading, title, loadingCopy }) => {
  return (
    <Fragment>
      <button
        disabled={loading}
        className="preview__footer"
        onClick={handleOnClick}
      >
        <span>
          {
            loading
              ? loadingCopy || 'Loading..'
              : title
          }
        </span>

        {loading
          ? ''
          : (
              <SendIcon 
                className='preview__sendIcon'
              />
            )
        }
      </button>
    </Fragment>
  )
}

export default SendBtn;
