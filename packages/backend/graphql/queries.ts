// tslint:disable
// this is an auto generated file. This will be overwritten

export const getFile = `query GetFile($id: ID!) {
  getFile(id: $id) {
    id
    hash
    key
    mime
    meta
    thumb
    size
    owner
    album {
      id
      name
      identityId
      files {
        nextToken
      }
      owner
      export {
        id
        owner
      }
    }
  }
}
`;
export const listFiles = `query ListFiles(
  $filter: ModelFileFilterInput
  $limit: Int
  $nextToken: String
) {
  listFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      hash
      key
      mime
      meta
      thumb
      size
      owner
      album {
        id
        name
        identityId
        owner
      }
    }
    nextToken
  }
}
`;
export const listAlbums = `query ListAlbums(
  $filter: ModelAlbumFilterInput
  $limit: Int
  $nextToken: String
) {
  listAlbums(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      identityId
      files {
        nextToken
      }
      owner
      export {
        id
        owner
      }
    }
    nextToken
  }
}
`;
export const getAlbum = `query GetAlbum($id: ID!) {
  getAlbum(id: $id) {
    id
    name
    identityId
    files {
      items {
        id
        hash
        key
        mime
        meta
        thumb
        size
        owner
      }
      nextToken
    }
    owner
    export {
      id
      album {
        id
        name
        identityId
        owner
      }
      owner
    }
  }
}
`;
export const listExports = `query ListExports(
  $filter: ModelExportFilterInput
  $limit: Int
  $nextToken: String
) {
  listExports(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      album {
        id
        name
        identityId
        owner
      }
      owner
    }
    nextToken
  }
}
`;
export const getExport = `query GetExport($id: ID!) {
  getExport(id: $id) {
    id
    album {
      id
      name
      identityId
      files {
        nextToken
      }
      owner
      export {
        id
        owner
      }
    }
    owner
  }
}
`;
export const getReview = `query GetReview($id: ID!) {
  getReview(id: $id) {
    id
    createdAt
    identityId
    fileId
    resume
    owner
  }
}
`;
export const listReviews = `query ListReviews(
  $filter: ModelReviewFilterInput
  $limit: Int
  $nextToken: String
) {
  listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      identityId
      fileId
      resume
      owner
    }
    nextToken
  }
}
`;
export const reviewsByIdentity = `query ReviewsByIdentity(
  $identityId: String
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelReviewFilterInput
  $limit: Int
  $nextToken: String
) {
  reviewsByIdentity(
    identityId: $identityId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      createdAt
      identityId
      fileId
      resume
      owner
    }
    nextToken
  }
}
`;
