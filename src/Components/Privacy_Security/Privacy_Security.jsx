
import React from 'react';
import { features } from './Privacy_Data';
import './Privacy_Security.css'


const Privacy_Security = () => {
  return (
    <div className="features_grid">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div className="feature_card" key={index}>
            <div className="icon_wrapper">
              <Icon size={50} color={feature.color} />

            </div>
            <div className="title">{feature.title}</div>
            <p>{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
};


export default Privacy_Security