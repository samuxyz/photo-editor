import React from 'react';

const Thumbnail = (props) => {
  const { title, handle, manipulation } = props;
  return (
    <div className="col-sm-6 col-md-4">
      <div className="thumbnail">
        <div className="thumbnail-img">
          <a href={manipulation + handle} target="_blank">
            <img src={manipulation + handle} />
          </a>
        </div>
        <div className="caption">
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
