import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';

function New(props) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  );
}

New.propTypes = {
  children: PropTypes.node.isRequired,
};

function Popular(props) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  );
}

Popular.propTypes = {
  children: PropTypes.node.isRequired,
};

function Video(props) {
  return (
    <div className="item item-video">
      <iframe
        src={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  );
}

Video.propTypes = {
  url: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
};

function Article(props) {
  return (
    <div className="item item-article">
      <h3>
        <a href="#">{props.title}</a>
      </h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  );
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
};

function withPopularity(WrappedComponent) {
  const EnhancedComponent = function (props) {
    if (props.views > 1000) {
      return (
        <Popular>
          <WrappedComponent {...props} />
        </Popular>
      );
    } else if (props.views <= 100) {
      return (
        <New>
          <WrappedComponent {...props} />
        </New>
      );
    } else {
      return <WrappedComponent {...props} />;
    }
  };

  EnhancedComponent.propTypes = {
    views: PropTypes.number.isRequired,
  };

  return EnhancedComponent;
}

const EnhancedVideo = withPopularity(Video);
const EnhancedArticle = withPopularity(Article);

function List(props) {
  return props.list.map((item) => {
    switch (item.type) {
      case 'video':
        return <EnhancedVideo {...item} />;

      case 'article':
        return <EnhancedArticle {...item} />;
    }
  });
}

export default function App() {
  const [list, setList] = useState([
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      views: 50,
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      views: 12,
    },
    {
      type: 'article',
      title: 'Невероятные события в неизвестном поселке...',
      views: 175,
    },
    {
      type: 'article',
      title: 'Секретные данные были раскрыты!',
      views: 1532,
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      views: 4253,
    },
    {
      type: 'article',
      title: 'Кот Бегемот обладает невероятной...',
      views: 12,
    },
  ]);

  return <List list={list} />;
}
