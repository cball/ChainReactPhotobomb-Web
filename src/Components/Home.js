import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import ReactList from 'react-list';

export const allPhotosQuery = gql`
  query {
    allPhotos(first: 60, orderBy: createdAt_DESC) {
      id
      file {
        id
        url
      }
    }
  }
`;

const photosSubscription = gql`
  subscription createPhoto {
    Photo(filter: { mutation_in: [CREATED] }) {
      mutation
      node {
        id
        file {
          id
          url
        }
      }
    }
  }
`;

const PHOTO_SIZE = 96;
const PHOTO_LIMIT = 50;

class Home extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    this._subscribeToNewPhotos(nextProps);
  }
  renderLoading() {
    return <div>Loading!</div>;
  }
  renderPhotoList = () => {
    const { allPhotos } = this.props.allPhotosQuery;

    return (
      <div className="photoList">
        <ReactList
          itemRenderer={this.renderPhoto}
          length={allPhotos.length}
          type="uniform"
        />
      </div>
    );
  };

  renderPhoto = (index, key) => {
    const { allPhotos } = this.props.allPhotosQuery;
    const item = allPhotos[index];
    const { id, file } = item;
    const imagePath = file.url.replace('files', 'images');
    // get smallest size possible accounting for 2x dpi
    const roundedSize = Math.ceil(PHOTO_SIZE) * 2;
    const uri = `${imagePath}/${roundedSize}x${roundedSize}`;

    return (
      <div className="photoContainer">
        <img src={uri} className="photo" />
      </div>
    );
  };

  render() {
    const { loading, error } = this.props.allPhotosQuery;
    const shouldRenderLoading = !error && loading;
    const shouldRenderPhotoList = !error && !shouldRenderLoading;

    return (
      <div>
        {error && <div>Error fetching :(</div>}
        {shouldRenderLoading && this.renderLoading()}
        {shouldRenderPhotoList && this.renderPhotoList()}
      </div>
    );
  }

  _subscribeToNewPhotos(nextProps) {
    this._unsubscribeIfPropsChanged(nextProps);

    if (!this.subscription && !nextProps.allPhotosQuery.loading) {
      this.subscription = nextProps.allPhotosQuery.subscribeToMore({
        document: photosSubscription,
        updateQuery: prependNewPhotos
      });
    }
  }

  _unsubscribeIfPropsChanged(nextProps) {
    if (!this.subscription) return;

    if (this.props.subscriptionParam !== nextProps.subscriptionParam) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}

const prependNewPhotos = (previousState, { subscriptionData }) => {
  const newPhoto = subscriptionData.data.Photo.node;
  const allPhotos = [newPhoto, ...previousState.allPhotos].slice(0, -1);

  return {
    allPhotos
  };
};

export default graphql(allPhotosQuery, { name: 'allPhotosQuery' })(Home);
