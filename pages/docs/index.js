import React from 'react';
import { SkipNavContent } from '@reach/skip-nav';

import Page from '../../components/page';
import withPure from '../../components/hoc/pure';
import IObserver from '../../components/intersection-observer';
import Container from '../../components/container';

import Sidebar from '../../components/docs/sidebar';
import Markdown, { headings } from '../../components/docs/docs.mdx';
import Documentation, { components } from '../../components/docs/documentation';

const Content = React.memo(({ handleDocsIntersect }) => {
  const intersectObserverWapper = props => {
    const content = props.children.map((item, idx) => {
      return item && item.props && item.props.props && item.props.props.id ? (
        <IObserver
          // eslint-disable-next-line
          key={idx}
          onIntersect={() => handleDocsIntersect(item.props.props.id)}
        >
          <div>{item}</div>
        </IObserver>
      ) : (
        // eslint-disable-next-line
        <div key={idx}>{item}</div>
      );
    });

    return content;
  };

  return (
    <Markdown
      components={{ wrapper: intersectObserverWapper, ...components }}
      handleDocsIntersect={handleDocsIntersect}
    />
  );
});

export default class Docs extends React.Component {
  state = {
    currentMenuItem: ''
  };

  handleDocsIntersect = id => {
    this.setState({
      currentMenuItem: id
    });
  };

  render() {
    console.log('currentMenuItem in docs', this.state.currentMenuItem);
    return (
      <>
        <Sidebar headings={headings} currentMenuItem={this.state.currentMenuItem} mobile />
        <Page>
          <Container>
            <Documentation headings={headings}>
              <SkipNavContent />
              <Content handleDocsIntersect={this.handleDocsIntersect} />
            </Documentation>
          </Container>
        </Page>
      </>
    );
  }
}

export const config = {
  amp: 'hybrid'
};
