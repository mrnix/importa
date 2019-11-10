import React, {useEffect, useState, useCallback} from 'react';
import Auth from '@aws-amplify/auth'
import Storage from '@aws-amplify/storage'
import API, {graphqlOperation} from '@aws-amplify/api';
import {RouteComponentProps} from '@reach/router';
import styles from './ExportView.module.sass';
import {
  createReview,
  updateReview,
  deleteReview
} from '../../backend/graphql/mutations';
import {listReviews} from '../../backend/graphql/queries';

const keyBy = (entities: any[], id = 'id') => {
  return entities.reduce((acc, entity) => {
    acc[entity[id]] = entity;
    return acc;
  }, {});
};

export const getExport = `query GetExport($id: ID!) {
  getExport(id: $id) {
    id
    album {
      id
      name
      identityId
      files(limit: 100) {
        items {
          id
          key
          thumb
        }
        nextToken
      }
    }
  }
}`;

interface ExportPageProps extends RouteComponentProps {
  id?: string;
}

const ExportView = ({id}: ExportPageProps) => {
  const [state, setState] = useState();
  const [reviews, setReviews] = useState();

  const onUpdateReview = useCallback((review, deleted) => {
    if (deleted) {
      setReviews({...reviews, [review.fileId]: null});
      return;
    }
    setReviews({...reviews, [review.fileId]: review});
  }, []);

  useEffect(() => {
    const fetchExport = async () => {
      try {
        const {identityId} = await Auth.currentCredentials();
        const response: any = await API.graphql(
          graphqlOperation(getExport, {id, limit: 100})
        );

        console.log(identityId);
        console.log(response.data);

        setState(response.data);

        const ids = response.data.getExport.album.files.items.map(
          ({id}: any) => id
        );

        if (ids.length === 0) {
          return;
        }

        const reviewsResponse: any = await API.graphql({
          query: listReviews,
          variables: {
            
            filter: {
              identityId: {eq: identityId},
              or: ids.map((id: string) => ({fileId: {eq: id}}))
            },
            limit: 100
          },
          // @ts-ignore
          authMode: 'AWS_IAM'
        });

        if (reviewsResponse.data.listReviews) {
          setReviews(keyBy(reviewsResponse.data.listReviews.items, 'fileId'));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchExport();
  }, [id]);

  return (
    <div className={styles.exportView}>
      {(state && state.getExport && (
        <Album
          album={state.getExport.album}
          reviews={reviews}
          onUpdateReview={onUpdateReview}
        />
      )) ||
        'loading...'}
    </div>
  );
};

const Album = ({album, reviews, onUpdateReview}: any) => {
  const reviewsEnabled = typeof reviews !== 'undefined';

  return (
    <div className={styles.album}>
      <h2 className={styles.albumTitle}>{album.name}</h2>
      <div className={styles.files}>
        {album.files.items.map((file: any) => (
          <File
            key={file.id}
            album={album}
            file={file}
            enabled={reviewsEnabled}
            review={reviewsEnabled && reviews[file.id]}
            onUpdateReview={onUpdateReview}
          />
        ))}
      </div>
    </div>
  );
};

const File = ({album, file, enabled, review, onUpdateReview}: any) => {
  const [url, setUrl] = useState();

  useEffect(() => {
    const getSignedUrl = async () => {
      setUrl(
        await Storage.get(`${file.key}`, {
          level: 'protected',
          identityId: album.identityId,
          expires: 300
        })
      );
    };
    getSignedUrl();
  }, []);

  if (!url) {
    return null;
  }

  return (
    <div className={styles.file}>
      {url ? <img alt="" src={url} /> : null}
      <Review
        enabled={enabled}
        file={file}
        review={review}
        onUpdate={onUpdateReview}
      />
    </div>
  );
};

const useReviewCallback = ({
  resume,
  file,
  review,
  onUpdate,
  submitting: [isSubmitting, setSubmitting]
}: any) => {
  return useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    const {identityId} = await Auth.currentCredentials();
    setSubmitting(true);

    if (review && review.resume === resume) {
      await API.graphql(
        graphqlOperation(deleteReview, {input: {id: review.id}})
      );
      onUpdate(review, true);
      setSubmitting(false);
      return;
    }

    if (review) {
      const updated: any = await API.graphql(
        graphqlOperation(updateReview, {
          input: {id: review.id, resume}
        })
      );
      onUpdate(updated.data.updateReview);
      setSubmitting(false);
      return;
    }

    const created: any = await API.graphql(
      graphqlOperation(createReview, {
        input: {identityId, fileId: file.id, resume}
      })
    );

    setSubmitting(false);
    console.log('result', created);
    onUpdate(created.data.createReview);
  }, [file.id, isSubmitting, review]);
};

const Review = ({file, enabled, review, onUpdate}: any) => {
  const submitting = useState();
  const like = useReviewCallback({
    file,
    resume: 'like',
    review,
    submitting,
    onUpdate
  });
  const dislike = useReviewCallback({
    file,
    resume: 'dislike',
    review,
    submitting,
    onUpdate
  });

  return (
    <div className={styles.review}>
      <button disabled={submitting[0] || !enabled} onClick={like}>
        {review && review.resume === 'like' && '✅'} Like
      </button>
      <button disabled={submitting[0] || !enabled} onClick={dislike}>
        {review && review.resume === 'dislike' && '✅'} Dislike
      </button>
    </div>
  );
};
export default ExportView;
